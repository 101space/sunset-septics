import { useRef, useState } from 'react'

interface GalleryItem {
  id: number
  title: string
  description: string
  imagePath: string // Path to the image
  color: string // Fallback color for errors
}

// Get the base URL for GitHub Pages
const basePath = import.meta.env.BASE_URL;

// Create gallery items with actual image paths
const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: 'Septic System Installation',
    description: 'Professional installation of a new septic system',
    imagePath: `${basePath}assets/gallery pics/5WDShKcjREuh6fbLj8PTNA.jpg`, // Path with base URL
    color: '#FF6B35' // Fallback color
  },
  {
    id: 2,
    title: 'Drain Field Construction',
    description: 'Expert drain field construction and layout',
    imagePath: `${basePath}assets/gallery pics/bw9p-1liTNyqGfwoEcHCSA.jpg`,
    color: '#2EC4B6'
  },
  {
    id: 3,
    title: 'Tank Installation',
    description: 'Precise septic tank placement and installation',
    imagePath: `${basePath}assets/gallery pics/SF85vaNATsSiHkMX-iU61A.jpg`,
    color: '#FF9F1C'
  },
  {
    id: 4,
    title: 'System Maintenance',
    description: 'Regular maintenance and inspection services',
    imagePath: `${basePath}assets/gallery pics/6Q-Lm0f9TRi_G5tEJUozDw.jpg`,
    color: '#FF6B35'
  },
  {
    id: 5,
    title: 'Site Preparation',
    description: 'Thorough site preparation and excavation',
    imagePath: `${basePath}assets/gallery pics/1avZcdzLTbuX2Uohb7b1BA.jpg`,
    color: '#2EC4B6'
  },
  {
    id: 6,
    title: 'Quality Assurance',
    description: 'Final inspection and quality checks',
    imagePath: `${basePath}assets/gallery pics/PckAqcuiRtGdp7uOembnxg.jpg`,
    color: '#FF9F1C'
  },
  {
    id: 7,
    title: 'Professional Service',
    description: 'Dedicated team ensuring customer satisfaction',
    imagePath: `${basePath}assets/gallery pics/y9qgG11TTxmlkz-ffW-cUA.jpg`,
    color: '#FF6B35'
  },
  {
    id: 8,
    title: 'Modern Equipment',
    description: 'State-of-the-art equipment for precise work',
    imagePath: `${basePath}assets/gallery pics/XCL8X_YuQoenLA-VASo95Q.jpg`,
    color: '#2EC4B6'
  }
];

// SVG placeholder generator for fallback
const PlaceholderSVG = ({ title, color }: { title: string, color: string }) => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: color,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      boxSizing: 'border-box',
      color: '#fff',
      textShadow: '0 1px 3px rgba(0,0,0,0.4)',
      borderRadius: '8px',
      fontWeight: 'bold'
    }}>
      <div style={{ fontSize: '40px', marginBottom: '10px' }}>
        {title.charAt(0)}
      </div>
      <div style={{ 
        textAlign: 'center', 
        fontSize: '14px',
        opacity: 0.9
      }}>
        {title}
      </div>
    </div>
  );
};

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300 // Width of one item
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount)
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      })
    }
  }

  const handleImageError = (id: number) => {
    console.error(`Failed to load image for item ${id}`);
    setImageErrors(prev => ({...prev, [id]: true}));
  }

  return (
    <div className="gallery-container">
      <button 
        className="scroll-button left" 
        onClick={() => scroll('left')}
        aria-label="Scroll gallery left"
      >
        ‹
      </button>
      <div 
        className="gallery-scroll-container" 
        ref={scrollContainerRef}
        aria-label="Gallery of septic system projects"
        role="region"
      >
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className="gallery-item"
            onClick={() => setSelectedImage(item)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setSelectedImage(item);
                e.preventDefault();
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`View ${item.title}`}
          >
            {imageErrors[item.id] ? (
              <PlaceholderSVG title={item.title} color={item.color} />
            ) : (
              <img 
                src={item.imagePath}
                alt={item.title}
                loading="lazy" 
                decoding="async"
                onError={() => handleImageError(item.id)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  display: 'block'
                }}
              />
            )}
            <div className="gallery-item-overlay">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button 
        className="scroll-button right" 
        onClick={() => scroll('right')}
        aria-label="Scroll gallery right"
      >
        ›
      </button>

      {selectedImage && (
        <div 
          className="gallery-modal" 
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`gallery-item-title-${selectedImage.id}`}
        >
          <div className="gallery-modal-content">
            <button 
              className="close-button" 
              onClick={() => setSelectedImage(null)}
              aria-label="Close gallery"
            >
              ×
            </button>
            <div style={{ height: '400px', width: '100%' }}>
              {imageErrors[selectedImage.id] ? (
                <PlaceholderSVG title={selectedImage.title} color={selectedImage.color} />
              ) : (
                <img 
                  src={selectedImage.imagePath}
                  alt={selectedImage.title}
                  loading="lazy" 
                  decoding="async"
                  onError={() => handleImageError(selectedImage.id)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                />
              )}
            </div>
            <div className="gallery-item-overlay modal-overlay">
              <h3 id={`gallery-item-title-${selectedImage.id}`}>{selectedImage.title}</h3>
              <p>{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 