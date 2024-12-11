import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Home from './pages/home/home.jsx';
import Login from './pages/login/login.jsx';
import Register from './pages/register/register.jsx';
import Catalog from './pages/catalog/catalog.jsx';
import Library from './pages/library/library.jsx';
import LandingLayout from './layout/LandingLayout.jsx';
import UserLayout from './layout/UserLayout.jsx';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './context/ProtectedRoute';
import AdminLayout from './layout/AdminLayout.jsx';
import Dashboard from './pages/dashboard/dashboard.jsx';
import AddGames from './pages/addgames/addgames.jsx';
import ViewUsers from './pages/viewusers/viewusers.jsx';


function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App bg-gray-900 text-white min-h-screen">
          <main className="p-4">
            <Routes>
              <Route element={<LandingLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>

              <Route element={<UserLayout />}>
                <Route path="/catalog" element={<ProtectedRoute allowedRoles={['client']}><Catalog /></ProtectedRoute>} />
                <Route path="/library" element={<ProtectedRoute allowedRoles={['client']}><Library /></ProtectedRoute>} />
              </Route>

              <Route element={<AdminLayout />}>
                <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><Dashboard /></ProtectedRoute>} />
                <Route path="/addgames" element={<ProtectedRoute allowedRoles={['admin']}><AddGames /></ProtectedRoute>} />
                <Route path="/viewusers" element={<ProtectedRoute allowedRoles={['admin']}><ViewUsers /></ProtectedRoute>} />
              </Route>

            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;