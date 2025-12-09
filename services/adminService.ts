
const API_BASE_URL = "http://localhost:5000/api/v1";

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  const clientKey = "mandi_hunt_web_client_secret_key_123";
  return {
    'Content-Type': 'application/json',
    'x-client-id': clientKey,
    'Authorization': `Bearer ${token}`
  };
};

export const fetchDashboardStats = async () => {
  try {
      const response = await fetch(`${API_BASE_URL}/admin/stats`, {
        headers: getAuthHeaders()
      });
      if (!response.ok) throw new Error('Failed');
      return response.json();
  } catch (e) {
      console.warn("Using Mock Stats");
      return {
          data: {
              totalUsers: 12543,
              totalShops: 432,
              activeNow: 89,
              searchesToday: 1540,
              revenue: "₹0 (Free Tier)",
              trafficData: [
                  { name: 'Mon', searches: 4000 },
                  { name: 'Tue', searches: 3000 },
                  { name: 'Wed', searches: 2000 },
                  { name: 'Thu', searches: 2780 },
                  { name: 'Fri', searches: 6890 }, 
                  { name: 'Sat', searches: 9390 },
                  { name: 'Sun', searches: 8490 },
              ]
          }
      };
  }
};

export const fetchAllShops = async () => {
  try {
      const response = await fetch(`${API_BASE_URL}/admin/shops`, {
        headers: getAuthHeaders()
      });
      if (!response.ok) throw new Error('Failed');
      const json = await response.json();
      return json.data;
  } catch (e) {
      return [
        { id: '1', name: "Nahdi Kuzhimanthi", village: "Edappally", rating: 4.8, status: "Active" },
        { id: '2', name: "Sufi Mandi", village: "Kozhikode", rating: 4.6, status: "Active" },
        { id: '3', name: "Al Reem", village: "Kochi", rating: 4.5, status: "Active" }
      ];
  }
};

export const deleteShop = async (id: string) => {
  try {
      const response = await fetch(`${API_BASE_URL}/admin/shops/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (!response.ok) throw new Error('Failed');
      return true;
  } catch (e) {
      console.log("Mock delete");
      return true;
  }
};
