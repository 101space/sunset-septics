import React from 'react'
import { Scene } from './components/Scene'
import { Gallery } from './components/Gallery'
import { Reference } from './components/Reference'
import Navigation from './components/Navigation'
import ContactTile from './components/ContactTile'
import ResourcesTile from './components/ResourcesTile'
import './styles/global.css'

const App: React.FC = () => {
  return (
    <div className="app">
      <Navigation />
      <main className="main-content">
        {/* Home section (Scene, Gallery, Reference) */}
        <div id="home">
          <Scene />
          <div className="main-page-stripe" />
          <Gallery />
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