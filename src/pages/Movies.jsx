import React, {useState} from 'react';
import ListMovie from '../components/ListMovie';
import MovieForm from '../components/MovieForm';


const Movies = () => {
  const [movieTitle, setMovieTitle] = useState(''); //제목 상태관리
  const [movieYear, setMovieYear] = useState(''); //날짜 상태관리

  const [movies, setMovies] = useState([]);

  const removeMovie = (id) => {
    setMovies(movies.filter((movie)=>
      {return movie.id !== id;}));
  }

  const addMovie = (movie) => {
    setMovies([
      ...movies,
    movie   
    ]);
  }

  
  return (
    <div className='movies'>
      <h1>movie List</h1>
      <MovieForm addMovie={addMovie} />
      {movies.map((movie, index)=>(
      <ListMovie item={movie} key={index} removeMovie={removeMovie} />               
      ))}

     
    </div>
  );
};

export default Movies;