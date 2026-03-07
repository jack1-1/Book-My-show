import React from 'react'
import Navbar from '../components/Navbar'
import { useState, useEffect } from 'react'
import { getAllMovies } from '../calls/movieCalls.js';
import MovieCard from '../components/MovieCard.jsx';
function Home() {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    (async () => {
      const movies = await getAllMovies();
      setMovies(movies.data);
    })()
  }, []);

  return (
  <div>
    <Navbar />

    <div
      style={{
        marginTop: "30px",        // space between Navbar and cards
        display: "flex",
        flexWrap: "wrap",         // moves cards to next row if needed
        gap: "20px",              // space between cards
        padding: "20px"
      }}
    >
      {movies &&
        movies.map((movie, index) => (
          <MovieCard
            key={index}
            poster={movie.posterPath}
            title={movie.title}
            rating={movie.ratings}
            genre={movie.genre}
            language={movie.language}
          />
        ))}
    </div>
  </div>
);
}

export default Home