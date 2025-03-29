import React from 'react';

// Link data structure for better organization
interface ResourceLink {
  href: string;
  text: string;
}

const links: ResourceLink[] = [
  {
    href: 'https://www.ontario.ca/page/septic-systems',
    text: 'Ontario Septic Systems Guide',
  },
  {
    href: 'https://www.oowa.org/',
    text: 'Ontario Onsite Wastewater Association',
  },
  {
    href: 'https://www.ontario.ca/laws/regulation/120332',
    text: 'Ontario Building Code - Part 8',
  },
  {
    href: 'https://healthunit.org/health-information/septic-sewage-safety/septic-systems/',
    text: 'Health Unit Septic Guidelines',
  },
  {
    href: 'https://www.tarion.com/homeowners/your-warranty-coverage/septic-systems',
    text: 'Tarion Warranty Guidelines',
  },
];

const ResourcesTile: React.FC = () => {
  return (
    <div className="resources-tile">
      <h3 style={{ 
        color: 'var(--color-primary)',
        marginBottom: '1.5rem',
        fontSize: '1.5rem',
        fontWeight: '600'
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
            style={{
              color: 'var(--color-text)',
              textDecoration: 'none',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease',
              padding: '15px 20px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'block',
              fontWeight: '500'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.border = '1px solid var(--color-primary)';
              e.currentTarget.style.color = 'var(--color-primary)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.color = 'var(--color-text)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {link.text}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ResourcesTile; 