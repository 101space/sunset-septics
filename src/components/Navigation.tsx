import React from 'react';

interface NavigationProps {
  onSectionChange: (section: 'model' | 'resources' | 'contact') => void;
}

const Navigation: React.FC<NavigationProps> = ({ onSectionChange }) => {
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
        <div className="nav-links">
          <button onClick={() => onSectionChange('model')}>3D Model</button>
          <button onClick={() => onSectionChange('resources')}>Resources</button>
          <button onClick={() => onSectionChange('contact')}>Contact</button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 