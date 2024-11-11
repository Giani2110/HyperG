import React from 'react';
import Footer from '../components/footer/Footer';
import { Outlet } from 'react-router-dom';

const Footer = () => (
  <div className="footer">
    <Footer />
    <Outlet />
  </div>
);

export default Footer;