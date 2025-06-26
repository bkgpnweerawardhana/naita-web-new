// src/components/SocialLinks.jsx
import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const SocialLinks = () => {
  return (
    <div className="social-links" style={styles.container}>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={styles.icon}>
        <FaFacebookF />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={styles.icon}>
        <FaTwitter />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={styles.icon}>
        <FaInstagram />
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={styles.icon}>
        <FaLinkedinIn />
      </a>

      
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    gap: '30px',
    justifyContent: 'center',
    padding: '10px',
  },
  icon: {
    color: '#f9a8d4;',
    fontSize: '18px',
    transition: 'color 0.3s',
    textDecoration: 'none',
  },

  
};

export default SocialLinks;
