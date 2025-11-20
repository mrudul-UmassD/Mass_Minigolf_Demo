import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllCourses } from '../api';

function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const response = await getAllCourses();
        setCourses(response.data.slice(0, 3)); // Show only 3 courses on home
        setLoading(false);
      } catch (error) {
        console.error('Error loading courses:', error);
        setLoading(false);
      }
    };
    
    loadCourses();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="hero">
        <div className="container">
          <h2>Discover Mini Golf in Massachusetts</h2>
          <p>Your complete guide to the best mini golf courses across the state</p>
        </div>
      </div>

      {/* Intro Section */}
      <section>
        <div className="container">
          <h2>Welcome to Massachusetts Mini Golf</h2>
          <div className="about-content">
            <p>
              Welcome to your ultimate directory for mini golf adventures in Massachusetts! 
              Whether you're looking for a fun family outing, a unique date idea, or just 
              want to enjoy some outdoor recreation, we've got you covered.
            </p>
            <p>
              From pirate-themed courses on Cape Cod to glow-in-the-dark indoor experiences, 
              Massachusetts offers a diverse range of mini golf courses that cater to all ages 
              and skill levels. Explore our comprehensive listings to find the perfect course 
              for your next adventure!
            </p>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section style={{ background: 'white', padding: '3rem 0' }}>
        <div className="container">
          <h2>Featured Golf Courses</h2>
          {loading ? (
            <p style={{ textAlign: 'center' }}>Loading courses...</p>
          ) : (
            <>
              <div className="courses-grid">
                {courses.map(course => (
                  <Link 
                    key={course._id} 
                    to={`/courses/${course._id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div className="course-card">
                      {course.photos && course.photos.length > 0 && (
                        <img src={course.photos[0]} alt={course.name} />
                      )}
                      <div className="course-card-content">
                        <h3>{course.name}</h3>
                        <p className="city">{course.city}</p>
                        <p>{course.description.substring(0, 100)}...</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <Link to="/courses" className="btn">View All Courses</Link>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
