"use client"

import Link from "next/link";
import { useEffect, useState } from "react"


export default function Home() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {

        // get the new movies
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ACCESS_TOKEN}`
            }
        };
        fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
            .then(res => res.json())
            .then(data => {console.log(data); setMovies(data.results)})
            .catch(err => console.error(err));
    }, []);


    return (
        <div className="grid grid-cols-2 gap-4">
            {movies.map((movie) => (
                <Link href={`/movie/${movie.id}`} key={movie.id}>
                    <div className="relative">
                        <img
                        src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                        className="w-full h-auto rounded-lg"
                        />

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