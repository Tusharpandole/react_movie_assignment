


import React, { useState } from 'react';
import styled from 'styled-components';

const Movie = styled.div`
  margin-bottom: 20px;
`;

const MovieImage = styled.img`
  width: 100%;
`;

const MovieDetails = styled.div`
  padding: 10px;
`;

const MovieTitle = styled.h3`
  margin: 10px 0;
`;

const MovieSelect = styled.select`
  margin-right: 10px;
`;

const MovieCard = ({ movie, lists, addMovieToList }) => {
  const [selectedList, setSelectedList] = useState('');

  const handleAddMovie = () => {
    const listIndex = lists.findIndex(list => list.name === selectedList);
    if (listIndex > -1) {
      addMovieToList(listIndex, movie);
    }
  }

  return (
    <Movie>
      <div>
        <h1>{movie.Year}</h1>
      </div>
      <div>
        <MovieImage src={movie.Poster !== 'N/A' ? movie.Poster : ''} alt={movie.Title} />
      </div>
      <MovieDetails>
        <span>{movie.Type}</span>
        <MovieTitle>{movie.Title}</MovieTitle>
        <div>
          <MovieSelect
            value={selectedList}
            onChange={(e) => setSelectedList(e.target.value)}
          >
            <option value="">Select List</option>
            {lists.map((list, index) => (
              <option key={index} value={list.name}>{list.name}</option>
            ))}
          </MovieSelect>
          <button onClick={handleAddMovie}>Add to List</button>
        </div>
      </MovieDetails>
    </Movie>
  );
}

export default MovieCard;
