import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = props => {
  return (
    <div className="navbar-fixed">
      <nav className="z-depth-5">
        <div className="nav-wrapper white">
          <Link to="/" className="col s5 brand-logo center black-text" style={{
              width: "150px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem",
            }} style={{ fontFamily: 'monospace' }}>
            <i className="material-icons"></i> RoboArm
          </Link>
          
          
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
