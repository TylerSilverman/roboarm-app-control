import React, { useEffect, useContext, useState } from "react";
import { Store } from "../../store";
import MotionContext from "../../utils/motionContext";
import ClawControls from "../partials/ClawControls";
import API from "../../utils/apiHelper";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  Box,
  Paper,
  Card,
  CardMedia,
  Typography,
  Button,
} from "@material-ui/core";
import robotImage from "../../assets/roboArm.png";
import { io } from "socket.io-client";
import PanToolRoundedIcon from "@material-ui/icons/PanToolRounded";

const useGridStyles = makeStyles(({ breakpoints }) => ({
  root: {
    overflow: "auto",
    alignItems: "center",
    [breakpoints.only("xs")]: {
      "& > *:not(:first-child)": {
        paddingLeft: 0,
      },
    },
    [breakpoints.up("sm")]: {
      justifyContent: "center",
    },
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    borderRadius: "0.5rem",
    padding: theme.spacing(2),
    paddingBottom: 25,
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  card: {
    background: "linear-gradient(45deg, #2775A4 30%, #3D4F99 90%)",
    borderRadius: "0.5rem",
    position: "relative",
    maxWidth: 360,
    minHeight: 300,
    margin: "auto",
    padding: "10px",
    "&:after": {
      display: "block",
      position: "absolute",
      width: "100%",
      height: "64%",
      bottom: 0,
      zIndex: 1,
    },
  },
  root1: {
    background: "linear-gradient(45deg, #C70039 30%, #FF0000 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 40,
    padding: "10px",
    boxShadow: "0 3px 5px 2px rgba(59, 58, 50, .3)",
    margin: "5px",
    width: "200px",
  },
}));

const socket = io();

const Dashboard = (props) => {
  const { state } = useContext(Store);
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

  // Function to grab information from the buttons and send to the motors through socket.io
  const stopBtn = (e) => {
    e.preventDefault();
    // pwm stands for pulse width modulation. We are passing the pulse in microseconds.
    // Using socket.io for real time communication with the Rasberry Pi.
    socket.emit("pwmstop");
  };

  const gridStyles = useGridStyles();
  const classes = useStyles();
  // const mediaStyles = useCoverCardMediaStyl/es({ bgPosition: "top" });

  return (
    <MotionContext.Provider value={{ robotMotions }}>
      <Container className={classes.root}>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="center"
          m="25px"
        >
          <Grid item xs>
            <Box m="25px">
              <Paper elevation={10} className={classes.paper} justify="center">
                <Typography variant="h4" align="center">
                  <b>Welcome to RoboArm, {user.name.split(" ")[0]}</b>
                </Typography>
              </Paper>
            </Box>
          </Grid>
        </Grid>
        <Grid
          style={{ padding: 16 }}
          classes={gridStyles}
          container
          spacing={2}
        >
          <Grid
            container
            item
            xs
            style={{ padding: 16 }}
            alignItems="center"
            justifyContent="center"
            direction="column"
            spacing={2}
          >
            <Grid item xs>
              <Card elevation={10} className={classes.card}>
                <CardMedia
                  component="img"
                  title="Robot Claw"
                  alt="Robot Claw"
                  image={robotImage}
                />
              </Card>
            </Grid>
            <Grid item xs>
              <Button
                classes={{
                  root: classes.root1, // class name, e.g. `classes-nesting-root-x`
                }}
                endIcon={<PanToolRoundedIcon />}
                onClick={stopBtn}
              >
                Stop!!!!
              </Button>
            </Grid>
          </Grid>

          {/* //container for the buttons  */}
          <Grid item xs>
            <ClawControls />
          </Grid>
        </Grid>
      </Container>
    </MotionContext.Provider>
  );
};

export default Dashboard;
