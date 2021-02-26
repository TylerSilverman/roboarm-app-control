import React, { useEffect, useContext } from "react";
import { Store } from "../../store";
import { Link } from "react-router-dom";
import API from "../../utils/apiHelper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import robotImage from "../../assets/roboArm.png";
import { logoutUser } from "../../store/actions/authActions";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { Icon } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';



let favorites =[]

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  root: {
    background: "gray",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 40,
    padding: "auto",
    boxShadow: "0 3px 5px 2px rgba(59, 58, 50, .3)",
    margin: "5px",
  },
  label: {
    textTransform: "capitalize",
  },
}));

const SaveMotion = (props) => {
  const { state, dispatch } = useContext(Store);
  const user = state.auth.user;

  useEffect(() => {
    if (!state.auth.isAuthenticated) props.history.push("/login");

    API.getUser()
      .then((res) => console.log({ res }))
      .catch((err) => console.log({ err }));
  }, [state, props]);

  const onLogoutClick = (e) => {
    e.preventDefault();

    logoutUser(props.history)(dispatch);
  };

  const motionBtn = (e) => {
    e.preventDefault();
    API.postRobotMotions({
      motions: {
        channel: e.currentTarget.getAttribute("channel"),
        pulse: e.currentTarget.getAttribute("pulse"),
      },
    })
      .then()
      .catch((err) => ({ err }));
    // console.log(
    //   e.currentTarget.getAttribute("channel"),
    //   e.currentTarget.getAttribute("pulse")
    // );
  };

  const deleteBtn = (e) => {
    e.preventDefault();
    API.deleteFavorites(
        e.currentTarget.getAttribute("id")
    )
      .then()
      .catch((err) => ({ err }));
    // console.log(
    //   e.currentTarget.getAttribute("channel"),
    //   e.currentTarget.getAttribute("pulse")
    // );
  };


  // Run a GET request on the page load to grab the motor motions saved in the DB
  useEffect(() => {
    API.getFavorites()
      .then((motions) => {
        favorites = motions.data;
        console.log(motions.data);
      })
      .catch((err) => console.log({ err }));
  }, [
    
  ]);
  console.log("my favorites" + favorites)


  const classes = useStyles();
  return (
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
            <Link to="/Dashboard" role="button" className="btn btn-med waves-effect waves-light hoverable blue accent-3" style={{
              width: "150px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem",
            }}>
              Dashboard
          </Link>

            <h4>
              <b>Welcome to the favorites Page!</b>
            </h4>
            <h5>
              <b>{user.name.split(" ")[0]}</b>, your saved choices are below:
            </h5>
            <Grid
              container
              alignItems="flex-start"
              lassName={classes.root}
              spacing={1}
            >
              <Grid item justify="left" xs={6} spacing={6}>
                <img alt="logoRoboArm" src={robotImage} />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
            <div class="card">
              <div class="row-6">
            
              
            <ButtonGroup
              orientation="vertical"
              color="secondary"
              aria-label="vertical button"
      >
        {favorites.map((motion) => (
          <div>
          <Button
            classes={{
              root: classes.root, // class name, e.g. `classes-nesting-root-x`
              label: classes.label, // class name, e.g. `classes-nesting-label-x`
            }}
            
            endIcon={<Icon>send</Icon>}
            key={motion.id}
            // direction={motion.motions}
            channel={motion.motions[0].channel}
            pulse={motion.motions[0].pulse}
            onClick={motionBtn}
          >
            {motion.motorLocation} - {motion.direction}
          </Button>
          <Button
          classes={{
            root: classes.root, // class name, e.g. `classes-nesting-root-x`
            label: classes.label, // class name, e.g. `classes-nesting-label-x`
          }}
          startIcon={<DeleteIcon />}
          location={motion.motorLocation}
          direction={motion.direction}
          channel={motion.motions[0].channel}
          pulse={motion.motions[0].pulse}
          id={motion.id}
          onClick={deleteBtn}
        />
        </div>
        ))}
      </ButtonGroup>
      </div>
            </div>
      
    </div>
  );
};

export default SaveMotion;