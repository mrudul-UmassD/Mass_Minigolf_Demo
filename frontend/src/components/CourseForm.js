import React, { useState, useEffect } from 'react';

function CourseForm({ course, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    website: '',
    menuLink: '',
    googleMapsLink: '',
    address: '',
    city: '',
    phone: '',
    photos: [],
    features: []
  });

  const [photoInput, setPhotoInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');

  useEffect(() => {
    if (course) {
      setFormData({
        name: course.name || '',
        description: course.description || '',
        website: course.website || '',
        menuLink: course.menuLink || '',
        googleMapsLink: course.googleMapsLink || '',
        address: course.address || '',
        city: course.city || '',
        phone: course.phone || '',
        photos: course.photos || [],
        features: course.features || []
      });
    }
  }, [course]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddPhoto = () => {
    if (photoInput.trim()) {
      setFormData({
        ...formData,
        photos: [...formData.photos, photoInput.trim()]
      });
      setPhotoInput('');
    }
  };

  const handleRemovePhoto = (index) => {
    setFormData({
      ...formData,
      photos: formData.photos.filter((_, i) => i !== index)
    });
  };

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, featureInput.trim()]
      });
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (index) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{course ? 'Edit Course' : 'Add New Course'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Website</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Menu Link</label>
            <input
              type="url"
              name="menuLink"
              value={formData.menuLink}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Google Maps Link</label>
            <input
              type="url"
              name="googleMapsLink"
              value={formData.googleMapsLink}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Photos (URLs)</label>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <input
                type="url"
                value={photoInput}
                onChange={(e) => setPhotoInput(e.target.value)}
                placeholder="Enter photo URL"
                style={{ flex: 1 }}
              />
              <button 
                type="button" 
                onClick={handleAddPhoto}
                className="btn"
                style={{ padding: '0.5rem 1rem' }}
              >
                Add
              </button>
            </div>
            {formData.photos.length > 0 && (
              <div style={{ marginTop: '0.5rem' }}>
                {formData.photos.map((photo, index) => (
                  <div 
                    key={index}
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.5rem',
                      background: '#f9f9f9',
                      marginBottom: '0.5rem',
                      borderRadius: '4px'
                    }}
                  >
                    <span style={{ fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {photo}
                    </span>
                    <button 
                      type="button"
                      onClick={() => handleRemovePhoto(index)}
                      style={{ 
                        background: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Features</label>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                placeholder="Enter feature"
                style={{ flex: 1 }}
              />
              <button 
                type="button" 
                onClick={handleAddFeature}
                className="btn"
                style={{ padding: '0.5rem 1rem' }}
              >
                Add
              </button>
            </div>
            {formData.features.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                {formData.features.map((feature, index) => (
                  <span 
                    key={index}
                    style={{
                      background: '#667eea',
                      color: 'white',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    {feature}
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(index)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                        lineHeight: '1'
                      }}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onCancel} className="btn" style={{ background: '#95a5a6' }}>
              Cancel
            </button>
            <button type="submit" className="btn">
              {course ? 'Update Course' : 'Create Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CourseForm;
