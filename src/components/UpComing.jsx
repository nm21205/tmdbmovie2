import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules'; // Navigation 추가
import 'swiper/css'; // Swiper CSS import
import 'swiper/css/navigation'; // Navigation CSS import
import 'swiper/css/autoplay'; // Autoplay CSS import

const UpComing = () => {
  const APIKEY = process.env.REACT_APP_API_KEY;
  const [nextMovies, setNextMovies] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getMovies = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${APIKEY}&language=ko`);
      setNextMovies(response.data.results);
      console.log(response);
      setLoading(false);
    } catch (err) {
      console.error('Error:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className='swiper-Navigation'>
      <Swiper
        className='comingWrap'
        spaceBetween={20}
        slidesPerView={4}
        modules={[Navigation, Autoplay]} // Navigation과 Autoplay 모듈 추가
        navigation={{
          nextEl: '.swipernext',
          prevEl: '.swiperprev',
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
      >
        <h2>예정작</h2>
        {
          isLoading ? (
            <div className='loading'> 로딩중... </div>
          ) : (
            nextMovies.map((nextMovie, i) => (
              <SwiperSlide key={i}>
                <Link to={`/coming/${nextMovie.id}`}>
                  <div className='nextMovie'>
                    <div className='nextMovieImg'>
                      <img src={`https://image.tmdb.org/t/p/w300/${nextMovie.poster_path}`} alt={nextMovie.title} />
                    </div>
                    <div className='nextMovieText'>
                      <h2>{nextMovie.title}</h2>
                      <p>{nextMovie.release_date}</p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))
          )
        }
      </Swiper>
      <div className="navigationWrap">
        <div className="swipernext">NEXT</div> {/* 수정된 부분 */}
        <div className="swiperprev">PREV</div> {/* 수정된 부분 */}
      </div>
    </div>
  );
};

export default UpComing;