import React, { useEffect, useContext, useState } from "react";
import { Store } from "../../store";
import { logoutUser } from "../../store/actions/authActions";
import { Link } from "react-router-dom";
import MotionContext from "../../utils/motionContext";
import Pca9685 from "../../utils/pca9685";
import API from "../../utils/apiHelper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import robotImage from "../../assets/roboArm.png";

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
  // console.log(robotMotions);

  const onLogoutClick = (e) => {
    e.preventDefault();

    logoutUser(props.history)(dispatch);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
  }));

  const classes = useStyles();
  return (
    <MotionContext.Provider value={{ robotMotions }}>
      <div className="container valign-wrapper" style={{ height: "auto" }}>
        <div className="row">
          <div>
            <div>
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
          <Link to="/saveMotion" role="button" className="btn btn-med waves-effect waves-light hoverable blue accent-3" style={{
              width: "150px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem",
            }}>
          Favorites
          </Link>
            <h5>
              <b>Welcome to RoboArm, {user.name.split(" ")[0]}</b>
            </h5>
            <p>Choose any button to move Robotic Arm. </p>
            <p>Choose the save button to save favorite motions. </p>
              <Grid
                container
                alignItems="flex-start"
                lassName={classes.root}
                spacing={1}
              >
                <Grid item justify="auto" xs={6} spacing={6}>
                  <img alt="logoRoboArm" src={robotImage} />
                </Grid>
              </Grid>
            </div>
          </div>
          <br></br><br></br><br></br><br></br>
          <br></br><br></br><br></br>
        </div>
        <Grid item justify="auto" xs={6} spacing={6}>
          <Pca9685 />
         </Grid>
      </div>
    </MotionContext.Provider>
  );
};

export default Dashboard;
