// Your Mac's LAN IP so the iPhone can reach the dev server.
// Find it with: ipconfig getifaddr en0
const API_HOST = "http://192.168.1.71:3000";

export const ENV = {
  API_URL: `${API_HOST}/api`,
};
