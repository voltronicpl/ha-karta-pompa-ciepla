#!/usr/bin/env python3
"""Generator karty HA (picture-elements na tle 1672x941) + podgladu HTML."""
import json, re, sys, yaml

W, H = 1672, 941
OUT = sys.argv[1]
PREVIEW = sys.argv[2]

E = dict(
    bt1='sensor.hydrolution_temperatura_zewnetrzna_bt1',
    bt12='sensor.hydrolution_zasilanie_z_pompy_bt12',
    bt3='sensor.hydrolution_powrot_do_pompy_bt3',
    s1='sensor.hydrolution_zadane_zasilanie_s1',
    bt25='sensor.hydrolution_zasilanie_zewn_bt25',
    bt71='sensor.hydrolution_powrot_zewn_bt71',
    bt7='sensor.hydrolution_cwu_gora_bt7',
    bt6='sensor.hydrolution_cwu_srodek_bt6',
    freq='sensor.hydrolution_sprezarka_czestotliwosc',
    gp12='sensor.hydrolution_pompa_ladujaca_predkosc',
    flow='sensor.hydrolution_przeplyw_bf1',
    fan='sensor.hydrolution_wentylator_stopien',
    eladd='sensor.hydrolution_grzalka_moc',
    prio='sensor.hydrolution_priorytet_pracy',
    defrost='sensor.hydrolution_odszranianie',
    cpr='binary_sensor.hydrolution_sprezarka_pracuje',
    hwmode='select.hydrolution_tryb_cwu',
    add='switch.hydrolution_grzalka_dozwolona',
    leg='switch.hydrolution_antylegionella_okresowe_podgrzewanie',
    curve='number.hydrolution_krzywa_grzewcza_numer',
    offset='number.hydrolution_przesuniecie_krzywej_grzewczej',
    minsup='number.hydrolution_min_temperatura_zasilania',
    maxsup='number.hydrolution_max_temperatura_zasilania',
    p1='number.hydrolution_wlasna_krzywa_p1_najzimniej',
    p2='number.hydrolution_wlasna_krzywa_p2',
    p3='number.hydrolution_wlasna_krzywa_p3',
    p4='number.hydrolution_wlasna_krzywa_p4',
    p5='number.hydrolution_wlasna_krzywa_p5',
    p6='number.hydrolution_wlasna_krzywa_p6',
    p7='number.hydrolution_wlasna_krzywa_p7_najcieplej',
    hwc_run='number.hydrolution_cyrkulacja_cwu_czas_pracy',
    hwc_still='number.hydrolution_cyrkulacja_cwu_czas_postoju',
    leg_int='number.hydrolution_antylegionella_co_ile_dni',
    leg_temp='number.hydrolution_antylegionella_temperatura_koncowa',
    n_start='number.hydrolution_harmonogram_nocny_start_godz',
    n_end='number.hydrolution_harmonogram_nocny_koniec_godz',
    hw_hour='number.hydrolution_harmonogram_cwu_godzina_podgrzania',
    sch_n='switch.hydrolution_harmonogram_nocny_aktywny',
    sch_hw='switch.hydrolution_harmonogram_cwu_aktywny',
    stop_lux='number.hydrolution_cwu_temp_stop_luksus',
    stop_norm='number.hydrolution_cwu_temp_stop_normalny',
    stop_eco='number.hydrolution_cwu_temp_stop_ekonomiczny',
    pwr='sensor.hp_moc_grzewcza',
    cop='sensor.hp_cop_chwilowy',
    e_day='sensor.hp_cieplo_dzis',
    e_co='sensor.hp_cieplo_co_dzis',
    e_cwu='sensor.hp_cieplo_cwu_dzis',
    e_month='sensor.hp_cieplo_miesiac',
    mode='sensor.hp_tryb_systemu',
    leg_days='sensor.hp_antylegionella_za_dni',
    leg_last='sensor.hp_antylegionella_ostatnio',
    t_all='sensor.hp_czas_pracy_dzis',
    t_co='sensor.hp_czas_pracy_co_dzis',
    t_cwu='sensor.hp_czas_pracy_cwu_dzis',
    starts='sensor.hp_starty_dzis',
)

FONT = "'Segoe UI', Roboto, 'Noto Sans', 'Open Sans', sans-serif"

# --- wspolne pomocniki JS (wklejane na poczatek kazdego szablonu) ---
HELP = (
    "const st=e=>states[e]?states[e].state:undefined;"
    "const n=e=>{const v=parseFloat(st(e));return isNaN(v)?null:v};"
    "const f=(e,d=1)=>{const v=n(e);return v===null?'–':v.toFixed(d)};"
    "const u=v=>'calc(var(--u)*'+v+')';"
    "const F=(s,w,c)=>'font-size:'+u(s)+';font-weight:'+(w||400)+';color:'+(c||'#eef2f6')+';';"
    "const B=(x,y,h,c,t)=>'<div style=\"position:absolute;left:'+u(x-OX)+';top:'+u(y-OY)+';transform:'+t+';white-space:nowrap;'+(c||'')+'\">'+h+'</div>';"
    "const P=(x,y,h,c)=>B(x,y,h,c,'translateY(-50%)');"
    "const R=(x,y,h,c)=>B(x,y,h,c,'translate(-100%,-50%)');"
    "const C=(x,y,h,c)=>B(x,y,h,c,'translate(-50%,-50%)');"
    "const I=(i,s,c)=>'<ha-icon icon=\"'+i+'\" style=\"display:block;color:'+(c||'#eef2f6')+';--mdc-icon-size:'+u(s)+';width:'+u(s)+';height:'+u(s)+'\"></ha-icon>';"
    "const dur=h=>{if(h===null)return'–';let m=Math.round(h*60);return m>=60?Math.floor(m/60)+' h '+(m%60)+' min':m+' min'};"
    "const hh=e=>{const v=n(e);return v===null?'--:--':String(((Math.round(v)%24)+24)%24).padStart(2,'0')+':00'};"
)

def js(body, ox, oy):
    """Podstawia @klucz -> 'entity_id' i dokleja pomocniki."""
    body = re.sub(r'@(\w+)', lambda m: "'" + E[m.group(1)] + "'", body)
    parts = [p for p in HELP.split(';const ') if p]
    defs = {}
    for p in parts:
        p = p[6:] if p.startswith('const ') else p
        defs[p.split('=', 1)[0]] = 'const ' + p.rstrip(';') + ';'
    deps = {'f': ['n'], 'n': ['st'], 'hh': ['n'], 'F': ['u'], 'I': ['u'], 'B': ['u'], 'P': ['B'], 'R': ['B'], 'C': ['B']}
    need = set()
    def add(k):
        if k in need: return
        need.add(k)
        for d in deps.get(k, []): add(d)
    for k in defs:
        if re.search(r'(?<![\w.])' + re.escape(k) + r'\(', body): add(k)
    helpers = ''.join(defs[k] for k in defs if k in need)
    head = ('const OX=%d,OY=%d;' % (ox, oy)) if 'B' in need else ''
    return "[[[\n%s%s\n%s\n]]]" % (head, helpers, body.strip())

def pos(x, y, w, h):
    return {'left': '%.3f%%' % (x / W * 100), 'top': '%.3f%%' % (y / H * 100),
            'width': '%.3f%%' % (w / W * 100), 'height': '%.3f%%' % (h / H * 100),
            'transform': 'none'}

ELEMENTS = []   # (dict yaml, preview info)

def el(x, y, w, h, body, entity=None, tap=None, template='hp'):
    d = {'type': 'custom:button-card', 'template': template}
    if entity:
        d['entity'] = E.get(entity, entity)
    if tap:
        d['tap_action'] = tap
    d['custom_fields'] = {'c': js(body, x, y)}
    d['style'] = pos(x, y, w, h)
    ELEMENTS.append(d)

def glass(extra=''):
    return "'<div class=\"g\" style=\"%s\"></div>'" % extra

def more(entity):
    return {'action': 'more-info', 'entity': E[entity]}

# ====================== NAGLOWEK ======================
# logo (3 romby) jako SVG
import math
def logo_svg():
    L, s = 30.0, 30.0 / math.sqrt(3) / 2 * 1.0
    base = [(0, 0), (8.66, -15), (0, -30), (-8.66, -15)]
    polys = []
    for ang in (0, 120, 240):
        a = math.radians(ang)
        pts = [(px * math.cos(a) - py * math.sin(a), px * math.sin(a) + py * math.cos(a)) for px, py in base]
        polys.append(' '.join('%.2f,%.2f' % (px + 32, py + 32) for px, py in pts))
    return ('<svg viewBox="6 2 52 45" style="width:100%;height:100%;filter:drop-shadow(0 2px 3px rgba(0,0,0,.5))">'
            + ''.join('<polygon points="%s" fill="#e60012"/>' % p for p in polys) + '</svg>')

LOGO = logo_svg()
el(25, 50, 560, 62, """
return '<div style="position:absolute;left:'+u(3)+';top:'+u(3)+';width:'+u(62)+';height:'+u(55)+'">%s</div>'
 + P(100,69,'MHI Hydrolution 9 kW',F(33,700,'#ffffff')+'letter-spacing:.2px;text-shadow:0 2px 6px rgba(0,0,0,.6)')
 + P(103,98,'Obieg grzewczy CO &nbsp;•&nbsp; Ciepła woda użytkowa CWU &nbsp;•&nbsp; Cyrkulacja',F(16,400,'#cfd6de')+'text-shadow:0 1px 4px rgba(0,0,0,.7)');
""" % LOGO.replace("'", "\\'"))

# ====================== KAFLE KPI ======================
def kpi(x, w, icon, icol, label, value_js, vcol="'#ffffff'", ent=None):
    el(x, 118, w, 61, """
const val=%s; const vc=%s;
return %s + P(%d,148,I('%s',32,'%s')) + P(%d,134,'%s',F(13.5,400,'#d9e0e7')) + P(%d,157,val,F(20,600,vc));
""" % (value_js, vcol, glass(), x + 16, icon, icol, x + 56, label, x + 56), tap=more(ent) if ent else None,
       template='hp_hit' if ent else 'hp')

kpi(15, 172, 'mdi:power', '#7ee04a', 'Tryb pracy',
    "(()=>{if(st(@defrost)==='Aktywne')return'Odszranianie';const p=st(@prio);return p==='Wylaczona'?'Postój':(p||'–')})()",
    "(()=>{const p=st(@prio);return st(@defrost)==='Aktywne'?'#81d4fa':p==='Ogrzewanie'?'#7ee04a':p==='CWU'?'#29b6f6':'#b0bac5'})()",
    'prio')
kpi(193, 148, 'mdi:flash', '#ffc21a', 'Moc grzewcza', "f(@pwr,2)+' kW'", ent='pwr')
kpi(347, 158, 'mdi:leaf', '#7ee04a', 'COP (chwilowy)', "f(@cop,2)", ent='cop')
kpi(511, 153, 'mdi:chart-bar', '#ffa31a', 'Energia dziś', "f(@e_day,1)+' kWh'", ent='e_day')
kpi(670, 146, 'mdi:water-outline', '#29b6f6', 'CWU dziś', "f(@e_cwu,1)+' kWh'", ent='e_cwu')

# ====================== SCENA ======================
# BT1
el(143, 220, 161, 63, """
return %s + P(156,252,I('mdi:thermometer',36,'#29b6f6'))
 + P(196,236,f(@bt1)+' °C',F(22,600,'#fff'))
 + P(196,255,'Temperatura',F(13,400,'#dfe5ec')) + P(196,270,'zewnętrzna (BT1)',F(13,400,'#dfe5ec'));
""" % glass(), template='hp_hit', tap=more('bt1'))

# etykiety temperatur na rurach
def pill(x, y, w, h, ent, sub, hot):
    bg = ("linear-gradient(180deg,rgba(150,28,20,.92),rgba(95,16,12,.92));border:1px solid rgba(255,96,72,.75);box-shadow:0 0 calc(var(--u)*10) rgba(255,60,40,.35)"
          if hot else
          "linear-gradient(180deg,rgba(16,52,100,.92),rgba(9,32,66,.92));border:1px solid rgba(80,170,255,.75);box-shadow:0 0 calc(var(--u)*10) rgba(40,140,255,.35)")
    el(x, y, w, h, """
return '<div class="g" style="background:%s;border-radius:'+u(6)+'"></div>'
 + C(%d,%d,f(@%s)+' °C',F(17,600,'#fff')) + C(%d,%d,'%s',F(11.5,400,'#e9eef3'));
""" % (bg, x + w / 2, y + 14, ent, x + w / 2, y + h - 10, sub), template='hp_hit', tap=more(ent))

pill(829, 137, 98, 40, 'bt7', 'CWU góra (BT7)', True)
pill(829, 229, 102, 40, 'bt6', 'CWU środek (BT6)', False)
pill(585, 317, 98, 40, 'bt12', 'Zasilanie (BT12)', True)
pill(548, 456, 112, 40, 'bt3', 'Powrót (BT3)', False)
pill(1066, 379, 120, 40, 'bt25', 'Zasilanie CO (BT25)', True)
pill(1058, 451, 106, 40, 'bt71', 'Powrót CO (BT71)', False)

# zawor 3-drogowy
el(677, 398, 100, 42, """
const p=st(@prio); const co=p==='Ogrzewanie', cw=p==='CWU';
return %s + C(727,410,'Zawór 3-drogowy',F(13.5,400,'#eef2f6'))
 + C(727,428,'<span style="'+(co?'color:#7ee04a;font-weight:700':'')+'">CO</span> / <span style="'+(cw?'color:#29b6f6;font-weight:700':'')+'">CWU</span>',F(13.5,400,'#eef2f6'));
""" % glass(), template='hp_hit', tap=more('prio'))

# ekran jednostki wewnetrznej + zasilanie
el(437, 318, 66, 42, """
return C(470,339,f(@bt12)+'°C',F(12,500,'#e8f4ff')+'text-shadow:0 0 4px rgba(120,190,255,.6)');
""")
el(458, 372, 26, 26, """
const on=st(@cpr)==='on';
return C(471,385,I('mdi:power',24,on?'#57e04a':'#7d8894'),on?'filter:drop-shadow(0 0 4px #57e04a)':'');
""", template='hp_hit', tap=more('cpr'))

# zbiornik CWU: napis + pierscien
el(1003, 126, 90, 48, """
return P(1007,151,I('mdi:water-outline',24,'#29b6f6'))
 + P(1034,141,'CWU',F(17,700,'#fff')+'text-shadow:0 1px 4px rgba(0,0,0,.8)')
 + P(1035,159,'300 l',F(14,500,'#fff')+'text-shadow:0 1px 4px rgba(0,0,0,.8)');
""")
el(993, 183, 100, 100, """
const t=n(@bt7); const m=st(@hwmode);
const tg=n(m==='Luksus'?@stop_lux:m==='Ekonomiczny'?@stop_eco:@stop_norm);
const fr=(t!==null&&tg)?Math.max(0,Math.min(1,t/tg)):0;
const r=40, c=2*Math.PI*r, a=c*fr;
return '<svg viewBox="0 0 100 100" style="position:absolute;inset:0;width:100%;height:100%">'
 + '<circle cx="50" cy="50" r="49" fill="rgba(18,22,28,.92)"/>'
 + '<circle cx="50" cy="50" r="'+r+'" fill="none" stroke="#1e88e5" stroke-width="9"/>'
 + '<circle cx="50" cy="50" r="'+r+'" fill="none" stroke="#ff9100" stroke-width="9" stroke-dasharray="'+a+' '+c+'" transform="rotate(-90 50 50)" style="filter:drop-shadow(0 0 3px rgba(255,145,0,.7))"/>'
 + '</svg>'
 + C(1043,229,f(@bt7)+' °C',F(16.5,700,'#fff')) + C(1043,247,'('+(tg===null?'–':tg.toFixed(1))+' °C)',F(11,400,'#d5dce4'));
""", template='hp_hit', tap=more('hwmode'))

# cyrkulacja CWU (dymek)
el(1163, 83, 141, 122, """
return '<div class="g" style="bottom:'+u(9)+'"></div>'
 + '<div style="position:absolute;left:'+u(45)+';bottom:'+u(1)+';width:0;height:0;border-left:'+u(8)+' solid transparent;border-right:'+u(8)+' solid transparent;border-top:'+u(9)+' solid rgba(30,35,44,.9)"></div>'
 + C(1233,96,'Cyrkulacja CWU',F(15.5,600,'#fff'))
 + P(1179,118,I('mdi:record-circle-outline',17,'#7ee04a')) + P(1201,118,'Włączona',F(14,500,'#7ee04a'))
 + '<div style="position:absolute;left:'+u(10)+';right:'+u(10)+';top:'+u(48)+';border-top:1px solid rgba(255,255,255,.12)"></div>'
 + P(1181,144,'Praca: &nbsp;'+f(@hwc_run,0)+' min',F(13.5,400,'#e3e8ee'))
 + P(1181,163,'Postój: &nbsp;'+f(@hwc_still,0)+' min',F(13.5,400,'#e3e8ee'))
 + P(1181,182,'Przepływ: &nbsp;'+f(@flow,1)+' l/min',F(13.5,400,'#e3e8ee'));
""", template='hp_hit', tap=more('hwc_run'))

# napis bufora + gradient
el(906, 428, 140, 92, """
return '<div style="position:absolute;inset:0;border-radius:'+u(4)+';background:linear-gradient(180deg,rgba(229,57,53,0) 0%,rgba(229,57,53,.38) 30%,rgba(30,136,229,.42) 100%);filter:blur(1px)"></div>';
""")
el(925, 383, 112, 105, """
return C(981,397,'Bufor CO',F(16,600,'#fff')+'text-shadow:0 1px 4px rgba(0,0,0,.8)')
 + C(981,416,'200 l',F(15,500,'#fff')+'text-shadow:0 1px 4px rgba(0,0,0,.8)')
 + C(981,465,f(@bt25)+' °C',F(23,700,'#fff')+'text-shadow:0 2px 6px rgba(0,0,0,.8)');
""", template='hp_hit', tap=more('bt25'))

# rozdzielacz
el(1320, 348, 208, 44, """
return %s + C(1424,360,'Rozdzielacz',F(16.5,700,'#fff')) + C(1424,380,'Ogrzewanie podłogowe',F(14,400,'#e3e8ee'));
""" % glass())

# pompy (wskaznik pracy)
def pump(cx, cy, cond, ent):
    el(cx - 16, cy - 16, 32, 32, """
const on=%s;
return '<div style="position:absolute;inset:0;border-radius:50%%;background:radial-gradient(circle,#1d2229 55%%,#0f1216 100%%);border:2px solid '+(on?'#43d343':'#59626d')+';box-shadow:'+(on?'0 0 '+u(8)+' rgba(67,211,67,.7)':'none')+'"></div>'
 + C(%d,%d,I('mdi:play',22,on?'#43d343':'#7d8894'));
""" % (cond, cx + 1, cy), template='hp_hit', tap=more(ent))

pump(857, 491, "(n(@gp12)||0)>0", 'gp12')
pump(1187, 493, "st(@prio)!=='Wylaczona'&&st(@prio)!==undefined", 'prio')
pump(1197, 236, "(n(@hwc_run)||0)>0", 'hwc_run')

# strzalki przeplywu
for (ax, ay, ic) in [(622, 363, 'mdi:menu-right'), (872, 196, 'mdi:menu-right'), (884, 282, 'mdi:menu-left'),
                     (793, 276, 'mdi:menu-up'), (653, 428, 'mdi:menu-up'), (832, 382, 'mdi:menu-down'),
                     (1120, 425, 'mdi:menu-right'), (1120, 495, 'mdi:menu-left'), (1158, 277, 'mdi:menu-right')]:
    el(ax - 8, ay - 8, 16, 16, "return C(%d,%d,I('%s',18,'#ffffff'),'opacity:.9;filter:drop-shadow(0 0 2px rgba(0,0,0,.8))');" % (ax, ay, ic))

# ====================== TRYB SYSTEMU ======================
el(1322, 55, 338, 118, """
return %s + P(1338,74,I('mdi:clock-outline',22,'#fff')) + P(1373,73,'Tryb systemu',F(17,600,'#fff'))
 + '<div style="position:absolute;left:'+u(10)+';right:'+u(10)+';top:'+u(37)+';border-top:1px solid rgba(255,255,255,.1)"></div>';
""" % glass())

for (bx, bw, name, icon, script) in [(1335, 81, 'Auto', 'mdi:alpha-a-circle-outline', 'hp_tryb_auto'),
                                     (1420, 74, 'CO', 'mdi:thermometer-lines', 'hp_tryb_co'),
                                     (1498, 74, 'CWU', 'mdi:water-outline', 'hp_tryb_cwu'),
                                     (1576, 76, 'Urlop', 'mdi:briefcase-outline', 'hp_tryb_urlop')]:
    el(bx, 98, bw, 62, """
const a=st(@mode)==='%s';
return '<div class="g" style="border-radius:'+u(7)+';'+(a?'background:linear-gradient(180deg,#2b8cf2,#1260bf);border:1px solid #6ec1ff;box-shadow:0 0 '+u(12)+' rgba(33,150,243,.65)':'background:rgba(48,54,64,.8)')+'"></div>'
 + C(%d,117,I('%s',24,'#fff')) + C(%d,143,'%s',F(15,a?600:400,'#fff'));
""" % (name, bx + bw / 2, icon, bx + bw / 2, name), template='hp_hit',
       tap={'action': 'call-service', 'service': 'script.turn_on', 'target': {'entity_id': 'script.' + script}})

# lista statusow
ROWS = [('mdi:layers-outline', '#29b6f6', 'Priorytet pracy',
         "(()=>{const p=st(@prio);return p==='Ogrzewanie'?'CO':p==='Wylaczona'?'Postój':(p||'–')})()", 'prio'),
        ('mdi:water-outline', '#29b6f6', 'Tryb CWU', "st(@hwmode)||'–'", 'hwmode'),
        ('mdi:flash', '#ffc21a', 'Grzałka elektryczna',
         "(()=>{const p=n(@eladd)||0;if(p>0)return'Pracuje '+p.toFixed(1)+' kW';return st(@add)==='on'?'Dozwolona':'Wyłączona'})()", 'add'),
        ('mdi:shield-check-outline', '#7ee04a', 'Antylegionella',
         "(()=>{if(st(@leg)!=='on')return'Wyłączona';const d=n(@leg_days);return d===null?'Włączona':(d===0?'Dziś':'Za '+d.toFixed(0)+' dni')})()", 'leg')]
body = "return %s" % glass()
for i, (ic, col, lab, vjs, ent) in enumerate(ROWS):
    y = 198 + i * 32
    body += "\n + P(1343,%d,I('%s',21,'%s')) + P(1381,%d,'%s',F(15,400,'#e9eef3')) + R(1630,%d,%s,F(14.5,400,'#e9eef3')) + P(1633,%d,I('mdi:chevron-right',18,'#cfd6de'))" % (y, ic, col, y, lab, y, vjs, y)
    if i < 3:
        body += "\n + '<div style=\"position:absolute;left:%s;right:%s;top:%s;border-top:1px solid rgba(255,255,255,.08)\"></div>'" % ("'+u(10)+'", "'+u(10)+'", "'+u(%d)+'" % (y + 16 - 182))
el(1325, 182, 335, 133, body + ";")
for i, r in enumerate(ROWS):
    el(1325, 182 + i * 32 + 1, 335, 32, "return '';", template='hp_hit', tap=more(r[4]))

# ====================== PANEL: KRZYWA GRZEWCZA ======================
el(8, 563, 505, 362, """
const T=[-30,-20,-10,0,10,20,30];
const pk=[@p1,@p2,@p3,@p4,@p5,@p6,@p7];
const off=n(@offset)||0;
const pv=pk.map(e=>n(e));
const ok=pv.every(v=>v!==null);
const ys=ok?pv.map(v=>v+off):[];
const all=ys.concat([n(@s1)].filter(v=>v!==null));
let lo=20, hi=60; if(all.length){lo=Math.min(20,Math.floor((Math.min(...all)-2)/10)*10);hi=Math.max(60,Math.ceil((Math.max(...all)+2)/10)*10);}
const X0=52,X1=482,Y0=55,Y1=141;
const sx=t=>X0+(t+30)/60*(X1-X0), sy=v=>Y1-(v-lo)/(hi-lo)*(Y1-Y0);
let g='';
for(let t=-30;t<=30;t+=5) g+='<line x1="'+sx(t)+'" y1="'+Y0+'" x2="'+sx(t)+'" y2="'+Y1+'" stroke="rgba(255,255,255,.08)"/>';
for(let v=lo;v<=hi;v+=10){g+='<line x1="'+X0+'" y1="'+sy(v)+'" x2="'+X1+'" y2="'+sy(v)+'" stroke="rgba(255,255,255,.08)"/>'+'<text x="'+(X0-6)+'" y="'+(sy(v)+4)+'" text-anchor="end">'+v+' °C</text>';}
for(let t=-30;t<=30;t+=10) g+='<text x="'+sx(t)+'" y="'+(Y1+16)+'" text-anchor="middle">'+t+' °C</text>';
let line='';
if(ok){line='<polyline points="'+T.map((t,i)=>sx(t)+','+sy(ys[i])).join(' ')+'" fill="none" stroke="#29b6f6" stroke-width="2.6" stroke-linejoin="round" style="filter:drop-shadow(0 0 3px rgba(41,182,246,.8))"/>'
 + T.map((t,i)=>'<circle cx="'+sx(t)+'" cy="'+sy(ys[i])+'" r="2.6" fill="#29b6f6"/>').join('');}
const ox=n(@bt1), oy=n(@s1);
let dot='';
if(ox!==null&&oy!==null){const cx=sx(Math.max(-30,Math.min(30,ox)));dot='<circle cx="'+cx+'" cy="'+sy(oy)+'" r="6.5" fill="#ffb300" stroke="#ffe082" stroke-width="1.5" style="filter:drop-shadow(0 0 4px rgba(255,179,0,.9))"/>';}
const leg='<line x1="160" y1="44" x2="186" y2="44" stroke="#29b6f6" stroke-width="2.6"/><circle cx="173" cy="44" r="3.5" fill="#29b6f6"/><text x="192" y="48" font-size="12.5" fill="#e3e8ee">Krzywa (P1–P7'+(off?(off>0?' +':' ')+off:'')+')</text>'
 + '<line x1="318" y1="44" x2="344" y2="44" stroke="#ffb300" stroke-width="2.6"/><circle cx="331" cy="44" r="3.5" fill="#ffb300"/><text x="350" y="48" font-size="12.5" fill="#e3e8ee">Zadane teraz (S1)</text>';
const svg='<svg viewBox="0 0 505 362" style="position:absolute;inset:0;width:100%;height:100%;font-family:inherit"><g font-size="12" fill="#dfe5ec">'+g+'</g>'+leg+line+dot+'</svg>';
return GLASS + P(28,578,'Krzywa grzewcza (CO)',F(17.5,600,'#fff'))
 + '<div style="position:absolute;left:'+u(12)+';right:'+u(12)+';top:'+u(31)+';border-top:1px solid rgba(255,255,255,.1)"></div>'
 + svg;
""".replace('GLASS', glass()))

# kafle nastaw
def numtile(x, w, label, ent, fmt):
    el(x, 740, w, 58, """
return '<div class="g" style="background:rgba(30,35,43,.85);border-radius:'+u(8)+'"></div>'
 + C(%d,753,'%s',F(14,400,'#e3e8ee'))
 + '<div style="position:absolute;left:'+u(10)+';right:'+u(10)+';top:'+u(26)+';height:'+u(26)+';border-radius:'+u(13)+';background:rgba(62,70,82,.75);border:1px solid rgba(255,255,255,.08)"></div>'
 + P(%d,779,I('mdi:chevron-left',18,'#dfe5ec')) + C(%d,779,%s,F(16.5,600,'#fff')) + R(%d,779,I('mdi:chevron-right',18,'#dfe5ec'));
""" % (x + w / 2, label, x + 14, x + w / 2, fmt, x + w - 14))
    for side, dx in (('-', 6), ('+', w - 42)):
        el(x + dx, 765, 36, 28, "return '';", template='hp_hit',
           tap={'action': 'call-service', 'service': 'number.set_value',
                'data': {'entity_id': E[ent],
                         'value': "[[[ const s=states['%s']; const v=Number(s.state)%s1; return Math.min(Number(s.attributes.max),Math.max(Number(s.attributes.min),v)); ]]]" % (E[ent], side)}})

numtile(18, 127, 'Numer krzywej', 'curve', "f(@curve,0)")
numtile(152, 115, 'Przesunięcie', 'offset', "f(@offset,0)+' °C'")
numtile(273, 115, 'Min. zasilania', 'minsup', "f(@minsup,0)+' °C'")
numtile(395, 109, 'Max. zasilania', 'maxsup', "f(@maxsup,0)+' °C'")

# wlasna krzywa P1-P7
body = """
const T=['-30°C','-20°C','-10°C','0°C','10°C','20°C','30°C'];
const pk=[@p1,@p2,@p3,@p4,@p5,@p6,@p7];
let h='<div class="g" style="background:rgba(30,35,43,.85);border-radius:'+u(8)+'"></div>'
 + P(28,819,'Własna krzywa – punkty (P1 – P7)',F(14.5,400,'#eef2f6'))
 + '<div style="position:absolute;left:'+u(12)+';right:'+u(12)+';top:'+u(28)+';bottom:'+u(6)+';border-radius:'+u(6)+';background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06)"></div>';
for(let i=0;i<7;i++){const cx=30+33+i*66;
 h+=C(cx,850,'P'+(i+1),F(15,600,'#fff'))+C(cx,872,T[i],F(14,400,'#e3e8ee'))
  +'<div style="position:absolute;left:'+u(cx-OX-27)+';top:'+u(885-OY)+';width:'+u(54)+';height:'+u(22)+';border-radius:'+u(6)+';background:rgba(70,78,90,.7);border:1px solid rgba(255,255,255,.08)"></div>'
  +C(cx,896,f(pk[i],0)+' °C',F(14.5,500,'#fff'));
 if(i>0) h+='<div style="position:absolute;left:'+u(cx-OX-33)+';top:'+u(838-OY)+';height:'+u(74)+';border-left:1px solid rgba(255,255,255,.07)"></div>';}
return h;
"""
el(18, 805, 485, 113, body)
for i in range(7):
    el(30 + i * 66, 838, 66, 76, "return '';", template='hp_hit', tap=more('p%d' % (i + 1)))

# ====================== TRENDY (apexcharts) ======================
el(520, 563, 495, 174, """
return %s + P(537,579,'Temperatury – trendy (24 h)',F(17.5,600,'#fff'))
 + '<div style="position:absolute;left:'+u(12)+';right:'+u(12)+';top:'+u(31)+';border-top:1px solid rgba(255,255,255,.1)"></div>';
""" % glass())

APEX = {
    'type': 'custom:apexcharts-card',
    'graph_span': '24h',
    'update_interval': '5min',
    'header': {'show': False},
    'yaxis': [{'min': 10, 'max': 60, 'decimals': 0,
               'apex_config': {'tickAmount': 5, 'labels': {'formatter': "EVAL:function(v){return Math.round(v)+' °C'}"}}}],
    'apex_config': {
        'chart': {'height': '100%', 'foreColor': '#c8d0da', 'fontFamily': FONT, 'background': 'transparent',
                  'toolbar': {'show': False}, 'zoom': {'enabled': False}},
        'grid': {'borderColor': 'rgba(255,255,255,0.08)', 'padding': {'top': -8, 'right': 4, 'bottom': -4, 'left': 0}},
        'legend': {'show': True, 'position': 'right', 'fontSize': '12px', 'labels': {'colors': '#dfe5ec'},
                   'markers': {'width': 16, 'height': 3, 'radius': 2}, 'itemMargin': {'vertical': 2}},
        'xaxis': {'labels': {'datetimeUTC': False, 'format': 'HH:mm', 'style': {'fontSize': '11px'}},
                  'axisBorder': {'show': False}, 'axisTicks': {'show': False}},
        'tooltip': {'theme': 'dark', 'x': {'format': 'HH:mm'}},
        'stroke': {'width': 2.2, 'curve': 'smooth'},
        'markers': {'size': 0},
    },
    'series': [
        {'entity': E['bt7'], 'name': 'CWU góra (BT7)', 'color': '#ff4d3a', 'group_by': {'func': 'avg', 'duration': '10min'}},
        {'entity': E['bt12'], 'name': 'Zasilanie (BT12)', 'color': '#ffab1a', 'group_by': {'func': 'avg', 'duration': '10min'}},
        {'entity': E['bt3'], 'name': 'Powrót (BT3)', 'color': '#29b6f6', 'group_by': {'func': 'avg', 'duration': '10min'}},
        {'entity': E['bt25'], 'name': 'Bufor CO (BT25)', 'color': '#9c6cff', 'group_by': {'func': 'avg', 'duration': '10min'}},
    ],
    'card_mod': {'style': "ha-card { background: none !important; box-shadow: none !important; border: none !important; height: 100%; }\n#graph-wrapper, #graph { height: 100%; }\n"},
    'style': pos(526, 597, 484, 138),
}
ELEMENTS.append(APEX)

# ====================== ZUZYCIE ENERGII ======================
el(1024, 563, 343, 174, """
const co=n(@e_co)||0, cw=n(@e_cwu)||0, s=co+cw;
const pc=s>0?co/s:0;
const r=57, c=2*Math.PI*r;
const pct=v=>s>0?Math.round(v/s*100):0;
const svg='<svg viewBox="0 0 343 174" style="position:absolute;inset:0;width:100%;height:100%;font-family:inherit">'
 + '<circle cx="86" cy="93" r="'+r+'" fill="none" stroke="'+(s>0?'#ffa31a':'#3a414c')+'" stroke-width="14"/>'
 + (s>0?'<circle cx="86" cy="93" r="'+r+'" fill="none" stroke="#1fa5f5" stroke-width="14" stroke-dasharray="'+(c*pc)+' '+c+'" transform="rotate(-90 86 93)"/>':'')
 + '<circle cx="86" cy="93" r="49" fill="rgba(14,17,22,.9)"/>'
 + '<text x="86" y="96" text-anchor="middle" font-size="19" font-weight="700" fill="#fff">'+f(@e_day,1)+' kWh</text>'
 + '<text x="86" y="118" text-anchor="middle" font-size="15" fill="#e3e8ee">dziś</text>'
 + '<rect x="166" y="52" width="13" height="13" rx="2" fill="#1fa5f5"/><text x="193" y="64" font-size="14.5" fill="#eef2f6">CO: '+co.toFixed(1)+' kWh ('+pct(co)+'%)</text>'
 + '<rect x="166" y="86" width="13" height="13" rx="2" fill="#ffa31a"/><text x="193" y="98" font-size="14.5" fill="#eef2f6">CWU: '+cw.toFixed(1)+' kWh ('+pct(cw)+'%)</text>'
 + '<line x1="166" y1="112" x2="330" y2="112" stroke="rgba(255,255,255,.12)"/>'
 + '<text x="168" y="137" font-size="14.5" fill="#e3e8ee">Miesiąc: <tspan font-weight="600" fill="#fff" dx="6">'+f(@e_month,1)+' kWh</tspan></text>'
 + '</svg>';
return GLASS + P(1042,579,'Zużycie energii',F(17.5,600,'#fff'))
 + '<div style="position:absolute;left:'+u(12)+';right:'+u(12)+';top:'+u(31)+';border-top:1px solid rgba(255,255,255,.1)"></div>' + svg;
""".replace('GLASS', glass()), template='hp_hit', tap=more('e_month'))

# ====================== KAFLE CZASOW ======================
def tile(x, w, icon, icol, label, vjs, ent):
    el(x, 745, w, 47, """
return %s + P(%d,768,I('%s',28,'%s')) + P(%d,757,'%s',F(13.5,400,'#dfe5ec')) + P(%d,776,%s,F(18,600,'#fff'));
""" % (glass(), x + 16, icon, icol, x + 62, label, x + 62, vjs), template='hp_hit', tap=more(ent))

tile(522, 173, 'mdi:clock-outline', '#ffffff', 'Czas pracy (dziś)', "dur(n(@t_all))", 't_all')
tile(702, 158, 'mdi:alarm', '#ffffff', 'Starty sprężarki', "f(@starts,0)", 'starts')
tile(868, 173, 'mdi:water-outline', '#29b6f6', 'Czas pracy CO', "dur(n(@t_co))", 't_co')
tile(1049, 163, 'mdi:water-boiler', '#29b6f6', 'Czas pracy CWU', "dur(n(@t_cwu))", 't_cwu')
tile(1220, 147, 'mdi:snowflake-melt', '#81d4fa', 'Odszranianie', "st(@defrost)||'–'", 'defrost')

# ====================== HARMONOGRAMY ======================
el(522, 802, 328, 118, """
const inner='<div style="position:absolute;left:'+u(10)+';right:'+u(8)+';top:'+u(28)+';bottom:'+u(6)+';border-radius:'+u(6)+';background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06)"></div>'
 + '<div style="position:absolute;left:'+u(10)+';right:'+u(8)+';top:'+u(71)+';border-top:1px solid rgba(255,255,255,.08)"></div>';
return %s + P(537,816,'Harmonogramy',F(17.5,600,'#fff')) + inner
 + P(538,852,I('mdi:weather-night',28,'#29b6f6')) + P(579,845,'Obniżenie nocne (CO)',F(14.5,400,'#eef2f6')) + P(580,862,hh(@n_start)+' &nbsp;–&nbsp; '+hh(@n_end),F(14.5,400,'#eef2f6'))
 + P(538,895,I('mdi:water-outline',28,'#29b6f6')) + P(579,887,'Poranne podgrzanie CWU',F(14.5,400,'#eef2f6'))
 + P(580,905,hh(@hw_hour)+' &nbsp;–&nbsp; '+(n(@hw_hour)===null?'--:--':String((Math.round(n(@hw_hour))+1)%%24).padStart(2,'0')+':00'),F(14.5,400,'#eef2f6'));
""" % glass())

TOG = """
const on=entity&&entity.state==='on';
return '<div style="position:absolute;inset:0;border-radius:999px;background:'+(on?'linear-gradient(180deg,#36a3ff,#1a7fe0)':'#4a525e')+';box-shadow:'+(on?'0 0 '+u(8)+' rgba(33,150,243,.6)':'none')+'"></div>'
 + '<div style="position:absolute;top:'+u(2.5)+';'+(on?'right':'left')+':'+u(2.5)+';width:'+u(15)+';height:'+u(15)+';border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.4)"></div>';
"""
def toggle(x, y, ent, tap=None):
    el(x, y, 38, 20, TOG, entity=ent, template='hp_hit', tap=tap or {'action': 'toggle'})

toggle(797, 843, 'sch_n')
toggle(797, 886, 'sch_hw')

# ====================== CYRKULACJA CWU ======================
el(861, 802, 235, 118, """
const inner='<div style="position:absolute;left:'+u(10)+';right:'+u(8)+';top:'+u(28)+';bottom:'+u(6)+';border-radius:'+u(6)+';background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06)"></div>'
 + '<div style="position:absolute;left:'+u(10)+';right:'+u(8)+';top:'+u(71)+';border-top:1px solid rgba(255,255,255,.08)"></div>';
return %s + P(876,816,'Cyrkulacja CWU',F(17.5,600,'#fff')) + inner
 + P(884,852,I('mdi:autorenew',28,'#57e04a')) + P(928,843,'Czas pracy',F(13.5,400,'#dfe5ec')) + P(928,862,f(@hwc_run,0)+' min',F(16.5,600,'#fff'))
 + P(884,895,I('mdi:timer-outline',28,'#ffb300')) + P(928,886,'Czas postoju',F(13.5,400,'#dfe5ec')) + P(928,905,f(@hwc_still,0)+' min',F(16.5,600,'#fff'));
""" % glass())
# brak rejestru "cyrkulacja wl/wyl" -> wskaznik: wl. gdy czas pracy > 0, klik = ustawienia czasu pracy
el(1038, 843, 38, 20, TOG.replace("entity&&entity.state==='on'", "(n(@hwc_run)||0)>0"), template='hp_hit', tap=more('hwc_run'))

# ====================== ANTYLEGIONELLA ======================
el(1106, 802, 261, 118, """
const L=st(@leg_last); let d='–';
if(L&&L!=='unknown'&&L!=='unavailable'){const dt=new Date(L); if(!isNaN(dt)) d=dt.toLocaleDateString('pl-PL',{day:'numeric',month:'short',year:'numeric'});}
const inner='<div style="position:absolute;left:'+u(10)+';right:'+u(8)+';top:'+u(28)+';bottom:'+u(6)+';border-radius:'+u(6)+';background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06)"></div>';
const ln=y=>'<div style="position:absolute;left:'+u(48)+';right:'+u(14)+';top:'+u(y-OY)+';border-top:1px solid rgba(255,255,255,.08)"></div>';
return %s + P(1119,817,I('mdi:shield-check-outline',22,'#7ee04a')) + P(1146,817,'Antylegionella',F(17.5,600,'#fff')) + inner
 + P(1122,857,I('mdi:thermometer-high',30,'#eef2f6'))
 + P(1165,845,'Temperatura',F(14,400,'#eef2f6')) + R(1355,845,f(@leg_temp,1)+' °C',F(14.5,500,'#fff')) + ln(858)
 + P(1165,870,'Interwał',F(14,400,'#eef2f6')) + R(1355,870,f(@leg_int,0)+' dni',F(14.5,500,'#fff')) + ln(883)
 + P(1124,896,I('mdi:clock-outline',24,'#eef2f6')) + P(1165,896,'Ostatnie',F(14,400,'#eef2f6')) + R(1355,896,d,F(14.5,500,'#fff'));
""" % glass())
toggle(1314, 808, 'leg')

# ====================== PARAMETRY PRACY ======================
PAR = [('mdi:thermometer', '#ff5a4a', 'BT1 – zewnętrzna', "f(@bt1)+' °C'"),
       ('mdi:thermometer', '#64b5f6', 'BT12 – zasilanie', "f(@bt12)+' °C'"),
       ('mdi:thermometer', '#4fc3f7', 'BT3 – powrót', "f(@bt3)+' °C'"),
       ('mdi:thermometer', '#ffb300', 'BT7 – CWU góra', "f(@bt7)+' °C'"),
       ('mdi:thermometer', '#81d4fa', 'BT6 – CWU środek', "f(@bt6)+' °C'"),
       ('mdi:storage-tank-outline', '#eef2f6', 'Bufor CO (BT25)', "f(@bt25)+' °C'"),
       None,
       ('mdi:flash', '#ffc21a', 'Moc szacowana', "f(@pwr,2)+' kW'"),
       ('mdi:fan', '#eef2f6', 'Sprężarka', "st(@cpr)==='on'?'Wł.':'Wył.'"),
       ('mdi:fan', '#eef2f6', 'Wentylator (stopień)', "f(@fan,0)"),
       ('mdi:pulse', '#eef2f6', 'Częstotliwość sprężarki', "f(@freq,0)+' Hz'"),
       ('mdi:waves-arrow-right', '#29b6f6', 'Przepływ (BF1)', "f(@flow,1)+' l/min'")]
body = "return %s + P(1392,579,'Parametry pracy <span style=\"'+F(14.5,400,'#e3e8ee')+'\">(aktualne)</span>',F(17,600,'#fff'))" % glass()
body += "\n + '<div style=\"position:absolute;left:'+u(12)+';right:'+u(12)+';top:'+u(31)+';border-top:1px solid rgba(255,255,255,.1)\"></div>'"
y = 611
ys = []
for row in PAR:
    if row is None:
        body += "\n + '<div style=\"position:absolute;left:'+u(12)+';right:'+u(12)+';top:'+u(%d)+';border-top:1px solid rgba(255,255,255,.16)\"></div>'" % (y - 7 - 563)
        y += 7
        continue
    ic, col, lab, vjs = row
    body += "\n + P(1392,%d,I('%s',21,'%s')) + P(1427,%d,'%s',F(14.5,400,'#eef2f6')) + R(1647,%d,%s,F(15,500,'#fff'))" % (y, ic, col, y, lab, y, vjs)
    body += "\n + '<div style=\"position:absolute;left:'+u(12)+';right:'+u(12)+';top:'+u(%d)+';border-top:1px solid rgba(255,255,255,.06)\"></div>'" % (y + 13 - 563)
    y += 27.5 if y < 760 else 28.5
el(1378, 563, 288, 358, body + ";")

# ====================== ZLOZENIE ======================
EXTRA = """:host { --u: calc(100cqw / 1672); }
.g { position: absolute; inset: 0; box-sizing: border-box;
  background: linear-gradient(180deg, rgba(42,48,58,.80), rgba(20,24,31,.86));
  border: 1px solid rgba(255,255,255,.13); border-radius: calc(var(--u) * 9);
  box-shadow: 0 calc(var(--u) * 6) calc(var(--u) * 18) rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.07);
  -webkit-backdrop-filter: blur(5px); backdrop-filter: blur(5px); }
"""
CARD_STYLE = ['padding: 0', 'margin: 0', 'background: none', 'border: none', 'box-shadow: none',
              'border-radius: 0', 'height: 100%', 'width: 100%', 'overflow: visible', 'color: #eef2f6',
              'font-family: ' + FONT, 'line-height: 1.15', '--ha-card-background: none', 'cursor: default']
TEMPLATES = {
    'hp': {
        'show_name': False, 'show_icon': False, 'show_state': False, 'show_label': False,
        'tap_action': {'action': 'none'}, 'hold_action': {'action': 'none'}, 'double_tap_action': {'action': 'none'},
        'styles': {
            'card': [{k.split(': ', 1)[0]: k.split(': ', 1)[1]} for k in CARD_STYLE],
            'grid': [{'grid-template-areas': '"c"'}, {'grid-template-columns': '100%'}, {'grid-template-rows': '100%'},
                     {'height': '100%'}, {'width': '100%'}],
            'custom_fields': {'c': [{'position': 'relative'}, {'height': '100%'}, {'width': '100%'}, {'overflow': 'visible'}]},
        },
        'extra_styles': EXTRA,
    },
    'hp_hit': {'template': 'hp', 'styles': {'card': [{'cursor': 'pointer'}]}},
}

DASH = {
    'title': 'Pompa ciepła',
    'button_card_templates': TEMPLATES,
    'views': [{
        'title': 'Pompa ciepła', 'path': 'pompa-ciepla', 'type': 'panel', 'icon': 'mdi:heat-pump',
        'cards': [{
            'type': 'picture-elements',
            'image': '/local/hydrolution/tlo.png',
            'card_mod': {'style': "ha-card { container-type: inline-size; overflow: hidden; border-radius: 12px; }\n"},
            'elements': ELEMENTS,
        }],
    }],
}

class D(yaml.SafeDumper):
    pass
def str_rep(d, s):
    if '\n' in s:
        s = '\n'.join(l.rstrip() for l in s.split('\n'))
        return d.represent_scalar('tag:yaml.org,2002:str', s, style='|')
    return d.represent_scalar('tag:yaml.org,2002:str', s)
D.add_representer(str, str_rep)

HEAD = """# =====================================================================
# Dashboard HA "Pompa ciepla" - MHI Hydrolution (ESPHome hydrolution v5.3)
# Wymaga (HACS -> Frontend): button-card, apexcharts-card, card-mod
# Tlo: /config/www/hydrolution/tlo.png  (-> /local/hydrolution/tlo.png)
# Wklej CALOSC w: Ustawienia -> Dashboardy -> nowy dashboard -> Edytuj -> 3 kropki -> Edytor kodu (raw)
# Plik wygenerowany - pozycje w % tla 1672x941, czcionki skalowane do szerokosci karty (cqw).
# =====================================================================
"""
with open(OUT, 'w') as fh:
    fh.write(HEAD)
    yaml.dump(DASH, fh, Dumper=D, allow_unicode=True, sort_keys=False, width=4000)

# ====================== PODGLAD ======================
MOCK = {
    E['bt1']: '7.8', E['bt12']: '45.0', E['bt3']: '40.8', E['s1']: '34.0', E['bt25']: '33.6', E['bt71']: '29.8',
    E['bt7']: '49.8', E['bt6']: '48.1', E['freq']: '58', E['gp12']: '62', E['flow']: '6.2', E['fan']: '3',
    E['eladd']: '0', E['prio']: 'Ogrzewanie', E['defrost']: 'Nie', E['cpr']: 'on', E['hwmode']: 'Normalny',
    E['add']: 'off', E['leg']: 'on', E['curve']: '3', E['offset']: '0', E['minsup']: '25', E['maxsup']: '55',
    E['p1']: '55', E['p2']: '50', E['p3']: '45', E['p4']: '40', E['p5']: '36', E['p6']: '32', E['p7']: '28',
    E['hwc_run']: '5', E['hwc_still']: '15', E['leg_int']: '7', E['leg_temp']: '60', E['n_start']: '22',
    E['n_end']: '6', E['hw_hour']: '5', E['sch_n']: 'on', E['sch_hw']: 'on', E['stop_lux']: '58',
    E['stop_norm']: '50', E['stop_eco']: '47', E['pwr']: '3.42', E['cop']: '4.18', E['e_day']: '19.6',
    E['e_co']: '13.8', E['e_cwu']: '5.8', E['e_month']: '418.7', E['mode']: 'Auto', E['leg_days']: '6',
    E['leg_last']: '2026-11-14T12:00:00+01:00', E['t_all']: '3.333', E['t_co']: '2.683', E['t_cwu']: '0.65',
    E['starts']: '12',
}
items = []
for e in ELEMENTS:
    if e['type'] != 'custom:button-card':
        items.append({'apex': True, 'style': e['style']})
        continue
    body = e['custom_fields']['c'].strip()[3:-3]
    items.append({'style': e['style'], 'body': body, 'entity': e.get('entity')})
icons = sorted(set(re.findall(r"mdi:[a-z0-9-]+", json.dumps(items))))
with open('icons.json', 'w') as fh:
    json.dump(icons, fh)
import subprocess
imap = json.loads(subprocess.check_output(['node', '-e', "const m=require('@mdi/js');const n=JSON.parse(require('fs').readFileSync('icons.json'));const o={};for(const k of n){const c='mdi'+k.slice(4).split('-').map(w=>w[0].toUpperCase()+w.slice(1)).join('');o[k]=m[c]||'';if(!m[c])console.error('MISSING '+k)}console.log(JSON.stringify(o))"]))
html = open('preview_tpl.html').read().replace('__ICONS__', json.dumps(imap))
html = (html.replace('__ITEMS__', json.dumps(items)).replace('__MOCK__', json.dumps(MOCK))
        .replace('__EXTRAJ__', json.dumps(EXTRA)).replace('__FONT__', FONT))
open(PREVIEW, 'w').write(html)
print('elements', len(ELEMENTS))
