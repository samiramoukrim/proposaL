import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import './Home.css';
import Test from "./Test";
import Proposal from "./ProposalCarousel";

function Home() {
  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");
    const revealOnScroll = () => {
      revealElements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (top < windowHeight - 100) el.classList.add("active");
      });
    };
    revealOnScroll();
    window.addEventListener("scroll", revealOnScroll);
    return () => window.removeEventListener("scroll", revealOnScroll);
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero reveal">
        <img
          className="bg-img"
          src="https://i.pinimg.com/1200x/bf/5b/86/bf5b86e97c8ce75dbf85dad793b09826.jpg"
          alt="Proposal Hero"
        />
        <div className="overlay"></div>
        <div className="hero__content">
          <h1>Plan Your <span className="highlight">Dream Proposal</span></h1>
          <p>Create unforgettable moments with our luxury proposal planning service.</p>
          <Link to="/StartPlanning" className="btn-gradient">Book Your Proposal</Link>
        </div>
      </section>

      {/* Components Section */}
      <section className="components">
        <div className="reveal"><Test /></div>
        <div className="reveal" id="packages"><Proposal /></div>
      </section>
    </div>
  );
}

export default Home;
