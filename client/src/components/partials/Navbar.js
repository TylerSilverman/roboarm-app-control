import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { logoutUser } from "../../store/actions/authActions";
import { Store } from "../../store";
import logo from "../../assets/logo445.png";

const Navbar = (props) => {
  const history = useHistory();
  const { state, dispatch } = useContext(Store);
  const user = state.auth.user;

  const onLogoutClick = (e) => {
    e.preventDefault();

    logoutUser(history)(dispatch);
  };

  return (
    <nav>
      <div className="nav-wrapper white">
        <NavLink
          to="/"
          className="brand-logo center"
          style={{
            borderRadius: "3px",
            letterSpacing: "4px",
            marginTop: "5px",
            fontFamily: "Russo One, sans-serif",
            fontSize: "45px",
            color: "#3266A1",
          }}
        >
          <span>
            <img alt="logoRoboArm" src={logo} height="40px" width="40px" />{" "}
          </span>
          RoboArm
        </NavLink>
        <ul id="nav-mobile" class="left hide-on-med-and-down">
          <li>
            {state.auth.isAuthenticated ? (
              <a href="/" className="blue-text" onClick={onLogoutClick}>
                Logout
              </a>
            ) : (
              " "
            )}
          </li>

          <li>
            {" "}
            {state.auth.isAuthenticated ? (
              <NavLink to="/dashboard" className="blue-text">
                Dashboard
              </NavLink>
            ) : (
              " "
            )}
          </li>

          <li>
            {" "}
            {state.auth.isAuthenticated ? (
              <NavLink to="/saveMotion" className="blue-text">
                Favorites
              </NavLink>
            ) : (
              " "
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
