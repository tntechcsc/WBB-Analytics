// src/layouts/MainLayout.js
import React from 'react';
import HamburgerMenu from '../components/HamburgerMenu/HamburgerMenu.js';
import './MainLayout.css'; // Optional: If you have specific styles for the layout

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <HamburgerMenu />
      <div className="page-content">
        {children} {/* This is where the content of your pages will be rendered */}
      </div>
    </div>
  );
};

export default MainLayout;
