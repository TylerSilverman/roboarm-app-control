import React, { useEffect, useContext } from 'react';
import { Store } from '../../store';
import { logoutUser } from '../../store/actions/authActions';
import { Link } from "react-router-dom";


import API from '../../utils/apiHelper';

const Dashboard = props => {
  const { state, dispatch } = useContext(Store);
  const user = state.auth.user;

  useEffect(() => {
    if (!state.auth.isAuthenticated)
      props.history.push('/login');

    API.getUser()
    .then(res => console.log({ res }))
    .catch(err => console.log({ err }));
  }, [ state, props ]);

  const onLogoutClick = e => {
    e.preventDefault();

    logoutUser(props.history)(dispatch);
  };


  return (
    <div className="container valign-wrapper" style={{ height: '50vh' }}>
      <div className="row">
        {/* <br></br>
      <Link to="/SaveMotion" role="button" className="btn btn-large waves-effect waves-light hoverable green accent-3">
          View Motions
          </Link> */}
          <br></br>
          <button
            className="btn btn-med waves-effect waves-light hoverable blue accent-3"
            style={
              {
                width: '150px',
                borderRadius: '3px',
                letterSpacing: '1.5px',
                marginTop: '1rem',
              }
            }
            onClick={onLogoutClick}>
            Logout
          </button>
        
        <div className="col s12 center-align">
          <h4>
            <b>Welcome To RoboArm,</b> {user.name.split(' ')[0]}
          </h4>
          <br></br><br></br>
         <div>
          <br></br>
          <h4>Insert Image of the Claw and the Description</h4>
          <Link to="/saveMotion">Saved Movements</Link>
          <br></br><br></br>
          <img alt="logoRoboArm" src={require('../../assets/roboArm.png')} />
          <h3>
          </h3>
      </div>
      
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
