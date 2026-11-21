/*
 * ha-karta-pompa-ciepla  __VERSION__
 * Karta Home Assistant dla pompy ciepla MHI Hydrolution (NIBE SMO 40) z ESPHome "hydrolution" v5.3.
 * Jeden plik, bez zaleznosci (nie wymaga button-card / apexcharts-card / card-mod).
 *   type: custom:ha-karta-pompa-ciepla
 *   image: /local/hydrolution/tlo.png      # opcjonalnie, domyslnie tlo wbudowane
 *   entities:                              # opcjonalnie, nadpisanie ID encji
 *     bt1: sensor.moja_temperatura_zewn
 * Plik generowany przez tools/gen.py - nie edytuj recznie.
 */
(() => {
const VERSION = '__VERSION__';
const DEFAULT_E = __ENTITIES__;
const BG = 'data:image/jpeg;base64,__BG__';
const TREND = __TREND__;          // klucze encji do wykresu trendow
const EXTRA = __EXTRA__;
const FONT = __FONT__;
const POP_CSS = '.el.ok{border-radius:8px;animation:hpok 1.5s ease-out}' +
  '@keyframes hpok{0%,40%{box-shadow:0 0 0 2px #43d343,0 0 16px rgba(67,211,67,.85)}100%{box-shadow:0 0 0 2px transparent,0 0 0 transparent}}' +
  '.pp{position:absolute;z-index:20;min-width:210px;max-width:290px;box-sizing:border-box;padding:10px 12px 12px;border-radius:12px;' +
  'background:linear-gradient(180deg,rgba(40,46,56,.97),rgba(20,24,31,.97));border:1px solid rgba(110,193,255,.45);' +
  'box-shadow:0 10px 30px rgba(0,0,0,.6),0 0 18px rgba(33,150,243,.25);color:#eef2f6;font-size:14px}' +
  '.pp button{font:inherit;color:inherit;cursor:pointer;border:1px solid rgba(255,255,255,.14);background:rgba(62,70,82,.85);border-radius:8px}' +
  '.pp button:hover{border-color:rgba(110,193,255,.7)}' +
  '.pt{display:flex;align-items:center;gap:8px;font-weight:600;font-size:15px;margin-bottom:10px}.pt span{flex:1}' +
  '.pt .x{border:none;background:none;font-size:15px;opacity:.75;padding:2px 4px}' +
  '.pp.ed{width:176px;min-width:176px;animation:hppop .16s ease-out}@keyframes hppop{from{transform:scale(.35);opacity:.2}to{transform:none;opacity:1}}' +
  '.pp.ed .st{display:block;width:100%;height:46px;font-size:22px;margin:0}.pp.ed .st:active{background:linear-gradient(180deg,#2b8cf2,#1260bf)}' +
  '.nr{display:flex;align-items:center;justify-content:center;gap:6px;margin:8px 0}' +
  '.nr input{flex:1;min-width:0;width:80px;height:50px;box-sizing:border-box;text-align:center;font:700 26px inherit;font-family:inherit;color:#fff;' +
  'background:rgba(10,12,16,.75);border:1px solid rgba(110,193,255,.5);border-radius:8px;-moz-appearance:textfield}' +
  '.nr input::-webkit-inner-spin-button,.nr input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}' +
  '.nr input.bad{border-color:#ff5a4a}.un{opacity:.8;min-width:22px}' +
  '.rg{font-size:12px;opacity:.65;margin:6px 2px 0}' +
  '.ac{display:flex;justify-content:space-between;gap:8px;margin-top:10px}.ac button{padding:9px 12px;flex:1}.pp.ed .rg{text-align:center}' +
  '.ac .ok{background:linear-gradient(180deg,#2b8cf2,#1260bf);border-color:#6ec1ff;font-weight:600}' +
  '.ls{display:flex;flex-direction:column;gap:6px}.ls .op{text-align:left;padding:9px 12px}' +
  '.ls .op.on{background:linear-gradient(180deg,#2b8cf2,#1260bf);border-color:#6ec1ff;font-weight:600}' +
  '.sw{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:4px 2px}.sl{font-size:16px;font-weight:600}' +
  '.sw .tg{position:relative;width:58px;height:30px;border-radius:999px;background:#4a525e;border:none;padding:0}' +
  '.sw .tg i{position:absolute;top:3px;left:3px;width:24px;height:24px;border-radius:50%;background:#fff;transition:left .15s}' +
  '.sw .tg.on{background:linear-gradient(180deg,#36a3ff,#1a7fe0);box-shadow:0 0 10px rgba(33,150,243,.6)}.sw .tg.on i{left:31px}';
const ELS = [
__ELEMENTS__
];

class HaKartaPompaCiepla extends HTMLElement {
  setConfig(config) {
    this._config = config || {};
    this._E = Object.assign({}, DEFAULT_E, this._config.entities || {});
    this._hist = {};
    this._histAt = 0;
    this._built = false;
    if (this._hass) this._render(true);
  }
  set hass(hass) {
    const first = !this._hass;
    this._hass = hass;
    this._render(first);
    this._maybeHistory();
  }
  getCardSize() { return 12; }
  static getStubConfig() { return {}; }

  _build() {
    const root = this.attachShadow ? (this.shadowRoot || this.attachShadow({ mode: 'open' })) : this;
    const img = this._config.image || BG;
    root.innerHTML = '<style>:host{display:block}' +
      'ha-card{overflow:hidden;border-radius:var(--ha-card-border-radius,12px);background:#111}' +
      '#c{position:relative;container-type:inline-size;width:100%;line-height:1.15;color:#eef2f6;font-family:' + FONT + '}' +
      '#c>img{display:block;width:100%;height:auto;user-select:none;pointer-events:none}' +
      '.el{position:absolute;--u:calc(100cqw / 1672)}.el.t{cursor:pointer}' + EXTRA.replace(':host', '.el') + POP_CSS +
      '</style><ha-card><div id="c"><img alt="" src="' + img + '"></div></ha-card>';
    const c = root.getElementById('c');
    this._nodes = ELS.map((el) => {
      const d = document.createElement('div');
      d.className = 'el' + (el.tap ? ' t' : '');
      Object.assign(d.style, el.style);
      d.addEventListener('click', (ev) => {
        const hit = ev.target.closest && ev.target.closest('[data-k]');
        if (hit) { ev.stopPropagation(); this._more(hit.getAttribute('data-k')); return; }
        if (el.tap) { ev.stopPropagation(); this._tap(el, d); }
      });
      c.appendChild(d);
      return d;
    });
    c.addEventListener('click', () => this._close());
    this._c = c;
    this._pend = [];
    this._built = true;
  }

  _render(force) {
    if (!this._config || !this._hass) return;
    if (!this._built) { this._build(); force = true; }
    const st = this._hass.states;
    const E = this._E;
    ELS.forEach((el, i) => {
      const sig = el.keys.map((k) => { const s = st[E[k]]; return s ? s.state : '?'; }).join('|') + (el.hist ? '#' + this._histAt : '');
      if (!force && this._nodes[i]._sig === sig) return;
      this._nodes[i]._sig = sig;
      let h = '';
      try { h = el.fn(st, el.ent ? st[E[el.ent]] : undefined, E, this._hist); }
      catch (e) { h = ''; console.warn('ha-karta-pompa-ciepla', e); }
      this._nodes[i].innerHTML = h;
    });
    this._checkPend();
    if (this._pop && this._pop._upd) this._pop._upd();
  }

  // ---------- interakcja: okienka edycji ----------
  _more(id) {
    const ev = new Event('hass-more-info', { bubbles: true, composed: true });
    ev.detail = { entityId: id };
    this.dispatchEvent(ev);
  }
  _close() { if (this._pop) { this._pop.remove(); this._pop = null; } }
  _waitFor(id, ok, node) {
    this._pend = this._pend.filter((p) => p.id !== id);
    this._pend.push({ id, ok, node, t: Date.now() });
  }
  _checkPend() {
    if (!this._pend || !this._pend.length || !this._hass) return;
    const st = this._hass.states;
    this._pend = this._pend.filter((p) => {
      if (Date.now() - p.t > 60000) return false;
      if (!p.ok(st)) return true;
      const n = p.node;
      if (n) { n.classList.remove('ok'); void n.offsetWidth; n.classList.add('ok'); setTimeout(() => n.classList.remove('ok'), 1600); }
      return false;
    });
  }
  _popup(node, title, build) {
    this._close();
    const p = document.createElement('div');
    p.className = 'pp';
    p.addEventListener('click', (ev) => ev.stopPropagation());
    p.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') this._close(); });
    p.innerHTML = '<div class="pt"><span></span><button class="x" title="Zamknij">✕</button></div><div class="pb"></div>';
    p.querySelector('.pt span').textContent = title;
    p.querySelector('.x').addEventListener('click', () => this._close());
    this._c.appendChild(p);
    build(p.querySelector('.pb'), p);
    // pozycja: pod elementem, w granicach karty
    const cr = this._c.getBoundingClientRect(), nr = node.getBoundingClientRect(), pr = { width: p.offsetWidth, height: p.offsetHeight };
    let x = nr.left - cr.left + nr.width / 2 - pr.width / 2;
    let y = nr.bottom - cr.top + 6;
    if (y + pr.height > cr.height - 4) y = nr.top - cr.top - pr.height - 6;
    x = Math.max(4, Math.min(cr.width - pr.width - 4, x));
    y = Math.max(4, y);
    p.style.left = x + 'px'; p.style.top = y + 'px';
    this._pop = p;
    return p;
  }
  _num(t, node) {
    const hass = this._hass, id = this._E[t.k], s = hass.states[id];
    if (!s) { this._more(id); return; }
    const a = s.attributes, mn = Number(a.min), mx = Number(a.max), stp = Number(a.step) || 1;
    const unit = a.unit_of_measurement || '';
    const dec = (String(stp).split('.')[1] || '').length;
    const clamp = (v) => Math.min(mx, Math.max(mn, Math.round(v / stp) * stp));
    const p = this._popup(node, t.l || a.friendly_name || id, (b, pp) => {
      pp.classList.add('ed');
      b.innerHTML = '<button class="st up" title="Więcej">▲</button><div class="nr"><input type="number" inputmode="decimal"><span class="un"></span></div>' +
        '<button class="st dn" title="Mniej">▼</button><div class="rg"></div>' +
        '<div class="ac"><button class="cn">Anuluj</button><button class="ok">✓ Zapisz</button></div>';
      const inp = b.querySelector('input');
      inp.min = mn; inp.max = mx; inp.step = stp; inp.value = Number(s.state).toFixed(dec);
      b.querySelector('.un').textContent = unit;
      b.querySelector('.rg').textContent = 'Zakres: ' + mn + ' … ' + mx + (unit ? ' ' + unit : '');
      const bump = (d) => {
        const v = parseFloat(String(inp.value).replace(',', '.'));
        inp.value = clamp((isNaN(v) ? Number(s.state) : v) + d * stp).toFixed(dec);
        inp.classList.remove('bad');
      };
      let tm = null, iv = null;
      const stop = () => { clearTimeout(tm); clearInterval(iv); };
      b.querySelectorAll('.st').forEach((x) => {
        const d = x.classList.contains('up') ? 1 : -1;
        x.addEventListener('pointerdown', () => { bump(d); tm = setTimeout(() => { iv = setInterval(() => bump(d), 110); }, 450); });
        ['pointerup', 'pointerleave', 'pointercancel'].forEach((e) => x.addEventListener(e, stop));
      });
      const save = () => {
        const v = parseFloat(String(inp.value).replace(',', '.'));
        if (isNaN(v)) { inp.classList.add('bad'); return; }
        const val = clamp(v);
        this._close();
        if (Number(hass.states[id].state) === val) return;
        hass.callService('number', 'set_value', { entity_id: id, value: val });
        this._waitFor(id, (st) => st[id] && Math.abs(Number(st[id].state) - val) < stp / 2, node);
      };
      inp.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter') save();
        else if (ev.key === 'ArrowUp') { ev.preventDefault(); bump(1); }
        else if (ev.key === 'ArrowDown') { ev.preventDefault(); bump(-1); }
      });
      b.querySelector('.ok').addEventListener('click', save);
      b.querySelector('.cn').addEventListener('click', () => this._close());
      setTimeout(() => { inp.focus(); inp.select(); }, 30);
    });
    // edytor wyrasta z kafla: srodek nad kaflem, animacja od rozmiaru kafla
    const cr = this._c.getBoundingClientRect(), nr = node.getBoundingClientRect(), pr = { width: p.offsetWidth, height: p.offsetHeight };
    let x = nr.left - cr.left + nr.width / 2 - pr.width / 2;
    let y = nr.top - cr.top + nr.height / 2 - pr.height / 2;
    x = Math.max(4, Math.min(cr.width - pr.width - 4, x));
    y = Math.max(4, Math.min(cr.height - pr.height - 4, y));
    p.style.left = x + 'px'; p.style.top = y + 'px';
    p.style.transformOrigin = (nr.left - cr.left + nr.width / 2 - x) + 'px ' + (nr.top - cr.top + nr.height / 2 - y) + 'px';
  }
  _sel(t, node) {
    const hass = this._hass, id = this._E[t.k], s = hass.states[id];
    if (!s) { this._more(id); return; }
    const opts = s.attributes.options || [];
    this._popup(node, t.l || s.attributes.friendly_name || id, (b) => {
      b.innerHTML = '<div class="ls"></div><div class="ac"><button class="mi">Więcej…</button></div>';
      const ls = b.querySelector('.ls');
      opts.forEach((o) => {
        const x = document.createElement('button');
        x.className = 'op' + (o === s.state ? ' on' : '');
        x.textContent = o;
        x.addEventListener('click', () => {
          this._close();
          if (o === hass.states[id].state) return;
          hass.callService('select', 'select_option', { entity_id: id, option: o });
          this._waitFor(id, (st) => st[id] && st[id].state === o, node);
        });
        ls.appendChild(x);
      });
      b.querySelector('.mi').addEventListener('click', () => { this._close(); this._more(id); });
    });
  }
  _sw(t, node) {
    const hass = this._hass, id = this._E[t.k];
    if (!hass.states[id]) { this._more(id); return; }
    const p = this._popup(node, t.l || id, (b) => {
      b.innerHTML = '<div class="sw"><span class="sl"></span><button class="tg"><i></i></button></div><div class="ac"><button class="mi">Więcej…</button></div>';
      b.querySelector('.tg').addEventListener('click', () => {
        const on = hass.states[id].state === 'on';
        hass.callService('homeassistant', on ? 'turn_off' : 'turn_on', { entity_id: id });
        this._waitFor(id, (st) => st[id] && st[id].state === (on ? 'off' : 'on'), node);
      });
      b.querySelector('.mi').addEventListener('click', () => { this._close(); this._more(id); });
    });
    p._upd = () => {
      const s = this._hass.states[id], on = s && s.state === 'on';
      p.querySelector('.sl').textContent = on ? 'Włączona' : 'Wyłączona';
      p.querySelector('.tg').classList.toggle('on', on);
    };
    p._upd();
  }
  _hwc(node) {
    // SMO40 nie ma rejestru wl/wyl cyrkulacji: "wylacz" = praca 1 min / postoj 60 min, "wlacz" = poprzednie czasy
    const hass = this._hass, E = this._E, KEY = 'hkpc_hwc_prev';
    const r = hass.states[E.hwc_run], s = hass.states[E.hwc_still];
    if (!r || !s) { this._more(E.hwc_run); return; }
    const run = Number(r.state), still = Number(s.state);
    const on = !(run <= 1 && still >= 60);
    let tr, ts;
    if (on) {
      try { localStorage.setItem(KEY, JSON.stringify({ run, still })); } catch (e) { /* brak */ }
      tr = 1; ts = 60;
    } else {
      let pv = null;
      try { pv = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { pv = null; }
      tr = pv && pv.run > 1 ? pv.run : 60; ts = pv && pv.run > 1 ? pv.still : 0;
    }
    hass.callService('number', 'set_value', { entity_id: E.hwc_run, value: tr });
    hass.callService('number', 'set_value', { entity_id: E.hwc_still, value: ts });
    this._waitFor(E.hwc_run, (st) => st[E.hwc_run] && Number(st[E.hwc_run].state) === tr && st[E.hwc_still] && Number(st[E.hwc_still].state) === ts, node);
  }

  _tap(el, node) {
    const t = el.tap, E = this._E, hass = this._hass;
    if (!t || !hass) return;
    if (t.a === 'num' && t.l) { this._num(t, node); return; }
    if (t.a === 'sel') { this._sel(t, node); return; }
    if (t.a === 'sw') { this._sw(t, node); return; }
    if (t.a === 'hwc') { this._close(); this._hwc(node); return; }
    this._close();
    if (t.a === 'more') {
      const ev = new Event('hass-more-info', { bubbles: true, composed: true });
      ev.detail = { entityId: E[t.k] };
      this.dispatchEvent(ev);
    } else if (t.a === 'toggle') {
      hass.callService('homeassistant', 'toggle', { entity_id: E[t.k] });
    } else if (t.a === 'script') {
      hass.callService('script', 'turn_on', { entity_id: 'script.' + t.s });
    } else if (t.a === 'num') {
      const s = hass.states[E[t.k]];
      if (!s) return;
      const v = Math.min(Number(s.attributes.max), Math.max(Number(s.attributes.min), Number(s.state) + t.d));
      hass.callService('number', 'set_value', { entity_id: E[t.k], value: v });
    }
  }

  async _maybeHistory() {
    const now = Date.now();
    if (this._histBusy || now - this._histAt < 5 * 60 * 1000) return;
    this._histBusy = true;
    try {
      const start = new Date(now - 24 * 3600 * 1000).toISOString();
      const ids = TREND.map((k) => this._E[k]).join(',');
      const r = await this._hass.callApi('GET', 'history/period/' + start + '?filter_entity_id=' + ids + '&minimal_response&no_attributes');
      const out = {};
      (r || []).forEach((arr) => {
        if (!arr.length) return;
        const id = arr[0].entity_id;
        const k = TREND.find((kk) => this._E[kk] === id);
        if (!k) return;
        out[k] = arr.map((p) => [Date.parse(p.last_changed || p.lu * 1000), parseFloat(p.state)]).filter((p) => !isNaN(p[1]) && !isNaN(p[0]));
      });
      this._hist = out;
    } catch (e) { console.warn('ha-karta-pompa-ciepla: historia', e); }
    this._histAt = Date.now();
    this._histBusy = false;
    this._render(false);
  }
}

if (!customElements.get('ha-karta-pompa-ciepla')) customElements.define('ha-karta-pompa-ciepla', HaKartaPompaCiepla);

// Panel boczny (panel_custom): osobna zakladka w lewym menu HA, karta dopasowana do ekranu.
class HaPompaCieplaPanel extends HTMLElement {
  connectedCallback() {
    if (this._root) return;
    this._root = this.attachShadow({ mode: 'open' });
    this._root.innerHTML = '<style>:host{display:block;min-height:100vh;background:#0e1013}' +
      '.bar{display:flex;align-items:center;gap:8px;height:56px;padding:0 8px;color:#eef2f6;font:500 20px ' + FONT + ';background:#15181d;border-bottom:1px solid rgba(255,255,255,.08)}' +
      '.wrap{box-sizing:border-box;padding:8px;margin:0 auto;width:100%;max-width:calc((100vh - 72px) * 1672 / 941)}' +
      '</style><div class="bar"><ha-menu-button></ha-menu-button><span>Pompa ciepła</span></div><div class="wrap"></div>';
    this._menu = this._root.querySelector('ha-menu-button');
    this._card = document.createElement('ha-karta-pompa-ciepla');
    this._card.setConfig((this.panel && this.panel.config) || {});
    this._root.querySelector('.wrap').appendChild(this._card);
    this._sync();
  }
  set hass(h) { this._hass = h; this._sync(); }
  set narrow(n) { this._narrow = n; this._sync(); }
  set panel(p) { this._panel = p; if (this._card) this._card.setConfig((p && p.config) || {}); this._sync(); }
  get panel() { return this._panel; }
  _sync() {
    if (!this._card || !this._hass) return;
    this._card.hass = this._hass;
    if (this._menu) { this._menu.hass = this._hass; this._menu.narrow = this._narrow; }
  }
}
if (!customElements.get('ha-pompa-ciepla-panel')) customElements.define('ha-pompa-ciepla-panel', HaPompaCieplaPanel);
// Auto-zakladka: przy pierwszym zaladowaniu HA (konto admina) zaklada dashboard "Pompa ciepla"
// widoczny w lewym menu. Jednorazowo (flaga w localStorage). Jesli dashboard juz jest, nic nie robi.
// Wylaczenie: localStorage.setItem('hkpc_auto_dashboard', 'off') w konsoli przegladarki.
(() => {
  const FLAG = 'hkpc_auto_dashboard';
  const URL_PATH = 'pompa-ciepla';
  let flag = null;
  try { flag = localStorage.getItem(FLAG); } catch (e) { return; }
  if (flag) return;
  const setFlag = (v) => { try { localStorage.setItem(FLAG, v); } catch (e) { /* brak */ } };
  let tries = 0;
  const run = async () => {
    const ha = document.querySelector('home-assistant');
    const hass = ha && ha.hass;
    if (!hass || !hass.user || !hass.callWS) { if (++tries < 30) setTimeout(run, 2000); return; }
    if (!hass.user.is_admin) return;
    try {
      const list = await hass.callWS({ type: 'lovelace/dashboards/list' });
      if ((list || []).some((d) => d.url_path === URL_PATH) || (hass.panels && hass.panels[URL_PATH])) { setFlag('exists'); return; }
      await hass.callWS({ type: 'lovelace/dashboards/create', url_path: URL_PATH, title: 'Pompa ciepła',
        icon: 'mdi:heat-pump', show_in_sidebar: true, require_admin: false, mode: 'storage' });
      await hass.callWS({ type: 'lovelace/config/save', url_path: URL_PATH, config: {
        title: 'Pompa ciepła',
        views: [{ title: 'Pompa ciepła', path: 'pompa-ciepla', icon: 'mdi:heat-pump', type: 'panel', cards: [{ type: 'custom:ha-karta-pompa-ciepla' }] }],
      } });
      setFlag('created');
      console.info('ha-karta-pompa-ciepla: utworzono dashboard /' + URL_PATH + ' w lewym menu');
    } catch (e) {
      console.info('ha-karta-pompa-ciepla: auto-dashboard pominiety', e && (e.message || e.code || e));
    }
  };
  setTimeout(run, 1500);
})();

window.customCards = window.customCards || [];
if (!window.customCards.find((c) => c.type === 'ha-karta-pompa-ciepla')) {
  window.customCards.push({ type: 'ha-karta-pompa-ciepla', name: 'Karta pompy ciepła (MHI Hydrolution)', description: 'Panel pompy ciepła na tle instalacji, encje ESPHome hydrolution v5.3', preview: false });
}
console.info('%c ha-karta-pompa-ciepla ' + VERSION + ' ', 'background:#1e88e5;color:#fff;border-radius:3px');
})();
