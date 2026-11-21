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
| `tools/` | generator YAML-a i podglądu (`python3 gen.py karta.yaml preview.html`, potem `node shot.js`) |

Kod ESP (v5.3) nie jest w tym repo.

## Instalacja

1. **HACS → Frontend**: zainstaluj `button-card`, `apexcharts-card`, `card-mod` i przeładuj przeglądarkę.
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
