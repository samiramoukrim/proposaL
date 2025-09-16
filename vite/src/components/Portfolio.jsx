import React, { useState, useEffect } from 'react';
import './Portfolio.css';

const images = [
  'https://i.pinimg.com/1200x/34/9c/96/349c9664cabe53995188b9d5955b69fe.jpg',
  'https://i.pinimg.com/736x/75/80/b0/7580b0efebdbb2c546e0eeb38d53e0f3.jpg',
  'https://i.pinimg.com/736x/a1/de/ca/a1deca33c2c0f5e317017ffd1208ba0e.jpg',
  'https://i.pinimg.com/1200x/27/ad/08/27ad08f35189a69be1dc28a77ec92bd3.jpg',
  'https://i.pinimg.com/736x/51/77/b1/5177b18602accebe0c74e15a97889550.jpg',
  'https://i.pinimg.com/736x/f4/13/cc/f413cc1d472ab1ed85d6c0d5493109be.jpg',
  'https://i.pinimg.com/736x/2c/b5/3d/2cb53dbd83d67564ea7536f5a8b334f0.jpg',
  'https://i.pinimg.com/1200x/41/4d/58/414d582c638485a32d86cb72addf6dd6.jpg',
  'https://i.pinimg.com/1200x/29/27/20/292720fbe1d146215c91c3b41a71e7a8.jpg'
];

function Portfolio() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextImage = () => setLightboxIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  useEffect(() => {
    const items = document.querySelectorAll('.portfolio-item');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if(entry.isIntersecting){
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
          }
        });
      }, 
      { threshold: 0.2 }
    );

    items.forEach(item => observer.observe(item));
  }, []);

  return (
    <section className="portfolio-section">
      <div className="portfolio-text">
        <h2>Our Proposal Portfolio</h2>
        <p>
          Explore our curated collection of proposal setups that highlight creativity, elegance, and unforgettable moments. Each image tells a story, showcasing the personal touch we bring to every event. From intimate candlelit dinners to grand romantic gestures, our portfolio reflects a diverse range of styles and ideas, ensuring that every proposal feels unique and deeply memorable. Let us inspire your perfect moment, where love, attention to detail, and imagination come together to create an experience that will be cherished forever.
        </p>
      </div>

      <div className="portfolio-gallery">
        {images.map((img, i) => (
          <div
            className="portfolio-item"
            key={i}
            style={{ backgroundImage: `url(${img})` }}
          >
            <button onClick={(e) => { 
              e.stopPropagation(); 
              console.log(`Button clicked on image ${i+1}`); 
            }}>View</button>
          </div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <span className="close-btn" onClick={closeLightbox}>&times;</span>
          <span className="prev-btn" onClick={(e) => { e.stopPropagation(); prevImage(); }}>&lsaquo;</span>
          <img src={images[lightboxIndex]} alt={`Proposal ${lightboxIndex + 1}`} />
          <span className="next-btn" onClick={(e) => { e.stopPropagation(); nextImage(); }}>&rsaquo;</span>
        </div>
      )}
    </section>
  );
}

export default Portfolio;
