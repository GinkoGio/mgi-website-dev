# Migliorie possibili — Checklist

> Esito dell'analisi del sito (branch `main`, contenuti condivisi con `restyling/solar-white`) — 2026-07-14.
> Audience di riferimento: investitori istituzionali, sviluppatori di progetti, operatori di asset, potenziali partner.
> Le modifiche ai contenuti (`src/`, `i18n.json`) valgono per entrambi i branch via `npm run sync:*`.

---

## 🔴 Priorità alta

### 1. Team con nomi e volti
- [ ] La sezione "People Behind the Capital" (about) è anonima: aggiungere nome + ruolo + breve background dei principal
- [ ] Eventuale link LinkedIn personale e/o aziendale (anche nel footer)
- _Motivo: per un investitore istituzionale una firm senza volti è un segnale di opacità. È il singolo intervento a più alto impatto._

### 2. Adempimenti legali (obblighi di legge)
- [ ] **P.IVA nel footer** — obbligatoria sul sito per una S.r.l. (art. 35 DPR 633/72); aggiungere anche capitale sociale e REA
- [ ] **Privacy policy** — pagina dedicata linkata dal footer (il form raccoglie dati personali e li invia a Web3Forms, servizio terzo)
- [ ] **Checkbox consenso GDPR** nel form contatti + informativa ex art. 13
- [ ] Valutare pagina "Note legali / Legal"

### 3. Incoerenze nei numeri e nei contenuti
- [ ] **1.700 vs 1.400 MWh/MW**: `investment-sectors` dice "exceeding 1,700 MWh/MW" nel testo (`s1_p1`, i18n.json:178) ma "1,400+" nella stat (i18n.json:207) e nel portfolio (">1,400"). Nota: 50 MW × 1.400 = 70.000 MWh → coerente con la metrica hero, quindi è il 1.700 a essere probabilmente errato
- [ ] **Email errore form**: `form_error` rimanda a `contact@maverickglob.com` (i18n.json:371) ma ovunque si usa `info@maverickglob.com` — se `contact@` non esiste, il lead va perso
- [ ] **CTA hero divergente tra lingue**: bottone primario EN → What We Do, IT → Portfolio (i18n.json:34). Verificare se intenzionale

---

## 🟡 Priorità media — contenuti

### 4. Track record concreto
- [ ] 2–3 schede sintetiche "operazione tipo" (asset, anno, intervento MGI: acquisizione/revamping/gestione) — anche anonimizzate
- [ ] In alternativa/aggiunta: PDF "company profile" scaricabile (standard di settore)

### 5. Snellire e differenziare la prosa
- [ ] KPI identiche ripetute su 3 pagine (home, philosophy, portfolio): toglierle da *Philosophy*, dove diluiscono il messaggio
- [ ] Tagliare ~20–25% della prosa "consulenziale" su Philosophy e Sectors (es. `partner_p5`, i18n.json:252 — dice al lettore cosa pensare invece di mostrare fatti)

### 6. Wording regolamentare
- [ ] Rivedere CTA tipo "Ready to Explore Investment Opportunities?" — MGI investe capitale proprio, non raccoglie capitale dal pubblico: formulazioni come "Discutiamo una partnership" / "Co-investment per controparti qualificate" sono più sicure (rischio percezione sollecitazione al pubblico risparmio / Consob)

---

## 🟢 Priorità media — tecnica

### 7. Pagina 404
- [ ] Creare `404.html` (GitHub Pages la usa automaticamente)

### 8. Font self-hosted
- [ ] Sostituire Google Fonts CDN con font self-hosted — risolve sia GDPR (giurisprudenza tedesca su Google Fonts) sia performance (render-blocking)

### 9. Accessibilità / motion
- [ ] Supportare `prefers-reduced-motion`: canvas animato, parallax e counter animati oggi ignorano la preferenza di sistema

### 10. Dominio e SEO
- [ ] Canonical/og:url/hreflang puntano a `www.maverickglob.com` (oggi non attivo) — da verificare appena il dominio va live
- [ ] Rimuovere `meta_keywords` (ignorato dai motori dal ~2009)
- [ ] `© 2026` hardcoded nel footer → generare l'anno al build o aggiornarlo annualmente

---

## ⚪ Igiene repository (invisibile agli utenti)

- [ ] **Rimuovere `node_modules` da git** su entrambi i branch (~1.900 file committati prima del .gitignore): `git rm -r --cached node_modules`
- [ ] Eliminare file orfano `pv_portfolio_map_en_with details.html` (entrambi i branch)
- [ ] `UPDATES.md` non esiste su nessun branch ma CLAUDE.md dice di consultarlo → ripristinare il file o correggere il riferimento
