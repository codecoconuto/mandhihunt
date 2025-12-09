
// Public App Configuration
// NOTE: SENSITIVE KEYS (Google Maps, Gemini) MUST LIVE IN THE BACKEND ONLY.

export const API_CONFIG = {
  // Use relative path '/api/v1'. 
  // In Dev: Vite proxy forwards this to localhost:5000
  // In Prod: The backend serves this directly.
  BASE_URL: "/api/v1",
  
  // Public App Identifier
  PUBLIC_APP_ID: "mandi_hunt_web_client_secret_key_123"
};
