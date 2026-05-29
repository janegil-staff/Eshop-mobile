const fs = require('fs');
const path = require('path');
const LOCALES_DIR = path.join(__dirname, '..', 'src', 'i18n', 'locales');

const data = {
  no: {
    cart: { empty: 'Handlekurven er tom', startShopping: 'Start å handle', total: 'Totalt', remove: 'Fjern', checkout: 'Til kassen', freeShipping: 'Gratis frakt' },
    checkout: { title: 'Kasse', shipping: 'Leveringsadresse', address1: 'Adresse', address2: 'Adresse 2 (valgfritt)', zip: 'Postnr.', city: 'By', country: 'Land', phone: 'Telefon', payNow: 'Betal {{total}} kr', secureNote: 'Sikker betaling med Stripe', missingTitle: 'Mangler informasjon', missingBody: 'Vennligst fyll ut alle påkrevde felt.', failedTitle: 'Betaling mislyktes' },
    confirmation: { title: 'Takk for bestillingen!', body: 'Betalingen er gjennomført.', orderNumber: 'Ordrenummer', shipping: 'Du får sporingsinfo når varen sendes.', continue: 'Fortsett å handle' },
  },
  en: {
    cart: { empty: 'Your cart is empty', startShopping: 'Start shopping', total: 'Total', remove: 'Remove', checkout: 'Checkout', freeShipping: 'Free shipping' },
    checkout: { title: 'Checkout', shipping: 'Shipping address', address1: 'Address', address2: 'Address 2 (optional)', zip: 'ZIP', city: 'City', country: 'Country', phone: 'Phone', payNow: 'Pay {{total}} kr', secureNote: 'Secure payment with Stripe', missingTitle: 'Missing information', missingBody: 'Please fill in all required fields.', failedTitle: 'Payment failed' },
    confirmation: { title: 'Thank you for your order!', body: 'Your payment was successful.', orderNumber: 'Order number', shipping: "You'll get tracking info when it ships.", continue: 'Continue shopping' },
  },
  nl: {
    cart: { empty: 'Je winkelwagen is leeg', startShopping: 'Begin met winkelen', total: 'Totaal', remove: 'Verwijderen', checkout: 'Afrekenen', freeShipping: 'Gratis verzending' },
    checkout: { title: 'Afrekenen', shipping: 'Verzendadres', address1: 'Adres', address2: 'Adres 2 (optioneel)', zip: 'Postcode', city: 'Plaats', country: 'Land', phone: 'Telefoon', payNow: 'Betaal {{total}} kr', secureNote: 'Veilig betalen met Stripe', missingTitle: 'Ontbrekende gegevens', missingBody: 'Vul alle verplichte velden in.', failedTitle: 'Betaling mislukt' },
    confirmation: { title: 'Bedankt voor je bestelling!', body: 'Je betaling is gelukt.', orderNumber: 'Bestelnummer', shipping: 'Je ontvangt trackinginfo bij verzending.', continue: 'Verder winkelen' },
  },
  fr: {
    cart: { empty: 'Votre panier est vide', startShopping: 'Commencer vos achats', total: 'Total', remove: 'Retirer', checkout: 'Commander', freeShipping: 'Livraison gratuite' },
    checkout: { title: 'Commande', shipping: 'Adresse de livraison', address1: 'Adresse', address2: 'Adresse 2 (facultatif)', zip: 'Code postal', city: 'Ville', country: 'Pays', phone: 'Téléphone', payNow: 'Payer {{total}} kr', secureNote: 'Paiement sécurisé avec Stripe', missingTitle: 'Informations manquantes', missingBody: 'Veuillez remplir tous les champs requis.', failedTitle: 'Échec du paiement' },
    confirmation: { title: 'Merci pour votre commande !', body: 'Votre paiement a réussi.', orderNumber: 'Numéro de commande', shipping: "Vous recevrez le suivi à l'expédition.", continue: 'Continuer mes achats' },
  },
  de: {
    cart: { empty: 'Dein Warenkorb ist leer', startShopping: 'Jetzt einkaufen', total: 'Gesamt', remove: 'Entfernen', checkout: 'Zur Kasse', freeShipping: 'Kostenloser Versand' },
    checkout: { title: 'Kasse', shipping: 'Lieferadresse', address1: 'Adresse', address2: 'Adresse 2 (optional)', zip: 'PLZ', city: 'Stadt', country: 'Land', phone: 'Telefon', payNow: '{{total}} kr bezahlen', secureNote: 'Sichere Zahlung mit Stripe', missingTitle: 'Fehlende Angaben', missingBody: 'Bitte alle Pflichtfelder ausfüllen.', failedTitle: 'Zahlung fehlgeschlagen' },
    confirmation: { title: 'Danke für deine Bestellung!', body: 'Deine Zahlung war erfolgreich.', orderNumber: 'Bestellnummer', shipping: 'Sendungsinfo folgt beim Versand.', continue: 'Weiter einkaufen' },
  },
  it: {
    cart: { empty: 'Il carrello è vuoto', startShopping: 'Inizia a fare acquisti', total: 'Totale', remove: 'Rimuovi', checkout: 'Procedi', freeShipping: 'Spedizione gratuita' },
    checkout: { title: 'Pagamento', shipping: 'Indirizzo di spedizione', address1: 'Indirizzo', address2: 'Indirizzo 2 (facoltativo)', zip: 'CAP', city: 'Città', country: 'Paese', phone: 'Telefono', payNow: 'Paga {{total}} kr', secureNote: 'Pagamento sicuro con Stripe', missingTitle: 'Informazioni mancanti', missingBody: 'Compila tutti i campi obbligatori.', failedTitle: 'Pagamento non riuscito' },
    confirmation: { title: 'Grazie per il tuo ordine!', body: 'Il pagamento è andato a buon fine.', orderNumber: 'Numero ordine', shipping: 'Riceverai il tracking alla spedizione.', continue: 'Continua lo shopping' },
  },
  sv: {
    cart: { empty: 'Din varukorg är tom', startShopping: 'Börja handla', total: 'Totalt', remove: 'Ta bort', checkout: 'Till kassan', freeShipping: 'Fri frakt' },
    checkout: { title: 'Kassa', shipping: 'Leveransadress', address1: 'Adress', address2: 'Adress 2 (valfritt)', zip: 'Postnr', city: 'Stad', country: 'Land', phone: 'Telefon', payNow: 'Betala {{total}} kr', secureNote: 'Säker betalning med Stripe', missingTitle: 'Saknad information', missingBody: 'Fyll i alla obligatoriska fält.', failedTitle: 'Betalning misslyckades' },
    confirmation: { title: 'Tack för din beställning!', body: 'Din betalning lyckades.', orderNumber: 'Ordernummer', shipping: 'Du får spårning vid leverans.', continue: 'Fortsätt handla' },
  },
  da: {
    cart: { empty: 'Din kurv er tom', startShopping: 'Begynd at handle', total: 'Total', remove: 'Fjern', checkout: 'Til kassen', freeShipping: 'Gratis fragt' },
    checkout: { title: 'Kasse', shipping: 'Leveringsadresse', address1: 'Adresse', address2: 'Adresse 2 (valgfrit)', zip: 'Postnr.', city: 'By', country: 'Land', phone: 'Telefon', payNow: 'Betal {{total}} kr', secureNote: 'Sikker betaling med Stripe', missingTitle: 'Manglende oplysninger', missingBody: 'Udfyld venligst alle påkrævede felter.', failedTitle: 'Betaling mislykkedes' },
    confirmation: { title: 'Tak for din ordre!', body: 'Din betaling lykkedes.', orderNumber: 'Ordrenummer', shipping: 'Du får tracking ved forsendelse.', continue: 'Fortsæt med at handle' },
  },
  fi: {
    cart: { empty: 'Ostoskorisi on tyhjä', startShopping: 'Aloita ostokset', total: 'Yhteensä', remove: 'Poista', checkout: 'Kassalle', freeShipping: 'Ilmainen toimitus' },
    checkout: { title: 'Kassa', shipping: 'Toimitusosoite', address1: 'Osoite', address2: 'Osoite 2 (valinnainen)', zip: 'Postinro', city: 'Kaupunki', country: 'Maa', phone: 'Puhelin', payNow: 'Maksa {{total}} kr', secureNote: 'Turvallinen maksu Stripellä', missingTitle: 'Puuttuvia tietoja', missingBody: 'Täytä kaikki pakolliset kentät.', failedTitle: 'Maksu epäonnistui' },
    confirmation: { title: 'Kiitos tilauksestasi!', body: 'Maksusi onnistui.', orderNumber: 'Tilausnumero', shipping: 'Saat seurantatiedot toimituksessa.', continue: 'Jatka ostoksia' },
  },
  es: {
    cart: { empty: 'Tu carrito está vacío', startShopping: 'Empezar a comprar', total: 'Total', remove: 'Quitar', checkout: 'Pagar', freeShipping: 'Envío gratis' },
    checkout: { title: 'Pago', shipping: 'Dirección de envío', address1: 'Dirección', address2: 'Dirección 2 (opcional)', zip: 'C.P.', city: 'Ciudad', country: 'País', phone: 'Teléfono', payNow: 'Pagar {{total}} kr', secureNote: 'Pago seguro con Stripe', missingTitle: 'Falta información', missingBody: 'Completa todos los campos obligatorios.', failedTitle: 'Pago fallido' },
    confirmation: { title: '¡Gracias por tu pedido!', body: 'Tu pago se realizó con éxito.', orderNumber: 'Número de pedido', shipping: 'Recibirás el seguimiento al enviarse.', continue: 'Seguir comprando' },
  },
  pl: {
    cart: { empty: 'Twój koszyk jest pusty', startShopping: 'Zacznij zakupy', total: 'Razem', remove: 'Usuń', checkout: 'Do kasy', freeShipping: 'Darmowa wysyłka' },
    checkout: { title: 'Kasa', shipping: 'Adres dostawy', address1: 'Adres', address2: 'Adres 2 (opcjonalnie)', zip: 'Kod poczt.', city: 'Miasto', country: 'Kraj', phone: 'Telefon', payNow: 'Zapłać {{total}} kr', secureNote: 'Bezpieczna płatność przez Stripe', missingTitle: 'Brak informacji', missingBody: 'Wypełnij wszystkie wymagane pola.', failedTitle: 'Płatność nieudana' },
    confirmation: { title: 'Dziękujemy za zamówienie!', body: 'Płatność zakończona sukcesem.', orderNumber: 'Numer zamówienia', shipping: 'Otrzymasz śledzenie po wysyłce.', continue: 'Kontynuuj zakupy' },
  },
  pt: {
    cart: { empty: 'O seu carrinho está vazio', startShopping: 'Começar a comprar', total: 'Total', remove: 'Remover', checkout: 'Finalizar', freeShipping: 'Envio grátis' },
    checkout: { title: 'Pagamento', shipping: 'Morada de envio', address1: 'Morada', address2: 'Morada 2 (opcional)', zip: 'Cód. postal', city: 'Cidade', country: 'País', phone: 'Telefone', payNow: 'Pagar {{total}} kr', secureNote: 'Pagamento seguro com Stripe', missingTitle: 'Informação em falta', missingBody: 'Preencha todos os campos obrigatórios.', failedTitle: 'Pagamento falhou' },
    confirmation: { title: 'Obrigado pela sua encomenda!', body: 'O seu pagamento foi bem-sucedido.', orderNumber: 'Número da encomenda', shipping: 'Receberá o rastreio no envio.', continue: 'Continuar a comprar' },
  },
};

function mergeDeep(target, source) {
  for (const key of Object.keys(source)) {
    if (typeof source[key] === 'object' && source[key] !== null) {
      target[key] = mergeDeep(target[key] || {}, source[key]);
    } else if (target[key] === undefined) {
      target[key] = source[key]; // existing keys win (idempotent)
    }
  }
  return target;
}

let updated = 0;
for (const lang of Object.keys(data)) {
  const file = path.join(LOCALES_DIR, `${lang}.json`);
  let json = {};
  if (fs.existsSync(file)) {
    try { json = JSON.parse(fs.readFileSync(file, 'utf8')); } catch { json = {}; }
  }
  const before = JSON.stringify(json);
  json = mergeDeep(json, data[lang]);
  if (JSON.stringify(json) !== before) updated++;
  fs.writeFileSync(file, JSON.stringify(json, null, 2) + '\n', 'utf8');
}
console.log(`i18n checkout patch done — ${updated} files updated.`);