import React from 'react';

const Navigation: React.FC = () => {
  return (
    <nav className="navigation">
      <div className="nav-content">
        <div className="nav-brand">
          <h1 className="nav-title">Sunset Landscaping</h1>
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