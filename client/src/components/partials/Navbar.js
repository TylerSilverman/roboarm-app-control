import React, { useContext } from "react";
import { Link, useHistory } from 'react-router-dom';
import { logoutUser } from "../../store/actions/authActions";
import { Store } from "../../store";


const Navbar = props => {
  const history = useHistory();
  const { state, dispatch } = useContext(Store);
  const user = state.auth.user;

  const onLogoutClick = (e) => {
    e.preventDefault();
  
    logoutUser(history)(dispatch);
  };

  return (
    <nav>
    <div class="nav-wrapper white">
      <Link to="/" className="brand-logo center black-text" style={{
              width: "150px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem",
            }} style={{ fontFamily: 'monospace' }}>
            <i className="material-icons"></i> RoboArm
          </Link>
      <ul id="nav-mobile" class="left hide-on-med-and-down">
        <li> {state.auth.isAuthenticated? <a href="/" className="blue-text"
            onClick={onLogoutClick}>
             Logout
          </a>: " "}</li>
        
        <li>  {state.auth.isAuthenticated? <Link to="/dashboard" className="blue-text">
             Dashboard
          </Link>: " "}</li>
        
          <li>  {state.auth.isAuthenticated? <Link to="/saveMotion" className="blue-text">
             Favorites
          </Link>: " "}</li>
      </ul>
    </div>
  </nav>
 
  );
};

export default Navbar;
