import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-left">
        <span>🎮 UTN Computer Store <span className="version-tag">v1.1.0</span></span>
      </div>
      <div className="footer-right">
        <span>Santiago Ezequiel Chavez</span>
      </div>
    </footer>
  );
}

export default Footer;
