import React from "react";
import { useParams, Link } from "react-router-dom";
import { FaRegHeart, FaCamera, FaGem, FaBuilding } from "react-icons/fa";
import "./ServiceDetail.css";

// Services Data (same as in Services.jsx)
const servicesData = [
  {
    id: 1,
    title: "Marriage Proposal Planning",
    description:
      "We craft personalized proposal experiences with attention to every detail, ensuring your moment is unforgettable.",
    img: "https://i.pinimg.com/1200x/2a/ff/69/2aff69e9f7caa8d7602d070a424b4a53.jpg",
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
    img: "https://i.pinimg.com/1200x/67/2d/89/672d893ceadb4eefe1de0dde61260ee7.jpg",
    icon: <FaCamera />,
  },
  {
    id: 4,
    title: "Shop the Edit",
    description:
      "Select premium props and setups curated for creating modern, stylish DIY moments.",
    img: "https://i.pinimg.com/1200x/2a/ff/69/2aff69e9f7caa8d7602d070a424b4a53.jpg",
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
    img: "https://i.pinimg.com/1200x/42/54/d0/4254d0f19423ddb3be5912ae1e1901b4.jpg",
    icon: <FaCamera />,
  },
];

export default function ServiceDetail() {
  const { id } = useParams();
  const service = servicesData.find((s) => s.id === parseInt(id));

  if (!service) return <div>Service not found</div>;

  return (
    <div className="service-detail">
      {/* Floating hearts background */}
      <div className="hearts-bg">
        <div className="heart" style={{ left: "10%", animationDelay: "0s" }}></div>
        <div className="heart" style={{ left: "25%", animationDelay: "2s" }}></div>
        <div className="heart" style={{ left: "40%", animationDelay: "4s" }}></div>
        <div className="heart" style={{ left: "60%", animationDelay: "1s" }}></div>
        <div className="heart" style={{ left: "75%", animationDelay: "3s" }}></div>
        <div className="heart" style={{ left: "90%", animationDelay: "5s" }}></div>
      </div>

      {/* Header */}
      <header className="service-header">
        <img src={service.img} alt={service.title} />
        <div className="service-header-content">
          <h1>{service.title}</h1>
          <p>{service.description}</p>
          <span className="service-price">Starting from $299</span>
        </div>
      </header>

      {/* Main content */}
      <main className="service-content">
        <div className="service-info">
          <section>
            <h2>Why Choose This Service?</h2>
            <div className="details-grid">
              <div className="detail-item">
                <div className="floating-heart"></div>
                <h3>💖 Personalized Experience</h3>
                <p>We tailor everything to your love story, ensuring an unforgettable moment.</p>
              </div>
              <div className="detail-item">
                <div className="floating-heart"></div>
                <h3>✨ Elegant Setup</h3>
                <p>From decor to ambiance, every detail is crafted with style and care.</p>
              </div>
              <div className="detail-item">
                <div className="floating-heart"></div>
                <h3>📸 Professional Capture</h3>
                <p>Memories are preserved through expert photography for a lifetime.</p>
              </div>
            </div>
          </section>

          <section className="service-cta">
            <h2>Ready to Make It Happen?</h2>
            <p>Contact us to book this service and let’s create your perfect moment.</p>
            <Link to="/StartPlanning" className="cta-btn primary">Book Now</Link>
          </section>
        </div>
      </main>

      {/* Back navigation */}
      <div className="service-navigation">
        <Link to="/services" className="back-btn">← Back to Services</Link>
      </div>
    </div>
  );
}
