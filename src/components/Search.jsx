import React, { useState } from 'react'; // 훅 useState-상태관리
import { CiSearch } from "react-icons/ci"; // 아이콘
import axios from 'axios'; // 비동기식 데이터 불러오기
import { Link } from 'react-router-dom'; // 하이퍼링크 가져와서 사용하기
import SearchDetail from '../pages/SearchDetail'; // SearchDetail 컴포넌트 임포트

const Search = () => {
  const imgPath = 'http://image.tmdb.org/t/p/original'; // tmdb의 이미지경로
  const [searchWord, setSearchWord] = useState(''); // 검색어 상태
  const [movies, setMovies] = useState([]); // 검색어에 맞는 영화 목록 저장
  const [mode, setMode] = useState('list'); // 화면 모드 관리 (list 또는 detail)
  const [selectedMovieID, setSelectedMovieID] = useState(null); // 사용자가 선택한 영화의 ID를 저장
  const APIKEY = process.env.REACT_APP_APIKEY;
  
  // 입력처리 영화검색하는 함수
  const search = () => {
    // TMDB API를 사용하여 영화 검색
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=ko&page=1&include_adult=false&query=${searchWord}`)
      .then((response) => {
        setMovies(response.data.results); // 검색 결과를 movies 상태에 저장
      })
      .catch((error) => {
        console.error('Error fetching movies:', error); // 에러 발생 시 콘솔에 출력
      });
  };

  // 키 입력 처리 함수
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      search(); // Enter 키를 누르면 검색 함수 호출
    }
  };

  // 영화 상세보기 함수
  const showDetail = (movieID) => {
    setMode('detail'); // 상세 모드로 변경
    setSelectedMovieID(movieID); // 선택된 영화 ID 저장

    // 아래의 코드는 주석 처리되어 있습니다.
    // setDetailInfo({}); // 상세 정보 초기화

    // TMDB API를 사용하여 선택된 영화의 상세정보를 가져오는 코드
    // axios.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=546c72b99cf64514c2c03c7ef473011b&language=ko`)
    //   .then((response) => {
    //     setDetailInfo(response.data); // 상세 정보 저장
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching movie details: ', error); // 에러 발생 시 콘솔에 출력
    //   });

    // 선택된 영화의 출연 배우 정보를 가져오는 코드
    // axios.get(`https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=546c72b99cf64514c2c03c7ef473011b&language=ko`)
    //   .then((response) => {
    //     setActors(response.data.cast); // 출연 배우 정보 저장
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching movie details: ', error); // 에러 발생 시 콘솔에 출력
    //   });
  };

  return (
    <div className='search'>
      <div className="search-box">
        <input 
          type="text" 
          value={searchWord}
          onChange={(e) => { setSearchWord(e.target.value); }} // 입력값 변경 시 상태 업데이트
          onKeyPress={handleKeyPress} // 키 입력 시 처리
          placeholder='영화제목을 입력해주세요' 
        />
        <button className="search-btn" onClick={search}><CiSearch /></button> {/* 검색 버튼 클릭 시 검색 함수 호출 */}
      </div>
      <div className="search-result" style={{ display: mode === 'list' ? 'block' : 'none' }}>
        <ul className="search-movieList">
          {
            movies.map((movie) => (
              <li key={movie.id}>
                <Link to={`/search/${movie.id}`} onClick={() => { showDetail(movie.id); }}> {/* 영화 상세보기 클릭 시 showDetail 호출 */}
                  <div className="search-list">
                    <div className="img">
                      <img src={`${imgPath}${movie.poster_path}`} alt={movie.title} />
                    </div>
                    <div className="info">
                      <p className="title">{movie.title}</p>
                      <p className="release">{movie.release_date}</p>
                    </div>
                  </div>
                </Link>
              </li> 
            ))
          }
        </ul>
      </div>
      {mode === 'detail' && <SearchDetail selectedMovieID={selectedMovieID} />} {/* 상세 모드일 때 SearchDetail 컴포넌트 렌더링 */}
    </div>
  );
};

export default Search; // Search 컴포넌트 내보내기