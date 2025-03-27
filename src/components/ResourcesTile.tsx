import React from 'react';

const ResourcesTile: React.FC = () => {
  return (
    <>
      <div className="resources-header">
        <h2>Resources</h2>
      </div>
      <div className="resources-tile">
        <div className="resources-content">
          <h3 style={{ color: 'var(--color-primary)', marginBottom: '20px', fontSize: '1.5rem' }}>
            Septic System Resources
          </h3>
          <div className="resources-links" style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '16px' 
          }}>
            <a 
              href="https://www.ontario.ca/page/septic-systems" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                color: 'var(--color-text)',
                textDecoration: 'none',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                padding: '12px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'block'
              }}
            >
              Ontario Septic Systems Guide
            </a>
            
            <a 
              href="https://www.oowa.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                color: 'var(--color-text)',
                textDecoration: 'none',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                padding: '12px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'block'
              }}
            >
              Ontario Onsite Wastewater Association
            </a>
            
            <a 
              href="https://www.ontario.ca/laws/regulation/120332" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                color: 'var(--color-text)',
                textDecoration: 'none',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                padding: '12px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'block'
              }}
            >
              Ontario Building Code - Part 8
            </a>
            
            <a 
              href="https://healthunit.org/health-information/septic-sewage-safety/septic-systems/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                color: 'var(--color-text)',
                textDecoration: 'none',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                padding: '12px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'block'
              }}
            >
              Health Unit Septic Guidelines
            </a>
            
            <a 
              href="https://www.tarion.com/homeowners/your-warranty-coverage/septic-systems" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                color: 'var(--color-text)',
                textDecoration: 'none',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                padding: '12px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'block'
              }}
            >
              Tarion Warranty Guidelines
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResourcesTile; 