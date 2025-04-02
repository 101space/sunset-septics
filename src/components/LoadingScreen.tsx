import { useState, useEffect } from 'react'

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

export function LoadingScreen({ onLoadComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setFadeOut(true)
          setTimeout(() => {
            setIsLoading(false)
            onLoadComplete()
          }, 1000) // Fade out transition time
          return 100
        }
        return prev + Math.random() * 3 + 1 // Random progress for more natural loading
      })
    }, 40)

    return () => clearInterval(timer)
  }, [onLoadComplete])

  if (!isLoading) return null

  return (
    <div 
      className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}
      style={{
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 1s ease-in-out'
      }}
    >
      <div className="loading-content">
        <h1 
          style={{
            fontSize: '3.5rem',
            marginBottom: '2rem',
            background: 'linear-gradient(45deg, var(--color-primary), var(--color-accent))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 10px rgba(255, 107, 53, 0.4)',
            filter: 'drop-shadow(0 2px 3px rgba(0, 0, 0, 0.4))',
            fontWeight: '800',
            letterSpacing: '1px',
            animation: 'shine 4s linear'
          }}
        >
          Sunset Septics
        </h1>
        <div className="loading-progress">
          <div 
            className="loading-bar" 
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <p style={{ marginTop: '1rem', fontSize: '1.2rem' }}>
          {Math.min(Math.floor(progress), 100)}%
        </p>
      </div>
    </div>
  )
} 