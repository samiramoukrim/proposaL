import React from "react";
import './Test.css';

function Test() {
    return (
        <div className="test">
  <section className="info__section">
    <div className="info__text">
      <h1>DREAM. DESIGN. PLAN. PROPOSE</h1>

      <div className="info__block">
        <h2>Choose Your Package</h2>
        <p>
          We have a package for every love story! Choose from our curated designs
          or go custom for a truly one-of-a-kind experience with your very own Luxury Proposal Planner!
        </p>
      </div>

      <div className="info__block">
        <h2>Select Your Vendors</h2>
        <p>
          We will provide a list of vendor options for each element, including the
          venue, photographer, videographer, florists, decor, and more!
        </p>
      </div>

      <div className="info__block">
        <h2>Pop the Question!</h2>
        <p>
          TYG will handle the rest! We will coordinate all vendors and make sure
          everything goes just as planned. All you have to do is show up with the ring
          and wait for the “YES!”
        </p>
      </div>
    </div>

    <div className="info__image">
      <img
        src="https://i.pinimg.com/1200x/38/09/48/38094831459562eb0c07d7b8364f40c9.jpg"
        alt="Proposal"
      />
    </div>
  </section>
</div>
    );
}

export default Test;