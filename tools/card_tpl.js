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
      '.el{position:absolute;--u:calc(100cqw / 1672)}.el.t{cursor:pointer}' + EXTRA.replace(':host', '.el') +
      '</style><ha-card><div id="c"><img alt="" src="' + img + '"></div></ha-card>';
    const c = root.getElementById('c');
    this._nodes = ELS.map((el) => {
      const d = document.createElement('div');
      d.className = 'el' + (el.tap ? ' t' : '');
      Object.assign(d.style, el.style);
      if (el.tap) d.addEventListener('click', (ev) => { ev.stopPropagation(); this._tap(el); });
      c.appendChild(d);
      return d;
    });
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
  }

  _tap(el) {
    const t = el.tap, E = this._E, hass = this._hass;
    if (!t || !hass) return;
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
window.customCards = window.customCards || [];
if (!window.customCards.find((c) => c.type === 'ha-karta-pompa-ciepla')) {
  window.customCards.push({ type: 'ha-karta-pompa-ciepla', name: 'Karta pompy ciepła (MHI Hydrolution)', description: 'Panel pompy ciepła na tle instalacji, encje ESPHome hydrolution v5.3', preview: false });
}
console.info('%c ha-karta-pompa-ciepla ' + VERSION + ' ', 'background:#1e88e5;color:#fff;border-radius:3px');
})();
