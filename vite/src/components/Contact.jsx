import React, { useState, useEffect } from "react";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let t;
    if (submitted) {
      t = setTimeout(() => setSubmitted(false), 4500);
    }
    return () => clearTimeout(t);
  }, [submitted]);

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) e.email = "Enter a valid email";
    if (!formData.message.trim()) e.message = "Message cannot be empty";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eobj = validate();
    if (Object.keys(eobj).length > 0) {
      setErrors(eobj);
      return;
    }
    console.log("Contact submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page">
      <div className="contact-card">
        <h2 className="contact-title">Contact Us</h2>

        {submitted && (
          <div className="contact-success">
            🎉 Your message has been sent. We'll get back to you soon.
          </div>
        )}

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={formData.name}
              onChange={handleChange}
              aria-invalid={!!errors.name}
            />
            {errors.name && <small className="error">{errors.name}</small>}
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
            />
            {errors.email && <small className="error">{errors.email}</small>}
          </div>

          <div className="form-group">
            <textarea
              name="message"
              placeholder="Your message..."
              rows="5"
              value={formData.message}
              onChange={handleChange}
              aria-invalid={!!errors.message}
            />
            {errors.message && <small className="error">{errors.message}</small>}
          </div>

          <button type="submit" className="contact-btn">Send Message</button>
        </form>

        <div className="contact-footer">
          <p>📧 contact@yourdomain.com</p>
          <p>📞 +212 600 000 000</p>
          <p>📍 Casablanca, Morocco</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
