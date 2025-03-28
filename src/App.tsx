import React, { useState } from 'react'
import { Scene } from './components/Scene'
import { Gallery } from './components/Gallery'
import { Resources } from './components/Resources'
import { Contact } from './components/Contact'
import { Reference } from './components/Reference'
import Navigation from './components/Navigation'
import ContactTile from './components/ContactTile'
import ResourcesTile from './components/ResourcesTile'
import './styles/global.css'

type Section = 'model' | 'resources' | 'contact'

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<Section>('model')

  const renderSection = () => {
    switch (currentSection) {
      case 'model':
        return (
          <>
            <Scene />
            <Reference />
            <div className="main-page-stripe" />
            <Gallery />
            <div className="contact-header">
              <h2>Contact</h2>
            </div>
            <ContactTile />
            <div className="resources-header">
              <h2>Resources</h2>
            </div>
            <ResourcesTile />
          </>
        )
      case 'resources':
        return (
          <>
            <Resources />
            <div className="contact-header">
              <h2>Contact</h2>
            </div>
            <ContactTile />
          </>
        )
      case 'contact':
        return (
          <>
            <Contact />
            <div className="resources-header">
              <h2>Resources</h2>
            </div>
            <ResourcesTile />
          </>
        )
      default:
        return (
          <>
            <Scene />
            <Reference />
            <div className="main-page-stripe" />
            <Gallery />
            <div className="contact-header">
              <h2>Contact</h2>
            </div>
            <ContactTile />
            <div className="resources-header">
              <h2>Resources</h2>
            </div>
            <ResourcesTile />
          </>
        )
    }
  }

  return (
    <div className="app">
      <Navigation onSectionChange={setCurrentSection} />
      <main className="main-content">
        {renderSection()}
      </main>
      <div className="copyright">
        © {new Date().getFullYear()} Sunset Landscaping. All rights reserved.
      </div>
    </div>
  )
}

export default App 