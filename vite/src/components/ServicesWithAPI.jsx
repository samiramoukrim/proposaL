import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Services.css";
import { FaRegHeart, FaCamera, FaGem, FaBuilding } from "react-icons/fa";
import { serviceService } from "../services/serviceService";

// Static fallback data
const staticServicesData = [
  {
    id: 1,
    title: "Marriage Proposal Planning",
    description:
      "We craft personalized proposal experiences with attention to every detail, ensuring your moment is unforgettable.",
    img: "https://i.pinimg.com/736x/04/f6/1e/04f61ed01f3f016ae428892508975848.jpg",
    icon: <FaRegHeart />,
    category: "Marriage Proposal Planning"
  },
  {
    id: 2,
    title: "Anniversary & Date Night",
    description:
      "From intimate dinners to stylish anniversary setups, we create memorable and elegant experiences.",
    img: "https://i.pinimg.com/736x/ff/b1/17/ffb11752400ed9e03f21e07e9030fe10.jpg",
    icon: <FaBuilding />,
    category: "Anniversary & Date Night"
  },
  {
    id: 3,
    title: "Event Rentals",
    description:
      "Hand-picked furniture and décor to elevate your event effortlessly, keeping it minimal and chic.",
    img: "https://i.pinimg.com/736x/2c/b4/51/2cb451997edde369c895deefde012d03.jpg",
    icon: <FaCamera />,
    category: "Event Rentals"
  },
  {
    id: 4,
    title: "Shop the Edit",
    description:
      "Select premium props and setups curated for creating modern, stylish DIY moments.",
    img: "https://i.pinimg.com/736x/08/9e/e3/089ee3ecb4f2ccc479534f49375a692f.jpg",
    icon: <FaGem />,
    category: "Shop the Edit"
  }
];

// Icon mapping function
const getIconForCategory = (category) => {
  const iconMap = {
    "Marriage Proposal Planning": <FaRegHeart />,
    "Anniversary & Date Night": <FaBuilding />,
    "Event Rentals": <FaCamera />,
    "Shop the Edit": <FaGem />
  };
  return iconMap[category] || <FaGem />;
};

export default function ServicesWithAPI() {
  const [services, setServices] = useState(staticServicesData);
  const [loading, setLoading] = useState(false);
  const [useBackend, setUseBackend] = useState(false);

  // Fetch services from backend
  const fetchServicesFromBackend = async () => {
    try {
      setLoading(true);
      const backendServices = await serviceService.getAllServices();
      
      // Transform backend data to match component structure
      const transformedServices = backendServices.map(service => ({
        id: service._id,
        title: service.title,
        description: service.description || "No description available",
        img: "https://i.pinimg.com/736x/04/f6/1e/04f61ed01f3f016ae428892508975848.jpg", // Default image
        icon: getIconForCategory(service.category),
        category: service.category,
        price: service.price
      }));

      setServices(transformedServices);
      setUseBackend(true);
    } catch (error) {
      console.error('Failed to fetch services from backend:', error);
      // Fallback to static data
      setServices(staticServicesData);
      setUseBackend(false);
    } finally {
      setLoading(false);
    }
  };

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
  }, [services]);

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>Our Services</h1>
          <p>Modern & elegant experiences crafted with precision.</p>
          
          {/* Backend Toggle Button */}
          <div style={{ marginTop: '20px' }}>
            <button 
              onClick={fetchServicesFromBackend}
              disabled={loading}
              style={{
                padding: '10px 20px',
                backgroundColor: useBackend ? '#28a745' : '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginRight: '10px'
              }}
            >
              {loading ? 'Loading...' : useBackend ? '✅ Using Backend Data' : '🔄 Load from Backend'}
            </button>
            
            <button 
              onClick={() => {
                setServices(staticServicesData);
                setUseBackend(false);
              }}
              style={{
                padding: '10px 20px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Use Static Data
            </button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-grid">
        {services.map((service) => (
          <div className="service-card" key={service.id}>
            <div className="service-image">
              <img src={service.img} alt={service.title} />
            </div>
            <div className="service-text">
              <div className="icon">{service.icon}</div>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              {service.price && (
                <p style={{ fontWeight: 'bold', color: '#007bff' }}>
                  Starting at ${service.price}
                </p>
              )}
              {useBackend && (
                <small style={{ color: '#6c757d' }}>
                  ID: {service.id} | Category: {service.category}
                </small>
              )}
              {/* Button redirects to Service Detail page */}
              <Link to={`/service/${service.id}`} className="learn-more-btn">
                📖 Voir les détails
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
