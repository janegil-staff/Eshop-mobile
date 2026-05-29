// Your Mac's LAN IP so the iPhone can reach the dev server.
// Find it with: ipconfig getifaddr en0
const API_HOST = 'http://192.168.1.71:3000';

export const ENV = {
  API_URL: `${API_HOST}/api`,
  STRIPE_PUBLISHABLE_KEY: 'pk_live_51Hi8tyGUorDgGElyGxfmrxTZI11C5j5SV6IIBaDfE3rVbBnCFDenyn21ZhLq2cFLV2sD8pUmNjUWlw7iLImFBkb400Wj8weFP7',
  APPLE_MERCHANT_ID: 'merchant.com.qupda.estore',
  MERCHANT_NAME: 'eStore',
};