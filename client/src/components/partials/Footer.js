import React from 'react';

const Footer = (props) => {
  const year = new Date().getFullYear();

  return (
    <footer className="s3 brand-logo center black-text" style={{ fontFamily: 'monospace',
     }}>
      <p>&copy; {year} Camila Mimila and Tyler Silverman - RoboArm</p>
    </footer>
  );
};

export default Footer;
