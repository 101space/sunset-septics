import React from 'react';

// Link data structure for better organization
interface ResourceLink {
  href: string;
  text: string;
  icon: string;
}

const links: ResourceLink[] = [
  {
    href: 'https://www.ontario.ca/page/septic-systems',
    text: 'Ontario Septic Systems Guide',
    icon: '📋'
  },
  {
    href: 'https://www.oowa.org/',
    text: 'Ontario Onsite Wastewater Association',
    icon: '🏛️'
  },
  {
    href: 'https://www.ontario.ca/laws/regulation/120332',
    text: 'Ontario Building Code - Part 8',
    icon: '📘'
  },
  {
    href: 'https://healthunit.org/health-information/septic-sewage-safety/septic-systems/',
    text: 'Health Unit Septic Guidelines',
    icon: '🏥'
  },
  {
    href: 'https://www.tarion.com/homeowners/your-warranty-coverage/septic-systems',
    text: 'Tarion Warranty Guidelines',
    icon: '🔒'
  },
];

const ResourcesTile: React.FC = () => {
  return (
    <div className="resources-tile glass-card" style={{ borderLeft: '3px solid var(--color-secondary)' }}>
      <h3 style={{ 
        color: 'var(--color-secondary)',
        marginBottom: '1.5rem',
        fontSize: '1.8rem',
        fontWeight: '700',
        textAlign: 'center',
        textShadow: '0 0 8px rgba(46, 196, 182, 0.4)',
      }}>
        Septic System Resources
      </h3>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="glass"
            style={{
              color: '#333333',
              textDecoration: 'none',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease',
              padding: '15px 20px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              fontWeight: '500'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
              e.currentTarget.style.border = '1px solid var(--color-secondary)';
              e.currentTarget.style.color = 'var(--color-secondary)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 20px 0 rgba(0, 0, 0, 0.25), 0 0 10px rgba(46, 196, 182, 0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'var(--glass-background)';
              e.currentTarget.style.border = '1px solid var(--glass-border)';
              e.currentTarget.style.color = '#333333';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--glass-shadow)';
            }}
          >
            <span style={{ 
              fontSize: '1.8rem', 
              marginRight: '15px',
              filter: 'drop-shadow(0 0 3px rgba(46, 196, 182, 0.3))',
              animation: 'pulse 3s infinite ease-in-out',
              color: 'var(--color-secondary)'
            }}>
              {link.icon}
            </span>
            {link.text}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ResourcesTile; 