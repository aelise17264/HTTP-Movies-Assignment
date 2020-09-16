import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios';

const initialCard = {
    title: '',
    director: '',
    metascore: ''
}

const UpdateMovie = (props) => {
const history = useHistory();
const {id} = useParams();
const [newMovie, setNewMovie] = useState(initialCard)

useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${id}`)
    .then(res => 
        // console.log(res)
        setNewMovie(res.data)
        )
    .catch(err => console.log(err))
}, [id])



const handleChange = event => {
    event.persist();
    let value = event.target.value;

    setNewMovie({
        ...newMovie,
        [event.target.name]: value
    })

}

const handleSubmit = event => {
    event.preventDefault();
    axios
    .put(`http://localhost:5000/api/movies/${id}`, newMovie)
    .then(res => {
        console.log(res)
        props.setMovieList(res.data)
        history.push('/')
    })
    .catch(error => console.log(error))
}

return(
    <div>
    <h3>Change Some Details</h3>
    <form onSubmit={handleSubmit}>
    <label>Title
        <input
        type='text'
        name='title'
        onChange={handleChange}
        value={newMovie.title}
        />
    </label>
    <label>Director
        <input
        type='text'
        name='director'
        onChange={handleChange}
        value={newMovie.director}
        />
    </label>
    <label>Metascore
        <input
        type='text'
        name='metascore'
        onChange={handleChange}
        value={newMovie.metascore}
        />
    </label>
    <button className='form-button'>Submit</button>
    </form>

    </div>


)



}

export default UpdateMovie