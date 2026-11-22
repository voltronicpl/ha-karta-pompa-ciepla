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
  '#sch{box-sizing:border-box;padding:12px;color:#eef2f6;font-family:' + FONT + ';font-size:13px;background:#0e1013}' +
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
  '#sch .tl{position:relative;flex:1;height:2.5em;border-radius:7px;background:rgba(10,12,16,.65);border:1px solid rgba(255,255,255,.1);cursor:crosshair;touch-action:pan-y;' +
  'background-image:repeating-linear-gradient(90deg,transparent 0,transparent calc(12.5% - 1px),rgba(255,255,255,.08) calc(12.5% - 1px),rgba(255,255,255,.08) 12.5%)}' +
  '#sch .bk{position:absolute;top:2px;bottom:2px;border-radius:5px;background:linear-gradient(180deg,var(--c),var(--c2));border:1px solid rgba(255,255,255,.55);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:.8em;overflow:hidden;white-space:nowrap;text-shadow:0 1px 2px rgba(0,0,0,.6)}' +
  '#sch .bk.sel{outline:2px solid #fff;z-index:2}#sch .bk.tmp{opacity:.6}' +
  '#sch .nw{position:absolute;top:-2px;bottom:-2px;width:2px;background:#ff5a4a;z-index:3;pointer-events:none}' +
  '#sch .cp{flex:0 0 auto;padding:.3em .55em}' +
  '#sch .ed{display:flex;flex-wrap:wrap;align-items:center;gap:.6em;margin:.9em 0 0;padding:.7em 1em;border-radius:8px;background:rgba(255,255,255,.05);border:1px solid rgba(110,193,255,.4)}#sch .ed input{height:2.1em;border-radius:6px;background:rgba(10,12,16,.85);border:1px solid rgba(110,193,255,.5);padding:0 .5em}' +
  '#sch .ft{display:flex;flex-wrap:wrap;align-items:center;gap:.7em;margin-top:1em}#sch .ft .hint{flex:1 1 20em;opacity:.65;font-size:.9em}#sch .ft .sv{background:linear-gradient(180deg,#2b8cf2,#1260bf);border-color:#6ec1ff;font-weight:600}#sch .ft button[disabled]{opacity:.4;cursor:default}' +
  '.ed2{position:absolute;z-index:20;box-sizing:border-box;padding:calc(var(--u)*3);border-radius:calc(var(--u)*8);' +
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
const NAU_CSS = '#tb{display:flex;gap:.5em;padding-top:.8em;background:#0e1013}#tb button{font:inherit;font-size:1.05em;color:#eef2f6;cursor:pointer;border:1px solid rgba(255,255,255,.16);background:rgba(62,70,82,.85);border-radius:8px 8px 0 0;padding:.5em 1.4em}' +
  '#tb button.on{background:linear-gradient(180deg,#2b8cf2,#1260bf);border-color:#6ec1ff;font-weight:600}' +
  '#nau{box-sizing:border-box;padding:12px;color:#eef2f6;font-family:' + FONT + ';font-size:13px;background:#0e1013}#nau[hidden],#sch[hidden]{display:none}' +
  '#nau .kt{display:grid;grid-template-columns:repeat(auto-fit,minmax(14em,1fr));gap:.8em;margin-bottom:1em}#nau .k{display:flex;flex-direction:column;gap:.2em;padding:.8em 1em;border-radius:10px;background:rgba(10,12,16,.55);border:1px solid rgba(110,193,255,.3)}' +
  '#nau .k span{opacity:.8}#nau .k b{font-size:1.7em;color:#7ec8ff}#nau .k i{font-style:normal;opacity:.65;font-size:.9em}' +
  '#nau .sec{margin-top:1.1em;padding-top:.9em;border-top:1px solid rgba(255,255,255,.1)}#nau .st2{font-size:1.15em;font-weight:600;margin-bottom:.7em}#nau .st2 small{font-weight:400;opacity:.65;font-size:.8em}' +
  '#nau .cv{display:flex;flex-wrap:wrap;gap:1em;align-items:flex-start}#nau .cv svg{flex:1 1 30em;max-width:60em}' +
  '#nau .pv{display:grid;grid-template-columns:repeat(7,1fr);gap:.3em;flex:1 1 26em;font-size:.92em}#nau .pv div{display:flex;flex-direction:column;align-items:center;gap:.15em;padding:.45em .2em;border-radius:7px;background:rgba(10,12,16,.55);border:1px solid rgba(255,255,255,.08)}' +
  '#nau .pv em{font-style:normal;font-weight:700}#nau .pv em.u{color:#ff9e80}#nau .pv em.d{color:#7ee04a}' +
  '#nau .why{margin-top:.8em}#nau .wt{opacity:.8;margin-bottom:.3em}#nau .wr{display:flex;justify-content:space-between;gap:1em;padding:.35em .7em;border-radius:6px;background:rgba(255,255,255,.04);margin:.2em 0}#nau .wr b{white-space:nowrap;color:#7ee04a}' +
  '#nau .wn{opacity:.6;font-size:.88em;margin-top:.5em}' +
  '#nau input.cel{width:5em;height:2.1em;text-align:center;border-radius:6px;background:rgba(10,12,16,.85);border:1px solid rgba(110,193,255,.5);color:#fff;font:inherit;font-weight:700}#nau .lh button{padding:.35em .8em}' +
  '#nau .tl.ne{cursor:crosshair}#nau .mn{position:absolute;bottom:1px;height:3px;background:#ffd54f;border-radius:2px;pointer-events:none;z-index:1}#nau .bk.pr2{cursor:pointer}#nau .bk.pr2.sel{outline:2px solid #fff}#nau .tg[disabled]{opacity:.4}' +
  '#nau .tl.ro{cursor:default}#nau .lay{position:absolute;inset:0;border-radius:6px;pointer-events:none}#nau .bk.pr2{background:rgba(67,194,90,.25);border:2px solid #43d343}' +
  '#nau .nd{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:.5;font-size:.85em}' +
  '#nau .lg{display:flex;flex-wrap:wrap;gap:.4em 1.4em;margin:.6em 0 0 3.2em;opacity:.8;font-size:.9em}#nau .lg i{display:inline-block;width:1.4em;height:.8em;border-radius:3px;margin-right:.4em;vertical-align:middle}#nau .lg i.pb{border:2px solid #43d343;background:rgba(67,194,90,.25);box-sizing:border-box}' +
  '#nau .src{display:flex;flex-wrap:wrap;align-items:center;gap:.5em 1em;padding:.55em 0;border-bottom:1px solid rgba(255,255,255,.06)}#nau .sn{flex:0 0 15em;display:flex;flex-direction:column}#nau .sn small{opacity:.6}' +
  '#nau .chips{flex:1 1 20em;display:flex;flex-wrap:wrap;gap:.35em}#nau .chip{display:inline-flex;align-items:center;gap:.3em;padding:.2em .3em .2em .7em;border-radius:999px;background:rgba(41,182,246,.15);border:1px solid rgba(41,182,246,.45)}' +
  '#nau .chip button{padding:0 .45em;border:none;background:none;font-size:1.1em;line-height:1}#nau .chip button:hover{color:#ff8a80}' +
  '#nau .sa{display:flex;gap:.4em;flex:0 1 26em}#nau .sa input{flex:1;min-width:10em;height:2.1em;border-radius:6px;background:rgba(10,12,16,.85);border:1px solid rgba(110,193,255,.5);padding:0 .5em;color:#fff;font:inherit}';
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
      'ha-card{overflow:hidden;border-radius:var(--ha-card-border-radius,12px);background:#0e1013}#fw{margin:0 auto;background:#111}' +
      '#mw{width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch}#c{position:relative;width:100%;line-height:1.15;color:#eef2f6;font-family:' + FONT + '}' +
      '@media (max-width:700px){#c{min-width:860px}}' +
      '#c>img{display:block;width:100%;height:auto;user-select:none;pointer-events:none}' +
      '.el{position:absolute}.el.t{cursor:pointer}' + EXTRA.replace(':host { --u: calc(100cqw / 1672); }', '').replace(':host', '.el') + POP_CSS +
      NAU_CSS + POP_CSS.replace(/#sch\b/g, '#nau') +
      '</style><ha-card><div id="fw"><div id="mw"><div id="c"><img alt="" src="' + img + '"></div></div>' +
      '<div id="tb"><button data-t="sch">Harmonogram</button><button data-t="nau">Nauka</button></div><div id="sch"></div><div id="nau" hidden></div></div></ha-card>';
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
    this._fw = root.getElementById('fw');
    this._nauEl = root.getElementById('nau');
    this._tbEl = root.getElementById('tb');
    this._nau = this._nau || { res: null, loading: false, at: 0, err: '', sig: '' };
    let tab = 'sch'; try { tab = localStorage.getItem('hkpc_tab') === 'nau' ? 'nau' : 'sch'; } catch (e) { /* brak */ }
    this._tbEl.addEventListener('click', (ev) => { const b = ev.target.closest && ev.target.closest('[data-t]'); if (b) this._tab(b.getAttribute('data-t'), true); });
    this._tab(tab);
    this._fit = () => {
      // v1.14: karta (mapa + caly rzad paneli z krzywa) miesci sie na jednym ekranie: szerokosc ograniczona wysokoscia okna.
      // Telefon (<= 700 px) bez zmian jak w v1.13 (przewijanie w poziomie).
      const fw = this._fw, card = fw.parentElement;
      if (window.innerWidth > 700 && this._config.dopasuj_ekran !== false) {
        const cr = card.getBoundingClientRect();
        if (cr.top >= 0 && cr.top < 260) this._top = cr.top;
        const top = this._config.ekran_gora !== undefined ? Number(this._config.ekran_gora) : (this._top !== undefined ? this._top : 64);
        const mx = Math.max(480, (window.innerHeight - top - 6) * 1672 / 941);
        fw.style.maxWidth = mx < cr.width ? Math.floor(mx) + 'px' : '';
      } else fw.style.maxWidth = '';
      const w = c.getBoundingClientRect().width;
      if (w) c.style.setProperty('--u', (w / 1672) + 'px');
      const sw = this._schEl.getBoundingClientRect().width;
      if (sw) { this._schEl.style.fontSize = Math.max(11, Math.min(15, sw * 0.0105)) + 'px'; this._schEl.style.padding = Math.max(8, Math.min(30, sw * 0.02)) + 'px'; }
      const nw = (this._schEl.hidden ? this._nauEl : this._schEl).parentElement.getBoundingClientRect().width;
      if (nw) { [this._nauEl, this._tbEl].forEach((x) => { x.style.fontSize = Math.max(11, Math.min(15, nw * 0.0105)) + 'px'; }); this._nauEl.style.padding = Math.max(8, Math.min(30, nw * 0.02)) + 'px'; this._tbEl.style.paddingLeft = this._tbEl.style.paddingRight = Math.max(8, Math.min(30, nw * 0.02)) + 'px'; }
    };
    this._fit();
    try { if (window.ResizeObserver) { this._ro = new ResizeObserver(() => this._fit()); this._ro.observe(c); this._ro.observe(this._schEl); } } catch (e) { /* brak */ }
    window.addEventListener('resize', this._fit);
    setTimeout(this._fit, 50); setTimeout(this._fit, 600);
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
    this._nauTick();
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
    if (S.note && S.note.k === lane.k) h += '<div class="info">' + esc(S.note.t) + '</div>';
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
      if (a === 'lane') { S().lane = t.getAttribute('data-k'); S().sel = null; S().note = null; this._schRender(); }
      else if (a === 'more') this._more(t.getAttribute('data-e'));
      else if (a === 'bk') { S().sel = { d: t.getAttribute('data-d'), i: Number(t.getAttribute('data-i')) }; this._schRender(); }
      else if (a === 'cp') {
        const src = JSON.parse(JSON.stringify(dr[t.getAttribute('data-d')]));
        this._schDays().forEach((d) => { dr[d] = JSON.parse(JSON.stringify(src)); });
        S().sel = null; mark(); this._schRender();
      }
      else if (a === 'del') { const s = S().sel; if (s) { dr[s.d].splice(s.i, 1); S().sel = null; mark(); this._schRender(); } }
      else if (a === 'undo') { delete S().draft[l.k]; delete S().dirty[l.k]; S().sel = null; S().note = null; this._schRender(); }
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
      delete S.dirty[l.k]; delete S.draft[l.k]; S.sel = null; S.err = ''; S.note = null;
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

  // ====================== ZAKLADKI POD KARTA ======================
  _tab(t, user) {
    if (!this._schEl || !this._nauEl) return;
    this._tabCur = t === 'nau' ? 'nau' : 'sch';
    this._schEl.hidden = this._tabCur !== 'sch';
    this._nauEl.hidden = this._tabCur !== 'nau';
    this._tbEl.querySelectorAll('[data-t]').forEach((b) => b.classList.toggle('on', b.getAttribute('data-t') === this._tabCur));
    if (user) { try { localStorage.setItem('hkpc_tab', this._tabCur); } catch (e) { /* brak */ } }
    if (this._tabCur === 'nau') { this._nauRender(); this._nauTick(); } else if (this._hass) this._schRender();
    if (this._fit) setTimeout(this._fit, 0);
  }

  // ====================== NAUKA (tylko podglad, nic nie zmienia w pompie) ======================
  // Konfiguracja (opcjonalna) w karcie:
  //   nauka:
  //     t_dom: [sensor.salon_temperatura]   # czujniki temperatury w domu (domyslnie wykrywane po nazwie)
  //     cel: 21.5                           # docelowa temp. w domu (domyslnie mediana z historii)
  //     osoby: [person.misiek]              # obecnosc (domyslnie wszystkie person.*)
  //     aktywnosc: [light.salon]            # aktywnosc do wykrywania snu (domyslnie light.*, media_player.*, ladowanie telefonow)
  //     dni_krzywa: 60                      # max dni historii do krzywej (max 92)
  //     dni_cyrkulacja: 28                  # max dni historii do cyrkulacji
  _nauCfg() { return (this._config && this._config.nauka) || {}; }
  _nauSrc(k) { const s = this._nau && this._nau.src; return s && Array.isArray(s[k]) ? s[k].filter((i) => this._hass.states[i]) : null; }
  _nauSalon() {
    const st = this._hass.states, own = this._nauSrc('salon');
    if (own) return own.slice(0, 1);
    if (this._nauCfg().salon && st[this._nauCfg().salon]) return [this._nauCfg().salon];
    return Object.keys(st).filter((i) => { const a = st[i].attributes || {}; return i.startsWith('sensor.') && a.device_class === 'temperature' && /(salon|living)/i.test(i + ' ' + (a.friendly_name || '')) && !isNaN(parseFloat(st[i].state)); }).slice(0, 1);
  }
  _nauIndoor() {
    const c = this._nauCfg(), st = this._hass.states;
    if (this._nauSalon().length) return this._nauSalon();
    if (this._nauSrc('t_dom')) return this._nauSrc('t_dom');
    if (c.t_dom) return [].concat(c.t_dom).filter((i) => st[i]);
    const good = /(salon|pok[oó]j|pokoj|sypialn|kuchn|biuro|gabinet|parter|pi[eę]tr|pietr|wewn|indoor|living|bedroom|lazienk|łazienk|dzieci|korytarz|hol\b|w domu)/i;
    const bad = /(hydrolution|hp_|zewn|outdoor|outside|cwu|bufor|zasil|powr|lod[oó]w|zamra|freezer|fridge|cpu|procesor|bateri|battery|router|serwer|server|esp|piec|kocio|gara|piwnic|strych|szklarn|akwar|podłog|podlog|wylewk|rura)/i;
    return Object.keys(st).filter((i) => {
      if (!i.startsWith('sensor.')) return false;
      const a = st[i].attributes || {}, txt = i + ' ' + (a.friendly_name || '');
      return a.device_class === 'temperature' && /C/.test(a.unit_of_measurement || '') && !isNaN(parseFloat(st[i].state)) && good.test(txt) && !bad.test(txt);
    }).slice(0, 8);
  }
  _nauPersons() {
    const c = this._nauCfg(), st = this._hass.states;
    if (this._nauSrc('osoby')) return this._nauSrc('osoby');
    if (c.osoby) return [].concat(c.osoby).filter((i) => st[i]);
    const p = Object.keys(st).filter((i) => i.startsWith('person.'));
    return p.length ? p : Object.keys(st).filter((i) => i.startsWith('device_tracker.') && (st[i].attributes || {}).source_type !== 'bluetooth_le').slice(0, 10);
  }
  _nauActivity() {
    const c = this._nauCfg(), st = this._hass.states;
    if (this._nauSrc('aktywnosc')) return this._nauSrc('aktywnosc');
    if (c.aktywnosc) return [].concat(c.aktywnosc).filter((i) => st[i]);
    return Object.keys(st).filter((i) => /^(light|media_player)\./.test(i) ||
      /^binary_sensor\..*(interactive|is_charging|ladowan)/.test(i) || /^sensor\..*(battery_state|charger_type)/.test(i)).slice(0, 40);
  }
  _nauTick() {
    const N = this._nau;
    if (!N || !this._hass || this._tabCur !== 'nau') return;
    if (!N.loading && (!N.res || Date.now() - N.at > 30 * 60000)) { this._nauLoad(); return; }
    // odswiez tylko linie "teraz" (obecnosc, temperatura zewn.)
    const st = this._hass.states, E = this._E, ids = this._nauPersons().concat([E.bt1, E.auto_cyrk, E.pl_cyrk, E.hwc_run, E.hwc_still, 'zone.home']);
    const sig = ids.map((i) => (st[i] ? st[i].state : '?')).join('|') + '|' + Math.floor(Date.now() / 300000);
    const busy = N.drag || (this._nauEl && this._nauEl.contains(this.shadowRoot && this.shadowRoot.activeElement));
    if (sig !== N.sig && !busy) { N.sig = sig; this._nauRender(); }
  }
  async _nauStats(ids, startMs) {
    const out = {};
    if (!ids.length) return out;
    try {
      const r = await this._hass.callWS({ type: 'recorder/statistics_during_period', start_time: new Date(startMs).toISOString(), statistic_ids: ids, period: 'hour', types: ['mean'] });
      ids.forEach((id) => {
        out[id] = ((r && r[id]) || []).filter((p) => p.mean !== null && p.mean !== undefined).map((p) => [typeof p.start === 'number' ? p.start : Date.parse(p.start), Number(p.mean)]).filter((p) => !isNaN(p[0]) && isFinite(p[1]));
      });
    } catch (e) { /* brak statystyk */ }
    const miss = ids.filter((i) => !out[i] || out[i].length < 48);
    if (miss.length) {
      try {
        const from = new Date(Math.max(startMs, Date.now() - 30 * 864e5)).toISOString();
        const r = await this._hass.callApi('GET', 'history/period/' + from + '?filter_entity_id=' + miss.join(',') + '&end_time=' + encodeURIComponent(new Date().toISOString()) + '&minimal_response&no_attributes');
        (r || []).forEach((arr) => {
          if (!arr || !arr.length) return;
          const id = arr[0].entity_id, b = {};
          arr.forEach((p) => {
            const t = Date.parse(p.last_changed || p.last_updated), v = parseFloat(p.state);
            if (isNaN(t) || isNaN(v)) return;
            const h = Math.floor(t / 36e5) * 36e5; (b[h] = b[h] || []).push(v);
          });
          const hs = Object.keys(b).map((h) => [Number(h), b[h].reduce((a, x) => a + x, 0) / b[h].length]).sort((x, y) => x[0] - y[0]);
          if (!out[id] || hs.length > out[id].length) out[id] = hs;
        });
      } catch (e) { /* brak historii */ }
    }
    return out;
  }
  async _nauWeather(pastDays) {
    const c = this._nauCfg(), hc = this._hass.config || {};
    const lat = Number(c.lat !== undefined ? c.lat : hc.latitude), lon = Number(c.lon !== undefined ? c.lon : hc.longitude);
    if (!isFinite(lat) || !isFinite(lon)) throw new Error('brak położenia domu w HA');
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=' + lat.toFixed(2) + '&longitude=' + lon.toFixed(2) +
      '&hourly=temperature_2m,wind_speed_10m,cloud_cover,shortwave_radiation&wind_speed_unit=ms&timeformat=unixtime&timezone=auto' +
      '&past_days=' + Math.max(1, Math.min(92, pastDays)) + '&forecast_days=2';
    const r = await fetch(url);
    if (!r.ok) throw new Error('Open-Meteo HTTP ' + r.status);
    const j = await r.json(), H = j.hourly || {}, out = {};
    (H.time || []).forEach((t, i) => {
      out[t * 1000] = { t: t * 1000, temp: H.temperature_2m[i], wind: H.wind_speed_10m[i], cloud: H.cloud_cover[i], sun: H.shortwave_radiation[i] };
    });
    return out;
  }
  async _nauPrevFc(pastDays) {
    // prognoza wydana dobe wczesniej (archiwum prognoz Open-Meteo "previous runs") do porownania z pomiarem BT1
    const c = this._nauCfg(), hc = this._hass.config || {};
    const lat = Number(c.lat !== undefined ? c.lat : hc.latitude), lon = Number(c.lon !== undefined ? c.lon : hc.longitude);
    if (!isFinite(lat) || !isFinite(lon)) throw new Error('brak położenia domu w HA');
    const r = await fetch('https://previous-runs-api.open-meteo.com/v1/forecast?latitude=' + lat.toFixed(2) + '&longitude=' + lon.toFixed(2) +
      '&hourly=temperature_2m_previous_day1&timeformat=unixtime&timezone=auto&forecast_days=1&past_days=' + Math.max(1, Math.min(92, pastDays)));
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const j = await r.json(), H = j.hourly || {}, out = {};
    (H.time || []).forEach((t, i) => { const v = (H.temperature_2m_previous_day1 || [])[i]; if (v !== null && v !== undefined && isFinite(v)) out[t * 1000] = v; });
    return out;
  }
  _nauFcHtml(C, P) {
    if (!P) return '';
    const now = Date.now();
    const pairs = Object.keys(P).map(Number).filter((t) => t <= now && C.toutH[t] !== undefined).sort((a, b) => a - b).map((t) => [t, P[t], C.toutH[t]]);
    let h = '<div class="sec"><div class="st2">Prognoza temperatury vs rzeczywistość<small> – prognoza Open-Meteo wydana dobę wcześniej na tle pomiaru pompy BT1</small></div>';
    if (pairs.length < 24) return h + '<div class="info">Za mało godzin z pomiarem pompy i prognozą (' + pairs.length + ' h). Wróć za dzień.</div></div>';
    const err = pairs.map((p) => p[1] - p[2]);
    const mae = err.reduce((a, x) => a + Math.abs(x), 0) / err.length, bias = err.reduce((a, x) => a + x, 0) / err.length;
    const mx = err.reduce((a, x) => (Math.abs(x) > Math.abs(a) ? x : a), 0);
    const days = new Set(pairs.map((p) => new Date(p[0]).toDateString())).size;
    const sg = (v) => (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v).toFixed(1);
    h += '<div class="kt"><div class="k"><span>Średni błąd prognozy</span><b>' + mae.toFixed(1) + ' °C</b><i>z ' + days + ' dni (' + pairs.length + ' h)</i></div>' +
      '<div class="k"><span>Prognoza średnio</span><b>' + sg(bias) + ' °C</b><i>' + (Math.abs(bias) < 0.3 ? 'bez wyraźnego przechyłu' : bias > 0 ? 'za ciepła względem czujnika pompy' : 'za zimna względem czujnika pompy') + '</i></div>' +
      '<div class="k"><span>Największa pomyłka</span><b>' + sg(mx) + ' °C</b><i>pojedyncza godzina</i></div></div>';
    // wykres: ostatnie 7 dni
    const t0 = now - 7 * 864e5, pv = pairs.filter((p) => p[0] >= t0);
    const fc = Object.keys(P).map(Number).filter((t) => t >= t0 && t <= now).sort((a, b) => a - b).map((t) => [t, P[t]]);
    const ms = pv.map((p) => [p[0], p[2]]);
    const all = fc.map((p) => p[1]).concat(ms.map((p) => p[1]));
    if (all.length > 1) {
      const lo = Math.floor((Math.min(...all) - 1) / 5) * 5, hi = Math.ceil((Math.max(...all) + 1) / 5) * 5;
      const X0 = 46, X1 = 590, Y0 = 26, Y1 = 150, sx = (t) => X0 + (t - t0) / (now - t0) * (X1 - X0), sy = (v) => Y1 - (v - lo) / ((hi - lo) || 1) * (Y1 - Y0);
      let g = '';
      for (let v = lo; v <= hi; v += 5) g += '<line x1="' + X0 + '" y1="' + sy(v) + '" x2="' + X1 + '" y2="' + sy(v) + '" stroke="rgba(255,255,255,.08)"/><text x="' + (X0 - 6) + '" y="' + (sy(v) + 4) + '" text-anchor="end">' + v + ' °C</text>';
      const DL = ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So'], d = new Date(t0); d.setHours(0, 0, 0, 0);
      for (d.setDate(d.getDate() + 1); d.getTime() <= now; d.setDate(d.getDate() + 1)) { const x = sx(d.getTime()); g += '<line x1="' + x + '" y1="' + Y0 + '" x2="' + x + '" y2="' + Y1 + '" stroke="rgba(255,255,255,.07)"/><text x="' + (x + 18) + '" y="' + (Y1 + 15) + '" text-anchor="middle">' + DL[d.getDay()] + '</text>'; }
      const line = (pts, col, dash, w) => { let out = '', seg = [];
        const flush = () => { if (seg.length > 1) out += '<polyline points="' + seg.join(' ') + '" fill="none" stroke="' + col + '" stroke-width="' + w + '"' + (dash ? ' stroke-dasharray="5 4"' : '') + ' stroke-linejoin="round"/>'; seg = []; };
        pts.forEach((p, k) => { if (k && p[0] - pts[k - 1][0] > 3 * 36e5) flush(); seg.push(sx(p[0]).toFixed(1) + ',' + sy(p[1]).toFixed(1)); }); flush(); return out; };
      const leg = '<line x1="50" y1="10" x2="74" y2="10" stroke="#ffab1a" stroke-width="2.4"/><text x="80" y="14" fill="#e3e8ee">Rzeczywistość (pompa BT1)</text>' +
        '<line x1="250" y1="10" x2="274" y2="10" stroke="#c38fff" stroke-width="1.8" stroke-dasharray="5 4"/><text x="280" y="14" fill="#e3e8ee">Prognoza z dnia wcześniej</text>';
      h += '<svg viewBox="0 0 600 170" style="width:100%;max-width:60em;height:auto;display:block;font-family:inherit"><g font-size="11" fill="#c8d0da">' + g + '</g><g font-size="12">' + leg + '</g>' + line(fc, '#c38fff', true, 1.8) + line(ms, '#ffab1a', false, 2.4) + '</svg>';
    }
    return h + '<div class="wn">Błąd = prognoza − pomiar. Czujnik BT1 wisi na ścianie domu, więc stały przechył może też wynikać z miejsca czujnika (słońce, ściana), nie tylko z prognozy.</div></div>';
  }
  async _nauLoad() {
    const N = this._nau, hass = this._hass, E = this._E, c = this._nauCfg();
    N.loading = true; N.err = ''; this._nauRender();
    if (!N.srcLoaded) await this._nauSrcLoad();
    const now = Date.now();
    const res = { curve: null, cyrk: null, wx: null, errs: [] };
    try {
      const dk = Math.max(3, Math.min(92, Number(c.dni_krzywa) || 60));
      const tin = this._nauIndoor();
      const stats = await this._nauStats([E.t_out_hist, E.bt1].filter((i) => i && hass.states[i]).concat(tin), now - dk * 864e5);
      let W = {};
      try { W = await this._nauWeather(dk); } catch (e) { res.errs.push('Pogoda Open-Meteo niedostępna (' + (e && e.message || e) + '), liczę bez wiatru i słońca.'); }
      res.wx = W;
      try { res.prev = await this._nauPrevFc(dk); } catch (e) { res.prev = null; res.errs.push('Archiwum prognoz Open-Meteo niedostępne (' + (e && e.message || e) + '), brak porównania prognoza/pomiar.'); }
      const pg = this._nauSrc('pogoda') || [].concat(c.pogoda || []).filter((i) => hass.states[i]);
      if (pg.length) {
        const ps = await this._nauStats(pg, now - dk * 864e5);
        pg.forEach((id) => {
          const a = hass.states[id].attributes || {}, u = String(a.unit_of_measurement || ''), txt = id + ' ' + (a.friendly_name || '');
          let k = null, f = 1;
          if (/^m\/s$/.test(u)) k = 'wind'; else if (/km\/h/.test(u)) { k = 'wind'; f = 1 / 3.6; }
          else if (/W\/m/.test(u)) k = 'sun'; else if (/^lx$/.test(u)) { k = 'sun'; f = 1 / 120; }
          else if (u === '%' && /(cloud|chmur|zachm)/i.test(txt)) k = 'cloud';
          if (!k) return;
          (ps[id] || []).forEach(([t, v]) => { const h = Math.floor(t / 36e5) * 36e5; if (h > now) return; W[h] = W[h] || { t: h }; W[h][k] = v * f; });
        });
      }
      N.cargs = [stats, tin, W, now - dk * 864e5];
      res.curve = this._nauCurve(stats, tin, W, now - dk * 864e5);
    } catch (e) { res.errs.push('Krzywa: ' + (e && e.message || e)); }
    try {
      const dc = Math.max(3, Math.min(60, Number(c.dni_cyrkulacja) || 28));
      res.cyrk = await this._nauCyrkLoad(now - dc * 864e5);
    } catch (e) { res.errs.push('Cyrkulacja: ' + (e && e.message || e)); }
    N.res = res; N.at = Date.now(); N.loading = false;
    this._nauRender();
  }
  _nauSolve(A, b) {
    const n = b.length, M = A.map((r, i) => r.concat([b[i]]));
    for (let i = 0; i < n; i++) {
      let p = i; for (let k = i + 1; k < n; k++) if (Math.abs(M[k][i]) > Math.abs(M[p][i])) p = k;
      [M[i], M[p]] = [M[p], M[i]];
      const d = M[i][i]; if (Math.abs(d) < 1e-12) return null;
      for (let k = i; k <= n; k++) M[i][k] /= d;
      for (let r = 0; r < n; r++) if (r !== i) { const f = M[r][i]; for (let k = i; k <= n; k++) M[r][k] -= f * M[i][k]; }
    }
    return M.map((r) => r[n]);
  }
  _nauCurve(stats, tin, W, startMs) {
    const E = this._E, st = this._hass.states, c = this._nauCfg();
    const T = [-30, -20, -10, 0, 10, 20, 30];
    const num = (k) => { const s = st[E[k]]; const v = s ? parseFloat(s.state) : NaN; return isNaN(v) ? null : v; };
    const P = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7'].map(num);
    if (P.some((v) => v === null)) throw new Error('brak punktów P1–P7');
    const off = num('offset') || 0, mn = num('minsup'), mx = num('maxsup');
    const stp = Number(((st[E.p1] || {}).attributes || {}).step) || 1;
    // srednia godzinowa z czujnikow w domu
    const tinH = {};
    tin.forEach((id) => (stats[id] || []).forEach(([t, v]) => { const h = Math.floor(t / 36e5) * 36e5; (tinH[h] = tinH[h] || []).push(v); }));
    // temp. zewn.: pomiar z pompy (BT1, wlasna historia sensor.hp_temperatura_zewnetrzna_bt1 + historia BT1),
    // Open-Meteo tylko jako symulacja (godziny bez pomiaru i prognoza)
    const toutH = {};
    (stats[E.bt1] || []).forEach(([t, v]) => { toutH[Math.floor(t / 36e5) * 36e5] = v; });
    (stats[E.t_out_hist] || []).forEach(([t, v]) => { toutH[Math.floor(t / 36e5) * 36e5] = v; });
    const btNow = num('bt1'); if (btNow !== null) toutH[Math.floor(Date.now() / 36e5) * 36e5] = btNow;
    const outDays = new Set(Object.keys(toutH).filter((h) => h >= startMs).map((h) => new Date(Number(h)).toDateString()));
    Object.keys(W).forEach((h) => { if (h >= startMs && h <= Date.now()) outDays.add(new Date(Number(h)).toDateString()); });
    const S = [];
    Object.keys(tinH).forEach((h) => {
      h = Number(h); if (h < startMs) return;
      const hr = new Date(h).getHours(); if (hr < 8 || hr > 21) return;    // noc pomijam (obnizenie nocne psuje obraz)
      const w = W[h] || {};
      const meas = toutH[h] !== undefined;
      const to = meas ? toutH[h] : w.temp;
      if (to === undefined || to === null) return;
      const ti = tinH[h].reduce((a, x) => a + x, 0) / tinH[h].length;
      S.push({ h, to, ti, meas, sun: isFinite(w.sun) ? w.sun : null, wind: isFinite(w.wind) ? w.wind : null });
    });
    const dayCnt = {}; S.forEach((s) => { const d = new Date(s.h).toDateString(); dayCnt[d] = (dayCnt[d] || 0) + 1; });
    const days = Object.keys(dayCnt).filter((d) => dayCnt[d] >= 4).length;
    const med = (a) => { const b = a.slice().sort((x, y) => x - y); return b.length ? b[Math.floor(b.length / 2)] : null; };
    const own = this._nau && this._nau.src && Number(this._nau.src.cel);
    let target = Number(c.cel);
    let tsrc = 'ustawiony w konfiguracji karty';
    if (own && isFinite(own)) { target = own; tsrc = 'ustawione przez Ciebie: „Chcę w domu”'; }
    else if (!isFinite(target) || !c.cel) { target = med(S.map((s) => s.ti)); tsrc = 'mediana temperatury w domu z historii'; }
    const devAll = S.length ? S.reduce((a, x) => a + x.ti, 0) / S.length - target : 0;
    const sunMean = (() => { const a = S.filter((s) => s.sun !== null); return a.length ? a.reduce((x, s) => x + s.sun, 0) / a.length : 100; })();
    const windMean = (() => { const a = S.filter((s) => s.wind !== null); return a.length ? a.reduce((x, s) => x + s.wind, 0) / a.length : 3; })();
    // regresja: odchylka w domu = b_k (punkt krzywej, wagi trojkatne) + cs*slonce/100 + cw*wiatr
    const phi = (to) => T.map((tk) => Math.max(0, 1 - Math.abs(Math.max(-30, Math.min(30, to)) - tk) / 10));
    const n = 9, lam = [6, 6, 6, 6, 6, 6, 6, 30, 30], prior = [devAll, devAll, devAll, devAll, devAll, devAll, devAll, 0.3, -0.05];
    const A = Array.from({ length: n }, () => new Array(n).fill(0)), bb = new Array(n).fill(0), wsum = new Array(7).fill(0), dsum = new Array(7).fill(0);
    S.forEach((s) => {
      const x = phi(s.to).concat([((s.sun !== null ? s.sun : sunMean) - sunMean) / 100, (s.wind !== null ? s.wind : windMean) - windMean]);
      const y = s.ti - target;
      for (let i = 0; i < n; i++) { bb[i] += x[i] * y; for (let j = 0; j < n; j++) A[i][j] += x[i] * x[j]; }
      for (let k = 0; k < 7; k++) { wsum[k] += x[k]; dsum[k] += x[k] * y; }
    });
    for (let i = 0; i < n; i++) { A[i][i] += lam[i]; bb[i] += lam[i] * prior[i]; }
    const beta = (S.length >= 24 && this._nauSolve(A, bb)) || prior.slice();
    const cs = beta[7], cw = beta[8];
    const gainAt = (tk, ts) => { const d = target - tk; return d >= 3 ? Math.max(1.2, Math.min(4, (ts - tk) / d)) : 2; };
    const rnd = (v) => Math.round(v / stp) * stp;
    const why = [];
    const delta = T.map((tk, k) => {
      if (S.length < 24 || tk >= 20) return { d: 0, nd: true };
      if (wsum[k] < 12) {
        // brak godzin przy tej temperaturze: przesuwam o srednia odchylke z calej historii (np. po zmianie „Chcę w domu”)
        const g = gainAt(tk, P[k] + off), d = Math.max(-6, Math.min(6, rnd(-devAll * g)));
        return { d, dev: devAll, g, nd: false, all: true, h: Math.round(wsum[k]) };
      }
      const dev = beta[k], g = gainAt(tk, P[k] + off);
      const d = Math.max(-6, Math.min(6, rnd(-dev * g)));
      return { d, dev, g, nd: false, h: Math.round(wsum[k]) };
    });
    delta.forEach((x, k) => {
      if (!x.nd && x.d && x.all) why.push({ t: 'Przy ' + T[k] + ' °C brak godzin w historii, średnio w domu było ' + (x.dev > 0 ? 'cieplej' : 'zimniej') + ' od celu o ' + Math.abs(x.dev).toFixed(1) + ' °C', v: 'P' + (k + 1) + ' ' + (x.d > 0 ? '+' : '−') + Math.abs(x.d) + ' °C' });
      else if (!x.nd && x.d) why.push({ t: 'Przy ' + T[k] + ' °C w domu było ' + (x.dev > 0 ? 'za ciepło' : 'za zimno') + ' o ' + Math.abs(x.dev).toFixed(1) + ' °C (' + x.h + ' h danych)', v: 'P' + (k + 1) + ' ' + (x.d > 0 ? '+' : '−') + Math.abs(x.d) + ' °C' });
    });
    // pogoda na najblizsze 12 h vs srednia z historii
    const now = Date.now(), h0 = Math.floor(now / 36e5) * 36e5;
    const F = []; for (let i = 0; i < 12; i++) if (W[h0 + i * 36e5]) F.push(W[h0 + i * 36e5]);
    const avg = (k) => F.length ? F.reduce((a, x) => a + (isFinite(x[k]) ? x[k] : 0), 0) / F.length : null;
    const fc = { sun: avg('sun'), wind: avg('wind'), cloud: avg('cloud'), temp: avg('temp'), n: F.length };
    const toNow = num('bt1') !== null ? num('bt1') : (W[h0] ? W[h0].temp : 0);
    const phN = phi(toNow), tsNow = phN.reduce((a, w, k) => a + w * (P[k] + off), 0);
    const gNow = gainAt(toNow, tsNow);
    let ws = 0;
    if (fc.n) {
      const dSun = cs * (fc.sun - sunMean) / 100, dWind = cw * (fc.wind - windMean);
      const sSun = Math.round(-dSun * gNow * 2) / 2, sWind = Math.round(-dWind * gNow * 2) / 2;
      ws = Math.max(-4, Math.min(4, sSun + sWind));
      if (sSun) why.push({ t: 'Słońce: prognoza 12 h śr. ' + Math.round(fc.sun) + ' W/m² (zachmurzenie ' + Math.round(fc.cloud) + ' %), zwykle ' + Math.round(sunMean) + ' W/m²', v: (sSun > 0 ? '+' : '−') + Math.abs(sSun) + ' °C' });
      if (sWind) why.push({ t: 'Wiatr: prognoza 12 h śr. ' + fc.wind.toFixed(1) + ' m/s, zwykle ' + windMean.toFixed(1) + ' m/s', v: (sWind > 0 ? '+' : '−') + Math.abs(sWind) + ' °C' });
    }
    if (mx !== null) P.forEach((v, k) => { if (v + off + delta[k].d + ws > mx) why.push({ t: 'Max. zasilania ' + mx + ' °C obcina punkt P' + (k + 1), v: 'P' + (k + 1) + ' ≤ ' + mx + ' °C' }); });
    const prop = P.map((v, k) => {
      let y = v + off + delta[k].d + ws;
      if (mx !== null) y = Math.min(mx, y);      // min. zasilania pompa i tak pilnuje sama, nie przycinam (zeby nie mylilo)
      return y;
    });
    const measDays = new Set(Object.keys(toutH).filter((h) => h >= startMs).map((h) => new Date(Number(h)).toDateString())).size;
    return { T, cur: P.map((v) => v + off), prop, delta, ws, why, target, tsrc, days, outDays: outDays.size, measDays, samples: S.length, sMeas: S.filter((x) => x.meas).length, tin, cs, cw, fc, sunMean, windMean, toutH, ownHist: (stats[E.t_out_hist] || []).length };
  }
  async _nauCyrkLoad(startMs) {
    const hass = this._hass, now = Date.now();
    const pers = this._nauPersons(), act = this._nauActivity();
    if (!pers.length) throw new Error('brak encji person.* / device_tracker.* (telefony)');
    const q = async (ids) => {
      if (!ids.length) return [];
      return (await hass.callApi('GET', 'history/period/' + new Date(startMs).toISOString() + '?filter_entity_id=' + ids.join(',') +
        '&end_time=' + encodeURIComponent(new Date(now).toISOString()) + '&minimal_response&no_attributes')) || [];
    };
    const hp = await q(pers);
    let ha = []; try { ha = await q(act); } catch (e) { ha = []; }
    const SL = 15 * 60000;
    let t0 = now;
    const series = hp.filter((a) => a && a.length).map((a) => a.map((p) => [Date.parse(p.last_changed || p.last_updated), p.state]).filter((p) => !isNaN(p[0])).sort((x, y) => x[0] - y[0]));
    series.forEach((s) => { if (s.length) t0 = Math.min(t0, s[0][0]); });
    t0 = Math.max(t0, startMs);
    t0 = Math.ceil(t0 / SL) * SL;
    const n = Math.max(0, Math.floor((now - t0) / SL));
    if (n < 96) throw new Error('za mało historii obecności (mniej niż doba)');
    const home = new Uint8Array(n), known = new Uint8Array(n);
    series.forEach((s) => {
      let j = 0;
      for (let i = 0; i < n; i++) {
        const t = t0 + i * SL + SL / 2;
        while (j + 1 < s.length && s[j + 1][0] <= t) j++;
        if (s[j][0] > t) continue;
        const v = s[j][1];
        if (v === 'unavailable' || v === 'unknown') continue;
        known[i] = 1;
        if (v === 'home') home[i] = 1;
      }
    });
    const actv = new Uint8Array(n);
    let actN = 0;
    const nightsAll = Math.max(1, Math.round((now - t0) / 864e5));
    const noisy = [];
    ha.forEach((a) => {
      if (!a || a.length < 2) return;
      const ev = [];
      for (let k = 1; k < a.length; k++) {
        const p = a[k], t = Date.parse(p.last_changed || p.last_updated);
        if (isNaN(t) || p.state === 'unavailable' || p.state === 'unknown') continue;
        const pv = a[k - 1].state; if (pv === 'unavailable' || pv === 'unknown') continue;
        ev.push(t);
      }
      // encje "szumiace" (zmieniaja sie prawie co noc 1:00-5:00, np. automatyczne swiatla, czujniki) nie mowia nic o snie
      const nn = new Set(ev.filter((t) => { const hr = new Date(t).getHours(); return hr >= 1 && hr < 5; }).map((t) => new Date(t - 6 * 36e5).toDateString())).size;
      if (nn / nightsAll > 0.5) { noisy.push(a[0].entity_id); return; }
      actN++;
      ev.forEach((t) => { const i = Math.floor((t - t0) / SL); if (i >= 0 && i < n) actv[i] = 1; });
    });
    // sen: najdluzsze okno "w domu i brak aktywnosci" w nocy (18:00 -> 12:00), obejmujace 1:00-5:00, min. 4 h
    const sleep = new Uint8Array(n);
    const nights = []; let defN = 0;
    const d0 = new Date(t0); d0.setHours(18, 0, 0, 0); if (d0.getTime() > t0) d0.setDate(d0.getDate() - 1);
    for (let d = new Date(d0); d.getTime() < now; d.setDate(d.getDate() + 1)) {
      const a = Math.max(0, Math.round((d.getTime() - t0) / SL)), b = Math.min(n, Math.round((d.getTime() + 18 * 36e5 - t0) / SL));
      if (b - a < 40) continue;
      let best = null;
      if (actN) {
        let i = a;
        while (i < b) {
          if (!home[i] || actv[i]) { i++; continue; }
          let j = i; while (j < b && home[j] && !actv[j]) j++;
          let core = false; for (let k = i; k < j; k++) { const hr = new Date(t0 + k * SL).getHours(); if (hr >= 1 && hr < 5) { core = true; break; } }
          if (core && j - i >= 16 && (!best || j - i > best[1] - best[0])) best = [i, j];
          i = j;
        }
      } else {
        // brak encji aktywnosci: przyjmuje 23:00-6:00, gdy ktos jest w domu
        const s = Math.round((d.getTime() + 5 * 36e5 - t0) / SL), e = Math.round((d.getTime() + 12 * 36e5 - t0) / SL);
        let any = false; for (let k = Math.max(a, s); k < Math.min(b, e); k++) if (home[k]) any = true;
        if (any) best = [Math.max(a, s), Math.min(b, e)];
      }
      if (!best && actN) {
        // nie wykryto snu tej nocy: przyjmuje 23:00-6:00, gdy ktos byl w domu (zeby cyrkulacja nie chodzila w nocy)
        const s = Math.round((d.getTime() + 5 * 36e5 - t0) / SL), e = Math.round((d.getTime() + 12 * 36e5 - t0) / SL);
        let any = false; for (let k = Math.max(a, s); k < Math.min(b, e); k++) if (home[k]) any = true;
        if (any) { for (let k = Math.max(a, s); k < Math.min(b, e); k++) if (home[k]) sleep[k] = 1; defN++; }
        continue;
      }
      if (best) { for (let k = best[0]; k < best[1]; k++) if (home[k]) sleep[k] = 1; nights.push(best); }
    }
    const cnt = Array.from({ length: 7 }, () => new Array(96).fill(0)), ph = cnt.map((r) => r.slice()), ps = cnt.map((r) => r.slice());
    for (let i = 0; i < n; i++) {
      if (!known[i]) continue;
      const dt = new Date(t0 + i * SL + SL / 2), wd = (dt.getDay() + 6) % 7, k = dt.getHours() * 4 + Math.floor(dt.getMinutes() / 15);
      cnt[wd][k]++; ph[wd][k] += home[i]; ps[wd][k] += sleep[i];
    }
    const blocks = cnt.map((row, wd) => {
      if (row.reduce((a, x) => a + x, 0) < 48) return null;    // brak danych dla tego dnia tygodnia
      const on = row.map((c, k) => c > 0 && ph[wd][k] / c >= 0.5 && ps[wd][k] / c < 0.5);
      // zalataj dziury <= 30 min, wyrzuc okna < 30 min
      for (let k = 0; k < 96; k++) if (!on[k]) { let j = k; while (j < 96 && !on[j]) j++; if (k > 0 && j < 96 && j - k <= 2) for (let x = k; x < j; x++) on[x] = true; k = j; }
      const out = []; let k = 0;
      while (k < 96) { if (!on[k]) { k++; continue; } let j = k; while (j < 96 && on[j]) j++; if (j - k >= 2) out.push({ f: k * 15, t: j * 15 }); k = j; }
      return out;
    });
    const mins = (k) => { const dt = new Date(t0 + k * SL); return dt.getHours() * 60 + dt.getMinutes(); };
    const circ = (arr) => { if (!arr.length) return null; const a = arr.map((m) => m / 1440 * 2 * Math.PI); const x = a.reduce((s, v) => s + Math.cos(v), 0), y = a.reduce((s, v) => s + Math.sin(v), 0); let m = Math.atan2(y, x) / 2 / Math.PI * 1440; if (m < 0) m += 1440; return Math.round(m / 15) * 15; };
    return {
      blocks, ph: ph.map((r, wd) => r.map((v, k) => (cnt[wd][k] ? v / cnt[wd][k] : null))), ps: ps.map((r, wd) => r.map((v, k) => (cnt[wd][k] ? v / cnt[wd][k] : null))),
      days: Math.floor((now - t0) / 864e5), pers, actN, noisy, defN, sleepFrom: circ(nights.map((b) => mins(b[0]))), sleepTo: circ(nights.map((b) => mins(b[1]))), nights: nights.length,
    };
  }
  async _nauSrcLoad() {
    const N = this._nau; let v = null;
    try { const r = await this._hass.callWS({ type: 'frontend/get_user_data', key: 'hkpc_nauka_zrodla' }); v = r && r.value; } catch (e) { v = null; }
    if (!v) { try { v = JSON.parse(localStorage.getItem('hkpc_nauka_zrodla') || 'null'); } catch (e) { v = null; } }
    N.src = v && typeof v === 'object' ? v : {};
    N.srcLoaded = true;
  }
  async _nauSrcSave() {
    const N = this._nau;
    try { localStorage.setItem('hkpc_nauka_zrodla', JSON.stringify(N.src)); } catch (e) { /* brak */ }
    try { await this._hass.callWS({ type: 'frontend/set_user_data', key: 'hkpc_nauka_zrodla', value: N.src }); N.srcErr = ''; }
    catch (e) { N.srcErr = 'Zapisane tylko w tej przeglądarce (HA nie przyjął: ' + (e && (e.message || e.code) || e) + ').'; }
  }
  _nauSrcDefs() {
    return [
      { k: 'salon', n: 'Czujnik salonu (temp. w domu)', d: 'jedna encja, z niej krzywa i „Chcę w domu”', one: true, cur: () => this._nauSalon(),
        ok: (i, a) => i.startsWith('sensor.') && a.device_class === 'temperature' },
      { k: 't_dom', n: 'Temperatura w domu (inne)', d: 'do krzywej, gdy nie ma czujnika salonu', cur: () => (this._nauSrc('t_dom') || []).length ? this._nauSrc('t_dom') : (this._nauCfg().t_dom ? [].concat(this._nauCfg().t_dom) : []),
        ok: (i, a) => i.startsWith('sensor.') && a.device_class === 'temperature' },
      { k: 'osoby', n: 'Obecność (osoby / telefony)', d: 'do cyrkulacji', cur: () => this._nauPersons(),
        ok: (i) => /^(person|device_tracker)\./.test(i) },
      { k: 'aktywnosc', n: 'Aktywność (wykrywanie snu)', d: 'do cyrkulacji', cur: () => this._nauActivity(),
        ok: (i) => /^(light|media_player|binary_sensor|sensor|switch|input_boolean)\./.test(i) },
      { k: 'pogoda', n: 'Czujniki pogody (wiatr, słońce, chmury)', d: 'do krzywej, zastępują Open-Meteo w historii', cur: () => this._nauSrc('pogoda') || [].concat(this._nauCfg().pogoda || []).filter((i) => this._hass.states[i]),
        ok: (i, a) => i.startsWith('sensor.') && /^(m\/s|km\/h|W\/m²|W\/m2|lx|%)$/.test(String(a.unit_of_measurement || '')) },
    ];
  }
  _nauSrcEdit(k, op, id) {
    const N = this._nau, def = this._nauSrcDefs().find((d) => d.k === k); if (!def) return;
    if (op === 'auto') delete N.src[k];
    else {
      const cur = Array.isArray(N.src[k]) ? N.src[k].slice() : def.cur().slice();
      if (op === 'add') { if (!id || !this._hass.states[id] || cur.includes(id)) { N.srcMsg = id ? 'Nie ma takiej encji albo już jest na liście: ' + id : ''; this._nauRender(); return; } if (def.one) cur.length = 0; cur.push(id); }
      if (op === 'del') { const j = cur.indexOf(id); if (j >= 0) cur.splice(j, 1); }
      N.src[k] = cur;
    }
    N.srcMsg = '';
    this._nauSrcSave().then(() => { this._nauRender(); this._nauLoad(); });
    this._nauRender();
  }
  _nauSrcHtml(esc) {
    const N = this._nau, st = this._hass.states;
    const nm = (i) => esc((st[i] && st[i].attributes.friendly_name) || i);
    let h = '<div class="sec"><div class="st2">Źródła nauki<small> – Twoja lista encji, z których karta się uczy. Dodanie/usunięcie zmienia tylko tę listę, nie rusza encji w HA.</small></div>';
    if (N.srcErr) h += '<div class="warn">' + esc(N.srcErr) + '</div>';
    if (N.srcMsg) h += '<div class="warn">' + esc(N.srcMsg) + '</div>';
    this._nauSrcDefs().forEach((d) => {
      const own = N.src && Array.isArray(N.src[d.k]);
      const cur = d.cur();
      const cand = Object.keys(st).filter((i) => !cur.includes(i) && d.ok(i, st[i].attributes || {})).sort();
      h += '<div class="src"><div class="sn"><b>' + esc(d.n) + '</b><small>' + esc(d.d) + (own ? ' · Twoja lista' : ' · wykryte automatycznie') + '</small></div><div class="chips">' +
        (cur.length ? cur.map((i) => '<span class="chip" title="' + esc(i) + '">' + nm(i) + '<button data-a="sdel" data-k="' + d.k + '" data-e="' + esc(i) + '" title="Usuń z listy nauki">×</button></span>').join('') : '<i style="opacity:.6">brak</i>') +
        '</div><div class="sa"><input list="dl_' + d.k + '" data-k="' + d.k + '" placeholder="dodaj encję (wpisz lub wybierz)…"><datalist id="dl_' + d.k + '">' +
        cand.slice(0, 400).map((i) => '<option value="' + esc(i) + '">' + nm(i) + '</option>').join('') + '</datalist>' +
        '<button data-a="sadd" data-k="' + d.k + '">' + (d.one ? 'Ustaw' : 'Dodaj') + '</button>' + (own ? '<button data-a="sauto" data-k="' + d.k + '" title="Wróć do wykrywania automatycznego">Auto</button>' : '') + '</div></div>';
    });
    return h + '</div>';
  }
  _nauRecalc() {
    const N = this._nau;
    if (N.cargs && N.res) { try { N.res.curve = this._nauCurve(...N.cargs); } catch (e) { /* brak */ } this._nauRender(); } else this._nauLoad();
  }
  _nauEdit() {
    const N = this._nau;
    if (!N.edit) N.edit = JSON.parse(JSON.stringify((N.res && N.res.cyrk && N.res.cyrk.blocks) || [null, null, null, null, null, null, null]));
    for (let k = 0; k < 7; k++) if (!N.edit[k]) N.edit[k] = [];
    return N.edit;
  }
  _nauOutHtml(C, W) {
    // temp. zewnetrzna: 7 dni wstecz + 2 dni prognozy; pomiar pompy (BT1) vs symulacja Open-Meteo
    const now = Date.now(), t0 = now - 7 * 864e5, t1 = now + 48 * 36e5;
    const meas = Object.keys(C.toutH).map(Number).filter((t) => t >= t0 && t <= now).sort((a, b) => a - b).map((t) => [t, C.toutH[t]]);
    const sim = Object.keys(W).map(Number).filter((t) => t >= t0 && t <= t1 && isFinite(W[t].temp)).sort((a, b) => a - b).map((t) => [t, W[t].temp]);
    const all = meas.concat(sim).map((p) => p[1]);
    if (!all.length) return '';
    const lo = Math.floor((Math.min(...all) - 1) / 5) * 5, hi = Math.ceil((Math.max(...all) + 1) / 5) * 5;
    const X0 = 46, X1 = 590, Y0 = 26, Y1 = 150;
    const sx = (t) => X0 + (t - t0) / (t1 - t0) * (X1 - X0), sy = (v) => Y1 - (v - lo) / ((hi - lo) || 1) * (Y1 - Y0);
    let g = '';
    for (let v = lo; v <= hi; v += 5) g += '<line x1="' + X0 + '" y1="' + sy(v) + '" x2="' + X1 + '" y2="' + sy(v) + '" stroke="rgba(255,255,255,.08)"/><text x="' + (X0 - 6) + '" y="' + (sy(v) + 4) + '" text-anchor="end">' + v + ' °C</text>';
    const DL = ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So'];
    const d = new Date(t0); d.setHours(0, 0, 0, 0);
    for (d.setDate(d.getDate() + 1); d.getTime() <= t1; d.setDate(d.getDate() + 1)) { const x = sx(d.getTime()); g += '<line x1="' + x + '" y1="' + Y0 + '" x2="' + x + '" y2="' + Y1 + '" stroke="rgba(255,255,255,.07)"/><text x="' + (x + 18) + '" y="' + (Y1 + 15) + '" text-anchor="middle">' + DL[d.getDay()] + '</text>'; }
    // linia ciagla tylko dla kolejnych godzin (przerwy w pomiarze = przerwy w linii)
    const line = (pts, col, dash, w) => { let out = '', seg = [];
      const flush = () => { if (seg.length > 1) out += '<polyline points="' + seg.join(' ') + '" fill="none" stroke="' + col + '" stroke-width="' + w + '"' + (dash ? ' stroke-dasharray="5 4"' : '') + ' stroke-linejoin="round"/>'; seg = []; };
      pts.forEach((p, k) => { if (k && p[0] - pts[k - 1][0] > 3 * 36e5) flush(); seg.push(sx(p[0]).toFixed(1) + ',' + sy(p[1]).toFixed(1)); }); flush(); return out; };
    const nx = sx(now);
    const leg = '<line x1="50" y1="10" x2="74" y2="10" stroke="#ffab1a" stroke-width="2.4"/><text x="80" y="14" fill="#e3e8ee">Pomiar pompy (BT1)</text>' +
      '<line x1="230" y1="10" x2="254" y2="10" stroke="#8fb8ff" stroke-width="1.8" stroke-dasharray="5 4"/><text x="260" y="14" fill="#e3e8ee">Symulacja Open-Meteo (było / będzie)</text>';
    return '<div class="sec"><div class="st2">Temperatura zewnętrzna: pomiar pompy i symulacja<small> – 7 dni wstecz i 2 dni prognozy. Do nauki idzie pomiar z pompy, Open-Meteo tylko tam, gdzie pomiaru brak.</small></div>' +
      '<svg viewBox="0 0 600 170" style="width:100%;max-width:60em;height:auto;display:block;font-family:inherit"><g font-size="11" fill="#c8d0da">' + g + '</g><g font-size="12">' + leg + '</g>' +
      '<rect x="' + nx + '" y="' + Y0 + '" width="' + (X1 - nx) + '" height="' + (Y1 - Y0) + '" fill="rgba(143,184,255,.06)"/>' +
      line(sim, '#8fb8ff', true, 1.8) + line(meas, '#ffab1a', false, 2.4) +
      '<line x1="' + nx + '" y1="' + Y0 + '" x2="' + nx + '" y2="' + Y1 + '" stroke="#ff5a4a" stroke-width="1.5"/><text x="' + nx + '" y="' + (Y0 - 3) + '" text-anchor="middle" font-size="11" fill="#ff8a80">teraz</text></svg>' +
      '<div class="wn">Własna historia z pompy: ' + (C.ownHist ? C.ownHist + ' h zapisanych w sensor.hp_temperatura_zewnetrzna_bt1' : 'brak sensor.hp_temperatura_zewnetrzna_bt1 (dodaj pakiet v1.15), na razie biorę historię BT1 z recordera') + '. Dni z pomiarem pompy: ' + C.measDays + '.</div></div>';
  }
  _nauCyrkHtml(Y, esc, fmt) {
    const hass = this._hass, st = hass.states, E = this._E, N = this._nau;
    let h = '<div class="sec"><div class="st2">Cyrkulacja CWU: harmonogram z obecności (Pn–Nd)</div>';
    // --- automatyzacja + stan teraz ---
    const au = st[E.auto_cyrk], auOn = au && au.state === 'on';
    const run = parseFloat((st[E.hwc_run] || {}).state), still = parseFloat((st[E.hwc_still] || {}).state);
    const isOn = !isNaN(run) && !(run <= 1 && still >= 60);
    const zh = st['zone.home'] ? parseInt(st['zone.home'].state, 10) : null;
    const pers = Y ? Y.pers : this._nauPersons(), homeN = pers.filter((i) => st[i] && st[i].state === 'home').length;
    const ktos = zh !== null && !isNaN(zh) ? zh > 0 : homeN > 0;
    const inWin = st[E.pl_cyrk] && st[E.pl_cyrk].state === 'on';
    const now = new Date(), wd = (now.getDay() + 6) % 7, slot = now.getHours() * 4 + Math.floor(now.getMinutes() / 15);
    const sleepNow = Y && Y.ps[wd] && Y.ps[wd][slot] !== null && Y.ps[wd][slot] >= 0.5;
    let why;
    if (!auOn) why = 'automatyzacja wyłączona, cyrkulacją sterujesz ręcznie albo przez harmonogram na głównej';
    else if (!ktos) why = 'pusty dom (nikogo z telefonem w domu), po 10 min cyrkulacja się wyłącza';
    else if (inWin) why = 'ktoś jest w domu i trwa okno harmonogramu';
    else if (sleepNow) why = 'pora snu (poza oknem harmonogramu)';
    else why = 'ktoś jest, ale teraz nie ma okna w harmonogramie';
    h += '<div class="lh"><button class="tg' + (auOn ? ' on' : '') + '" data-a="auto"' + (au ? '' : ' disabled') + ' title="Automatyzacja cyrkulacji"><i></i></button><b>Automatyzacja cyrkulacji: ' + (au ? (auOn ? 'włączona' : 'wyłączona') : 'brak') + '</b>' +
      '<span>Teraz: <b style="color:' + (isOn ? '#7ee04a' : '#b0bac5') + '">' + (isNaN(run) ? '–' : isOn ? 'pracuje' : 'wyłączona') + '</b>' + (isNaN(run) ? '' : ' (praca ' + run + ' min / postój ' + still + ' min)') + ' · powód: ' + esc(why) + '</span></div>';
    if (!au) h += '<div class="info">Brak przełącznika <code>' + E.auto_cyrk + '</code>. Dodaj pakiet <code>packages/hydrolution_karta.yaml</code> z wersji v1.15 i przeładuj konfigurację HA.</div>';
    else h += '<div class="wn" style="margin:-.3em 0 .8em">Włączona: harmonogram „Cyrkulacja CWU” z głównej zakładki + obecność telefonów. Wszyscy wyszli (10 min) = wyłączona, ktoś wrócił = od razu wg harmonogramu, sen blokuje (okna omijają sen). Zastępuje wtedy przełącznik „Aktywne” cyrkulacji z harmonogramu.</div>';
    if (!Y) return h + '<div class="info">Brak danych obecności (encje person.* z telefonami).</div></div>';
    h += '<div class="lh"><span>W domu: <b>' + homeN + ' z ' + pers.length + '</b> (' + pers.map((i) => esc(((st[i] && st[i].attributes.friendly_name) || i) + ': ' + (st[i] ? (st[i].state === 'home' ? 'w domu' : st[i].state === 'not_home' ? 'poza' : st[i].state) : '?'))).join(', ') + ')</span>' +
      '<span class="ds">Sen: ' + (Y.actN ? 'wykryty z ' + Y.nights + ' nocy' + (Y.sleepFrom !== null ? ', zwykle ok. ' + fmt(Y.sleepFrom) + '–' + fmt(Y.sleepTo) : '') + (Y.defN ? '; ' + Y.defN + ' nocy bez wyraźnego snu: przyjęte 23:00–6:00' : '') : 'brak encji aktywności, przyjęty 23:00–6:00') +
      (Y.noisy && Y.noisy.length ? '. Pominięte encje zmieniające się co noc: ' + Y.noisy.length : '') + '.</span></div>';
    const DL = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'], days = this._schDays();
    const bl = N.edit || Y.blocks;
    const S = this._sch, main = S && S.data && S.data.cyrk ? this._schFromItem(S.data.cyrk) : null;
    const grad = (arr, rgb, mx) => 'linear-gradient(90deg,' + arr.map((v, k) => { const c = 'rgba(' + rgb + ',' + (v === null ? 0 : (v * mx).toFixed(2)) + ')'; return c + ' ' + (k / 96 * 100).toFixed(2) + '%,' + c + ' ' + ((k + 1) / 96 * 100).toFixed(2) + '%'; }).join(',') + ')';
    h += '<div class="hr">' + [0, 3, 6, 9, 12, 15, 18, 21, 24].map((x) => '<span style="left:' + (x / 24 * 100) + '%">' + x + '</span>').join('') + '</div>';
    DL.forEach((dn, i) => {
      h += '<div class="dr"><span class="dn' + (i === wd ? ' td' : '') + '">' + dn + '</span><div class="tl ne" data-d="' + i + '" style="--c:#43c25a;--c2:#2a8a3c">' +
        '<div class="lay" style="background:' + grad(Y.ph[i], '67,194,90', 0.45) + '"></div><div class="lay" style="background:' + grad(Y.ps[i], '90,120,255', 0.6) + '"></div>';
      if (main) main[days[i]].forEach((b) => { h += '<div class="mn" style="left:' + (b.f / 14.4) + '%;width:' + ((b.t - b.f) / 14.4) + '%"></div>'; });
      if (bl[i]) bl[i].forEach((b, j) => { const sel = N.sel && N.sel.i === i && N.sel.j === j; h += '<div class="bk pr2' + (sel ? ' sel' : '') + '" data-a="nbk" data-d="' + i + '" data-i="' + j + '" style="left:' + (b.f / 14.4) + '%;width:' + ((b.t - b.f) / 14.4) + '%">' + fmt(b.f) + '–' + fmt(b.t) + '</div>'; });
      else h += '<div class="nd">za mało danych (przeciągnij, żeby dodać)</div>';
      if (i === wd) h += '<div class="nw" style="left:' + (slot * 15 / 14.4 + (now.getMinutes() % 15) / 14.4) + '%"></div>';
      h += '</div><button class="cp" data-a="ncp" data-d="' + i + '" title="Skopiuj ten dzień na wszystkie dni">⧉</button></div>';
    });
    if (N.sel && bl[N.sel.i] && bl[N.sel.i][N.sel.j]) {
      const b = bl[N.sel.i][N.sel.j];
      h += '<div class="ed">Okno <b>' + DL[N.sel.i] + '</b>: od <input type="time" data-a="ntf" value="' + fmt(b.f) + '"> do <input type="time" data-a="ntt" value="' + fmt(b.t) + '"> <button data-a="ndel">Usuń okno</button><span style="opacity:.6">(koniec 00:00 = do północy)</span></div>';
    }
    h += '<div class="lg"><span><i style="background:rgba(67,194,90,.45)"></i>ktoś w domu (im mocniej, tym częściej)</span><span><i style="background:rgba(90,120,255,.6)"></i>sen</span><span><i class="pb"></i>okna do wysłania' + (N.edit ? ' (poprawione ręcznie)' : ' (propozycja)') + '</span><span><i style="background:#ffd54f;height:.25em"></i>obecny harmonogram na głównej</span><span><i style="background:#ff5a4a;width:2px"></i>teraz</span></div>';
    h += '<div class="ft"><span class="hint">Przeciągnij po osi, żeby dodać okno, kliknij okno, żeby zmienić godziny albo usunąć, ⧉ kopiuje dzień. „Wyślij na główną” wpisze okna do harmonogramu Cyrkulacja CWU (zapisujesz tam „Zapisz harmonogram”).</span>' +
      (N.edit ? '<button data-a="nrst">Przywróć propozycję</button>' : '') + '<button class="sv" data-a="send">Wyślij na główną</button></div>';
    return h + '</div>';
  }
  _nauSend() {
    const N = this._nau, r = N.res && N.res.cyrk;
    if (!r) return;
    const S = this._sch, lane = this._schLanes().find((l) => l.k === 'cyrk');
    const dr = this._schDraft(lane);
    let n = 0;
    const bl = N.edit || r.blocks;
    this._schDays().forEach((d, i) => { if (bl[i]) { dr[d] = this._schNorm(JSON.parse(JSON.stringify(bl[i]))); n++; } });
    S.dirty.cyrk = true; S.lane = 'cyrk'; S.sel = null;
    S.note = { k: 'cyrk', t: 'Wpisano propozycję z zakładki Nauka (' + n + ' z 7 dni). Sprawdź i kliknij „Zapisz harmonogram”, albo „Cofnij zmiany”. Przełącznik Aktywne nie był ruszany.' };
    this._tab('sch', true);
    this._schRender();
    if (this._schEl.scrollIntoView) this._schEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  _nauRender() {
    const el = this._nauEl, hass = this._hass, N = this._nau;
    if (!el || !hass || el.hidden) return;
    if (!el._bound) {
      el._bound = true;
      el.addEventListener('click', (ev) => {
        const t = ev.target.closest && ev.target.closest('[data-a]'); if (!t) return;
        const a = t.getAttribute('data-a');
        if (a === 'send') this._nauSend();
        else if (a === 'celx') { delete N.src.cel; this._nauSrcSave(); this._nauRecalc(); }
        else if (a === 'auto') { const id = this._E.auto_cyrk; if (this._hass.states[id]) this._hass.callService('input_boolean', 'toggle', { entity_id: id }); }
        else if (a === 'nbk') { N.sel = { i: Number(t.getAttribute('data-d')), j: Number(t.getAttribute('data-i')) }; this._nauRender(); }
        else if (a === 'ndel') { const e = this._nauEdit(); if (N.sel && e[N.sel.i]) { e[N.sel.i].splice(N.sel.j, 1); N.sel = null; this._nauRender(); } }
        else if (a === 'nrst') { N.edit = null; N.sel = null; this._nauRender(); }
        else if (a === 'ncp') { const e = this._nauEdit(), d = Number(t.getAttribute('data-d')); if (e[d]) { for (let k = 0; k < 7; k++) if (e[k]) e[k] = JSON.parse(JSON.stringify(e[d])); N.sel = null; this._nauRender(); } }
        else if (a === 'reload' && !N.loading) this._nauLoad();
        else if (a === 'more') this._more(t.getAttribute('data-e'));
        else if (a === 'sdel') this._nauSrcEdit(t.getAttribute('data-k'), 'del', t.getAttribute('data-e'));
        else if (a === 'sauto') this._nauSrcEdit(t.getAttribute('data-k'), 'auto');
        else if (a === 'sadd') { const inp = el.querySelector('input[data-k="' + t.getAttribute('data-k') + '"]'); this._nauSrcEdit(t.getAttribute('data-k'), 'add', inp && inp.value.trim()); }
      });
      // reczna korekta okien propozycji (przeciagnij = dodaj, klik = edytuj)
      const snap = (ev, tl) => { const r = tl.getBoundingClientRect(); return Math.round(Math.max(0, Math.min(1, (ev.clientX - r.left) / r.width)) * 96) * 15; };
      el.addEventListener('pointerdown', (ev) => {
        const tl = ev.target.closest && ev.target.closest('.tl.ne'); if (!tl || ev.target.closest('.bk')) return;
        ev.preventDefault(); const a = snap(ev, tl);
        N.drag = { tl, d: Number(tl.getAttribute('data-d')), a, b: a, tmp: null };
        try { tl.setPointerCapture(ev.pointerId); } catch (e) { /* brak */ }
      });
      el.addEventListener('pointermove', (ev) => {
        const g = N.drag; if (!g) return; g.b = snap(ev, g.tl);
        if (!g.tmp) { g.tmp = document.createElement('div'); g.tmp.className = 'bk pr2 tmp'; g.tl.appendChild(g.tmp); }
        const f = Math.min(g.a, g.b), t2 = Math.max(g.a, g.b);
        g.tmp.style.left = (f / 14.4) + '%'; g.tmp.style.width = ((t2 - f) / 14.4) + '%'; g.tmp.textContent = this._schFmt(f) + '–' + this._schFmt(t2);
      });
      el.addEventListener('pointerup', () => {
        const g = N.drag; if (!g) return; N.drag = null;
        let f = Math.min(g.a, g.b), t2 = Math.max(g.a, g.b);
        if (t2 - f < 15) { f = Math.min(g.a, 1380); t2 = f + 60; }
        const e = this._nauEdit(); e[g.d] = this._schNorm((e[g.d] || []).concat([{ f, t: t2 }]));
        N.sel = { i: g.d, j: e[g.d].findIndex((b) => b.f <= f && b.t >= t2) }; this._nauRender();
      });
      el.addEventListener('pointercancel', () => { const g = N.drag; if (g && g.tmp) g.tmp.remove(); N.drag = null; });
      el.addEventListener('change', (ev) => {
        const t = ev.target, a = t.getAttribute && t.getAttribute('data-a');
        if (a === 'cel') { const v = parseFloat(String(t.value).replace(',', '.')); if (isFinite(v) && v >= 10 && v <= 30) N.src.cel = v; else delete N.src.cel; this._nauSrcSave(); this._nauRecalc(); return; }
        if ((a !== 'ntf' && a !== 'ntt') || !N.sel) return;
        const e = this._nauEdit(), b = e[N.sel.i] && e[N.sel.i][N.sel.j]; if (!b) return;
        let m = this._schMin(t.value); if (a === 'ntt' && m === 0) m = 1440;
        if (a === 'ntf') b.f = m; else b.t = m;
        if (b.t <= b.f) { if (a === 'ntf') b.f = Math.max(0, b.t - 15); else b.t = Math.min(1440, b.f + 15); }
        e[N.sel.i] = this._schNorm(e[N.sel.i]); N.sel = { i: N.sel.i, j: Math.max(0, e[N.sel.i].findIndex((x) => x.f <= b.f && x.t >= b.t)) };
        this._nauRender();
      });
      el.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter' && ev.target.getAttribute && ev.target.getAttribute('data-a') === 'cel') { ev.target.blur(); return; }
        const t = ev.target; if (ev.key !== 'Enter' || !t.getAttribute || !t.getAttribute('data-k') || t.tagName !== 'INPUT') return;
        this._nauSrcEdit(t.getAttribute('data-k'), 'add', t.value.trim());
      });
    }
    const st = hass.states, E = this._E;
    const esc = (x) => String(x).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const fmt = (m) => this._schFmt(m);
    const R = N.res;
    let h = '<div class="sh"><div class="sht">Nauka<small>podgląd: ustawień pompy nie zmienia (poza suwakiem automatyzacji cyrkulacji)</small><span style="flex:1"></span>' +
      '<button data-a="reload"' + (N.loading ? ' disabled' : '') + '>' + (N.loading ? 'Liczę…' : 'Przelicz') + '</button></div>';
    if (!R) { el.innerHTML = h + '<div class="info">' + (N.loading ? 'Pobieram historię z Home Assistant i pogodę z Open-Meteo…' : 'Brak danych.') + '</div></div>'; return; }
    (R.errs || []).forEach((e) => { h += '<div class="warn">' + esc(e) + '</div>'; });
    const C = R.curve, Y = R.cyrk;
    // ---- kafle ----
    const h0 = Math.floor(Date.now() / 36e5) * 36e5, w0 = R.wx && R.wx[h0];
    h += '<div class="kt">' +
      '<div class="k"><span>Krzywa grzewcza</span><b>' + (C ? C.days : 0) + ' dni</b><i>historii użytej do nauki' + (C ? ' (' + C.samples + ' h, z tego ' + C.sMeas + ' h z pomiaru pompy BT1, ' + (C.samples - C.sMeas) + ' h z symulacji Open-Meteo)' : '') + '</i></div>' +
      '<div class="k"><span>Cyrkulacja CWU</span><b>' + (Y ? Y.days : 0) + ' dni</b><i>historii obecności telefonów' + (Y ? ' (' + Y.pers.length + ' os.)' : '') + '</i></div>' +
      '<div class="k"><span>Na zewnątrz teraz (pompa BT1)</span><b>' + (isNaN(parseFloat((st[E.bt1] || {}).state)) ? '–' : parseFloat(st[E.bt1].state).toFixed(1) + ' °C') + '</b><i>' + (w0 ? 'symulacja Open-Meteo: ' + w0.temp.toFixed(1) + ' °C · wiatr ' + w0.wind.toFixed(1) + ' m/s · chmury ' + Math.round(w0.cloud) + ' % · słońce ' + Math.round(w0.sun) + ' W/m²' : 'brak symulacji Open-Meteo') + '</i></div>' +
      '</div>';
    // ---- krzywa ----
    const cel = N.src && Number(N.src.cel);
    const sal = this._nauSalon()[0], salV = sal ? parseFloat(st[sal].state) : NaN;
    h += '<div class="sec"><div class="st2">Krzywa grzewcza: obecna i proponowana</div>' +
      '<div class="lh"><label>Chcę w domu: <input class="cel" type="number" step="0.5" min="15" max="26" data-a="cel" value="' + (cel && isFinite(cel) ? cel : '') + '" placeholder="' + (C && C.target !== null ? C.target.toFixed(1) : '21') + '"> °C</label>' +
      (cel ? '<button data-a="celx" title="Wróć do mediany z historii">Wyczyść</button>' : '') +
      '<span>Salon teraz: <b>' + (isNaN(salV) ? '–' : salV.toFixed(1) + ' °C') + '</b>' + (sal ? ' (' + esc((st[sal].attributes.friendly_name) || sal) + ')' : ' (brak czujnika salonu, ustaw w „Źródłach nauki”)') + '</span>' +
      '<span class="ds">Wpisz temperaturę i Enter: proponowana krzywa przeliczy się dla tej temperatury w domu. Nic nie zmienia w pompie.</span></div>';
    if (C) {
      const all = C.cur.concat(C.prop);
      const lo = Math.min(20, Math.floor((Math.min(...all) - 2) / 10) * 10), hi = Math.max(50, Math.ceil((Math.max(...all) + 2) / 10) * 10);
      const X0 = 46, X1 = 590, Y0 = 34, Y1 = 196;
      const sx = (t) => X0 + (30 - t) / 60 * (X1 - X0), sy = (v) => Y1 - (v - lo) / (hi - lo) * (Y1 - Y0);
      let g = '';
      for (let t = -30; t <= 30; t += 10) g += '<line x1="' + sx(t) + '" y1="' + Y0 + '" x2="' + sx(t) + '" y2="' + Y1 + '" stroke="rgba(255,255,255,.08)"/><text x="' + sx(t) + '" y="' + (Y1 + 16) + '" text-anchor="middle">' + t + ' °C</text>';
      for (let v = lo; v <= hi; v += 10) g += '<line x1="' + X0 + '" y1="' + sy(v) + '" x2="' + X1 + '" y2="' + sy(v) + '" stroke="rgba(255,255,255,.08)"/><text x="' + (X0 - 6) + '" y="' + (sy(v) + 4) + '" text-anchor="end">' + v + ' °C</text>';
      const pl = (ys, col, dash) => '<polyline points="' + C.T.map((t, i) => sx(t) + ',' + sy(ys[i])).join(' ') + '" fill="none" stroke="' + col + '" stroke-width="2.6"' + (dash ? ' stroke-dasharray="7 5"' : '') + ' stroke-linejoin="round"/>' +
        C.T.map((t, i) => '<circle cx="' + sx(t) + '" cy="' + sy(ys[i]) + '" r="3" fill="' + col + '"/>').join('');
      const ox = parseFloat((st[E.bt1] || {}).state);
      const nowl = isNaN(ox) ? '' : '<line x1="' + sx(Math.max(-30, Math.min(30, ox))) + '" y1="' + Y0 + '" x2="' + sx(Math.max(-30, Math.min(30, ox))) + '" y2="' + Y1 + '" stroke="#ffb300" stroke-dasharray="3 4"/><text x="' + sx(Math.max(-30, Math.min(30, ox))) + '" y="' + (Y0 - 4) + '" text-anchor="middle" fill="#ffb300">teraz ' + ox.toFixed(1) + ' °C</text>';
      const leg = '<line x1="50" y1="12" x2="74" y2="12" stroke="#29b6f6" stroke-width="2.6"/><text x="80" y="16" fill="#e3e8ee">Obecna (P1–P7 + przesunięcie)</text>' +
        '<line x1="300" y1="12" x2="324" y2="12" stroke="#43d343" stroke-width="2.6" stroke-dasharray="7 5"/><text x="330" y="16" fill="#e3e8ee">Proponowana</text>';
      h += '<div class="cv"><svg viewBox="0 0 600 220" style="width:100%;height:auto;display:block;font-family:inherit"><g font-size="11.5" fill="#c8d0da">' + g + '</g><g font-size="12">' + leg + nowl + '</g>' + pl(C.cur, '#29b6f6') + pl(C.prop, '#43d343', true) + '</svg>' +
        '<div class="pv">' + C.T.map((t, i) => i).reverse().map((i) => { const d = Math.round((C.prop[i] - C.cur[i]) * 10) / 10;
          return '<div><b>P' + (i + 1) + '</b><span>' + C.T[i] + ' °C</span><span>' + C.cur[i].toFixed(0) + ' → <em class="' + (d > 0 ? 'u' : d < 0 ? 'd' : '') + '">' + (Math.round(C.prop[i] * 10) / 10) + '</em> °C</span></div>'; }).join('') + '</div></div>';
      h += '<div class="why"><div class="wt">Co przesunęło propozycję:</div>' + (C.why.length ? C.why.map((w) => '<div class="wr"><span>' + esc(w.t) + '</span><b>' + esc(w.v) + '</b></div>').join('')
        : '<div class="wr"><span>Nic wyraźnego: obecna krzywa trzyma temperaturę w domu, a pogoda jest typowa.</span><b>0 °C</b></div>') +
        '<div class="wn">Cel w domu: ' + (C.target !== null ? C.target.toFixed(1) + ' °C (' + esc(C.tsrc) + ')' : 'brak') + '. Czujniki w domu: ' + (C.tin.length ? C.tin.map((i) => esc((st[i] && st[i].attributes.friendly_name) || i)).join(', ') : '<b>nie znalazłem</b> (ustaw w karcie: nauka: t_dom: sensor.…)') +
        '. Liczone z godzin 8–22 (nocne obniżenie pomijam). Wykres nic nie zmienia, punkty P1–P7 ustawiasz sam w panelu „Własna krzywa”.</div></div>';
    } else h += '<div class="info">Nie da się policzyć krzywej (brak danych).</div>';
    h += '</div>';
    if (C) h += this._nauOutHtml(C, R.wx || {});
    if (C) h += this._nauFcHtml(C, R.prev);
    h += this._nauCyrkHtml(Y, esc, fmt);
    if (N.srcLoaded) h += this._nauSrcHtml(esc);
    if (N.at) h += '<div class="wn" style="margin-top:.8em">Policzone ' + new Date(N.at).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }) + ', odświeżane co 30 min. Pogoda: Open-Meteo (api.open-meteo.com, położenie domu z HA).</div>';
    el.innerHTML = h + '</div>';
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
