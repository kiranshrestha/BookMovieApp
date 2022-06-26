import React, { useEffect, useState } from "react";

import Header from "../../common/header/Header";
import Typography from "@material-ui/core/Typography";
import classes from "./Details.module.css";
import YouTube from "react-youtube";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../config";
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "../../store";

const Details = (props) => {
  const dispatch = useDispatch();

  if (localStorage.getItem("uuid") === null) {
    dispatch(loginAction.userLoggedOut());
  } else {
    dispatch(loginAction.userLoggedIn());
  }

  const userLoggedIn = useSelector((state) => state.userLoggedIn);

  console.log(`User logged in: ${userLoggedIn}`);

  if (userLoggedIn) {
    dispatch(loginAction.showBookShowButton());
  }

  const id = props.location.pathname.replace("/movie/", "");
  const [movieData, setMovieData] = useState({
    genres: [],
    trailer_url: "",
    artists: [],
  });

  const [starIcons, setStarIcons] = useState({
    starIcons: [
      {
        id: 1,
        stateId: "star1",
        color: "black",
      },
      {
        id: 2,
        stateId: "star2",
        color: "black",
      },
      {
        id: 3,
        stateId: "star3",
        color: "black",
      },
      {
        id: 4,
        stateId: "star4",
        color: "black",
      },
      {
        id: 5,
        stateId: "star5",
        color: "black",
      },
    ],
  });

  useEffect(() => {
    const getMovieData = async () => {
      const rawResponse = await fetch(`${BASE_URL}movies/${id}`);
      const response = await rawResponse.json();
      console.log(response);
      setMovieData(response);
    };
    getMovieData();
  }, []);

  const artistClickHandler = (url) => {
    window.location = url;
  };

  const starClickHandler = (id) => {
    let starIconList = [];
    for (let star of starIcons.starIcons) {
      let starNode = star;
      if (star.id <= id) {
        starNode.color = "yellow";
      } else {
        starNode.color = "black";
      }
      console.log(starNode);
      starIconList.push(starNode);
    }
    setStarIcons({ starIcons: starIconList });
  };
  let movie = movieData;

  const opts = {
    height: "300",
    width: "700",
    playerVars: {
      autoplay: 1,
    },
  };
  console.log("starIcons", starIcons.starIcons);
  return (
    <div className={classes.details}>
      <Header />
      <div className={classes.back}>
        <Typography>
          <Link to="/" onClick={useDispatch(loginAction.hideBookShowButton())}>
            {" "}
            &#60; Back to Home
          </Link>
        </Typography>
      </div>
      <div className={classes["flex-containerDetails"]}>
        <div className={classes["leftDetails"]}>
          <img src={movie.poster_url} alt={movie.title} />
        </div>

        <div className={classes["middleDetails"]}>
          <div>
            <Typography variant="headline" component="h2">
              {movie.title}{" "}
            </Typography>
          </div>
          <br />
          <div>
            <Typography>
              <span>Genres: </span> {movie.genres.join(", ")}
            </Typography>
          </div>
          <div>
            <Typography>
              <span>Duration:</span> {movie.duration}{" "}
            </Typography>
          </div>
          <div>
            <Typography>
              <span>Release Date:</span>{" "}
              {new Date(movie.release_date).toDateString()}{" "}
            </Typography>
          </div>
          <div>
            <Typography>
              <span> Rating:</span> {movie.rating}{" "}
            </Typography>
          </div>
          <div className={classes["marginTop16"]}>
            <Typography>
              <span>Plot:</span> <a href={movie.wiki_url}>(Wiki Link)</a>{" "}
              {movie.storyline}{" "}
            </Typography>
          </div>
          <div className={classes["trailerContainer"]}>
            <Typography>
              <span>Trailer:</span>
            </Typography>
            <YouTube videoId={movie.trailer_url.split("?v=")[1]} opts={opts} />
          </div>
        </div>

        <div className={classes["rightDetails"]}>
          <Typography>
            <span>Rate this movie: </span>
          </Typography>
          {starIcons.starIcons.map((star) => (
            <StarBorderIcon
              style={{ color: star.color }}
              key={"star" + star.id}
              onClick={() => starClickHandler(star.id)}
            />
          ))}

          <div className={classes["bold marginBottom16 marginTop16"]}>
            <Typography>
              <span>Artists:</span>
            </Typography>
          </div>
          <div className={classes["paddingRight"]}>
            <GridList cellHeight={160} cols={2}>
              {movie.artists != null &&
                movie.artists.map((artist) => (
                  <GridListTile
                    className={classes.gridTile}
                    onClick={() => artistClickHandler(artist.wiki_url)}
                    key={artist.id}
                  >
                    <img
                      src={artist.profile_url}
                      alt={artist.first_name + " " + artist.last_name}
                    />
                    <GridListTileBar
                      title={artist.first_name + " " + artist.last_name}
                    />
                  </GridListTile>
                ))}
            </GridList>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
