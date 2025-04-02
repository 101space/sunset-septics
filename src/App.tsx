import React, { useState } from 'react'
import Scene from './components/Scene'
import { Gallery } from './components/Gallery'
import { Reference } from './components/Reference'
import Navigation from './components/Navigation'
import ContactTile from './components/ContactTile'
import ResourcesTile from './components/ResourcesTile'
import './styles/global.css'

const App: React.FC = () => {
  const [modelSection] = useState('overview');

  const handleGalleryImageSelect = (selected: boolean) => {
    const referenceContainer = document.querySelector('.reference-container') as HTMLElement;
    const contactHeader = document.querySelector('.contact-header') as HTMLElement;
    const resourcesHeader = document.querySelector('.resources-header') as HTMLElement;
    
    if (selected) {
      if (referenceContainer) referenceContainer.style.display = 'none';
      if (contactHeader) contactHeader.style.display = 'none';
      if (resourcesHeader) resourcesHeader.style.display = 'none';
    } else {
      if (referenceContainer) referenceContainer.style.display = '';
      if (contactHeader) contactHeader.style.display = '';
      if (resourcesHeader) resourcesHeader.style.display = '';
    }
  };

  return (
    <div className="app">
      <Navigation />
      <main className="main-content">
        {/* Home section (Scene, Gallery, Reference) */}
        <div id="home">
          <Scene modelSection={modelSection} />
          <div className="main-page-stripe" />
          <Gallery onImageSelect={handleGalleryImageSelect} />
          <Reference />
        </div>
        
        {/* Contact header and tile on right side */}
        <div className="contact-header">
          <h2>Contact</h2>
        </div>
        <ContactTile />
        
        {/* Resources header and tile on right side */}
        <div className="resources-header">
          <h2>Resources</h2>
        </div>
        <ResourcesTile />
      </main>
      <div className="copyright">
        © {new Date().getFullYear()} Sunset Septics. All rights reserved.
      </div>
    </div>
  )
}

export default App 