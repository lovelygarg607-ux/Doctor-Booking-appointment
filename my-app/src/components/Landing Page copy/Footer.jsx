import React from 'react'
import "../../styles/Footer copy.css"

const Footer = () => {
  return (
   <>
 

<footer className="mediplus-footer">
  <div className="footer-overlay">
    <div className="footer-container">
      {/* ABOUT */}
      <div className="footer-col">
        <h3>Medicare</h3>
        <p>
          Far far away, behind the word mountains, far from the countries.
        </p>
        <div className="social-icons">
          <a href="#">🐦</a>
          <a href="#">📘</a>
          <a href="#">📷</a>
        </div>
      </div>
      {/* DEPARTMENTS */}
      <div className="footer-col">
        <h4>Departments</h4>
        <ul>
          <li>→ Neurology</li>
          <li>→ Ophthalmology</li>
          <li>→ Nuclear Magnetic</li>
          <li>→ Surgical</li>
          <li>→ Cardiology</li>
          <li>→ Dental</li>
        </ul>
      </div>
      {/* LINKS */}
      <div className="footer-col">
        <h4>Links</h4>
        <ul>
        
          <li>→ About</li>
          <li>→ Departments</li>
          <li>→ Doctors</li>
          <li>→ Blog</li>
          <li>→ Contact</li>
        </ul>
      </div>
      {/* SERVICES */}
      <div className="footer-col">
        <h4>Services</h4>
        <ul>
          <li>→ Emergency Services</li>
          <li>→ Qualified Doctors</li>
          <li>→ Outdoors Checkup</li>
          <li>→ 24 Hours Services</li>
        </ul>
      </div>
      {/* CONTACT */}
      <div className="footer-col">
        <h4>Have a Questions?</h4>
        <p>📍 203 Fake St. Mountain View, San Francisco, USA</p>
        <p>📞 +2 392 3929 210</p>
        <p>✉️ info@yourdomain.com</p>
      </div>
    </div>
    <div className="footer-bottom">
      Copyright ©2025 All rights reserved 
    </div>
  </div>
</footer>



</>
  )
}

export default Footer