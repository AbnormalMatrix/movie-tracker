"use client";
import React from "react";
import { useEffect, useState } from "react";

export default function Home() {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // get new movies
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + process.env.NEXT_PUBLIC_MOVIE_API_KEY
      }
    };

    fetch("https://api.themoviedb.org/3/movie/now_playing", options)
      .then(response => response.json())
      .then(data => setMovies(data.results))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      {movies.map((movie) => (
        <div key={movie.id}>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        </div>
      ))}
    </div>
  );
}