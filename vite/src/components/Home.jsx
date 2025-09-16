import React, { useEffect } from "react";
import './Home.css';
import Test from "./Test";
import Proposal from "./Proposal";
import Cont from "./Cont";

function Home() {
    useEffect(() => {
        const revealElements = document.querySelectorAll(".reveal");

        const revealOnScroll = () => {
            revealElements.forEach((el) => {
                const elementTop = el.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                if (elementTop < windowHeight - 100) {
                    el.classList.add("active");
                }
            });
        };

        window.addEventListener("scroll", revealOnScroll);
        revealOnScroll(); // تشغيل أولي

        return () => window.removeEventListener("scroll", revealOnScroll);
    }, []);

    return (
        <>
            <div className="home">
                <section className="hero reveal">
                    <img 
                        className="bg-img"
                        src="https://i.pinimg.com/736x/4a/35/9c/4a359c6adfc37a70c385791fe68b94bc.jpg" 
                        alt="Proposal" 
                    />
                    <div className="overlay"></div>
                    <div className="hero__content">
                        <h1 className="hero__title">
                            <span>Plan Your</span>
                            <span className="hero__highlight">DREAM Proposal</span>
                        </h1>
                        <a href="#" className="btn btn--outline-double">Get Started</a>
                    </div>
                </section>
            </div>

            {/* باقي الكومبونونتس مع animation */}
            <div className="reveal"><Test /></div>
            <div className="reveal"><Proposal /></div>
            <div className="reveal"><Cont /></div>
        </>
    );
}

export default Home;
