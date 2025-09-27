import React, { useState } from "react";
import "./StartPlanning.css";

const packages = [
  {
    id: "basic",
    icon: "✨",
    title: "Basic Package",
    description: "A simple yet memorable proposal experience with venue setup and photography."
  },
  {
    id: "romantic",
    icon: "💖",
    title: "Romantic Package",
    description: "Romantic setup with candles, flowers, and a private dinner for two."
  },
  {
    id: "luxury",
    icon: "💎",
    title: "Luxury Package",
    description: "Luxury experience with professional planner, entertainment, and premium amenities."
  },
  {
    id: "custom",
    icon: "🎨",
    title: "Custom Package",
    description: "Tailored proposal based on your vision. Fully customizable experience."
  }
];

function StartPlanning() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    package: ""
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (!formData.email.trim()) e.email = "Email is required";
    if (!formData.date) e.date = "Please select a date";
    if (!formData.package) e.package = "Please choose a package";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eobj = validate();
    if (Object.keys(eobj).length > 0) {
      setErrors(eobj);
      return;
    }
    setSubmitted(true);
    setFormData({ name: "", email: "", date: "", package: "" });
  };

  const selectedPackage = packages.find(p => p.id === formData.package);

  return (
    <div className="booking-page">
      <div className="booking-card">
        <h2 className="booking-title">Start Planning Your Proposal</h2>

        {submitted && (
          <div className="booking-success">
            🎉 Thank you — your booking request was sent.
          </div>
        )}

        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <small className="error">{errors.name}</small>}
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <small className="error">{errors.email}</small>}
          </div>

          <div className="form-group">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
            {errors.date && <small className="error">{errors.date}</small>}
          </div>

          <div className="form-group">
            <select
              name="package"
              value={formData.package}
              onChange={handleChange}
            >
              <option value="">-- Choose a Package --</option>
              {packages.map(p => (
                <option key={p.id} value={p.id}>
                  {p.icon} {p.title}
                </option>
              ))}
            </select>
            {errors.package && <small className="error">{errors.package}</small>}
          </div>

          <button type="submit" className="booking-btn">Reserve Now</button>
        </form>

        {selectedPackage && (
          <div className="package-card">
            <div className="package-icon">{selectedPackage.icon}</div>
            <h3>{selectedPackage.title}</h3>
            <p>{selectedPackage.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default StartPlanning;
