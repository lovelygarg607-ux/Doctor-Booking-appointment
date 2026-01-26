import React, { useState } from 'react'
import "./.././../styles/Navbar.css"

import logoImage from "../../images/images/cardiogram-cross-health-care-service-logo-designs_1093924-12.avif"
import { Link } from 'react-router-dom';



const Navbar = () => {

  
  const [menuOpen, setMenuOpen] = useState(false);


  return (
    <>

<header>
  {/* Top Info Bar */}

  {/* Main Navbar */}



    <div className="navbar-landingpage">
      <div className="container">
        
        {/* Logo */}
        <div className="logo">
          <img src={logoImage} alt="ChemLabs Logo" />
        </div>

        {/* Navigation */}
        <nav className={`nav-links ${menuOpen ? "show" : ""}`}>
          <Link to={"/"} href="#home" onClick={() => setMenuOpen(false)}>Home</Link>
          <a href={"/about"} onClick={() => setMenuOpen(false)}>About Us</a>
          <a href={"/department"} onClick={() => setMenuOpen(false)}>Departments</a>
          <a href="#research" onClick={() => setMenuOpen(false)}>Doctors</a>
          <a href={"/blog"} onClick={() => setMenuOpen(false)}>Blog</a>
          <a href={"/contact"} onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>

        {/* CTA Buttons */}
        <div className="cta-buttons">
          <Link to="/login" className="btn-primary">
            Login / Register
          </Link>
          <a href="tel:+21061245741" className="btn-phone">
            <i className="fa fa-phone" /> +21 061245741
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </div>

      </div>
    </div>


</header>









{/* 
      <div className="top-bar-landingpage">
        <div className="container">
          <span>📞 +91 9876543210</span>
          <span>✉ support@medicare.com</span>
        </div>
      </div>


      <header className='bottom-bar-landingpage ${}'>
        <div class="container navbar">
          <h2 class="logo">Medicare</h2>

          <nav id="menu">
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Departments</a>
            <a href="#">Doctors</a>
            <a href="#">Blog</a>
        
          </nav>

          <button class="appointment-btn"><Link to={"/login"} class="appointment-btn">Login/Register</Link></button>

          <div class="menu-icon" onClick={toggleMenu}>☰</div>
        </div>
      </header> */}
{/* 
      <div className={`mobile-menu ${openmenu ? "open" : ""}`}>
        <button className="close-menu" onClick={() => setopenmenu(false)}>
          &times;
        </button>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Departments</a>
        <a href="#">Doctors</a>
        <a href="#">Blog</a>
       

        <button class="appointment-btn"><Link to={"/login"} class="appointment-btn">Login/Register</Link></button>
      </div> */}


    </>
  )
}

export default Navbar;