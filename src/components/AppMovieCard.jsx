import React from 'react';
import { Link } from 'react-router-dom';

const AppMovieCard = ({ id, title, release_date, average, posterPath }) => {
  return (
    <div className="aMovie" key={id}>
      <div className="aMovie-card">
        <Link to={`movies/${id}`}>
          <div className="aMovieimgBox">
            <img src={`https://image.tmdb.org/t/p/w300/${posterPath}`} alt={title} />
            <p className='average'>{average}</p>
          </div>
          <div className="aMovieInfo">
            <h2 className="aMovieTitle">{title}</h2>
            <p className="aMovieDate">{release_date}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AppMovieCard;