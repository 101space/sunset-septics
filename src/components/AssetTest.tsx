import React, { useEffect } from 'react';

const AssetTest: React.FC = () => {
  useEffect(() => {
    // This component was used for testing and debugging
    console.log('AssetTest component mounted');
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: 'rgba(0,0,0,0.7)', margin: '20px', borderRadius: '8px' }}>
      <h2>Asset Test</h2>
      <div>
        <h3>Testing Image from Public Directory:</h3>
        <img 
          src="/assets/gallery pics/5WDShKcjREuh6fbLj8PTNA.jpg" 
          alt="Test from public dir" 
          style={{ width: '200px', height: 'auto' }} 
        />
      </div>
    </div>
  );
};

export default AssetTest; 