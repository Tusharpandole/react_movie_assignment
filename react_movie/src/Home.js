


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from './MovieCard';
import SearchIcon from './search.svg';
import './App.css';

const API_URL = 'https://www.omdbapi.com?apikey=d1e738c1';  // Changed to HTTPS

function Home() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState('');
  const [newListPrivacy, setNewListPrivacy] = useState('public');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    searchMovies('titanic');
  }, []);

  const searchMovies = async (title) => {
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    }
  };

  const createList = () => {
    const newList = {
      name: newListName,
      privacy: newListPrivacy,
      movies: []
    };
    setLists([...lists, newList]);
    setNewListName('');
    setNewListPrivacy('public');
  };

  const addMovieToList = (listIndex, movie) => {
    const updatedLists = lists.map((list, index) => {
      if (index === listIndex) {
        return { ...list, movies: [...list.movies, movie] };
      }
      return list;
    });
    setLists(updatedLists);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  const publicLists = lists.filter(list => list.privacy === 'public');
  const privateLists = lists.filter(list => list.privacy === 'private');

  return (
    <div className="app">
      <h1>MOVIEVERSE</h1>
      <div className='search'>
        <input
          placeholder='search for movies'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      <div style={{ margin: '20px 0' }}>
        <input
          style={{ marginRight: '10px' }}
          placeholder='New list name'
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
        />
        <select
          style={{ marginRight: '10px' }}
          value={newListPrivacy}
          onChange={(e) => setNewListPrivacy(e.target.value)}
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
        <button onClick={createList}>Create List</button>
      </div>
      {movies?.length > 0 ? (
        <div className='container'>
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} lists={lists} addMovieToList={addMovieToList} />
          ))}
        </div>
      ) : (
        <div className='empty'>
          <h2>No movies found</h2>
        </div>
      )}
      <div style={{ marginTop: '20px' }}>
        <h3>Public Lists</h3>
        {publicLists.length > 0 ? (
          publicLists.map((list, index) => (
            <div key={index}>
              <h4 style={{ marginBottom: '10px' }}>{list.name}</h4>
              <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                {list.movies.map((movie) => (
                  <li key={movie.imdbID} style={{ marginBottom: '5px' }}>{movie.Title}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>No public lists available.</p>
        )}
      </div>
      {isAuthenticated && (
        <div style={{ marginTop: '20px' }}>
          <h3>Private Lists</h3>
          {privateLists.length > 0 ? (
            privateLists.map((list, index) => (
              <div key={index}>
                <h4 style={{ marginBottom: '10px' }}>{list.name}</h4>
                <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                  {list.movies.map((movie) => (
                    <li key={movie.imdbID} style={{ marginBottom: '5px' }}>{movie.Title}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>No private lists available.</p>
          )}
        </div>
      )}
      <footer style={footerStyle}>
        <p style={footerTextStyle}>Website designed by Tushar Pandole</p>
        {isAuthenticated && (
          <button onClick={handleLogout} style={logoutButtonStyle}>Log Out</button>
        )}
      </footer>
    </div>
  );
}

const footerStyle = {
  marginTop: '40px',
  padding: '20px',
  textAlign: 'center',
  backgroundColor: '#1f1f1f',
  color: '#fff',
  background: 'linear-gradient(to right, #1f1f1f, #3f3f3f)',
  borderTop: '2px solid #3f3f3f',
  fontFamily: 'Arial, sans-serif',
};

const footerTextStyle = {
  margin: '0',
  fontSize: '18px',
  letterSpacing: '1px',
  animation: 'fadeIn 2s',
};

const logoutButtonStyle = {
  marginTop: '10px',
  padding: '10px 20px',
  backgroundColor: '#ff4d4d',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
};

const styleSheet = document.styleSheets[0];
const keyframes =
  `@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }`;

styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default Home;
//third commit 
