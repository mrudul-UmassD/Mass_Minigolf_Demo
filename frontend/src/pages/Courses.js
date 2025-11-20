import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllCourses } from '../api';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const response = await getAllCourses();
      setCourses(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading courses:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <section>
        <div className="container">
          <h2>All Mini Golf Courses</h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>
            Browse through {courses.length} amazing mini golf courses across Massachusetts
          </p>
          
          {loading ? (
            <p style={{ textAlign: 'center' }}>Loading courses...</p>
          ) : courses.length === 0 ? (
            <p style={{ textAlign: 'center' }}>No courses found.</p>
          ) : (
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
                      <p>{course.description.substring(0, 120)}...</p>
                      {course.phone && (
                        <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                          📞 {course.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Courses;
