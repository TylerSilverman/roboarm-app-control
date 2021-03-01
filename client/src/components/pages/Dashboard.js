import React, { useEffect, useContext, useState } from "react";
import { Store } from "../../store";
import MotionContext from "../../utils/motionContext";
import Pca9685 from "../../utils/pca9685";
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
import robotImage from "../../assets/roboArm4.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    paddingBottom: 25,
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  card: {
    width: 360,
    height: 660,
    margin: "auto",
  },
  media: {
    width: "100%",
    alignItems: "center",
    justify: "center",
  },
}));

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

  const classes = useStyles();

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
        <Grid container direction="row">
          <Grid item xs>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                component="img"
                title="Robot Claw"
                alt="Robot Claw"
                image={robotImage}
              />
            </Card>
          </Grid>
          {/* //container for the buttons  */}
          <Grid item xs>
            <Pca9685 />
          </Grid>
        </Grid>
      </Container>
    </MotionContext.Provider>
  );
};

export default Dashboard;
