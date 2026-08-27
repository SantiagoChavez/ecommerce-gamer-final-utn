import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-left">
        <img src="/logo-utn.png" alt="Logo UTN" className="footer-logo" />
      </div>
      <div className="footer-right">
        <span>Santiago Chavez Dev</span>
      </div>
    </footer>
  );
}

export default Footer;
