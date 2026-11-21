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
