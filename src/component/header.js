import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'; // Import hamburger icon
import '../App.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="brand-and-toggler">
          <Link to="/" className="navbar-brand">
            <img src="assets/images/curriculum-vitae.png" alt="Logo" className="navbar-brand-icon" />
            <span className="navbar-brand-text">build <span>resume.</span></span>
          </Link>
          <button type="button" className="navbar-toggler-btn" onClick={toggleMenu}>
            <FaBars />
          </button>
        </div>
        
        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/" style={{textDecoration:"none"}}>Home</Link></li>
          <li><Link to="/about" style={{textDecoration:"none"}}>About</Link></li>
          <li><Link to="/services" style={{textDecoration:"none"}}>Services</Link></li>
          <li><Link to="/contact" style={{textDecoration:"none"}}>Contact</Link></li>
        </ul>
        
        <Link to='/edittemplate'><button type="button" className=" navbar-button">Get Start</button></Link>
      </div>
    </nav>
  );
}

export default Header;
