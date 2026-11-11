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
- [x] **P.IVA nel footer** — aggiunti P.IVA/C.F. 12887430960 e REA MI-2690910 (da visura CCIAA), chiave `footer.legal` in i18n.json + `vatID`/`taxID` nei dati strutturati (2026-11-11)
- [ ] **Capitale sociale nel footer** — manca: non è nella visura di inizio attività. Aggiungerlo a `footer.legal` (formato "Cap. soc. € … i.v.") quando disponibile
- [ ] ⏸️ **Privacy policy — RIMANDATA (decisione 2026-11-11)** — pagina dedicata `privacy.html` IT/EN linkata dal footer, informativa ex art. 13 GDPR. Contenuti da coprire:
  - titolare: Maverick Global Investments S.r.l., Via Gabrio Serbelloni 5, 20122 Milano, info@maverickglob.com / mavkglob@pec.it
  - dati raccolti dal form (nome, azienda, email, oggetto, messaggio) + dati tecnici di navigazione
  - destinatari/responsabili: Web3Forms (invio form), GitHub Pages (hosting), Google Fonts (vedi punto 8) — trasferimenti extra-UE (USA)
  - finalità, base giuridica, conservazione, diritti dell'interessato, reclamo al Garante
  - far rivedere il testo da un consulente prima della pubblicazione
- [ ] ⏸️ **Checkbox consenso GDPR** nel form contatti con link all'informativa — insieme alla privacy policy
- [ ] ⏸️ **Correggere `form_note`** (i18n.json, sezione `contact`): oggi dice che i dati "non saranno condivisi con terze parti", ma transitano da Web3Forms → sostituire con rinvio all'informativa — insieme alla privacy policy
- [ ] Valutare pagina "Note legali / Legal"

### 3. Incoerenze nei numeri e nei contenuti
- [x] **1.700 vs 1.400 MWh/MW**: `s1_p1` (investment-sectors) portato a 1.400 MWh/MW, coerente con stat e portfolio (2026-11-11)
- [x] **Email**: verificato (2026-11-11) — `contact@maverickglob.com` è dedicato **solo al form** (messaggio di errore `form_error`); in tutto il resto del sito si usa `info@maverickglob.com`. Nessuna modifica necessaria
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

- [x] **Rimuovere `node_modules` da git** su entrambi i branch (2026-11-11)
- [x] ~~Eliminare `pv_portfolio_map_en_with details.html`~~ — **da tenere**: base per sviluppi futuri della mappa
- [ ] `UPDATES.md` non esiste su nessun branch ma CLAUDE.md dice di consultarlo → ripristinare il file o correggere il riferimento
