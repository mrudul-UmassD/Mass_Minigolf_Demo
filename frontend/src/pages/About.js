import React from 'react';

function About() {
  return (
    <div>
      <section>
        <div className="container">
          <h2>About Us</h2>
          <div className="about-content">
            <p>
              Welcome to Massachusetts Mini Golf Directory - your comprehensive guide 
              to discovering the best mini golf experiences across the Bay State!
            </p>
            
            <h3 style={{ color: '#764ba2', marginTop: '2rem', marginBottom: '1rem' }}>
              Our Mission
            </h3>
            <p>
              We believe that mini golf is more than just a game - it's a way to create 
              lasting memories with family and friends. Our mission is to help you discover 
              the perfect mini golf course for any occasion, whether you're planning a 
              family outing, a fun date, or a group celebration.
            </p>
            
            <h3 style={{ color: '#764ba2', marginTop: '2rem', marginBottom: '1rem' }}>
              What We Offer
            </h3>
            <p>
              Our directory features detailed information about mini golf courses throughout 
              Massachusetts, including:
            </p>
            <ul style={{ marginLeft: '2rem', marginTop: '1rem', lineHeight: '2' }}>
              <li>Complete contact information and addresses</li>
              <li>Photos and descriptions of each course</li>
              <li>Links to websites, menus, and Google Maps directions</li>
              <li>Information about course themes and special features</li>
              <li>Details about amenities and attractions</li>
            </ul>
            
            <h3 style={{ color: '#764ba2', marginTop: '2rem', marginBottom: '1rem' }}>
              Explore Massachusetts
            </h3>
            <p>
              From the scenic Cape Cod coastline to the vibrant Greater Boston area, 
              Massachusetts offers an incredible variety of mini golf experiences. Whether 
              you prefer outdoor courses with natural landscaping, pirate-themed adventures, 
              or cutting-edge indoor glow-in-the-dark experiences, you'll find it all here.
            </p>
            
            <h3 style={{ color: '#764ba2', marginTop: '2rem', marginBottom: '1rem' }}>
              Get in Touch
            </h3>
            <p>
              We're constantly updating our directory with new courses and information. 
              If you own or manage a mini golf course in Massachusetts and would like to 
              be featured, or if you have suggestions for improving our directory, we'd 
              love to hear from you!
            </p>
            
            <p style={{ marginTop: '2rem', fontStyle: 'italic', textAlign: 'center' }}>
              Happy putting! ⛳
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
