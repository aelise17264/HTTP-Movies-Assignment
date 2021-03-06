import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from './Movies/UpdateMovie';
import AddMovie from './Movies/AddMovie';
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
console.log(movieList)
  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res =>
         setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />


      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie 
        addToSavedList={addToSavedList}
        setMovieList={setMovieList}
        getMovieList={getMovieList}
        movieList={movieList} />
      </Route>

      <Route path="/update-movie/:id">
        <UpdateMovie
         movieList={movieList}
         setMovieList={setMovieList} 
         getMovieList={getMovieList} />
      </Route>

      <Route path="/add-movie">
        <AddMovie 
        setMovieList={setMovieList} 
        getMovieList={getMovieList}
        movieList={movieList}/>
      </Route>
    </>
  );
};

export default App;
