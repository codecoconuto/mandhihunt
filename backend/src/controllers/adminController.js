
// Mock Data Stores
let shops = [
    { id: '1', name: "Nahdi Kuzhimanthi", village: "Edappally", district: "Ernakulam", rating: 4.8, status: "Active", verified: true },
    { id: '2', name: "Sufi Mandi", village: "Kozhikode", district: "Kozhikode", rating: 4.6, status: "Active", verified: true },
    { id: '3', name: "Al Reem", village: "Kochi", district: "Ernakulam", rating: 4.5, status: "Pending", verified: false },
    { id: '4', name: "Arabian Palace", village: "Manjeri", district: "Malappuram", rating: 4.2, status: "Active", verified: true },
    { id: '5', name: "Spicy Route", village: "Thrissur", district: "Thrissur", rating: 3.9, status: "Suspended", verified: false }
];

let users = [
    { id: '101', name: "Fahad Faasil", email: "fahad@example.com", role: "user", status: "Active", joined: "2023-10-12" },
    { id: '102', name: "Mohanlal", email: "lalettan@example.com", role: "moderator", status: "Active", joined: "2023-01-15" },
    { id: '103', name: "Spam Bot 3000", email: "bot@spam.com", role: "user", status: "Banned", joined: "2024-02-20" },
    { id: '104', name: "Nazriya", email: "nazriya@example.com", role: "user", status: "Active", joined: "2023-11-05" }
];

let reviews = [
    { id: 'r1', user: "Fahad Faasil", shopId: '1', shopName: "Nahdi Kuzhimanthi", rating: 5, comment: "Pwoli saanam!", status: "Published", date: "2024-03-10" },
    { id: 'r2', user: "Spam Bot 3000", shopId: '2', shopName: "Sufi Mandi", rating: 1, comment: "Buy crypto now!", status: "Flagged", date: "2024-03-11" },
    { id: 'r3', user: "Nazriya", shopId: '1', shopName: "Nahdi Kuzhimanthi", rating: 4, comment: "Good ambiance.", status: "Published", date: "2024-03-09" }
];

let logs = [
    { id: 'l1', type: 'INFO', message: 'API Service Started', timestamp: new Date().toISOString() },
    { id: 'l2', type: 'WARN', message: 'High latency detected in Search API', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
    { id: 'l3', type: 'ERROR', message: 'Failed login attempt from IP 192.168.1.55', timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
    { id: 'l4', type: 'INFO', message: 'New Shop "Al Reem" registered', timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString() }
];

let settings = {
    maintenanceMode: false,
    allowNewRegistrations: true,
    aiSearchEnabled: true,
    promoBannerActive: true
};

// --- STATS ---
exports.getStats = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            totalUsers: users.length,
            totalShops: shops.length,
            activeNow: Math.floor(Math.random() * 100) + 50,
            searchesToday: 1540 + Math.floor(Math.random() * 100),
            revenue: "₹12,450",
            systemHealth: "98.5%",
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
    });
};

// --- SHOPS ---
exports.getAllShops = (req, res) => {
    res.status(200).json({ status: 'success', results: shops.length, data: shops });
};

exports.deleteShop = (req, res) => {
    const { id } = req.params;
    shops = shops.filter(s => s.id !== id);
    res.status(204).json({ status: 'success', data: null });
};

exports.updateShopStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const shop = shops.find(s => s.id === id);
    if(shop) shop.status = status;
    res.status(200).json({ status: 'success', data: shop });
};

// --- USERS ---
exports.getAllUsers = (req, res) => {
    res.status(200).json({ status: 'success', results: users.length, data: users });
};

exports.updateUserStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // Active, Banned, Suspended
    const user = users.find(u => u.id === id);
    if (user) user.status = status;
    res.status(200).json({ status: 'success', data: user });
};

// --- REVIEWS ---
exports.getAllReviews = (req, res) => {
    res.status(200).json({ status: 'success', results: reviews.length, data: reviews });
};

exports.deleteReview = (req, res) => {
    const { id } = req.params;
    reviews = reviews.filter(r => r.id !== id);
    res.status(204).json({ status: 'success', data: null });
};

// --- LOGS & SETTINGS ---
exports.getSystemLogs = (req, res) => {
    res.status(200).json({ status: 'success', results: logs.length, data: logs });
};

exports.getSettings = (req, res) => {
    res.status(200).json({ status: 'success', data: settings });
};

exports.updateSettings = (req, res) => {
    settings = { ...settings, ...req.body };
    res.status(200).json({ status: 'success', data: settings });
};
