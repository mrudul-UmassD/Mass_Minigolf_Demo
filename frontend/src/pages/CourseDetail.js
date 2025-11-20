import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCourseById } from '../api';

function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourse();
  }, [id]);

  const loadCourse = async () => {
    try {
      const response = await getCourseById(id);
      setCourse(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading course:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <p>Loading course details...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <p>Course not found.</p>
        <Link to="/courses" className="btn" style={{ marginTop: '1rem' }}>Back to Courses</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <Link to="/courses" className="btn btn-back">← Back to All Courses</Link>
      
      <div className="course-detail">
        <h2>{course.name}</h2>
        <p style={{ color: '#764ba2', fontSize: '1.2rem', marginBottom: '1rem' }}>
          {course.city}
        </p>
        
        {course.photos && course.photos.length > 0 && (
          <div className="course-photos">
            {course.photos.map((photo, index) => (
              <img key={index} src={photo} alt={`${course.name} ${index + 1}`} />
            ))}
          </div>
        )}

        <div style={{ margin: '2rem 0' }}>
          <h3 style={{ marginBottom: '1rem' }}>About This Course</h3>
          <p style={{ lineHeight: '1.8', color: '#555', fontSize: '1.1rem' }}>
            {course.description}
          </p>
        </div>

        <div className="course-info">
          {course.address && (
            <div className="info-item">
              <strong>📍 Address</strong>
              <p>{course.address}</p>
            </div>
          )}
          
          {course.phone && (
            <div className="info-item">
              <strong>📞 Phone</strong>
              <p>{course.phone}</p>
            </div>
          )}
        </div>

        {course.features && course.features.length > 0 && (
          <div style={{ margin: '2rem 0' }}>
            <h3 style={{ marginBottom: '1rem' }}>Features</h3>
            <div className="features">
              {course.features.map((feature, index) => (
                <span key={index} className="feature-tag">{feature}</span>
              ))}
            </div>
          </div>
        )}

        <div className="links">
          {course.website && (
            <a 
              href={course.website} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn"
            >
              🌐 Visit Website
            </a>
          )}
          
          {course.googleMapsLink && (
            <a 
              href={course.googleMapsLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-secondary"
            >
              🗺️ View on Google Maps
            </a>
          )}
          
          {course.menuLink && (
            <a 
              href={course.menuLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-secondary"
            >
              📋 View Menu
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
