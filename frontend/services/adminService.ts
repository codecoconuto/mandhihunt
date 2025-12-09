
import { API_CONFIG } from "../config";

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'x-client-id': API_CONFIG.PUBLIC_APP_ID,
    'Authorization': `Bearer ${token}`
  };
};

const handleResponse = async (response: Response) => {
    if (!response.ok) {
        throw new Error(`Request failed: ${response.statusText}`);
    }
    const json = await response.json();
    return json.data;
};

// --- STATS ---
export const fetchDashboardStats = async () => {
  try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/admin/stats`, { headers: getAuthHeaders() });
      return handleResponse(response);
  } catch (e) {
      console.warn("Using Mock Stats");
      return {
          totalUsers: 12543,
          totalShops: 432,
          activeNow: 89,
          searchesToday: 1540,
          revenue: "₹12,450",
          systemHealth: "98.5%",
          trafficData: []
      };
  }
};

// --- SHOPS ---
export const fetchAllShops = async () => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/admin/shops`, { headers: getAuthHeaders() });
    return handleResponse(response);
};

export const createShop = async (shopData: any) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/admin/shops`, { 
        method: 'POST', 
        headers: getAuthHeaders(),
        body: JSON.stringify(shopData)
    });
    return handleResponse(response);
};

export const updateShop = async (id: string, shopData: any) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/admin/shops/${id}`, { 
        method: 'PUT', 
        headers: getAuthHeaders(),
        body: JSON.stringify(shopData)
    });
    return handleResponse(response);
};

export const deleteShop = async (id: string) => {
    await fetch(`${API_CONFIG.BASE_URL}/admin/shops/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
    return true;
};

export const updateShopStatus = async (id: string, status: string) => {
    await fetch(`${API_CONFIG.BASE_URL}/admin/shops/${id}/status`, { 
        method: 'PUT', 
        headers: getAuthHeaders(),
        body: JSON.stringify({ status })
    });
    return true;
};

// --- USERS ---
export const fetchAllUsers = async () => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/admin/users`, { headers: getAuthHeaders() });
    return handleResponse(response);
};

export const updateUserStatus = async (id: string, status: string) => {
    await fetch(`${API_CONFIG.BASE_URL}/admin/users/${id}/status`, { 
        method: 'PUT', 
        headers: getAuthHeaders(),
        body: JSON.stringify({ status })
    });
    return true;
};

// --- REVIEWS ---
export const fetchAllReviews = async () => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/admin/reviews`, { headers: getAuthHeaders() });
    return handleResponse(response);
};

export const deleteReview = async (id: string) => {
    await fetch(`${API_CONFIG.BASE_URL}/admin/reviews/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
    return true;
};

// --- SYSTEM ---
export const fetchSystemLogs = async () => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/admin/logs`, { headers: getAuthHeaders() });
    return handleResponse(response);
};

export const fetchSettings = async () => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/admin/settings`, { headers: getAuthHeaders() });
    return handleResponse(response);
};

export const saveSettings = async (settings: any) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/admin/settings`, { 
        method: 'POST', 
        headers: getAuthHeaders(),
        body: JSON.stringify(settings)
    });
    return handleResponse(response);
};
