"""v1.28: spis pakietu HA (packages/hydrolution_karta.yaml) dla karty.

Karta (admin) zaklada z tego spisu brakujace elementy przez API HA:
pomocniki input_*, skrypty, automatyzacje, czujniki szablonowe, utility_meter,
history_stats, derivative. Dla kazdego elementu liczymy wersje pakietu, od ktorej
jego tresc sie nie zmienila (z historii gita), zeby karta wiedziala, co zaktualizowac.
"""
import json
import re
import subprocess
import os

import yaml

PKG_PATH = 'packages/hydrolution_karta.yaml'
HELPERS = ['input_boolean', 'input_datetime', 'input_number', 'input_text', 'input_select']


def slug(s):
    return re.sub(r'[^a-z0-9]+', '_', str(s).lower()).strip('_')


def pkg_version(text):
    m = re.search(r'WERSJA PAKIETU:\s*([0-9.]+)', text)
    return m.group(1) if m else '0'


def items_of(d):
    """Zwraca liste elementow {k: klucz unikalny, t: typ, ...} z pakietu (dict z YAML)."""
    out = []
    for dom in HELPERS:
        for hid, c in (d.get(dom) or {}).items():
            out.append({'k': dom + '.' + hid, 't': 'helper', 'd': dom, 'id': hid, 'c': c or {}})
    for sid, c in (d.get('script') or {}).items():
        out.append({'k': 'script.' + sid, 't': 'script', 'id': sid, 'c': c})
    for a in d.get('automation') or []:
        out.append({'k': 'automation:' + a['id'], 't': 'auto', 'id': a['id'], 'c': a})
    for blk in d.get('template') or []:
        trig = 'triggers' in blk or 'trigger' in blk
        for dom in ('sensor', 'binary_sensor'):
            for s in blk.get(dom) or []:
                eid = dom + '.' + slug(s['name'])
                c = {'name': s['name'], 'state': str(s.get('state', '')).strip()}
                for f in ('unit_of_measurement', 'device_class', 'state_class'):
                    if s.get(f):
                        c[f] = s[f]
                if s.get('availability'):
                    c['advanced_options'] = {'availability': str(s['availability']).strip()}
                it = {'k': eid, 't': 'trig' if trig else 'tpl', 'd': dom, 'eid': eid, 'c': c}
                if s.get('icon'):
                    it['icon'] = s['icon']
                if trig:
                    it['yaml'] = blk
                out.append(it)
    for uid, c in (d.get('utility_meter') or {}).items():
        out.append({'k': 'sensor.' + uid, 't': 'um', 'eid': 'sensor.' + uid,
                    'c': {'name': c['name'], 'source': c['source'], 'cycle': c['cycle'], 'offset': 0, 'tariffs': [],
                          'net_consumption': False, 'delta_values': False, 'periodically_resetting': True, 'always_available': False}})
    for s in d.get('sensor') or []:
        eid = 'sensor.' + slug(s['name'])
        if s['platform'] == 'history_stats':
            out.append({'k': eid, 't': 'hs', 'eid': eid, 'c': {'name': s['name'], 'entity_id': s['entity_id'], 'type': s['type'],
                                                             'state': [s['state']] if isinstance(s['state'], str) else s['state'],
                                                             'start': s.get('start'), 'end': s.get('end')}})
        elif s['platform'] == 'derivative':
            hh, mm, ss = [int(x) for x in str(s.get('time_window', '00:00:00')).split(':')]
            c = {'name': s['name'], 'source': s['source'], 'round': s.get('round', 2), 'time_window': {'hours': hh, 'minutes': mm, 'seconds': ss}}
            if s.get('unit_time'):
                c['unit_time'] = s['unit_time']
            out.append({'k': eid, 't': 'der', 'eid': eid, 'c': c})
    return out


def card_only(ver):
    """Elementy tylko dla instalacji przez karte (zamiast tego, czego API nie umie)."""
    return [
        # znacznik instalacji przez karte + wersja (sensor.hp_pakiet_wersja czyta go)
        {'k': 'input_text.hp_pakiet_karta', 't': 'helper', 'd': 'input_text', 'id': 'hp_pakiet_karta', 'only': 'card', 'v': '1.25',
         'c': {'name': 'HP pakiet z karty (wersja)', 'max': 20, 'icon': 'mdi:package-variant-closed'}},
        {'k': 'sensor.hp_pakiet_wersja#card', 't': 'tpl', 'd': 'sensor', 'eid': 'sensor.hp_pakiet_wersja', 'only': 'card', 'v': '1.25',
         'icon': 'mdi:package-variant', 'c': {'name': 'HP pakiet wersja', 'state': "{{ states('input_text.hp_pakiet_karta') }}"}},
        # antylegionella "ostatnio": w YAML czujnik wyzwalany (trigger template), przez API: pomocnik + automatyzacja + szablon
        {'k': 'input_datetime.hp_antylegionella_ost', 't': 'helper', 'd': 'input_datetime', 'id': 'hp_antylegionella_ost', 'only': 'card', 'v': '1.25',
         'c': {'name': 'HP antylegionella ostatnio (zapis)', 'has_date': True, 'has_time': True, 'icon': 'mdi:history'}},
        {'k': 'automation:hp_antylegionella_ost', 't': 'auto', 'id': 'hp_antylegionella_ost', 'only': 'card', 'v': '1.25',
         'c': {'id': 'hp_antylegionella_ost', 'alias': 'HP antylegionella: zapisz ostatnie przegrzanie', 'mode': 'single',
               'triggers': [{'trigger': 'template', 'value_template': "{{ states('sensor.hydrolution_cwu_gora_bt7') | float(0) >= states('number.hydrolution_antylegionella_temperatura_koncowa') | float(99) - 1 }}"}],
               'conditions': [], 'actions': [{'action': 'input_datetime.set_datetime', 'target': {'entity_id': 'input_datetime.hp_antylegionella_ost'}, 'data': {'timestamp': '{{ now().timestamp() }}'}}]}},
        {'k': 'sensor.hp_antylegionella_ostatnio#card', 't': 'tpl', 'd': 'sensor', 'eid': 'sensor.hp_antylegionella_ostatnio', 'only': 'card', 'v': '1.25',
         'c': {'name': 'HP antylegionella ostatnio', 'device_class': 'timestamp',
               'state': "{{ (as_datetime(states('input_datetime.hp_antylegionella_ost')) | as_local).isoformat() }}",
               'advanced_options': {'availability': "{{ has_value('input_datetime.hp_antylegionella_ost') }}"}}},
    ]


def build(repo):
    cur_txt = open(os.path.join(repo, PKG_PATH), encoding='utf-8').read()
    ver = pkg_version(cur_txt)
    cur = items_of(yaml.safe_load(cur_txt))
    # historia: najnowsze -> najstarsze
    hist = []
    try:
        hs = subprocess.run(['git', 'log', '--format=%H', '--', PKG_PATH], cwd=repo, capture_output=True, text=True, check=True).stdout.split()
        for h in hs:
            t = subprocess.run(['git', 'show', h + ':' + PKG_PATH], cwd=repo, capture_output=True, text=True).stdout
            if t:
                hist.append((pkg_version(t), {i['k']: json.dumps(i['c'], sort_keys=True) for i in items_of(yaml.safe_load(t))}))
    except Exception:  # bez gita: wszystko = biezaca wersja
        hist = []
    if not hist or hist[0][0] != ver:
        hist.insert(0, (ver, {i['k']: json.dumps(i['c'], sort_keys=True) for i in cur}))
    for it in cur:
        sig = json.dumps(it['c'], sort_keys=True)
        v = ver
        for hv, m in hist:
            if m.get(it['k']) == sig:
                v = hv
            else:
                break
        it['v'] = v
        if it['t'] == 'trig' or it['k'] == 'sensor.hp_pakiet_wersja':
            it['only'] = 'yaml'
    return {'ver': ver, 'items': cur + card_only(ver)}


if __name__ == '__main__':
    s = build(os.path.join(os.path.dirname(__file__), '..'))
    print(s['ver'], len(s['items']))
    for i in s['items']:
        print(i['t'], i['k'], i['v'], i.get('only', ''))
