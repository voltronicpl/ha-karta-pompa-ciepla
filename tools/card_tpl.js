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
// v1.22: wersja pakietu HA (packages/hydrolution_karta.yaml), ktorej oczekuje karta
const PKG_VER = '1.46';
const PKG_YAML = __PKGYAML__;   // v1.41: pelna tresc pakietu YAML tej wersji (naprawa starego pliku przez File editor)
// v1.35: krzywa fabryczna P1..P7 (stala, z pompy 22.11.2026; nie da sie jej zmienic ani zapisac, tylko przywolac)
const KRZ_FAB = [40, 30, 29, 28, 25, 18, 5];
const PKG = __PKG__;   // v1.28: spis pakietu HA (tools/pkgspec.py) - karta zaklada brakujace elementy przez API
const DEFAULT_E = __ENTITIES__;
const BG = 'data:image/jpeg;base64,__BG__';
const TREND = __TREND__;          // klucze encji do wykresu trendow
const EXTRA = __EXTRA__;
const FONT = __FONT__;
const DIA_CSS = '#dia{box-sizing:border-box;padding:12px;color:#eef2f6;font-family:' + FONT + ';font-size:13px;background:#0e1013}' +
  '#dia .sh button{margin-left:.5em}#dia.all .lg{max-height:none}#dia textarea.cp{width:100%;height:14em;box-sizing:border-box;font-family:ui-monospace,Consolas,monospace;font-size:.85em;background:#05070a;color:#eef2f6;border:1px solid #6ec1ff;border-radius:8px}#dia .dl{display:flex;flex-direction:column;gap:.35em;margin-bottom:.7em}#dia .dl>div{display:flex;flex-wrap:wrap;gap:.3em .8em;align-items:center}#dia .dl>div>span:first-child{min-width:13em;opacity:.7}' +
  '#dia .dl code{font-size:.9em;word-break:break-all}#dia .good{color:#7ee04a}#dia .bad{color:#ffb300}' +
  '#dia .lg{max-height:66vh;overflow:auto;font-family:ui-monospace,Consolas,monospace;font-size:.86em;border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:.4em .6em;background:rgba(0,0,0,.35)}' +
  '#dia .lg>div{display:flex;flex-wrap:wrap;gap:.2em .8em;padding:.18em 0;border-bottom:1px solid rgba(255,255,255,.06)}#dia .lg .t{opacity:.6;min-width:9.5em}#dia .lg .e{min-width:12em;font-weight:600}';
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
const NAU_CSS = '#pk{margin:0;padding:.55em 1em;background:rgba(255,160,0,.16);border-top:1px solid rgba(255,180,0,.6);border-bottom:1px solid rgba(255,180,0,.6);color:#ffd9a0;font-size:14px;cursor:pointer}#pk b{color:#ffe2b0}' +
  '#nau .pkw{margin:0 0 1em;padding:.7em 1em;border-radius:8px;background:rgba(255,160,0,.15);border:1px solid rgba(255,180,0,.6);color:#ffd9a0}#nau .pkw code{color:#fff}#nau .pkw.ok{background:rgba(67,194,90,.13);border-color:rgba(100,220,120,.55);color:#cfeed5}#nau .pkw button{margin-top:.5em}' +
  '#sch .au{display:inline-block;margin-left:.4em;padding:0 .45em;border-radius:999px;font-size:.78em;background:#f8bbd9;color:#4a1030;font-weight:600}#sch .tl.lk{cursor:not-allowed}#sch .tl.lk .bk{cursor:default;background:linear-gradient(180deg,#ffd6ea,#f5a9cd);border-color:#fff0f7;color:#4a1030;text-shadow:none}' +
  '#nau .ht{position:absolute;bottom:1px;height:4px;background:#ff5a4a;border-radius:2px;pointer-events:none;z-index:2}#nau .bk.cw{background:rgba(31,165,245,.28);border:2px solid #29b6f6;cursor:default}#nau .lg i.cb{border:2px solid #29b6f6;background:rgba(31,165,245,.28);box-sizing:border-box}' +
  '#nau .wk input.g12{width:14em;height:2em;text-align:left;border-radius:6px;background:rgba(10,12,16,.85);border:1px solid rgba(110,193,255,.5);color:#fff;font:inherit;padding:0 .5em}#nau .sk{opacity:.75;font-size:.88em}' +
  '#nau .cm,#sch .cm{position:absolute;top:2px;bottom:2px;border-radius:5px;display:flex;align-items:center;justify-content:center;overflow:hidden;white-space:nowrap;font-size:.74em;color:#fff;pointer-events:none;box-sizing:border-box}' +
  '.cm.L{background:rgba(233,30,140,.55);border:1.5px solid #ff5fae;z-index:2}.cm.N{background:rgba(124,77,255,.3);border:1px solid rgba(179,157,255,.6);color:#e4dcff;z-index:1}.cm.E{background:rgba(67,194,90,.5);border:1.5px solid #7ee08a;z-index:2}.cm.S{background:rgba(38,198,218,.45);border:1.5px solid #6fe3f0;z-index:2}' +
  '#sch .ms{position:absolute;left:0;right:0;bottom:-7px;height:5px;pointer-events:none}#sch .ms i{position:absolute;top:0;bottom:0}#sch .ms i.L{background:#ff4fa3}#sch .ms i.N{background:#9e7bff}#sch .ms i.E{background:#43d343}#sch .ms i.S{background:#26c6da}#sch .dr.cwm{margin-bottom:.55em}' +
  '.lg i.L,.lgm i.L{background:#ff4fa3}.lg i.N,.lgm i.N{background:#9e7bff}.lg i.E,.lgm i.E{background:#43d343}.lg i.S,.lgm i.S{background:#26c6da}' +
  '#sch .lgm{display:flex;flex-wrap:wrap;gap:.3em 1.2em;margin:.5em 0 0 3.2em;opacity:.8;font-size:.9em}#sch .lgm i{display:inline-block;width:1.4em;height:.7em;border-radius:3px;margin-right:.4em;vertical-align:middle}' +
  '.pp .pr2 .tg{position:relative;flex:0 0 auto;width:58px;height:30px;border-radius:999px;background:#4a525e;border:none;padding:0;cursor:pointer}.pp .pr2 .tg i{position:absolute;top:3px;left:3px;width:24px;height:24px;border-radius:50%;background:#fff;transition:left .15s}.pp .pr2 .tg.on{background:linear-gradient(180deg,#36a3ff,#1a7fe0)}.pp .pr2 .tg.on i{left:31px}' +
  '.pp .pn{opacity:.75;font-size:.85em;margin:.4em 0;max-width:22em;line-height:1.3}.pp .pr2{display:flex;align-items:center;justify-content:space-between;gap:1em;margin:.35em 0}' +
  '#tb{display:flex;gap:.5em;padding-top:.8em;background:#0e1013}#tb button{font:inherit;font-size:1.05em;color:#eef2f6;cursor:pointer;border:1px solid rgba(255,255,255,.16);background:rgba(62,70,82,.85);border-radius:8px 8px 0 0;padding:.5em 1.4em}' +
  '#tb button.on{background:linear-gradient(180deg,#2b8cf2,#1260bf);border-color:#6ec1ff;font-weight:600}' +
  '#nau{box-sizing:border-box;padding:12px;color:#eef2f6;font-family:' + FONT + ';font-size:13px;background:#0e1013}#nau[hidden],#sch[hidden],#dia[hidden]{display:none}' +
  '#nau .kt{display:grid;grid-template-columns:repeat(auto-fit,minmax(14em,1fr));gap:.8em;margin-bottom:1em}#nau .k{display:flex;flex-direction:column;gap:.2em;padding:.8em 1em;border-radius:10px;background:rgba(10,12,16,.55);border:1px solid rgba(110,193,255,.3)}' +
  '#nau .k span{opacity:.8}#nau .k b{font-size:1.7em;color:#7ec8ff}#nau .k i{font-style:normal;opacity:.65;font-size:.9em}' +
  '#nau .sec{margin-top:1.1em;padding-top:.9em;border-top:1px solid rgba(255,255,255,.1)}#nau .st2{font-size:1.15em;font-weight:600;margin-bottom:.7em}#nau .st2 small{font-weight:400;opacity:.65;font-size:.8em}' +
  '#nau .cv{display:flex;flex-wrap:wrap;gap:1em;align-items:flex-start}#nau .cv svg{flex:1 1 30em;max-width:60em}' +
  '#nau .pv{display:grid;grid-template-columns:repeat(7,1fr);gap:.3em;flex:1 1 26em;font-size:.92em}#nau .pv div{display:flex;flex-direction:column;align-items:center;gap:.15em;padding:.45em .2em;border-radius:7px;background:rgba(10,12,16,.55);border:1px solid rgba(255,255,255,.08)}' +
  '#nau .pv em{font-style:normal;font-weight:700}#nau .pv em.u{color:#ff9e80}#nau .pv em.d{color:#7ee04a}' +
  '#nau .why{margin-top:.8em}#nau .wt{opacity:.8;margin-bottom:.3em}#nau .wr{display:flex;justify-content:space-between;gap:1em;padding:.35em .7em;border-radius:6px;background:rgba(255,255,255,.04);margin:.2em 0}#nau .wr b{white-space:nowrap;color:#7ee04a}' +
  '#nau .wn{opacity:.6;font-size:.88em;margin-top:.5em}' +
  '#nau input.cel{width:5em;height:2.1em;text-align:center;border-radius:6px;background:rgba(10,12,16,.85);border:1px solid rgba(110,193,255,.5);color:#fff;font:inherit;font-weight:700}#nau .lh button{padding:.35em .8em}' +
  '#nau .ob{position:absolute;top:1px;bottom:1px;border:1.5px dashed #9aa4b0;border-radius:5px;pointer-events:none;z-index:2}#nau .df ul{margin:.3em 0 .3em 1.2em;padding:0}#nau .df button{margin-left:.5em}' +
  '#nau .wu{position:absolute;top:-2px;bottom:-2px;width:2px;background:#ffb300;z-index:3;pointer-events:none}#nau .wu span{position:absolute;left:4px;top:1px;font-size:.72em;color:#ffd27a;white-space:nowrap;text-shadow:0 1px 2px #000}' +
  '#nau .wk label{display:flex;align-items:center;gap:.4em}#nau .wk select,#nau .wk input[type=time],#nau .wk input[type=number]{height:2em;border-radius:6px;background:rgba(10,12,16,.85);border:1px solid rgba(110,193,255,.5);color:#fff;font:inherit;padding:0 .4em}#nau .wk input[type=number]{width:4em;text-align:center}' +
  '#nau .tl.ne{cursor:crosshair}#nau .mn{position:absolute;bottom:1px;height:3px;background:#ffd54f;border-radius:2px;pointer-events:none;z-index:1}#nau .bk.pr2{cursor:pointer}#nau .bk.pr2.sel{outline:2px solid #fff}#nau .tg[disabled]{opacity:.4}' +
  '#nau .tl.ro{cursor:default}#nau .lay{position:absolute;inset:0;border-radius:6px;pointer-events:none}#nau .bk.pr2{background:rgba(67,194,90,.25);border:2px solid #43d343}' +
  '#nau .nd{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:.5;font-size:.85em}' +
  '#nau .lg{display:flex;flex-wrap:wrap;gap:.4em 1.4em;margin:.6em 0 0 3.2em;opacity:.8;font-size:.9em}#nau .lg i{display:inline-block;width:1.4em;height:.8em;border-radius:3px;margin-right:.4em;vertical-align:middle}#nau .lg i.pb{border:2px solid #43d343;background:rgba(67,194,90,.25);box-sizing:border-box}' +
  '#nau .src{display:flex;flex-wrap:wrap;align-items:center;gap:.5em 1em;padding:.55em 0;border-bottom:1px solid rgba(255,255,255,.06)}#nau .sn{flex:0 0 15em;display:flex;flex-direction:column}#nau .sn small{opacity:.6}' +
  '#nau .chips{flex:1 1 20em;display:flex;flex-wrap:wrap;gap:.35em}#nau .chip{display:inline-flex;align-items:center;gap:.3em;padding:.2em .3em .2em .7em;border-radius:999px;background:rgba(41,182,246,.15);border:1px solid rgba(41,182,246,.45)}' +
  '#nau .chip button{padding:0 .45em;border:none;background:none;font-size:1.1em;line-height:1}#nau .chip button:hover{color:#ff8a80}' +
  '#nau .dsw button.on{background:rgba(41,182,246,.35);border-color:#29b6f6;color:#fff}#nau .dsw label{display:flex;align-items:center;gap:.35em}' +
  '#nau .sa{display:flex;gap:.4em;flex:0 1 26em}#nau .sa input{flex:1;min-width:10em;height:2.1em;border-radius:6px;background:rgba(10,12,16,.85);border:1px solid rgba(110,193,255,.5);padding:0 .5em;color:#fff;font:inherit}';
const V135_CSS = '.el.hpp{border-radius:calc(var(--u)*8);box-shadow:0 0 0 2px #b39dff,0 0 calc(var(--u)*16) rgba(124,77,255,.9);animation:hppul .9s ease-in-out infinite alternate}.el.hpp.rd,.el.hpx.rd{border-radius:50%}' +
  '.el.hpp.rd>div:first-child{border-color:#b39dff!important;background:radial-gradient(circle,#4a2f9e 55%,#2a1a5e 100%)!important}.el.hpp .g{background:linear-gradient(180deg,#8f6bff,#5a33c9)!important;border-color:#c9b8ff!important}@keyframes hppul{from{filter:brightness(1)}to{filter:brightness(1.35)}}' +
  '.el.hpx{border-radius:calc(var(--u)*8);box-shadow:0 0 0 2px #ff5a4a,0 0 calc(var(--u)*14) rgba(255,90,74,.8)}' +
  '#nau{position:relative}#nau .zs{position:absolute;z-index:9;padding:.15em .65em;border-radius:999px;background:#2e9e45;color:#fff;font-size:.82em;font-weight:600;white-space:nowrap;pointer-events:none;box-shadow:0 2px 8px rgba(0,0,0,.5);transition:opacity .6s}' +
  '#nau .zs.w{background:#5b6573}#nau .zs.x{background:#c9372c}#nau .zs.o{opacity:0}' +
  '#sch .esp{display:inline-flex;align-items:center;gap:.3em;padding:.1em .65em;border-radius:999px;font-size:.88em;font-weight:600}' +
  '#sch .esp button,#nau .esp button{margin-left:.4em;padding:.05em .55em;font-size:.95em}#sch .now,#nau .now,#dia .now{display:flex;flex-wrap:wrap;gap:.3em .9em;margin:-.2em 0 .7em;font-size:.92em}#sch .now .bad,#nau .now .bad,#dia .now .bad{color:#ffb300;font-weight:600}#sch .now .good,#nau .now .good,#dia .now .good{color:#7ee04a;font-weight:600}' +
  '#nau .obc{display:flex;flex-wrap:wrap;gap:.4em .6em;align-items:center;margin:0 0 .9em;font-size:.9em}#nau .obc .p{padding:.15em .65em;border-radius:999px;background:rgba(10,12,16,.55);border:1px solid rgba(255,255,255,.18);cursor:pointer}#nau .obc .p.h{border-color:#43d343;color:#c9f5b0}#nau .obc .p.a{opacity:.8}' +
  '#sch .esp.ok{background:rgba(67,194,90,.18);border:1px solid #43d343;color:#bff0c8}#sch .esp.w{background:rgba(255,179,0,.14);border:1px solid #ffb300;color:#ffd9a0}#sch .esp.n{opacity:.65;border:1px solid rgba(255,255,255,.2)}' +
  '#nau .km{margin-top:1em;padding:.8em 1em;border-radius:10px;background:rgba(10,12,16,.45);border:1px solid rgba(110,193,255,.25)}' +
  '#nau .km .kb{display:flex;flex-wrap:wrap;align-items:center;gap:.5em 1em;margin-bottom:.7em}#nau .km .kb button.on{background:linear-gradient(180deg,#2b8cf2,#1260bf);border-color:#6ec1ff;font-weight:600}' +
  '#nau .km .kp{display:grid;grid-template-columns:repeat(7,1fr);gap:.4em;margin-bottom:.7em}' +
  '#nau .km .kp label{display:flex;flex-direction:column;align-items:center;gap:.2em;padding:.4em .2em;border-radius:7px;background:rgba(10,12,16,.55);border:1px solid rgba(255,255,255,.08)}#nau .km .kp span{opacity:.75;font-size:.88em}' +
  '#nau .km .kp input{width:4em;max-width:100%;height:2em;text-align:center;border-radius:6px;background:rgba(10,12,16,.85);border:1px solid rgba(110,193,255,.5);color:#fff;font:inherit;font-weight:700}#nau .km .kp input.ch{border-color:#ffb300;color:#ffd27a}' +
  '#nau .km .ka{display:flex;flex-wrap:wrap;gap:.5em 1em;align-items:center}#nau .km .ka .sv{background:linear-gradient(180deg,#2b8cf2,#1260bf);border-color:#6ec1ff;font-weight:600}' +
  '#nau .kc{position:fixed;inset:0;z-index:50;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.55)}' +
  '#nau .kc>div{min-width:18em;max-width:95vw;padding:1em 1.2em;border-radius:12px;background:linear-gradient(180deg,rgba(40,46,56,.98),rgba(20,24,31,.98));border:1px solid rgba(110,193,255,.6);box-shadow:0 10px 30px rgba(0,0,0,.6)}' +
  '#nau .kc table{border-collapse:collapse;margin:.6em 0;width:100%}#nau .kc td,#nau .kc th{padding:.25em .6em;text-align:center;border-bottom:1px solid rgba(255,255,255,.08)}#nau .kc td.d{color:#ffb300;font-weight:700}#nau .kc .ka{display:flex;gap:.6em;justify-content:flex-end;margin-top:.6em}#nau .kc .ok2{background:linear-gradient(180deg,#34b84f,#1d7f33);border-color:#8ee69c;font-weight:600}';
const V136_CSS = '#sch .rg2,#nau .rg2{display:flex;flex-wrap:wrap;align-items:center;gap:.4em;margin:0 0 .9em}#sch .rg2 button,#nau .rg2 button{padding:.3em .7em}#sch .rg2 button.on,#nau .rg2 button.on{background:linear-gradient(180deg,#2b8cf2,#1260bf);border-color:#6ec1ff;font-weight:600}' +
  '#sch .rg2 input,#nau .rg2 input{height:2em;border-radius:6px;background:rgba(10,12,16,.85);border:1px solid rgba(110,193,255,.5);color:#fff;font:inherit;padding:0 .4em;color-scheme:dark}#sch .rgl,#nau .rgl{margin-left:.6em;opacity:.8}' +
  '#sch .dn.dt{flex:0 0 5.6em;font-size:.9em;white-space:nowrap}#sch .hr.dt{margin-left:6.1em}#sch .dr.ps .bk{opacity:.55}#sch .dr.cp2{margin:.15em 0}#sch .dr.cp2 .tl{height:1.6em}#sch .dr.cp2 .bk{font-size:.7em}' +
  '#sch .hh{position:absolute;inset:0;pointer-events:none;z-index:3}#sch .hh i{position:absolute}#sch .hh i.hp{top:0;height:3px;background:#ffe0ef;opacity:.9;border-radius:1px}#sch .hh i.hw{bottom:0;height:13px;background:rgba(255,59,47,.85);border-radius:2px;box-shadow:0 0 5px rgba(255,59,47,.8)}' +
  '#sch .hsum{margin-left:.6em;opacity:.9}#sch .lgh{display:flex;flex-wrap:wrap;gap:.3em 1.2em;margin:.5em 0 0 6.1em;opacity:.8;font-size:.9em}#sch .lgh i{display:inline-block;width:1.4em;margin-right:.4em;vertical-align:middle;border-radius:2px}' +
  '#nau .dsw select{height:2em;border-radius:6px;background:rgba(10,12,16,.85);border:1px solid rgba(110,193,255,.5);color:#fff;font:inherit}#nau .en select{max-width:28em}';
// v1.37: wiersze z datami i historia takze w Nauce, bloki trybu CWU poza oknami, pasek zakresu przyklejony u gory Nauki
const V137_CSS = ('#sch .dn.dt{flex:0 0 5.6em;font-size:.9em;white-space:nowrap}#sch .hr.dt{margin-left:6.1em}#sch .dr.ps .bk{opacity:.55}#sch .dr.cp2{margin:.15em 0}#sch .dr.cp2 .tl{height:1.6em}#sch .dr.cp2 .bk{font-size:.7em}' +
  '#sch .hh{position:absolute;inset:0;pointer-events:none;z-index:3}#sch .hh i{position:absolute}#sch .hh i.hp{top:0;height:3px;background:#ffe0ef;opacity:.9;border-radius:1px}#sch .hh i.hw{bottom:0;height:13px;background:rgba(255,59,47,.85);border-radius:2px;box-shadow:0 0 5px rgba(255,59,47,.8)}' +
  '#sch .hsum{margin-left:.6em;opacity:.9}#sch .lgh{display:flex;flex-wrap:wrap;gap:.3em 1.2em;margin:.5em 0 0 6.1em;opacity:.8;font-size:.9em}#sch .lgh i{display:inline-block;width:1.4em;margin-right:.4em;vertical-align:middle;border-radius:2px}').replace(/#sch /g, '#nau ') +
  '#sch .gx{position:absolute;top:2px;bottom:2px;border-radius:5px;border:1px dashed rgba(255,255,255,.45);display:flex;align-items:center;justify-content:center;font-size:.72em;color:#fff;pointer-events:none;white-space:nowrap;overflow:hidden;z-index:1;text-shadow:0 1px 2px rgba(0,0,0,.8)}' +
  '#sch .gx.L{background:rgba(255,79,163,.38)}#sch .gx.N{background:rgba(158,123,255,.38)}#sch .gx.E{background:rgba(67,211,67,.32)}#sch .gx.S{background:rgba(38,198,218,.35)}' +
  '#nau .rg2.top{position:sticky;top:0;z-index:8;background:rgba(20,24,30,.97);padding:.45em .6em;border:1px solid rgba(110,193,255,.35);border-radius:8px;box-shadow:0 4px 14px rgba(0,0,0,.5)}#nau .rg2.top::before{content:"Zakres dla całej Nauki:";font-weight:600;margin-right:.3em}' +
  '#nau .tl.ro{cursor:default}#nau .tl.ro .pw{position:absolute;top:30%;bottom:30%;border-radius:4px;background:rgba(67,194,90,.45);border:1px solid rgba(140,230,150,.6);pointer-events:none}#nau .nh{margin-top:1em}#nau .nh .st3{font-weight:600;margin:.2em 0 .3em;display:flex;flex-wrap:wrap;align-items:center;gap:.6em}' +
  '#nau .esp{display:inline-flex;align-items:center;gap:.3em;padding:.1em .65em;border-radius:999px;font-size:.88em;font-weight:600}#nau .esp.ok{background:rgba(67,194,90,.18);border:1px solid #43d343;color:#bff0c8}#nau .esp.w{background:rgba(255,179,0,.14);border:1px solid #ffb300;color:#ffd9a0}#nau .esp.n{opacity:.65;border:1px solid rgba(255,255,255,.2)}' +
  '#sch .dr.cp2 .hh i.hw,#nau .dr.cp2 .hh i.hw{height:8px}' +
  '#nau .rgt{font-size:.8em;opacity:.75;font-weight:400;margin-left:.5em;padding:.1em .5em;border:1px solid rgba(110,193,255,.35);border-radius:10px}' +
  '#nau .rgt2{display:inline-flex;flex-wrap:wrap;align-items:center;gap:.25em;margin-left:.6em;font-size:.72em;font-weight:400;vertical-align:middle}#nau .rgt2 button{padding:.15em .5em;font-size:1em}#nau .rgt2 button.on{background:linear-gradient(180deg,#2b8cf2,#1260bf);border-color:#6ec1ff;font-weight:600}' +
  '#nau .rgt2 input{height:1.9em;border-radius:6px;background:rgba(10,12,16,.85);border:1px solid rgba(110,193,255,.5);color:#fff;font:inherit;padding:0 .3em;color-scheme:dark}#nau .rgt2 em{font-style:normal;opacity:.75;margin-left:.3em}';
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
    // v1.40: log karty (zakladka Diagnostyka): kazde wywolanie uslugi i kazdy zapis przez WS z wynikiem
    const w = Object.create(hass);
    w.callService = (d, sv, data, ...r) => this._logP('usługa', d + '.' + sv, data, hass.callService(d, sv, data, ...r));
    w.callWS = (m) => { const p = hass.callWS(m); return /update|create|save|remove|set_user_data|execute/.test(m && m.type || '') ? this._logP('WS', m.type, m, p) : p.catch((e) => { this._log('WS', m && m.type, 'BŁĄD ' + this._errTxt(e)); throw e; }); };
    this._hass = w;
    try { this._obecPub(); } catch (e) { /* brak */ }
    this._render(first);
    this._maybeHistory();
    if (this._tabCur === 'dia') this._diaRender(false);
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
      NAU_CSS + POP_CSS.replace(/#sch\b/g, '#nau') + V135_CSS + V136_CSS + V137_CSS +
      NAU_CSS.replace(/#nau\b/g, '#dia') + POP_CSS.replace(/#sch\b/g, '#dia') + DIA_CSS +
      '</style><ha-card><div id="fw"><div id="mw"><div id="c"><img alt="" src="' + img + '"></div></div>' +
      '<div id="pk" hidden></div><div id="tb"><button data-t="sch">Harmonogram</button><button data-t="nau">Nauka</button><button data-t="dia">Diagnostyka</button></div><div id="sch"></div><div id="nau" hidden></div><div id="dia" hidden></div></div></ha-card>';
    const c = root.getElementById('c');
    this._nodes = ELS.map((el) => {
      const d = document.createElement('div');
      d.className = 'el' + (el.tap ? ' t' : '') + (el.tap && el.tap.rd ? ' rd' : '');
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
    this._diaEl = root.getElementById('dia');
    this._tbEl = root.getElementById('tb');
    this._pkEl = root.getElementById('pk');
    this._pkEl.addEventListener('click', () => this._tab('nau', true));
    this._nau = this._nau || { res: null, loading: false, at: 0, err: '', sig: '' };
    let tab = 'sch'; try { const lt = localStorage.getItem('hkpc_tab'); tab = lt === 'nau' || lt === 'dia' ? lt : 'sch'; } catch (e) { /* brak */ }
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
      if (nw && this._diaEl) { this._diaEl.style.fontSize = Math.max(11, Math.min(15, nw * 0.0105)) + 'px'; this._diaEl.style.padding = Math.max(8, Math.min(30, nw * 0.02)) + 'px'; }
      if (nw) { [this._nauEl, this._tbEl].forEach((x) => { x.style.fontSize = Math.max(11, Math.min(15, nw * 0.0105)) + 'px'; }); this._nauEl.style.padding = Math.max(8, Math.min(30, nw * 0.02)) + 'px'; this._tbEl.style.paddingLeft = this._tbEl.style.paddingRight = Math.max(8, Math.min(30, nw * 0.02)) + 'px'; }
    };
    this._fit();
    try { if (window.ResizeObserver) { this._ro = new ResizeObserver(() => this._fit()); this._ro.observe(c); this._ro.observe(this._schEl); } } catch (e) { /* brak */ }
    window.addEventListener('resize', this._fit);
    setTimeout(this._fit, 50); setTimeout(this._fit, 600);
    this._schBind();
    // v1.36: wspolny wybor zakresu (Harmonogram + Nauka)
    [this._schEl, this._nauEl].forEach((x) => { x.addEventListener('click', (ev) => this._rngEv(ev), true); x.addEventListener('change', (ev) => this._rngEv(ev), true); });
    this._pend = [];
    this._built = true;
  }

  _render(force) {
    if (!this._config || !this._hass) return;
    if (!this._built) { this._build(); force = true; }
    const st = this._hass.states;
    const E = this._E;
    // v1.30: temp. w domu przy rozdzielaczu = czujnik salonu ze Zrodel nauki (odswiezane co 30 s)
    if (!(this._config.entities || {}).dom && (!this._domAt || Date.now() - this._domAt > 30000)) { this._domAt = Date.now(); try { E.dom = this._nauSalon()[0] || DEFAULT_E.dom; } catch (e) { E.dom = DEFAULT_E.dom; } }
    // v1.36: prad pod "Moc grzewcza" = encja wybrana w Nauce (input_text.hp_energia_encja); bez wyboru kafel ukryty
    // v1.37: moc elektryczna = encja mocy (W/kW) wybrana w Nauce, inaczej czujnik pakietu (szacunek albo przeliczenie); CWU dzis z calki, gdy licznik stoi
    const ce = this._config.entities || {};
    if (!ce.prad) { try { const sel = this._enEnt(), u = sel ? this._enUnit(sel) : ''; E.prad = sel && /^(W|kW)$/.test(u) ? sel : st[DEFAULT_E.prad] ? DEFAULT_E.prad : 'sensor.hp_moc_elektryczna'; } catch (e) { E.prad = DEFAULT_E.prad; } }
    if (!ce.e_cwu) E.e_cwu = st['sensor.hp_cieplo_cwu_dzis_razem'] ? 'sensor.hp_cieplo_cwu_dzis_razem' : DEFAULT_E.e_cwu;
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
    this._pkBar();
    this._schTick();
    this._nauTick();
    this._autoSync();
  }


  // ====================== HARMONOGRAM (tydzien) ======================
  _schLanes() {
    return [
      { k: 'noc', n: 'Obniżenie CO', sch: 'schedule.hp_plan_obnizenie_co', en: 'input_boolean.hp_plan_noc', au: 'input_boolean.hp_auto_noc', an: 'Automatyzacja obniżenia CO', t: 'HP plan obnizenie CO', ic: 'mdi:weather-night', c: '#3f7cff', c2: '#2a56c9',
        d: 'W oknie przesuwa krzywą grzewczą, poza oknem wraca do wartości dziennej.',
        p: [{ e: 'input_number.hp_noc_przesuniecie', l: 'Przesunięcie w oknie', u: '°C', def: -2 }, { e: 'input_number.hp_dzien_przesuniecie', l: 'Przesunięcie poza oknem', u: '°C', def: 0 }] },
      { k: 'cwu', n: 'Tryb CWU', sch: 'schedule.hp_plan_tryb_cwu', en: 'input_boolean.hp_plan_cwu', au: 'input_boolean.hp_auto_cwu', an: 'Automatyzacja CWU', t: 'HP plan tryb CWU', ic: 'mdi:water-boiler', c: '#1fa5f5', c2: '#0f74b8',
        d: 'W oknie ustawia wybrany tryb CWU, poza oknem drugi.',
        p: [{ e: 'input_select.hp_cwu_tryb_w_oknie', l: 'Tryb w oknie', def: 'Luksus' }, { e: 'input_select.hp_cwu_tryb_poza', l: 'Tryb poza oknem', def: 'Normalny' }] },
      { k: 'cyrk', n: 'Cyrkulacja CWU', sch: 'schedule.hp_plan_cyrkulacja_cwu', en: 'input_boolean.hp_plan_cyrk', au: 'input_boolean.hp_auto_cyrk', an: 'Automatyzacja cyrkulacji', t: 'HP plan cyrkulacja CWU', ic: 'mdi:autorenew', c: '#43c25a', c2: '#2a8a3c',
        d: 'W oknie cyrkulacja pracuje wg czasów poniżej. Poza oknem: praca 1 min / postój 60 min (sterownik nie ma pełnego wyłączenia).',
        p: [{ e: 'input_number.hp_cyrk_praca', l: 'Praca w oknie', u: 'min', def: 60 }, { e: 'input_number.hp_cyrk_postoj', l: 'Postój w oknie', u: 'min', def: 1 }] },
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
    const ids = []; this._schLanes().forEach((l) => { ids.push(l.sch, l.en); if (l.au) ids.push(l.au); l.p.forEach((q) => ids.push(q.e)); });
    ids.push(E.sch_n, E.sch_hw);
    // v1.39: znacznik ESP + linia "teraz" (tryb CWU w pompie, cyrkulacja, obecnosc)
    ids.push(E.esp_plan, E.esp_cwu, E.esp_cyrk, E.esp_noc, E.esp_grz, E.esp_stat, E.cwu_plan, E.cyrk_plan, E.hwmode, E.hwc_run, E.hwc_still, 'input_text.hp_obecnosc_encje', E.g12_tania, E.cwu_boost); this._obecIds().forEach((i) => ids.push(i));
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
    // v1.40: info o planie w ESP przeniesione do zakladki Diagnostyka
    if (espOn) h += '<div class="warn">⚠ Na ESP jest włączony własny harmonogram („Harmonogram nocny / CWU aktywny”). Planem ma rządzić Home Assistant, więc wyłącz go, bo będą się gryźć. <button data-a="more" data-e="' + (st[E.sch_n] && st[E.sch_n].state === 'on' ? E.sch_n : E.sch_hw) + '">Pokaż przełącznik</button></div>';
    const coBtn = '<button class="tab' + (S.lane === 'co' ? ' on' : '') + '" data-a="lane" data-k="co" title="Tylko podgląd: kiedy pompa pracowała w trybie CO"><span class="dot"></span>Tryb CO</button>';
    h += '<div class="tabs">' + lanes.map((l, li) => {
      const on = st[l.en] && st[l.en].state === 'on', inw = st[l.sch] && st[l.sch].state === 'on';
      const au = this._schAuto(l);
      return (li === 1 ? coBtn : '') + '<button class="tab' + (l.k === lane.k && S.lane !== 'co' ? ' on' : '') + '" data-a="lane" data-k="' + l.k + '"><span class="dot' + ((on || au) ? (inw ? ' w' : ' a') : '') + '"></span>' + esc(l.n) + (au ? '<span class="au">auto</span>' : '') + (S.dirty[l.k] && !au ? ' •' : '') + '</button>';
    }).join('') + '</div>';
    if (S.lane === 'co') { el.innerHTML = h + this._schCoHtml(DL, days) + '</div>'; return; }
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
    h += '<div class="lh"><button class="tg' + (on ? ' on' : '') + '" data-a="en" title="Włącz / wyłącz tę funkcję"><i></i></button><b>' + (this._schAuto(lane) ? 'Automatyczny' : on ? 'Aktywne' : 'Wyłączone') + '</b>' +
      '<span>Teraz: <b>' + (inw ? 'w oknie' : 'poza oknem') + '</b>' + esc(nxt) + '</span></div>';
    const lk = this._schAuto(lane);
    if (!st[lane.en]) h += '<div class="info">Brak przełącznika <code>' + lane.en + '</code>. Dodaj pakiet HA z repozytorium (packages/hydrolution_karta.yaml) i przeładuj konfigurację.</div>';
    // v1.37: przy wlaczonej automatyzacji CWU tryb w oknie = ten sam co w Nauce (input_select.hp_cwu_tryb_tania), jedno zrodlo prawdy
    const cwuAu = lane.k === 'cwu' && this._schAuto(lane) && st[E.cwu_tania];
    const lp = lane.k !== 'cwu' ? lane.p : lane.p.map((q) => (q.e === 'input_select.hp_cwu_tryb_w_oknie' ? (cwuAu ? { e: E.cwu_tania, l: 'Tryb CWU w taniej strefie' } : Object.assign({}, q, { l: 'Tryb CWU w oknie harmonogramu' }))
      : q.e === 'input_select.hp_cwu_tryb_poza' ? Object.assign({}, q, { l: cwuAu ? 'Tryb CWU w drogiej strefie' : 'Tryb CWU poza oknem' }) : q));
    if (lp.length) {
      h += '<div class="pr">' + lp.map((q) => {
        const s = st[q.e]; if (!s) return '<label>' + esc(q.l) + ': <i>brak encji</i></label>';
        if (q.e.startsWith('input_select')) return '<label>' + esc(q.l) + '<select data-a="par" data-e="' + q.e + '">' + (s.attributes.options || []).map((o) => '<option' + (o === s.state ? ' selected' : '') + '>' + esc(o) + '</option>').join('') + '</select></label>';
        return '<label>' + esc(q.l) + '<input type="number" data-a="par" data-e="' + q.e + '" value="' + Number(s.state) + '" min="' + s.attributes.min + '" max="' + s.attributes.max + '" step="' + (s.attributes.step || 1) + '">' + (q.u || '') + '</label>';
      }).join('') + '</div>';
    }
    let dr = this._schDraft(lane);
    // v1.46: automatyczne obnizenie CO - okna wprost z planu (sen = odwrotnosc planu cyrkulacji), nawet gdy Nauka jeszcze nie zapisala harmonogramu
    if (lane.k === 'noc' && lk) { const np = this._nocPlan(); if (np) { const o = {}; days.forEach((d, i) => { o[d] = np[i] || []; }); dr = o; } }
    const now = new Date(), nowMin = now.getHours() * 60 + now.getMinutes(), wd = (now.getDay() + 6) % 7;
    // v1.36: rzedy = daty z wybranego zakresu (domyslnie dzis w 4. rzedzie, 3 dni wstecz i 3 w przod);
    //        okna = tygodniowy szablon dnia tygodnia (edycja jak dawniej), czerwony pasek = faktyczna praca z historii HA
    const RG = this._rngDays(), t0 = new Date(); t0.setHours(0, 0, 0, 0);
    const HS = this._schHist(lane.k), cmp = RG.days.length > 10;
    h += this._rngHtml();
    h += '<div class="hr dt">' + [0, 3, 6, 9, 12, 15, 18, 21, 24].map((x) => '<span style="left:' + (x / 24 * 100) + '%">' + x + '</span>').join('') + '</div>';
    const MS = lane.k === 'cwu' ? this._cwuModes(days.map((d) => dr[d]), st[E.cwu_wait] ? Number(st[E.cwu_wait].state) : 30, this._schAuto(lane)) : null, NMS = MS ? this._cwuNames() : null;
    RG.days.forEach((dt) => {
      const i = (dt.getDay() + 6) % 7, d = days[i], isT = dt.getTime() === t0.getTime(), past = dt < t0;
      h += '<div class="dr' + (MS ? ' cwm' : '') + (past ? ' ps' : '') + (cmp ? ' cp2' : '') + '"><span class="dn dt' + (isT ? ' td' : '') + '">' + DL[i] + ' ' + String(dt.getDate()).padStart(2, '0') + '.' + String(dt.getMonth() + 1).padStart(2, '0') + '</span><div class="tl' + (lk ? ' lk' : '') + '" data-day="' + d + '" style="--c:' + lane.c + ';--c2:' + lane.c2 + '">';
      dr[d].forEach((b, j) => {
        const sel = S.sel && S.sel.d === d && S.sel.i === j;
        h += '<div class="bk' + (sel ? ' sel' : '') + '" data-a="bk" data-d="' + d + '" data-i="' + j + '" style="left:' + (b.f / 14.4) + '%;width:' + ((b.t - b.f) / 14.4) + '%">' + this._schFmt(b.f) + '–' + this._schFmt(b.t) + '</div>';
      });
      // v1.37: CWU - czas poza oknami tez wypelniony blokiem trybu (np. Ekonomiczny), tylko podglad
      if (MS) MS[i].filter((b) => !dr[d].some((w) => w.f < b.t && w.t > b.f)).forEach((b) => { h += '<div class="gx ' + b.c + '" style="left:' + (b.f / 14.4) + '%;width:' + ((b.t - b.f) / 14.4) + '%" title="poza oknem: ' + esc(NMS[b.m]) + '">' + (b.t - b.f >= 90 ? esc(NMS[b.m]) + ' ' : '') + (b.t - b.f >= 150 ? this._schFmt(b.f) + '–' + this._schFmt(b.t) : '') + '</div>'; });
      if (isT) h += '<div class="nw" style="left:' + (nowMin / 14.4) + '%"></div>';
      h += this._schHistRow(HS, dt.getTime());
      if (MS) h += '<div class="ms">' + MS[i].map((b) => '<i class="' + b.c + '" style="left:' + (b.f / 14.4) + '%;width:' + ((b.t - b.f) / 14.4) + '%" title="' + esc(NMS[b.m]) + ' ' + this._schFmt(b.f) + '–' + this._schFmt(b.t) + '"></i>').join('') + '</div>';
      h += '</div>' + (lk ? '<span class="cp"></span>' : '<button class="cp" data-a="cp" data-d="' + d + '" title="Skopiuj ten dzień na wszystkie dni">⧉</button>') + '</div>';
    });
    if (this._histIds(lane.k)) h += '<div class="lgh"><span><i style="background:#ffe0ef;height:3px"></i>plan wtedy</span><span><i style="background:#ff3b2f;height:10px"></i>' + (lane.k === 'noc' ? 'krzywa faktycznie obniżona (przesunięcie w pompie niższe niż poza oknem)' : 'faktyczna praca') + '</span><span>Edycja okna w rzędzie zmienia ten dzień tygodnia (szablon tygodnia).</span></div>';
    if (MS) h += '<div class="lgm"><span>Pasek pod osią = faktyczny tryb CWU:</span><span><i class="' + (NMS.lux ? 'L' : this._cwuCls(NMS.L)) + '"></i>' + esc(NMS.L) + ' (w oknie)</span>' + (this._schAuto(lane) ? '<span><i class="E"></i>Ekonomiczny (czeka na tanią)</span>' : '') + '<span><i class="' + this._cwuCls(NMS.N) + '"></i>' + esc(NMS.N) + ' (poza oknem)</span>' + this._cwuLeg() + '<span><i style="background:#f5a9cd"></i>okna (jasny róż)</span><span><i class="E" style="opacity:.45;border:1px dashed #fff"></i>poza oknem (blok trybu, tylko podgląd)</span></div>';
    if (lk) { el.innerHTML = h + '<div class="ft"><span class="hint">Automatyczny harmonogram z Nauki. Czerwona kreska = teraz.</span></div></div>'; return; }
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
      if (!tl || S().lane === 'co' || (ev.target.closest('.bk')) || this._schAuto(lane())) return;
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
      if (this._schAuto(l) && ['bk', 'cp', 'del', 'undo', 'save'].indexOf(a) >= 0) return;
      if (a === 'gonau') { this._tab('nau', true); return; }
      if (a === 'espnow') { this._espKick(true); return; }
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
        this._espKick();
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
  // v1.23: harmonogram prowadzony automatycznie z Nauki (wlaczony suwak automatyzacji)
  // v1.47: zakladka Tryb CO - tylko wykres z historii HA: kiedy pompa byla w trybie CO i kiedy pracowala sprezarka (bez sterowania)
  _schCoHtml(DL, days) {
    const RG = this._rngDays(), t0 = new Date(); t0.setHours(0, 0, 0, 0);
    const now = new Date(), nowMin = now.getHours() * 60 + now.getMinutes(), HS = this._schHist('co'), cmp = RG.days.length > 10;
    let h = this._rngHtml();
    h += '<div class="hr dt">' + [0, 3, 6, 9, 12, 15, 18, 21, 24].map((x) => '<span style="left:' + (x / 24 * 100) + '%">' + x + '</span>').join('') + '</div>';
    RG.days.forEach((dt) => {
      const i = (dt.getDay() + 6) % 7, isT = dt.getTime() === t0.getTime(), past = dt < t0;
      h += '<div class="dr' + (past ? ' ps' : '') + (cmp ? ' cp2' : '') + '"><span class="dn dt' + (isT ? ' td' : '') + '">' + DL[i] + ' ' + String(dt.getDate()).padStart(2, '0') + '.' + String(dt.getMonth() + 1).padStart(2, '0') + '</span><div class="tl lk" style="--c:#ff7a2f;--c2:#c2511b">' +
        (isT ? '<div class="nw" style="left:' + (nowMin / 14.4) + '%"></div>' : '') + this._schHistRow(HS, dt.getTime()) + '</div><span class="cp"></span></div>';
    });
    h += '<div class="lgh"><span><i style="background:#ffe0ef;height:3px"></i>pompa w trybie CO (priorytet Ogrzewanie)</span><span><i style="background:#ff3b2f;height:10px"></i>praca sprężarki na CO</span></div>';
    return h + '<div class="ft"><span class="hint">Tylko podgląd z historii HA, bez sterowania. Czerwona kreska = teraz.</span></div>';
  }
  _schAuto(l) { const s = l && l.au && this._hass && this._hass.states[l.au]; return !!(s && s.state === 'on'); }
  _autoAny() { return this._schLanes().some((l) => this._schAuto(l)); }
  _autoSync() {
    try { this._cyrkPub(); } catch (e) { /* brak */ }
    const S = this._sch, N = this._nau, hass = this._hass;
    if (!S || !S.loaded || !N || !N.res || N.loading || !hass || !(hass.user && hass.user.is_admin)) return;
    S.syncAt = S.syncAt || {}; S.syncing = S.syncing || {};
    this._schLanes().filter((l) => this._schAuto(l)).forEach((l) => {
      if (!S.data[l.k] || S.syncing[l.k]) return;
      let bl = null;
      if (l.k === 'cyrk') {
        // v1.35: harmonogram = plan policzony w HA (input_text.hp_cyrk_plan), bez niego jak dawniej z Nauki karty
        const pl = hass.states[this._E.cyrk_plan];
        if (pl && /^[0-9a-f]{168}$/.test(pl.state)) bl = this._maskBl(pl.state);
        else if (N.res.cyrk) bl = N.edit || this._nauBase(N.res.cyrk);
      }
      if (l.k === 'noc') bl = this._nocPlan();   // v1.46: automatyczne obnizenie CO = sen (+ opcjonalnie droga G12)
      if (l.k === 'cwu') {
        bl = this._nauCwuPlan(N.res.cwu).blocks;
        // v1.39: automatyczny plan CWU -> input_text.hp_cwu_plan (hp_esp_plan od razu wysyla go do ESP)
        const pc = hass.states[this._E.cwu_plan], mk = bl ? this._mask(bl, false) : '';
        if (pc && mk.length === 168 && pc.state !== mk && Date.now() - (S.cwuPubAt || 0) > 60000) {
          S.cwuPubAt = Date.now();
          hass.callService('input_text', 'set_value', { entity_id: this._E.cwu_plan, value: mk }).catch(() => { /* brak */ });
        }
      }
      if (!bl) return;
      const cur = this._schFromItem(S.data[l.k]), days = this._schDays(), tgt = {};
      days.forEach((d, i) => { tgt[d] = bl[i] ? this._schNorm(JSON.parse(JSON.stringify(bl[i]))) : cur[d]; });
      delete S.dirty[l.k]; delete S.draft[l.k];
      if (JSON.stringify(tgt) === JSON.stringify(cur)) { if (!S.syncAt[l.k]) S.syncAt[l.k] = N.at; return; }
      if (Date.now() - (S.syncTry && S.syncTry[l.k] || 0) < 120000) return;
      S.syncTry = S.syncTry || {}; S.syncTry[l.k] = Date.now(); S.syncing[l.k] = true;
      const body = { type: 'schedule/update', schedule_id: S.data[l.k].id, name: l.t, icon: l.ic };
      days.forEach((d) => { body[d] = tgt[d].map((b) => ({ from: this._schFmt(b.f, true), to: this._schFmt(b.t, true) })); });
      hass.callWS(body).then(() => { S.syncAt[l.k] = Date.now(); S.syncing[l.k] = false; this._espKick(); return this._schLoad(); })
        .catch((e) => { S.syncing[l.k] = false; S.err = 'Automatyczny harmonogram: nie udało się zapisać (' + (e && (e.message || e.code) || e) + ').'; this._schRender(); });
    });
  }
  // v1.38: po kazdej zmianie harmonogramu od razu wyslij plan do ESP (uruchamia automatyzacje hp_esp_plan, ta liczy maski i zapisuje tylko roznice)
  _espKick(now) {
    clearTimeout(this._espKickTm);
    this._espKickTm = setTimeout(() => {
      const st = this._hass && this._hass.states; if (!st) return;
      const au = Object.keys(st).find((i) => i.startsWith('automation.') && st[i].attributes && st[i].attributes.id === 'hp_esp_plan');
      if (!au || st[au].state !== 'on') return;
      this._espKickAt = Date.now();
      this._hass.callService('automation', 'trigger', { entity_id: au, skip_condition: false }).catch(() => { /* brak */ });
      if (this._sch) this._schRender();
      if (this._tabCur === 'nau' && this._nau) this._nauRender();
    }, now ? 0 : 2500);
  }
  async _schSave(l) {
    const S = this._sch, dr = this._schDraft(l);
    const body = { name: l.t, icon: l.ic };
    this._schDays().forEach((d) => { body[d] = dr[d].map((b) => ({ from: this._schFmt(b.f, true), to: this._schFmt(b.t, true) })); });
    try {
      if (S.data[l.k]) await this._hass.callWS(Object.assign({ type: 'schedule/update', schedule_id: S.data[l.k].id }, body));
      else await this._hass.callWS(Object.assign({ type: 'schedule/create' }, body));
      delete S.dirty[l.k]; delete S.draft[l.k]; S.sel = null; S.err = ''; S.note = null;
      this._espKick();
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
  // v1.22: czy w HA jest aktualny pakiet (encje + automatyzacje + wersja)
  _pkgCheck() {
    const st = this._hass.states, E = this._E;
    const need = [E.auto_cyrk, 'input_number.hp_cyrk_po_wyjsciu', E.wstali, 'input_text.hp_wstalismy_zrodlo',
      'sensor.hp_cwu_srodek_zmiana', E.aktyw, 'sensor.hp_temperatura_zewnetrzna_bt1', 'sensor.hp_pakiet_wersja',
      E.auto_cwu, E.g12, E.g12_we, E.g12_tania, E.g12_do, E.cwu_wait, E.cwu_boost, E.cwu_lux_max, 'input_datetime.hp_cwu_boost_ostatnio', E.cwu_tania, E.cwu_lux_on, E.cwu_poza, 'input_boolean.hp_auto_noc', 'input_boolean.hp_auto_noc_g12', E.cyrk_wymus, E.cyrk_wymus_min, E.cyrk_model, E.cyrk_obec, E.cyrk_plan, 'input_text.hp_krzywa_wzorcowa', 'input_text.hp_krzywa_robocza', 'input_text.hp_energia_encja', 'sensor.hp_hist_cwu_praca', 'sensor.hp_hist_cyrkulacja_praca'];
    const miss = need.filter((i) => !st[i]);
    const autoIds = {};
    Object.keys(st).forEach((k) => { if (k.startsWith('automation.') && st[k].attributes && st[k].attributes.id) autoIds[st[k].attributes.id] = 1; });
    [['hp_auto_cyrk', 'automatyzacja „HP auto: cyrkulacja CWU wg harmonogramu i obecnosci”'], ['hp_auto_wstali', 'automatyzacja „HP auto: weekend - wstalismy (cyrkulacja)”'], ['hp_auto_cwu', 'automatyzacja „HP auto: CWU wg taryfy G12”'], ['hp_cwu_boost_koniec', 'automatyzacja „HP auto: koniec luksusu jednorazowego”'], ['hp_cyrk_wymus', 'automatyzacja „HP cyrkulacja: reczne wymuszenie z karty”'], ['hp_esp_plan', 'automatyzacja „HP plan: wyslij plan tygodnia do ESP”'], ['hp_cyrk_przelicz', 'automatyzacja „HP auto: przelicz plan cyrkulacji (bez karty)”'], ['hp_cyrk_nauka', 'automatyzacja „HP auto: nauka snu i wstawania (cyrkulacja, bez karty)”']]
      .forEach(([id, n]) => { if (!autoIds[id]) miss.push(n); });
    const vs = st['sensor.hp_pakiet_wersja'], ver = vs ? String(vs.state) : null;
    const num = (v) => String(v).split('.').map((x) => parseInt(x, 10) || 0);
    const a = ver ? num(ver) : [0], b = num(PKG_VER);
    const old = !ver || a[0] < b[0] || (a[0] === b[0] && (a[1] || 0) < (b[1] || 0));
    return { miss, ver, want: PKG_VER, old: old || miss.length > 0 };
  }
  _pkBar() {
    const el = this._pkEl; if (!el || !this._hass) return;
    const P = this._pkgCheck(), K = this._pk || {}, mode = this._pkMode();
    const sig = P.old + '|' + P.ver + '|' + P.miss.join(',') + '|' + mode + '|' + (K.busy ? 1 : 0);
    this._pkAuto();
    if (el._sig === sig) return; el._sig = sig;
    el.hidden = !P.old && !K.busy;
    if (K.busy) el.innerHTML = '⏳ <b>Karta instaluje / aktualizuje pakiet HA</b>… szczegóły w zakładce Nauka.';
    else if (P.old) el.innerHTML = '⚠ <b>' + (P.ver ? 'Masz stary pakiet w HA' : 'Brak pakietu w HA') + '</b> (' + (P.ver ? 'v' + P.ver : 'brak wersji') + ', karta chce v' + P.want + '). Brakuje ' + P.miss.length + ' elementów. Kliknij: zakładka Nauka (albo Diagnostyka) → ' + (mode === 'yaml' || !P.miss.length ? '„Napraw pakiet (podmień plik)”' : '„Zainstaluj / napraw pakiet”') + '.';
  }
  _pkHtml(esc) {
    const hass = this._hass, P = this._pkgCheck(), K = this._pk || (this._pk = {}), admin = !!(hass.user && hass.user.is_admin);
    if (admin && !K.reg && !K.regLoading && !K.regFail && !(K.regAt && Date.now() - K.regAt < 60000)) { K.regLoading = true; this._pkReg(true).then(() => { K.regLoading = false; this._nauRender(); }); }
    const R = this._pkPlan(), nm = (it) => esc(this._pkName(it)), lst = (a) => a.map((it) => nm(it.it || it)).join(', ');
    let h = '';
    const log = (K.log && K.log.length) || (K.err && K.err.length);
    if (K.busy) h += '<div class="pkw">⏳ <b>Instaluję pakiet HA przez API…</b> ' + (K.log ? K.log.length : 0) + ' zrobione' + (K.err && K.err.length ? ', ' + K.err.length + ' błędów' : '') + '. Nie zamykaj strony.</div>';
    else if (log) {
      h += '<div class="pkw ok"><b>Pakiet HA: ' + (K.auto ? 'karta sama zaktualizowała' : 'gotowe') + '</b> (' + new Date(K.done).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }) + ').' +
        (K.log.length ? '<br>' + K.log.map(esc).join('<br>') : '') +
        (K.err.length ? '<br><b style="color:#ff8a80">Nie wyszło (' + K.err.length + '):</b><br>' + K.err.map(esc).join('<br>') : '') + ' <button data-a="pkok">OK</button></div>';
    }
    if (K.busy) return h;
    const P0 = this._pkgCheck();
    if (R.mode === 'yaml') {
      if (!R.paste.length && !R.restart.length) return h + (P0.old ? '<div class="pkw">⚠ <b>Pakiet w pliku jest starszy</b> (v' + esc(R.yv) + ', karta ma v' + PKG.ver + ').' + this._pkFixHtml(esc) + '</div>' : '');
      if (!R.paste.length) return h + '<div class="pkw">⚠ <b>Pakiet YAML v' + esc(R.yv) + ' jest aktualny, ale HA nie załadował ' + R.restart.length + ' jego elementów:</b> ' + lst(R.restart) + '. Zrób <b>pełny restart HA</b> (Ustawienia → ⋮ → Uruchom ponownie). Jeśli po restarcie dalej brakuje, sprawdź log HA (np. zajęta nazwa encji, wtedy HA dokłada „_2”).</div>';
      return h + '<div class="pkw">⚠ <b>Pakiet masz w pliku YAML</b> (<code>/config/packages/hydrolution_karta.yaml</code>, v' + esc(R.yv) + '), karta oczekuje <b>v' + PKG.ver + '</b>.' + this._pkFixHtml(esc) +
        (R.paste.length ? '<br>Nowe albo zmienione w v' + PKG.ver + ' (' + R.paste.length + '): ' + lst(R.paste) + '.' : '') +
        (R.restart.length ? '<br>Są w Twoim pliku, ale HA ich nie załadował (zrób pełny restart): ' + lst(R.restart) + '.' : '') +
        '<br><b>Droga A (jak dotąd):</b> wklej całą treść <code>packages/hydrolution_karta.yaml</code> z repo do tego pliku, Narzędzia deweloperskie → YAML → Sprawdź konfigurację, potem <b>pełny restart HA</b>.' +
        '<br><b>Droga B (raz, potem samo z HACS):</b> 1) w File editor zmień nazwę pliku na <code>hydrolution_karta.yaml.bak</code> (nic nie kasujesz, HA go po prostu nie wczyta), 2) <b>pełny restart HA</b>, 3) wróć tutaj i kliknij „Zainstaluj / napraw pakiet”. Karta założy wszystko przez API pod tymi samymi nazwami encji, a przy każdej aktualizacji karty z HACS sama dołoży i poprawi swoje elementy.</div>';
    }
    if (!R.create.length && !R.update.length && !R.orphan.length) return h + (P0.old && admin ? '<div class="pkw">⚠ <b>Pakiet HA starszy niż karta</b> (v' + esc(P0.ver || '–') + ', karta ma v' + PKG.ver + '), a karta nie widzi, co dołożyć: pakiet jest pewnie w pliku YAML.' + this._pkFixHtml(esc) + '</div>' : '');
    if (!admin) return h + '<div class="pkw">⚠ <b>Pakiet HA trzeba zainstalować albo uzupełnić</b> (' + (R.create.length + R.update.length) + ' elementów). Zrobi to karta, ale tylko na koncie administratora HA: otwórz tę zakładkę jako admin.</div>';
    h += '<div class="pkw">' + (R.mode === 'card' ? '⚙ <b>Pakiet HA z karty</b> (zainstalowany v' + esc(R.inst || '–') + ', karta ma v' + PKG.ver + ')' : '⚙ <b>Brak pakietu HA</b> (albo niepełny)') + '. Karta założy go sama przez API Home Assistanta, bez wklejania plików i bez restartu. Niczego nie kasuje i nie rusza Twoich własnych encji ani automatyzacji.';
    if (R.create.length) h += '<br><b>Dołoży (' + R.create.length + '):</b> ' + lst(R.create) + '.';
    if (R.update.length) h += '<br><b>Zaktualizuje swoje elementy (' + R.update.length + ', zmienione w nowszej wersji):</b> ' + lst(R.update) + '.';
    if (R.orphan.length) h += '<br><b>Zablokowane (' + R.orphan.length + '):</b> te nazwy encji trzyma jeszcze stary wpis po pakiecie YAML (encja „niedostępna”, nikt jej już nie dostarcza): ' + R.orphan.map((o) => '<code>' + esc(o.r.entity_id) + '</code>').join(', ') + '. Przycisk „Zwolnij nazwy” usunie te stare wpisy z rejestru encji (historia zostaje, bo jest zapisana po nazwie encji), potem karta założy je od nowa pod tą samą nazwą. Możesz też usunąć je sam: Ustawienia → Urządzenia i usługi → Encje.';
    h += '<br>' + (R.create.length || R.update.length ? '<button class="sv" data-a="pkrun">Zainstaluj / napraw pakiet</button> ' : '') + (R.orphan.length ? '<button data-a="pkfree">Zwolnij nazwy (' + R.orphan.length + ')</button>' : '') + '</div>';
    return h;
  }
  // ====================== v1.28: pakiet HA zakladany przez karte (API HA, tylko admin) ======================
  // Tryby: 'yaml' = pakiet w pliku (karta tylko podpowiada), 'card' = zainstalowany przez karte (input_text.hp_pakiet_karta),
  // 'none' = brak pakietu (albo po zmianie nazwy pliku na .bak). Karta niczego nie usuwa (poza "Zwolnij nazwy" na klikniecie).
  _pkLive(eid) { const s = eid && this._hass.states[eid]; return !!(s && !(s.attributes && s.attributes.restored)); }
  // v1.41: naprawa starego pakietu w pliku YAML przez dodatek File editor (core_configurator):
  //        kopia starego pliku (.bak-vX, HA jej nie wczytuje), zapis nowego, sprawdzenie konfiguracji (blad = przywraca kopie), restart dopiero po klik "Tak"
  _pkFixHtml(esc) {
    const F = this._pkF || {}, admin = !!(this._hass.user && this._hass.user.is_admin);
    let h = '<br>' + (admin ? '<button class="sv" data-a="pkfix"' + (F.busy ? ' disabled' : '') + '>' + (F.busy ? 'Naprawiam…' : 'Napraw pakiet (podmień plik)') + '</button> ' : '<i>Naprawa pakietu tylko na koncie administratora HA.</i> ') +
      '<button data-a="pkcopy">Kopiuj pakiet ' + PKG.ver + ' do schowka</button> <span class="ds">Karta robi kopię starego pliku, wgrywa nowy przez dodatek File editor i sprawdza konfigurację; restart HA dopiero po Twoim kliknięciu.</span>';
    if (F.log && F.log.length) h += '<br>' + F.log.map((x) => esc(x)).join('<br>');
    if (F.ok) h += '<br><b style="color:#7ee04a">Pakiet ' + PKG.ver + ' wgrany i konfiguracja poprawna.</b> <button class="sv" data-a="pkfixr">Tak, restart HA teraz</button> <span class="ds">(bez restartu HA dalej używa starego pakietu)</span>';
    if (F.copied) h += '<br><b>Skopiowane.</b> Otwórz File editor → <code>packages/hydrolution_karta.yaml</code>, zaznacz wszystko, wklej, zapisz, pełny restart. <a href="/hassio/ingress/core_configurator" target="_top">Otwórz File editor</a>';
    return h + '<br>';
  }
  _pkCopy() {
    const F = this._pkF || (this._pkF = {});
    const done = () => { F.copied = true; this._nauRender(); if (this._tabCur === 'dia') this._diaRender(true); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(PKG_YAML).then(done, () => { F.log = (F.log || []).concat(['Schowek niedostępny w tej przeglądarce: skopiuj plik z GitHuba (packages/hydrolution_karta.yaml).']); this._nauRender(); });
    else { F.log = (F.log || []).concat(['Schowek niedostępny: skopiuj plik z GitHuba (packages/hydrolution_karta.yaml).']); this._nauRender(); }
  }
  // v1.44: dostep do plikow HA przez dodatek File editor (wspolne dla naprawy pakietu i zapisu logow)
  async _feOpen(say) {
    const hass = this._hass;
      say('Szukam dodatku File editor…');
      const lst = await hass.callWS({ type: 'supervisor/api', endpoint: '/addons', method: 'get' }).catch((e) => { say('Lista dodatków: BŁĄD ' + this._errTxt(e) + ' (HA bez Supervisora albo brak uprawnień).'); return null; });
      const ad = lst && (lst.addons || []).find((x) => /file editor/i.test(x.name || '') || /configurator$/.test(x.slug || ''));
      const slug = ad ? ad.slug : 'core_configurator';
      say(ad ? 'Dodatek: ' + ad.name + ' (' + slug + '), stan: ' + ad.state + '.' : 'Nie widzę File editora na liście, próbuję core_configurator.');
      const info = await hass.callWS({ type: 'supervisor/api', endpoint: '/addons/' + slug + '/info', method: 'get' }).catch((e) => { say('Info dodatku: BŁĄD ' + this._errTxt(e)); return null; });
      if (!info) throw new Error('brak dodatku File editor (Ustawienia → Dodatki → Sklep → File editor → Zainstaluj i Uruchom). Do tego czasu „Kopiuj pakiet do schowka”.');
      if (info.state !== 'started') throw new Error('dodatek File editor jest zatrzymany: Ustawienia → Dodatki → File editor → Uruchom, potem kliknij jeszcze raz.');
      const ses = await hass.callWS({ type: 'supervisor/api', endpoint: '/ingress/session', method: 'post' });
      document.cookie = 'ingress_session=' + ses.session + ';path=/api/hassio_ingress/;SameSite=Strict' + (location.protocol === 'https:' ? ';Secure' : '');
      const base = String(info.ingress_url || '').replace(/\/$/, '');
      if (!base) throw new Error('File editor nie ma adresu ingress.');
      say('Sesja File editora OK (' + base + ').');
      const get = async (f) => { const r = await fetch(base + '/api/file?filename=' + encodeURIComponent(f), { credentials: 'same-origin' }); if (!r.ok) { say('Odczyt ' + f + ': HTTP ' + r.status); throw new Error('odczyt ' + f + ': HTTP ' + r.status); } return r.text(); };
      const post = async (ep, body) => {
        const r = await fetch(base + '/api/' + ep, { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(body).toString() });
        let j = null; try { j = await r.json(); } catch (e) { /* brak */ }
        if (!r.ok || !j || j.error) throw new Error(ep + ': ' + (j && j.message || ('HTTP ' + r.status)));
        return j;
      };
      return { base, get, post };
  }
  async _pkFix() {
    const F = this._pkF = { busy: true, log: [] }, hass = this._hass;
    const say = (t) => { F.log.push(t); this._log('karta', 'Napraw pakiet', t); this._nauRender(); if (this._tabCur === 'dia') this._diaRender(true); };
    const old = (this._hass.states['sensor.hp_pakiet_wersja'] || {}).state || 'stary';
    try {
      const { get, post } = await this._feOpen(say);
      let path = null, cur = '';
      for (const f of ['/homeassistant/packages/hydrolution_karta.yaml', '/config/packages/hydrolution_karta.yaml']) {
        const t = await get(f).catch(() => '');
        if (t && t !== 'File not found' && !/^\[Errno/.test(t)) { path = f; cur = t; break; }
      }
      if (!path) throw new Error('nie znalazłem pliku (sprawdzone /homeassistant/packages i /config/packages) packages/hydrolution_karta.yaml (ani w /homeassistant, ani w /config).');
      say('Plik: ' + path + ' (' + cur.length + ' znaków).');
      const bak = path + '.bak-v' + old + '-' + new Date().toISOString().slice(0, 16).replace(/[-:T]/g, '');
      await post('save', { filename: bak, text: cur });
      say('Kopia starego: ' + bak + ' (HA jej nie wczytuje).');
      await post('save', { filename: path, text: PKG_YAML });
      say('Zapisany pakiet ' + PKG.ver + '.');
      const chk = await hass.callApi('POST', 'config/core/check_config').catch((e) => ({ result: 'invalid', errors: this._errTxt(e) }));
      if (chk && chk.result === 'valid') { say('Sprawdzenie konfiguracji: OK.'); F.ok = true; }
      else {
        say('Sprawdzenie konfiguracji: BŁĄD: ' + (chk && chk.errors || '?'));
        await post('save', { filename: path, text: cur });
        say('Przywróciłem stary plik (nic nie zmienione). Wyślij mi ten błąd.');
      }
    } catch (e) { say('Nie wyszło: ' + this._errTxt(e)); }
    F.busy = false; this._nauRender();
  }
  _pkFixRestart() {
    const F = this._pkF || {}; if (!F.ok) return;
    F.ok = false; F.log.push('Restart HA… po minucie odśwież stronę (Ctrl+F5).'); this._nauRender();
    this._hass.callService('homeassistant', 'restart', {}).catch(() => { /* HA sie wylacza */ });
  }
  _pkMode() {
    const st = this._hass.states, reg = this._pk && this._pk.reg;
    // v1.42: wersja pakietu z pliku YAML (szablon bez config entry) = tryb plik, nawet gdy zostal znacznik pakietu z karty
    const rv = reg && reg.find((x) => x.entity_id === 'sensor.hp_pakiet_wersja');
    if (rv && rv.platform === 'template' && !rv.config_entry_id && this._pkLive('sensor.hp_pakiet_wersja')) return 'yaml';
    if (st['input_text.hp_pakiet_karta']) return 'card';
    if (this._pkLive('sensor.hp_pakiet_wersja')) return 'yaml';
    for (const k in st) if (/^input_[a-z]+\.hp_/.test(k) && st[k].attributes && st[k].attributes.editable === false && !st[k].attributes.restored) return 'yaml';
    return 'none';
  }
  _pkVer(a, b) {
    const x = String(a || '0').split('.').map((v) => parseInt(v, 10) || 0), y = String(b || '0').split('.').map((v) => parseInt(v, 10) || 0);
    for (let i = 0; i < Math.max(x.length, y.length); i++) { const d = (x[i] || 0) - (y[i] || 0); if (d) return d > 0 ? 1 : -1; }
    return 0;
  }
  _pkAutoEid(id) { const st = this._hass.states; for (const k in st) if (k.startsWith('automation.') && st[k].attributes && st[k].attributes.id === id) return k; return null; }
  _pkEid(it) { return it.t === 'helper' ? it.d + '.' + it.id : it.t === 'script' ? 'script.' + it.id : it.t === 'auto' ? this._pkAutoEid(it.id) : it.eid; }
  _pkName(it) {
    const n = it.t === 'auto' || it.t === 'script' ? it.c.alias : it.c.name;
    return (n || it.id || it.eid) + ' (' + (it.t === 'auto' ? 'automatyzacja ' + it.id : this._pkEid(it)) + ')';
  }
  async _pkReg(force) {
    const K = this._pk || (this._pk = {});
    if (!force && K.reg && Date.now() - K.regAt < 60000) return K.reg;
    try { const r = await this._hass.callWS({ type: 'config/entity_registry/list' }); K.reg = Array.isArray(r) ? r : []; K.regFail = false; if (this._pkEl) this._pkEl._sig = null; } catch (e) { K.reg = null; K.regFail = true; }
    K.regAt = Date.now();
    return K.reg;
  }
  _pkPlan() {
    const st = this._hass.states, mode = this._pkMode(), reg = (this._pk && this._pk.reg) || [];
    const inst = mode === 'card' ? String(st['input_text.hp_pakiet_karta'].state || '') : null;
    const yv = mode === 'yaml' ? (this._pkLive('sensor.hp_pakiet_wersja') ? String(st['sensor.hp_pakiet_wersja'].state) : '0') : null;
    const R = { mode, inst: inst && inst !== 'unknown' ? inst : '', yv, create: [], update: [], orphan: [], paste: [], restart: [] };
    PKG.items.forEach((it) => {
      if (mode === 'yaml' ? it.only === 'card' : it.only === 'yaml') return;
      const eid = this._pkEid(it), live = this._pkLive(eid);
      if (mode === 'yaml') { if (this._pkVer(it.v, yv) > 0) R.paste.push(it); else if (!live) R.restart.push(it); return; }
      if (!live) {
        if (it.t !== 'helper' && it.t !== 'script' && it.t !== 'auto') {
          const r = reg.find((x) => x.entity_id === it.eid);
          if (r && !r.config_entry_id) { R.orphan.push({ it, r }); return; }
        }
        R.create.push(it); return;
      }
      if (mode === 'card' && this._pkVer(it.v, R.inst) > 0) R.update.push(it);
    });
    return R;
  }
  // karta zainstalowana przez siebie: po aktualizacji z HACS sama dokłada / poprawia swoje elementy (z komunikatem)
  _pkAuto() {
    const K = this._pk || (this._pk = {}), hass = this._hass;
    if (K.autoTried || K.busy || !hass.user || !hass.user.is_admin || !hass.states['input_text.hp_pakiet_karta']) return;
    K.autoTried = true;
    setTimeout(async () => {
      await this._pkReg(true);
      const R = this._pkPlan();
      if (R.mode === 'card' && (R.create.length || R.update.length)) this._pkRun(true);
    }, 4000 + Math.random() * 6000);
  }
  async _pkWait(fn, ms) { const t0 = Date.now(); while (Date.now() - t0 < ms) { if (fn()) return true; await new Promise((r) => setTimeout(r, 300)); } return !!fn(); }
  _pkErr(e) { return e && (e.message || (e.body && e.body.message) || e.error || e.code) ? String(e.message || (e.body && e.body.message) || e.error || e.code) : JSON.stringify(e); }
  async _pkFlow(handler, data, pick, opt) {
    const hass = this._hass, base = 'config/config_entries/' + (opt ? 'options/' : '') + 'flow';
    let f = await hass.callApi('POST', base, { handler, show_advanced_options: true });
    for (let i = 0; i < 8; i++) {
      if (f.type === 'create_entry') return f;
      if (f.type === 'abort') throw new Error('HA przerwał: ' + f.reason);
      if (f.errors && Object.keys(f.errors).length) throw new Error('HA odrzucił: ' + JSON.stringify(f.errors));
      if (f.type === 'menu') { f = await hass.callApi('POST', base + '/' + f.flow_id, { next_step_id: pick }); continue; }
      if (f.type !== 'form') throw new Error('nieznany krok ' + f.type);
      const d = {}; (f.data_schema || []).forEach((s) => { if (data[s.name] !== undefined) d[s.name] = data[s.name]; });
      f = await hass.callApi('POST', base + '/' + f.flow_id, d);
    }
    throw new Error('za dużo kroków konfiguracji');
  }
  async _pkDo(it, op) {
    const hass = this._hass, mark = 'Utworzone przez kartę ha-karta-pompa-ciepla (pakiet ' + PKG.ver + '). Karta poprawi to przy swojej aktualizacji.';
    if (it.t === 'helper') {
      const d = it.d, c = Object.assign({}, it.c), eid = d + '.' + it.id;
      if (op === 'upd') {
        const s = hass.states[eid]; if (s && s.attributes && s.attributes.editable === false) throw new Error('jest z pliku YAML, nie ruszam');
        await hass.callWS(Object.assign({ type: d + '/update', [d + '_id']: it.id }, c)); return;
      }
      const r = await hass.callWS(Object.assign({ type: d + '/create' }, c, { name: it.id }));
      if (r && r.id && r.id !== it.id) throw new Error('HA nadał inną nazwę: ' + d + '.' + r.id + ' (ta jest zajęta)');
      await hass.callWS(Object.assign({ type: d + '/update', [d + '_id']: it.id }, c));
      // wartosci domyslne tylko dla swiezej encji (nie nadpisuje przywroconej wartosci)
      const DEF = { 'input_number.hp_cwu_lux_max': 60, 'input_number.hp_cwu_czekaj_min': 30, 'input_number.hp_cyrk_po_wyjsciu': 5, 'input_number.hp_cyrk_wymus_min': 60, 'input_number.hp_noc_przesuniecie': -2,
        'input_number.hp_dzien_przesuniecie': 0, 'input_number.hp_cyrk_praca': 60, 'input_number.hp_cyrk_postoj': 1, 'input_text.hp_g12_strefy': '22:00-06:00,13:00-15:00',
        'input_select.hp_cwu_tryb_w_oknie': 'Luksus', 'input_select.hp_cwu_tryb_poza': 'Normalny' };
      if (DEF[eid] === undefined) return;
      let s = null; try { s = await hass.callApi('GET', 'states/' + eid); } catch (e) { s = null; }
      if (!s) return;
      if (d === 'input_number' && Number(s.state) === Number(c.min) && Number(c.min) !== DEF[eid]) await hass.callService('input_number', 'set_value', { entity_id: eid, value: DEF[eid] });
      if (d === 'input_text' && (s.state === '' || s.state === 'unknown')) await hass.callService('input_text', 'set_value', { entity_id: eid, value: DEF[eid] });
      if (d === 'input_select' && s.state === (c.options || [])[0] && s.state !== DEF[eid]) await hass.callService('input_select', 'select_option', { entity_id: eid, option: DEF[eid] });
      return;
    }
    if (it.t === 'script') {
      await hass.callApi('POST', 'config/script/config/' + it.id, Object.assign({}, it.c, { description: mark }));
      if (!(await this._pkWait(() => this._pkLive('script.' + it.id), 8000))) throw new Error('HA nie wczytał skryptu: czy configuration.yaml ma „script: !include scripts.yaml”?');
      return;
    }
    if (it.t === 'auto') {
      await hass.callApi('POST', 'config/automation/config/' + it.id, Object.assign({}, it.c, { description: mark }));
      if (!(await this._pkWait(() => !!this._pkAutoEid(it.id), 8000))) throw new Error('HA nie wczytał automatyzacji: czy configuration.yaml ma „automation: !include automations.yaml”?');
      return;
    }
    const H = { tpl: 'template', um: 'utility_meter', hs: 'history_stats', der: 'derivative', int: 'integration' }[it.t];
    if (!H) throw new Error('nie da się przez API');
    const reg = await this._pkReg(true) || [];
    if (op === 'upd') {
      const r = reg.find((x) => x.entity_id === it.eid && x.config_entry_id);
      if (!r) throw new Error('nie jest z karty (brak wpisu pomocnika), nie ruszam');
      const c = Object.assign({}, it.c); delete c.name;
      await this._pkFlow(r.config_entry_id, c, it.d, true);
      return;
    }
    // v1.29: ktos (inne urzadzenie) juz to zalozyl w miedzyczasie -> nie zakladaj drugi raz
    if (reg.some((x) => x.entity_id === it.eid && x.config_entry_id)) return;
    const f = await this._pkFlow(H, it.c, it.d, false);
    const ent = f.result && f.result.entry_id;
    let r = null;
    for (let i = 0; i < 10 && !r; i++) { const l = await this._pkReg(true) || []; r = l.find((x) => x.config_entry_id === ent); if (!r) await new Promise((q) => setTimeout(q, 400)); }
    if (!r) return;
    if (r.entity_id !== it.eid) {
      try { await hass.callWS({ type: 'config/entity_registry/update', entity_id: r.entity_id, new_entity_id: it.eid }); r = Object.assign({}, r, { entity_id: it.eid }); }
      catch (e) { throw new Error('utworzone jako ' + r.entity_id + ', bo ' + it.eid + ' jest zajęta (' + this._pkErr(e) + ')'); }
    }
    if (it.icon) { try { await hass.callWS({ type: 'config/entity_registry/update', entity_id: r.entity_id, icon: it.icon }); } catch (e) { /* tylko ikona */ } }
  }
  async _pkRun(auto) {
    const K = this._pk || (this._pk = {}), hass = this._hass;
    if (K.busy || !hass.user || !hass.user.is_admin) return;
    let lock = 0; try { lock = Number(localStorage.getItem('hkpc_pk_lock')) || 0; } catch (e) { lock = 0; }
    if (Date.now() - lock < 120000) return;
    try { localStorage.setItem('hkpc_pk_lock', String(Date.now())); } catch (e) { /* brak */ }
    // v1.29: blokada wspolna dla wszystkich przegladarek / telefonow admina (dane uzytkownika w HA), zeby dwa urzadzenia nie zakladaly naraz (duplikaty "_2")
    const me = Math.random().toString(36).slice(2), LK = 'hkpc_pk_lock';
    K.busy = true;
    try {
      const g = await hass.callWS({ type: 'frontend/get_user_data', key: LK }), v = g && g.value;
      let mine = !(v && v.id && Date.now() - (v.ts || 0) < 180000);
      if (mine) {
        await hass.callWS({ type: 'frontend/set_user_data', key: LK, value: { id: me, ts: Date.now() } });
        await new Promise((r) => setTimeout(r, 1500 + Math.random() * 1000));
        const g2 = await hass.callWS({ type: 'frontend/get_user_data', key: LK });
        mine = !!(g2 && g2.value && g2.value.id === me);
      }
      if (!mine) { K.busy = false; try { localStorage.removeItem('hkpc_pk_lock'); } catch (e) { /* brak */ } return; }
    } catch (e) { /* brak danych uzytkownika: tylko blokada lokalna */ }
    K.auto = !!auto; K.log = []; K.err = []; this._pkBar(); if (this._tabCur === 'nau') this._nauRender();
    let updErr = false;
    try {
      await this._pkReg(true);
      const R = this._pkPlan(), ord = ['helper', 'tpl', 'int', 'um', 'hs', 'der', 'script', 'auto'];
      const list = R.create.map((it) => ({ it, op: 'add' })).concat(R.update.map((it) => ({ it, op: 'upd' })));
      list.sort((a, b) => ord.indexOf(a.it.t) - ord.indexOf(b.it.t));
      for (const x of list) {
        try { await this._pkDo(x.it, x.op); K.log.push((x.op === 'add' ? 'dodane: ' : 'zaktualizowane: ') + this._pkName(x.it)); }
        catch (e) { if (x.op === 'upd') updErr = true; K.err.push(this._pkName(x.it) + ': ' + this._pkErr(e)); }
        if (this._tabCur === 'nau') this._nauRender();
        try { await hass.callWS({ type: 'frontend/set_user_data', key: 'hkpc_pk_lock', value: { id: me, ts: Date.now() } }); } catch (e) { /* brak */ }
      }
      if (!updErr && (await this._pkWait(() => !!hass.states['input_text.hp_pakiet_karta'] || !!this._hass.states['input_text.hp_pakiet_karta'], 5000))) {
        await this._hass.callService('input_text', 'set_value', { entity_id: 'input_text.hp_pakiet_karta', value: PKG.ver });
        await this._pkWait(() => { const v = this._hass.states['input_text.hp_pakiet_karta']; return v && v.state === PKG.ver; }, 5000);
      }
    } catch (e) { K.err.push(this._pkErr(e)); }
    K.busy = false; K.done = Date.now(); K.reg = null; K.regAt = 0;
    try { await hass.callWS({ type: 'frontend/set_user_data', key: 'hkpc_pk_lock', value: null }); } catch (e) { /* brak */ }
    try { localStorage.removeItem('hkpc_pk_lock'); } catch (e) { /* brak */ }
    this._pkEl._sig = null; this._pkBar();
    if (this._tabCur === 'nau') this._nauRender();
  }
  async _pkFree() {
    const K = this._pk || (this._pk = {}), hass = this._hass;
    await this._pkReg(true);
    const R = this._pkPlan();
    K.log = []; K.err = []; K.auto = false;
    for (const o of R.orphan) {
      try { await hass.callWS({ type: 'config/entity_registry/remove', entity_id: o.r.entity_id }); K.log.push('zwolniona nazwa (usunięty stary wpis z rejestru): ' + o.r.entity_id); }
      catch (e) { K.err.push(o.r.entity_id + ': ' + this._pkErr(e)); }
    }
    K.done = Date.now(); await this._pkReg(true); this._nauRender();
  }
  _tab(t, user) {
    if (!this._schEl || !this._nauEl) return;
    this._tabCur = t === 'nau' || t === 'dia' ? t : 'sch';
    this._schEl.hidden = this._tabCur !== 'sch';
    this._nauEl.hidden = this._tabCur !== 'nau';
    if (this._diaEl) this._diaEl.hidden = this._tabCur !== 'dia';
    this._tbEl.querySelectorAll('[data-t]').forEach((b) => b.classList.toggle('on', b.getAttribute('data-t') === this._tabCur));
    if (user) { try { localStorage.setItem('hkpc_tab', this._tabCur); } catch (e) { /* brak */ } }
    if (this._tabCur === 'nau') { this._nauRender(); this._nauTick(); } else if (this._tabCur === 'dia') this._diaRender(true); else if (this._hass) this._schRender();
    if (this._fit) setTimeout(this._fit, 0);
  }

  // v1.42: obecnosc TYLKO z osob / telefonow wskazanych w Nauce (bez zone.home)
  _obecIds() {
    const st = this._hass.states, src = this._nauSrc('osoby'), c = this._nauCfg();
    if (src && src.length) return src;
    return c.osoby ? [].concat(c.osoby).filter((i) => st[i]) : [];
  }
  _obecStan() {
    const st = this._hass.states, ids = this._obecIds(), ok = ids.filter((i) => st[i] && !/^(unknown|unavailable)$/.test(st[i].state));
    const home = ok.filter((i) => st[i].state === 'home');
    // v1.45: imitacja obecnosci (Diagnostyka) liczy sie jak jedna osoba w domu
    const im = st['input_boolean.hp_imitacja_obecnosci'], imit = !!(im && im.state === 'on'), imDo = imit ? new Date(Date.parse(im.last_changed) + 30 * 60000) : null;
    let od = null; if (ok.length && !home.length) od = new Date(Math.max.apply(null, ok.map((i) => Date.parse(st[i].last_changed) || 0)));
    return { ids, ok, home, n: home.length + (imit ? 1 : 0), od, imit, imDo, none: !ids.length && !imit, unav: ids.length > 0 && !ok.length && !imit };
  }
  _obecPub() {
    const N = this._nau, hass = this._hass, ent = 'input_text.hp_obecnosc_encje';
    if (!N || !hass || !hass.states[ent]) return;
    if (!N.srcLoaded) { if (!N.srcLoading) { N.srcLoading = true; this._nauSrcLoad().then(() => { N.srcLoading = false; this._obecPub(); }); } return; }
    let v = ''; this._obecIds().forEach((i) => { if ((v ? v.length + 1 : 0) + i.length <= 255) v += (v ? ',' : '') + i; });
    if (hass.states[ent].state === v || (this._obecPubAt && Date.now() - this._obecPubAt < 30000)) return;
    this._obecPubAt = Date.now();
    hass.callService('input_text', 'set_value', { entity_id: ent, value: v }).catch(() => { /* brak */ });
  }

  // ====================== DIAGNOSTYKA (v1.40) ======================
  _errTxt(e) { return String(e && (e.message || e.code) || e); }
  _log(kind, what, res, data) {
    const L = this._lg || (this._lg = (() => { try { return JSON.parse(localStorage.getItem('hkpc_log') || '[]'); } catch (e) { return []; } })());
    let d = ''; try { d = data === undefined ? '' : JSON.stringify(data); } catch (e) { d = ''; }
    if (d.length > 1000) d = d.slice(0, 997) + '…';
    const it = { t: Date.now(), k: kind, w: String(what || ''), r: res, d };
    L.push(it); while (L.length > 500) L.shift();
    this._logSave();
    return it;
  }
  _logSave() {
    const L = this._lg || [];
    clearTimeout(this._lgTm); this._lgTm = setTimeout(() => { try { localStorage.setItem('hkpc_log', JSON.stringify(L)); } catch (e) { /* brak */ } if (this._tabCur === 'dia') this._diaRender(true); }, 400);
  }
  _logP(kind, what, data, p) {
    const it = this._log(kind, what, '…', data);
    return Promise.resolve(p).then((r) => { it.r = 'OK'; this._logSave(); return r; }, (e) => { it.r = 'BŁĄD ' + this._errTxt(e); this._logSave(); throw e; });
  }
  _diaIds() {
    const st = this._hass.states, E = this._E;
    const au = Object.keys(st).filter((i) => i.startsWith('automation.') && st[i].attributes && /^hp_(esp_plan|auto_cwu|auto_cyrk|plan_cwu|plan_cyrk|cyrk_przelicz|cyrk_wymus)$/.test(st[i].attributes.id || ''));
    return ['sensor.hydrolution_diagnostyka_esp', E.hwmode, E.hwc_run, E.hwc_still, E.esp_plan, E.esp_cwu, E.esp_cyrk, E.esp_noc, E.esp_grz, E.esp_off, E.esp_stat, E.cwu_plan, E.cyrk_plan, E.g12_tania, 'input_text.hp_obecnosc_encje', 'input_text.hp_cyrk_powod', 'input_boolean.hp_imitacja_obecnosci', E.cyrk_wymus].concat(this._obecIds(), au).filter((i) => i && st[i]);
  }
  async _diaLoad() {
    const D = this._dia || (this._dia = {}), hass = this._hass; if (D.busy) return;
    D.busy = true; D.err = '';
    try {
      if (hass.user && hass.user.is_admin) await this._pkReg(true).catch(() => null);
      const ids = this._diaIds();
      const ev = await hass.callWS({ type: 'logbook/get_events', start_time: new Date(Date.now() - 24 * 3600e3).toISOString(), entity_ids: ids });
      D.ev = (ev || []).slice(-1000).reverse();
    } catch (e) { D.ev = null; D.err = 'Dziennik HA: ' + this._errTxt(e); }
    try {
      if (hass.user && hass.user.is_admin) {
        const sl = await hass.callWS({ type: 'system_log/list' });
        D.sl = (sl || []).filter((x) => /hydrolution|esphome|hp_|plan_offline|schedule|text\.set_value/i.test([x.name, x.source && x.source.join && x.source.join(':'), (x.message || []).join(' ')].join(' ')));
      } else D.sl = null;
    } catch (e) { D.sl = null; D.err += (D.err ? ' · ' : '') + 'Błędy HA: ' + this._errTxt(e); }
    D.at = Date.now(); D.busy = false; this._diaRender(true);
  }
  _diaStamp() { const d = new Date(), z = (x) => String(x).padStart(2, '0'); return d.getFullYear() + z(d.getMonth() + 1) + z(d.getDate()) + '-' + z(d.getHours()) + z(d.getMinutes()); }
  _diaText() {
    const el = this._diaEl, D = this._dia || {}, was = D.all; el.classList.add('all');
    const txt = 'Karta ' + VERSION + ' / pakiet ' + PKG_VER + ' / ' + new Date().toLocaleString('pl-PL') + '\n' + el.innerText;
    el.classList.toggle('all', !!was);
    return txt;
  }
  // v1.44: zapis logu w HA: nowy plik /config/hp_logi/diagnostyka-RRRRMMDD-GGMM.txt przez File editor (nic nie nadpisuje)
  async _diaSave() {
    const D = this._dia || (this._dia = {}), txt = this._diaText();
    const say = (t) => { this._log('karta', 'Zapis logu w HA', t); };
    D.saveMsg = 'Zapisuję log w HA…'; this._diaRender(true);
    try {
      const { get, post } = await this._feOpen(say);
      let root = null;
      for (const r of ['/homeassistant', '/config']) { const t = await get(r + '/configuration.yaml').catch(() => ''); if (t && t !== 'File not found' && !/^\[Errno/.test(t)) { root = r; break; } }
      if (!root) throw new Error('nie znalazłem katalogu konfiguracji HA');
      await post('newfolder', { path: root, name: 'hp_logi' }).catch(() => null);   // juz jest = OK
      let f = root + '/hp_logi/diagnostyka-' + this._diaStamp() + '.txt';
      const ex = await get(f).catch(() => 'File not found');
      if (ex && ex !== 'File not found') f = f.replace('.txt', '-' + String(Date.now()).slice(-4) + '.txt');
      await post('save', { filename: f, text: txt });
      D.saveMsg = 'Zapisane w HA: ' + f.replace(root, '/config') + ' (' + txt.length + ' znaków). Otworzysz go w File editorze.';
      say('OK ' + f);
    } catch (e) { D.saveMsg = 'Zapis w HA nie wyszedł: ' + this._errTxt(e).replace(/\.$/, '') + '. Użyj „Pobierz log (.txt)” albo „Kopiuj wszystko”.'; say('BŁĄD ' + this._errTxt(e)); }
    this._diaRender(true);
  }
  _diaRender(force) {
    const el = this._diaEl, hass = this._hass; if (!el || !hass || el.hidden) return;
    const D = this._dia || (this._dia = {}), st = hass.states, E = this._E, S = this._sch;
    if (!D.at || (Date.now() - D.at > 60000 && !D.busy)) this._diaLoad();
    if (S && !S.loaded && !S.loading) { S.loading = true; this._schLoad().then(() => { S.loading = false; S.t = Date.now(); this._diaRender(true); }); }
    const ids = this._diaIds(), sig = ids.map((i) => st[i].state + (st[i].attributes.last_triggered || '')).join('|') + (D.at || 0) + '|' + (this._lg ? this._lg.length + (this._lg.length ? this._lg[this._lg.length - 1].r : '') : 0);
    if (!force && sig === D.sig) return; D.sig = sig;
    const ae = this.shadowRoot && this.shadowRoot.activeElement; if (!force && ae && el.contains(ae)) return;
    const esc = (x) => String(x === undefined || x === null ? '' : x).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const tm = (ms) => { const d = new Date(ms); return isNaN(d) ? '' : d.toLocaleString('pl-PL', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }); };
    const fn = (i) => (st[i] && st[i].attributes && st[i].attributes.friendly_name) || i;
    let h = '<div class="sh"><div class="sht">Diagnostyka<small>co karta, HA i ESP robią i czemu coś nie wchodzi</small><span style="flex:1"></span>' +
      '<button data-a="dcopy">Kopiuj wszystko</button><button data-a="dtxt">Pobierz log (.txt)</button><button data-a="dsave">Zapisz log w HA</button><button data-a="dall">' + (D.all ? 'Okna z przewijaniem' : 'Pokaż wszystko bez przewijania') + '</button><button data-a="drel"' + (D.busy ? ' disabled' : '') + '>' + (D.busy ? 'Wczytuję…' : 'Odśwież') + '</button></div>';
    el.classList.toggle('all', !!D.all);
    if (D.hideAt === undefined) { try { D.hideAt = Number(localStorage.getItem('hkpc_dia_hide')) || 0; } catch (e) { D.hideAt = 0; } }
    if (D.saveMsg) h += '<div class="info">' + esc(D.saveMsg) + '</div>';
    h += '<div class="lh" style="flex-wrap:wrap;gap:.4em"><button data-a="dhide">Ukryj starsze niż teraz</button>' + (D.hideAt ? '<button data-a="dunhide">Pokaż wszystko znowu (ukryte do ' + tm(D.hideAt) + ')</button>' : '') + '<button data-a="dclr">Wyczyść log karty</button>' + (hass.user && hass.user.is_admin ? '<button data-a="dslclr">Wyczyść błędy HA</button>' : '') + '<span class="ds">Ukrywanie zmienia tylko widok, historia w HA zostaje.</span></div>';
    if (D.copied && Date.now() - D.copied < 4000) h += '<div class="info">Skopiowane do schowka (' + D.copiedN + ' znaków): wklej w czacie.</div>';
    if (D.copyTxt) h += '<div class="info">Schowek zablokowany w tej przeglądarce: tekst jest zaznaczony niżej, zrób Ctrl+C (na telefonie: przytrzymaj → Kopiuj). <button data-a="dcpx">Zamknij</button><textarea class="cp" readonly>' + esc(D.copyTxt) + '</textarea></div>';
    // v1.42: pakiet HA (wersja + naprawa) tez tutaj
    { const P = this._pkgCheck(); h += '<div class="sec"><div class="st2">Pakiet HA</div><div class="dl"><div><span>Wersja</span><b class="' + (P.old ? 'bad' : 'good') + '">' + esc(P.ver || 'brak') + '</b> (karta chce ' + PKG_VER + ', tryb: ' + esc(this._pkMode()) + ')' + (P.miss.length ? ' · brakuje: ' + esc(P.miss.join(', ')) : '') + '</div></div>' + (P.old ? '<div class="pkw">' + this._pkFixHtml(esc) + '</div>' : '') + '</div>'; }
    if (D.err) h += '<div class="warn">' + esc(D.err) + '</div>';
    // 1) ESP
    const dg = st['sensor.hydrolution_diagnostyka_esp'], pe = st[E.esp_plan], off = st[E.esp_off], ss = st[E.esp_stat];
    const ea = Object.keys(st).find((i) => i.startsWith('automation.') && st[i].attributes && st[i].attributes.id === 'hp_esp_plan');
    const espUp = pe && pe.state !== 'unavailable';
    h += '<div class="sec"><div class="st2">ESP i plan offline</div><div class="dl">' +
      '<div><span>ESP</span><b class="' + (espUp ? 'good' : 'bad') + '">' + (!pe ? 'brak encji „Plan offline” (wgraj ESP v5.5+)' : espUp ? 'online' : 'OFFLINE (niedostępny w HA)') + '</b>' + (off && off.state === 'on' ? ' <b class="bad">steruje sam (brak HA)</b>' : '') + '</div>' +
      '<div><span>Ostatnie zdarzenie ESP</span>' + (dg ? '<b>' + esc(dg.state) + '</b>' : '<i>brak encji „Diagnostyka ESP”: wgraj ESP v5.7, wtedy widać tu każdy zapis do sterownika</i>') + '</div>' +
      '<div><span>Parametry w ESP</span><code>' + esc(pe ? pe.state : '–') + '</code></div>' +
      '<div><span>Stan planu (HA)</span>' + (ss ? '<b class="' + (ss.state === 'OK' ? 'good' : 'bad') + '">' + esc(ss.state) + '</b>' : '<i>brak ' + esc(E.esp_stat) + ' (pakiet 1.39+)</i>') + '</div>' +
      '<div><span>Automatyzacja wysyłki</span>' + (ea ? '<b class="' + (st[ea].state === 'on' ? 'good' : 'bad') + '">' + (st[ea].state === 'on' ? 'włączona' : 'WYŁĄCZONA') + '</b> · ostatnio ' + esc(st[ea].attributes.last_triggered ? tm(st[ea].attributes.last_triggered) : 'nigdy') : '<b class="bad">brak hp_esp_plan (zaktualizuj pakiet)</b>') +
      ' <button data-a="espnow">Wyślij teraz</button></div></div>';
    h += '<div class="lh" style="flex-wrap:wrap;gap:.5em 1em">' + this._schLanes().filter((l) => ['cwu', 'cyrk', 'noc', 'grz'].indexOf(l.k) >= 0).map((l) => {
      const eid = { cwu: E.esp_cwu, cyrk: E.esp_cyrk, noc: E.esp_noc, grz: E.esp_grz }[l.k], es = st[eid];
      return '<span><b>' + esc(l.n) + ':</b> ' + (S && S.loaded ? this._espBadge(l, true) : '…') + (es ? ' <span class="ds">(' + (es.state === 'unavailable' ? 'niedostępne' : es.state.length + ' zn.') + ')</span>' : '') + '</span>';
    }).join('') + '</div></div>';
    // 2) pompa teraz
    { // v1.44: powod decyzji automatu cyrkulacji, wymuszenie z karty, imitacja obecnosci
      const pw = st['input_text.hp_cyrk_powod'], im = st['input_boolean.hp_imitacja_obecnosci'], wy = this._hwcWymus();
      const imOn = im && im.state === 'on', imDo = imOn ? new Date(Date.parse(im.last_changed) + 30 * 60000) : null;
      h += '<div class="sec"><div class="st2">Pompa teraz</div>' + this._schNowHtml(this._schLanes().find((x) => x.k === 'cwu'), esc) + this._schNowHtml(this._schLanes().find((x) => x.k === 'cyrk'), esc) +
        '<div class="dl"><div><span>Automat cyrkulacji zdecydował</span>' + (pw ? '<b>' + esc(pw.state) + '</b>' : '<i>brak input_text.hp_cyrk_powod (pakiet 1.44)</i>') + '</div>' +
        '<div><span>Wymuszenie z karty</span>' + (wy ? '<b class="bad">trwa do ' + new Date(wy * 1000).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }) + '</b> (automat w tym czasie nic nie zmienia)' : 'nie') + '</div>' +
        '<div><span>Imitacja: ktoś jest w domu</span>' + (im ? '<button class="tg' + (imOn ? ' on' : '') + '" data-a="dimit" title="Testowo: automat cyrkulacji uzna, że ktoś jest w domu"><i></i></button> <b class="' + (imOn ? 'bad' : '') + '">' + (imOn ? 'WŁĄCZONA, sama wyłączy się o ' + imDo.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }) : 'wyłączona') + '</b>' : '<i>brak input_boolean.hp_imitacja_obecnosci (pakiet 1.44)</i>') + '</div></div></div>';
    }
    // 3a) v1.42: zdarzenia ESP (pelna historia encji "Diagnostyka ESP")
    const evA = (D.ev || []).filter((x) => !D.hideAt || x.when * 1000 >= D.hideAt);
    const evE = evA.filter((x) => x.entity_id === 'sensor.hydrolution_diagnostyka_esp'), evH = evA.filter((x) => x.entity_id !== 'sensor.hydrolution_diagnostyka_esp');
    h += '<div class="sec"><div class="st2">Zdarzenia ESP (24 h, ' + evE.length + ')</div>' + (!dg ? '<div class="info">Brak encji „Diagnostyka ESP”: wgraj ESP v5.7.</div>' : !evE.length ? '<div class="info">' + (D.busy ? 'Wczytuję…' : 'Brak zdarzeń ESP w 24 h.') + '</div>' :
      '<div class="lg">' + evE.map((x) => '<div><span class="t">' + tm(x.when * 1000) + '</span><span class="' + (/NIE |ODRZUC|PELNA/.test(x.state || '') ? 'bad' : '') + '">' + esc(x.state || x.message || '') + '</span></div>').join('') + '</div>') + '</div>';
    // 3) dziennik HA
    h += '<div class="sec"><div class="st2">Dziennik HA (24 h, ' + evH.length + '): tryb CWU, cyrkulacja, plan, automatyzacje, obecność</div>';
    if (!D.ev) h += '<div class="info">' + (D.busy ? 'Wczytuję…' : 'Brak danych.') + '</div>';
    else if (!evH.length) h += '<div class="info">Brak zdarzeń w ostatnich 24 h.</div>';
    else h += '<div class="lg">' + evH.map((x) => {
      const ctx = x.context_event_type === 'automation_triggered' || x.context_domain === 'automation' ? 'automatyzacja: ' + (x.context_name || x.context_entity_id_name || x.context_entity_id || '') : x.context_user_id ? 'użytkownik / karta' : x.context_service ? 'usługa ' + x.context_domain + '.' + x.context_service : '';
      const txt = x.state !== undefined ? x.state : x.message || '';
      return '<div><span class="t">' + tm(x.when * 1000) + '</span><span class="e">' + esc(x.name || fn(x.entity_id)) + '</span><span>' + esc(txt) + '</span>' + (ctx ? '<span class="ds">' + esc(ctx) + '</span>' : '') + '</div>';
    }).join('') + '</div>';
    h += '</div>';
    // 4) bledy HA
    h += '<div class="sec"><div class="st2">Błędy i ostrzeżenia HA (hydrolution / esphome / pakiet)</div>';
    if (D.sl === null || D.sl === undefined) h += '<div class="info">' + (hass.user && hass.user.is_admin ? (D.busy ? 'Wczytuję…' : 'Brak danych.') : 'Tylko dla administratora HA.') + '</div>';
    else if (!D.sl.filter((x) => !D.hideAt || (x.timestamp || 0) * 1000 >= D.hideAt).length) h += '<div class="info">Brak błędów związanych z pompą w dzienniku systemowym HA.</div>';
    else h += '<div class="lg">' + D.sl.filter((x) => !D.hideAt || (x.timestamp || 0) * 1000 >= D.hideAt).map((x) => '<div><span class="t">' + tm((x.timestamp || 0) * 1000) + '</span><span class="e ' + (x.level === 'ERROR' ? 'bad' : '') + '">' + esc(x.level) + (x.count > 1 ? ' ×' + x.count : '') + '</span><span>' + esc((x.message || []).join(' | ')) + '</span><span class="ds">' + esc(x.name) + '</span></div>').join('') + '</div>';
    h += '</div>';
    // 5) log karty
    const L = (this._lg || []).filter((x) => !D.hideAt || x.t >= D.hideAt);
    h += '<div class="sec"><div class="st2">Log karty (ostatnie ' + L.length + ', w tej przeglądarce)</div>' +
      (L.length ? '<div class="lg">' + L.slice().reverse().map((x) => '<div><span class="t">' + tm(x.t) + '</span><span class="e ' + (/^BŁĄD/.test(x.r) ? 'bad' : '') + '">' + esc(x.r) + '</span><span>' + esc(x.k + ' ' + x.w) + '</span><span class="ds">' + esc(x.d) + '</span></div>').join('') + '</div>' : '<div class="info">Pusto: karta jeszcze nic nie zapisywała.</div>') +
      '</div>';
    el.innerHTML = h;
    if (!el._bound) {
      el._bound = true;
      el.addEventListener('click', (ev) => {
        const t = ev.target.closest && ev.target.closest('[data-a]'); if (!t) return;
        const a = t.getAttribute('data-a');
        if (a === 'espnow') { this._espKick(true); this._log('karta', 'Wyślij teraz do ESP', 'OK'); setTimeout(() => { D.at = 0; this._diaRender(true); }, 25000); }
        else if (a === 'drel') { D.at = 0; this._diaRender(true); }
        else if (a === 'dclr') { this._lg = []; try { localStorage.removeItem('hkpc_log'); } catch (e) { /* brak */ } this._diaRender(true); }
        else if (a === 'dcopy') {
          // v1.42: caly tekst (wszystkie sekcje i linie, takze ukryte za przewijaniem); bez https / w apce: execCommand, a na koniec pole do recznego Ctrl+C
          const txt = this._diaText();
          const ok = () => { D.copied = Date.now(); D.copiedN = txt.length; D.copyTxt = null; this._diaRender(true); };
          const old = () => {
            try {
              const ta = document.createElement('textarea'); ta.value = txt; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.top = '-1000px';
              document.body.appendChild(ta); ta.select(); const r = document.execCommand('copy'); document.body.removeChild(ta);
              if (r) { ok(); return; }
            } catch (e) { /* brak */ }
            D.copyTxt = txt; this._diaRender(true);
            const t2 = el.querySelector('textarea.cp'); if (t2) { t2.focus(); t2.select(); }
          };
          if (navigator.clipboard && navigator.clipboard.writeText && window.isSecureContext) navigator.clipboard.writeText(txt).then(ok, old); else old();
        }
        else if (a === 'dcpx') { D.copyTxt = null; this._diaRender(true); }
        else if (a === 'dimit') { this._hass.callService('input_boolean', 'toggle', { entity_id: 'input_boolean.hp_imitacja_obecnosci' }); }
        else if (a === 'dhide') { D.hideAt = Date.now(); try { localStorage.setItem('hkpc_dia_hide', String(D.hideAt)); } catch (e) { /* brak */ } this._diaRender(true); }
        else if (a === 'dunhide') { D.hideAt = 0; try { localStorage.removeItem('hkpc_dia_hide'); } catch (e) { /* brak */ } this._diaRender(true); }
        else if (a === 'dslclr') { if (window.confirm('Wyczyścić CAŁY dziennik błędów HA (wszystkie integracje, nie tylko pompa)?')) this._hass.callService('system_log', 'clear', {}).then(() => { D.at = 0; this._diaRender(true); }); }
        else if (a === 'dtxt') {
          const txt = this._diaText();
          try {
            const u = URL.createObjectURL(new Blob([txt], { type: 'text/plain;charset=utf-8' })), ln = document.createElement('a');
            ln.href = u; ln.download = 'diagnostyka-' + this._diaStamp() + '.txt'; document.body.appendChild(ln); ln.click(); document.body.removeChild(ln); setTimeout(() => URL.revokeObjectURL(u), 5000);
            D.saveMsg = 'Pobrany plik diagnostyka-' + this._diaStamp() + '.txt (folder Pobrane).';
          } catch (e) { D.saveMsg = 'Pobieranie nie działa tutaj (' + this._errTxt(e) + '): użyj „Zapisz log w HA” albo „Kopiuj wszystko”.'; }
          this._diaRender(true);
        }
        else if (a === 'dsave') this._diaSave();
        else if (a === 'dall') { D.all = !D.all; this._diaRender(true); }
        else if (a === 'pkfix') this._pkFix();
        else if (a === 'pkfixr') this._pkFixRestart();
        else if (a === 'pkcopy') this._pkCopy();
        else if (a === 'more') this._more(t.getAttribute('data-e'));
      });
    }
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
    if (!N || !this._hass || (this._tabCur !== 'nau' && !this._autoAny())) return;
    if (!N.loading && (!N.res || Date.now() - N.at > 30 * 60000)) { this._nauLoad(); return; }
    if (N.srcLoaded && N.src && !N.src.initV119) {
      // jednorazowo: domyslne 5 min po wyjsciu (pomocnik HA startuje od 0)
      const a = this._hass.states['input_number.hp_cyrk_po_wyjsciu'];
      if (a) {
        if (Number(a.state) === 0) this._hass.callService('input_number', 'set_value', { entity_id: 'input_number.hp_cyrk_po_wyjsciu', value: 5 });
        N.src.initV119 = true; this._nauSrcSave();
      }
    }
    if (N.srcLoaded && N.src && !N.src.initV123) {
      // jednorazowo: domyslnie czekaj 30 min na tania strefe G12 (pomocnik HA startuje od 0)
      const a = this._hass.states[this._E.cwu_wait];
      if (a) {
        if (Number(a.state) === 0) this._hass.callService('input_number', 'set_value', { entity_id: this._E.cwu_wait, value: 30 });
        N.src.initV123 = true; this._nauSrcSave();
      }
    }
    if (N.srcLoaded && N.src && !N.src.initV127) {
      // v1.27: jednorazowo maks. czas luksusu (CO wstrzymane) = 60 min
      const a = this._hass.states[this._E.cwu_lux_max];
      if (a) {
        if (Number(a.state) === 0) this._hass.callService('input_number', 'set_value', { entity_id: this._E.cwu_lux_max, value: 60 });
        N.src.initV127 = true; this._nauSrcSave();
      }
    }
    // odswiez tylko linie "teraz" (obecnosc, temperatura zewn.)
    const st = this._hass.states, E = this._E, ids = this._nauPersons().concat([E.bt1, E.auto_cyrk, E.pl_cyrk, E.hwc_run, E.hwc_still, 'input_text.hp_obecnosc_encje', E.wstali, 'input_number.hp_cyrk_po_wyjsciu', E.auto_cwu, E.g12, E.g12_we, E.g12_tania, E.cwu_wait, E.hwmode, E.bt6, E.pl_cwu, E.cwu_boost, E.cwu_lux_max, E.tmp_lux, E.opmode, E.heat_ok, 'input_text.hp_pakiet_karta', 'sensor.hp_pakiet_wersja', E.cwu_tania, E.cwu_lux_on, E.cwu_poza, 'input_text.hp_energia_encja', 'input_text.hp_energia_kwh_encja', E.esp_stat, E.esp_cwu, E.esp_cyrk, E.esp_plan, E.cwu_plan]);
    const sig = ids.map((i) => (st[i] ? st[i].state : '?')).join('|') + '|' + Math.floor(Date.now() / 300000);
    // v1.25: wstrzymaj odswiezanie tylko przy pisaniu w polu (klikniety suwak ma focus i blokowal odswiezenie, przelacznik wygladal na martwy)
    const ae = this.shadowRoot && this.shadowRoot.activeElement;
    const busy = N.drag || (this._nauEl && ae && this._nauEl.contains(ae) && /^(INPUT|SELECT|TEXTAREA)$/.test(ae.tagName));
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
  // v1.37: dane dla zakresu z paska u gory (pomiar BT1 godzinowo, Open-Meteo symulacja i prognoza z dnia wczesniej)
  _nauRng() {
    const N = this._nau, R = this._rngDays(), key = R.from + ':' + R.to;
    const ok = N.rd && N.rd.key === key && Date.now() - N.rd.at < 30 * 60000;
    if (!ok && N.rdKey !== key) {
      N.rdKey = key;
      this._nauRngLoad(R).then((d) => { if (N.rdKey !== key) return; N.rd = { key, d, at: Date.now() }; N.rdKey = null; this._nauRender(); })
        .catch((e) => { if (N.rdKey !== key) return; N.rd = { key, d: { err: String(e && (e.message || e.code) || e), meas: {}, wx: {}, prev: null }, at: Date.now() }; N.rdKey = null; this._nauRender(); });
    }
    return N.rd && N.rd.key === key ? N.rd.d : null;
  }
  _omUrl(host, R, extra) {
    const c = this._nauCfg(), hc = this._hass.config || {};
    const lat = Number(c.lat !== undefined ? c.lat : hc.latitude), lon = Number(c.lon !== undefined ? c.lon : hc.longitude);
    if (!isFinite(lat) || !isFinite(lon)) throw new Error('brak położenia domu w HA');
    return 'https://' + host + '/v1/forecast?latitude=' + lat.toFixed(2) + '&longitude=' + lon.toFixed(2) + '&timeformat=unixtime&timezone=auto' + extra +
      '&start_date=' + this._rngIso(new Date(R[0])) + '&end_date=' + this._rngIso(new Date(R[1] - 1));
  }
  async _nauRngLoad(R) {
    const hass = this._hass, E = this._E, st = hass.states, now = Date.now(), errs = [];
    const inToday = R.to > now, wEnd = inToday ? Math.max(R.to, now + 2 * 864e5) : R.to;
    // pomiar BT1: wlasna historia pakietu (statystyki bez limitu) albo BT1 z recordera
    const ids = [E.t_out_hist, E.bt1].filter((i) => i && st[i]);
    const ss = await this._nauStats(ids, R.from), meas = {};
    ids.slice().reverse().forEach((id) => (ss[id] || []).forEach(([t, v]) => { const hk = Math.floor(t / 36e5) * 36e5; if (hk >= R.from && hk < R.to) meas[hk] = v; }));
    const bn = parseFloat((st[E.bt1] || {}).state); if (inToday && isFinite(bn)) meas[Math.floor(now / 36e5) * 36e5] = bn;
    // Open-Meteo: do ~90 dni wstecz zwykle API, starsze z archiwum prognoz
    const old = R.from < now - 88 * 864e5, wx = {};
    try {
      const r = await fetch(this._omUrl(old ? 'historical-forecast-api.open-meteo.com' : 'api.open-meteo.com', [R.from, wEnd], '&hourly=temperature_2m'));
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const H = (await r.json()).hourly || {};
      (H.time || []).forEach((t, i) => { const v = (H.temperature_2m || [])[i]; if (v !== null && v !== undefined && isFinite(v)) wx[t * 1000] = v; });
    } catch (e) { errs.push('Open-Meteo: ' + (e && e.message || e)); }
    let prev = null;
    try {
      const r = await fetch(this._omUrl('previous-runs-api.open-meteo.com', [R.from, Math.min(R.to, now + 864e5)], '&hourly=temperature_2m_previous_day1'));
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const H = (await r.json()).hourly || {}; prev = {};
      (H.time || []).forEach((t, i) => { const v = (H.temperature_2m_previous_day1 || [])[i]; if (v !== null && v !== undefined && isFinite(v)) prev[t * 1000] = v; });
    } catch (e) { errs.push('archiwum prognoz Open-Meteo: ' + (e && e.message || e)); }
    return { meas, wx, prev, errs, R, at: now };
  }
  // os czasu po dniach dla wykresow z zakresu
  _axDays(t0, t1, sx, Y0, Y1) {
    const DL = ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So'], d = new Date(t0); d.setHours(0, 0, 0, 0);
    const n = Math.max(1, Math.round((t1 - t0) / 864e5)), every = n <= 9 ? 1 : n <= 18 ? 2 : n <= 35 ? 4 : 7;
    let g = '', k = 0;
    for (; d.getTime() < t1; d.setDate(d.getDate() + 1), k++) {
      const x = sx(Math.max(t0, d.getTime()));
      if (d.getTime() >= t0) g += '<line x1="' + x.toFixed(1) + '" y1="' + Y0 + '" x2="' + x.toFixed(1) + '" y2="' + Y1 + '" stroke="rgba(255,255,255,.07)"/>';
      if (k % every) continue;
      const lab = n === 1 ? '' : n <= 9 ? DL[d.getDay()] + ' ' + d.getDate() + '.' + (d.getMonth() + 1) : d.getDate() + '.' + String(d.getMonth() + 1).padStart(2, '0');
      if (lab) g += '<text x="' + (x + 3).toFixed(1) + '" y="' + (Y1 + 15) + '" text-anchor="start">' + lab + '</text>';
    }
    if (n === 1) for (let hh = 0; hh <= 24; hh += 3) { const x = sx(t0 + hh * 36e5); g += '<line x1="' + x.toFixed(1) + '" y1="' + Y0 + '" x2="' + x.toFixed(1) + '" y2="' + Y1 + '" stroke="rgba(255,255,255,.06)"/><text x="' + x.toFixed(1) + '" y="' + (Y1 + 15) + '" text-anchor="' + (hh === 24 ? 'end' : hh === 0 ? 'start' : 'middle') + '">' + String(hh).padStart(2, '0') + ':00</text>'; }
    return g;
  }
  _nauLine(sx, sy) {
    return (pts, col, dash, w) => { let out = '', seg = [];
      const flush = () => { if (seg.length > 1) out += '<polyline points="' + seg.join(' ') + '" fill="none" stroke="' + col + '" stroke-width="' + w + '"' + (dash ? ' stroke-dasharray="' + (dash === true ? '5 4' : dash) + '"' : '') + ' stroke-linejoin="round"/>'; seg = []; };
      pts.forEach((p, k) => { if (k && p[0] - pts[k - 1][0] > 3 * 36e5) flush(); seg.push(sx(p[0]).toFixed(1) + ',' + sy(p[1]).toFixed(1)); }); flush(); return out; };
  }
  _nauFcHtml() {
    const RG = this._rngDays(), D = this._nauRng(), now = Date.now();
    let h = '<div class="sec"><div class="st2">Prognoza temperatury vs rzeczywistość' + this._rngTag() + '<small> – prognoza Open-Meteo wydana dobę wcześniej na tle pomiaru pompy BT1</small></div>';
    if (!D) return h + '<div class="info">Wczytuję pomiar i prognozy dla zakresu…</div></div>';
    if (!D.prev) return h + '<div class="info">Brak archiwum prognoz Open-Meteo (' + (D.errs || []).join('; ') + ').</div></div>';
    const P = D.prev, M = D.meas, t0 = RG.from, t1 = Math.min(RG.to, now);
    if (t0 >= now) return h + '<div class="info">Zakres w przyszłości: nie ma jeszcze pomiaru do porównania. Prognozę na jutro widzisz na wykresie „Temperatura zewnętrzna” (linia prognozy za „teraz”).</div></div>';
    const pairs = Object.keys(P).map(Number).filter((t) => t >= t0 && t <= t1 && M[t] !== undefined).sort((a, b) => a - b).map((t) => [t, P[t], M[t]]);
    const sg = (v) => (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v).toFixed(1);
    if (pairs.length >= 3) {
      const err = pairs.map((p) => p[1] - p[2]);
      const mae = err.reduce((a, x) => a + Math.abs(x), 0) / err.length, bias = err.reduce((a, x) => a + x, 0) / err.length;
      const mx = err.reduce((a, x) => (Math.abs(x) > Math.abs(a) ? x : a), 0);
      const days = new Set(pairs.map((p) => new Date(p[0]).toDateString())).size;
      h += '<div class="kt"><div class="k"><span>Średni błąd prognozy</span><b>' + mae.toFixed(1) + ' °C</b><i>z ' + days + ' dni (' + pairs.length + ' h)</i></div>' +
        '<div class="k"><span>Prognoza średnio</span><b>' + sg(bias) + ' °C</b><i>' + (Math.abs(bias) < 0.3 ? 'bez wyraźnego przechyłu' : bias > 0 ? 'za ciepła względem czujnika pompy' : 'za zimna względem czujnika pompy') + '</i></div>' +
        '<div class="k"><span>Największa pomyłka</span><b>' + sg(mx) + ' °C</b><i>pojedyncza godzina</i></div></div>';
    } else h += '<div class="info">W tym zakresie za mało godzin z pomiarem pompy i prognozą (' + pairs.length + ' h), wykres poniżej bez statystyk.</div>';
    const fc = Object.keys(P).map(Number).filter((t) => t >= t0 && t <= t1).sort((a, b) => a - b).map((t) => [t, P[t]]);
    const ms = Object.keys(M).map(Number).filter((t) => t >= t0 && t <= t1).sort((a, b) => a - b).map((t) => [t, M[t]]);
    const all = fc.map((p) => p[1]).concat(ms.map((p) => p[1]));
    if (all.length > 1) {
      const lo = Math.floor((Math.min(...all) - 1) / 5) * 5, hi = Math.ceil((Math.max(...all) + 1) / 5) * 5, T1 = RG.to;
      const X0 = 46, X1 = 590, Y0 = 26, Y1 = 150, sx = (t) => X0 + (t - t0) / (T1 - t0) * (X1 - X0), sy = (v) => Y1 - (v - lo) / ((hi - lo) || 1) * (Y1 - Y0);
      let g = this._axDays(t0, T1, sx, Y0, Y1);
      for (let v = lo; v <= hi; v += 5) g += '<line x1="' + X0 + '" y1="' + sy(v) + '" x2="' + X1 + '" y2="' + sy(v) + '" stroke="rgba(255,255,255,.08)"/><text x="' + (X0 - 6) + '" y="' + (sy(v) + 4) + '" text-anchor="end">' + v + ' °C</text>';
      const line = this._nauLine(sx, sy);
      const leg = '<line x1="50" y1="10" x2="74" y2="10" stroke="#ffab1a" stroke-width="2.4"/><text x="80" y="14" fill="#e3e8ee">Rzeczywistość (pompa BT1)</text>' +
        '<line x1="250" y1="10" x2="274" y2="10" stroke="#c38fff" stroke-width="1.8" stroke-dasharray="5 4"/><text x="280" y="14" fill="#e3e8ee">Prognoza z dnia wcześniej</text>';
      const nx = now < T1 ? sx(now) : null;
      h += '<svg viewBox="0 0 600 170" style="width:100%;max-width:60em;height:auto;display:block;font-family:inherit"><g font-size="11" fill="#c8d0da">' + g + '</g><g font-size="12">' + leg + '</g>' + line(fc, '#c38fff', true, 1.8) + line(ms, '#ffab1a', false, 2.4) +
        (nx !== null ? '<line x1="' + nx.toFixed(1) + '" y1="' + Y0 + '" x2="' + nx.toFixed(1) + '" y2="' + Y1 + '" stroke="#ff5a4a" stroke-width="1.5"/>' : '') + '</svg>';
    } else h += '<div class="info">Brak danych w tym zakresie.</div>';
    return h + '<div class="wn">Błąd = prognoza − pomiar. Czujnik BT1 wisi na ścianie domu, więc stały przechył może też wynikać z miejsca czujnika (słońce, ściana), nie tylko z prognozy.' + ((D.errs || []).length ? ' Uwaga: ' + D.errs.join('; ') + '.' : '') + '</div></div>';
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
    try {
      const dw = Math.max(3, Math.min(30, Number(c.dni_cwu) || 14));
      res.cwu = await this._nauCwuLoad(now - dw * 864e5);
    } catch (e) { res.errs.push('CWU: ' + (e && e.message || e)); }
    try { res.day = await this._nauDayLoad(); } catch (e) { res.day = null; res.errs.push('Wykres doby: ' + (e && e.message || e)); }
    N.res = res; N.at = Date.now(); N.loading = false;
    const sn = this._nauSnap();
    if (N.cmpFrom && sn) { N.diff = this._nauDiff(N.cmpFrom, sn); N.cmpFrom = null; }
    N.base = sn;
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
      // pora wstawania: koniec wykrytego snu, osobno dni robocze (Pn-Pt) i weekend (So-Nd) wg dnia poranka
      wakeWd: nights.map((b) => [new Date(t0 + b[1] * SL).getDay(), mins(b[1])]).filter((x) => x[0] >= 1 && x[0] <= 5 && x[1] >= 240 && x[1] <= 720).map((x) => x[1]),
      wakeWe: nights.map((b) => [new Date(t0 + b[1] * SL).getDay(), mins(b[1])]).filter((x) => (x[0] === 0 || x[0] === 6) && x[1] >= 240 && x[1] <= 720).map((x) => x[1]),
      days: Math.floor((now - t0) / 864e5), pers, actN, noisy, defN, sleepFrom: circ(nights.map((b) => mins(b[0]))), sleepTo: circ(nights.map((b) => mins(b[1]))), nights: nights.length,
    };
  }
  async _nauSrcLoad() {
    const N = this._nau; let v = null;
    try { const r = await this._hass.callWS({ type: 'frontend/get_user_data', key: 'hkpc_nauka_zrodla' }); v = r && r.value; } catch (e) { v = null; }
    if (!v) { try { v = JSON.parse(localStorage.getItem('hkpc_nauka_zrodla') || 'null'); } catch (e) { v = null; } }
    N.src = v && typeof v === 'object' ? v : {};
    N.srcLoaded = true;
    try { this._obecPub(); } catch (e) { /* brak */ }
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
  _nauSnap() {
    const N = this._nau, R = N.res; if (!R) return null;
    return { at: N.at, prop: R.curve ? R.curve.prop.slice() : null, cur: R.curve ? R.curve.cur.slice() : null,
      blocks: R.cyrk ? JSON.parse(JSON.stringify(N.edit || this._nauBase(R.cyrk))) : null, wake: R.cyrk ? (() => { const w = this._nauWake(R.cyrk); return [w.wd.m, w.we.m, w.pre]; })() : null };
  }
  _nauDiff(a, b) {
    const out = [], f = (m) => this._schFmt(m), DL = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'];
    if (a.prop && b.prop) a.prop.forEach((v, k) => { const w = b.prop[k]; if (Math.abs(v - w) >= 0.05) out.push('Krzywa P' + (k + 1) + ': ' + (Math.round(v * 10) / 10) + ' → ' + (Math.round(w * 10) / 10) + ' °C'); });
    if (a.wake && b.wake) {
      if (a.wake[0] !== b.wake[0]) out.push('Wstawanie Pn–Pt: ' + f(a.wake[0]) + ' → ' + f(b.wake[0]));
      if (a.wake[1] !== b.wake[1]) out.push('Wstawanie So–Nd: ' + f(a.wake[1]) + ' → ' + f(b.wake[1]));
      if (a.wake[2] !== b.wake[2]) out.push('Przed wstaniem: ' + a.wake[2] + ' → ' + b.wake[2] + ' min');
    }
    const txt = (d) => (d && d.length ? d.map((x) => f(x.f) + '–' + f(x.t)).join(', ') : 'brak');
    if (a.blocks && b.blocks) for (let i = 0; i < 7; i++) { const x = txt(a.blocks[i]), y = txt(b.blocks[i]); if (x !== y) out.push('Cyrkulacja ' + DL[i] + ': ' + x + ' → ' + y); }
    return { list: out, old: a, at: a.at };
  }
  _nauRecalc() {
    const N = this._nau;
    if (N.cargs && N.res) { try { N.res.curve = this._nauCurve(...N.cargs); } catch (e) { /* brak */ } this._nauRender(); } else this._nauLoad();
  }
  _nauWake(Y) {
    // pora wstawania: reczna (HH:MM) albo Auto (mediana konca snu z historii), w weekend domyslnie ok. 8:00
    const N = this._nau, w = (N.src && N.src.wake) || {};
    const med = (a) => { const b = a.slice().sort((x, y) => x - y); return b.length ? Math.round(b[Math.floor(b.length / 2)] / 5) * 5 : null; };
    const aWd = Y ? med(Y.wakeWd || []) : null, aWe = Y ? med(Y.wakeWe || []) : null;
    const pick = (v, auto, def) => (v && /^\d{1,2}:\d{2}$/.test(v) ? { m: this._schMin(v), src: 'ręcznie' } : auto !== null ? { m: auto, src: 'auto z historii' } : { m: def, src: 'auto, brak historii: domyślnie' });
    const pre = Math.max(0, Math.min(120, Number(w.pre !== undefined ? w.pre : 20)));
    return { wd: pick(w.wd, aWd, 390), we: pick(w.we, aWe, 480), pre, on: w.on !== false, aWd, aWe, nWd: Y ? (Y.wakeWd || []).length : 0, nWe: Y ? (Y.wakeWe || []).length : 0 };
  }
  _nauSig() {
    const z = this._hass.states['input_text.hp_wstalismy_zrodlo'], v = z ? z.state : '';
    return v === 'woda' ? 'pobór ciepłej wody' : v === 'aktywnosc' ? 'aktywność w domu' : 'czujniki';
  }
  _nauSleepStart(Y) {
    // pora snu na kazdy dzien: pierwszy kwadrans po 18:00 z sen >= 50 %, albo po polnocy (nastepny dzien do 6:00)
    const out = [];
    for (let i = 0; i < 7; i++) {
      const ps = (Y.ps && Y.ps[i]) || [], nx = (Y.ps && Y.ps[(i + 1) % 7]) || [];
      let end = null, early = null;
      for (let k = 72; k < 96; k++) if (ps[k] !== null && ps[k] >= 0.5) { end = k * 15; break; }
      if (end === null) { for (let k = 0; k < 24; k++) if (nx[k] !== null && nx[k] >= 0.5) { end = 1440; early = k * 15; break; } }
      if (end === null) { const sf = Y.sleepFrom; if (sf !== null && sf >= 720) end = sf; else { end = 1440; early = sf !== null && sf < 360 ? sf : null; } }
      out.push({ end, early });
    }
    return out;
  }
  _nauBase(Y) {
    // v1.20: propozycja = od (wstanie - X min) do pory snu; obecnosc (wszyscy wyszli) wylacza na biezaco automatyzacja w HA
    const out = (Y.blocks || []).map((d) => (d ? JSON.parse(JSON.stringify(d)) : null));
    const W = this._nauWake(Y);
    if (!W.on) return out;
    const SS = this._nauSleepStart(Y);
    for (let i = 0; i < 7; i++) {
      const m = (i >= 5 ? W.we : W.wd).m;
      const f = Math.max(0, m - W.pre), t = Math.max(f + 15, Math.min(1440, SS[i].end));
      out[i] = this._schNorm((out[i] || []).concat([{ f, t }]));
      if (SS[i].early) { const j = (i + 1) % 7; out[j] = this._schNorm((out[j] || []).concat([{ f: 0, t: SS[i].early }])); }
    }
    return out;
  }

  _nauEdit() {
    const N = this._nau;
    if (!N.edit) N.edit = (N.res && N.res.cyrk) ? this._nauBase(N.res.cyrk) : [null, null, null, null, null, null, null];
    for (let k = 0; k < 7; k++) if (!N.edit[k]) N.edit[k] = [];
    return N.edit;
  }
  _nauOutHtml(C) {
    // v1.37: temp. zewnetrzna w zakresie z paska u gory; gdy zakres obejmuje dzis, doklejone 2 dni prognozy
    const RG = this._rngDays(), D = this._nauRng(), now = Date.now();
    let h = '<div class="sec"><div class="st2">Temperatura zewnętrzna: pomiar pompy i symulacja' + this._rngTag() + '<small> – do nauki idzie pomiar z pompy, Open-Meteo tylko tam, gdzie pomiaru brak' + (RG.to > now ? '; za „teraz” 2 dni prognozy' : '') + '.</small></div>';
    if (!D) return h + '<div class="info">Wczytuję pomiar i symulację dla zakresu…</div></div>';
    const t0 = RG.from, t1 = RG.to > now ? Math.max(RG.to, now + 48 * 36e5) : RG.to;
    const meas = Object.keys(D.meas).map(Number).filter((t) => t >= t0 && t <= Math.min(now, t1)).sort((a, b) => a - b).map((t) => [t, D.meas[t]]);
    const sim = Object.keys(D.wx).map(Number).filter((t) => t >= t0 && t <= t1).sort((a, b) => a - b).map((t) => [t, D.wx[t]]);
    const all = meas.concat(sim).map((p) => p[1]);
    if (!all.length) return h + '<div class="info">Brak pomiaru i symulacji w tym zakresie.' + ((D.errs || []).length ? ' ' + D.errs.join('; ') : '') + '</div></div>';
    const lo = Math.floor((Math.min(...all) - 1) / 5) * 5, hi = Math.ceil((Math.max(...all) + 1) / 5) * 5;
    const X0 = 46, X1 = 590, Y0 = 26, Y1 = 150;
    const sx = (t) => X0 + (t - t0) / (t1 - t0) * (X1 - X0), sy = (v) => Y1 - (v - lo) / ((hi - lo) || 1) * (Y1 - Y0);
    let g = this._axDays(t0, t1, sx, Y0, Y1);
    for (let v = lo; v <= hi; v += 5) g += '<line x1="' + X0 + '" y1="' + sy(v) + '" x2="' + X1 + '" y2="' + sy(v) + '" stroke="rgba(255,255,255,.08)"/><text x="' + (X0 - 6) + '" y="' + (sy(v) + 4) + '" text-anchor="end">' + v + ' °C</text>';
    const line = this._nauLine(sx, sy), nx = now >= t0 && now <= t1 ? sx(now) : null;
    const leg = '<line x1="50" y1="10" x2="74" y2="10" stroke="#ffab1a" stroke-width="2.4"/><text x="80" y="14" fill="#e3e8ee">Pomiar pompy (BT1)</text>' +
      '<line x1="230" y1="10" x2="254" y2="10" stroke="#8fb8ff" stroke-width="1.8" stroke-dasharray="5 4"/><text x="260" y="14" fill="#e3e8ee">Symulacja Open-Meteo (było / będzie)</text>';
    return h + '<svg viewBox="0 0 600 170" style="width:100%;max-width:60em;height:auto;display:block;font-family:inherit"><g font-size="11" fill="#c8d0da">' + g + '</g><g font-size="12">' + leg + '</g>' +
      (nx !== null ? '<rect x="' + nx + '" y="' + Y0 + '" width="' + (X1 - nx) + '" height="' + (Y1 - Y0) + '" fill="rgba(143,184,255,.06)"/>' : '') +
      line(sim, '#8fb8ff', true, 1.8) + line(meas, '#ffab1a', false, 2.4) +
      (nx !== null ? '<line x1="' + nx + '" y1="' + Y0 + '" x2="' + nx + '" y2="' + Y1 + '" stroke="#ff5a4a" stroke-width="1.5"/><text x="' + nx + '" y="' + (Y0 - 3) + '" text-anchor="middle" font-size="11" fill="#ff8a80">teraz</text>' : '') + '</svg>' +
      '<div class="wn">Godzin z pomiarem pompy w zakresie: ' + meas.length + '. Własna historia z pompy: ' + (C && C.ownHist ? 'sensor.hp_temperatura_zewnetrzna_bt1 (statystyki bez limitu dni)' : 'brak sensor.hp_temperatura_zewnetrzna_bt1 (dodaj pakiet), starsze dni tylko z recordera') + '.' + ((D.errs || []).length ? ' Uwaga: ' + D.errs.join('; ') + '.' : '') + '</div></div>';
  }
  _nauCyrkHtml(Y, esc, fmt) {
    const hass = this._hass, st = hass.states, E = this._E, N = this._nau;
    let h = '<div class="sec"><div class="st2">Cyrkulacja CWU: harmonogram z obecności (Pn–Nd)</div>';
    // --- automatyzacja + stan teraz ---
    const au = st[E.auto_cyrk], auOn = au && au.state === 'on';
    const run = parseFloat((st[E.hwc_run] || {}).state), still = parseFloat((st[E.hwc_still] || {}).state);
    const isOn = !isNaN(run) && !(run <= 1 && still >= 60);
    const OB = this._obecStan(), ktos = OB.n > 0;   // v1.42: tylko wskazane osoby
    const pers = OB.ids, homeN = OB.n;
    const inWin = st[E.pl_cyrk] && st[E.pl_cyrk].state === 'on';
    const now = new Date(), wd = (now.getDay() + 6) % 7, slot = now.getHours() * 4 + Math.floor(now.getMinutes() / 15);
    const sleepNow = Y && Y.ps[wd] && Y.ps[wd][slot] !== null && Y.ps[wd][slot] >= 0.5;
    const wsS = st[E.wstali], wsD = wsS ? new Date(String(wsS.state).replace(' ', 'T')) : null;
    const rano = wsD && !isNaN(wsD) && (now.getDay() === 0 || now.getDay() === 6) && now - wsD >= 0 && wsD.toDateString() === now.toDateString() && now.getHours() < 12;
    const wy = this._hwcWymus();
    let why;
    if (wy) why = 'wymuszona ręcznie z karty do ' + new Date(wy * 1000).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }) + ' (automatyzacja w tym czasie nic nie zmienia)';
    else if (!auOn) why = 'automatyzacja wyłączona, cyrkulacją sterujesz ręcznie albo przez harmonogram na głównej';
    else if (OB.none) why = 'nie wskazałeś osób w Źródłach nauki → Obecność: HA nie przełącza cyrkulacji wg obecności';
    else if (OB.unav) why = 'wskazane osoby / telefony są niedostępne: HA nic nie zmienia';
    else if (!ktos) why = 'pusty dom (nikogo ze wskazanych w domu), po ' + (st['input_number.hp_cyrk_po_wyjsciu'] ? Math.round(Number(st['input_number.hp_cyrk_po_wyjsciu'].state)) : 10) + ' min cyrkulacja się wyłącza';
    else if (inWin) why = 'ktoś jest w domu i trwa okno harmonogramu';
    else if (rano) why = 'weekend: wstaliście o ' + wsD.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }) + ' (sygnał: ' + this._nauSig() + ')';
    else if (sleepNow) why = 'pora snu (poza oknem harmonogramu)';
    else why = 'ktoś jest, ale teraz nie ma okna w harmonogramie';
    h += '<div class="lh"><button class="tg' + (auOn ? ' on' : '') + '" data-a="auto"' + (au ? '' : ' disabled') + ' title="Automatyzacja cyrkulacji"><i></i></button><b>Automatyzacja cyrkulacji: ' + (au ? (auOn ? 'włączona' : 'wyłączona') : 'brak') + '</b>' +
      '<span>Teraz: <b style="color:' + (isOn ? '#7ee04a' : '#b0bac5') + '">' + (isNaN(run) ? '–' : isOn ? 'pracuje' : 'wyłączona') + '</b>' + (isNaN(run) ? '' : ' (praca ' + run + ' min / postój ' + still + ' min)') + ' · powód: ' + esc(why) + '</span></div>';
    { // v1.35: plan liczony w HA (automatyzacja hp_cyrk_przelicz), dziala bez otwartej karty
      const pl = st[E.cyrk_plan], pa = st[E.cyrk_plan_at], ok = pl && /^[0-9a-f]{168}$/.test(pl.state);
      const pd = pa ? new Date(String(pa.state).replace(' ', 'T')) : null;
      h += '<div class="wn" style="margin:-.3em 0 .8em">' + (!pl ? 'Brak <code>' + E.cyrk_plan + '</code>: wklej / zainstaluj pakiet ' + PKG_VER + ', wtedy HA sam przelicza plan cyrkulacji bez otwierania karty.'
        : ok ? 'Plan cyrkulacji liczy HA sam (bez otwartej karty): po wykrytym śnie i wstaniu, po zmianie ustawień tutaj i raz na dobę (wyjście / powrót telefonów automatyzacja obsługuje na bieżąco). Ostatnio przeliczony: <b>' + (pd && !isNaN(pd) ? pd.toLocaleString('pl-PL', { weekday: 'short', hour: '2-digit', minute: '2-digit' }) : '–') + '</b>.'
        : 'Plan w HA jeszcze nie policzony: policzy się po włączeniu automatyzacji cyrkulacji (karta wysyła model z Nauki).') + '</div>';
    }
    if (!au) h += '<div class="info">Brak przełącznika <code>' + E.auto_cyrk + '</code>. Dodaj pakiet <code>packages/hydrolution_karta.yaml</code> z wersji v1.15 i przeładuj konfigurację HA.</div>';
    const pwy = st['input_number.hp_cyrk_po_wyjsciu'], pwyV = pwy ? Math.round(Number(pwy.state)) : 5;
    h += '<div class="lh wk"><label>Po wyjściu wszystkich wyłącz po <input type="number" min="0" max="60" step="1" data-a="pwy" value="' + pwyV + '"' + (pwy ? '' : ' disabled') + '> min</label>' + (pwy ? '' : '<span class="ds">brak <code>input_number.hp_cyrk_po_wyjsciu</code>: wklej pakiet v1.19 (do tego czasu 10 min)</span>') + '</div>';
    const wmn = st[E.cyrk_wymus_min], wmnV = wmn ? Math.round(Number(wmn.state)) : 60;
    h += '<div class="lh wk"><label>Klik w pompkę na głównej włącza cyrkulację na <input type="number" min="15" max="240" step="15" data-a="wmn" value="' + wmnV + '"' + (wmn ? '' : ' disabled') + '> min</label><span class="ds">' + (wmn && st[E.cyrk_wymus] ? 'tyle chodzi bez przerwy, automatyzacja tego nie nadpisuje; drugi klik wyłącza' : 'brak <code>' + E.cyrk_wymus_min + '</code>: wklej pakiet ' + PKG_VER + ' (do tego czasu klik działa jak wcześniej i automatyzacja może go nadpisać)') + '</span></div>';
    if (au) h += '<div class="wn" style="margin:-.3em 0 .8em">Włączona: harmonogram „Cyrkulacja CWU” z głównej zakładki + obecność telefonów. Od wstania do snu chodzi cały czas, dopóki ktoś jest w domu. Wszyscy wyszli (' + pwyV + ' min) = wyłączona, ktoś wrócił = od razu włączona, sen = wyłączona (okno kończy się o porze snu). Zastępuje wtedy przełącznik „Aktywne” cyrkulacji z harmonogramu.</div>';
    if (!Y) return h + '<div class="info">Brak danych obecności (encje person.* z telefonami).</div></div>';
    h += '<div class="lh"><span>W domu: <b>' + homeN + ' z ' + pers.length + '</b> (' + pers.map((i) => esc(((st[i] && st[i].attributes.friendly_name) || i) + ': ' + (st[i] ? (st[i].state === 'home' ? 'w domu' : st[i].state === 'not_home' ? 'poza' : st[i].state) : '?'))).join(', ') + ')</span>' +
      '<span class="ds">Sen: ' + (Y.actN ? 'wykryty z ' + Y.nights + ' nocy' + (Y.sleepFrom !== null ? ', zwykle ok. ' + fmt(Y.sleepFrom) + '–' + fmt(Y.sleepTo) : '') + (Y.defN ? '; ' + Y.defN + ' nocy bez wyraźnego snu: przyjęte 23:00–6:00' : '') : 'brak encji aktywności, przyjęty 23:00–6:00') +
      (Y.noisy && Y.noisy.length ? '. Pominięte encje zmieniające się co noc: ' + Y.noisy.length : '') + '.</span></div>';
    const DL = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'], days = this._schDays();
    const W = this._nauWake(Y);
    const bl = N.edit || this._nauBase(Y);
    const wOpt = (k, lab, cur, auto) => '<label>' + lab + ' <select data-a="wk" data-k="' + k + '"><option value="auto"' + (cur ? '' : ' selected') + '>Auto</option><option value="man"' + (cur ? ' selected' : '') + '>Ręcznie</option></select>' +
      (cur ? ' <input type="time" data-a="wt" data-k="' + k + '" value="' + esc(cur) + '">' : ' <b>' + fmt((k === 'wd' ? W.wd : W.we).m) + '</b>') + '</label>';
    const ws = (N.src && N.src.wake) || {};
    const wsToday = wsD && !isNaN(wsD) && wsD.toDateString() === new Date().toDateString();
    h += '<div class="lh wk"><b>Pora wstawania</b>' + wOpt('wd', 'Pn–Pt (stała):', ws.wd, W.aWd) + wOpt('we', 'So–Nd (sugestia):', ws.we, W.aWe) +
      '<label>cyrkulacja <input type="number" min="0" max="120" step="5" data-a="wp" value="' + W.pre + '"> min przed</label>' +
      '<label><input type="checkbox" data-a="won"' + (W.on ? ' checked' : '') + '> dodaj do propozycji</label>' +
      '<span class="ds">Auto: Pn–Pt ' + (W.aWd !== null ? fmt(W.aWd) + ' (z ' + W.nWd + ' poranków)' : 'brak historii, przyjęte 6:30') + ', So–Nd ' + (W.aWe !== null ? fmt(W.aWe) + ' (z ' + W.nWe + ' poranków)' : 'brak historii, przyjęte 8:00') + '. Okno cyrkulacji: od ' + W.pre + ' min przed wstaniem aż do pory snu. W tym czasie cyrkulacja chodzi cały czas, dopóki ktoś jest w domu; gdy wszyscy wyjdą, wyłącza się po czasie „po wyjściu” (automatyzacja), po powrocie wraca. Wstanie = koniec wykrytego snu (telefony + aktywność). W weekend godzina to tylko sugestia: przy włączonej automatyzacji cyrkulacja rusza od pierwszego sygnału rano (pobór ciepłej wody: szybki spadek BT6 w zasobniku, albo aktywność: światła, ruch, ekran telefonu, media; 5:00–11:00) i chodzi, dopóki ktoś jest w domu, a bez sygnału zostaje okno z sugestii.' +
      (wsS ? ' Weekend, ostatnio wstaliście: <b>' + (wsToday ? 'dziś ' + wsD.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }) : (isNaN(wsD) || wsD.getFullYear() < 2000 ? '–' : wsD.toLocaleString('pl-PL', { weekday: 'short', hour: '2-digit', minute: '2-digit' }))) + '</b> (sygnał: ' + esc(this._nauSig()) + ').' : ' Brak <code>' + E.wstali + '</code>: dodaj pakiet v1.18.') + (N.edit ? ' Masz ręczne poprawki okien: zmiana pory wstawania zadziała po „Przywróć propozycję”.' : '') + '</span></div>';
    const S = this._sch, main = S && S.data && S.data.cyrk ? this._schFromItem(S.data.cyrk) : null;
    const grad = (arr, rgb, mx) => 'linear-gradient(90deg,' + arr.map((v, k) => { const c = 'rgba(' + rgb + ',' + (v === null ? 0 : (v * mx).toFixed(2)) + ')'; return c + ' ' + (k / 96 * 100).toFixed(2) + '%,' + c + ' ' + ((k + 1) / 96 * 100).toFixed(2) + '%'; }).join(',') + ')';
    h += '<div class="hr">' + [0, 3, 6, 9, 12, 15, 18, 21, 24].map((x) => '<span style="left:' + (x / 24 * 100) + '%">' + x + '</span>').join('') + '</div>';
    DL.forEach((dn, i) => {
      h += '<div class="dr"><span class="dn' + (i === wd ? ' td' : '') + '">' + dn + '</span><div class="tl ne" data-d="' + i + '" style="--c:#43c25a;--c2:#2a8a3c">' +
        '<div class="lay" style="background:' + grad(Y.ph[i], '67,194,90', 0.45) + '"></div><div class="lay" style="background:' + grad(Y.ps[i], '90,120,255', 0.6) + '"></div>';
      if (N.diff && N.diff.old.blocks && N.diff.old.blocks[i]) N.diff.old.blocks[i].forEach((b) => { h += '<div class="ob" style="left:' + (b.f / 14.4) + '%;width:' + ((b.t - b.f) / 14.4) + '%"></div>'; });
      if (main) main[days[i]].forEach((b) => { h += '<div class="mn" style="left:' + (b.f / 14.4) + '%;width:' + ((b.t - b.f) / 14.4) + '%"></div>'; });
      if (bl[i]) bl[i].forEach((b, j) => { const sel = N.sel && N.sel.i === i && N.sel.j === j; h += '<div class="bk pr2' + (sel ? ' sel' : '') + '" data-a="nbk" data-d="' + i + '" data-i="' + j + '" style="left:' + (b.f / 14.4) + '%;width:' + ((b.t - b.f) / 14.4) + '%">' + fmt(b.f) + '–' + fmt(b.t) + '</div>'; });
      else h += '<div class="nd">za mało danych (przeciągnij, żeby dodać)</div>';
      if (W.on) { const wm = (i >= 5 ? W.we : W.wd).m; h += '<div class="wu" style="left:' + (wm / 14.4) + '%" title="wstajemy ' + fmt(wm) + '"><span>⏰ ' + fmt(wm) + '</span></div>'; }
      if (i === wd) h += '<div class="nw" style="left:' + (slot * 15 / 14.4 + (now.getMinutes() % 15) / 14.4) + '%"></div>';
      h += '</div><button class="cp" data-a="ncp" data-d="' + i + '" title="Skopiuj ten dzień na wszystkie dni">⧉</button></div>';
    });
    if (N.sel && bl[N.sel.i] && bl[N.sel.i][N.sel.j]) {
      const b = bl[N.sel.i][N.sel.j];
      h += '<div class="ed">Okno <b>' + DL[N.sel.i] + '</b>: od <input type="time" data-a="ntf" value="' + fmt(b.f) + '"> do <input type="time" data-a="ntt" value="' + fmt(b.t) + '"> <button data-a="ndel">Usuń okno</button><span style="opacity:.6">(koniec 00:00 = do północy)</span></div>';
    }
    h += '<div class="lg"><span><i style="background:rgba(67,194,90,.45)"></i>ktoś w domu (im mocniej, tym częściej)</span><span><i style="background:rgba(90,120,255,.6)"></i>sen</span><span><i class="pb"></i>okna do wysłania' + (N.edit ? ' (poprawione ręcznie)' : ' (propozycja)') + '</span><span><i style="background:#ffd54f;height:.25em"></i>obecny harmonogram na głównej</span><span><i style="background:#ff5a4a;width:2px"></i>teraz</span><span><i style="background:#ffb300;width:2px"></i>wstajemy</span></div>';
    h += '<div class="ft"><span class="hint">Przeciągnij po osi, żeby dodać okno, kliknij okno, żeby zmienić godziny albo usunąć, ⧉ kopiuje dzień. „Wyślij na główną” wpisze okna do harmonogramu Cyrkulacja CWU (zapisujesz tam „Zapisz harmonogram”).</span>' +
      (N.edit ? '<button data-a="nrst">Przywróć propozycję</button>' : '') + '<button class="sv" data-a="send">Wyślij na główną</button></div>';
    h += this._nauHistRows('cyrk', bl, esc);
    return h + '</div>';
  }
  _nauSend() {
    const N = this._nau, r = N.res && N.res.cyrk;
    if (!r) return;
    const S = this._sch, lane = this._schLanes().find((l) => l.k === 'cyrk');
    if (this._schAuto(lane)) { S.lane = 'cyrk'; this._tab('sch', true); this._schRender(); return; }
    const dr = this._schDraft(lane);
    let n = 0;
    const bl = N.edit || this._nauBase(r);
    this._schDays().forEach((d, i) => { if (bl[i]) { dr[d] = this._schNorm(JSON.parse(JSON.stringify(bl[i]))); n++; } });
    S.dirty.cyrk = true; S.lane = 'cyrk'; S.sel = null;
    S.note = { k: 'cyrk', t: 'Wpisano propozycję z zakładki Nauka (' + n + ' z 7 dni). Sprawdź i kliknij „Zapisz harmonogram”, albo „Cofnij zmiany”. Przełącznik Aktywne nie był ruszany.' };
    this._tab('sch', true);
    this._schRender();
    if (this._schEl.scrollIntoView) this._schEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  // ====================== v1.23: CWU wg taryfy G12 ======================
  _g12Parse(txt) {
    const out = [];
    String(txt || '').split(',').forEach((z) => {
      const m = /^\s*(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})\s*$/.exec(z);
      if (!m) return;
      const f = Number(m[1]) * 60 + Number(m[2]), t = Number(m[3]) * 60 + Number(m[4]);
      if (f <= 1440 && t <= 1440 && f !== t) out.push({ f, t });
    });
    return out;
  }
  _g12() {
    const st = this._hass.states, E = this._E, s = st[E.g12];
    let txt = s && s.state && s.state !== 'unknown' && s.state !== 'unavailable' ? s.state : '';
    let z = this._g12Parse(txt);
    if (!z.length) { txt = '22:00-06:00,13:00-15:00'; z = this._g12Parse(txt); }
    const we = !!(st[E.g12_we] && st[E.g12_we].state === 'on');
    const day = [];
    for (let i = 0; i < 7; i++) {
      let b = [];
      if (we && i >= 5) b = [{ f: 0, t: 1440 }];
      else z.forEach((x) => { if (x.f < x.t) b.push({ f: x.f, t: x.t }); else { b.push({ f: x.f, t: 1440 }); b.push({ f: 0, t: x.t }); } });
      day.push(this._schNorm(b));
    }
    return { txt, z, we, day };
  }
  async _nauCwuLoad(startMs) {
    const hass = this._hass, E = this._E, now = Date.now();
    if (!hass.states[E.bt6]) throw new Error('brak czujnika ' + E.bt6);
    const ids = [E.bt6].concat(hass.states[E.cpr_cwu] ? [E.cpr_cwu] : []);
    const r = (await hass.callApi('GET', 'history/period/' + new Date(startMs).toISOString() + '?filter_entity_id=' + ids.join(',') +
      '&end_time=' + encodeURIComponent(new Date(now).toISOString()) + '&minimal_response&no_attributes')) || [];
    const by = {}; r.forEach((a) => { if (a && a.length) by[a[0].entity_id] = a; });
    const pts = (by[E.bt6] || []).map((p) => [Date.parse(p.last_changed || p.last_updated), parseFloat(p.state)]).filter((p) => !isNaN(p[0]) && isFinite(p[1])).sort((x, y) => x[0] - y[0]);
    if (pts.length < 20) throw new Error('za mało historii temperatury CWU (BT6)');
    const use = [], cnt = [0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 7; i++) use.push(new Array(96).fill(0));
    const t0 = pts[0][0], seen = {};
    const dd0 = new Date(t0); dd0.setHours(0, 0, 0, 0);
    for (let d = dd0; d.getTime() < now; d.setDate(d.getDate() + 1)) { const k = d.toDateString(); if (!seen[k]) { seen[k] = 1; cnt[(d.getDay() + 6) % 7]++; } }
    let tot = 0;
    for (let k = 1; k < pts.length; k++) {
      const [ta, va] = pts[k - 1], [tb, vb] = pts[k], dt = (tb - ta) / 60000, dv = va - vb;
      if (dv <= 0 || dt <= 0 || dt > 30) continue;
      // pobor wody = szybki spadek (straty postojowe to ok. 0,01 °C/min)
      if (dv / dt < 0.03 && !(dv >= 0.5 && dt <= 10)) continue;
      const d = new Date(tb), wd = (d.getDay() + 6) % 7, sl = d.getHours() * 4 + Math.floor(d.getMinutes() / 15);
      use[wd][sl] += dv; tot += dv;
    }
    for (let i = 0; i < 7; i++) for (let k = 0; k < 96; k++) use[i][k] = cnt[i] ? use[i][k] / cnt[i] : 0;
    const runs = [];
    let on = null;
    (by[E.cpr_cwu] || []).forEach((p) => { const t = Date.parse(p.last_changed || p.last_updated); if (isNaN(t)) return; if (p.state === 'on' && on === null) on = t; else if (p.state !== 'on' && on !== null) { runs.push([on, t]); on = null; } });
    if (on !== null) runs.push([on, now]);
    const days = Object.keys(seen).length;
    return { use, cnt, runs, days, perDay: days ? tot / days : 0, start: t0, hasRuns: !!by[E.cpr_cwu] };
  }
  _nauCwuPlan(R) {
    // tanie strefy jako ciagle odcinki w tygodniu (minuty od Pn 0:00); grzej w strefie, po ktorej do nastepnej taniej jest zuzycie >= prog
    const G = this._g12(), N = this._nau, prog = N.src && isFinite(Number(N.src.cwuProg)) && N.src.cwuProg !== undefined ? Number(N.src.cwuProg) : 0.5;
    const W = 7 * 1440, mark = new Uint8Array(W / 15);
    G.day.forEach((bl, i) => bl.forEach((b) => { for (let m = b.f; m < b.t; m += 15) mark[(i * 1440 + m) / 15] = 1; }));
    const n = mark.length, segs = [];
    if (mark.every((x) => x)) segs.push({ a: 0, b: n, after: 0, inc: true });
    else {
      let s0 = 0; while (mark[s0]) s0++;
      for (let k = 0, i = s0; k < n; k++, i = (i + 1) % n) {
        if (mark[i] && !mark[(i - 1 + n) % n]) { let j = i; while (mark[j % n] && j - i < n) j++; segs.push({ a: i, b: j }); }
      }
      // v1.25: za malo historii (< 7 dni) = grzej we wszystkich tanich strefach
      const has = R && R.use && R.perDay > 0.05 && R.days >= 7 && R.cnt.every((x) => x > 0);
      segs.forEach((s, k) => {
        const nx = segs[(k + 1) % segs.length]; let after = 0;
        const st0 = s.b % n, end = nx.a >= st0 ? nx.a : nx.a + n;
        for (let j = st0; j < end; j++) { const q = j % n; after += R && R.use ? R.use[Math.floor(q / 96)][q % 96] : 0; }
        s.after = after; s.inc = !has || after >= prog;
      });
      // co najmniej jeden odcinek na dobe: ten z najwiekszym zuzyciem po nim
      if (has) for (let d = 0; d < 7; d++) {
        const mine = segs.filter((s) => Math.floor((s.a % n) / 96) === d);
        if (mine.length && !mine.some((s) => s.inc)) mine.reduce((x, y) => (y.after > x.after || (y.after === x.after && y.b - y.a > x.b - x.a) ? y : x)).inc = true;
      }
    }
    const blocks = []; for (let i = 0; i < 7; i++) blocks.push([]);
    segs.filter((s) => s.inc).forEach((s) => { for (let j = s.a; j < s.b; j++) { const q = j % n, d = Math.floor(q / 96), m = (q % 96) * 15; blocks[d].push({ f: m, t: m + 15 }); } });
    for (let i = 0; i < 7; i++) blocks[i] = this._schNorm(blocks[i]);
    return { blocks, segs, prog, G };
  }
  _nauCwuHtml(R, esc, fmt) {
    const st = this._hass.states, E = this._E, N = this._nau;
    let h = '<div class="sec"><div class="st2">CWU: grzanie wody w taniej taryfie G12 (Pn–Nd)</div>';
    const au = st[E.auto_cwu], auOn = au && au.state === 'on';
    const P = this._nauCwuPlan(R), G = P.G;
    const now = new Date(), wd = (now.getDay() + 6) % 7, nm = now.getHours() * 60 + now.getMinutes();
    const cheapNow = st[E.g12_tania] ? st[E.g12_tania].state === 'on' : G.day[wd].some((b) => b.f <= nm && nm < b.t);
    const doT = st[E.g12_do] ? parseFloat(st[E.g12_do].state) : NaN;
    const wait = st[E.cwu_wait] ? Math.round(Number(st[E.cwu_wait].state)) : 30;
    const plOn = st[E.pl_cwu] && st[E.pl_cwu].state === 'on';
    const ne = st[E.pl_cwu] && st[E.pl_cwu].attributes && st[E.pl_cwu].attributes.next_event;
    const toWin = plOn ? 0 : (ne ? Math.round((new Date(ne) - now) / 60000) : (isNaN(doT) ? null : doT));
    const mode = st[E.hwmode] ? st[E.hwmode].state : '–';
    // v1.31: tryb CWU w taniej strefie (domyslnie Ekonomiczny) i w drogiej (domyslnie Normalny); luksus jednorazowy w taniej = osobna opcja, domyslnie wylaczona
    const okS = (x) => x && x.state && x.state !== 'unknown' && x.state !== 'unavailable';
    const sT = st[E.cwu_tania], sP = st[E.cwu_poza], sL = st[E.cwu_lux_on];
    const tt = okS(sT) ? sT.state : 'Ekonomiczny', tp = okS(sP) ? sP.state : 'Normalny', luxOn = !!(sL && sL.state === 'on');
    const MODES = ['Ekonomiczny', 'Normalny', 'Luksus', 'Smart'];
    const sel = (a, s0, cur) => '<select data-a="' + a + '"' + (s0 ? '' : ' disabled') + '>' + ((s0 && s0.attributes && s0.attributes.options) || MODES).map((o) => '<option' + (o === cur ? ' selected' : '') + '>' + esc(o) + '</option>').join('') + '</select>';
    const bs = st[E.cwu_boost], boost = bs && bs.state && bs.state !== 'unknown' && bs.state !== 'unavailable' ? bs.state : '';
    const lm = st[E.cwu_lux_max], luxMax = lm ? Math.round(Number(lm.state)) || 60 : 60;
    const bMin = boost && bs.last_changed ? Math.round((now - new Date(bs.last_changed)) / 60000) : 0;
    const tl = st[E.tmp_lux] ? st[E.tmp_lux].state : '–', om = st[E.opmode] ? st[E.opmode].state : '–', ho = st[E.heat_ok] ? st[E.heat_ok].state : '–';
    let why;
    if (boost) why = 'luksus jednorazowy (' + (boost === 'auto' ? 'automat' : 'przycisk CWU') + '), CO wstrzymane od ' + bMin + ' min, max ' + luxMax + ' min; potem Auto';
    else if (!auOn) why = 'automatyzacja wyłączona, trybem CWU sterujesz ręcznie albo harmonogramem „Tryb CWU” na głównej';
    else if (plOn) why = 'okno w taniej strefie: ' + tt + (luxOn ? ', a gdy BT7 poniżej celu luksusu: luksus jednorazowy (CO wstrzymane do zagrzania, max ' + luxMax + ' min)' : '');
    else if (toWin !== null && toWin <= wait) why = 'do okna w taniej strefie zostało ' + toWin + ' min (≤ ' + wait + '): Ekonomiczny, czekam';
    else why = 'droga strefa: ' + tp + ' (dogrzeje tylko, gdy woda spadnie poniżej progu trybu ' + tp + ')';
    const bt6 = parseFloat((st[E.bt6] || {}).state), bt7 = parseFloat((st[E.bt7] || {}).state);
    h += '<div class="lh"><button class="tg' + (auOn ? ' on' : '') + '" data-a="autocwu"' + (au ? '' : ' disabled') + ' title="Automatyzacja CWU"><i></i></button><b>Automatyzacja CWU: ' + (au ? (auOn ? 'włączona' : 'wyłączona') : 'brak') + '</b>' +
      '<span>Teraz: <b style="color:' + (cheapNow ? '#7ee04a' : '#ffb74d') + '">' + (cheapNow ? 'tania strefa' : 'droga strefa') + '</b>' + (!cheapNow && !isNaN(doT) && doT < 9999 ? ' (tania za ' + (doT >= 60 ? Math.floor(doT / 60) + ' h ' : '') + Math.round(doT % 60) + ' min)' : '') +
      ' · tryb CWU: <b>' + esc(mode) + '</b> · woda BT6 ' + (isNaN(bt6) ? '–' : bt6.toFixed(1) + ' °C') + ', BT7 ' + (isNaN(bt7) ? '–' : bt7.toFixed(1) + ' °C') + ' · powód: ' + esc(why) + '</span>' +
      '<span class="ds">Tryb pracy: <b>' + esc(om) + '</b> · ogrzewanie CO: <b>' + (ho === 'on' ? 'dozwolone' : ho === 'off' ? 'wstrzymane' : esc(ho)) + '</b> · podgrzanie jednorazowe: <b>' + esc(tl) + '</b>' + (boost ? ' · <b style="color:#ffb74d">LUKSUS JEDNORAZOWY trwa ' + bMin + ' / ' + luxMax + ' min</b>' : '') + '</span></div>';
    h += this._schNowHtml(this._schLanes().find((x) => x.k === 'cwu'), esc);   // v1.40: z Harmonogramu
    h += '<div class="lh wk"><label>Tanie strefy G12: <input class="g12" type="text" data-a="g12" value="' + esc(G.txt) + '"' + (st[E.g12] ? '' : ' disabled') + '></label>' +
      '<label><input type="checkbox" data-a="g12we"' + (G.we ? ' checked' : '') + (st[E.g12_we] ? '' : ' disabled') + '> So–Nd cała doba tania</label>' +
      '<label>czekaj na tanią, gdy zostało ≤ <input type="number" min="0" max="180" step="5" data-a="cwait" value="' + wait + '"' + (st[E.cwu_wait] ? '' : ' disabled') + '> min</label>' +
      '<label>tryb w taniej strefie ' + sel('ctania', sT, tt) + '</label>' +
      '<label>tryb w drogiej strefie ' + sel('cpoza', sP, tp) + '</label>' +
      '<label><input type="checkbox" data-a="cluxon"' + (luxOn ? ' checked' : '') + (sL ? '' : ' disabled') + '> luksus jednorazowy w taniej (CO wstrzymane)</label>' +
      '<label>maks. czas luksusu (CO wstrzymane) <input type="number" min="15" max="240" step="5" data-a="cluxmax" value="' + luxMax + '"' + (lm && luxOn ? '' : ' disabled') + '> min</label>' +
      '<label>grzej w strefie, gdy potem zużycie ≥ <input type="number" min="0" max="20" step="0.1" data-a="cprog" value="' + P.prog + '"> °C</label>' +
      '<span class="ds">PGE G12 standard: tanio 22:00–6:00 i 13:00–15:00 codziennie, cały rok (format: 22:00-06:00,13:00-15:00). Logika automatyzacji (v1.31): w taniej strefie tryb CWU „' + esc(tt) + '”, w drogiej „' + esc(tp) + '”, a gdy do taniej zostało ≤ ' + wait + ' min, ustawia „Ekonomiczny” i czeka. ' +
      (luxOn ? 'Luksus jednorazowy w taniej WŁĄCZONY: na wejściu w okno (tania strefa), gdy BT7 jest poniżej celu luksusu: luksus jednorazowy (SMO40: tymczasowy luksus Jednorazowo), tryb pracy Ręczny i ogrzewanie CO wyłączone, żeby cała moc szła w wodę. Gdy BT7 dojdzie do celu albo luksus się skończy: tryb pracy Auto i CO z powrotem. Bezpieczniki: max ' + luxMax + ' min, po restarcie HA, po wyjściu z taniej strefy, wyłączeniu automatyzacji albo tej opcji też wraca na Auto.'
        : 'Luksus jednorazowy w taniej (tryb Ręczny + CO wstrzymane, jak w v1.27) jest wyłączony: zaznacz go, jeśli chcesz.') +
      (st[E.auto_cwu] && st[E.cwu_boost] && sT && sL ? '' : ' Brak encji automatyzacji CWU: wklej pakiet ' + PKG_VER + ' i zrób pełny restart HA.') + '</span></div>';
    if (!R) return h + '<div class="info">Brak historii temperatury CWU (BT6), propozycja = wszystkie tanie strefy.</div>' + this._nauCwuRows(P, null, esc, fmt) + this._nauHistRows('cwu', P.blocks, esc) + '</div>';
    h += '<div class="lh"><span>Zużycie ciepłej wody: średnio <b>' + R.perDay.toFixed(1) + ' °C</b> spadku BT6 na dobę (z ' + R.days + ' dni)</span>' + this._nauCwuStat(R, G) + '</div>';
    if (R.days < 7 || !R.cnt.every((x) => x > 0)) h += '<div class="info">Mało historii zużycia wody (' + R.days + ' dni, potrzeba min. 7, każdy dzień tygodnia). Na razie propozycja = wszystkie tanie strefy; potem zacznie pomijać strefy, po których nie zużywacie wody.</div>';
    h += this._nauCwuRows(P, R, esc, fmt);
    h += this._nauHistRows('cwu', P.blocks, esc);
    return h + '</div>';
  }
  _nauCwuStat(R, G) {
    if (!R.hasRuns || !R.runs.length) return '<span class="ds">Brak historii pracy sprężarki na CWU (binary_sensor.hp_sprezarka_cwu).</span>';
    let all = 0, cheap = 0;
    R.runs.forEach(([a, b]) => { for (let t = a; t < b; t += 60000) { const d = new Date(t), m = d.getHours() * 60 + d.getMinutes(), i = (d.getDay() + 6) % 7; all++; if (G.day[i].some((x) => x.f <= m && m < x.t)) cheap++; } });
    return '<span>Grzanie CWU w taniej strefie dotąd: <b>' + (all ? Math.round(cheap / all * 100) : 0) + ' %</b> czasu (' + Math.round(all / 60) + ' h pracy na CWU w ' + R.days + ' dni)</span>';
  }
  _nauCwuRows(P, R, esc, fmt) {
    const DL = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'], days = this._schDays(), G = P.G;
    const now = new Date(), wd = (now.getDay() + 6) % 7, nm = now.getHours() * 60 + now.getMinutes();
    const S = this._sch, main = S && S.data && S.data.cwu ? this._schFromItem(S.data.cwu) : null;
    let mx = 0; if (R) R.use.forEach((d) => d.forEach((v) => { mx = Math.max(mx, v); }));
    const cw = this._hass.states[this._E.cwu_wait], wait = cw ? Number(cw.state) : 30, NM = this._cwuNames(), MD = this._cwuModes(P.blocks, wait, true);
    const grad = (arr) => 'linear-gradient(90deg,' + arr.map((v, k) => { const c = 'rgba(255,152,0,' + (mx ? Math.min(0.85, v / mx * 0.85) : 0).toFixed(2) + ')'; return c + ' ' + (k / 96 * 100).toFixed(2) + '%,' + c + ' ' + ((k + 1) / 96 * 100).toFixed(2) + '%'; }).join(',') + ')';
    let h = '<div class="hr">' + [0, 3, 6, 9, 12, 15, 18, 21, 24].map((x) => '<span style="left:' + (x / 24 * 100) + '%">' + x + '</span>').join('') + '</div>';
    const wk0 = new Date(now); wk0.setHours(0, 0, 0, 0); wk0.setDate(wk0.getDate() - wd);
    DL.forEach((dn, i) => {
      h += '<div class="dr"><span class="dn' + (i === wd ? ' td' : '') + '">' + dn + '</span><div class="tl ro">';
      G.day[i].forEach((b) => { h += '<div class="lay" style="left:' + (b.f / 14.4) + '%;width:' + ((b.t - b.f) / 14.4) + '%;right:auto;background:rgba(67,194,90,.22);border-radius:0"></div>'; });
      if (R) h += '<div class="lay" style="background:' + grad(R.use[i]) + '"></div>';
      if (R && R.runs) {
        // praca sprezarki na CWU w ostatnim tygodniu tego dnia (do 7 dni wstecz)
        const d0 = new Date(wk0); d0.setDate(d0.getDate() + i - (i > wd ? 7 : 0)); const a0 = d0.getTime(), a1 = a0 + 864e5;
        R.runs.forEach(([a, b]) => { if (b <= a0 || a >= a1) return; const f = Math.max(a, a0), t = Math.min(b, a1); h += '<div class="ht" style="left:' + ((f - a0) / 864e5 * 100) + '%;width:' + Math.max(0.3, (t - f) / 864e5 * 100) + '%"></div>'; });
      }
      if (main) main[days[i]].forEach((b) => { h += '<div class="mn" style="left:' + (b.f / 14.4) + '%;width:' + ((b.t - b.f) / 14.4) + '%;bottom:6px"></div>'; });
      MD[i].forEach((b) => { const w = (b.t - b.f) / 14.4; h += '<div class="cm ' + b.c + '" style="left:' + (b.f / 14.4) + '%;width:' + w + '%" title="' + esc(NM[b.m]) + ' ' + fmt(b.f) + '–' + fmt(b.t) + '">' + (w >= 9 ? esc(NM[b.m]) + ' ' + fmt(b.f) + '–' + fmt(b.t) : w >= 5 ? fmt(b.f) + '–' + fmt(b.t) : '') + '</div>'; });
      if (i === wd) h += '<div class="nw" style="left:' + (nm / 14.4) + '%"></div>';
      h += '</div><span class="cp"></span></div>';
    });
    const skip = P.segs.filter((s) => !s.inc);
    h += '<div class="lg"><span><i style="background:rgba(67,194,90,.35)"></i>tania strefa G12</span><span><i style="background:rgba(255,152,0,.7)"></i>zużycie ciepłej wody (im mocniej, tym więcej)</span><span><i class="' + (NM.lux ? 'L' : this._cwuCls(NM.L)) + '"></i>' + esc(NM.L) + (NM.lux ? ': tania strefa, grzeje do celu luksusu, CO wstrzymane (max ' + Math.round(Number((this._hass.states[this._E.cwu_lux_max] || {}).state) || 60) + ' min), potem Auto' : ': tania strefa') + '</span><span><i class="E"></i>' + esc(NM.E) + ': ' + Math.round(wait) + ' min przed tanią, czeka</span><span><i class="' + this._cwuCls(NM.N) + '"></i>' + esc(NM.N) + ': droga strefa, dogrzewa tylko poniżej progu</span>' + this._cwuLeg() + '<span><i style="background:#ff5a4a;height:.3em"></i>grzało CWU (ostatni tydzień)</span><span><i style="background:#ffd54f;height:.25em"></i>obecny harmonogram na głównej</span></div>';
    if (skip.length) h += '<div class="wn sk">Pominięte tanie strefy (po nich do następnej taniej zużycie poniżej ' + P.prog + ' °C): ' + skip.map((s) => { const q = s.a % (7 * 96); return DL[Math.floor(q / 96)] + ' ' + fmt((q % 96) * 15) + ' (' + s.after.toFixed(1) + ' °C)'; }).join(', ') + '.</div>';
    h += '<div class="ft"><span class="hint">Propozycja = tanie strefy, po których zużywacie wodę. „Wyślij na główną” wpisze je do harmonogramu „Tryb CWU” (zapisujesz tam „Zapisz harmonogram”). Przy włączonej automatyzacji CWU harmonogram ustawia się sam.</span><button class="sv" data-a="sendcwu">Wyślij na główną</button></div>';
    return h;
  }
  // v1.26: tryb CWU w czasie: L = okno (tryb w oknie, np. Luksus), E = <= czekaj min przed oknem (Ekonomiczny), N = poza (np. Normalny)
  _cwuModes(blocks, wait, withE) {
    const n = 672, L = new Uint8Array(n);
    for (let i = 0; i < 7; i++) (blocks[i] || []).forEach((b) => { for (let m = b.f; m < b.t; m += 15) L[i * 96 + Math.floor(m / 15)] = 1; });
    const any = L.some((x) => x), md = new Array(n).fill('N'), ws = Math.ceil((Number(wait) || 0) / 15);
    for (let k = 0; k < n; k++) if (L[k]) md[k] = 'L';
    if (any && withE && ws > 0) for (let k = 0; k < n; k++) if (L[k] && !L[(k - 1 + n) % n]) for (let j = 1; j <= ws; j++) { const q = (k - j + n) % n; if (L[q]) break; md[q] = 'E'; }
    // v1.35: c = klasa koloru faktycznego trybu (wybory w taniej / drogiej strefie), m = strefa (L tania, N droga, E czeka)
    const NM = this._cwuNames(), C = { L: NM.lux ? 'L' : this._cwuCls(NM.L), N: this._cwuCls(NM.N), E: 'E' };
    const out = [];
    for (let i = 0; i < 7; i++) {
      const seg = [];
      for (let k = 0; k < 96; k++) { const m = md[i * 96 + k], l = seg[seg.length - 1]; if (l && l.m === m) l.t += 15; else seg.push({ f: k * 15, t: k * 15 + 15, m, c: C[m] }); }
      out.push(seg);
    }
    return out;
  }
  _cwuNames() {
    const st = this._hass.states, g = (id, d) => { const s = st[id]; return s && s.state && s.state !== 'unknown' && s.state !== 'unavailable' ? s.state : d; };
    // v1.31: L = tryb w taniej strefie (albo luksus jednorazowy, gdy wlaczony), N = tryb w drogiej
    const E = this._E, lux = !!(st[E.cwu_lux_on] && st[E.cwu_lux_on].state === 'on');
    return { L: lux ? 'Luksus jednorazowy' : g(E.cwu_tania, 'Ekonomiczny'), N: g(E.cwu_poza, 'Normalny'), E: 'Ekonomiczny', lux };
  }
  _nauSendCwu() {
    const N = this._nau, P = this._nauCwuPlan(N.res && N.res.cwu);
    const S = this._sch, lane = this._schLanes().find((l) => l.k === 'cwu');
    if (this._schAuto(lane)) { this._tab('sch', true); S.lane = 'cwu'; this._schRender(); return; }
    const dr = this._schDraft(lane);
    this._schDays().forEach((d, i) => { dr[d] = this._schNorm(JSON.parse(JSON.stringify(P.blocks[i]))); });
    S.dirty.cwu = true; S.lane = 'cwu'; S.sel = null;
    S.note = { k: 'cwu', t: 'Wpisano propozycję grzania CWU w taniej taryfie z zakładki Nauka. Sprawdź i kliknij „Zapisz harmonogram”, albo „Cofnij zmiany”. Przełącznik Aktywne nie był ruszany.' };
    this._tab('sch', true);
    this._schRender();
    if (this._schEl.scrollIntoView) this._schEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  // ====================== v1.32: DOBA 00-24, plan (proponowany) vs realnie z historii HA ======================
  async _nauDayLoad(fromMs) {
    const hass = this._hass, E = this._E, st = hass.states, now = Date.now();
    const d0 = new Date(); d0.setHours(0, 0, 0, 0); d0.setDate(d0.getDate() - 1);
    if (fromMs && fromMs < d0.getTime()) d0.setTime(fromMs);
    const sal = this._nauSalon();
    const ids = [E.bt25, E.s1, E.bt7, E.cpr, E.cpr_cwu].concat(sal).filter((i, k, a) => i && st[i] && a.indexOf(i) === k);
    if (!ids.length) throw new Error('brak czujników pompy');
    const r = (await hass.callApi('GET', 'history/period/' + d0.toISOString() + '?filter_entity_id=' + ids.join(',') +
      '&end_time=' + encodeURIComponent(new Date(now).toISOString()) + '&minimal_response&no_attributes')) || [];
    const by = {};
    r.forEach((a) => { if (a && a.length) by[a[0].entity_id] = a.map((p) => [Date.parse(p.last_changed || p.last_updated), p.state]).filter((p) => !isNaN(p[0])).sort((x, y) => x[0] - y[0]); });
    // v1.37: dni starsze niz historia recordera (~10 dni) - godzinowe statystyki (temperatury; praca sprezarki z sensor.hp_hist_*)
    const sm = {};
    if (now - d0.getTime() > 9 * 864e5) {
      const sIds = [E.bt25, E.s1, E.bt7].concat(sal, ['sensor.hp_hist_sprezarka', 'sensor.hp_hist_cwu_praca']).filter((i, k, a) => i && st[i] && a.indexOf(i) === k);
      try {
        const q = await hass.callWS({ type: 'recorder/statistics_during_period', start_time: d0.toISOString(), statistic_ids: sIds, period: 'hour', types: ['mean'] });
        sIds.forEach((id) => { sm[id] = ((q && q[id]) || []).filter((x) => x.mean !== null && x.mean !== undefined).map((x) => [typeof x.start === 'number' ? x.start : Date.parse(x.start), Number(x.mean)]); });
      } catch (e) { /* brak statystyk */ }
    }
    return { by, sm, from: d0.getTime(), at: now };
  }
  _nauDayHtml(R, esc) {
    const hass = this._hass, st = hass.states, E = this._E, N = this._nau, D = R.day, C = R.curve;
    const ser = ['co', 'cwu', 'dom'].indexOf(N.dser) >= 0 ? N.dser : 'cwu', showCpr = N.dcpr !== false;
    const btn = (a, v, cur, txt) => '<button data-a="' + a + '" data-v="' + v + '" class="' + (String(v) === String(cur) ? 'on' : '') + '">' + txt + '</button>';
    const RG = this._rngDays(), now = Date.now(), days = RG.days.filter((d) => d.getTime() < now);
    let h = '<div class="sec dy"><div class="st2">Doba 00–24: plan i realnie' + this._rngTag() + '<small> – linia ciągła = realnie z historii HA, przerywana = proponowany plan (Nauka). Przy kilku dniach linia idzie dzień po dniu.</small></div>' +
      '<div class="lh dsw">' + btn('dser', 'cwu', ser, 'Woda CWU (BT7)') + btn('dser', 'co', ser, 'Zasilanie CO (BT25)') + btn('dser', 'dom', ser, 'Dom (salon)') +
      '<label><input type="checkbox" data-a="dcpr"' + (showCpr ? ' checked' : '') + '> praca sprężarki (słupki)</label></div>';
    if (!D) return h + '<div class="info">Brak historii z HA do wykresu doby.</div></div>';
    if (!days.length) return h + '<div class="info">Zakres w przyszłości: nie ma jeszcze realnych danych. Plan na jutro widzisz w Harmonogramie i w wierszach „Po datach” niżej.</div></div>';
    const A = days[0].getTime(), lastD = new Date(days[days.length - 1]); lastD.setDate(lastD.getDate() + 1);
    const B = lastD.getTime(), Bend = Math.min(B, now), nD = days.length, one = nD === 1;
    if (A < D.from) {
      if (!N.dayBusy) { N.dayBusy = true; this._nauDayLoad(A).then((d) => { R.day = d; N.dayBusy = false; this._nauRender(); }).catch(() => { N.dayBusy = false; }); }
      return h + '<div class="info">Wczytuję historię zakresu…</div></div>';
    }
    const STEP = (nD <= 2 ? 5 : nD <= 7 ? 10 : 30) * 60000;
    // wartosc schodkowa (sensor zapisuje przy zmianie) probkowana co STEP; przed historia recordera - srednie godzinowe ze statystyk
    const samp = (id) => {
      const s = (D.by[id] || []).slice(), out = [], f0 = s.length ? s[0][0] : Infinity;
      if (Bend === now && st[id]) s.push([now, st[id].state]);
      const smv = {}; ((D.sm || {})[id] || []).forEach(([t, v]) => { smv[t] = v; });
      let j = -1;
      for (let t = A; t <= Bend; t += STEP) {
        if (t < f0) { const v = smv[Math.floor(t / 36e5) * 36e5]; if (v !== undefined && isFinite(v)) out.push([t, v]); continue; }
        while (j + 1 < s.length && s[j + 1][0] <= t) j++;
        if (j < 0) continue;
        const v = parseFloat(s[j][1]); if (isFinite(v)) out.push([t, v]);
      }
      if (Bend === now && st[id]) { const v = parseFloat(st[id].state); if (isFinite(v)) out.push([now, v]); }
      return out;
    };
    const nH = Math.round((B - A) / 36e5);
    const onMin = (id, hid) => {
      const s = (D.by[id] || []), m = new Array(nH).fill(0);
      const f0 = s.length ? s[0][0] : Infinity;
      ((D.sm || {})[hid] || []).forEach(([t, v]) => { if (t >= A && t + 36e5 <= f0) { const k = Math.floor((t - A) / 36e5); if (k >= 0 && k < nH) m[k] = v * 0.6; } });
      if (!s.length && !((D.sm || {})[hid] || []).length) return null;
      for (let k = 0; k < s.length; k++) {
        if (s[k][1] !== 'on') continue;
        let f = Math.max(A, s[k][0]); const t = Math.min(Bend, k + 1 < s.length ? s[k + 1][0] : now);
        while (f < t) { const hh = Math.floor((f - A) / 36e5); if (hh < 0 || hh >= nH) break; const e = Math.min(t, A + (hh + 1) * 36e5); m[hh] += (e - f) / 60000; f = e; }
      }
      return m;
    };
    const fmtT = (t) => new Date(t).toLocaleString('pl-PL', one ? { hour: '2-digit', minute: '2-digit' } : { weekday: 'short', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
    const num = (k) => { const v = parseFloat((st[E[k]] || {}).state); return isFinite(v) ? v : null; };
    const num2 = (id) => { const v = parseFloat((st[id] || {}).state); return isFinite(v) ? v : null; };
    let real = [], real2 = [], plan = [], plan2 = [], unit = '°C', nm = '', nm2 = '', pn = '', pn2 = '', note = '', bands = [];
    if (ser === 'cwu') {
      nm = 'Realnie BT7 (CWU góra)'; real = samp(E.bt7);
      // plan: symulacja wody wg okien CWU z Nauki, trybow tania/droga strefa i progow stop - dzien po dniu
      const okS = (x) => x && x.state && x.state !== 'unknown' && x.state !== 'unavailable';
      const auOn = st[E.auto_cwu] && st[E.auto_cwu].state === 'on';
      const tt = okS(st[E.cwu_tania]) ? st[E.cwu_tania].state : 'Ekonomiczny', tp = okS(st[E.cwu_poza]) ? st[E.cwu_poza].state : 'Normalny';
      const luxOn = !!(st[E.cwu_lux_on] && st[E.cwu_lux_on].state === 'on');
      const curM = okS(st[E.hwmode]) ? st[E.hwmode].state : 'Normalny';
      const wait = st[E.cwu_wait] ? Math.round(Number(st[E.cwu_wait].state)) || 0 : 30;
      const stopOf = (m) => { const k = m === 'Luksus' ? 'stop_lux' : m === 'Ekonomiczny' ? 'stop_eco' : 'stop_norm'; const v = num(k); return v !== null ? v : (m === 'Luksus' ? 55 : m === 'Ekonomiczny' ? 45 : 50); };
      const P = this._nauCwuPlan(R.cwu);
      const rs = []; for (let k = 1; k < real.length; k++) { const dv = real[k][1] - real[k - 1][1]; if (dv > 0.6 && real[k][0] - real[k - 1][0] <= STEP) rs.push(dv / (STEP / 60000)); }
      rs.sort((x, y) => x - y);
      const rate = rs.length >= 3 ? Math.max(0.1, Math.min(1.5, rs[Math.floor(rs.length / 2)])) : 0.3, HYS = 5, LOSS = 0.01;
      const at = (t) => { const p = real.find((x) => x[0] >= t && x[0] - t < 36e5); return p ? p[1] : null; };
      days.forEach((dt) => {
        const a0 = dt.getTime(), wd = (dt.getDay() + 6) % 7, win = P.blocks[wd] || [];
        const inW = (m) => win.some((b) => b.f <= m && m < b.t);
        const toW = (m) => { const nx = win.filter((b) => b.f > m).map((b) => b.f); return nx.length ? Math.min(...nx) - m : 9999; };
        const use = R.cwu && R.cwu.use ? R.cwu.use[wd] : null;
        const r0 = at(a0); let T = r0 !== null ? r0 : stopOf(auOn ? tt : curM), heat = false;
        for (let m = 0; m < 1440 || (m === 1440 && dt === days[days.length - 1]); m += 5) {
          let mode = curM;
          if (auOn) mode = inW(m) ? (luxOn ? 'Luksus' : tt) : (toW(m) <= wait ? 'Ekonomiczny' : tp);
          const stp = stopOf(mode);
          if ((m * 60000) % STEP === 0) plan.push([a0 + m * 60000, Math.round(T * 10) / 10]);
          if (!heat && T < stp - HYS) heat = true;
          if (heat) { T += rate * 5; if (T >= stp) { T = stp; heat = false; } }
          else T -= LOSS * 5 + (use ? use[Math.min(95, Math.floor(m / 15))] / 3 : 0);
        }
        win.forEach((b) => bands.push([a0 + b.f * 6e4, a0 + b.t * 6e4]));
      });
      pn = 'Plan (symulacja: okna CWU, tryby, pobór wody)';
      note = 'Plan CWU to symulacja: w oknach CWU z Nauki tryb „' + esc(auOn ? (luxOn ? 'Luksus' : tt) : curM) + '”, poza nimi „' + esc(auOn ? tp : curM) + '”' + (auOn ? '' : ' (automatyzacja CWU wyłączona, biorę obecny tryb)') +
        '; pompa dogrzewa, gdy woda spadnie ' + HYS + ' °C poniżej temp. stop, tempo grzania ' + rate.toFixed(2) + ' °C/min' + (rs.length >= 3 ? ' (z historii)' : ' (domyślne)') + ', straty ' + LOSS + ' °C/min + średni pobór wody z historii tego dnia tygodnia. Każdy dzień symulacji startuje od realnej temperatury o północy.';
    } else if (ser === 'co') {
      nm = 'Realnie BT25 (zasilanie CO)'; real = samp(E.bt25);
      nm2 = 'Zadane przez pompę S1'; real2 = samp(E.s1);
      if (C) {
        const W = R.wx || {}, RD = this._nauRng(), MS = (RD && RD.meas) || {}, WX = (RD && RD.wx) || {}, mn = num('minsup'), mx = num('maxsup');
        const atC = (ys, to) => { const T7 = C.T; if (to <= -30) return ys[0]; if (to >= 30) return ys[6]; const i = Math.min(5, Math.floor((to + 30) / 10)), f = (to - T7[i]) / 10; return ys[i] + (ys[i + 1] - ys[i]) * f; };
        const clamp = (v) => { if (mx !== null) v = Math.min(mx, v); if (mn !== null) v = Math.max(mn, v); return Math.round(v * 10) / 10; };
        // v1.46: harmonogram obnizenia CO (auto z Nauki albo reczny) -> niebieskie paski + plan obnizony o roznice przesuniec
        const NW = this._nocWins(), prV = num2('input_number.hp_noc_przesuniecie'), dzV = num2('input_number.hp_dzien_przesuniecie');
        const dOff = NW && prV !== null && dzV !== null ? prV - dzV : 0;
        const inN = (t) => { if (!NW) return false; const d = new Date(t), w = (d.getDay() + 6) % 7, m = d.getHours() * 60 + d.getMinutes(); return (NW[w] || []).some((b) => b.f <= m && m < b.t); };
        if (NW) days.concat(RG.days.filter((d) => d.getTime() >= now)).forEach((dt) => { const a0 = dt.getTime(), w = (dt.getDay() + 6) % 7; (NW[w] || []).forEach((b) => bands.push([a0 + b.f * 6e4, a0 + b.t * 6e4])); });
        for (let t = A; t <= B; t += 9e5) {
          const hk = Math.floor(t / 36e5) * 36e5;
          const to = C.toutH[hk] !== undefined && hk <= now ? C.toutH[hk] : MS[hk] !== undefined ? MS[hk] : W[hk] && isFinite(W[hk].temp) ? W[hk].temp : WX[hk] !== undefined ? WX[hk] : null;
          if (to === null) continue;
          const o = inN(t) ? dOff : 0;
          plan.push([t, clamp(atC(C.prop, to) + o)]); plan2.push([t, clamp(atC(C.cur, to) + o)]);
        }
        pn = 'Plan wg proponowanej krzywej' + (NW ? ' (z obniżeniem)' : ''); pn2 = 'wg obecnej krzywej';
        note = 'Plan CO = zasilanie z krzywej dla temperatury na zewnątrz (pomiar BT1, a dalej prognoza Open-Meteo), obcięte do min./max. zasilania. ' +
          (NW ? 'Niebieskie paski na dole = okna obniżenia CO z harmonogramu' + (st['input_boolean.hp_auto_noc'] && st['input_boolean.hp_auto_noc'].state === 'on' ? ' (automatycznie z Nauki)' : '') + '; w nich plan jest niższy o ' + Math.abs(dOff) + ' °C (orientacyjnie: 1 stopień przesunięcia krzywej ≈ 1 °C zasilania). '
            : 'Obniżenie CO jest wyłączone (ani harmonogram, ani automatyzacja), więc plan go nie uwzględnia. ') + 'Podczas grzania wody CWU zasilanie CO naturalnie spada.';
      } else note = 'Brak krzywej z Nauki, więc tylko realny przebieg.';
    } else {
      const sal = this._nauSalon()[0];
      if (sal) { nm = 'Realnie ' + ((st[sal].attributes || {}).friendly_name || sal); real = samp(sal); }
      const cel = N.src && Number(N.src.cel), tg = cel && isFinite(cel) ? cel : (C && C.target !== null ? C.target : null);
      if (tg !== null) { plan.push([A, tg], [B, tg]); pn = 'Cel w domu ' + tg.toFixed(1) + ' °C'; }
      note = sal ? 'Plan = temperatura, którą chcesz w domu (pole „Chcę w domu” albo mediana z historii).' : 'Brak czujnika salonu: ustaw go w „Źródłach nauki” niżej.';
    }
    const cpr = showCpr ? onMin(E.cpr, 'sensor.hp_hist_sprezarka') : null, cprC = showCpr ? onMin(E.cpr_cwu, 'sensor.hp_hist_cwu_praca') : null;
    const vals = real.concat(real2, plan, plan2).map((p) => p[1]);
    if (!vals.length) return h + '<div class="info">Brak danych dla tej serii w wybranym zakresie.</div><div class="wn">' + note + '</div></div>';
    const lo = Math.floor((Math.min(...vals) - 1) / 5) * 5, hi = Math.ceil((Math.max(...vals) + 1) / 5) * 5;
    const X0 = 46, X1 = 590, Y0 = 42, Y1 = showCpr ? 172 : 200, BY0 = 184, BY1 = 208, YB = showCpr ? BY1 : Y1;
    const sx = (t) => X0 + (t - A) / (B - A) * (X1 - X0), sy = (v) => Y1 - (v - lo) / ((hi - lo) || 1) * (Y1 - Y0);
    let g = '';
    const G = this._g12();
    days.forEach((dt) => { const a0 = dt.getTime(), wd = (dt.getDay() + 6) % 7; (G.day[wd] || []).forEach((b) => { g += '<rect x="' + sx(a0 + b.f * 6e4).toFixed(1) + '" y="' + Y0 + '" width="' + ((b.t - b.f) * 6e4 / (B - A) * (X1 - X0)).toFixed(1) + '" height="' + (Y1 - Y0) + '" fill="rgba(126,224,74,.08)"/>'; }); });
    bands.forEach((b) => { g += '<rect x="' + sx(b[0]).toFixed(1) + '" y="' + (Y1 - 6) + '" width="' + ((b[1] - b[0]) / (B - A) * (X1 - X0)).toFixed(1) + '" height="6" rx="2" fill="#29b6f6" opacity=".8"/>'; });
    const stepV = hi - lo > 30 ? 10 : 5;
    for (let v = lo; v <= hi; v += stepV) g += '<line x1="' + X0 + '" y1="' + sy(v) + '" x2="' + X1 + '" y2="' + sy(v) + '" stroke="rgba(255,255,255,.08)"/><text x="' + (X0 - 6) + '" y="' + (sy(v) + 4) + '" text-anchor="end">' + v + ' ' + unit + '</text>';
    g += this._axDays(A, B, sx, Y0, YB);
    const line = this._nauLine(sx, sy);
    // najwiekszy spadek (szczyt -> dolek pozniej) i minimum realnej linii
    let mi = null, dr = null, pk = null;
    real.forEach((p) => {
      if (!mi || p[1] < mi[1]) mi = p;
      if (!pk || p[1] > pk[1]) pk = p;
      const d = pk[1] - p[1]; if (!dr || d > dr.d) dr = { d, a: pk, b: p };
    });
    let mk = '';
    if (dr && dr.d >= 0.5) mk += '<line x1="' + sx(dr.a[0]).toFixed(1) + '" y1="' + sy(dr.a[1]).toFixed(1) + '" x2="' + sx(dr.b[0]).toFixed(1) + '" y2="' + sy(dr.b[1]).toFixed(1) + '" stroke="#ff5a4a" stroke-width="1.2" stroke-dasharray="2 3"/><circle cx="' + sx(dr.a[0]).toFixed(1) + '" cy="' + sy(dr.a[1]).toFixed(1) + '" r="3" fill="#ff8a80"/>';
    if (mi) mk += '<circle cx="' + sx(mi[0]).toFixed(1) + '" cy="' + sy(mi[1]).toFixed(1) + '" r="4" fill="#ff5a4a" stroke="#fff" stroke-width="1"/><text x="' + Math.min(X1 - 30, Math.max(X0 + 30, sx(mi[0]))).toFixed(1) + '" y="' + Math.min(Y1 - 4, sy(mi[1]) + 15).toFixed(1) + '" text-anchor="middle" font-size="11" fill="#ff8a80">min ' + mi[1].toFixed(1) + ' ' + unit + '</text>';
    // slupki: do 7 dni minuty pracy w godzinie, dluzej godziny pracy na dobe
    let bars = '';
    if (cpr) {
      const perDay = nD > 7, nb = perDay ? nD : nH, cap = perDay ? 1440 : 60;
      const agg = (m) => { if (!m) return null; if (!perDay) return m; const o = new Array(nD).fill(0); m.forEach((v, k) => { const d = Math.min(nD - 1, Math.floor(k / 24)); o[d] += v; }); return o; };
      const cA = agg(cpr), cC = agg(cprC);
      bars += '<text x="' + (X0 - 6) + '" y="' + (BY0 + 8) + '" text-anchor="end" font-size="9.5" fill="#c8d0da">' + (perDay ? '24 h' : '60 min') + '</text><text x="' + (X0 - 6) + '" y="' + BY1 + '" text-anchor="end" font-size="9.5" fill="#c8d0da">0</text>';
      const bw = (X1 - X0) / nb, gap = bw > 6 ? 1.5 : 0.3;
      cA.forEach((m, k) => {
        const mc = cC ? Math.min(m, cC[k]) : 0, x = X0 + k * bw + gap, H1 = (BY1 - BY0) * Math.min(cap, m) / cap, Hc = (BY1 - BY0) * Math.min(cap, mc) / cap;
        const lab = perDay ? days[k].toLocaleDateString('pl-PL', { weekday: 'short', day: '2-digit', month: '2-digit' }) : new Date(A + k * 36e5).toLocaleString('pl-PL', { weekday: 'short', hour: '2-digit', minute: '2-digit' });
        if (m > 0.5) bars += '<rect x="' + x.toFixed(1) + '" y="' + (BY1 - H1).toFixed(1) + '" width="' + Math.max(0.5, bw - 2 * gap).toFixed(1) + '" height="' + H1.toFixed(1) + '" fill="#ffab1a" opacity=".75"><title>' + lab + ' sprężarka ' + Math.round(m) + ' min' + (cC ? ', w tym CWU ' + Math.round(mc) + ' min' : '') + '</title></rect>';
        if (mc > 0.5) bars += '<rect x="' + x.toFixed(1) + '" y="' + (BY1 - Hc).toFixed(1) + '" width="' + Math.max(0.5, bw - 2 * gap).toFixed(1) + '" height="' + Hc.toFixed(1) + '" fill="#29b6f6" pointer-events="none"/>';
      });
    }
    const nx = Bend === now ? sx(now) : null;
    const colR = ser === 'cwu' ? '#ff4d3a' : ser === 'co' ? '#9c6cff' : '#ffab1a';
    let lg = '<line x1="50" y1="10" x2="72" y2="10" stroke="' + colR + '" stroke-width="2.4"/><text x="77" y="14" fill="#e3e8ee">' + esc(nm || 'Realnie') + '</text>';
    let lx = 77 + Math.min(200, (nm || 'Realnie').length * 6.2) + 14;
    if (pn) { lg += '<line x1="' + lx + '" y1="10" x2="' + (lx + 22) + '" y2="10" stroke="#43d343" stroke-width="2" stroke-dasharray="6 4"/><text x="' + (lx + 27) + '" y="14" fill="#e3e8ee">' + esc(pn) + '</text>'; lx += 27 + Math.min(260, pn.length * 6.2) + 14; }
    let lg2 = '';
    if (nm2 && real2.length) lg2 += '<line x1="50" y1="24" x2="72" y2="24" stroke="#d0b8ff" stroke-width="1.2" stroke-dasharray="1 3"/><text x="77" y="27" fill="#c8d0da">' + esc(nm2) + '</text>';
    if (pn2 && plan2.length) lg2 += '<line x1="230" y1="24" x2="252" y2="24" stroke="#29b6f6" stroke-width="1.4" stroke-dasharray="3 3"/><text x="257" y="27" fill="#c8d0da">' + esc(pn2) + '</text>';
    h += '<svg viewBox="0 0 600 ' + (YB + 22) + '" style="width:100%;max-width:60em;height:auto;display:block;font-family:inherit"><g font-size="11" fill="#c8d0da">' + g + '</g><g font-size="11.5">' + lg + '</g><g font-size="10.5">' + lg2 + '</g>' +
      bars +
      line(plan2, '#29b6f6', '3 3', 1.4) + line(plan, '#43d343', '6 4', 2) + line(real2, '#d0b8ff', '1 3', 1.2) + line(real, colR, '', one ? 2.4 : 1.8) + mk +
      (nx !== null ? '<line x1="' + nx.toFixed(1) + '" y1="' + Y0 + '" x2="' + nx.toFixed(1) + '" y2="' + YB + '" stroke="#ff5a4a" stroke-width="1.5"/><text x="' + nx.toFixed(1) + '" y="' + (Y0 - 3) + '" text-anchor="middle" font-size="10.5" fill="#ff8a80">teraz</text>' : '') + '</svg>';
    // kafle
    let dev = null;
    if (plan.length > 1 && real.length) {
      let k0 = 1;
      const pv = (t) => { while (k0 < plan.length && plan[k0][0] < t) k0++; if (k0 >= plan.length) return null; const p0 = plan[k0 - 1], p1 = plan[k0]; if (p1[0] - p0[0] > 3 * 36e5) return null; return p0[1] + (p1[1] - p0[1]) * (t - p0[0]) / ((p1[0] - p0[0]) || 1); };
      const ds = real.map((p) => { const v = pv(p[0]); return v === null ? null : p[1] - v; }).filter((x) => x !== null);
      if (ds.length) dev = { avg: ds.reduce((s2, x) => s2 + x, 0) / ds.length, min: Math.min(...ds) };
    }
    const sg = (v) => (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v).toFixed(1);
    const tot = cpr ? cpr.reduce((s2, x) => s2 + x, 0) : null, totC = cprC ? cprC.reduce((s2, x) => s2 + x, 0) : null;
    const t0d = new Date(); t0d.setHours(0, 0, 0, 0);
    const cprLab = !one ? 'w zakresie (' + nD + ' dni)' : A === t0d.getTime() ? 'dziś' : A === t0d.getTime() - 864e5 ? 'wczoraj' : days[0].toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit' });
    const hm = (m) => Math.floor(m / 60) + ' h ' + Math.round(m % 60) + ' min';
    h += '<div class="kt">' +
      '<div class="k"><span>Najniżej (realnie)</span><b>' + (mi ? mi[1].toFixed(1) + ' ' + unit : '–') + '</b><i>' + (mi ? 'o ' + fmtT(mi[0]) : 'brak danych') + '</i></div>' +
      '<div class="k"><span>Największy spadek</span><b>' + (dr && dr.d >= 0.1 ? '−' + dr.d.toFixed(1) + ' ' + unit : '–') + '</b><i>' + (dr && dr.d >= 0.1 ? fmtT(dr.a[0]) + ' → ' + fmtT(dr.b[0]) + ' (' + dr.a[1].toFixed(1) + ' → ' + dr.b[1].toFixed(1) + ')' : 'bez spadków') + '</i></div>' +
      '<div class="k"><span>Realnie vs plan</span><b>' + (dev ? sg(dev.avg) + ' ' + unit : '–') + '</b><i>' + (dev ? 'średnio; ' + (dev.min < 0 ? 'najbardziej pod planem ' + sg(dev.min) + ' ' + unit : 'cały czas nad planem') : 'brak planu do porównania') + '</i></div>' +
      (tot !== null ? '<div class="k"><span>Sprężarka ' + cprLab + '</span><b>' + hm(tot) + '</b><i>' + (totC !== null ? 'w tym CWU ' + hm(totC) + ' (niebieskie)' : 'pomarańczowe słupki = praca') + (nD > 1 ? ', średnio ' + hm(tot / nD) + ' na dobę' : '') + '</i></div>' : '') +
      '</div>';
    return h + '<div class="wn">Zielone tło = tania strefa G12' + (ser === 'cwu' ? ', niebieski pasek = okna grzania CWU z Nauki' : '') + '. Czerwona kropka = minimum, czerwona kropkowana = największy spadek. ' + note + (nD > 9 ? ' Dni starsze niż historia HA (~10 dni) z godzinowych statystyk.' : '') + ' Wykres nic nie zmienia w pompie.</div></div>';
  }
  _nauRender() {
    const el = this._nauEl, hass = this._hass, N = this._nau;
    if (!el || !hass || el.hidden) return;
    if (!el._bound) {
      el._bound = true;
      el.addEventListener('click', (ev0) => this._nauTrack(ev0, (ev) => {
        const t = ev.target.closest && ev.target.closest('[data-a]'); if (!t) return;
        const a = t.getAttribute('data-a');
        if (this._krzClick(a, t)) return;
        if (a === 'espnow') { this._espKick(true); return; }
        if (a === 'send') this._nauSend();
        else if (a === 'sendcwu') this._nauSendCwu();
        else if (a === 'autonoc' || a === 'autonocg12') { const id = a === 'autonoc' ? 'input_boolean.hp_auto_noc' : 'input_boolean.hp_auto_noc_g12'; if (this._hass.states[id]) this._hass.callService('input_boolean', 'toggle', { entity_id: id }); }
        else if (a === 'autocwu') { const id = this._E.auto_cwu; if (this._hass.states[id]) this._hass.callService('input_boolean', 'toggle', { entity_id: id }); }
        else if (a === 'celx') { delete N.src.cel; this._nauSrcSave(); this._nauRecalc(); }
        else if (a === 'auto') { const id = this._E.auto_cyrk; if (this._hass.states[id]) this._hass.callService('input_boolean', 'toggle', { entity_id: id }); }
        else if (a === 'nbk') { N.sel = { i: Number(t.getAttribute('data-d')), j: Number(t.getAttribute('data-i')) }; this._nauRender(); }
        else if (a === 'ndel') { const e = this._nauEdit(); if (N.sel && e[N.sel.i]) { e[N.sel.i].splice(N.sel.j, 1); N.sel = null; this._nauRender(); } }
        else if (a === 'nrst') { N.edit = null; N.sel = null; this._nauRender(); }
        else if (a === 'ncp') { const e = this._nauEdit(), d = Number(t.getAttribute('data-d')); if (e[d]) { for (let k = 0; k < 7; k++) if (e[k]) e[k] = JSON.parse(JSON.stringify(e[d])); N.sel = null; this._nauRender(); } }
        else if (a === 'pkrun') this._pkRun(false);
        else if (a === 'pkfix') this._pkFix();
        else if (a === 'pkfixr') this._pkFixRestart();
        else if (a === 'pkcopy') this._pkCopy();
        else if (a === 'pkfree') this._pkFree();
        else if (a === 'pkok') { if (this._pk) { this._pk.log = []; this._pk.err = []; } this._nauRender(); }
        else if (a === 'reload' && !N.loading) { N.cmpFrom = N.base || this._nauSnap(); this._nauLoad(); }
        else if (a === 'dhide') { N.diff = null; this._nauRender(); }
        else if (a === 'dser') { N.dser = t.getAttribute('data-v'); this._nauRender(); }
        else if (a === 'dday') { N.dday = Number(t.getAttribute('data-v')); this._nauRender(); }
        else if (a === 'enrl') { N.en = null; this._nauRender(); }
        else if (a === 'obimit') this._hass.callService('input_boolean', 'turn_off', { entity_id: 'input_boolean.hp_imitacja_obecnosci' });
        else if (a === 'more') this._more(t.getAttribute('data-e'));
        else if (a === 'sdel') this._nauSrcEdit(t.getAttribute('data-k'), 'del', t.getAttribute('data-e'));
        else if (a === 'sauto') this._nauSrcEdit(t.getAttribute('data-k'), 'auto');
        else if (a === 'sadd') { const inp = el.querySelector('input[data-k="' + t.getAttribute('data-k') + '"]'); this._nauSrcEdit(t.getAttribute('data-k'), 'add', inp && inp.value.trim()); }
      }));
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
      el.addEventListener('change', (ev0) => this._nauTrack(ev0, (ev) => {
        const t = ev.target, a = t.getAttribute && t.getAttribute('data-a');
        if (a === 'kpt') { this._krzPt(t); return; }
        if (a === 'dday2') { N.dday = Number(t.value) || 0; this._nauRender(); return; }
        if (a === 'enent' || a === 'enkwh') {
          const id = a === 'enent' ? 'input_text.hp_energia_encja' : 'input_text.hp_energia_kwh_encja';
          if (this._hass.states[id]) this._hass.callService('input_text', 'set_value', { entity_id: id, value: t.value });
          // v1.38: stary wybor licznika kWh w "mocy" -> przenies do licznika
          if (a === 'enkwh' && this._hass.states['input_text.hp_energia_encja'] && /^(Wh|kWh)$/.test(this._enUnit(this._enRaw('input_text.hp_energia_encja') || ''))) this._hass.callService('input_text', 'set_value', { entity_id: 'input_text.hp_energia_encja', value: '' });
          N.en = null; return;
        }
        if (a === 'g12') { const v = String(t.value).replace(/\s+/g, ''); if (this._g12Parse(v).length && this._hass.states[this._E.g12]) this._hass.callService('input_text', 'set_value', { entity_id: this._E.g12, value: v }); else this._nauRender(); return; }
        if (a === 'g12we') { const id = this._E.g12_we; if (this._hass.states[id]) this._hass.callService('input_boolean', t.checked ? 'turn_on' : 'turn_off', { entity_id: id }); return; }
        if (a === 'ctania' || a === 'cpoza') { const id = a === 'ctania' ? this._E.cwu_tania : this._E.cwu_poza; if (this._hass.states[id]) this._hass.callService('input_select', 'select_option', { entity_id: id, option: t.value }); return; }
        if (a === 'dcpr') { N.dcpr = !!t.checked; this._nauRender(); return; }
        if (a === 'cluxon') { const id = this._E.cwu_lux_on; if (this._hass.states[id]) this._hass.callService('input_boolean', t.checked ? 'turn_on' : 'turn_off', { entity_id: id }); return; }
        if (a === 'cluxmax') { const v = parseInt(t.value, 10), id = this._E.cwu_lux_max; if (!isNaN(v) && this._hass.states[id]) this._hass.callService('input_number', 'set_value', { entity_id: id, value: Math.max(15, Math.min(240, v)) }); return; }
        if (a === 'cwait') { const v = parseInt(t.value, 10), id = this._E.cwu_wait; if (!isNaN(v) && this._hass.states[id]) this._hass.callService('input_number', 'set_value', { entity_id: id, value: Math.max(0, Math.min(180, v)) }); return; }
        if (a === 'cprog') { const v = parseFloat(String(t.value).replace(',', '.')); if (isFinite(v) && v >= 0 && v <= 20) N.src.cwuProg = v; else delete N.src.cwuProg; this._nauSrcSave(); this._nauRender(); return; }
        if (a === 'wmn') { const v = parseInt(t.value, 10), id = this._E.cyrk_wymus_min; if (!isNaN(v) && this._hass.states[id]) this._hass.callService('input_number', 'set_value', { entity_id: id, value: Math.max(15, Math.min(240, Math.round(v / 15) * 15)) }); return; }
        if (a === 'pwy') { const v = parseInt(t.value, 10), id = 'input_number.hp_cyrk_po_wyjsciu'; if (!isNaN(v) && this._hass.states[id]) this._hass.callService('input_number', 'set_value', { entity_id: id, value: Math.max(0, Math.min(60, v)) }); return; }
        if (a === 'wk' || a === 'wt' || a === 'wp' || a === 'won') {
          const w = N.src.wake = Object.assign({}, N.src.wake || {}), k = t.getAttribute('data-k');
          if (a === 'wk') { if (t.value === 'auto') delete w[k]; else w[k] = this._schFmt((k === 'wd' ? this._nauWake(N.res && N.res.cyrk).wd : this._nauWake(N.res && N.res.cyrk).we).m); }
          else if (a === 'wt') { if (/^\d{1,2}:\d{2}/.test(t.value)) w[k] = t.value.slice(0, 5); }
          else if (a === 'wp') { const v = parseInt(t.value, 10); if (!isNaN(v)) w.pre = Math.max(0, Math.min(120, v)); }
          else if (a === 'won') w.on = !!t.checked;
          this._nauSrcSave(); this._nauRender(); return;
        }
        if (a === 'cel') { const v = parseFloat(String(t.value).replace(',', '.')); if (isFinite(v) && v >= 10 && v <= 30) N.src.cel = v; else delete N.src.cel; this._nauSrcSave(); this._nauRecalc(); return; }
        if ((a !== 'ntf' && a !== 'ntt') || !N.sel) return;
        const e = this._nauEdit(), b = e[N.sel.i] && e[N.sel.i][N.sel.j]; if (!b) return;
        let m = this._schMin(t.value); if (a === 'ntt' && m === 0) m = 1440;
        if (a === 'ntf') b.f = m; else b.t = m;
        if (b.t <= b.f) { if (a === 'ntf') b.f = Math.max(0, b.t - 15); else b.t = Math.min(1440, b.f + 15); }
        e[N.sel.i] = this._schNorm(e[N.sel.i]); N.sel = { i: N.sel.i, j: Math.max(0, e[N.sel.i].findIndex((x) => x.f <= b.f && x.t >= b.t)) };
        this._nauRender();
      }));
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
    let h = '<div class="sh"><div class="sht">Nauka<small>podgląd: ustawień pompy nie zmienia (poza suwakami automatyzacji cyrkulacji i CWU)</small><span style="flex:1"></span>' +
      '<button data-a="reload"' + (N.loading ? ' disabled' : '') + '>' + (N.loading ? 'Liczę…' : 'Przelicz') + '</button></div>';
    h += this._pkHtml(esc);
    h += this._obecHtml(esc);
    h += this._rngHtml(true);
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
    if (N.diff) h += '<div class="info df"><b>Zmiany po przeliczeniu</b> (względem ' + (N.diff.at ? new Date(N.diff.at).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }) : 'poprzedniego') + '): ' +
      (N.diff.list.length ? '<ul>' + N.diff.list.map((x) => '<li>' + esc(x) + '</li>').join('') + '</ul>' : 'bez zmian.') +
      '<span class="wn">Szara przerywana linia i szare ramki = poprzednia propozycja. Nic nie jest zapisane, harmonogram zmienia dopiero „Wyślij na główną”.</span> <button data-a="dhide">Ukryj</button></div>';
    // ---- krzywa ----
    const cel = N.src && Number(N.src.cel);
    const sal = this._nauSalon()[0], salV = sal ? parseFloat(st[sal].state) : NaN;
    h += '<div class="sec"><div class="st2">Krzywa grzewcza: obecna i proponowana</div>' +
      '<div class="lh"><label>Chcę w domu: <input class="cel" type="number" step="0.5" min="15" max="26" data-a="cel" value="' + (cel && isFinite(cel) ? cel : '') + '" placeholder="' + (C && C.target !== null ? C.target.toFixed(1) : '21') + '"> °C</label>' +
      (cel ? '<button data-a="celx" title="Wróć do mediany z historii">Wyczyść</button>' : '') +
      '<span>Salon teraz: <b>' + (isNaN(salV) ? '–' : salV.toFixed(1) + ' °C') + '</b>' + (sal ? ' (' + esc((st[sal].attributes.friendly_name) || sal) + ')' : ' (brak czujnika salonu, ustaw w „Źródłach nauki”)') + '</span>' +
      '<span class="ds">Wpisz temperaturę i Enter: proponowana krzywa przeliczy się dla tej temperatury w domu. Nic nie zmienia w pompie.</span></div>';
    if (C) {
      // v1.37: fioletowa = pamiec krzywej wybrana nizej (wzorcowa / robocza, z edycja na biezaco) + obecne przesuniecie
      const kOff = parseFloat((st[E.offset] || {}).state), kMem = this._krzBuf(N.kc || 'wz').map((v) => v + (isFinite(kOff) ? kOff : 0));
      const all = C.cur.concat(C.prop, kMem);
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
        '<line x1="290" y1="12" x2="314" y2="12" stroke="#43d343" stroke-width="2.6" stroke-dasharray="7 5"/><text x="320" y="16" fill="#e3e8ee">Proponowana</text>' +
        '<line x1="412" y1="12" x2="436" y2="12" stroke="#c38fff" stroke-width="2.6"/><text x="442" y="16" fill="#e3e8ee">Pamięć ' + ((N.kc || 'wz') === 'ro' ? 'robocza' : 'wzorcowa') + '</text>';
      h += '<div class="cv"><svg viewBox="0 0 600 220" style="width:100%;height:auto;display:block;font-family:inherit"><g font-size="11.5" fill="#c8d0da">' + g + '</g><g font-size="12">' + leg + nowl + '</g>' + pl(C.cur, '#29b6f6') + (N.diff && N.diff.old.prop ? '<polyline points="' + C.T.map((t, i) => sx(t) + ',' + sy(N.diff.old.prop[i])).join(' ') + '" fill="none" stroke="#9aa4b0" stroke-width="1.8" stroke-dasharray="2 4"/>' : '') + pl(C.prop, '#43d343', true) + pl(kMem, '#c38fff') + '</svg>' +
        '<div class="pv">' + C.T.map((t, i) => i).reverse().map((i) => { const d = Math.round((C.prop[i] - C.cur[i]) * 10) / 10;
          return '<div><b>P' + (i + 1) + '</b><span>' + C.T[i] + ' °C</span><span>' + C.cur[i].toFixed(0) + ' → <em class="' + (d > 0 ? 'u' : d < 0 ? 'd' : '') + '">' + (Math.round(C.prop[i] * 10) / 10) + '</em> °C</span></div>'; }).join('') + '</div></div>';
      h += '<div class="why"><div class="wt">Co przesunęło propozycję:</div>' + (C.why.length ? C.why.map((w) => '<div class="wr"><span>' + esc(w.t) + '</span><b>' + esc(w.v) + '</b></div>').join('')
        : '<div class="wr"><span>Nic wyraźnego: obecna krzywa trzyma temperaturę w domu, a pogoda jest typowa.</span><b>0 °C</b></div>') +
        '<div class="wn">Cel w domu: ' + (C.target !== null ? C.target.toFixed(1) + ' °C (' + esc(C.tsrc) + ')' : 'brak') + '. Czujniki w domu: ' + (C.tin.length ? C.tin.map((i) => esc((st[i] && st[i].attributes.friendly_name) || i)).join(', ') : '<b>nie znalazłem</b> (ustaw w karcie: nauka: t_dom: sensor.…)') +
        '. Liczone z godzin 8–22 (nocne obniżenie pomijam). Wykres nic nie zmienia, punkty P1–P7 ustawiasz sam w panelu „Własna krzywa”.</div></div>';
    } else h += '<div class="info">Nie da się policzyć krzywej (brak danych).</div>';
    h += this._krzHtml(esc);
    h += '</div>';
    h += this._nauDayHtml(R, esc);
    h += this._enHtml(esc);
    h += this._nauOutHtml(C);
    h += this._nauFcHtml();
    h += this._nauCoHtml(esc);
    h += this._nauCyrkHtml(Y, esc, fmt);
    h += this._nauCwuHtml(R.cwu, esc, fmt);
    if (N.srcLoaded) h += this._nauSrcHtml(esc);
    if (N.at) h += '<div class="wn" style="margin-top:.8em">Policzone ' + new Date(N.at).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }) + ', odświeżane co 30 min. Pogoda: Open-Meteo (api.open-meteo.com, położenie domu z HA).</div>';
    el.innerHTML = h + '</div>' + this._krzConfHtml(esc);
    this._nauZs();
  }

  // ====================== v1.35 ======================
  // --- Nauka: "Zmienione i zapisane" nad zmienionym ustawieniem (po potwierdzeniu zapisu przez HA) ---
  _nauTrack(ev, fn) {
    const t = ev.target && ev.target.closest ? ev.target.closest('[data-a]') : null;
    const a = t && t.getAttribute('data-a');
    const SKIP = { send: 1, sendcwu: 1, nbk: 1, ndel: 1, nrst: 1, ncp: 1, pkrun: 1, pkfree: 1, pkok: 1, reload: 1, dhide: 1, dser: 1, dday: 1, more: 1, dcpr: 1, ntf: 1, ntt: 1, ksel: 1, kfab: 1, ksend: 1, kpt: 1, kno: 1, kyes: 1, kload: 1, rng: 1, rngs: 1, rngf: 1, rngt: 1, dday2: 1, enrl: 1 };
    if (!t || SKIP[a] || (ev.type === 'click' && t.tagName !== 'BUTTON')) { fn(ev); return; }
    const ps = [], h = this._hass, orig = h && h.callService;
    try { if (h) h.callService = (...x) => { const p = orig.apply(h, x); ps.push(p); return p; }; } catch (e) { /* brak */ }
    this._nauSrcSave = (...x) => { const p = HaKartaPompaCiepla.prototype._nauSrcSave.apply(this, x); ps.push(p); return p; };
    try { fn(ev); } finally { try { if (h) h.callService = orig; } catch (e) { /* brak */ } delete this._nauSrcSave; }
    if (ps.length) this._nauOk(this._nauKey(t), Promise.all(ps));
  }
  _nauKey(t) {
    const a = t.getAttribute('data-a'), k = t.getAttribute('data-k');
    return '[data-a="' + a + '"]' + (k ? '[data-k="' + k + '"]' : '');
  }
  _nauOk(key, p) {
    const N = this._nau; N.zs = N.zs || {};
    const z = N.zs[key] = { s: 'w', t: Date.now() };
    this._nauZs();
    Promise.resolve(p).then(() => { z.s = N.srcErr ? 'b' : 'ok'; z.t = Date.now(); this._nauZs(); [3050, 3700].forEach((d) => setTimeout(() => this._nauZs(), d)); })
      .catch((e) => { z.s = 'x'; z.e = (e && (e.message || e.code)) || ''; z.t = Date.now(); this._nauZs(); setTimeout(() => this._nauZs(), 6100); });
  }
  _nauZs() {
    const el = this._nauEl, N = this._nau; if (!el || !N || !N.zs) return;
    el.querySelectorAll(':scope > .zs').forEach((x) => x.remove());
    const er = el.getBoundingClientRect(), now = Date.now();
    Object.keys(N.zs).forEach((key) => {
      const z = N.zs[key], age = now - z.t;
      const life = z.s === 'ok' ? 3600 : z.s === 'w' ? 15000 : 6000;
      if (age > life) { delete N.zs[key]; return; }
      const tg = el.querySelector(key); if (!tg) return;
      const r = tg.getBoundingClientRect(); if (!r.width) return;
      const b = document.createElement('div');
      b.className = 'zs' + (z.s === 'w' ? ' w' : z.s === 'ok' ? '' : ' x') + (z.s === 'ok' && age > 3000 ? ' o' : '');
      b.textContent = z.s === 'w' ? 'Zapisuję…' : z.s === 'ok' ? '✓ Zmienione i zapisane' : z.s === 'b' ? 'Zapisane tylko w tej przeglądarce' : 'Nie zapisano' + (z.e ? ': ' + z.e : '');
      el.appendChild(b);
      const bw = b.offsetWidth, bh = b.offsetHeight;
      b.style.left = Math.max(2, Math.min(er.width - bw - 2, r.left - er.left + r.width / 2 - bw / 2)) + 'px';
      b.style.top = Math.max(2, r.top - er.top - bh - 3) + 'px';
    });
  }

  // ====================== v1.36 ======================
  // --- wspolny zakres czasu (Harmonogram + Nauka): +-3 dni (dzis = 4. rzad), dzien, tydzien, miesiac, kalendarz <= 31 dni ---
  _rngGet() {
    if (!this._rng) { let r = null; try { r = JSON.parse(localStorage.getItem('hkpc_rng') || 'null'); } catch (e) { r = null; } this._rng = r && r.k ? r : { k: 'pm3', off: 0 }; }
    return this._rng;
  }
  _rngDays() {
    const r = this._rngGet(), t0 = new Date(); t0.setHours(0, 0, 0, 0);
    const add = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
    let a, n;
    if (r.k === 'd') { a = add(t0, r.off || 0); n = 1; }
    else if (r.k === 'w') { a = add(t0, -((t0.getDay() + 6) % 7) + 7 * (r.off || 0)); n = 7; }
    else if (r.k === 'm') { a = new Date(t0.getFullYear(), t0.getMonth() + (r.off || 0), 1); n = new Date(a.getFullYear(), a.getMonth() + 1, 0).getDate(); }
    else if (r.k === 'cal' && r.f && r.t) {
      a = new Date(r.f + 'T00:00:00'); let b = new Date(r.t + 'T00:00:00');
      if (isNaN(a) || isNaN(b)) { a = add(t0, -3); n = 7; } else { if (b < a) { const x = a; a = b; b = x; const f = r.f; r.f = r.t; r.t = f; } n = Math.min(31, Math.round((b - a) / 864e5) + 1); }
    } else { a = add(t0, -3 + 7 * (r.off || 0)); n = 7; }
    const days = []; for (let i = 0; i < n; i++) days.push(add(a, i));
    return { days, from: days[0].getTime(), to: add(days[days.length - 1], 1).getTime() };
  }
  _rngIso(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  _rngTag() {
    // v1.38: przy kazdym wykresie wlasny wybor zakresu (wspolny dla calej Nauki - zmiana tu zmienia wszystkie wykresy)
    const r = this._rngGet(), R = this._rngDays(), f = R.days[0], l = R.days[R.days.length - 1], fd = (d) => String(d.getDate()).padStart(2, '0') + '.' + String(d.getMonth() + 1).padStart(2, '0');
    const b = (k, off, txt) => '<button data-a="rng" data-k="' + k + '" data-o="' + off + '" class="' + (r.k === k && (r.off || 0) === off ? 'on' : '') + '">' + txt + '</button>';
    return '<span class="rgt2" title="Zakres wspólny dla całej Nauki – zmiana tutaj zmienia wszystkie wykresy">' + b('d', -1, 'Wczoraj') + b('d', 0, 'Dziś') + b('d', 1, 'Jutro') + b('pm3', 0, '±3 dni') + b('w', 0, 'Tydzień') + b('m', 0, 'Miesiąc') +
      '<button data-a="rng" data-k="cal" data-o="0" class="' + (r.k === 'cal' ? 'on' : '') + '">Kalendarz</button>' +
      (r.k === 'cal' ? '<input type="date" data-a="rngf" value="' + (r.f || this._rngIso(f)) + '"><input type="date" data-a="rngt" value="' + (r.t || this._rngIso(l)) + '">'
        : '<button data-a="rngs" data-v="-1" title="Wcześniej">◀</button><button data-a="rngs" data-v="1" title="Później">▶</button>') +
      '<em>' + fd(f) + (R.days.length > 1 ? '–' + fd(l) : '') + '</em></span>';
  }
  _rngHtml(top) {
    const r = this._rngGet(), R = this._rngDays(), b = (k, off, txt) => '<button data-a="rng" data-k="' + k + '" data-o="' + off + '" class="' + (r.k === k && (r.off || 0) === off ? 'on' : '') + '">' + txt + '</button>';
    const f = R.days[0], l = R.days[R.days.length - 1], fd = (d) => String(d.getDate()).padStart(2, '0') + '.' + String(d.getMonth() + 1).padStart(2, '0');
    return '<div class="rg2' + (top ? ' top' : '') + '">' + b('pm3', 0, '±3 dni') + b('d', 0, 'Dziś') + b('d', -1, 'Wczoraj') + b('d', 1, 'Jutro') + b('w', 0, 'Ten tydzień') + b('w', -1, 'Poprzedni tydz.') + b('m', 0, 'Ten miesiąc') + b('m', -1, 'Poprzedni mies.') +
      '<button data-a="rng" data-k="cal" data-o="0" class="' + (r.k === 'cal' ? 'on' : '') + '">Kalendarz</button>' +
      (r.k === 'cal' ? '<label>od <input type="date" data-a="rngf" value="' + (r.f || this._rngIso(f)) + '"></label><label>do <input type="date" data-a="rngt" value="' + (r.t || this._rngIso(l)) + '"></label><span class="ds">maks. 31 dni</span>'
        : '<button data-a="rngs" data-v="-1" title="Wcześniej">◀</button><button data-a="rngs" data-v="1" title="Później">▶</button>') +
      '<span class="rgl">' + fd(f) + (R.days.length > 1 ? '–' + fd(l) + '.' + l.getFullYear() : '.' + f.getFullYear()) + ' (' + R.days.length + ' ' + (R.days.length === 1 ? 'dzień' : 'dni') + ')</span></div>';
  }
  _rngEv(ev) {
    const t = ev.target && ev.target.closest ? ev.target.closest('[data-a^="rng"]') : null; if (!t) return;
    const a = t.getAttribute('data-a'), r = Object.assign({}, this._rngGet());
    if (ev.type === 'click' && a === 'rng') { r.k = t.getAttribute('data-k'); r.off = Number(t.getAttribute('data-o')) || 0; if (r.k === 'cal' && !r.f) { const R = this._rngDays(); r.f = this._rngIso(R.days[0]); r.t = this._rngIso(R.days[R.days.length - 1]); } }
    else if (ev.type === 'click' && a === 'rngs') r.off = (r.off || 0) + Number(t.getAttribute('data-v'));
    else if (ev.type === 'change' && (a === 'rngf' || a === 'rngt')) {
      r[a === 'rngf' ? 'f' : 't'] = t.value;
      if (r.f && r.t) { const x = new Date(r.f), y = new Date(r.t); if (Math.abs(y - x) > 30 * 864e5) { if (a === 'rngf') { y.setTime(x.getTime() + 30 * 864e5); r.t = y.toISOString().slice(0, 10); } else { x.setTime(y.getTime() - 30 * 864e5); r.f = x.toISOString().slice(0, 10); } } }
    } else return;
    ev.stopPropagation();
    this._rng = r; try { localStorage.setItem('hkpc_rng', JSON.stringify(r)); } catch (e) { /* brak */ }
    // Nauka: wykres doby pokazuje ostatni dzien zakresu (nie z przyszlosci)
    const R = this._rngDays(), t0 = new Date(); t0.setHours(0, 0, 0, 0);
    if (this._nau) { const last = R.days.filter((d) => d <= t0).pop(); this._nau.dday = last ? Math.round((t0 - last) / 864e5) : 0; this._nau.en = null; }
    this._schRender(); this._nauRender();
  }

  // --- historia planu i pracy dla harmonogramu (ostatnie ~10 dni z historii, starsze godzinowo ze statystyk) ---
  _histIds(k) {
    const m = { co: 'co', noc: 'obnizenie', cwu: 'cwu', cyrk: 'cyrkulacja', grz: 'grzalka', boost: 'podgrzanie' }[k];
    return m ? ['sensor.hp_hist_' + m + '_plan', 'sensor.hp_hist_' + m + '_praca'] : null;
  }
  _histSrc(k) {
    // bez pakietu 1.36: praca liczona z encji zrodlowych, plan = stan harmonogramu
    const E = this._E;
    return {
      // v1.45: obnizenie CO = przesuniecie krzywej w pompie nizsze niz "poza oknem" (input_number.hp_dzien_przesuniecie)
      // v1.47: Tryb CO (tylko podglad): plan = pompa w priorytecie Ogrzewanie, praca = sprezarka na CO
      co: [E.prio, this._hass && this._hass.states['binary_sensor.hp_sprezarka_co'] ? 'binary_sensor.hp_sprezarka_co' : E.cpr, (v) => v === 'on', (v) => v === 'Ogrzewanie'],
      noc: [E.pl_noc, E.offset, (v) => { const dz = this._hass && this._hass.states['input_number.hp_dzien_przesuniecie']; const d = dz ? parseFloat(dz.state) : 0; const x = parseFloat(v); return isFinite(x) && x < (isFinite(d) ? d : 0); }],
      cwu: [E.pl_cwu, E.cpr_cwu, (v) => v === 'on'], cyrk: [E.pl_cyrk, E.hwc_run, (v) => parseFloat(v) > 1],
      grz: [E.pl_grz, E.eladd, (v) => parseFloat(v) > 0.05], boost: [E.pl_boost, E.tmp_lux, (v) => v && v !== 'Wylaczone' && v !== 'unknown' && v !== 'unavailable'],
    }[k];
  }
  _schHist(k) {
    const ids = this._histIds(k); if (!ids || !this._hass) return null;
    const R = this._rngDays(), now = Date.now(), key = k + ':' + R.from + ':' + R.to;
    this._sh = this._sh || {};
    const c = this._sh[key];
    if (c && (c.busy || now - c.at < 300000)) return c.data || null;
    if (R.from >= now) return null;
    const ent = { busy: true, at: now, data: c && c.data };
    this._sh[key] = ent;
    const re = () => { this._schRender(); if (this._nau && this._nau.res) this._nauRender(); };
    this._schHistLoad(k, R).then((d) => { ent.data = d; ent.busy = false; ent.at = Date.now(); re(); })
      .catch((e) => { ent.busy = false; ent.at = Date.now(); ent.data = { err: String(e && (e.message || e.code) || e), plan: [], work: [], hp: {}, hw: {} }; re(); });
    return ent.data || null;
  }
  async _schHistLoad(k, R) {
    const hass = this._hass, st = hass.states, now = Date.now(), ids = this._histIds(k), own = ids.every((i) => st[i]);
    const LIM = now - 10 * 864e5, end = Math.min(R.to, now), hFrom = Math.max(R.from, LIM);
    const out = { plan: [], work: [], hp: {}, hw: {}, own };
    if (hFrom < end) {
      let pid, wid, pOn, wOn;
      if (own) { pid = ids[0]; wid = ids[1]; pOn = (v) => parseFloat(v) >= 50; wOn = pOn; }
      else { const s = this._histSrc(k); pid = s[0]; wid = s[1]; pOn = s[3] || ((v) => v === 'on'); wOn = s[2]; }
      const q = [pid, wid].filter((i) => st[i]);
      if (q.length) {
        const r = (await hass.callApi('GET', 'history/period/' + new Date(hFrom).toISOString() + '?filter_entity_id=' + q.join(',') + '&end_time=' + encodeURIComponent(new Date(end).toISOString()) + '&minimal_response&no_attributes')) || [];
        const by = {}; r.forEach((a) => { if (a && a.length) by[a[0].entity_id] = a; });
        const segs = (arr, on) => { const o = []; let s0 = null; (arr || []).forEach((p) => { const t = Math.max(hFrom, Date.parse(p.last_changed || p.last_updated)); if (isNaN(t)) return; const v = on(p.state); if (v && s0 === null) s0 = t; else if (!v && s0 !== null) { o.push([s0, t]); s0 = null; } }); if (s0 !== null) o.push([s0, end]); return o; };
        out.plan = segs(by[pid], pOn); out.work = segs(by[wid], wOn);
      }
    }
    if (own && R.from < Math.min(LIM, end)) {
      const r = await hass.callWS({ type: 'recorder/statistics_during_period', start_time: new Date(R.from).toISOString(), end_time: new Date(Math.min(LIM, end)).toISOString(), statistic_ids: ids, period: 'hour', types: ['mean'] });
      const conv = (arr) => { const o = {}; (arr || []).forEach((x) => { const t = typeof x.start === 'number' ? x.start : Date.parse(x.start); if (isFinite(t) && x.mean > 0) o[t] = Math.min(1, x.mean / 100); }); return o; };
      out.hp = conv(r && r[ids[0]]); out.hw = conv(r && r[ids[1]]);
    }
    return out;
  }
  // v1.37: Nauka - te same daty co na pasku zakresu: okna Nauki dla dnia tygodnia (zielone), plan wtedy (jasny) i faktyczna praca (czerwony)
  _nauHistRows(k, bl, esc) {
    const RG = this._rngDays(), t0 = new Date(); t0.setHours(0, 0, 0, 0);
    const HS = this._schHist(k), lane = this._schLanes().find((l) => l.k === k), cmp = RG.days.length > 10;
    const DL = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'], now = new Date(), nowMin = now.getHours() * 60 + now.getMinutes();
    const nm = { cyrk: 'pompa cyrkulacji (pompa nie ma czujnika pracy: to, co wysterował sterownik)', cwu: 'grzanie CWU sprężarką' }[k] || 'praca';
    let h = '<div class="nh"><div class="st3">Po datach: plan i faktyczna praca' + this._rngTag() + (lane && this._E ? this._espBadge(lane) : '') + '</div>';
    h += '<div class="ds" style="margin:0 0 .4em">Zielone = okna z Nauki dla tego dnia tygodnia, cienki jasny u góry = plan, który wtedy obowiązywał, czerwony na dole = ' + nm + '.' +
      (HS ? (HS.err ? ' Błąd historii: ' + esc(HS.err) : this._schHistSum(HS, RG)) : ' Wczytuję historię…') + (HS && !HS.own ? ' <i>Bez pakietu ' + PKG_VER + ' tylko ostatnie ~10 dni.</i>' : '') + '</div>';
    h += '<div class="hr dt">' + [0, 3, 6, 9, 12, 15, 18, 21, 24].map((x) => '<span style="left:' + (x / 24 * 100) + '%">' + x + '</span>').join('') + '</div>';
    RG.days.forEach((dt) => {
      const i = (dt.getDay() + 6) % 7, isT = dt.getTime() === t0.getTime(), past = dt < t0;
      h += '<div class="dr' + (past ? ' ps' : '') + (cmp ? ' cp2' : '') + '"><span class="dn dt' + (isT ? ' td' : '') + '">' + DL[i] + ' ' + String(dt.getDate()).padStart(2, '0') + '.' + String(dt.getMonth() + 1).padStart(2, '0') + '</span><div class="tl ro">';
      ((bl && bl[i]) || []).forEach((b) => { h += '<div class="pw" style="left:' + (b.f / 14.4) + '%;width:' + ((b.t - b.f) / 14.4) + '%" title="' + this._schFmt(b.f) + '–' + this._schFmt(b.t) + '"></div>'; });
      if (isT) h += '<div class="nw" style="left:' + (nowMin / 14.4) + '%"></div>';
      h += this._schHistRow(HS, dt.getTime()) + '</div><span class="cp"></span></div>';
    });
    return h + '<div class="lgh"><span><i style="background:rgba(67,194,90,.6);height:.7em"></i>okna z Nauki</span><span><i style="background:#ffe0ef;height:3px"></i>plan wtedy</span><span><i style="background:#ff3b2f;height:10px"></i>faktyczna praca</span></div></div>';
  }
  _schHistRow(H, d0) {
    if (!H) return '';
    const d1 = d0 + 864e5, pc = (t) => ((t - d0) / 864e5 * 100).toFixed(2);
    let h = '';
    const seg = (arr, cls) => arr.forEach(([a, b]) => { if (b <= d0 || a >= d1) return; const x = Math.max(a, d0), y = Math.min(b, d1); h += '<i class="' + cls + '" style="left:' + pc(x) + '%;width:' + Math.max(0.15, (y - x) / 864e5 * 100).toFixed(2) + '%"></i>'; });
    seg(H.plan, 'hp'); seg(H.work, 'hw');
    const hr = (o, cls) => { for (let t = d0; t < d1; t += 36e5) if (o[t]) h += '<i class="' + cls + '" style="left:' + pc(t) + '%;width:4.1667%;opacity:' + Math.max(0.25, o[t]).toFixed(2) + '"></i>'; };
    hr(H.hp, 'hp'); hr(H.hw, 'hw');
    return h ? '<div class="hh">' + h + '</div>' : '';
  }
  _schHistSum(H, R) {
    if (!H) return '';
    const now = Date.now(), lim = (a, b) => Math.max(0, Math.min(b, R.to, now) - Math.max(a, R.from));
    let p = 0, w = 0;
    H.plan.forEach(([a, b]) => { p += lim(a, b); }); H.work.forEach(([a, b]) => { w += lim(a, b); });
    Object.keys(H.hp).forEach((t) => { p += H.hp[t] * 36e5; }); Object.keys(H.hw).forEach((t) => { w += H.hw[t] * 36e5; });
    const hm = (ms) => { const m = Math.round(ms / 60000); return Math.floor(m / 60) + ' h ' + (m % 60) + ' min'; };
    return '<span class="hsum">w zakresie: plan <b>' + hm(p) + '</b> · praca <b style="color:#ff6b5e">' + hm(w) + '</b></span>';
  }

  // --- encja pradu (wybor w Nauce, zapis w HA: input_text.hp_energia_encja) ---
  // v1.38: dwie encje: moc elektryczna (W/kW, input_text.hp_energia_encja) i licznik energii (kWh/Wh, input_text.hp_energia_kwh_encja).
  //        Zgodnosc z v1.36/1.37: licznik kWh zapisany w hp_energia_encja traktujemy jak wybor licznika.
  _enRaw(k) {
    const st = this._hass && this._hass.states, s = st && st[k];
    const id = s && s.state && /^sensor\./.test(s.state) ? s.state : '';
    return id && st[id] ? id : '';
  }
  _enEnt() { const id = this._enRaw('input_text.hp_energia_encja'); return id && /^(W|kW)$/.test(this._enUnit(id)) ? id : ''; }
  _enKwh() {
    const id = this._enRaw('input_text.hp_energia_kwh_encja');
    if (id && /^(Wh|kWh)$/.test(this._enUnit(id))) return id;
    const o = this._enRaw('input_text.hp_energia_encja'); return o && /^(Wh|kWh)$/.test(this._enUnit(o)) ? o : '';
  }
  _enUnit(id) { const s = this._hass.states[id]; return String((s && s.attributes && s.attributes.unit_of_measurement) || ''); }
  async _enLoad() {
    const hass = this._hass, st = hass.states, R = this._rngDays(), now = Date.now(), end = Math.min(R.to, now);
    if (R.from >= now) return { err: 'Zakres w przyszłości.' };
    const sel = this._enEnt(), kw = this._enKwh(), elId = sel || (st['sensor.hp_moc_elektryczna'] ? 'sensor.hp_moc_elektryczna' : '');
    const elDiv = /^w$/i.test(this._enUnit(elId || '')) ? 1000 : 1, kwDiv = /^wh$/i.test(kw ? this._enUnit(kw) : '') ? 1000 : 1, elKwh = false;
    const hMet = ['sensor.hp_cieplo_co_dzis', 'sensor.hp_cieplo_cwu_dzis'].filter((i) => st[i]);
    const ids = ['sensor.hp_moc_grzewcza'].concat(elId ? [elId] : [], kw ? [kw] : [], hMet).filter((i, k, a) => st[i] && a.indexOf(i) === k);
    const r = (await hass.callWS({ type: 'recorder/statistics_during_period', start_time: new Date(R.from).toISOString(), end_time: new Date(end).toISOString(), statistic_ids: ids, period: 'hour', types: ['mean', 'change'] })) || {};
    const ser = (id, f) => { const o = {}; (r[id] || []).forEach((x) => { const t = typeof x.start === 'number' ? x.start : Date.parse(x.start); const v = f(x); if (isFinite(t) && v !== null && isFinite(v)) o[t] = v; }); return o; };
    const hP = ser('sensor.hp_moc_grzewcza', (x) => (x.mean === null || x.mean === undefined ? null : x.mean));
    // v1.38: moc z encji mocy (srednie godzinowe), kWh z licznika (przyrost w godzinie); bez licznika kWh = moc x 1 h, bez mocy = kWh / 1 h
    let eP = elId ? ser(elId, (x) => (x.mean === null || x.mean === undefined ? null : x.mean / elDiv)) : {};
    let eE = kw ? ser(kw, (x) => (x.change === null || x.change === undefined ? null : Math.max(0, x.change / kwDiv))) : eP;
    if (kw && !sel && !Object.keys(eP).length) eP = eE;
    // cieplo kWh: liczniki ciepla CO + CWU (zmiana na godzine), bez nich calka z mocy grzewczej (srednia godzinowa x 1 h)
    // v1.37: gdy liczniki stoja (na SMO40 rejestry licznikow ciepla daja 0), tez calka z mocy
    let hE = hP, hSrc = 'calka';
    if (hMet.length === 2 && r[hMet[0]] && r[hMet[0]].length) {
      const a = ser(hMet[0], (x) => (x.change === null || x.change === undefined ? null : Math.max(0, x.change))), b = ser(hMet[1], (x) => (x.change === null || x.change === undefined ? null : Math.max(0, x.change)));
      const m = {}; Object.keys(a).forEach((t) => { m[t] = a[t] + (b[t] || 0); });
      const sm = Object.values(m).reduce((x, y) => x + y, 0), sp = Object.values(hP).reduce((x, y) => x + y, 0);
      if (sm > 0.05 && sm >= 0.5 * sp) { hE = m; hSrc = 'licznik'; } else if (sp > 0.3) hSrc = 'calka0';
    }
    return { R, hP, eP, hE, eE, elId, sel, kw, elKwh, hSrc, at: now };
  }
  _enHtml(esc) {
    const N = this._nau, st = this._hass.states, R = this._rngDays(), key = R.from + ':' + R.to + ':' + (st['input_text.hp_energia_encja'] || {}).state + ':' + (st['input_text.hp_energia_kwh_encja'] || {}).state;
    let h = '<div class="sec en"><div class="st2">Moc i energia: ciepło vs prąd' + this._rngTag() + '<small> – godzinowe statystyki HA</small></div>';
    const own = (i) => /^sensor\.hp_(moc_grzewcza|cieplo_|moc_elektryczna|prad_)/.test(i);
    const cW = Object.keys(st).filter((i) => i.startsWith('sensor.') && /^(W|kW)$/.test(this._enUnit(i)) && !own(i)).sort();
    const cE = Object.keys(st).filter((i) => i.startsWith('sensor.') && /^(Wh|kWh)$/.test(this._enUnit(i)) && !own(i)).sort();
    const sel = this._enEnt(), kw = this._enKwh(), hasW = !!st['input_text.hp_energia_encja'], hasE = !!st['input_text.hp_energia_kwh_encja'];
    const opt = (l, cur) => l.map((i) => '<option value="' + i + '"' + (i === cur ? ' selected' : '') + '>' + esc(((st[i].attributes || {}).friendly_name || i) + ' – ' + i + ' (' + this._enUnit(i) + ')') + '</option>').join('');
    h += '<div class="lh wk"><label>Moc elektryczna: <select data-a="enent"' + (hasW ? '' : ' disabled') + '><option value="">– brak (szacunek pakietu) –</option>' + opt(cW, sel) + '</select></label>' +
      '<label>Energia elektryczna (licznik): <select data-a="enkwh"' + (hasE ? '' : ' disabled') + '><option value="">– brak (z mocy w czasie) –</option>' + opt(cE, kw) + '</select></label>' +
      '<span class="ds">' + (hasW && hasE ? 'Wybierasz z listy encji HA, niczego nie trzeba przemianowywać. Moc idzie na kafel „Moc elektr.” na głównej i na wykres mocy, licznik na kafel „Prąd dziś” (przyrost od północy) i na wykres kWh. Bez mocy: szacunek <code>sensor.hp_moc_elektryczna</code> (prąd jednostki × 230 V + grzałka); bez licznika: kWh z mocy w czasie.'
        : 'brak <code>input_text.hp_energia_kwh_encja</code>: zaktualizuj pakiet do ' + PKG_VER + ' (do tego czasu jedna lista jak w v1.37)') + '</span></div>';
    if (!N.en || N.en.key !== key) { if (!N.enBusy) { N.enBusy = true; this._enLoad().then((d) => { N.en = { key, d }; N.enBusy = false; this._nauRender(); }).catch((e) => { N.en = { key, d: { err: String(e && (e.message || e.code) || e) } }; N.enBusy = false; this._nauRender(); }); } return h + '<div class="info">Liczę…</div></div>'; }
    const D = N.en.d; if (D.err) return h + '<div class="info">' + esc(D.err) + '</div></div>';
    const A = R.from, B = Math.min(R.to, Date.now()), span = R.to - R.from;
    const ts = Object.keys(D.hP).concat(Object.keys(D.eP)).map(Number).filter((t, k, a) => a.indexOf(t) === k).sort((x, y) => x - y);
    if (!ts.length && !Object.keys(D.eE).length) return h + '<div class="info">Brak godzinowych statystyk w tym zakresie (HA liczy je co godzinę, pierwsze po ok. 1 h od dodania czujników).</div></div>';
    const X0 = 46, X1 = 590, sx = (t) => X0 + (t - A) / span * (X1 - X0);
    const axisX = (y) => { let g = ''; const st2 = R.days.length <= 2 ? 6 * 36e5 : R.days.length <= 7 ? 864e5 : 7 * 864e5; for (let t = A; t <= R.to; t += st2) { const d = new Date(t); g += '<line x1="' + sx(t) + '" y1="20" x2="' + sx(t) + '" y2="' + y + '" stroke="rgba(255,255,255,.07)"/><text x="' + sx(t) + '" y="' + (y + 14) + '" text-anchor="middle">' + (st2 < 864e5 ? String(d.getHours()).padStart(2, '0') + ':00' : d.getDate() + '.' + (d.getMonth() + 1)) + '</text>'; } return g; };
    // (1) moc: linie godzinowe
    const pv = ts.map((t) => D.hP[t]).concat(ts.map((t) => D.eP[t])).filter((v) => isFinite(v));
    const hi = Math.max(1, Math.ceil(Math.max(...pv, 0))), Y0 = 24, Y1 = 170, sy = (v) => Y1 - v / hi * (Y1 - Y0);
    const pl = (o, col, dash) => { const p = ts.filter((t) => isFinite(o[t])).map((t) => (sx(t + 18e5)).toFixed(1) + ',' + sy(o[t]).toFixed(1)); return p.length > 1 ? '<polyline points="' + p.join(' ') + '" fill="none" stroke="' + col + '" stroke-width="2"' + (dash ? ' stroke-dasharray="5 4"' : '') + ' stroke-linejoin="round"/>' : ''; };
    let g = axisX(Y1); for (let v = 0; v <= hi; v += Math.max(1, Math.ceil(hi / 5))) g += '<line x1="' + X0 + '" y1="' + sy(v) + '" x2="' + X1 + '" y2="' + sy(v) + '" stroke="rgba(255,255,255,.07)"/><text x="' + (X0 - 6) + '" y="' + (sy(v) + 4) + '" text-anchor="end">' + v + ' kW</text>';
    const elN = D.elId ? ((st[D.elId] && st[D.elId].attributes.friendly_name) || D.elId) : 'brak';
    h += '<div class="st2" style="font-size:1em">Moc grzewcza vs moc elektryczna (średnie godzinowe)</div><svg viewBox="0 0 600 190" style="width:100%;max-width:60em;height:auto;display:block"><g font-size="11" fill="#c8d0da">' + g + '</g>' + pl(D.hP, '#ff9100') + pl(D.eP, '#29b6f6', true) +
      '<g font-size="12"><line x1="60" y1="10" x2="84" y2="10" stroke="#ff9100" stroke-width="2.5"/><text x="90" y="14" fill="#e3e8ee">Moc grzewcza</text><line x1="220" y1="10" x2="244" y2="10" stroke="#29b6f6" stroke-width="2.5" stroke-dasharray="5 4"/><text x="250" y="14" fill="#e3e8ee">' + esc(false ? 'prąd: encja kWh, moc tylko na wykresie energii' : 'Moc elektryczna') + '</text></g></svg>';
    // (2) energia: slupki dzien (albo godzina, gdy zakres <= 2 dni)
    const hourly = R.days.length <= 2, bk = (t) => { if (hourly) return t; const d = new Date(Number(t)); d.setHours(0, 0, 0, 0); return d.getTime(); };
    const agg = (o) => { const a = {}; Object.keys(o).forEach((t) => { const k = bk(Number(t)); a[k] = (a[k] || 0) + o[t]; }); return a; };
    const he = agg(D.hE), ee = agg(D.eE), keys = (hourly ? ts : R.days.map((d) => d.getTime())).filter((t) => t < B);
    const sh = Object.values(he).reduce((x, y) => x + y, 0), se = Object.values(ee).reduce((x, y) => x + y, 0);
    const mx = Math.max(0.5, ...keys.map((t) => Math.max(he[t] || 0, ee[t] || 0))), BY0 = 24, BY1 = 170, by = (v) => BY1 - v / mx * (BY1 - BY0);
    const bw = (X1 - X0) / Math.max(1, hourly ? span / 36e5 : R.days.length);
    let g2 = axisX(BY1); [0, mx / 2, mx].forEach((v) => { g2 += '<text x="' + (X0 - 6) + '" y="' + (by(v) + 4) + '" text-anchor="end">' + v.toFixed(v < 10 ? 1 : 0) + '</text>'; });
    keys.forEach((t) => { const x = sx(t); g2 += '<rect x="' + (x + bw * 0.08).toFixed(1) + '" y="' + by(he[t] || 0).toFixed(1) + '" width="' + (bw * 0.4).toFixed(1) + '" height="' + (BY1 - by(he[t] || 0)).toFixed(1) + '" fill="#ff9100"><title>ciepło ' + (he[t] || 0).toFixed(2) + ' kWh</title></rect>' +
      '<rect x="' + (x + bw * 0.5).toFixed(1) + '" y="' + by(ee[t] || 0).toFixed(1) + '" width="' + (bw * 0.4).toFixed(1) + '" height="' + (BY1 - by(ee[t] || 0)).toFixed(1) + '" fill="#29b6f6"><title>prąd ' + (ee[t] || 0).toFixed(2) + ' kWh</title></rect>'; });
    h += '<div class="st2" style="font-size:1em;margin-top:.8em">Ciepło kWh vs prąd kWh (' + (hourly ? 'na godzinę' : 'na dzień') + ')</div><svg viewBox="0 0 600 190" style="width:100%;max-width:60em;height:auto;display:block"><g font-size="11" fill="#c8d0da">' + g2 + '</g>' +
      '<g font-size="12"><rect x="60" y="4" width="14" height="10" fill="#ff9100"/><text x="80" y="14" fill="#e3e8ee">Ciepło</text><rect x="160" y="4" width="14" height="10" fill="#29b6f6"/><text x="180" y="14" fill="#e3e8ee">Prąd</text></g></svg>';
    h += '<div class="kt" style="margin-top:.6em"><div class="k"><span>Ciepło w zakresie</span><b>' + sh.toFixed(1) + ' kWh</b><i>' + (D.hSrc === 'licznik' ? 'liczniki ciepła CO + CWU z pompy' : D.hSrc === 'calka0' ? 'policzone z mocy grzewczej (średnia godzinowa × 1 h): liczniki ciepła z pompy stoją na 0' : 'policzone z mocy grzewczej (średnia godzinowa × 1 h), brak liczników ciepła') + '</i></div>' +
      '<div class="k"><span>Prąd w zakresie</span><b>' + se.toFixed(1) + ' kWh</b><i>' + (D.kw ? esc((st[D.kw] && st[D.kw].attributes.friendly_name) || D.kw) + ' (licznik)' : esc(elN) + (D.sel ? ' (z mocy × 1 h)' : ' (szacunek pakietu × 1 h)')) + '</i></div>' +
      '<div class="k"><span>COP w zakresie</span><b>' + (se > 0.05 ? (sh / se).toFixed(2) : '–') + '</b><i>ciepło / prąd</i></div></div>';
    return h + '</div>';
  }

  // --- maski planu 7 dni x 96 kwadransow (hex, Pn..Nd), jak w pakiecie ---
  // ov = kwadrans wlaczony, gdy okno na nim cokolwiek zachodzi (plan HA); bez ov = poczatek kwadransu w oknie (plan do ESP)
  _mask(bl, ov) {
    let h = '';
    for (let d = 0; d < 7; d++) for (let q = 0; q < 24; q++) {
      let v = 0;
      for (let i = 0; i < 4; i++) { const m = (q * 4 + i) * 15; if ((bl[d] || []).some((b) => (ov ? b.t > m && b.f < m + 15 : b.f <= m && m < b.t))) v += 1 << (3 - i); }
      h += v.toString(16);
    }
    return h;
  }
  _maskBl(hex) {
    const out = [];
    for (let d = 0; d < 7; d++) {
      const bl = []; let st = null;
      for (let k = 0; k <= 96; k++) {
        const on = k < 96 && ((parseInt(hex[d * 24 + (k >> 2)], 16) >> (3 - (k & 3))) & 1) === 1;
        if (on && st === null) st = k;
        if (!on && st !== null) { bl.push({ f: st * 15, t: k * 15 }); st = null; }
      }
      out.push(bl);
    }
    return out;
  }
  // v1.46: automatyczne obnizenie CO: sen = odwrotnosc planu cyrkulacji (HA: input_text.hp_cyrk_plan, bez niego Nauka karty),
  //        opcjonalnie + droga strefa G12 (input_boolean.hp_auto_noc_g12). Pusty dom HA obsluguje na biezaco (nie ma go w planie).
  _nocPlan() {
    const st = this._hass && this._hass.states, N = this._nau; if (!st) return null;
    const pl = st[this._E.cyrk_plan], inv = (h) => h.split('').map((c) => (15 - parseInt(c, 16)).toString(16)).join('');
    let m = null;
    if (pl && /^[0-9a-f]{168}$/.test(pl.state)) m = inv(pl.state);
    else if (N && N.res && N.res.cyrk) m = inv(this._mask(N.edit || this._nauBase(N.res.cyrk), false));
    if (!m) return null;
    if (st['input_boolean.hp_auto_noc_g12'] && st['input_boolean.hp_auto_noc_g12'].state === 'on') {
      const g = inv(this._mask(this._g12().day, false));
      m = m.split('').map((c, i) => (parseInt(c, 16) | parseInt(g[i], 16)).toString(16)).join('');
    }
    return this._maskBl(m);
  }
  // okna obnizenia CO na dzien tygodnia (0 = Pn): auto -> _nocPlan, reczny harmonogram -> okna z HA, wylaczone -> null
  _nocWins() {
    const st = this._hass.states, on = (i) => st[i] && st[i].state === 'on';
    if (on('input_boolean.hp_auto_noc')) return this._nocPlan();
    if (!on('input_boolean.hp_plan_noc') || !this._sch || !this._sch.data || !this._sch.data.noc) return null;
    const it = this._schFromItem(this._sch.data.noc); return this._schDays().map((d) => it[d] || []);
  }
  _nauCoHtml(esc) {
    const st = this._hass.states, E = this._E, au = st['input_boolean.hp_auto_noc'], g = st['input_boolean.hp_auto_noc_g12'];
    const auOn = au && au.state === 'on', gOn = g && g.state === 'on', pr = st['input_number.hp_noc_przesuniecie'], dz = st['input_number.hp_dzien_przesuniecie'];
    const off = st[E.offset], OB = this._obecStan();
    const W = this._nocWins(), now = new Date(), wd = (now.getDay() + 6) % 7, mm = now.getHours() * 60 + now.getMinutes();
    const inW = !!(W && (W[wd] || []).some((b) => b.f <= mm && mm < b.t));
    const pusto = auOn && !OB.none && !OB.unav && OB.n === 0;
    let h = '<div class="sec"><div class="st2">Obniżenie CO: automatycznie z Nauki</div>';
    h += '<div class="lh"><button class="tg' + (auOn ? ' on' : '') + '" data-a="autonoc"' + (au ? '' : ' disabled') + ' title="Automatyzacja obniżenia CO"><i></i></button><b>Automatyzacja obniżenia CO: ' + (au ? (auOn ? 'włączona' : 'wyłączona') : 'brak') + '</b>' +
      '<span>Teraz: <b>' + (inW || pusto ? 'obniżone' : 'normalnie') + '</b>' + (auOn ? ' · powód: ' + (inW ? 'pora snu' + (gOn ? ' albo droga strefa G12' : '') : pusto ? 'nikogo ze wskazanych w domu' : 'ktoś jest i nie śpi') : '') +
      ' · przesunięcie krzywej w pompie: <b>' + (off ? esc(off.state) : '–') + '</b> (w oknie ' + (pr ? Number(pr.state) : '–') + ', poza ' + (dz ? Number(dz.state) : '–') + ')</span></div>';
    if (!au) return h + '<div class="info">Brak <code>input_boolean.hp_auto_noc</code>: zaktualizuj pakiet do ' + PKG_VER + ' (Diagnostyka → Napraw pakiet).</div></div>';
    h += '<div class="lh wk"><label><input type="checkbox" data-a="autonocg12"' + (gOn ? ' checked' : '') + (g ? '' : ' disabled') + '> obniżaj też w drogiej strefie G12</label></div>';
    h += '<div class="wn" style="margin:-.3em 0 .8em">Włączona: HA sam obniża krzywą w porze snu (od snu do ' + 'początku okna cyrkulacji przed wstaniem, z tego samego planu co cyrkulacja) i gdy nikogo ze wskazanych nie ma w domu dłużej niż czas „po wyjściu”' + (gOn ? ', oraz w drogiej strefie G12' : '') + '. Imitacja obecności = ktoś jest. Okna widać w Harmonogramie → Obniżenie CO i na wykresie doby (Zasilanie CO). Wartości przesunięcia ustawiasz w Harmonogramie.</div>';
    return h + '</div>';
  }
  // --- karta -> HA: model cyrkulacji z Nauki (HA sam z niego liczy plan, gdy karta zamknieta) ---
  _cyrkPub() {
    const N = this._nau, hass = this._hass, E = this._E;
    const Y = N && N.res && N.res.cyrk; if (!Y || N.loading || !hass) return;
    const sm = hass.states[E.cyrk_model], so = hass.states[E.cyrk_obec]; if (!sm || !so) return;
    if (Date.now() - (N.pubAt || 0) < 10000) return;
    const W = this._nauWake(Y), SS = this._nauSleepStart(Y);
    const model = ['1', Math.round(W.pre), Math.round(W.wd.m), Math.round(W.we.m), W.on && !N.edit ? 1 : 0, W.wd.src === 'ręcznie' ? 1 : 0, W.we.src === 'ręcznie' ? 1 : 0,
      SS.map((s) => Math.round(s.early ? 1440 + s.early : s.end)).join(',')].join(';');
    const ob = this._mask(N.edit || Y.blocks || [], true);
    if (sm.state === model && so.state === ob) return;
    N.pubAt = Date.now();
    if (so.state !== ob) hass.callService('input_text', 'set_value', { entity_id: E.cyrk_obec, value: ob });
    if (sm.state !== model) hass.callService('input_text', 'set_value', { entity_id: E.cyrk_model, value: model });
  }
  // --- Harmonogram: znacznik "zapisany do ESP" przy oknach ---
  _espBadge(l, short) {
    const st = this._hass.states, E = this._E, S = this._sch, pe = st[E.esp_plan];
    const esc2 = (x) => String(x).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    // v1.37: powiedz wprost, czemu nie idzie do ESP
    if (!pe || pe.state === 'unavailable') return '<span class="esp w" title="ESP musi mieć wgrany plik v5.5 lub nowszy (encje text „Plan offline …”) i być online">⚠ nie idzie do ESP: ' + (!pe ? 'brak encji „Plan offline” (wgraj ESP v5.6)' : 'ESP offline') + '</span>';
    const au = Object.keys(st).find((i) => i.startsWith('automation.') && st[i].attributes && st[i].attributes.id === 'hp_esp_plan');
    if (!au) return '<span class="esp w" title="Automatyzacja hp_esp_plan z pakietu wysyła plan co 5 min i po każdej zmianie">⚠ nie idzie do ESP: brak automatyzacji „wyślij plan tygodnia do ESP” (zaktualizuj pakiet)</span>';
    if (st[au].state !== 'on') return '<span class="esp w">⚠ nie idzie do ESP: automatyzacja „wyślij plan tygodnia do ESP” wyłączona</span>';
    const eid = { cwu: E.esp_cwu, cyrk: E.esp_cyrk, noc: E.esp_noc, grz: E.esp_grz }[l.k];
    if (!eid) return '<span class="esp n">ESP tego nie wykonuje (tylko HA)</span>';
    const es = st[eid]; if (!es) return '';
    let want;
    const pl = st[E.cyrk_plan];
    const pc = st[E.cwu_plan];
    let src = '';
    if (l.k === 'cyrk' && this._schAuto(l) && pl && /^[0-9a-f]{168}$/.test(pl.state)) { want = pl.state; src = 'plan z Nauki (auto)'; }
    else if (l.k === 'cwu' && this._schAuto(l) && pc && /^[0-9a-f]{168}$/.test(pc.state)) { want = pc.state; src = 'plan z Nauki (auto)'; }
    else {
      src = this._schAuto(l) ? 'okna harmonogramu (auto)' : 'Twoje okna';
      const cur = S.data[l.k] ? this._schFromItem(S.data[l.k]) : {}, days = this._schDays();
      const bl = days.map((d) => cur[d] || []);
      if (l.k === 'cwu' && this._schAuto(l) && !bl.some((x) => x.length)) want = this._mask(this._g12().day, false);
      else want = this._mask(bl, false);
    }
    const pv = String(pe.state).split(','), at = pv.length >= 9 ? pv[8] : '';
    const m = /(\d{4})-(\d{2})-(\d{2}) (\d{2}:\d{2})/.exec(at);
    const atTxt = m ? m[3] + '.' + m[2] + ' ' + m[4] : at;
    // v1.39: zrodlo planu, wynik ostatniego sprawdzenia ESP (input_text.hp_esp_plan_status), kiedy sprawdzone, przycisk "Wyslij teraz"
    const ss = st[E.esp_stat], lt = st[au].attributes && st[au].attributes.last_triggered;
    const ltD = lt ? new Date(lt) : null, ltTxt = ltD && !isNaN(ltD) ? ltD.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }) : '';
    const btn = '<button data-a="espnow" title="Uruchom teraz automatyzację „wyślij plan tygodnia do ESP”: porówna z tym, co ESP ma w sobie, i dośle braki">Wyślij teraz</button>';
    const tail = short ? ' <span class="ds">(' + esc2(src) + ')</span>' : ' <span class="ds">(' + esc2(src) + (ltTxt ? ', sprawdzone ' + ltTxt : '') + ')</span>' + (ss && ss.state && ss.state !== 'OK' && !/^(unknown|unavailable)$/.test(ss.state) ? ' <span class="esp w">⚠ ' + esc2(ss.state) + '</span>' : '') + btn;
    return (es.state === want ? '<span class="esp ok" title="Okna tego harmonogramu są w pamięci ESP (plan offline)">✓ zapisany do ESP ' + atTxt + '</span>'
      : '<span class="esp w" title="Automatyzacja „wyślij plan tygodnia do ESP” wysyła od razu po każdej zmianie i co 5 min">⏳ ' + (this._espKickAt && Date.now() - this._espKickAt < 180000 ? 'wysłane do ESP ' + new Date(this._espKickAt).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }) + ', czekam na potwierdzenie' : 'jeszcze nie w ESP') + '</span>') + tail;
  }
  // v1.39: linia "teraz" pod naglowkiem harmonogramu: CWU = strefa G12 -> jaki tryb powinien byc i co ma pompa; cyrkulacja = co ustawil HA + obecnosc
  _schNowHtml(l, esc) {
    const st = this._hass.states, E = this._E, hm = (d) => (d && !isNaN(d) ? d.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }) : '–');
    const auId = (id) => Object.keys(st).find((i) => i.startsWith('automation.') && st[i].attributes && st[i].attributes.id === id);
    if (l.k === 'cwu') {
      const pump = st[E.hwmode] ? st[E.hwmode].state : null, auto = this._schAuto(l), en = st[l.en] && st[l.en].state === 'on';
      const sv = (id, d) => (st[id] && !/^(unknown|unavailable|)$/.test(st[id].state) ? st[id].state : d);
      const tan = st[E.g12_tania] && st[E.g12_tania].state === 'on', sch = st[l.sch], ne = sch && sch.attributes && sch.attributes.next_event;
      let want = null, why = '', auName = '';
      if (auto) {
        const okno = tan && (ne ? sch.state === 'on' : true), doT = Number(sv(E.g12_do, 9999)), cz = Number(sv(E.cwu_wait, 30));
        want = okno ? sv(E.cwu_tania, 'Ekonomiczny') : (doT <= cz ? 'Ekonomiczny' : sv(E.cwu_poza, 'Normalny'));
        why = 'strefa ' + (tan ? 'tania' : 'droga') + (tan && !okno ? ' (Nauka ją pomija)' : '') + (!okno && doT <= cz ? ', za ' + Math.round(doT) + ' min tania (czeka)' : '');
        auName = 'hp_auto_cwu';
      } else if (en) {
        want = sch && sch.state === 'on' ? sv('input_select.hp_cwu_tryb_w_oknie', 'Luksus') : sv(E.cwu_poza, 'Normalny');
        why = sch && sch.state === 'on' ? 'w oknie' : 'poza oknem'; auName = 'hp_plan_cwu';
      }
      if (!want) return '<div class="now"><span>Tryb CWU w pompie: <b>' + esc(pump || '–') + '</b> (harmonogram wyłączony, nic go nie zmienia)</span></div>';
      const boost = st[E.cwu_boost] && !/^(unknown|unavailable|)$/.test(st[E.cwu_boost].state);
      const ai = auId(auName), aOff = !ai || st[ai].state !== 'on';
      const ok = pump === want;
      return '<div class="now"><span>Teraz: ' + esc(why) + ' → powinno być <b>' + esc(want) + '</b></span><span>pompa ma: <b class="' + (ok ? 'good' : 'bad') + '">' + esc(pump || '–') + '</b></span>' +
        (ok ? '' : '<span class="bad">' + (boost ? 'trwa luksus jednorazowy (po nim wróci)' : aOff ? 'automatyzacja „' + (auto ? 'HP auto: CWU wg taryfy G12' : 'HP plan: tryb CWU wg godzin') + '” ' + (ai ? 'wyłączona' : 'nie istnieje (zaktualizuj pakiet)') : 'HA ustawia to co minutę: jeśli dalej się nie zgadza, ESP / sterownik nie przyjmuje zapisu (rejestr 47041)') + '</span>') + '</div>';
    }
    if (l.k === 'cyrk') {
      const run = parseFloat((st[E.hwc_run] || {}).state), still = parseFloat((st[E.hwc_still] || {}).state);
      const off = !isNaN(run) && run <= 1 && still >= 60, OB = this._obecStan();
      const ob = OB.none ? '<span class="bad">nie wskazano osób (Nauka → Źródła → Obecność), HA nie reaguje na obecność</span>' : OB.unav ? '<span class="bad">wskazane osoby niedostępne, HA nic nie zmienia</span>' : OB.n > 0 ? 'w domu (wskazani): <b>' + OB.n + '</b>' : 'pusto od <b>' + hm(OB.od) + '</b>';
      return '<div class="now"><span>HA ustawił cyrkulację: <b class="' + (off ? '' : 'good') + '">' + (isNaN(run) ? '–' : off ? 'wyłączona' : 'pracuje') + '</b>' + (isNaN(run) ? '' : ' (praca ' + run + ' / postój ' + still + ' min)') + '</span><span>' + ob + '</span>' +
        (off ? '<span class="ds">Jeśli pompka mimo to kręci, to nie wisi na wyjściu sterownika (AA3-X7), tylko na stałej fazie.</span>' : '') + '</div>';
    }
    return '';
  }
  // v1.39: Nauka - maly pasek obecnosci domownikow (person.* / telefony): w domu / poza, od kiedy
  _obecHtml(esc) {
    const st = this._hass.states, OB = this._obecStan();
    const od = (t) => { const d = typeof t === 'string' ? new Date(t) : t; if (!d || isNaN(d)) return ''; const x = d.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }); return d.toDateString() === new Date().toDateString() ? x : d.toLocaleDateString('pl-PL', { weekday: 'short' }) + ' ' + x; };
    if (OB.none) return '<div class="obc"><b>Obecność:</b><span class="p a" style="border-color:#ffb300;color:#ffd9a0">nie wskazano osób: dodaj je niżej w „Źródła nauki → Obecność”. Do tego czasu cyrkulacja nie reaguje na obecność.</span></div>';
    return '<div class="obc"><b>Obecność:</b>' + OB.ids.map((i) => {
      const s = st[i]; if (!s) return '<span class="p a">' + esc(i) + ' ❔ brak encji</span>';
      const home = s.state === 'home', nm = (s.attributes && s.attributes.friendly_name) || i.split('.')[1];
      const where = home ? '🏠 w domu' : s.state === 'not_home' ? '🚶 poza' : /^(unknown|unavailable)$/.test(s.state) ? '❔ nieznane' : '📍 ' + s.state;
      return '<span class="p ' + (home ? 'h' : 'a') + '" data-a="more" data-e="' + i + '">' + esc(nm) + ' ' + where + ' od ' + od(s.last_changed) + '</span>';
    }).join('') + (OB.imit ? '<span class="p h" data-a="obimit" title="Kliknij, żeby wyłączyć imitację" style="border-style:dashed;cursor:pointer">Wymuszone (imitacja) 🏠 do ' + od(OB.imDo) + ' ✕</span>' : '') +
      '<span class="ds">' + (OB.unav ? 'wszyscy niedostępni: HA nic nie zmienia' : OB.n > 0 ? 'w domu: ' + OB.n + (OB.imit ? ' (wymuszone)' : '') : 'pusto od ' + od(OB.od)) + ' (liczone tylko z tej listy)</span></div>';
  }

  // --- tryb CWU -> klasa koloru: Luksus rozowy, Normalny fioletowy, Ekonomiczny zielony ---
  _cwuCls(name) { const n = String(name || '').toLowerCase(); return n.indexOf('luks') >= 0 ? 'L' : n.indexOf('eko') >= 0 ? 'E' : n.indexOf('smart') >= 0 ? 'S' : 'N'; }
  _cwuLeg() { return '<span>Kolory: <i class="L"></i>Luksus <i class="N" style="margin-left:.6em"></i>Normalny <i class="E" style="margin-left:.6em"></i>Ekonomiczny</span>'; }

  // --- Nauka: pamieci krzywej (wzorcowa / robocza w HA, fabryczna w kodzie) ---
  _krzIds() { return { wz: 'input_text.hp_krzywa_wzorcowa', ro: 'input_text.hp_krzywa_robocza' }; }
  _krzSaved(k) {
    const s = this._hass.states[this._krzIds()[k]]; if (!s) return null;
    const a = String(s.state).split(',').map((x) => parseFloat(x));
    return a.length === 7 && a.every((x) => isFinite(x)) ? a : null;
  }
  _krzBuf(k) {
    const N = this._nau; N.kv = N.kv || {};
    if (!N.kv[k]) N.kv[k] = (this._krzSaved(k) || KRZ_FAB).slice();
    return N.kv[k];
  }
  _krzLim(i) {
    const s = this._hass.states[this._E['p' + (i + 1)]], a = (s && s.attributes) || {};
    return { mn: isFinite(Number(a.min)) ? Number(a.min) : 5, mx: isFinite(Number(a.max)) ? Number(a.max) : 80, cur: s ? parseFloat(s.state) : NaN };
  }
  _krzPt(t) {
    const N = this._nau, k = N.kc || 'wz', i = Number(t.getAttribute('data-i')), b = this._krzBuf(k), L = this._krzLim(i);
    const v = parseFloat(String(t.value).replace(',', '.'));
    if (isFinite(v)) b[i] = Math.max(L.mn, Math.min(L.mx, Math.round(v)));
    this._nauRender();
  }
  _krzClick(a, t) {
    const N = this._nau, hass = this._hass, k = N.kc || 'wz';
    if (a === 'ksel') { N.kc = t.getAttribute('data-v'); this._nauRender(); return true; }
    if (a === 'kfab') { N.kv = N.kv || {}; N.kv[k] = KRZ_FAB.slice(); this._nauRender(); return true; }
    if (a === 'kload') { N.kv = N.kv || {}; N.kv[k] = (this._krzSaved(k) || KRZ_FAB).slice(); this._nauRender(); return true; }
    if (a === 'ksave') {
      const id = this._krzIds()[t.getAttribute('data-k')]; if (!hass.states[id]) return true;
      hass.callService('input_text', 'set_value', { entity_id: id, value: this._krzBuf(t.getAttribute('data-k')).join(',') });
      return true;
    }
    if (a === 'ksend') { N.kconf = { k, v: this._krzBuf(k).slice() }; this._nauRender(); return true; }
    if (a === 'kno') { N.kconf = null; this._nauRender(); return true; }
    if (a === 'kyes') {
      const c = N.kconf; N.kconf = null; if (!c) return true;
      const ps = [];
      c.v.forEach((v, i) => { const id = this._E['p' + (i + 1)], L = this._krzLim(i); if (hass.states[id] && L.cur !== v) ps.push(hass.callService('number', 'set_value', { entity_id: id, value: v })); });
      this._nauRender();
      if (ps.length) this._nauOk('[data-a="ksend"]', Promise.all(ps));
      return true;
    }
    return false;
  }
  _krzHtml(esc) {
    const N = this._nau, st = this._hass.states, k = N.kc || 'wz', ids = this._krzIds(), b = this._krzBuf(k), sv = this._krzSaved(k);
    const NM = { wz: 'Wzorcowa', ro: 'Robocza' }, NA = { wz: 'wzorcową', ro: 'roboczą' };
    let h = '<div class="km"><div class="st2">Pamięci krzywej (P1–P7)<small> zapis w HA, do pompy dopiero po „Wyślij na główną” i potwierdzeniu</small></div>';
    h += '<div class="kb">' + ['wz', 'ro'].map((x) => '<button data-a="ksel" data-v="' + x + '" class="' + (x === k ? 'on' : '') + '">' + NM[x] + (this._krzSaved(x) ? '' : ' (pusta)') + '</button>').join('') +
      '<span class="ds">Fabryczna (stała, tylko do przywołania): ' + KRZ_FAB.map((v, i) => 'P' + (i + 1) + ' ' + v).join(' · ') + ' °C</span></div>';
    h += '<div class="kp">' + [6, 5, 4, 3, 2, 1, 0].map((i) => {
      const ch = sv ? sv[i] !== b[i] : true, L = this._krzLim(i);
      return '<label><b>P' + (i + 1) + '</b><span>' + ['-30', '-20', '-10', '0', '10', '20', '30'][i] + ' °C</span><input type="number" data-a="kpt" data-i="' + i + '" min="' + L.mn + '" max="' + L.mx + '" step="1" class="' + (ch ? 'ch' : '') + '" value="' + b[i] + '"><span>pompa: ' + (isNaN(L.cur) ? '–' : L.cur) + '</span></label>';
    }).join('') + '</div>';
    const dirty = !sv || sv.some((v, i) => v !== b[i]);
    h += '<div class="ka">' + (st[ids[k]] ? '<button data-a="ksave" data-k="' + k + '">Zapisz ' + NA[k] + '</button>' : '<span class="ds">brak <code>' + ids[k] + '</code>: wklej / zainstaluj pakiet ' + PKG_VER + '</span>') +
      (sv && dirty ? '<button data-a="kload">Cofnij do zapisanej</button>' : '') + '<button data-a="kfab">Przywołaj fabryczną</button><button class="sv" data-a="ksend">Wyślij ' + NA[k] + ' na główną</button>' +
      '<span class="ds">' + (!sv ? 'Jeszcze nie zapisana w HA (pokazuje fabryczną).' : dirty ? 'Masz niezapisane zmiany (żółte pola).' : 'Zapisana w HA.') + ' „Przywołaj fabryczną” wczytuje fabryczną do tej pamięci, zapisujesz ją sam.</span></div>';
    return h + '</div>';
  }
  _krzConfHtml() {
    const c = this._nau.kconf; if (!c) return '';
    const NM = { wz: 'wzorcową', ro: 'roboczą' };
    let rows = '', n = 0;
    for (let i = 0; i < 7; i++) { const L = this._krzLim(i), d = L.cur !== c.v[i]; if (d) n++; rows += '<tr><td>P' + (i + 1) + ' (' + ['-30', '-20', '-10', '0', '10', '20', '30'][i] + ' °C)</td><td>' + (isNaN(L.cur) ? '–' : L.cur) + ' °C</td><td class="' + (d ? 'd' : '') + '">' + c.v[i] + ' °C</td></tr>'; }
    return '<div class="kc"><div><div class="st2">Wysłać ' + NM[c.k] + ' krzywą do pompy?</div><table><tr><th>Punkt</th><th>Teraz w pompie</th><th>Wysyłam</th></tr>' + rows + '</table>' +
      '<div class="ds">' + (n ? 'Zmieni się ' + n + ' z 7 punktów (żółte).' : 'Bez zmian, pompa ma już te wartości.') + '</div>' +
      '<div class="ka"><button data-a="kno">Anuluj</button><button class="ok2" data-a="kyes"' + (n ? '' : ' disabled') + '>Potwierdź</button></div></div></div>';
  }
  // ---------- interakcja: okienka edycji ----------
  _more(id) {
    const ev = new Event('hass-more-info', { bubbles: true, composed: true });
    ev.detail = { entityId: id };
    this.dispatchEvent(ev);
  }
  _close() { if (this._pop) { this._pop.remove(); this._pop = null; } }
  // v1.35: pend = przycisk na fioletowo do potwierdzenia przez HA/pompe (zielony blysk), brak potwierdzenia 90 s = czerwony
  _waitFor(id, ok, node, pend) {
    const nodes = !node ? [] : Array.isArray(node) ? node : [node];
    this._pend = this._pend.filter((p) => { if (p.id !== id) return true; p.nodes.forEach((n) => n.classList.remove('hpp')); return false; });
    if (pend) nodes.forEach((n) => { n.classList.remove('hpx'); n.classList.add('hpp'); });
    this._pend.push({ id, ok, nodes, t: Date.now(), pend: !!pend });
    if (pend) { clearTimeout(this._pendTm); this._pendTm = setTimeout(() => this._checkPend(), 91000); }
  }
  _checkPend() {
    if (!this._pend || !this._pend.length || !this._hass) return;
    const st = this._hass.states;
    this._pend = this._pend.filter((p) => {
      if (Date.now() - p.t > (p.pend ? 90000 : 60000)) {
        p.nodes.forEach((n) => { n.classList.remove('hpp'); if (p.pend) { n.classList.add('hpx'); setTimeout(() => n.classList.remove('hpx'), 5000); } });
        return false;
      }
      if (!p.ok(st)) return true;
      p.nodes.forEach((n) => { n.classList.remove('hpp'); n.classList.remove('ok'); void n.offsetWidth; n.classList.add('ok'); setTimeout(() => n.classList.remove('ok'), 1600); });
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
  // v1.33: do kiedy trwa reczne wymuszenie cyrkulacji (sekundy epoch) albo 0
  _hwcWymus() {
    const w = this._hass && this._hass.states[this._E.cyrk_wymus];
    const t = w && w.attributes ? Number(w.attributes.timestamp) : 0;
    return t > Date.now() / 1000 ? t : 0;
  }
  _hwcNodes() { return (this._nodes || []).filter((n, i) => ELS[i].tap && ELS[i].tap.a === 'hwc'); }
  _hwc(node) {
    // SMO40 nie ma rejestru wl/wyl cyrkulacji: "wylacz" = praca 1 min / postoj 60 min, "wlacz" = poprzednie czasy
    const hass = this._hass, E = this._E, KEY = 'hkpc_hwc_prev';
    const r = hass.states[E.hwc_run], s = hass.states[E.hwc_still];
    if (!r || !s) { this._more(E.hwc_run); return; }
    const run = Number(r.state), still = Number(s.state);
    const on = !(run <= 1 && still >= 60);
    // v1.33: z pakietem 1.33 wlaczenie = wymuszenie na X min (automatyzacje go nie nadpisuja), wylaczenie konczy wymuszenie
    const wE = hass.states[E.cyrk_wymus], wM = hass.states[E.cyrk_wymus_min];
    if (wE && !on) {
      const min = wM ? Math.max(15, Number(wM.state) || 60) : 60;
      hass.callService('input_datetime', 'set_datetime', { entity_id: E.cyrk_wymus, timestamp: Math.floor(Date.now() / 1000 + min * 60) });
      this._waitFor(E.hwc_run, (st) => st[E.hwc_run] && Number(st[E.hwc_run].state) === 60 && st[E.hwc_still] && Number(st[E.hwc_still].state) === 1, this._hwcNodes(), true);
      return;
    }
    if (wE && on && this._hwcWymus()) hass.callService('input_datetime', 'set_datetime', { entity_id: E.cyrk_wymus, timestamp: Math.floor(Date.now() / 1000) });
    let tr, ts;
    if (on) {
      try { localStorage.setItem(KEY, JSON.stringify({ run, still })); } catch (e) { /* brak */ }
      tr = 1; ts = 60;
    } else {
      let pv = null;
      try { pv = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { pv = null; }
      tr = pv && pv.run > 1 ? pv.run : 60; ts = Math.max(1, pv && pv.run > 1 ? pv.still : 1); // v1.35: postoj min. 1 min
    }
    hass.callService('number', 'set_value', { entity_id: E.hwc_run, value: tr });
    hass.callService('number', 'set_value', { entity_id: E.hwc_still, value: ts });
    this._waitFor(E.hwc_run, (st) => st[E.hwc_run] && Number(st[E.hwc_run].state) === tr && st[E.hwc_still] && Number(st[E.hwc_still].state) === ts, this._hwcNodes(), true);
  }

  // v1.26: Priorytet pracy -> wybor Auto / Recznie (Tryb pracy 47137) + CO / CWU dozwolone w Recznym
  _prio(node) {
    const hass = this._hass, E = this._E;
    if (!hass.states[E.opmode]) { this._more(E.prio); return; }
    const p = this._popup(node, 'Priorytet / tryb pracy', (b) => {
      b.innerHTML = '<div class="pn now"></div><div class="ls"></div><div class="man"></div><div class="pn">Auto: pompa sama decyduje, kiedy grzać CO, a kiedy CWU. Ręcznie: sam zezwalasz na CO i CWU. CO wł/wył działa tylko w trybie Ręczny / Tylko grzałka; „Produkcja CWU” na SMO40 może nie działać (rejestr 47387). Przycisk „CWU” na głównej (v1.27): luksus jednorazowy + tryb Ręczny z wstrzymanym CO, aż woda się zagrzeje (max czas z Nauki, domyślnie 60 min), potem sam wraca na Auto. „Auto” przerywa i od razu wraca na Auto z CO.</div><div class="ac"><button class="mi">Więcej…</button></div>';
      b.querySelector('.mi').addEventListener('click', () => { this._close(); this._more(E.opmode); });
      b.addEventListener('click', (ev) => {
        const x = ev.target.closest && ev.target.closest('[data-o],[data-s]'); if (!x) return;
        const st = this._hass.states;
        if (x.hasAttribute('data-o')) {
          const o = x.getAttribute('data-o'); if (st[E.opmode].state === o) return;
          hass.callService('select', 'select_option', { entity_id: E.opmode, option: o });
          this._waitFor(E.opmode, (s2) => s2[E.opmode] && s2[E.opmode].state === o, node);
        } else {
          const id = E[x.getAttribute('data-s')]; if (!st[id]) return;
          const on = st[id].state === 'on';
          hass.callService('switch', on ? 'turn_off' : 'turn_on', { entity_id: id });
          this._waitFor(id, (s2) => s2[id] && s2[id].state === (on ? 'off' : 'on'), node);
        }
      });
    });
    p._upd = () => {
      const st = this._hass.states, m = st[E.opmode] ? st[E.opmode].state : '', pr = st[E.prio] ? st[E.prio].state : '–';
      p.querySelector('.now').textContent = 'Teraz pompa robi: ' + (pr === 'Ogrzewanie' ? 'CO' : pr === 'Wylaczona' ? 'postój' : pr) + ' · tryb pracy: ' + (m || '–') + (st[E.cwu_boost] && st[E.cwu_boost].state ? ' · luksus jednorazowy trwa (CO wstrzymane)' : '');
      p.querySelector('.ls').innerHTML = [['Auto', 'Auto'], ['Reczny', 'Ręcznie']].map(([o, l]) => '<button class="op' + (m === o ? ' on' : '') + '" data-o="' + o + '">' + l + '</button>').join('') +
        (m === 'Tylko grzalka' ? '<button class="op on" data-o="Tylko grzalka">Tylko grzałka</button>' : '');
      const man = m === 'Reczny' || m === 'Tylko grzalka';
      const row = (k, l) => { const s = st[E[k]]; if (!s) return '<div class="pr2"><span>' + l + '</span><i>brak encji</i></div>'; return '<div class="pr2"><span>' + l + ': <b>' + (s.state === 'on' ? 'wł.' : 'wył.') + '</b></span><button class="tg' + (s.state === 'on' ? ' on' : '') + '" data-s="' + k + '"><i></i></button></div>'; };
      p.querySelector('.man').innerHTML = man ? row('heat_ok', 'CO (ogrzewanie dozwolone)') + row('hw_prod', 'CWU (produkcja CWU)') : '';
    };
    p._upd();
  }
  _tap(el, node) {
    const t = el.tap, E = this._E, hass = this._hass;
    if (!t || !hass) return;
    if (t.a === 'prio') { this._prio(node); return; }
    if (t.a === 'num' && t.l) { this._num(t, node); return; }
    if (t.a === 'sel') { this._sel(t, node); return; }
    if (t.a === 'sw') { this._sw(t, node); return; }
    if (t.a === 'hwc') { this._close(); this._hwc(node); return; }
    if (t.a === 'mode') {
      // v1.35: tryb systemu - fioletowy do czasu, az sensor.hp_tryb_systemu (stany z pompy) pokaze ten tryb
      this._close();
      const id = E.mode, v = t.v;
      hass.callService('script', 'turn_on', { entity_id: 'script.' + t.s });
      this._waitFor(id, (st) => st[id] && st[id].state === v, node, true);
      return;
    }
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
