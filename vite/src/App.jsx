import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Test from "./components/Test";
import Proposal from "./components/Proposal";
import Cont from "./components/Cont";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import Blog from "./components/Blog";          // قائمة المقالات
import BlogDetail from "./components/BlogDetail"; // المقال الفردي
import Booking from "./components/Booking";

// CSS imports
import './components/Navbar.css';
import './components/Test.css';
import './components/Proposal.css';
import './components/Cont.css';
import './components/Services.css';
import './components/Portfolio.css';
import './components/Contact.css';
import './components/Footer.css';
import './components/Blog.css';
import './components/Booking.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/proposal" element={<Proposal />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/cont" element={<Cont />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Blog routes */}
        <Route path="/blog" element={<Blog />} />              {/* قائمة المقالات */}
        <Route path="/blog/:slug" element={<BlogDetail />} /> {/* المقال الفردي */}

        {/* Booking */}
        <Route path="/booking" element={<Booking />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
