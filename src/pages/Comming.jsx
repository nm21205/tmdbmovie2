import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Comming = () => {
  const {id} =useParams();
  const [isLoading, setLoading]=useState(true);
  const [commingM, setCommingM] = useState(null);
  const APIKEY = process.env.REACT_APP_API_KEY;

  useEffect(()=>{
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}&language=ko`)
    .then(res=>{
      console.log(res)
      setCommingM(res.data);
      setLoading(false);
    })
  },[id]);
  return (
    <div>
       {
        isLoading ? (<div className="loding" >로딩중...</div>) : (
          <div className='movie'>
            <div className="movieBox">
              <img src={`https://image.tmdb.org/t/p/w500/${commingM.backdrop_path}`} alt="" />
            </div>
            <div className="textBox">
              <div className="textBoxTitle">{commingM.title}</div>
              <div className="textBoxOriginalTitle">{commingM.original_title}</div>
              <div className="textBoxOverview">{commingM.overview}</div>
              <div className="textBoxGenres">
                {commingM.genres.map(genre=> (<span key={genre.id}>{genre.name}</span>))}
              </div>
              <div className="textBoxDate">{commingM.release_date}</div>
              <div className="textBoxAverage">⭐ {commingM.vote_average}</div>

            </div>
          </div>
        )
      }
    </div>
  );
};

export default Comming;