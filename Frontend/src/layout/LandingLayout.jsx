import React from 'react';
import LandingHeader from '../components/headers/LandingHeader';
import { Outlet } from 'react-router-dom';

const LandingLayout = () => (
  <div className="landing-layout">
    <LandingHeader />
    <Outlet />
  </div>
);

export default LandingLayout;