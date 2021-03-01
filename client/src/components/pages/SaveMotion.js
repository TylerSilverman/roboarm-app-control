import React, { useEffect, useState, useContext } from "react";
import { Store } from "../../store";
import API from "../../utils/apiHelper";
import { makeStyles } from "@material-ui/core/styles";
import robotImage from "../../assets/roboArm4.png";
import {
  Icon,
  Button,
  Grid,
  Container,
  ButtonGroup,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";


// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     padding: theme.spacing(2),
//     paddingBottom: 25,
//     textAlign: "center",
//     color: theme.palette.text.secondary,
//   },
//   card: {
//     width: 360,
//     height: 660,
//     margin: "auto",
//   },
//   media: {
//     width: "100%",
//     alignItems: "center",
//     justify: "center",
//   },
// }));



const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  card: {
    width: 350,
    height: 660,
    margin: "auto",
  },
  root: {
    background: "gray",
    borderRadius: 5,
    border: 0,
    color: "white",
    height: "50px",
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
  return (
    <Container>
      <Grid
          container
          direction="row"
          alignItems="center"
          justify="center"
          m="25px"
        />
      <br></br>
       <Typography variant="h5" align="center">
            <b>Welcome to the favorites page</b>
          </Typography>
      <br></br><br></br><br></br>
      <Grid container direction="col">
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            component="img"
            title="Robot Claw"
            alt="Robot Claw"
            image={robotImage}
          />
        </Card>
        <Grid item>
          <br></br>
          <Typography variant="h5" align="center">
            <b>Your saved motions are below, {user.name.split(" ")[0]}</b>
          </Typography>
          <br></br>
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
              </ButtonGroup>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SaveMotion;
