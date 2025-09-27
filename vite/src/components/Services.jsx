import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Services.css";
import { FaRegHeart, FaCamera, FaGem, FaBuilding } from "react-icons/fa";

const servicesData = [
  {
    id: 1,
    title: "Marriage Proposal Planning",
    description:
      "We craft personalized proposal experiences with attention to every detail, ensuring your moment is unforgettable.",
    img: "https://i.pinimg.com/736x/04/f6/1e/04f61ed01f3f016ae428892508975848.jpg",
    icon: <FaRegHeart />,
  },
  {
    id: 2,
    title: "Anniversary & Date Night",
    description:
      "From intimate dinners to stylish anniversary setups, we create memorable and elegant experiences.",
    img: "https://i.pinimg.com/736x/ff/b1/17/ffb11752400ed9e03f21e07e9030fe10.jpg",
    icon: <FaBuilding />,
  },
  {
    id: 3,
    title: "Event Rentals",
    description:
      "Hand-picked furniture and décor to elevate your event effortlessly, keeping it minimal and chic.",
    img: "https://i.pinimg.com/736x/2c/b4/51/2cb451997edde369c895deefde012d03.jpg",
    icon: <FaCamera />,
  },
  {
    id: 4,
    title: "Shop the Edit",
    description:
      "Select premium props and setups curated for creating modern, stylish DIY moments.",
    img: "https://i.pinimg.com/736x/58/1d/75/581d757454d5b39048c4afc46de0fafb.jpg",
    icon: <FaGem />,
  },
  {
    id: 5,
    title: "Elopement & Micro-Wedding Planning",
    description:
      "Have you already proposed, and looking for someone to plan your dream event? We’ve got you covered! From styled to custom wedding and elopement designs, our highly skilled team will bring your wedding dreams to life!",
    img: "https://i.pinimg.com/1200x/f8/a0/e9/f8a0e97ab4e423d51dab5529aa2efee4.jpg",
    icon: <FaGem />,
  },
  {
    id: 6,
    title: "Proposal Photography",
    description:
      "Capture every magical moment of your proposal with professional photography, preserving memories forever. Our expert team ensures every glance, smile, and detail is beautifully immortalized in timeless photos.",
    img: "https://i.pinimg.com/736x/47/fe/57/47fe573a044385b2fe2e9911ae6d171e.jpg",
    icon: <FaCamera />,
  },
];

export default function Services() {
  useEffect(() => {
    const cards = document.querySelectorAll(".service-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>Our Services</h1>
          <p>Modern & elegant experiences crafted with precision.</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-grid">
        {servicesData.map((service) => (
          <div className="service-card" key={service.id}>
            <div className="service-image">
              <img src={service.img} alt={service.title} />
            </div>
            <div className="service-text">
              <div className="icon">{service.icon}</div>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              {/* Button redirects to Service Detail page */}
              <Link to={`/service/${service.id}`} className="learn-more-btn">
                 Voir les détails
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Découvrez nos services en détail</h2>
        <p>Cliquez sur "Voir les détails" de chaque service pour en savoir plus sur nos offres personnalisées.</p>
        {/* Removed StartPlanning link - only service details now */}
      </section>
    </div>
  );
}
