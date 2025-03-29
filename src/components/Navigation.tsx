import React from 'react';

// Add optional props to accept a navigation function if needed later
interface NavigationProps {
  onNavigate?: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ onNavigate }) => {
  // Function to handle navigation clicks
  const handleNavClick = (section: string) => {
    if (onNavigate) {
      onNavigate(section);
    } else {
      // Fallback to direct scrolling when no handler provided
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

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