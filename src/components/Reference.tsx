import React from 'react';

export const Reference: React.FC = () => {
  return (
    <div className="reference-container">
      <div className="reference-grid">
        <div 
          className="reference-card"
          data-number="1"
        >
          <div className="reference-card-content">
            <h3>What is a Septic System?</h3>
            <p>A septic system is an underground wastewater treatment structure that uses a combination of nature and proven technology to treat wastewater from household plumbing.</p>
            <ul>
              <li>Treats wastewater from bathrooms, kitchen drains, and laundry</li>
              <li>Consists of a septic tank and a drainfield</li>
              <li>Uses natural processes to treat wastewater</li>
            </ul>
          </div>
        </div>

        <div 
          className="reference-card"
          data-number="2"
        >
          <div className="reference-card-content">
            <h3>Maintenance Tips</h3>
            <ul>
              <li>Inspect and pump regularly (every 3-5 years)</li>
              <li>Use water efficiently to avoid overloading</li>
              <li>Keep detailed records of repairs and maintenance</li>
              <li>Protect the drainfield from damage</li>
            </ul>
          </div>
        </div>

        <div 
          className="reference-card"
          data-number="3"
        >
          <div className="reference-card-content">
            <h3>Warning Signs</h3>
            <ul>
              <li>Bad odors around the tank or drainfield</li>
              <li>Slow-draining fixtures or gurgling sounds</li>
              <li>Sewage backing up into household drains</li>
              <li>Bright green, spongy grass over the septic system</li>
            </ul>
          </div>
        </div>

        <div 
          className="reference-card"
          data-number="4"
        >
          <div className="reference-card-content">
            <h3>Do's and Don'ts</h3>
            <div className="dos-donts">
              <div className="dos">
                <h4>Do's</h4>
                <ul>
                  <li>Conserve water</li>
                  <li>Fix leaks promptly</li>
                  <li>Keep records</li>
                </ul>
              </div>
              <div className="donts">
                <h4>Don'ts</h4>
                <ul>
                  <li>Flush harmful items</li>
                  <li>Park on drainfield</li>
                  <li>Ignore warning signs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div 
          className="reference-card"
          data-number="5"
        >
          <div className="reference-card-content">
            <h3>Environmental Impact</h3>
            <p>Properly maintained septic systems play a crucial role in protecting the environment by:</p>
            <ul>
              <li>Filtering out harmful bacteria and pathogens</li>
              <li>Protecting groundwater and surface water</li>
              <li>Reducing environmental pollution</li>
              <li>Supporting natural water cycles</li>
            </ul>
          </div>
        </div>

        <div 
          className="reference-card"
          data-number="6"
        >
          <div className="reference-card-content">
            <h3>When to Call Us</h3>
            <ul>
              <li>System age over 20-25 years</li>
              <li>Persistent drainage issues</li>
              <li>Failed inspection results</li>
              <li>Planning home additions</li>
              <li>Visible system damage</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}; 