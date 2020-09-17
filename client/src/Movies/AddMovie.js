import React, {useState} from 'react';
import { useParams, useHistory } from "react-router-dom";
import {v4 as uuid} from 'uuid';
import axios from 'axios';

let initialState = {
    id: uuid(),
    title: '',
    director: '',
    metascore: '',
    stars: []
}


const AddMovie = () => {
const [film, setFilm] = useState(initialState)
let history = useHistory();


const handleChange = event => {
    setFilm({
        ...film,
        [event.target.name]: event.target.value
        
    })
}



const onSubmit = (event) => {
   event.preventDefault()
   axios.post('http://localhost:5000/api/movies', film)
   .then(res => {
       console.log(res)
       setFilm(res.data)
     history.push('/')
   })
   .catch(error => {console.log('error in post')})
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