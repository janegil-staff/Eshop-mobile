const fs = require('fs');
const path = require('path');

const LOCALES_DIR = path.join(__dirname, '..', 'src', 'i18n', 'locales');

const tabs = {
  no: { home: 'Hjem', categories: 'Kategorier', cart: 'Handlekurv' },
  en: { home: 'Home', categories: 'Categories', cart: 'Cart' },
  nl: { home: 'Home', categories: 'Categorieën', cart: 'Winkelwagen' },
  fr: { home: 'Accueil', categories: 'Catégories', cart: 'Panier' },
  de: { home: 'Start', categories: 'Kategorien', cart: 'Warenkorb' },
  it: { home: 'Home', categories: 'Categorie', cart: 'Carrello' },
  sv: { home: 'Hem', categories: 'Kategorier', cart: 'Varukorg' },
  da: { home: 'Hjem', categories: 'Kategorier', cart: 'Kurv' },
  fi: { home: 'Koti', categories: 'Kategoriat', cart: 'Ostoskori' },
  es: { home: 'Inicio', categories: 'Categorías', cart: 'Carrito' },
  pl: { home: 'Główna', categories: 'Kategorie', cart: 'Koszyk' },
  pt: { home: 'Início', categories: 'Categorias', cart: 'Carrinho' },
};

let updated = 0;
for (const lang of Object.keys(tabs)) {
  const file = path.join(LOCALES_DIR, `${lang}.json`);
  let json = {};
  if (fs.existsSync(file)) {
    try {
      json = JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch {
      json = {};
    }
  }
  const before = JSON.stringify(json);
  json.tabs = { ...tabs[lang], ...(json.tabs || {}) };
  if (JSON.stringify(json) !== before) updated++;
  fs.writeFileSync(file, JSON.stringify(json, null, 2) + '\n', 'utf8');
}
console.log(`i18n tabs patch done — ${updated} files updated.`);