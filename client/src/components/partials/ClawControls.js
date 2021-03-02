import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Icon,
  Card,
  CardContent,
  Typography,
  ButtonGroup,
  Button,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import MotionContext from "../../utils/motionContext";
import API from "../../utils/apiHelper";
import { io } from "socket.io-client";

//Material UI style function
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  card: {
    borderRadius: "0.5rem",
    width: 325,
    minHeight: 660,
    margin: "auto",
  },
  root1: {
    background: "linear-gradient(45deg, #2775A4 30%, #3D4F99 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 40,
    padding: "10px",
    boxShadow: "0 3px 5px 2px rgba(59, 58, 50, .3)",
    margin: "5px",
    width: "200px",
  },
  root2: {
    background: "linear-gradient(45deg, #2775A4 30%, #3D4F99 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 40,
    padding: "10px",
    boxShadow: "0 3px 5px 2px rgba(59, 58, 50, .3)",
    margin: "5px",
    width: "50px",
  },
  label: {
    textTransform: "capitalize",
  },
}));

const socket = io();

function Pca9685() {
  // Material Ui Style function
  const classes = useStyles();

  // Grab the robot DB response from the Dashboard API call
  const { robotMotions } = useContext(MotionContext);

  // Function to grab information from the buttons and send to the motors through socket.io
  const motionBtn = (e) => {
    e.preventDefault();
    // pwm stands for pulse width modulation. We are passing the pulse in microseconds.
    // Using socket.io for real time communication with the Rasberry Pi.
    socket.emit(
      "pwmpulse",
      e.currentTarget.getAttribute("channel"),
      e.currentTarget.getAttribute("pulse")
    );
  };

  const favoritesBtn = (e) => {
    e.preventDefault();
    API.postFavorite({
      motorLocation: e.currentTarget.getAttribute("location"),
      direction: e.currentTarget.getAttribute("direction"),
      motions: {
        channel: e.currentTarget.getAttribute("channel"),
        pulse: e.currentTarget.getAttribute("pulse"),
      },
    })
      .then(console.log("Saved Favorite"))
      .catch((err) => console.log({ err }));
  };

  return (
    <Card elevation={10} className={classes.card}>
      <CardContent>
        <Typography variant="body1">
          Choose any button to move Robotic Arm.
          <br></br>
          Choose the save button to save favorite motions.
        </Typography>
        <ButtonGroup
          orientation="vertical"
          color="secondary"
          aria-label="vertical outlined primary button group"
        >
          {robotMotions.map((motion) => (
            <div>
              <Button
                classes={{
                  root: classes.root1, // class name, e.g. `classes-nesting-root-x`
                  label: classes.label, // class name, e.g. `classes-nesting-label-x`
                }}
                endIcon={<Icon>send</Icon>}
                key={motion.id}
                channel={motion.motions[0].channel}
                pulse={motion.motions[0].pulse}
                onClick={motionBtn}
              >
                {motion.motorLocation} - {motion.direction}
              </Button>

              {/* //saved button symbols */}
              <Button
                classes={{
                  root: classes.root2, // class name, e.g. `classes-nesting-root-x`
                  label: classes.label, // class name, e.g. `classes-nesting-label-x`
                }}
                startIcon={<SaveIcon />}
                location={motion.motorLocation}
                direction={motion.direction}
                channel={motion.motions[0].channel}
                pulse={motion.motions[0].pulse}
                onClick={favoritesBtn}
              />
            </div>
          ))}
        </ButtonGroup>
      </CardContent>
    </Card>
  );
}

export default Pca9685;
