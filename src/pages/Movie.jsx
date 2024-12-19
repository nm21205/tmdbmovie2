import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Movie = () => {
	const { id } = useParams();
	const [m, setM] = useState(null);
	const [isLoading, setLoading] = useState(true);
	const APIKEY = process.env.REACT_APP_APIKEY;

	useEffect(() => {
		axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}&language=ko`)
			.then(res => {
				console.log(res);
				setM(res.data);
				setLoading(false);
			})
			.catch(err => {
				console.error(err);
				setLoading(false);
			});
	}, [id]);

	return (
		<div>
			{
				isLoading ? (<div className="loding">로딩중...</div>) : (
					<div className="movie">
						<div className="movieBox">
							<img src={`https://image.tmdb.org/t/p/w500/${m.backdrop_path}`} alt={m?.title} />
						</div>
            <div className="textBox">
              <div className="textBoxTitle">
                {m.title}
              </div>
              <div className="textBoxOriginalTitle">
                {m.original_title}
              </div>
              <div className="textBoxOverview">
                {m.overview}
              </div>
              <div className="textBoxGenres">
                {m.genres.map(genre => (
                  <span key={genre.id}>{genre.name}</span>
                ))}
              </div>
              <div className="textBoxDate">
                {m.release_date}
              </div>
              <div className="textBoxAverage">
                ★{m.vote_average}
              </div>
            </div>
					</div>
				)
			}
		</div>
	);
};

export default Movie;