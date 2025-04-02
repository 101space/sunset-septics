import React from 'react';

// Props interface removed since we're not using navigation props currently
const Navigation: React.FC = () => {
  // Navigation function removed as it's not currently used

  return (
    <nav className="navigation glass">
      <div className="nav-content">
        <div className="nav-brand">
          <h1 className="nav-title" style={{
            background: 'linear-gradient(45deg, var(--color-primary), var(--color-accent))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 10px rgba(255, 107, 53, 0.4)',
            filter: 'drop-shadow(0 2px 3px rgba(0, 0, 0, 0.4))',
            fontSize: '2.8rem',
            fontWeight: '800',
            letterSpacing: '1px'
          }}>Sunset Septics</h1>
          <h2 className="nav-subtitle" style={{
            textShadow: '0 0 6px rgba(46, 196, 182, 0.4)',
            letterSpacing: '0.5px',
            fontWeight: '600'
          }}>Septic System Construction Specialists</h2>
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