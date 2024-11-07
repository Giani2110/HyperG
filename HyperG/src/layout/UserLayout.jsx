import React from 'react';
import UserHeader from '../components/headers/UserHeader';
import { Outlet } from 'react-router-dom';

const UserLayout = () => (
  <div className="user-layout">
    <UserHeader />
    <Outlet />
  </div>
);

export default UserLayout;