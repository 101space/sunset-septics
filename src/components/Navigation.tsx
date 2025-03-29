import React from 'react';

// Props interface removed since we're not using navigation props currently
const Navigation: React.FC = () => {
  // Navigation function removed as it's not currently used

  return (
    <nav className="navigation">
      <div className="nav-content">
        <div className="nav-brand">
          <h1 className="nav-title">Sunset Septics</h1>
          <h2 className="nav-subtitle">Septic System Construction Specialists</h2>
        </div>
        <div className="nav-license">
          <p>Certified Septic System Installer</p>
          <p>Servicing Southern Ontario</p>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 