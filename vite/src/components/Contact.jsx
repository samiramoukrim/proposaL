import React, { useState } from "react";
import "./Contact.css";
import { FaFacebookF, FaInstagram, FaPinterestP } from "react-icons/fa";
import { contactService} from "../services/contactService";

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [submitError, setSubmitError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.message.trim()) errors.message = "Message is required";
  
    return errors;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
  
    setLoading(true);
    setSubmitError(null);
  
    try {
      const response = await contactService.sendMessage(formData);
      console.log("Message sent:", response);
  
      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    } catch (error) {
      console.error("Error sending message:", error);
      if (error.errors) setErrors(error.errors); // validation errors from backend
      else setSubmitError(error.message || "Failed to submit. Try again.");
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
