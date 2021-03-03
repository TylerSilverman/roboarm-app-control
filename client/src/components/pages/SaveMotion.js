import React, { useEffect, useState, useContext } from "react";
import { Store } from "../../store";
import API from "../../utils/apiHelper";
import { makeStyles } from "@material-ui/core/styles";
import robotImage from "../../assets/roboArm.png";
import {
  Icon,
  Container,
  Grid,
  Paper,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
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
//styles for the claw image
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
  card2: {
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
  root3: {
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
  label: {
    textTransform: "capitalize",
  },
}));

const socket = io();

const SaveMotion = (props) => {
  const { state } = useContext(Store);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!state.auth.isAuthenticated) props.history.push("/login");

    API.getUser()
      .then((res) => console.log({ res }))
      .catch((err) => console.log({ err }));
  }, [state, props]);

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

  // Function to send the stop message to the motors through socket.io
  const stopBtn = (e) => {
    e.preventDefault();
    // Using socket.io for real time communication with the Rasberry Pi.
    socket.emit("pwmstop");
  };

  const deleteBtn = (e, id) => {
    e.preventDefault();
    console.log(id);
    API.deleteFavorites(id)
      .then((res) => loadFavorites())
      .catch((err) => ({ err }));
  };

  const loadFavorites = () => {
    API.getFavorites()
      .then((motions) => {
        setFavorites(motions.data);
        console.log(motions.data);
      })
      .catch((err) => console.log({ err }));
  };

  // Run a GET request on the page load to grab the motor motions saved in the DB
  useEffect(() => {
    loadFavorites();
  }, []);
  console.log("my favorites" + favorites);

  const classes = useStyles();
  const gridStyles = useGridStyles();

  return (
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
                <b>Saved Motions</b>
              </Typography>
            </Paper>
          </Box>
        </Grid>
      </Grid>
      <Grid style={{ padding: 16 }} classes={gridStyles} container spacing={2}>
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
                root: classes.root3, // class name, e.g. `classes-nesting-root-x`
              }}
              endIcon={<PanToolRoundedIcon />}
              onClick={stopBtn}
            >
              Stop!!!!
            </Button>
          </Grid>
        </Grid>
        <Grid item xs>
          <Card elevation={10} className={classes.card2}>
            <CardContent>
              {!favorites.length ? (
                <Typography variant="body1">
                  You currently do not have saved motions.
                </Typography>
              ) : (
                <ButtonGroup
                  orientation="vertical"
                  color="secondary"
                  aria-label="vertical outlined primary button group"
                >
                  {favorites.map((motion) => (
                    <div>
                      <Button
                        classes={{
                          root: classes.root1, // class name, e.g. `classes-nesting-root-x`
                          label: classes.label, // class name, e.g. `classes-nesting-label-x`
                        }}
                        endIcon={<Icon>send</Icon>}
                        key={motion._id}
                        channel={motion.motions[0].channel}
                        pulse={motion.motions[0].pulse}
                        onClick={motionBtn}
                      >
                        {motion.motorLocation} - {motion.direction}
                      </Button>
                      <Button
                        classes={{
                          root: classes.root2, // class name, e.g. `classes-nesting-root-x`
                          label: classes.label, // class name, e.g. `classes-nesting-label-x`
                        }}
                        startIcon={<DeleteIcon />}
                        location={motion.motorLocation}
                        direction={motion.direction}
                        channel={motion.motions[0].channel}
                        pulse={motion.motions[0].pulse}
                        id={motion._id}
                        onClick={(e) => deleteBtn(e, motion._id)}
                      />
                    </div>
                  ))}
                </ButtonGroup>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SaveMotion;
