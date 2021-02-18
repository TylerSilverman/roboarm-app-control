import React from 'react';

const Footer = props => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <p>&copy; {year} Camila Mimila and Tyler Silverman - RoboArm</p>
    </footer>
  );
};

export default Footer;
