export function UI() {
  return (
    <div className="ui-container">
      <div className="ui-element" style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <button 
          onClick={() => window.location.reload()}
          style={{
            padding: '10px 20px',
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Reset View
        </button>
      </div>
      <div className="ui-element" style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
        <div style={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: '15px',
          borderRadius: '5px',
          color: 'white'
        }}>
          <h3>Controls</h3>
          <p>Left Mouse: Rotate</p>
          <p>Right Mouse: Pan</p>
          <p>Scroll: Zoom</p>
        </div>
      </div>
    </div>
  )
} 