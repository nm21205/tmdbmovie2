import React, { useState } from 'react';

const MovieForm = ({ addMovie }) => {
  const [movieTitle, setMovieTitle] = useState('');
  const [movieYear, setMovieYear] = useState('');
  const [titleError, setTitleError] = useState('');
  const [yearError, setYearError] = useState('');

  const resetForm = () => {
    setMovieTitle('');
    setMovieYear('');
    resetErrors();
  }

  const resetErrors = () => {
    setTitleError('');
    setYearError('');
  }

  const validateForm = () => {
    resetErrors();
    let validated = true;
    
    if (!movieTitle) {
      setTitleError('영화제목을 입력하세요');
      validated = false;
    }
    if (!movieYear) {
      setYearError('개봉년도를 입력하세요');
      validated = false;
    }
    return validated;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      addMovie({
        id: Date.now(),
        title: movieTitle,
        year: movieYear
      });
      resetForm();
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <input 
        type="text" 
        placeholder='영화제목을 입력하세요' 
        value={movieTitle} 
        onChange={(e) => setMovieTitle(e.target.value)} 
      />
      <br />
      {titleError && <div className="error">{titleError}</div>}
      <br />
      
      <input 
        type="text" 
        placeholder='개봉연도를 입력하세요' 
        value={movieYear} 
        onChange={(e) => setMovieYear(e.target.value)} 
      />
      <br />
      {yearError && <div className="error">{yearError}</div>}
      <br />
      
      <button type="submit">영화 추가</button>
    </form>
  );
};

export default MovieForm;