import React, { useEffect, useRef } from 'react';

export const Navigation: React.FC = () => {
  const subtitleRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobileMode = () => {
      if (!titleRef.current || !subtitleRef.current) return;

      const titleRect = titleRef.current.getBoundingClientRect();
      const subtitleRect = subtitleRef.current.getBoundingClientRect();

      // Check if elements are stacked (mobile mode)
      const isStacked = Math.abs(titleRect.left - subtitleRect.left) < 5 &&
                       subtitleRect.top >= titleRect.bottom - 1;

      // Set mobile mode on both body and app container
      document.body.classList.toggle('is-mobile', isStacked);
      document.body.setAttribute('data-mobile', isStacked.toString());
      
      // Also set on app container
      const appContainer = document.querySelector('.app');
      if (appContainer) {
        appContainer.classList.toggle('is-mobile', isStacked);
      }

      // Dispatch custom event for mobile mode
      const event = new CustomEvent('mobileModeChange', {
        detail: { isMobile: isStacked }
      });
      window.dispatchEvent(event);

      // Force hide reference elements if in mobile mode
      const referenceElements = document.querySelectorAll('.reference-container, .reference-grid, .reference-card, .model-nav-dot');
      referenceElements.forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.display = isStacked ? 'none' : '';
          el.style.visibility = isStacked ? 'hidden' : '';
          el.style.opacity = isStacked ? '0' : '';
          el.style.pointerEvents = isStacked ? 'none' : '';
        }
      });
    };

    // Create resize observer
    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(checkMobileMode);
    });

    // Observe both title and subtitle
    if (titleRef.current) resizeObserver.observe(titleRef.current);
    if (subtitleRef.current) resizeObserver.observe(subtitleRef.current);

    // Initial check
    checkMobileMode();

    // Also check on window resize
    window.addEventListener('resize', checkMobileMode);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', checkMobileMode);
    };
  }, []);

  return (
    <nav className="nav-container">
      <div className="nav-content">
        <div ref={titleRef} className="nav-title">
          Sunset Septic
        </div>
        <div ref={subtitleRef} className="nav-license">
          Servicing Southern Ontario
        </div>
      </div>
    </nav>
  );
}; 