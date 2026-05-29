const fs = require('fs');
const path = require('path');

const LOCALES_DIR = path.join(__dirname, '..', 'src', 'i18n', 'locales');

const translations = {
  no: {
    title: 'Produkter',
    loading: 'Laster produkter...',
    error: 'Kunne ikke laste produkter',
    retry: 'Prøv igjen',
    empty: 'Ingen produkter funnet',
    outOfStock: 'Utsolgt',
    inStock: 'På lager',
    addToCart: 'Legg i handlekurv',
    description: 'Beskrivelse',
    brand: 'Merke',
    reviews: 'anmeldelser',
  },
  en: {
    title: 'Products',
    loading: 'Loading products...',
    error: 'Could not load products',
    retry: 'Retry',
    empty: 'No products found',
    outOfStock: 'Out of stock',
    inStock: 'In stock',
    addToCart: 'Add to cart',
    description: 'Description',
    brand: 'Brand',
    reviews: 'reviews',
  },
  nl: {
    title: 'Producten',
    loading: 'Producten laden...',
    error: 'Kan producten niet laden',
    retry: 'Opnieuw',
    empty: 'Geen producten gevonden',
    outOfStock: 'Uitverkocht',
    inStock: 'Op voorraad',
    addToCart: 'In winkelwagen',
    description: 'Beschrijving',
    brand: 'Merk',
    reviews: 'beoordelingen',
  },
  fr: {
    title: 'Produits',
    loading: 'Chargement des produits...',
    error: 'Impossible de charger les produits',
    retry: 'Réessayer',
    empty: 'Aucun produit trouvé',
    outOfStock: 'Épuisé',
    inStock: 'En stock',
    addToCart: 'Ajouter au panier',
    description: 'Description',
    brand: 'Marque',
    reviews: 'avis',
  },
  de: {
    title: 'Produkte',
    loading: 'Produkte werden geladen...',
    error: 'Produkte konnten nicht geladen werden',
    retry: 'Erneut versuchen',
    empty: 'Keine Produkte gefunden',
    outOfStock: 'Ausverkauft',
    inStock: 'Auf Lager',
    addToCart: 'In den Warenkorb',
    description: 'Beschreibung',
    brand: 'Marke',
    reviews: 'Bewertungen',
  },
  it: {
    title: 'Prodotti',
    loading: 'Caricamento prodotti...',
    error: 'Impossibile caricare i prodotti',
    retry: 'Riprova',
    empty: 'Nessun prodotto trovato',
    outOfStock: 'Esaurito',
    inStock: 'Disponibile',
    addToCart: 'Aggiungi al carrello',
    description: 'Descrizione',
    brand: 'Marca',
    reviews: 'recensioni',
  },
  sv: {
    title: 'Produkter',
    loading: 'Laddar produkter...',
    error: 'Kunde inte ladda produkter',
    retry: 'Försök igen',
    empty: 'Inga produkter hittades',
    outOfStock: 'Slutsåld',
    inStock: 'I lager',
    addToCart: 'Lägg i varukorg',
    description: 'Beskrivning',
    brand: 'Märke',
    reviews: 'recensioner',
  },
  da: {
    title: 'Produkter',
    loading: 'Indlæser produkter...',
    error: 'Kunne ikke indlæse produkter',
    retry: 'Prøv igen',
    empty: 'Ingen produkter fundet',
    outOfStock: 'Udsolgt',
    inStock: 'På lager',
    addToCart: 'Læg i kurv',
    description: 'Beskrivelse',
    brand: 'Mærke',
    reviews: 'anmeldelser',
  },
  fi: {
    title: 'Tuotteet',
    loading: 'Ladataan tuotteita...',
    error: 'Tuotteita ei voitu ladata',
    retry: 'Yritä uudelleen',
    empty: 'Tuotteita ei löytynyt',
    outOfStock: 'Loppuunmyyty',
    inStock: 'Varastossa',
    addToCart: 'Lisää ostoskoriin',
    description: 'Kuvaus',
    brand: 'Merkki',
    reviews: 'arvostelua',
  },
  es: {
    title: 'Productos',
    loading: 'Cargando productos...',
    error: 'No se pudieron cargar los productos',
    retry: 'Reintentar',
    empty: 'No se encontraron productos',
    outOfStock: 'Agotado',
    inStock: 'En stock',
    addToCart: 'Añadir al carrito',
    description: 'Descripción',
    brand: 'Marca',
    reviews: 'reseñas',
  },
  pl: {
    title: 'Produkty',
    loading: 'Ładowanie produktów...',
    error: 'Nie udało się załadować produktów',
    retry: 'Spróbuj ponownie',
    empty: 'Nie znaleziono produktów',
    outOfStock: 'Wyprzedane',
    inStock: 'Dostępne',
    addToCart: 'Dodaj do koszyka',
    description: 'Opis',
    brand: 'Marka',
    reviews: 'recenzji',
  },
  pt: {
    title: 'Produtos',
    loading: 'A carregar produtos...',
    error: 'Não foi possível carregar os produtos',
    retry: 'Tentar novamente',
    empty: 'Nenhum produto encontrado',
    outOfStock: 'Esgotado',
    inStock: 'Em stock',
    addToCart: 'Adicionar ao carrinho',
    description: 'Descrição',
    brand: 'Marca',
    reviews: 'avaliações',
  },
};

const LANGS = Object.keys(translations);

if (!fs.existsSync(LOCALES_DIR)) {
  fs.mkdirSync(LOCALES_DIR, { recursive: true });
}

let created = 0;
let updated = 0;

for (const lang of LANGS) {
  const filePath = path.join(LOCALES_DIR, `${lang}.json`);
  let existing = {};
  if (fs.existsSync(filePath)) {
    try {
      existing = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (e) {
      console.warn(`⚠️  ${lang}.json was invalid JSON, recreating.`);
      existing = {};
    }
  }

  // Idempotent merge: only fill missing keys, never overwrite existing edits.
  const before = JSON.stringify(existing);
  existing.products = { ...translations[lang], ...(existing.products || {}) };
  const after = JSON.stringify(existing);

  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2) + '\n', 'utf8');

  if (before === '{}') created++;
  else if (before !== after) updated++;
}

console.log(
  `i18n products patch done — ${created} created, ${updated} updated, ${LANGS.length} total.`
);