import React, { useState, useEffect } from 'react'

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setIsLoading(false)
          return 100
        }
        return prev + 1
      })
    }, 20)

    return () => clearInterval(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className="loading-screen">
      <h1>Sun Set Landscaping</h1>
      <div className="loading-progress">
        <div 
          className="loading-bar" 
          style={{ width: `${progress}%` }}
        />
      </div>
      <p>{progress}%</p>
    </div>
  )
} 