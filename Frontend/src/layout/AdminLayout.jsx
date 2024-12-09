import React from 'react';
import AdminHeader from '../components/headers/AdminHeader';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => (
  <div className="admin-layout">
    <AdminHeader />
    <Outlet />
  </div>
);

export default AdminLayout;