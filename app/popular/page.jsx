"use client"

import { useEffect, useState } from "react"


export default function Page() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {

        // get the popular movies
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
        <div>
            {movies.map((movie) => (
                <p key={movie.id}>
                    {movie.title}
                    <img src={"https://image.tmdb.org/t/p/w500/" + movie.backdrop_path} />
                </p>
            ))}
        </div>
    )
}