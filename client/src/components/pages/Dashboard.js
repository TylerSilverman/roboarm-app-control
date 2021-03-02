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
} from "@material-ui/core";
// import { useCoverCardMediaStyles } from "@mui-treasury/styles/cardMedia/cover";
import robotImage from "../../assets/roboArm4.png";

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
}));

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
