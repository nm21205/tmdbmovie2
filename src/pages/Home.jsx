import React, {useEffect, useState} from 'react';
import MainUpComing from '../components/MainUpComing';
import Search from '../components/Search';
import axios from 'axios';
import AppMovieCard from '../components/AppMovieCard';
import UpComing from '../components/UpComing';

const Home = () => {
  const APIKEY = process.env.REACT_APP_API_KEY;
  const [appMovie, setAppMovie]=useState([]);
  const [upComing, setUpComing]=useState([]);
  const [isLoading, setLoading]=useState(true);
  const [visibleMovies, setVisibleMovies]=useState(5);
  const moviesPerPage=5;

  const getMovies= async () => {
      try{
         const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKEY}&language=ko`);
         setAppMovie(response.data.results)
         console.log(response)
         setLoading(false)

      }catch(err){
         console.error('Error:',err);
         setLoading(false)
      }

   }
   useEffect(()=>{
      getMovies();
   }, [])

   const handleLoadMore=()=>{
    setVisibleMovies((prevVisible)=> prevVisible+moviesPerPage);
   }

  return (
    <div className='home'>
        <MainUpComing />
      <Search />
      <div className="mainContainer mt30">
          <h2>상영작</h2>
          <div className="mainMovie">
            {
              isLoading ? (<div className='loding'> 로딩중... </div>) : (
                <div>
                  <div className='movie'>
                    {
                      appMovie.slice(0, visibleMovies).map(aM=> (
                        <AppMovieCard 
                        key={aM.id} 
                        id={aM.id}
                        title={aM.title}
                        release_date={aM.release_date}
                        average={aM.vote_average}
                        posterPath={aM.poster_path}
                        />
                      ))
                    }
                    
                  </div>
                 {
                  appMovie.length > visibleMovies && (
                    < div className='more' >
                    <button className='theMore' onClick={handleLoadMore}>더보기</button> 
                  </ div >
                  )
                 }
                </div>
              )
            }
          </div>
      </div>
      <UpComing upComing={upComing} />
    </div>
  );
};

export default Home;