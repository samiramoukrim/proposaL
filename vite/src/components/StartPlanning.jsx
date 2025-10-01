import React, { useState } from "react";
import { reservationService } from "../services/reservationService";
import "./StartPlanning.css";

const packages = [
  { id: "basic", icon: "✨", title: "Basic Package", description: "A simple yet memorable proposal experience with venue setup and photography." },
  { id: "romantic", icon: "💖", title: "Romantic Package", description: "Romantic setup with candles, flowers, and a private dinner for two." },
  { id: "luxury", icon: "💎", title: "Luxury Package", description: "Luxury experience with professional planner, entertainment, and premium amenities." },
  { id: "custom", icon: "🎨", title: "Custom Package", description: "Tailored proposal based on your vision. Fully customizable experience." }
];

function StartPlanning({ serviceId = null }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    package: "",
    phone: "",
    message: "",
    serviceId
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

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
      const response = await reservationService.createReservation(formData);
      console.log("Reservation created:", response);

      setSubmitted(true);
      setFormData({ name: "", email: "", date: "", package: "", phone: "", message: "", serviceId });
      setErrors({});
    } catch (error) {
      console.error("Error creating reservation:", error);
      if (error.response?.data?.errors) setErrors(error.response.data.errors);
      else setSubmitError(error.response?.data?.message || "Failed to submit. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const selectedPackage = packages.find(p => p.id === formData.package);

  return (
    <div className="booking-page">
      <div className="booking-card fade-slide-up delay-1">
        <h2 className="booking-title">Start Planning Your Proposal</h2>

        {submitted && (
          <div className="booking-success">
            🎉 Thank you — your booking request was sent.
          </div>
        )}
        {submitError && (
          <div className="booking-error" role="alert">
            ❌ {submitError}
          </div>
        )}

        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} disabled={loading || submitted} />
            {errors.name && <small className="error">{errors.name}</small>}
          </div>

          <div className="form-group">
            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} disabled={loading || submitted} />
            {errors.email && <small className="error">{errors.email}</small>}
          </div>

          <div className="form-group">
            <input type="tel" name="phone" placeholder="Phone Number (optional)" value={formData.phone} onChange={handleChange} disabled={loading || submitted} />
          </div>

          <div className="form-group">
            <input type="date" name="date" value={formData.date} onChange={handleChange} disabled={loading || submitted} />
            {errors.date && <small className="error">{errors.date}</small>}
          </div>

          <div className="form-group">
            <select name="package" value={formData.package} onChange={handleChange} disabled={loading || submitted}>
              <option value="">-- Choose a Package --</option>
              {packages.map(p => (
                <option key={p.id} value={p.id}>
                  {p.icon} {p.title}
                </option>
              ))}
            </select>
            {errors.package && <small className="error">{errors.package}</small>}
          </div>

          <div className="form-group">
            <textarea name="message" placeholder="Additional details (optional)" value={formData.message} onChange={handleChange} disabled={loading || submitted} />
          </div>

          <button type="submit" className="booking-btn" disabled={loading || submitted}>
            {loading ? "Submitting..." : "Reserve Now"}
          </button>
        </form>
      </div>

      {selectedPackage && (
        <div className="package-card fade-slide-up delay-2">
          <div className="package-icon">{selectedPackage.icon}</div>
          <h3>{selectedPackage.title}</h3>
          <p>{selectedPackage.description}</p>
        </div>
      )}
    </div>
  );
}

export default StartPlanning;
