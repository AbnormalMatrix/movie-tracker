"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // get new movies
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer  ${process.env.NEXT_PUBLIC_MOVIE_API_KEY}`
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
        <Link key={movie.id} href={`/movie/${movie.id}`}>
          <div className="relative">
            <img 
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} className="w-full h-auto rounded-lg" />

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white p-2 rounded-b-lg">
            {movie.title}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}