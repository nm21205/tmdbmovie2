import React, { useState, useEffect } from 'react';
//useEffect 생명주기를 사용할수 있는 훅
import { useParams } from 'react-router-dom'; //url 주소의 파라미터값 추출
import axios from 'axios';
import './SearchDetail.scss'; 

const APIKEY = process.env.REACT_APP_API_KEY;

const SearchDetail = () => {
  const imgPath = 'http://image.tmdb.org/t/p/original';// tmdb의 이미지경로
  const { movieId } = useParams(); //각각의 아이디값
  const [detailInfo, setDetailInfo] = useState({}); //선택된 영화의 상세정보
  const [actors, setActors] = useState([]); //선택된 영화의 출연배우정보 저장

  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${APIKEY}&language=ko`)
      setActors(response.data.cast);
      console.log(response.data.cast)
    } catch (error) {
      console.error('Error fetching movie details', error)
    }

    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${APIKEY}&language=ko`)
      setDetailInfo(response.data)
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching movie details', error)
    }
  }

  useEffect(() => {
    fetchMovieDetails();
  }, [])

  return (
    <div className='searchDetail'>
      <div className="movieInfo">
        <div className="search-backImg">
          <img src={`${imgPath}${detailInfo.backdrop_path}`} alt={detailInfo.title} />
        </div>
        <div className="search-info">
          <p className="search-title">{detailInfo.title}</p>
          <p className="search-originTit">{detailInfo.original_title}</p>
          <p className="search-desc">{detailInfo.overview}</p>
          <p className="search-release">{detailInfo.release_date}</p>
        </div>
      </div>
      <hr />
      <div className="creditInfo">
        <div className="search-actors">
          <h3>Actors</h3>
          <ul className="actor-list">
            {
              actors.slice(0, 12).map((actor) => (
                <li key={actor.id} className='actor-item'>
                  <img src={`${imgPath}${actor.profile_path}`} alt={actor.name} />
                  <div className='search-info '>
                    <p className='actor-name'>{actor.name}</p>
                    <p className='actor-character'>{actor.character}</p>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchDetail;