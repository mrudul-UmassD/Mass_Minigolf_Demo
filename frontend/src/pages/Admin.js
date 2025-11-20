import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  checkAdminStatus, 
  adminLogin, 
  adminLogout,
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse 
} from '../api';
import CourseForm from '../components/CourseForm';

function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadCourses();
    }
  }, [isAuthenticated]);

  const checkAuth = async () => {
    try {
      const response = await checkAdminStatus();
      setIsAuthenticated(response.data.isAdmin);
      setLoading(false);
    } catch (error) {
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await adminLogin({ username, password });
      setIsAuthenticated(true);
      setUsername('');
      setPassword('');
    } catch (error) {
      setError('Invalid credentials. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await adminLogout();
      setIsAuthenticated(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const loadCourses = async () => {
    try {
      const response = await getAllCourses();
      setCourses(response.data);
    } catch (error) {
      console.error('Error loading courses:', error);
    }
  };

  const handleCreateCourse = async (courseData) => {
    try {
      await createCourse(courseData);
      setShowForm(false);
      loadCourses();
    } catch (error) {
      console.error('Error creating course:', error);
      alert('Error creating course. Please try again.');
    }
  };

  const handleUpdateCourse = async (courseData) => {
    try {
      await updateCourse(editingCourse._id, courseData);
      setShowForm(false);
      setEditingCourse(null);
      loadCourses();
    } catch (error) {
      console.error('Error updating course:', error);
      alert('Error updating course. Please try again.');
    }
  };

  const handleDeleteCourse = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteCourse(id);
        loadCourses();
      } catch (error) {
        console.error('Error deleting course:', error);
        alert('Error deleting course. Please try again.');
      }
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingCourse(null);
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="btn" style={{ width: '100%' }}>
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="container">
        <div className="admin-header">
          <h2>Admin Panel</h2>
          <div className="admin-actions">
            <button 
              onClick={() => {
                setEditingCourse(null);
                setShowForm(true);
              }} 
              className="btn"
            >
              + Add New Course
            </button>
            <button onClick={handleLogout} className="btn btn-danger">
              Logout
            </button>
          </div>
        </div>

        {showForm && (
          <CourseForm
            course={editingCourse}
            onSubmit={editingCourse ? handleUpdateCourse : handleCreateCourse}
            onCancel={handleCancelForm}
          />
        )}

        <div>
          <h3 style={{ marginBottom: '1.5rem' }}>
            All Courses ({courses.length})
          </h3>
          {courses.map(course => (
            <div key={course._id} className="course-item">
              <div className="course-item-info">
                <h3>{course.name}</h3>
                <p style={{ color: '#666' }}>{course.city}</p>
              </div>
              <div className="course-item-actions">
                <button 
                  onClick={() => handleEdit(course)} 
                  className="btn"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteCourse(course._id, course.name)} 
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;
