import React from 'react';

const ContactTile: React.FC = () => {
  return (
    <div className="contact-tile glass-card" style={{ borderLeft: '3px solid var(--color-secondary)' }}>
      <div className="contact-info">
        <h3 style={{ 
          textShadow: '0 0 8px rgba(46, 196, 182, 0.4)',
          fontSize: '1.8rem',
          fontWeight: '700' 
        }}>
          Contact Us
        </h3>
        <p style={{ color: '#333333' }}>Call Graham: <span style={{ color: 'var(--color-secondary)' }}>(289) 439-4390</span></p>
        <p style={{ color: '#333333' }}>Email: <a href="mailto:g_waterhouse@hotmail.com">g_waterhouse@hotmail.com</a></p>
        <p style={{ color: '#333333' }}>461 Highway 5 W, Dundas, ON L9H 5E2</p>
      </div>
      <div className="map-container" style={{ boxShadow: '0 4px 20px rgba(46, 196, 182, 0.2)' }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2905.5726466061385!2d-80.0179837!3d43.2725097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882c85772d831d29%3A0x1d5989c57e0b5648!2s461%20Hwy%205%20W%2C%20Dundas%2C%20ON%20L9H%205E2!5e0!3m2!1sen!2sca!4v1710960000000!5m2!1sen!2sca"
          style={{ border: 0, width: '100%', height: '100%' }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

export default ContactTile; 