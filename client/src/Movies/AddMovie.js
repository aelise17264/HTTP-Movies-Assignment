import React, {useState} from 'react';
import { useParams, useHistory } from "react-router-dom";
import {v4 as uuid} from 'uuid';
import axios from 'axios';

let initialState = {
    id: uuid(),
    title: '',
    director: '',
    metascore: '',
    stars:[{
        star1: '',
        star2:'',
        star3: '',}]
}


const AddMovie = ({setMovieList, movieList}) => {
const [film, setFilm] = useState(initialState)
let history = useHistory();

const handleChange = event => {
    setFilm({
        ...film,
        [event.target.name]: event.target.value
    })
}

  const postMovie = (film)  => {
      axios.post('http://localhost:5000/api/', film)
      .then(res => {
          console.log(res)
          
        // setMovieList({
        //     ...movieList,
        //     film: res.data
        // })
        // history.push('/')
      })
      .catch(error => {console.log('error in post')})
  }

const onSubmit = (event) => {
    postMovie(film)
}



return(
<div className='form-container'>
    <h3>Add Your Favorite Movie</h3>
    <form onSubmit={onSubmit}>
    <label>Title:
    <input
    placeholder='title'
    name='title'
    value={film.title}
    onChange={handleChange}
    />
    </label>
    <label>Director:
    <input
    placeholder='director'
    name='director'
    value={film.director}
    onChange={handleChange}
    />
    </label>
    <label>Metascore:
    <input
    placeholder='score'
    name='metascore'
    value={film.metascore}
    onChange={handleChange}
    />
    </label>

<button type ='submit'>Submit</button>
    </form>

</div>



)

}

export default AddMovie