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
  }
];

// Customer testimonial structure
interface CustomerReview {
  name: string;
  location: string;
  text: string;
  rating: number;
}

const reviews: CustomerReview[] = [
  {
    name: "Nick and Carlie",
    location: "Copetown",
    text: "Sunset Septics installed our system last year and we couldn't be happier. Their team was professional and took the time to explain everything about our new septic system.",
    rating: 5
  },
  {
    name: "Mike Thompson",
    location: "Ancaster",
    text: "After having issues with our old septic system, Sunset came in and diagnosed the problem quickly. Their maintenance service is reliable and thorough.",
    rating: 5
  },
  {
    name: "Jim Johnston",
    location: "Cambridge",
    text: "We've been using Sunset for regular maintenance for years. They're always punctual, professional, and keep our system running perfectly.",
    rating: 4
  }
];

// Function to render stars for ratings
const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i} style={{ 
        color: i < rating ? 'var(--color-primary)' : '#ccc',
        fontSize: '1.2rem',
        marginRight: '2px'
      }}>
        ★
      </span>
    );
  }
  return stars;
};

const ResourcesTile: React.FC = () => {
  return (
    <div className="resources-tile glass-card" style={{ 
      borderLeft: '3px solid var(--color-secondary)',
      height: '600px',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      overflow: 'hidden'
    }}>
      <h3 style={{ 
        color: 'var(--color-secondary)',
        marginBottom: '1.5rem',
        fontSize: '1.8rem',
        fontWeight: '700',
        textAlign: 'center',
        textShadow: '0 0 8px rgba(46, 196, 182, 0.4)',
        flex: '0 0 auto'
      }}>
        Resources & Reviews
      </h3>
      
      {/* Resource link */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        marginBottom: '2rem',
        flex: '0 0 auto'
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
              e.currentTarget.style.transform = 'translateY(-1px)';
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
      
      {/* Customer reviews section */}
      <h4 style={{ 
        color: 'var(--color-primary)',
        marginBottom: '1rem',
        fontSize: '1.3rem',
        fontWeight: '600',
        flex: '0 0 auto'
      }}>
        Customer Testimonials
      </h4>
      
      <div className="reviews-container" style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        overflowY: 'scroll',
        flex: '1 1 auto',
        paddingRight: '16px',
        height: '100%',
        position: 'relative'
      }}>
        {reviews.map((review, index) => (
          <div 
            key={index}
            className="glass"
            style={{
              padding: '16px',
              borderRadius: '12px',
              background: 'var(--glass-background)',
              border: '1px solid var(--glass-border)',
              boxShadow: 'var(--glass-shadow)',
              flex: '0 0 auto',
              width: 'calc(100% - 2px)'
            }}
          >
            <div style={{ marginBottom: '8px' }}>
              {renderStars(review.rating)}
            </div>
            <p style={{ 
              fontSize: '0.95rem',
              fontStyle: 'italic',
              marginBottom: '10px',
              lineHeight: '1.4'
            }}>
              "{review.text}"
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}>
              <span>{review.name}, {review.location}</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Add custom scrollbar styles */}
      <style>
        {`
          .reviews-container::-webkit-scrollbar {
            width: 6px;
            background-color: transparent;
          }
          
          .reviews-container::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
          }
          
          .reviews-container::-webkit-scrollbar-thumb {
            background: var(--color-secondary);
            border-radius: 10px;
            min-height: 40px;
          }
          
          .reviews-container::-webkit-scrollbar-thumb:hover {
            background: var(--color-primary);
          }

          .reviews-container::-webkit-scrollbar-button:start:decrement,
          .reviews-container::-webkit-scrollbar-button:end:increment {
            display: none;
            height: 0;
            width: 0;
          }

          .reviews-container {
            scrollbar-width: thin;
            scrollbar-color: var(--color-secondary) transparent;
            -ms-overflow-style: none;
          }

          .reviews-container::-webkit-scrollbar-corner {
            background: transparent;
          }
        `}
      </style>
    </div>
  );
};

export default ResourcesTile; 