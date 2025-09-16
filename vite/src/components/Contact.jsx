import React, { useEffect, useState } from "react";
import "./Contact.css";
import { FaFacebookF, FaInstagram, FaPinterestP } from "react-icons/fa";

function Contact() {
  const [visibleElements, setVisibleElements] = useState({
    title: false,
    description: false,
    name: false,
    email: false,
    message: false,
    button: false,
    icon1: false,
    icon2: false,
    icon3: false
  });

  useEffect(() => {
    const delays = [0, 200, 400, 600, 800, 1000, 1200, 1400, 1600];
    const keys = Object.keys(visibleElements);
    keys.forEach((key, index) => {
      setTimeout(() => {
        setVisibleElements(prev => ({ ...prev, [key]: true }));
      }, delays[index]);
    });

    // create particles
    const container = document.createElement("div");
    container.className = "particles";
    document.body.appendChild(container);

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.width = `${Math.random() * 6 + 4}px`;
      particle.style.height = particle.style.width;
      particle.style.top = `${Math.random() * window.innerHeight}px`;
      particle.style.left = `${Math.random() * window.innerWidth}px`;
      particle.style.animationDuration = `${10 + Math.random() * 10}s`;
      container.appendChild(particle);
    }

    return () => {
      document.body.removeChild(container);
    };
  }, []);

  return (
    <div className="contact-card">
      <h2 className={visibleElements.title ? "fade-in" : ""}>Contact Us</h2>
      <p className={visibleElements.description ? "fade-in" : ""}>
        We'd love to hear from you! Send us a message below.
      </p>
      <form>
        <input
          type="text"
          placeholder="Your Name"
          className={visibleElements.name ? "fade-in" : ""}
        />
        <input
          type="email"
          placeholder="Your Email"
          className={visibleElements.email ? "fade-in" : ""}
        />
        <textarea
          placeholder="Your Message"
          rows="5"
          className={visibleElements.message ? "fade-in" : ""}
        ></textarea>
        <button type="submit" className={visibleElements.button ? "fade-in" : ""}>
          Send Message
        </button>
      </form>
      <div className="icons">
        <FaFacebookF className={visibleElements.icon1 ? "fade-in" : ""} />
        <FaInstagram className={visibleElements.icon2 ? "fade-in" : ""} />
        <FaPinterestP className={visibleElements.icon3 ? "fade-in" : ""} />
      </div>
    </div>
  );
}

export default Contact;

