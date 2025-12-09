
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './components/Admin/AdminLayout';
import DashboardStats from './components/Admin/DashboardStats';
import ShopManager from './components/Admin/ShopManager';
import UserManager from './components/Admin/UserManager';
import ReviewManager from './components/Admin/ReviewManager';
import SystemLogs from './components/Admin/SystemLogs';
import AdminSettings from './components/Admin/AdminSettings';

function App() {
  return (
    <Router>
       <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminLayout />}>
             <Route index element={<DashboardStats />} />
             <Route path="shops" element={<ShopManager />} />
             <Route path="users" element={<UserManager />} />
             <Route path="reviews" element={<ReviewManager />} />
             <Route path="logs" element={<SystemLogs />} />
             <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Catch all - Redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
       </Routes>
    </Router>
  );
}

export default App;
