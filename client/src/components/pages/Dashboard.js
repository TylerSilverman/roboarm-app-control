import React, { useEffect, useContext, useState } from "react";
import { Store } from "../../store";
import { logoutUser } from "../../store/actions/authActions";
import { Link } from "react-router-dom";
import MotionContext from "../../utils/motionContext";
import Pca9685 from "../../utils/pca9685";
import API from "../../utils/apiHelper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const Dashboard = (props) => {
  const { state, dispatch } = useContext(Store);
  const user = state.auth.user;

  // Store the motor motions grabbed from the DB to send to the pca9685 file
  const [robotMotions, setMotions] = useState([]);

  useEffect(() => {
    if (!state.auth.isAuthenticated) props.history.push("/login");

    API.getUser()
      .then((res) => console.log({ res }))
      .catch((err) => console.log({ err }));
  }, [state, props]);

  // Run a GET request on the page load to grab the motor motions saved in the DB
  useEffect(() => {
    API.getRobotMotions()
      .then((motions) => {
        setMotions(motions.data);
        console.log(motions.data);
      })
      .catch((err) => console.log({ err }));
  }, []);
  console.log(robotMotions);

  const onLogoutClick = (e) => {
    e.preventDefault();

    logoutUser(props.history)(dispatch);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  }));

  return (
    <MotionContext.Provider value={{ robotMotions }}>
      <div className="container valign-wrapper" style={{ height: "50vh" }}>
        <div className="row">
          {/* <br></br>
      <Link to="/SaveMotion" role="button" className="btn btn-large waves-effect waves-light hoverable green accent-3">
          View Motions
          </Link> */}
          <br></br>
          <button
            className="btn btn-med waves-effect waves-light hoverable blue accent-3"
            style={{
              width: "150px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem",
            }}
            onClick={onLogoutClick}
          >
            Logout
          </button>

          <div>
            <h4>
              <b>Welcome To RoboArm,</b> {user.name.split(" ")[0]}
            </h4>
            <br></br>
            <br></br>
            <div>
              <br></br>
              <h4>Insert Image of the Claw and the Description</h4>

              <Link to="/saveMotion">Saved Movements</Link>
              <br></br>
              <br></br>
              <Grid container spacing={1}>
                <Grid container item xs={12} spacing={6}>
                  <img
                    alt="logoRoboArm"
                    src={require("../../assets/roboArm.png")}
                  />
                </Grid>
                <Grid container item xs={12} spacing={6}>
                  <Pca9685 />
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </MotionContext.Provider>
  );
};

export default Dashboard;
