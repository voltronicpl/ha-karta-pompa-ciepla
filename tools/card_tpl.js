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
  '#sch{container-type:inline-size;box-sizing:border-box;padding:2cqw 2cqw 2.4cqw;color:#eef2f6;font-family:' + FONT + ';font-size:clamp(11px,1.05cqw,15px);background:#0e1013}' +
  '#sch .sh{border-radius:12px;padding:1.4em 1.6em;background:linear-gradient(180deg,rgba(42,48,58,.85),rgba(20,24,31,.9));border:1px solid rgba(255,255,255,.13);box-shadow:0 6px 18px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.07)}' +
  '#sch .sht{display:flex;align-items:center;gap:.8em;font-size:1.45em;font-weight:600;margin-bottom:.9em}#sch .sht small{font-size:.65em;font-weight:400;opacity:.7}' +
  '#sch button,#sch select,#sch input{font:inherit;color:#fff;box-sizing:border-box}' +
  '#sch button{cursor:pointer;border:1px solid rgba(255,255,255,.16);background:rgba(62,70,82,.85);border-radius:8px;padding:.45em .9em}#sch button:hover{border-color:rgba(110,193,255,.8)}' +
  '#sch .tabs{display:flex;flex-wrap:wrap;gap:.5em;margin-bottom:1em}#sch .tab{display:flex;align-items:center;gap:.5em}' +
  '#sch .tab.on{background:linear-gradient(180deg,#2b8cf2,#1260bf);border-color:#6ec1ff;font-weight:600}' +
  '#sch .dot{width:.7em;height:.7em;border-radius:50%;background:#59626d}#sch .dot.a{background:#43d343;box-shadow:0 0 6px #43d343}#sch .dot.w{background:#ffb300;box-shadow:0 0 6px #ffb300}' +
  '#sch .warn{margin:0 0 1em;padding:.7em 1em;border-radius:8px;background:rgba(255,160,0,.15);border:1px solid rgba(255,180,0,.6);color:#ffd9a0}' +
  '#sch .info{margin:0 0 1em;padding:.7em 1em;border-radius:8px;background:rgba(41,182,246,.12);border:1px solid rgba(41,182,246,.45)}' +
  '#sch .lh{display:flex;flex-wrap:wrap;align-items:center;gap:.6em 1.6em;margin-bottom:.8em}#sch .lh .ds{opacity:.8;flex:1 1 22em}' +
  '#sch .tg{position:relative;width:3.6em;height:1.9em;border-radius:999px;background:#4a525e;border:none;padding:0}#sch .tg i{position:absolute;top:.2em;left:.2em;width:1.5em;height:1.5em;border-radius:50%;background:#fff;transition:left .15s}' +
  '#sch .tg.on{background:linear-gradient(180deg,#36a3ff,#1a7fe0);box-shadow:0 0 10px rgba(33,150,243,.6)}#sch .tg.on i{left:1.9em}' +
  '#sch .pr{display:flex;flex-wrap:wrap;gap:.6em 1.6em;margin-bottom:1em}#sch .pr label{display:flex;align-items:center;gap:.5em}' +
  '#sch .pr input,#sch .pr select{height:2.1em;border-radius:6px;background:rgba(10,12,16,.85);border:1px solid rgba(110,193,255,.5);padding:0 .5em}#sch .pr input{width:5em;text-align:center}' +
  '#sch .hr{position:relative;display:flex;margin-left:3.2em;margin-right:2.6em;height:1.4em;font-size:.85em;opacity:.75}#sch .hr span{position:absolute;transform:translateX(-50%)}' +
  '#sch .dr{display:flex;align-items:center;gap:.5em;margin:.35em 0}#sch .dn{flex:0 0 2.7em;font-weight:600}#sch .dn.td{color:#7ec8ff}' +
  '#sch .tl{position:relative;flex:1;height:2.5em;border-radius:7px;background:rgba(10,12,16,.65);border:1px solid rgba(255,255,255,.1);cursor:crosshair;touch-action:none;' +
  'background-image:repeating-linear-gradient(90deg,transparent 0,transparent calc(12.5% - 1px),rgba(255,255,255,.08) calc(12.5% - 1px),rgba(255,255,255,.08) 12.5%)}' +
  '#sch .bk{position:absolute;top:2px;bottom:2px;border-radius:5px;background:linear-gradient(180deg,var(--c),var(--c2));border:1px solid rgba(255,255,255,.55);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:.8em;overflow:hidden;white-space:nowrap;text-shadow:0 1px 2px rgba(0,0,0,.6)}' +
  '#sch .bk.sel{outline:2px solid #fff;z-index:2}#sch .bk.tmp{opacity:.6}' +
  '#sch .nw{position:absolute;top:-2px;bottom:-2px;width:2px;background:#ff5a4a;z-index:3;pointer-events:none}' +
  '#sch .cp{flex:0 0 auto;padding:.3em .55em}' +
  '#sch .ed{display:flex;flex-wrap:wrap;align-items:center;gap:.6em;margin:.9em 0 0;padding:.7em 1em;border-radius:8px;background:rgba(255,255,255,.05);border:1px solid rgba(110,193,255,.4)}#sch .ed input{height:2.1em;border-radius:6px;background:rgba(10,12,16,.85);border:1px solid rgba(110,193,255,.5);padding:0 .5em}' +
  '#sch .ft{display:flex;flex-wrap:wrap;align-items:center;gap:.7em;margin-top:1em}#sch .ft .hint{flex:1 1 20em;opacity:.65;font-size:.9em}#sch .ft .sv{background:linear-gradient(180deg,#2b8cf2,#1260bf);border-color:#6ec1ff;font-weight:600}#sch .ft button[disabled]{opacity:.4;cursor:default}' +
  '.ed2{--u:calc(100cqw / 1672);position:absolute;z-index:20;box-sizing:border-box;padding:calc(var(--u)*3);border-radius:calc(var(--u)*8);' +
  'background:linear-gradient(180deg,rgba(40,46,56,.98),rgba(20,24,31,.98));border:1px solid rgba(110,193,255,.75);box-shadow:0 0 calc(var(--u)*10) rgba(33,150,243,.5);' +
  'display:flex;flex-direction:column;gap:calc(var(--u)*2);color:#eef2f6;animation:hppop .12s ease-out}' +
  '.ed2 .lb{font-size:calc(var(--u)*10.5);text-align:center;opacity:.85;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.1}' +
  '.ed2 .rw{display:flex;gap:calc(var(--u)*2);align-items:stretch}' +
  '.ed2 button{font:inherit;color:#fff;cursor:pointer;border:1px solid rgba(255,255,255,.18);background:rgba(62,70,82,.92);border-radius:calc(var(--u)*5);padding:0;line-height:1}' +
  '.ed2 button:hover{border-color:rgba(110,193,255,.8)}.ed2 .a{flex:1;height:calc(var(--u)*17);font-size:calc(var(--u)*11)}.ed2 .a:active{background:#1260bf}' +
  '.ed2 input{flex:1;width:100%;min-width:0;box-sizing:border-box;height:calc(var(--u)*20);text-align:center;font-weight:700;font-size:calc(var(--u)*15);font-family:inherit;color:#fff;' +
  'background:rgba(10,12,16,.85);border:1px solid rgba(110,193,255,.55);border-radius:calc(var(--u)*5);padding:0;-moz-appearance:textfield}' +
  '.ed2 input::-webkit-inner-spin-button,.ed2 input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.ed2 input.bad{border-color:#ff5a4a}' +
  '.ed2 .sv{height:calc(var(--u)*16);font-size:calc(var(--u)*10.5);font-weight:600;background:linear-gradient(180deg,#2b8cf2,#1260bf);border-color:#6ec1ff}' +
  '.ed2.wd .a{flex:0 0 calc(var(--u)*26);height:calc(var(--u)*22)}.ed2.wd input{height:calc(var(--u)*22)}' +
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
      '</style><ha-card><div id="c"><img alt="" src="' + img + '"></div><div id="sch"></div></ha-card>';
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
    this._sch = this._sch || { lane: 'noc', data: {}, draft: {}, dirty: {}, sel: null, loaded: false, sig: '' };
    this._schEl = root.getElementById('sch');
    this._schBind();
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
    this._schTick();
  }


  // ====================== HARMONOGRAM (tydzien) ======================
  _schLanes() {
    return [
      { k: 'noc', n: 'Obniżenie CO', sch: 'schedule.hp_plan_obnizenie_co', en: 'input_boolean.hp_plan_noc', t: 'HP plan obnizenie CO', ic: 'mdi:weather-night', c: '#3f7cff', c2: '#2a56c9',
        d: 'W oknie przesuwa krzywą grzewczą, poza oknem wraca do wartości dziennej.',
        p: [{ e: 'input_number.hp_noc_przesuniecie', l: 'Przesunięcie w oknie', u: '°C', def: -2 }, { e: 'input_number.hp_dzien_przesuniecie', l: 'Przesunięcie poza oknem', u: '°C', def: 0 }] },
      { k: 'cwu', n: 'Tryb CWU', sch: 'schedule.hp_plan_tryb_cwu', en: 'input_boolean.hp_plan_cwu', t: 'HP plan tryb CWU', ic: 'mdi:water-boiler', c: '#1fa5f5', c2: '#0f74b8',
        d: 'W oknie ustawia wybrany tryb CWU, poza oknem drugi.',
        p: [{ e: 'input_select.hp_cwu_tryb_w_oknie', l: 'Tryb w oknie', def: 'Luksus' }, { e: 'input_select.hp_cwu_tryb_poza', l: 'Tryb poza oknem', def: 'Normalny' }] },
      { k: 'cyrk', n: 'Cyrkulacja CWU', sch: 'schedule.hp_plan_cyrkulacja_cwu', en: 'input_boolean.hp_plan_cyrk', t: 'HP plan cyrkulacja CWU', ic: 'mdi:autorenew', c: '#43c25a', c2: '#2a8a3c',
        d: 'W oknie cyrkulacja pracuje wg czasów poniżej. Poza oknem: praca 1 min / postój 60 min (sterownik nie ma pełnego wyłączenia).',
        p: [{ e: 'input_number.hp_cyrk_praca', l: 'Praca w oknie', u: 'min', def: 60 }, { e: 'input_number.hp_cyrk_postoj', l: 'Postój w oknie', u: 'min', def: 0 }] },
      { k: 'grz', n: 'Grzałka', sch: 'schedule.hp_plan_grzalka', en: 'input_boolean.hp_plan_grz', t: 'HP plan grzalka', ic: 'mdi:flash', c: '#ffb300', c2: '#c27d00',
        d: 'Grzałka elektryczna jest dozwolona tylko w oknach.', p: [] },
      { k: 'boost', n: 'Podgrzanie CWU', sch: 'schedule.hp_plan_podgrzanie_cwu', en: 'input_boolean.hp_plan_boost', t: 'HP plan podgrzanie CWU', ic: 'mdi:water-thermometer', c: '#ff5a3c', c2: '#b8331b',
        d: 'Na początku każdego okna uruchamia jednorazowe podgrzanie CWU.', p: [] },
    ];
  }
  _schDays() { return ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']; }
  _schMin(t) { const m = /^(\d+):(\d+)/.exec(t || ''); return m ? Number(m[1]) * 60 + Number(m[2]) : 0; }
  _schFmt(m, sec) { m = Math.max(0, Math.min(1440, Math.round(m))); const h = Math.floor(m / 60), mm = m % 60; return String(h).padStart(2, '0') + ':' + String(mm).padStart(2, '0') + (sec ? ':00' : ''); }
  _schNorm(arr) {
    const a = (arr || []).map((b) => ({ f: Math.max(0, Math.min(1440, b.f)), t: Math.max(0, Math.min(1440, b.t)) })).filter((b) => b.t > b.f).sort((x, y) => x.f - y.f);
    const out = [];
    a.forEach((b) => { const l = out[out.length - 1]; if (l && b.f <= l.t) l.t = Math.max(l.t, b.t); else out.push({ f: b.f, t: b.t }); });
    return out;
  }
  _schFromItem(item) {
    const o = {};
    this._schDays().forEach((d) => { o[d] = this._schNorm(((item && item[d]) || []).map((b) => ({ f: this._schMin(b.from), t: this._schMin(b.to) || (b.to && /^24/.test(b.to) ? 1440 : 0) }))); });
    return o;
  }
  _schDraft(lane) {
    const S = this._sch;
    if (!S.draft[lane.k]) S.draft[lane.k] = JSON.parse(JSON.stringify(this._schFromItem(S.data[lane.k])));
    return S.draft[lane.k];
  }
  async _schLoad() {
    const S = this._sch;
    if (!this._hass || !this._hass.callWS) return;
    try {
      const list = await this._hass.callWS({ type: 'schedule/list' });
      const by = {}; (list || []).forEach((i) => { by[i.id] = i; });
      this._schLanes().forEach((l) => {
        const id = l.sch.split('.')[1];
        if (by[id]) { S.data[l.k] = by[id]; if (!S.dirty[l.k]) delete S.draft[l.k]; } else delete S.data[l.k];
      });
      S.loaded = true; S.err = '';
    } catch (e) { S.loaded = true; S.err = 'Brak uprawnień do odczytu harmonogramów (potrzebne konto administratora).'; }
    this._schRender(true);
  }
  _schTick() {
    const S = this._sch;
    if (!S || !this._schEl || !this._hass) return;
    if (!S.loaded && !S.loading) { S.loading = true; this._schLoad().then(() => { S.loading = false; S.t = Date.now(); }); return; }
    if (S.loaded && Date.now() - (S.t || 0) > 300000 && !S.loading) { S.loading = true; this._schLoad().then(() => { S.loading = false; S.t = Date.now(); }); }
    const st = this._hass.states, E = this._E;
    const ids = []; this._schLanes().forEach((l) => { ids.push(l.sch, l.en); l.p.forEach((q) => ids.push(q.e)); });
    ids.push(E.sch_n, E.sch_hw);
    const sig = ids.map((i) => (st[i] ? st[i].state + (st[i].attributes && st[i].attributes.next_event || '') : '?')).join('|');
    const busy = S.drag || (this._schEl.shadowRoot ? false : false) || (this._root && this._root.activeElement && this._schEl.contains(this._root.activeElement));
    if (sig !== S.sig && !busy) { S.sig = sig; this._schRender(true); }
  }
  _schRender() {
    const S = this._sch, el = this._schEl, hass = this._hass;
    if (!el || !hass) return;
    const st = hass.states, E = this._E;
    const lanes = this._schLanes(), lane = lanes.find((l) => l.k === S.lane) || lanes[0];
    const DL = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'], days = this._schDays();
    const esc = (x) => String(x).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const missing = lanes.filter((l) => !st[l.sch]);
    const espOn = (st[E.sch_n] && st[E.sch_n].state === 'on') || (st[E.sch_hw] && st[E.sch_hw].state === 'on');
    let h = '<div class="sh"><div class="sht">Harmonogram<small>tydzień, wszystko robi Home Assistant</small></div>';
    if (espOn) h += '<div class="warn">⚠ Na ESP jest włączony własny harmonogram („Harmonogram nocny / CWU aktywny”). Planem ma rządzić Home Assistant, więc wyłącz go, bo będą się gryźć. <button data-a="more" data-e="' + (st[E.sch_n] && st[E.sch_n].state === 'on' ? E.sch_n : E.sch_hw) + '">Pokaż przełącznik</button></div>';
    h += '<div class="tabs">' + lanes.map((l) => {
      const on = st[l.en] && st[l.en].state === 'on', inw = st[l.sch] && st[l.sch].state === 'on';
      return '<button class="tab' + (l.k === lane.k ? ' on' : '') + '" data-a="lane" data-k="' + l.k + '"><span class="dot' + (on ? (inw ? ' w' : ' a') : '') + '"></span>' + esc(l.n) + (S.dirty[l.k] ? ' •' : '') + '</button>';
    }).join('') + '</div>';
    if (S.err) h += '<div class="info">' + esc(S.err) + '</div>';
    if (missing.length) {
      h += '<div class="info">Brakuje harmonogramów w Home Assistant (' + missing.length + ' z 5). ' +
        (hass.user && hass.user.is_admin ? '<button data-a="mk">Utwórz harmonogramy</button>' : 'Poproś administratora o ich utworzenie.') +
        ' Pomocnicze przełączniki i automatyzacje dodaje pakiet <code>packages/hydrolution_karta.yaml</code> z repozytorium.</div>';
    }
    if (!st[lane.sch]) { el.innerHTML = h + '</div>'; return; }
    const on = st[lane.en] && st[lane.en].state === 'on', inw = st[lane.sch].state === 'on';
    const ne = st[lane.sch].attributes && st[lane.sch].attributes.next_event;
    let nxt = '';
    if (ne) { const d = new Date(ne); if (!isNaN(d)) nxt = ' · najbliższa zmiana: ' + d.toLocaleString('pl-PL', { weekday: 'short', hour: '2-digit', minute: '2-digit' }); }
    h += '<div class="lh"><button class="tg' + (on ? ' on' : '') + '" data-a="en" title="Włącz / wyłącz tę funkcję"><i></i></button><b>' + (on ? 'Aktywne' : 'Wyłączone') + '</b>' +
      '<span>Teraz: <b>' + (inw ? 'w oknie' : 'poza oknem') + '</b>' + esc(nxt) + '</span><span class="ds">' + esc(lane.d) + '</span></div>';
    if (!st[lane.en]) h += '<div class="info">Brak przełącznika <code>' + lane.en + '</code>. Dodaj pakiet HA z repozytorium (packages/hydrolution_karta.yaml) i przeładuj konfigurację.</div>';
    if (lane.p.length) {
      h += '<div class="pr">' + lane.p.map((q) => {
        const s = st[q.e]; if (!s) return '<label>' + esc(q.l) + ': <i>brak encji</i></label>';
        if (q.e.startsWith('input_select')) return '<label>' + esc(q.l) + '<select data-a="par" data-e="' + q.e + '">' + (s.attributes.options || []).map((o) => '<option' + (o === s.state ? ' selected' : '') + '>' + esc(o) + '</option>').join('') + '</select></label>';
        return '<label>' + esc(q.l) + '<input type="number" data-a="par" data-e="' + q.e + '" value="' + Number(s.state) + '" min="' + s.attributes.min + '" max="' + s.attributes.max + '" step="' + (s.attributes.step || 1) + '">' + (q.u || '') + '</label>';
      }).join('') + '</div>';
    }
    const dr = this._schDraft(lane);
    const now = new Date(), nowMin = now.getHours() * 60 + now.getMinutes(), wd = (now.getDay() + 6) % 7;
    h += '<div class="hr">' + [0, 3, 6, 9, 12, 15, 18, 21, 24].map((x) => '<span style="left:' + (x / 24 * 100) + '%">' + x + '</span>').join('') + '</div>';
    days.forEach((d, i) => {
      h += '<div class="dr"><span class="dn' + (i === wd ? ' td' : '') + '">' + DL[i] + '</span><div class="tl" data-day="' + d + '" style="--c:' + lane.c + ';--c2:' + lane.c2 + '">';
      dr[d].forEach((b, j) => {
        const sel = S.sel && S.sel.d === d && S.sel.i === j;
        h += '<div class="bk' + (sel ? ' sel' : '') + '" data-a="bk" data-d="' + d + '" data-i="' + j + '" style="left:' + (b.f / 14.4) + '%;width:' + ((b.t - b.f) / 14.4) + '%">' + this._schFmt(b.f) + '–' + this._schFmt(b.t) + '</div>';
      });
      if (i === wd) h += '<div class="nw" style="left:' + (nowMin / 14.4) + '%"></div>';
      h += '</div><button class="cp" data-a="cp" data-d="' + d + '" title="Skopiuj ten dzień na wszystkie dni">⧉</button></div>';
    });
    if (S.sel && dr[S.sel.d] && dr[S.sel.d][S.sel.i]) {
      const b = dr[S.sel.d][S.sel.i];
      h += '<div class="ed">Okno <b>' + DL[days.indexOf(S.sel.d)] + '</b>: od <input type="time" data-a="tf" value="' + this._schFmt(b.f) + '"> do <input type="time" data-a="tt" value="' + this._schFmt(b.t === 1440 ? 1440 : b.t) + '"> <button data-a="del">Usuń okno</button><span style="opacity:.6">(koniec 00:00 = do północy)</span></div>';
    }
    const dirty = !!S.dirty[lane.k];
    h += '<div class="ft"><span class="hint">Przeciągnij po osi czasu, żeby dodać okno (krok 15 min). Kliknij okno, żeby je edytować. ⧉ kopiuje dzień na wszystkie dni. Czerwona kreska = teraz.</span>' +
      '<button data-a="undo"' + (dirty ? '' : ' disabled') + '>Cofnij zmiany</button><button class="sv" data-a="save"' + (dirty ? '' : ' disabled') + '>Zapisz harmonogram</button></div></div>';
    el.innerHTML = h;
  }
  _schBind() {
    const el = this._schEl, S = () => this._sch;
    if (!el || el._bound) return;
    el._bound = true;
    const lane = () => this._schLanes().find((l) => l.k === S().lane) || this._schLanes()[0];
    const snap = (ev, tl) => { const r = tl.getBoundingClientRect(); const x = Math.max(0, Math.min(1, (ev.clientX - r.left) / r.width)); return Math.round(x * 96) * 15; };
    const mark = () => { S().dirty[lane().k] = true; };
    el.addEventListener('pointerdown', (ev) => {
      const tl = ev.target.closest && ev.target.closest('.tl');
      if (!tl || (ev.target.closest('.bk'))) return;
      ev.preventDefault();
      const d = tl.getAttribute('data-day'), a = snap(ev, tl);
      S().drag = { tl, d, a, b: a, tmp: null };
      try { tl.setPointerCapture(ev.pointerId); } catch (e) { /* brak */ }
    });
    el.addEventListener('pointermove', (ev) => {
      const g = S().drag; if (!g) return;
      g.b = snap(ev, g.tl);
      if (!g.tmp) { g.tmp = document.createElement('div'); g.tmp.className = 'bk tmp'; g.tl.appendChild(g.tmp); }
      const f = Math.min(g.a, g.b), t = Math.max(g.a, g.b);
      g.tmp.style.left = (f / 14.4) + '%'; g.tmp.style.width = ((t - f) / 14.4) + '%';
      g.tmp.textContent = this._schFmt(f) + '–' + this._schFmt(t);
    });
    const endDrag = () => {
      const g = S().drag; if (!g) return;
      S().drag = null;
      let f = Math.min(g.a, g.b), t = Math.max(g.a, g.b);
      if (t - f < 15) { f = Math.min(g.a, 1380); t = f + 60; }
      const dr = this._schDraft(lane());
      dr[g.d].push({ f, t });
      dr[g.d] = this._schNorm(dr[g.d]);
      S().sel = { d: g.d, i: dr[g.d].findIndex((b) => b.f <= f && b.t >= t) };
      mark(); this._schRender();
    };
    el.addEventListener('pointerup', endDrag);
    el.addEventListener('pointercancel', () => { const g = S().drag; if (g && g.tmp) g.tmp.remove(); S().drag = null; });
    el.addEventListener('click', (ev) => {
      const t = ev.target.closest && ev.target.closest('[data-a]'); if (!t) return;
      const a = t.getAttribute('data-a'), hass = this._hass, l = lane(), dr = this._schDraft(l);
      if (a === 'lane') { S().lane = t.getAttribute('data-k'); S().sel = null; this._schRender(); }
      else if (a === 'more') this._more(t.getAttribute('data-e'));
      else if (a === 'bk') { S().sel = { d: t.getAttribute('data-d'), i: Number(t.getAttribute('data-i')) }; this._schRender(); }
      else if (a === 'cp') {
        const src = JSON.parse(JSON.stringify(dr[t.getAttribute('data-d')]));
        this._schDays().forEach((d) => { dr[d] = JSON.parse(JSON.stringify(src)); });
        S().sel = null; mark(); this._schRender();
      }
      else if (a === 'del') { const s = S().sel; if (s) { dr[s.d].splice(s.i, 1); S().sel = null; mark(); this._schRender(); } }
      else if (a === 'undo') { delete S().draft[l.k]; delete S().dirty[l.k]; S().sel = null; this._schRender(); }
      else if (a === 'save') this._schSave(l);
      else if (a === 'en') hass.callService('input_boolean', 'toggle', { entity_id: l.en });
      else if (a === 'mk') this._schCreate();
    });
    el.addEventListener('change', (ev) => {
      const t = ev.target, a = t.getAttribute && t.getAttribute('data-a'); if (!a) return;
      const l = lane(), dr = this._schDraft(l), hass = this._hass;
      if (a === 'par') {
        const e = t.getAttribute('data-e');
        if (e.startsWith('input_select')) hass.callService('input_select', 'select_option', { entity_id: e, option: t.value });
        else { const v = parseFloat(String(t.value).replace(',', '.')); if (!isNaN(v)) hass.callService('input_number', 'set_value', { entity_id: e, value: v }); }
      } else if ((a === 'tf' || a === 'tt') && S().sel) {
        const s = S().sel, b = dr[s.d][s.i]; if (!b) return;
        let m = this._schMin(t.value); if (a === 'tt' && m === 0) m = 1440;
        if (a === 'tf') b.f = m; else b.t = m;
        if (b.t <= b.f) { if (a === 'tf') b.f = Math.max(0, b.t - 15); else b.t = Math.min(1440, b.f + 15); }
        dr[s.d] = this._schNorm(dr[s.d]);
        S().sel = { d: s.d, i: Math.max(0, dr[s.d].findIndex((x) => x.f <= b.f && x.t >= b.t)) };
        mark(); this._schRender();
      }
    });
  }
  async _schSave(l) {
    const S = this._sch, dr = this._schDraft(l);
    const body = { name: l.t, icon: l.ic };
    this._schDays().forEach((d) => { body[d] = dr[d].map((b) => ({ from: this._schFmt(b.f, true), to: this._schFmt(b.t, true) })); });
    try {
      if (S.data[l.k]) await this._hass.callWS(Object.assign({ type: 'schedule/update', schedule_id: S.data[l.k].id }, body));
      else await this._hass.callWS(Object.assign({ type: 'schedule/create' }, body));
      delete S.dirty[l.k]; delete S.draft[l.k]; S.sel = null; S.err = '';
      await this._schLoad();
    } catch (e) { S.err = 'Nie udało się zapisać harmonogramu: ' + (e && (e.message || e.code) || e); this._schRender(); }
  }
  async _schCreate() {
    const S = this._sch, hass = this._hass;
    try {
      for (const l of this._schLanes()) {
        if (hass.states[l.sch]) continue;
        const body = { type: 'schedule/create', name: l.t, icon: l.ic };
        this._schDays().forEach((d) => { body[d] = []; });
        await hass.callWS(body);
        for (const q of l.p) {
          const s = hass.states[q.e]; if (!s || q.def === undefined) continue;
          if (q.e.startsWith('input_select')) hass.callService('input_select', 'select_option', { entity_id: q.e, option: q.def });
          else hass.callService('input_number', 'set_value', { entity_id: q.e, value: q.def });
        }
      }
      S.err = '';
    } catch (e) { S.err = 'Nie udało się utworzyć harmonogramów: ' + (e && (e.message || e.code) || e); }
    setTimeout(() => this._schLoad(), 1500);
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
    // kompaktowy edytor: nakladka dokladnie na kaflu (male ▲ ▼, pole do wpisania, maly "Zapisz" pod spodem)
    const hass = this._hass, id = this._E[t.k], s = hass.states[id];
    if (!s) { this._more(id); return; }
    const a = s.attributes, mn = Number(a.min), mx = Number(a.max), stp = Number(a.step) || 1;
    const dec = (String(stp).split('.')[1] || '').length;
    const clamp = (v) => Math.min(mx, Math.max(mn, Math.round(v / stp) * stp));
    this._close();
    const WW = 1672, HH = 941;
    let [rx, ry, rw, rh] = t.r || [0, 0, 70, 76];
    rx = Math.max(2, Math.min(WW - rw - 2, rx)); ry = Math.max(2, Math.min(HH - rh - 2, ry));
    const wide = rw >= 100;
    const p = document.createElement('div');
    p.className = 'ed2' + (wide ? ' wd' : '');
    p.style.left = (rx / WW * 100) + '%'; p.style.top = (ry / HH * 100) + '%';
    p.style.width = (rw / WW * 100) + '%'; p.style.height = (rh / HH * 100) + '%';
    const lab = t.s || t.l || a.friendly_name || id;
    p.innerHTML = '<div class="lb"></div>' + (wide
      ? '<div class="rw"><button class="a dn">▼</button><input type="number" inputmode="decimal"><button class="a up">▲</button></div>'
      : '<div class="rw"><button class="a up">▲</button><button class="a dn">▼</button></div><input type="number" inputmode="decimal">') +
      '<button class="sv">Zapisz</button>';
    p.querySelector('.lb').textContent = lab;
    p.title = (t.l || lab) + ' (' + mn + ' … ' + mx + ')';
    p.addEventListener('click', (ev) => ev.stopPropagation());
    p.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') this._close(); });
    const inp = p.querySelector('input');
    inp.min = mn; inp.max = mx; inp.step = stp; inp.value = Number(s.state).toFixed(dec);
    const bump = (d) => {
      const v = parseFloat(String(inp.value).replace(',', '.'));
      inp.value = clamp((isNaN(v) ? Number(s.state) : v) + d * stp).toFixed(dec);
      inp.classList.remove('bad');
    };
    let tm = null, iv = null;
    const stop = () => { clearTimeout(tm); clearInterval(iv); };
    p.querySelectorAll('.a').forEach((x) => {
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
    p.querySelector('.sv').addEventListener('click', save);
    this._c.appendChild(p);
    this._pop = p;
    setTimeout(() => { inp.focus(); inp.select(); }, 30);
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
    if (t.a === 'schscroll') { this._close(); if (this._schEl && this._schEl.scrollIntoView) this._schEl.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
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
