import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Booking.css";

function Booking() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    package: ""
  });

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
    if (!formData.date) e.date = "Please choose a date";
    if (!formData.package) e.package = "Please select a package";
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

    // TODO: replace this with real API call / email service
    console.log("Booking submitted:", formData);

    setSubmitted(true);
    setFormData({ name: "", email: "", date: "", package: "" });
    setErrors({});
  };

  return (
    <div className="booking-page" role="main">
      <div className="booking-card" aria-live="polite">
        <h2 className="booking-title">Book Your Proposal Experience</h2>

        {submitted && (
          <div className="booking-success" role="status">
            🎉 Thank you — your booking request was sent. We will contact you soon.
          </div>
        )}

        <form className="booking-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name" className="visually-hidden">Full name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Full name"
              value={formData.name}
              onChange={handleChange}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "err-name" : undefined}
            />
            {errors.name && <small id="err-name" className="error">{errors.name}</small>}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="visually-hidden">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "err-email" : undefined}
            />
            {errors.email && <small id="err-email" className="error">{errors.email}</small>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date" className="visually-hidden">Date</label>
              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                aria-invalid={!!errors.date}
                aria-describedby={errors.date ? "err-date" : undefined}
              />
              {errors.date && <small id="err-date" className="error">{errors.date}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="package" className="visually-hidden">Package</label>
              <select
                id="package"
                name="package"
                value={formData.package}
                onChange={handleChange}
                aria-invalid={!!errors.package}
                aria-describedby={errors.package ? "err-package" : undefined}
              >
                <option value="">-- Choose package --</option>
                <option value="basic">✨ Basic</option>
                <option value="romantic">💖 Romantic</option>
                <option value="luxury">💎 Luxury</option>
                <option value="custom">🎨 Custom</option>
              </select>
              {errors.package && <small id="err-package" className="error">{errors.package}</small>}
            </div>
          </div>

          <button type="submit" className="booking-btn" aria-label="Submit booking request">
            Reserve Now
          </button>
        </form>

        <div className="booking-footer">
          <p><Link to="/">🔙 Back to Home</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Booking;

