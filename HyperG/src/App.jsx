import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Home from './pages/home/home.jsx';
import Login from './pages/login/login.jsx';
import Register from './pages/register/register.jsx';
import Catalog from './pages/catalog/catalog.jsx';
import LandingLayout from './layout/LandingLayout.jsx';
import UserLayout from './layout/UserLayout.jsx';

function App() {
  return (
    <Router>
      <div className="App bg-gray-900 text-white min-h-screen">
        <main className="p-4">
          <Routes>
            <Route element={<LandingLayout />} >
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            <Route element={<UserLayout />} >
              <Route path="/catalog" element={<Catalog />} />
            </Route>

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;