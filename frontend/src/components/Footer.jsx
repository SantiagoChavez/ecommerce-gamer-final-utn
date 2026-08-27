import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-left">
          <img src="/logo-utn.png" alt="Logo UTN" className="footer-logo" />
          <span className="version-tag">v1.1.0</span>
        </div>
        <div className="footer-right">
          <span>Santiago Chavez Dev</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
