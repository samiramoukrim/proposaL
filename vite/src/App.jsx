import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Test from "./components/Test";
import ProposalCarousel from "./components/ProposalCarousel";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Services from "./components/Services";
import Blog from "./components/Blog";          // قائمة المقالات
import BlogDetail from "./components/BlogDetail"; // المقال الفردي
import Booking from "./components/StartPlanning";
import StartPlanning from "./components/StartPlanning"; // الصفحة الجديدة
import ApiTest from "./components/ApiTest"; // Backend API connection test
import ConnectionStatus from "./components/ConnectionStatus"; // Connection status indicator
import DatabaseDashboard from "./components/DatabaseDashboard"; // Database management
import ServiceDetail from "./components/ServiceDetail"; // Service detail page
import NavigationTest from "./components/NavigationTest"; // Navigation test page
import ServicesDebug from "./components/ServicesDebug"; // Services debug page
import ServicesLinkTest from "./components/ServicesLinkTest"; // Services link test page

// CSS imports
import './components/Navbar.css';
import './components/Test.css';
import './components/ProposalCarousel.css';
import './components/Services.css';
import './components/Portfolio.css';
import './components/Contact.css';
import './components/Footer.css';
import './components/Blog.css';
import './components/StartPlanning.css'; // CSS ديال StartPlanning
import './components/ServiceDetail.css'; // CSS pour ServiceDetail

 // Scroll to top on route change
 function ScrollToTop() {
   const { pathname } = useLocation();
   useEffect(() => {
     window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
   }, [pathname]);
   return null;
 }

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/proposal" element={<ProposalCarousel />} />
        <Route path="/services" element={<Services />} />
        <Route path="/service/:id" element={<ServiceDetail />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />

        {/* Blog routes */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />

        {/* StartPlanning */}
        <Route path="/StartPlanning" element={<StartPlanning />} />
        
        {/* API Test - for development/testing */}
        <Route path="/api-test" element={<ApiTest />} />
        
        {/* Database Dashboard - for database management */}
        <Route path="/database" element={<DatabaseDashboard />} />
        
        {/* Navigation Test - for testing service links */}
        <Route path="/nav-test" element={<NavigationTest />} />
        
        {/* Services Debug - for debugging service navigation */}
        <Route path="/services-debug" element={<ServicesDebug />} />
        
        {/* Services Link Test - for testing all service links */}
        <Route path="/services-test" element={<ServicesLinkTest />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

