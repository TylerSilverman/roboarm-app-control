import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Icon } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import MotionContext from "../utils/motionContext";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import API from "./apiHelper";
import { io } from "socket.io-client";

//Material UI style function
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
    <div>
      <ButtonGroup
        orientation="vertical"
        color="secondary"
        aria-label="vertical outlined primary button group"
      >
        {robotMotions.map((motion) => (
          <div>
            <Button
              classes={{
                root: classes.root, // class name, e.g. `classes-nesting-root-x`
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
                root: classes.root, // class name, e.g. `classes-nesting-root-x`
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
    </div>
  );
}

export default Pca9685;
