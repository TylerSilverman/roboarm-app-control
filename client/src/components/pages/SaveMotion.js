import React, { useEffect, useState, useContext } from "react";
import { Store } from "../../store";
import API from "../../utils/apiHelper";
import { makeStyles } from "@material-ui/core/styles";
import robotImage from "../../assets/roboArm.png";
import MotionContext from "../../utils/motionContext";
import {
  Icon,
  Button,
  Grid,
  Paper,
  Box,
  Container,
  ButtonGroup,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

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
}));

const SaveMotion = (props) => {
  const { state } = useContext(Store);
  const user = state.auth.user;
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!state.auth.isAuthenticated) props.history.push("/login");

    API.getUser()
      .then((res) => console.log({ res }))
      .catch((err) => console.log({ err }));
  }, [state, props]);

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
    <MotionContext.Provider value={{ favorites }}>
      <Container>
        <Grid
          container
          style={{ padding: 16 }}
          classes={gridStyles}
          spacing={2}
        />
        <Grid item xs>
          <Box m="25px">
            <Paper elevation={10} className={classes.paper} justify="center">
              <Typography variant="h4" align="center">
                <b>Saved Motions</b>
              </Typography>
            </Paper>
          </Box>
        </Grid>
        <br></br>
        <br></br>
        <br></br>
        <Grid container direction="col" item xs>
          <Card elevation={10} className={classes.card}>
            <CardMedia
              component="img"
              title="Robot Claw"
              alt="Robot Claw"
              image={robotImage}
            />
          </Card>
          <Grid item>
            <br></br>
            <Card>
              <p>Click the trash can icon to delete from the list</p>
              <CardContent>
                <ButtonGroup
                  padding="50px"
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
                        key={motion._id}
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
                        id={motion._id}
                        onClick={(e) => deleteBtn(e, motion._id)}
                      />
                    </div>
                  ))}
                  <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>{" "}
                  <br></br> <br></br> <br></br> <br></br> <br></br>
                </ButtonGroup>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </MotionContext.Provider>
  );
};

export default SaveMotion;
