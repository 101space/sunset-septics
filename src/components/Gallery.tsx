import React, { useRef, useState } from 'react'

interface GalleryItem {
  id: number
  title: string
  description: string
  imageUrl: string
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: 'Septic System Installation',
    description: 'Professional installation of a new septic system',
    imageUrl: '/assets/gallery/gallery pics/5WDShKcjREuh6fbLj8PTNA.jpg'
  },
  {
    id: 2,
    title: 'Drain Field Construction',
    description: 'Expert drain field construction and layout',
    imageUrl: '/assets/gallery/gallery pics/bw9p-1liTNyqGfwoEcHCSA.jpg'
  },
  {
    id: 3,
    title: 'Tank Installation',
    description: 'Precise septic tank placement and installation',
    imageUrl: '/assets/gallery/gallery pics/SF85vaNATsSiHkMX-iU61A.jpg'
  },
  {
    id: 4,
    title: 'System Maintenance',
    description: 'Regular maintenance and inspection services',
    imageUrl: '/assets/gallery/gallery pics/6Q-Lm0f9TRi_G5tEJUozDw.jpg'
  },
  {
    id: 5,
    title: 'Site Preparation',
    description: 'Thorough site preparation and excavation',
    imageUrl: '/assets/gallery/gallery pics/1avZcdzLTbuX2Uohb7b1BA.jpg'
  },
  {
    id: 6,
    title: 'Quality Assurance',
    description: 'Final inspection and quality checks',
    imageUrl: '/assets/gallery/gallery pics/PckAqcuiRtGdp7uOembnxg.jpg'
  },
  {
    id: 7,
    title: 'Professional Service',
    description: 'Dedicated team ensuring customer satisfaction',
    imageUrl: '/assets/gallery/gallery pics/y9qgG11TTxmlkz-ffW-cUA.jpg'
  },
  {
    id: 8,
    title: 'Modern Equipment',
    description: 'State-of-the-art equipment for precise work',
    imageUrl: '/assets/gallery/gallery pics/XCL8X_YuQoenLA-VASo95Q.jpg'
  }
]

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

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

  return (
    <div className="gallery-container">
      <button className="scroll-button left" onClick={() => scroll('left')}>
        ‹
      </button>
      <div className="gallery-scroll-container" ref={scrollContainerRef}>
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className="gallery-item"
            onClick={() => setSelectedImage(item)}
          >
            <img src={item.imageUrl} alt={item.title} />
            <div className="gallery-item-overlay">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="scroll-button right" onClick={() => scroll('right')}>
        ›
      </button>

      {selectedImage && (
        <div className="gallery-modal" onClick={() => setSelectedImage(null)}>
          <div className="gallery-modal-content">
            <button className="close-button" onClick={() => setSelectedImage(null)}>
              ×
            </button>
            <img src={selectedImage.imageUrl} alt={selectedImage.title} />
            <div className="gallery-item-overlay">
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 