import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import About from './pages/About';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <div className="container">
            <Link to="/">
              <h1>⛳ Massachusetts Mini Golf</h1>
            </Link>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/courses">Golf Courses</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>

        <footer style={{ 
          background: '#333', 
          color: 'white', 
          textAlign: 'center', 
          padding: '2rem 0',
          marginTop: '4rem'
        }}>
          <div className="container">
            <p>&copy; 2025 Massachusetts Mini Golf Directory. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
