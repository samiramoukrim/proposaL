import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./ProposalCarousel.css";

const IMAGES = [
  {
    src: "https://i.pinimg.com/736x/1d/fe/2b/1dfe2ba40e8cf5d5c5c7e80723f2110d.jpg",
    title: "Romantic Fireworks",
  },
  {
    src: "https://i.pinimg.com/1200x/08/9b/46/089b461b5e4cb17b7b03c7855ef05b13.jpg",
    title: "Elegant Setup",
  },
  {
    src: "https://i.pinimg.com/1200x/1e/62/61/1e6261e9d9f08a7792ce2c6991f95cf7.jpg",
    title: "Outdoor Proposal",
  },
  {
    src: "https://i.pinimg.com/736x/4d/a5/70/4da570afe528e5c93ee3da58a93714b9.jpg",
    title: "Champagne Toast",
  },
];

export default function ProposalCarousel() {
  const carouselRef = useRef(null);
  const navigate = useNavigate();

  const scrollNext = () => {
    carouselRef.current.scrollBy({ left: 320, behavior: "smooth" });
  };

  const scrollPrev = () => {
    carouselRef.current.scrollBy({ left: -320, behavior: "smooth" });
  };

  const goToContact = () => {
    navigate("/contact");
  };

  return (
    <section className="carousel-container">
      <h2 className="carousel-title">Featured Proposal Packages</h2>
      <div className="carousel-wrapper">
        <button className="nav-btn prev" onClick={scrollPrev}>
          &#10094;
        </button>

        <div className="carousel" ref={carouselRef}>
          {IMAGES.map((img, i) => (
            <div className="carousel-item" key={i}>
              <img src={img.src} alt={img.title} />
              <div className="carousel-overlay">
                <h3>{img.title}</h3>
                <button className="contact-btn" onClick={goToContact}>
                  Contact Us
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="nav-btn next" onClick={scrollNext}>
          &#10095;
        </button>
      </div>
    </section>
  );
}
