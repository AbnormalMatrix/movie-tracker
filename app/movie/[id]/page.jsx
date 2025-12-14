"use client"

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Movie() {
    const params = useParams();
    const [movie, setMovie] = useState({});
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {

        // get the popular movies
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ACCESS_TOKEN}`
            }
        };
        fetch(`https://api.themoviedb.org/3/movie/${params.id}?language=en-US`, options)
            .then(res => res.json())
            .then(data => {console.log(data); setMovie(data); setLoaded(true)})
            .catch(err => console.error(err));
    }, []);

    if (loaded) {
        return (
            <main className="min-h-screen bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')` }}>

                <div className="absolute inset-0 bg-black/0"></div>

                <Link href={movie.homepage}>
                    <h1 className="text-4xl">
                        {movie.title}
                    </h1>
                </Link>
                
                <h2>{movie.release_date.split("-")[0]}</h2>
                <h2>{movie.tagline}</h2>
                <p>{movie.overview}</p>
            </main>
            
        );
    } else {
        return (
            <p>loading...</p>
        )
    }
}