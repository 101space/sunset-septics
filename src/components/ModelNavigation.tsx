import React, { useState, useEffect } from 'react';

// Define simple prop interface
interface ModelNavigationProps {
  onNavigate?: (section: string) => void;
}

const ModelNavigation: React.FC<ModelNavigationProps> = ({ onNavigate }) => {
  const [activeSection, setActiveSection] = useState<string>('overview');
  
  useEffect(() => {
    console.log('ModelNavigation mounted');
    console.log('onNavigate prop:', typeof onNavigate);
  }, [onNavigate]);
  
  const sections = [
    { id: 'overview', label: 'System Overview' },
    { id: 'tank', label: 'Septic Tank' },
    { id: 'dbox', label: 'D Box' },
    { id: 'drainfield', label: 'Drain Field' },
    { id: 'soil', label: 'Soil Layers' }
  ];
  
  const handleClick = (sectionId: string) => {
    console.log(`Clicked on ${sectionId}`);
    setActiveSection(sectionId);
    if (onNavigate) {
      onNavigate(sectionId);
      console.log(`Navigation triggered: ${sectionId}`);
    } else {
      console.log('onNavigate is not available');
    }
  };
  
  return (
    <div className="model-navigation">
      {sections.map((section) => (
        <div key={section.id} className="model-nav-item">
          <div 
            className={`model-nav-dot ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => handleClick(section.id)}
          />
          <span className="model-nav-label">{section.label}</span>
        </div>
      ))}
    </div>
  );
};

export default ModelNavigation; 