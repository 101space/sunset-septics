import '../styles/Resources.css'

interface Resource {
  id: number
  title: string
  description: string
  link: string
  category: 'maintenance' | 'installation' | 'regulations'
}

const resources: Resource[] = [
  {
    id: 1,
    title: 'EPA Septic System Guidelines',
    description: 'Official guidelines from the Environmental Protection Agency for septic system maintenance and installation.',
    link: 'https://www.epa.gov/septic',
    category: 'regulations'
  },
  {
    id: 2,
    title: 'Maintenance Schedule',
    description: 'Learn about proper maintenance schedules and best practices for your septic system.',
    link: '#',
    category: 'maintenance'
  },
  {
    id: 3,
    title: 'Installation Process',
    description: 'Step-by-step guide to understanding the septic system installation process.',
    link: '#',
    category: 'installation'
  }
]

export function Resources() {
  return (
    <div className="resources">
      <h2>Helpful Resources</h2>
      <div className="resources-grid">
        {resources.map((resource) => (
          <div key={resource.id} className="resource-card">
            <h3>{resource.title}</h3>
            <p>{resource.description}</p>
            <a 
              href={resource.link}
              className="resource-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn More →
            </a>
          </div>
        ))}
      </div>
    </div>
  )
} 