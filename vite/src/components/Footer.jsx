import React from "react";
import "./Footer.css";
import { FaFacebookF, FaInstagram, FaPinterestP, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        {/* Logo + Intro */}
        <div className="footer__brand">
          <img
            src="/logo_promise_transparent (1).png"
            alt="Promise Logo"
            className="footer__logo"
          />
          <p className="footer__intro">
            Crafting unforgettable experiences and bespoke marriage proposals.
          </p>
        </div>

        {/* Center Columns */}
        <div className="footer__columns">
          <div className="footer__column">
            <h4>Contact</h4>
            <ul>
              <li>📧 contact@yourdomain.com</li>
              <li>📞 +212 600 000 000</li>
              <li>🌍 Morocco</li>
            </ul>
          </div>

          <div className="footer__column">
            <h4>Services</h4>
            <ul>
              <li><a href="#">Curated Ideas</a></li>
              <li><a href="#">Styled Proposals</a></li>
              <li><a href="#">Custom Proposals</a></li>
              <li><a href="#">Elopements</a></li>
            </ul>
          </div>

          <div className="footer__column">
            <h4>Explore</h4>
            <ul>
              <li><a href="#">Portfolio</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Social Icons */}
      <div className="footer__socials">
        <a href="#"><FaFacebookF /></a>
        <a href="#"><FaInstagram /></a>
        <a href="#"><FaPinterestP /></a>
        <a href="#"><FaLinkedinIn /></a>
      </div>

      {/* Bottom */}
      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} The Yes Girls. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
