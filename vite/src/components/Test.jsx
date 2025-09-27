import React, { useState } from "react";
import "./Test.css";

const images = [
  {
    src: "https://i.pinimg.com/736x/d6/40/71/d64071856eeee51d74720ce53b20fce9.jpg",
    title: "Romantic Fireworks",
    description: "Celebrate your proposal with an unforgettable fireworks show under the stars.",
  },
  {
    src: "https://i.pinimg.com/736x/95/6a/f9/956af9941552c03f63e28e00367a9cc9.jpg",
    title: "Elegant Setup",
    description: "A classy setup with candlelight, roses, and a romantic dinner atmosphere.",
  },
  {
    src: "https://i.pinimg.com/736x/04/f6/1e/04f61ed01f3f016ae428892508975848.jpg",
    title: "Outdoor Proposal",
    description: "A scenic outdoor proposal surrounded by nature, perfect for adventure lovers.",
  },
  {
    src: "https://i.pinimg.com/1200x/42/e9/44/42e944338e51a63e31ea6c76500ee1a9.jpg",
    title: "Champagne Celebration",
    description: "Toast your engagement with champagne and a magical celebration.",
  },
  {
    src: "https://i.pinimg.com/1200x/38/09/48/38094831459562eb0c07d7b8364f40c9.jpg",
    title: "Luxury Decor",
    description: "Transform your proposal with luxurious decor and elegant details.",
  },
  {
    src: "https://i.pinimg.com/1200x/6d/e9/99/6de9993958f0911f333bad10af55f442.jpg",
    title: "Magic Touch",
    description: "Our team adds the magic touch to make your proposal truly unforgettable.",
  },
  {
    src: "https://i.pinimg.com/1200x/0c/bc/37/0cbc3713cc784254eaebcdb0ba788855.jpg",
    title: "Sunset Proposal",
    description: "A romantic proposal during a breathtaking sunset on the beach.",
  },
  {
    src: "https://i.pinimg.com/1200x/9f/19/44/9f1944718bff1ec56ef2a1f875dc5eab.jpg",
    title: "Garden Magic",
    description: "Enchanting garden setup full of flowers, lights, and dreamy vibes.",
  },
];

function Test() {
  const [selectedInfo, setSelectedInfo] = useState(null);

  return (
    <section className="masonry">
      <h2 className="masonry__title">Creative Proposal Inspirations</h2>
      <div className="masonry__grid">
        {images.map((img, i) => (
          <div className="masonry__item" key={i}>
            <img src={img.src} alt={img.title} loading="lazy" />
            <div className="masonry__overlay">
              <h3>{img.title}</h3>
              <button onClick={() => setSelectedInfo(img)}>View More</button>
            </div>
          </div>
        ))}
      </div>

      {selectedInfo && (
        <div className="infoModal" onClick={() => setSelectedInfo(null)}>
          <div
            className="infoModal__content"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="infoModal__close" onClick={() => setSelectedInfo(null)}>
              &times;
            </span>
            <h2>{selectedInfo.title}</h2>
            <p>{selectedInfo.description}</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default Test;