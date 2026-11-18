# FK Melčice-Lieskové – návrh webu

Návrh nového webu futbalového klubu FUTBAL – FK Melčice-Lieskové. **Nie je to oficiálna stránka klubu.** Ukážka má v hlavičke pás s týmto upozornením a vyhľadávače ju neindexujú (`noindex`).

Ukážka: https://matuslenicky.github.io/fk-melcice-lieskove/ · administrácia (ukážka bez ukladania): https://matuslenicky.github.io/fk-melcice-lieskove/admin/

## Vzhľad

**„Rozcestník“ (dizajn v2, 18. 11. 2026).** Prísne čiernobiele ako monogram v erbe, sivá len na linky a popisy. Písmo Archivo v širokom reze (čísla, titulky) a Brygada 1918 (text).

- úvod je zoznam veľkých riadkov: najbližší zápas, posledný výsledok, tabuľka, žiaci a klub; každý riadok ukáže živé zhrnutie a vedie na podstránku,
- pod ním výsledky a program,
- posledné roky klubu, ročníky áčka od 2014/15, štadión a obec sú na stránke Klub,
- menu na telefóne je čierna plocha cez celú obrazovku.

Web sa skladá zo spoločného jadra v2 (`kluby-siet/engine`: `python assemble.py <web>`), vlastný je `src/site.js` (úvod, Klub, nastavenia) a `src/css/skin.css`.

## Obsah a zdroje

- Zápasy, výsledky, strelci, karty, počty divákov, zostavy dospelých, tabuľky a súpisky 5 tímov (áčko, U15, U13, U11, U9) zo Sportnetu (Futbalnet), verejné API súťaží (`scripts/sportnet.mjs` → `data/sportnet.json`). Vek hráčov sa neukladá, zostavy len pri dospelých.
- Ročníky áčka 2014/15 – 2025/26 z konečných tabuliek na Sportnete, tituly 2017/18 (VII. liga Sever ObFZ Trenčín) a 2024/25 (VI. liga Sever) (`data/klub.json`).
- Titul 2024/25 a rekonštrukcia kultúrneho domu so šatňami z obecných novín Melčicko-lieskovský Elán 2/2025, návrat žiakov do súťaží a tréner áčka z Elánu 1/2026. Obec podľa webu obce (História, Symboly obce). Rok založenia klubu sme vo verejných zdrojoch nenašli, doplní klub.
- E-mail zo Sportnetu. Vlastný web ani sociálne siete klubu sme nenašli (18. 11. 2026).
- Erb klubu a erby súperov zo Sportnetu (`scripts/logos.py`). Patria príslušným klubom.
- Písmo Archivo a Brygada 1918, licencia SIL Open Font License 1.1 (`scripts/fonts.py`, rovné číslice sú zapečené do písma).

## Zostavenie

Statický generátor bez závislostí (Node 20+, Python 3 s Pillow na erby a fontTools na písmo):

```
python C:\Users\lenic\kluby-siet\engine\assemble.py .   # zloží build.js a site.css zo spoločného jadra
node scripts/sportnet.mjs        # zápasy, tabuľky a súpisky (FULL=1 stiahne znova aj detaily zápasov)
python -I scripts/logos.py       # erby súperov a náš erb do src/img (FORCE=1 stiahne znova)
node build.js                    # data/ + src/ -> dist/ (TODAY=2026-11-18 prepíše dnešný dátum)
node scripts/serve.mjs dist 5457 # náhľad na http://127.0.0.1:5457/ (?nolr = bez obnovovania, s CSP)
node scripts/deploy.mjs          # nasadenie dist/ na vetvu gh-pages (GitHub Pages)
```

Výsledky sa po zápasoch aktualizujú samé cez GitHub Actions (`.github/workflows/sportnet.yml`). Ročníky v `data/klub.json` treba po sezóne doplniť ručne.
