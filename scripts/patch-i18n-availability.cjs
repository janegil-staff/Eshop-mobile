const fs = require('fs');
const path = require('path');

const LOCALES_DIR = path.join(__dirname, '..', 'src', 'i18n', 'locales');

const data = {
  no: { unavailable: 'Utsolgt', shipsInDays_one: 'Sendes om {{count}} dag', shipsInDays_other: 'Sendes om {{count}} dager' },
  en: { unavailable: 'Unavailable', shipsInDays_one: 'Ships in {{count}} day', shipsInDays_other: 'Ships in {{count}} days' },
  nl: { unavailable: 'Niet beschikbaar', shipsInDays_one: 'Verzonden in {{count}} dag', shipsInDays_other: 'Verzonden in {{count}} dagen' },
  fr: { unavailable: 'Indisponible', shipsInDays_one: 'Expédié sous {{count}} jour', shipsInDays_other: 'Expédié sous {{count}} jours' },
  de: { unavailable: 'Nicht verfügbar', shipsInDays_one: 'Versand in {{count}} Tag', shipsInDays_other: 'Versand in {{count}} Tagen' },
  it: { unavailable: 'Non disponibile', shipsInDays_one: 'Spedito in {{count}} giorno', shipsInDays_other: 'Spedito in {{count}} giorni' },
  sv: { unavailable: 'Slut', shipsInDays_one: 'Skickas om {{count}} dag', shipsInDays_other: 'Skickas om {{count}} dagar' },
  da: { unavailable: 'Udsolgt', shipsInDays_one: 'Sendes om {{count}} dag', shipsInDays_other: 'Sendes om {{count}} dage' },
  fi: { unavailable: 'Ei saatavilla', shipsInDays_one: 'Toimitus {{count}} päivässä', shipsInDays_other: 'Toimitus {{count}} päivässä' },
  es: { unavailable: 'No disponible', shipsInDays_one: 'Envío en {{count}} día', shipsInDays_other: 'Envío en {{count}} días' },
  pl: { unavailable: 'Niedostępny', shipsInDays_one: 'Wysyłka za {{count}} dzień', shipsInDays_other: 'Wysyłka za {{count}} dni' },
  pt: { unavailable: 'Indisponível', shipsInDays_one: 'Envio em {{count}} dia', shipsInDays_other: 'Envio em {{count}} dias' },
};

let updated = 0;
for (const lang of Object.keys(data)) {
  const file = path.join(LOCALES_DIR, `${lang}.json`);
  let json = {};
  if (fs.existsSync(file)) {
    try { json = JSON.parse(fs.readFileSync(file, 'utf8')); } catch { json = {}; }
  }
  const before = JSON.stringify(json);
  json.products = { ...(json.products || {}), ...data[lang], ...pickExisting(json.products, data[lang]) };
  if (JSON.stringify(json) !== before) updated++;
  fs.writeFileSync(file, JSON.stringify(json, null, 2) + '\n', 'utf8');
}

// existing keys win (idempotent — never clobber manual edits)
function pickExisting(existing, incoming) {
  const out = {};
  if (!existing) return out;
  for (const k of Object.keys(incoming)) {
    if (existing[k] !== undefined) out[k] = existing[k];
  }
  return out;
}

console.log(`i18n availability patch done — ${updated} files updated.`);