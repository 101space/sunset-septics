import React, { useState } from 'react'
import { Scene } from './components/Scene'
import { Gallery } from './components/Gallery'
import { Reference } from './components/Reference'
import Navigation from './components/Navigation'
import ContactTile from './components/ContactTile'
import ResourcesTile from './components/ResourcesTile'
import ModelNavigation from './components/ModelNavigation'
import './styles/global.css'

const App: React.FC = () => {
  const [activeModelSection, setActiveModelSection] = useState('overview');
  const [isGalleryImageSelected, setIsGalleryImageSelected] = useState(false);

  const handleModelNavigate = (section: string) => {
    setActiveModelSection(section);
    console.log('Navigate to model section:', section);
    
    // Add description display for the D Box section
    if (section === 'dbox') {
      console.log('The D box evenly distributes effluent across the drain field.');
    }
  };

  const handleGalleryImageSelect = (selected: boolean) => {
    setIsGalleryImageSelected(selected);
  };

  return (
    <div className="app">
      <Navigation />
      <main className="main-content">
        {/* Home section (Scene, Gallery, Reference) */}
        <div id="home">
          <Scene modelSection={activeModelSection} />
          {!isGalleryImageSelected && <ModelNavigation onNavigate={handleModelNavigate} />}
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