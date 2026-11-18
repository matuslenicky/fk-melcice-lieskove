// Statický generátor webu FK Melčice-Lieskové: data/ + src/ -> dist/   (node build.js; TODAY=2026-11-18 prepíše dnešný dátum)
// Zostavuje ho kluby-siet/engine/assemble.py zo spoločného jadra v2 a tohto súboru (vzhľad, úvod, stránka Klub).
// Kostra „Rozcestník“: úvod je zoznam veľkých riadkov – každý ukáže živé zhrnutie (najbližší zápas, posledný výsledok,
// tabuľka, mládež, klub) a vedie na podstránku. Pod ním výsledky a program áčka. Prísne čiernobiele ako monogram
// v erbe, sivá len na linky. Písmo Archivo v širokom reze (čísla, titulky) a Brygada 1918 (text).
const SKIN = {
  nav: 'bar', theme: '#111111', brand: 'FK Melčice-Lieskové', brandSub: 'futbal pod Bielymi Karpatmi',
  fonts: ['archivo-800.woff', 'brygada-1918-400.woff', 'brygada-1918-600.woff'],
  sources: 'Klub a obec podľa webu obce Melčice-Lieskové a obecných novín Melčicko-lieskovský Elán.',
  adminHero: 'Majster VI. ligy Sever 2024/25',
  adminFacts: club.kronika.zoznam.map((x) => ({ k: x.rok, t: x.text })),
  links: [[club.obecKlub, 'Obecné noviny Melčicko-lieskovský Elán']],
};
const NAV = [['zapasy/', 'Zápasy'], ['tabulky/', 'Tabuľky'], ['timy/', 'Tímy'], ['klub/', 'Klub'], ['kontakt/', 'Kontakt']];
const DESC = `${club.nazov} – zápasy, výsledky, tabuľky a súpisky áčka (${A.leagueName}) a žiakov. Majster VI. ligy Sever 2024/25.`;

add('', {
  title: 'futbal v Melčiciach-Lieskovom', active: '', bodyClass: 'home',
  body: (R) => {
    const n = nextA, l = lastA;
    const wl = winterLine();
    const youth = teams.filter((t) => t !== A);
    const row = (nr, href, label, big, small) => `<li><a class="ix-a" href="${href}"><span class="ix-n" aria-hidden="true">${nr}</span><span class="ix-l">${label}</span><span class="ix-b">${big}</span><span class="ix-s">${small}</span><span class="ix-go" aria-hidden="true">${I.arrow}</span></a></li>`;
    const rows = [
      n && row('01', `${R}${n.url}`, wl ? 'Po zimnej prestávke' : 'Najbližší zápas', glueAbbr(esc(n.opponent)), `${dLong(n.date)}${n.time ? `, ${esc(n.time)}` : ''} · ${n.home ? 'doma' : 'vonku'}`),
      l && row('02', `${R}${l.url}`, 'Posledný výsledok', `${l.gf}:${l.ga}`, `${l.home ? 'doma' : 'vonku'} proti ${esc(l.opponent)}, ${dShort(l.date)}`),
      A.table && row('03', `${R}tabulky/`, 'Tabuľka', `${A.pos}. miesto`, `${zo(A.of)} tímov ${vLige(A.leagueName)}`),
      youth.length && row('04', `${R}timy/`, 'Žiaci', youth.map((t) => esc(t.short)).join(' · '), 'od jari 2026 znova v súťaži'),
      row('05', `${R}klub/`, 'Klub', 'Majster 2024/25', 'VI. liga Sever, ročníky od 2014/15'),
    ].filter(Boolean);
    return `<section class="ix-top"><div class="wrap">
  <h1 class="h1">FK Melčice-Lieskové</h1>
</div></section>
<section class="ix-sec" aria-label="Rozcestník"><div class="wrap"><ol class="ix">${rows.join('')}</ol></div></section>
<section class="sec" aria-label="Zápasy áčka"><div class="wrap ix-two">
  <section aria-labelledby="r-h"><h2 class="ix-h2" id="r-h">Výsledky</h2>${fxList(homeRes(5, lastA), R)}${more(`${R}zapasy/#z-vys`, 'Všetky výsledky')}</section>
  <section aria-labelledby="p-h"><h2 class="ix-h2" id="p-h">Program</h2>${homeUp(5, nextA).length ? fxList(homeUp(5, nextA), R) : '<p>Ďalšie zápasy zatiaľ nie sú vyžrebované.</p>'}${more(`${R}zapasy/`, 'Všetky zápasy')}</section>
</div></section>`;
  },
});

add('klub/', {
  title: 'Klub', active: 'klub/', desc: `${club.nazov}: majster VI. ligy Sever 2024/25, víťaz VII. ligy Sever ObFZ Trenčín 2017/18, ročníky áčka od 2014/15, štadión a obec Melčice-Lieskové.`,
  body: (R) => `${pageHead({ title: 'Klub', sub: `${esc(club.pravnyNazov)}. Tréner áčka ${esc(club.trener)}. Farby z erbu: ${esc(club.farby)}.`, R, crumbs: [[null, 'Klub']] })}
<section class="sec sec--first"><div class="wrap cols2">
  <div><h2 class="h2">Posledné roky</h2>${facts(club.kronika.zoznam.map((x) => ({ k: x.rok, t: x.text })))}</div>
  <div><h2 class="h2">Ročníky áčka</h2>${seasonsTable(club.rocniky.zoznam)}</div>
</div></section>
<section class="sec sec--line"><div class="wrap cols2">
  <div><h2 class="h2">${esc(ST.nazov)}</h2>${facts(ST.fakty)}
    <p class="btns"><a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&amp;destination=${ST.geo.join(',')}" rel="noopener">Navigovať na štadión</a></p></div>
  <div><h2 class="h2">Melčice-Lieskové</h2>${facts(club.obec.fakty)}<p class="note">Zdroje: Sportnet, web obce Melčice-Lieskové, Melčicko-lieskovský Elán 2/2025 až 2/2026.</p></div>
</div></section>`,
});
