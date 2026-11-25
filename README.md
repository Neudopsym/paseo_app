# Paseo

Kurzy jazykov pre slovensky hovoriacich, A1–B2. Po spustení si vyberieš jazyk:

- **Španielčina** (zo Španielska): 44 lekcií podľa učebníc Aula internacional Plus.
- **Ruština**: 44 lekcií podľa učebníc Poechali! a Doroga v Rossiju, ruština len azbukou, bez vyznačeného prízvuku.

Každý kurz má lekcie (slovná zásoba, rozprávanie, cvičenia, dialóg), kartičky, príručku gramatiky a pokrok. Jazyk sa mení vlajkou hore vpravo.

- Nasadenie: GitHub Pages (Settings → Pages → Deploy from a branch → main / root).
- Obsah: `data/es/` a `data/ru/` (course.json = osnova, a1.json = lekcie 1–10, grammar.json, verbs.json). Ďalšie úrovne pribudnú ako `a2.json` atď.
- Rozpoznávanie reči: Web Speech API v Chrome (es-ES, ru-RU), potrebuje internet.
- Pokrok: v zariadení (localStorage), pre každý jazyk zvlášť; záloha cez Pokrok → Záloha pokroku.
