# Karta HA – pompa ciepła MHI Hydrolution

Dashboard Home Assistant dla pompy MHI Hydrolution (RC-HY40-W = NIBE SMO 40) czytanej przez ESP (ESPHome `hydrolution` v5.3, emulacja MODBUS40).
Jedna karta `picture-elements` na tle `tlo.png`. Na tło nakładane są kafle, panele i wartości na żywo w stylu wzoru.

![podgląd](docs/podglad.png)

Podgląd jest wygenerowany z przykładowymi wartościami. Wykres trendów to w HA `apexcharts-card`, a na podglądzie jest tylko atrapa.

## Co jest w repo

| Plik | Do czego |
|---|---|
| `dashboard/pompa_ciepla.yaml` | cały dashboard (szablony button-card + widok panel z kartą) |
| `packages/hydrolution_karta.yaml` | pakiet HA: moc grzewcza, moc elektryczna (szacunek), COP, energia dziś/miesiąc, czasy pracy dziś, starty dziś, tryb systemu, antylegionella, skrypty przycisków trybu |
| `www/hydrolution/tlo.png` | tło 1672×941 |
| `docs/wzor.png` | wzór, z którego robiona była karta |
| `dist/ha-karta-pompa-ciepla.js` + `hacs.json` | karta JS dla HACS (`type: custom:ha-karta-pompa-ciepla`) i panel boczny (`ha-pompa-ciepla-panel`) |
| `dashboard/pompa_ciepla_js.yaml` | osobny dashboard (zakładka w menu) z kartą JS |
| `tools/` | generator: `python3 gen.py karta.yaml preview.html dist.js v1.x`, podgląd `node shot.js` / `node jsshot.js` |

Kod ESP (v5.3) nie jest w tym repo.

## Instalacja przez HACS (karta JS, zalecane)

Karta `custom:ha-karta-pompa-ciepla` to jeden plik JS. Nie potrzebuje button-card, apexcharts-card ani card-mod, a tło ma wbudowane.

1. HACS → ⋮ → **Custom repositories** → `https://github.com/voltronicpl/ha-karta-pompa-ciepla`, typ **Dashboard** → Dodaj → Pobierz. Przeładuj przeglądarkę.
2. Wgraj pakiet `packages/hydrolution_karta.yaml` tak jak w kroku 3 instalacji ręcznej niżej. Bez niego nie będzie COP, energii, czasów pracy ani przycisków trybu.
3. Dodaj kartę. Najlepiej w widoku typu **Panel**, wtedy zajmuje całą szerokość:
   ```yaml
   type: custom:ha-karta-pompa-ciepla
   # opcjonalnie:
   # image: /local/hydrolution/tlo.png     # własne tło 1672x941 zamiast wbudowanego
   # entities:                             # gdy masz inne ID encji
   #   bt1: sensor.moja_temperatura_zewnetrzna
   ```
   Klucze encji (`bt1`, `bt12`, `prio`, `pwr`…) są wypisane na początku pliku `dist/ha-karta-pompa-ciepla.js` (`DEFAULT_E`).

Wykres trendów 24 h karta rysuje sama z historii HA i odświeża go co 5 minut.

## Osobna zakładka w lewym menu HA

**Automatycznie (od v1.5):** po instalacji z HACS i przeładowaniu przeglądarki, przy pierwszym wejściu do HA na koncie **admina**, karta sama zakłada dashboard „Pompa ciepła” (`/pompa-ciepla`, ikona `mdi:heat-pump`) i pokazuje go w lewym menu. Nie trzeba ruszać `configuration.yaml`.
- Robi to tylko raz w danej przeglądarce. Jeśli dashboard `pompa-ciepla` już istnieje, nic nie zmienia.
- Na koncie bez uprawnień admina nic nie robi.
- Jak usuniesz ten dashboard, sam nie wróci. Gdybyś chciał, żeby karta założyła go jeszcze raz, w konsoli przeglądarki (F12) wpisz `localStorage.removeItem('hkpc_auto_dashboard')` i odśwież stronę.
- Żeby wyłączyć to w ogóle, przed instalacją wpisz w konsoli `localStorage.setItem('hkpc_auto_dashboard','off')`.

Jeśli wolisz zrobić to ręcznie:

**Sposób A, dashboard (najprościej):**
1. **Ustawienia → Dashboardy → Dodaj dashboard → Nowy dashboard od zera.** Tytuł „Pompa ciepła”, ikona `mdi:heat-pump`, włącz **Pokaż w pasku bocznym**.
2. Otwórz go i wejdź w **Edytuj → ⋮ → Edytor kodu (raw)**. Wklej `dashboard/pompa_ciepla_js.yaml` (widok typu Panel z kartą na całą szerokość).

**Sposób B, panel bez edytora dashboardów (`panel_custom`):** dopisz do `configuration.yaml` i zrestartuj HA:
```yaml
panel_custom:
  - name: ha-pompa-ciepla-panel
    url_path: pompa-ciepla
    sidebar_title: Pompa ciepła
    sidebar_icon: mdi:heat-pump
    module_url: /hacsfiles/ha-karta-pompa-ciepla/ha-karta-pompa-ciepla.js
    # config:                     # opcjonalnie, to samo co w karcie
    #   entities:
    #     bt1: sensor.moja_temperatura_zewnetrzna
```
Panel ma pasek z tytułem i przyciskiem menu. Karta jest dopasowana do ekranu (szerokość i wysokość).

## Instalacja ręczna (YAML, button-card)

1. **HACS → Frontend**: zainstaluj `button-card`, `apexcharts-card`, `card-mod` i przeładuj przeglądarkę.
   - HACS: https://hacs.xyz/docs/use/
   - button-card: https://github.com/custom-cards/button-card
     [![HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=custom-cards&repository=button-card&category=plugin)
   - apexcharts-card: https://github.com/RomRider/apexcharts-card
     [![HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=RomRider&repository=apexcharts-card&category=plugin)
   - card-mod: https://github.com/thomasloven/lovelace-card-mod
     [![HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=thomasloven&repository=lovelace-card-mod&category=plugin)
2. Skopiuj `www/hydrolution/tlo.png` do `/config/www/hydrolution/tlo.png`.
3. Skopiuj `packages/hydrolution_karta.yaml` do `/config/packages/`. W `configuration.yaml` dodaj (jeśli nie masz):
   ```yaml
   homeassistant:
     packages: !include_dir_named packages
   ```
   Potem sprawdź konfigurację i zrestartuj HA.
4. **Ustawienia → Dashboardy → Dodaj dashboard** (od zera). Otwórz go, wejdź w **Edytuj → ⋮ → Edytor kodu (raw)** i wklej całość `dashboard/pompa_ciepla.yaml`.
5. ESP musi mieć wgrane v5.3, bo karta używa encji z v5.3: przepływ BF1, tryb pracy, ogrzewanie dozwolone, temp. stop CWU, wentylator i prąd jednostki zewnętrznej.

## Jak to działa

- Pozycje elementów są w % tła, więc karta skaluje się razem z obrazkiem. Czcionki są w jednostkach `cqw` (kontener = karta), więc też się skalują. Widok jest typu `panel`, czyli karta na całą szerokość.
- Kliknięcie w wartość otwiera okno encji (more-info). Przyciski robią tak:
  - **Tryb systemu**: odpala skrypty `script.hp_tryb_*`.
  - **Strzałki ‹ ›** przy krzywej: `number.set_value` ±1, z pilnowaniem min/max.
  - **Przełączniki**: harmonogram nocny, harmonogram CWU i antylegionella przełączają encje ESP.
- Encje mają domyślne ID z ESPHome (`sensor.hydrolution_...`). Jeśli masz inne, zmień je w `tools/gen.py` (słownik `E`) i wygeneruj plik jeszcze raz, albo zamień je ręcznie w YAML-u.

## Ograniczenia (uczciwie)

- **Tryb systemu Auto/CO/CWU/Urlop**: SMO40 nie ma takiego jednego rejestru. Mapowanie jest takie: Auto = tryb pracy Auto. CO = Ręczny + ogrzewanie dozwolone. CWU = Ręczny + ogrzewanie zablokowane. Urlop = tryb urlopowy. **Sprawdź na sterowniku**, zanim zaczniesz na tym polegać.
- **Bufor CO** pokazuje BT25 (zasilanie zewnętrzne), bo SMO40 nie ma osobnego czujnika bufora. Zasilanie i powrót CO to BT25 i BT71, a nie BT14/BT15 jak na wzorze. BT14 to gorące gazy, a BT15 to linia cieczy.
- **Moc elektryczna / COP** to szacunek: prąd jednostki zewnętrznej (rejestr 44866) × 230 V + grzałka. Napięcie zmienisz w pakiecie.
- **Moc grzewcza** liczona jest z przepływu BF1 × ΔT (BT12−BT3). Gdy przepływ = 0 albo go nie ma, brana jest wartość 44706 z ESP (całe kW).
- **Wentylator** pokazuje stopień (rejestr 44979), a nie %. SMO40 nie podaje % dla EB101.
- **Cyrkulacja CWU** nie ma rejestru stanu pompy. „Włączona” i przełącznik pokazują tylko, że czas pracy > 0. Kliknięcie otwiera nastawę.
- **Antylegionella – ostatnie** zapisuje HA w chwili, gdy BT7 dojdzie do temp. końcowej −1 °C. Do pierwszego przegrzania pokazuje „–”.
- **Krzywa grzewcza**: punkty P1–P7 są rysowane dla −30, −20, −10, 0, 10, 20, 30 °C, czyli tak jak w menu własnej krzywej NIBE. Przesunięcie krzywej jest doliczone. Pomarańczowa kropka to aktualne BT1 i zadane S1.
- Ostatni kafel w rzędzie (pusty na wzorze) pokazuje odszranianie.

## Harmonogram tygodniowy (od v1.11)

Pod mapą karta ma blok **„Harmonogram”**: plan Pn–Nd z osią 0–24 h dla pięciu funkcji (obniżenie CO, tryb CWU wg godzin, cyrkulacja CWU, grzałka, jednorazowe podgrzanie CWU). Okna przeciągasz myszą po osi (krok 15 min), klikasz, żeby edytować godziny, ⧉ kopiuje dzień na wszystkie dni, a **Zapisz harmonogram** wysyła plan do HA. Całością rządzi Home Assistant, ESP niczego nie planuje.

Wymagania:
1. Pakiet `packages/hydrolution_karta.yaml` (pomocnicze przełączniki, wartości i automatyzacje) i `packages: !include_dir_named packages` w `configuration.yaml`, potem przeładowanie konfiguracji.
2. Harmonogramy `schedule.hp_plan_*`: konto administratora klika w bloku **Utwórz harmonogramy**. Edycja okien też wymaga administratora.
3. Każdą funkcję włączasz jej przełącznikiem w bloku (domyślnie wyłączone, nic nie rusza ustawień pompy).

Poza oknem cyrkulacja ma pracę 1 min / postój 60 min, bo sterownik SMO40 nie ma pełnego wyłączenia.

## Zakładka Nauka i dopasowanie do ekranu (od v1.14)

Pod kartą są dwie zakładki: **Harmonogram** i **Nauka**. Nauka jest tylko do podglądu i nic nie zmienia w pompie.

- **Krzywa grzewcza: obecna i proponowana.** Karta bierze z historii HA (statystyki godzinowe recordera) temperaturę zewnętrzną BT1 i temperaturę w domu, a z Open-Meteo (`api.open-meteo.com`, położenie domu z ustawień HA) wiatr, zachmurzenie i nasłonecznienie z tych samych godzin. Liczy, przy jakich temperaturach zewnętrznych w domu było za ciepło lub za zimno (godziny 8–22), i ile trzeba przesunąć punkty P1–P7, żeby było równo. Do tego dokłada poprawkę na prognozę słońca i wiatru na najbliższe 12 h. Pod wykresem jest lista, co przesunęło propozycję. Punkty ustawiasz sam w panelu „Własna krzywa”.
- **Cyrkulacja CWU: proponowany harmonogram Pn–Nd** z historii obecności telefonów (`person.*`). Zasady: dom pusty = wyłączona, jesteście i nie śpicie = włączona, sen = wyłączona. Sen wykrywa z nocnych okien obecności bez aktywności (światła, media, ładowanie/ekran telefonów). Przycisk **Wyślij na główną** wpisuje okna do harmonogramu „Cyrkulacja CWU” w zakładce Harmonogram jako niezapisane zmiany. Zapisujesz sam przyciskiem „Zapisz harmonogram” (albo „Cofnij zmiany”). Przełącznik „Aktywne” nie jest ruszany.
- **Kafle** pokazują, ile dni historii faktycznie użyto do krzywej i do cyrkulacji.
- **Źródła nauki:** własna lista encji (temperatura w domu, osoby/telefony, aktywność, czujniki pogody). Dodajesz i usuwasz w zakładce Nauka. Lista jest zapisywana w HA (dane użytkownika frontendu) i nie zmienia samych encji. „Auto” wraca do wykrywania automatycznego.

Opcjonalnie w konfiguracji karty:
```yaml
nauka:
  cel: 21.5          # docelowa temp. w domu (domyślnie mediana z historii)
  dni_krzywa: 60     # max dni historii do krzywej (max 92)
  dni_cyrkulacja: 28 # max dni historii do cyrkulacji
dopasuj_ekran: true  # false = stare zachowanie (karta na całą szerokość)
# ekran_gora: 64     # ile px zajmuje pasek HA nad kartą (domyślnie mierzone)
```

**Dopasowanie do ekranu:** na komputerze mapa razem z całym dolnym rzędem paneli (krzywa grzewcza, P1–P7, przyciski) mieści się w oknie bez przewijania. Karta skaluje się z szerokości i wysokości okna z zachowaniem proporcji. Harmonogram i Nauka są niżej, po przewinięciu. Telefon (do 700 px) działa jak w v1.13.

## v1.15: automatyczna cyrkulacja, pomiar pompy, prognoza vs rzeczywistość, „Chcę w domu”

- **Automatyzacja cyrkulacji** (suwak w Nauce, `input_boolean.hp_auto_cyrk`, domyślnie wyłączony). Włączona: cyrkulacja CWU idzie wg harmonogramu „Cyrkulacja CWU” i obecności telefonów (`zone.home`). Wszyscy wyszli na 10 min = wyłączona, ktoś wrócił = od razu wg harmonogramu, pora snu blokuje (okna z Nauki omijają sen). Gdy jest włączona, stara automatyzacja `hp_plan_cyrk` czeka. Wymaga pakietu z tej wersji.
- W Nauce przy cyrkulacji: stan teraz i powód (pusty dom / ktoś jest / sen / poza oknem), czerwona kreska „teraz”, żółta kreska = obecny harmonogram na głównej, okna można poprawić ręcznie (przeciągnij = dodaj, klik = zmień/usuń, ⧉ = kopiuj dzień) przed „Wyślij na główną”.
- **Temperatura zewnętrzna z pompy (BT1)** idzie do nauki. Pakiet dodaje `sensor.hp_temperatura_zewnetrzna_bt1` (statystyki długoterminowe, własna historia). Open-Meteo jest tylko symulacją tam, gdzie pomiaru brak, i prognozą. Wykres: pomiar pompy vs symulacja, 7 dni wstecz + 2 dni do przodu.
- **Prognoza vs rzeczywistość:** prognoza Open-Meteo wydana dobę wcześniej (archiwum `previous-runs-api.open-meteo.com`) na tle pomiaru BT1, średni błąd, przechył i największa pomyłka.
- **„Chcę w domu: __ °C”** przy wykresie krzywej: proponowana krzywa liczy się dla tej temperatury w domu. Temperatura w domu z czujnika salonu (osobna pozycja w „Źródłach nauki”, wykrywany po nazwie „salon”, można zmienić).

### Co wkleić w HA (v1.15+), krok po kroku

1. HACS → „Karta pompy ciepła” → ⋮ → Pobierz najnowszą wersję → odśwież przeglądarkę (Ctrl+F5).
2. Zrób kopię `/config/packages/hydrolution_karta.yaml` (np. File editor → zapisz jako `hydrolution_karta.yaml.bak`), potem wklej tam całą treść `packages/hydrolution_karta.yaml` z repo. Dochodzi: `input_boolean.hp_auto_cyrk` (wyłączony), automatyzacja „HP auto: cyrkulacja CWU wg harmonogramu i obecności”, `sensor.hp_temperatura_zewnetrzna_bt1`. W starej automatyzacji „HP plan: cyrkulacja CWU” dochodzi tylko warunek „czekaj, gdy auto włączone”.
3. Narzędzia deweloperskie → YAML → „Sprawdź konfigurację”, potem przeładuj: Przełączniki (input boolean), Encje szablonów, Automatyzacje. Restart nie jest potrzebny.
4. Karta → zakładka **Nauka** → na dole „Źródła nauki” → „Czujnik salonu”: wpisz albo wybierz swój czujnik salonu (np. `sensor.czujnik_temperatury_salon_temperature`) → **Ustaw**. Karta sama szuka encji z „salon” w nazwie, więc zwykle jest już ustawiony.
5. Suwak „Automatyzacja cyrkulacji” w Nauce włączasz sam, kiedy chcesz.

## v1.17: pora wstawania

W Nauce przy cyrkulacji jest „Pora wstawania”, osobno Pn–Pt i So–Nd: **Auto** (mediana końca wykrytego snu z historii telefonów i aktywności; bez historii 6:30 w tygodniu i 8:00 w weekend) albo **Ręcznie** (godzina). Cyrkulacja dostaje okno od „wstanie − X min” (domyślnie 20, do zmiany) do pół godziny po wstaniu. Na wykresie jest znacznik ⏰ z godziną. Ustawienia zapisują się w HA razem ze „Źródłami nauki”. Pakietu HA nie trzeba zmieniać.

## v1.18: weekend = wstanie z czujników

Pora wstawania Pn–Pt jest stała (z historii albo ręcznie). W weekend godzina to tylko sugestia: pakiet dodaje `binary_sensor.hp_aktywnosc_w_domu` (światła, ruch/obecność, ekran telefonu, media), `input_datetime.hp_wstalismy` i automatyzację „HP auto: weekend - wstalismy (cyrkulacja)”. Przy włączonej automatyzacji cyrkulacji pierwsza aktywność rano w So/Nd (5:00–11:00, ktoś w domu) zapisuje godzinę wstania i włącza cyrkulację na 60 min. Bez sygnału zostaje okno z sugestii w harmonogramie. Wymaga wklejenia nowego pakietu (kroki jak wyżej, przeładuj też „Pomocnicy daty/czasu”).
Uwaga: jeśli jakieś światło świeci całą noc, sensor aktywności już jest „on” i rano nie zmieni stanu; wtedy działa tylko okno z sugestii.

## v1.19: po wyjściu / po wstaniu / Przelicz ze zmianami

- „Po wyjściu wszystkich wyłącz po __ min” (domyślnie 5) w Nauce, zapisywane w `input_number.hp_cyrk_po_wyjsciu` i używane przez automatyzację cyrkulacji.
- „i __ min po wstaniu” (domyślnie 30): okno po wstaniu trwa od X min przed do Y min po wstaniu (w weekend tyle trwa cyrkulacja po wykryciu wstania, `input_number.hp_cyrk_po_wstaniu`). Jeśli zwykle jesteście wtedy w domu i nie śpicie, łączy się z oknem obecności i wychodzi dłużej.
- „Przelicz” pokazuje, co się zmieniło od poprzedniego liczenia: lista różnic (punkty krzywej, pora wstawania, okna cyrkulacji dzień po dniu), szara przerywana linia na wykresie krzywej i szare ramki starych okien. Nic się nie zapisuje do harmonogramu bez „Wyślij na główną”.
- Wymaga wklejenia nowego pakietu (dwa nowe `input_number`). Karta przy pierwszym uruchomieniu wpisze w nie 5 i 30.
