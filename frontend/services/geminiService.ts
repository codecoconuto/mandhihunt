
import { MandiShop } from "../types";
import { API_CONFIG } from "../config";

const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'x-client-id': API_CONFIG.PUBLIC_APP_ID
  };
};

export const searchMandiShops = async (userQuery: string): Promise<MandiShop[]> => {
    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}/places?q=${encodeURIComponent(userQuery)}`, {
            headers: getHeaders()
        });

        if (!response.ok) throw new Error("Backend connection failed");

        const json = await response.json();
        return json.data;

    } catch (error) {
        console.warn("Backend unavailable, returning empty list (Real-time mode only).");
        return [];
    }
};

export const getShopsByCoordinates = async (lat: number, lng: number): Promise<MandiShop[]> => {
    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}/places?lat=${lat}&lng=${lng}`, {
            headers: getHeaders()
        });

        if (!response.ok) throw new Error("Backend connection failed");

        const json = await response.json();
        return json.data;
    } catch (error) {
        console.warn("Backend unavailable.");
        return []; 
    }
}

export const getOracleResponse = async (userMessage: string): Promise<string> => {
     try {
         const response = await fetch(`${API_CONFIG.BASE_URL}/chat`, {
             method: 'POST',
             headers: getHeaders(),
             body: JSON.stringify({ message: userMessage })
         });

         if (!response.ok) throw new Error("Backend connection failed");

         const json = await response.json();
         return json.data.text;
     } catch (error) {
         return "Aliyaa, I can't connect to the server right now. Check if the backend is running!";
     }
}
