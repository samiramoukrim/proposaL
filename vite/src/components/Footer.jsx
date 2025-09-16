import React from "react";
import "./Footer.css";
import { FaFacebookF, FaInstagram, FaPinterestP } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">

        <div className="footer__columns">

          {/* Contact Info */}
          <div className="footer__column">
            <h4>Contact</h4>
            <ul>
              <li>📧 Email: contact@yourdomain.com</li>
              <li>📞 Phone: +212 600 000 000</li>
              <li>🌍 Location: Morocco</li>
            </ul>
          </div>

          {/* Services List */}
          <div className="footer__column">
            <h4>Services</h4>
            <ul>
              <li><a href="#">Curated Ideas</a></li>
              <li><a href="#">Styled Proposals</a></li>
              <li><a href="#">Custom Proposals</a></li>
              <li><a href="#">Elopements</a></li>
              <li><a href="#">Anniversaries</a></li>
              <li><a href="#">Date Nights</a></li>
            </ul>
          </div>

          {/* Extra Links */}
          <div className="footer__column">
            <h4>Explore</h4>
            <ul>
              <li><a href="#">Portfolio</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

        </div>

        {/* Social Icons */}
        <div className="footer__socials">
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaPinterestP /></a>
        </div>

        {/* Copyright */}
        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} The Yes Girls. All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
