import React, { useEffect, useState } from 'react';

export const AssetTest: React.FC = () => {
  const [loadStatus, setLoadStatus] = useState<Record<string, boolean>>({});
  const [publicDir, setPublicDir] = useState<string[]>([]);

  useEffect(() => {
    // Paths to test
    const testPaths = [
      '/assets/septic.glb',
      '/assets/gallery/5WDShKcjREuh6fbLj8PTNA.jpg',
      '/public/assets/septic.glb',
      '/public/assets/gallery/5WDShKcjREuh6fbLj8PTNA.jpg',
      // Test with direct filenames too
      '/5WDShKcjREuh6fbLj8PTNA.jpg',
      '/septic.glb',
      // Test with additional folder structures
      '/gallery/5WDShKcjREuh6fbLj8PTNA.jpg',
      '/gallery pics/5WDShKcjREuh6fbLj8PTNA.jpg',
    ];

    // Check each path
    testPaths.forEach(path => {
      const img = new Image();
      img.onload = () => {
        console.log(`✅ Successfully loaded: ${path}`);
        setLoadStatus(prev => ({ ...prev, [path]: true }));
      };
      img.onerror = () => {
        console.error(`❌ Failed to load: ${path}`);
        setLoadStatus(prev => ({ ...prev, [path]: false }));
      };
      img.src = path;
    });

    // Log more helpful information
    console.log("Current URL:", window.location.href);
    console.log("Checking asset paths for debugging");
  }, []);

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#333', 
      color: 'white',
      marginTop: '20px'
    }}>
      <h2>Asset Path Test</h2>
      <p>Current URL: {window.location.href}</p>
      
      <div>
        <h3>Image Path Tests:</h3>
        {Object.entries(loadStatus).map(([path, success]) => (
          <div key={path} style={{ 
            margin: '10px 0',
            padding: '10px',
            backgroundColor: success ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)',
            borderRadius: '4px'
          }}>
            <span style={{ fontWeight: 'bold' }}>{path}: </span>
            <span>{success ? '✅ Success' : '❌ Failed'}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Troubleshooting Instructions:</h3>
        <ol style={{ textAlign: 'left', lineHeight: 1.6 }}>
          <li>Make sure your files are in the right folders</li>
          <li>The structure should be: public/assets/gallery/[image-files]</li>
          <li>File names should match exactly (case-sensitive)</li>
          <li>Try hard-refreshing the browser (Ctrl+Shift+R or Cmd+Shift+R)</li>
          <li>Check the browser console for more specific errors</li>
        </ol>
      </div>
    </div>
  );
};

export default AssetTest; 