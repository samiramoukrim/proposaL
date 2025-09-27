import React, { useState } from "react";
import "./Contact.css";
import { FaFacebookF, FaInstagram, FaPinterestP } from "react-icons/fa";
import { otherServices } from "../services/serviceService";

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await otherServices.submitContact(formData);
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error('Contact form error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Header */}
      <div className="contact-header">
        <h2>Get in Touch</h2>
        <p>We’d love to hear from you! Fill out the form or reach us directly through our social channels.</p>
      </div>

      {/* Content area */}
      <div className="contact-content">
        {/* Form */}
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="name"
              placeholder="Your Name" 
              value={formData.name}
              onChange={handleInputChange}
              required 
            />
            <input 
              type="email" 
              name="email"
              placeholder="Your Email" 
              value={formData.email}
              onChange={handleInputChange}
              required 
            />
            <textarea 
              name="message"
              placeholder="Your Message" 
              rows="6" 
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>
            
            <button type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
            
            {success && (
              <div style={{ color: 'green', marginTop: '10px', textAlign: 'center' }}>
                ✅ Message sent successfully!
              </div>
            )}
            
            {error && (
              <div style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>
                ❌ {error}
              </div>
            )}
          </form>
        </div>

        {/* Info & Socials */}
        <div className="contact-info">
          <h3>Contact Information</h3>
          <p>Email: info@yourwebsite.com</p>
          <p>Phone: +212 6 12 34 56 78</p>
          <p>Address: Casablanca, Morocco</p>
          <div className="icons">
            <FaFacebookF />
            <FaInstagram />
            <FaPinterestP />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
