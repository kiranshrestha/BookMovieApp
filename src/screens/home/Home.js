import { FormControl, Input, InputLabel, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../common/header/Header";
import { BASE_URL } from "../../config";
import classes from "./Home.module.css";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { loginAction } from "../../store";

const Home = (props) => {
  const [movieName, setMovieName] = useState("");
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [releasedMovies, setReleasedMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [artists, setArtist] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [artistsList, setArtistsList] = useState([]);
  const [releaseDateStart, setReleaseDateStart] = useState("");
  const [releaseDateEnd, setReleaseDateEnd] = useState("");

  const movieNameChangeHandler = (event) => {
    setMovieName(event.target.value);
  };

  const genreSelectHandler = (event) => {
    setGenres(event.target.value);
  };

  const artistSelectHandler = (event) => {
    setArtist(event.target.value);
  };

  const releaseDateStartHandler = (event) => {
    setReleaseDateStart(event.target.value);
  };

  const releaseDateEndHandler = (event) => {
    setReleaseDateEnd(event.target.value);
  };

  const movieClickHandler = (movieId) => {
    props.history.push("/movie/" + movieId);
  };

  const filterApplyHandler = async () => {
    let queryString = "movies?";
    queryString += "title=" + movieName;
    if (genres.length > 0) {
      queryString += "&genres=" + genres.toString();
    }
    if (artists.length > 0) {
      queryString += "&artists=" + artists.toString();
    }
    if (releaseDateStart !== "") {
      queryString += "&start_date=" + releaseDateStart;
    }
    if (releaseDateEnd !== "") {
      queryString += "&end_date=" + releaseDateEnd;
    }

    const rawResponse = await fetch(`${BASE_URL}${queryString}`);
    console.log(rawResponse);
    const response = await rawResponse.json();

    setReleasedMovies(response.movies);
  };

  useEffect(() => {
    const getMoviesList = async () => {
      const rawResponse = await fetch(`${BASE_URL}movies`);
      const response = await rawResponse.json();
      console.log(response);
      setUpcomingMovies(response.movies);
      setReleasedMovies(response.movies);
    };

    const getGenresList = async () => {
      const rawResponse = await fetch(`${BASE_URL}genres`);
      const response = await rawResponse.json();
      console.log(response);
      setGenresList(response.genres);
    };

    const getArtistList = async () => {
      const rawResponse = await fetch(`${BASE_URL}artists`);
      const response = await rawResponse.json();
      console.log(response);
      setArtistsList(response.artists);
    };

    getMoviesList();
    getGenresList();
    getArtistList();
  }, []);

  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.upcomingMoviesHeading}>
        <span>Upcoming Movies</span>
      </div>
      <div className={classes.gridListUpcomingMoviesContainer}>
        <GridList cols={6} id={classes.gridListUpcomingMovies}>
          {upcomingMovies.map((movie) => (
            <GridListTile
              key={"upcoming" + movie.id}
              onClick={() => movieClickHandler(movie.id)}
            >
              <img
                src={movie.poster_url}
                className={classes["movie-poster"]}
                alt={movie.title}
              />
              <GridListTileBar
                className={classes.gridListTitle}
                title={movie.title}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>

      <div className={classes["flex-container"]}>
        <div className={classes.left}>
          <GridList cellHeight={350} cols={4} className={classes.gridListMain}>
            {releasedMovies.map((movie) => (
              <GridListTile
                onClick={() => movieClickHandler(movie.id)}
                className={classes["released-movie-grid-item"]}
                key={"grid" + movie.id}
              >
                <img
                  src={movie.poster_url}
                  className={classes["movie-poster"]}
                  alt={movie.title}
                />
                <GridListTileBar
                  title={movie.title}
                  subtitle={
                    <span>
                      Release Date:{" "}
                      {new Date(movie.release_date).toDateString()}
                    </span>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
        <div className={classes.right}>
          <Card>
            <CardContent>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1 },
                }}
                noValidate
                autoComplete="off"
              >
                <FormControl fullWidth sx={{ m: 1 }}>
                  <Typography id={classes.title}>FIND MOVIES BY:</Typography>
                </FormControl>

                <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                  <InputLabel htmlFor="movie-name">Movie Name</InputLabel>
                  <Input
                    id="movie-name"
                    value={movieName}
                    onChange={movieNameChangeHandler}
                  />
                </FormControl>

                <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                  <InputLabel htmlFor="select-multiple-checkbox-genre">
                    Genres
                  </InputLabel>
                  <Select
                    multiple
                    input={<Input id="select-multiple-checkbox-genre" />}
                    renderValue={(selected) => selected.join(",")}
                    value={genres}
                    onChange={genreSelectHandler}
                  >
                    {genresList.map((genre) => (
                      <MenuItem key={genre.id} value={genre.genre}>
                        <Checkbox checked={genres.indexOf(genre.genre) > -1} />
                        <ListItemText primary={genre.genre} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                  <InputLabel htmlFor="select-multiple-checkbox-artists">
                    Artists
                  </InputLabel>
                  <Select
                    multiple
                    input={<Input id="select-multiple-checkbox-artists" />}
                    renderValue={(selected) => selected.join(",")}
                    value={artists}
                    onChange={artistSelectHandler}
                  >
                    {artistsList.map((artist) => (
                      <MenuItem
                        key={artist.id}
                        value={artist.first_name + " " + artist.last_name}
                      >
                        <Checkbox
                          checked={
                            artists.indexOf(
                              artist.first_name + " " + artist.last_name
                            ) > -1
                          }
                        />
                        <ListItemText
                          primary={artist.first_name + " " + artist.last_name}
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    id="releaseDateStart"
                    label="Release Date Start"
                    type="date"
                    defaultValue=""
                    InputLabelProps={{ shrink: true }}
                    onChange={releaseDateStartHandler}
                  />
                </FormControl>

                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    id="releaseDateEnd"
                    label="Release Date End"
                    type="date"
                    defaultValue=""
                    InputLabelProps={{ shrink: true }}
                    onChange={releaseDateEndHandler}
                  />
                </FormControl>
                <br />
                <br />
                <FormControl fullWidth sx={{ m: 1 }}>
                  <Button
                    className={classes.applyButton}
                    onClick={() => filterApplyHandler()}
                    variant="contained"
                    color="primary"
                  >
                    APPLY
                  </Button>
                </FormControl>
              </Box>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
