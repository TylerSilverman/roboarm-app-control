import React, { useEffect, useState, useContext } from "react";
import { Store } from "../../store";
import { Link } from "react-router-dom";
import API from "../../utils/apiHelper";
import { makeStyles } from "@material-ui/core/styles";
import robotImage from "../../assets/roboArm3.png";
import { Icon, Button, Grid, Container, ButtonGroup, Card, CardContent } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';



const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
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

  // const onLogoutClick = (e) => {
  //   e.preventDefault();

  //   logoutUser(props.history)(dispatch);
  // };

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

  const deleteBtn = (e, id) => {
    e.preventDefault();
    console.log(id)
    API.deleteFavorites(
      id
    )
      .then(res => loadFavorites())
      .catch((err) => ({ err }));
    // console.log(
    //   e.currentTarget.getAttribute("channel"),
    //   e.currentTarget.getAttribute("pulse")
    // );
  };

 const loadFavorites = () => {
    API.getFavorites()
      .then((motions) => {
        setFavorites(motions.data);
        console.log(motions.data);
      })
      .catch((err) => console.log({ err }));
  }


  // Run a GET request on the page load to grab the motor motions saved in the DB
  useEffect(() => {
    loadFavorites();
  }, [

  ]);
  console.log("my favorites" + favorites)


  const classes = useStyles();
  return (
    <Container>
      <Grid container direction="row">
        <Grid item>
            <h4>
              <b>Welcome to the favorites Page!</b>
            </h4>
            <img alt="logoRoboArm" src={robotImage} />
        </Grid>
        <Grid item>
        <br></br>
        <h5>
              <b>{user.name.split(" ")[0]}</b>, your saved choices are below:
            </h5>
          <Card>
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
                  onClick={(e)=> deleteBtn(e, motion._id)}
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