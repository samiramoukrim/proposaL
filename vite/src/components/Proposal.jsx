import React from "react";
import "./Proposal.css";

const IMAGES = [
  {
    src: "https://i.pinimg.com/736x/d6/40/71/d64071856eeee51d74720ce53b20fce9.jpg",
    alt: "Fireworks Proposal",
  },
  {
    src: "https://i.pinimg.com/736x/95/6a/f9/956af9941552c03f63e28e00367a9cc9.jpg",
    alt: "Marry Me Marquee",
  },
  {
    src: "https://i.pinimg.com/736x/04/f6/1e/04f61ed01f3f016ae428892508975848.jpg",
    alt: "Outdoor Proposal",
  },
  {
    src: "https://i.pinimg.com/1200x/42/e9/44/42e944338e51a63e31ea6c76500ee1a9.jpg",
    alt: "Champagne Toast",
  },
];

export default function Proposal() {
  return (
    <section className="packages">
      <div className="packages__inner">
        <h2 className="packages__title">Featured Proposal Packages</h2>

        <div className="packages__grid">
          {IMAGES.map((img, i) => (
            <figure className="packages__item" key={i}>
              <img loading="lazy" src={img.src} alt={img.alt} />
              <div className="packages__overlay">
                <h3 className="packages__title-hover">{img.alt}</h3>
              </div>
            </figure>
          ))}
        </div>

        <div className="packages__cta">
          <button className="packages__btn">
            CONTACT US TO GET STARTED!
          </button>
        </div>
      </div>
    </section>
  );
}
