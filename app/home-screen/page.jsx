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
        const today = new Date();
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(today.getMonth() - 1);
        const todayStr = today.toISOString().split("T")[0];
        const oneMonthAgoStr = oneMonthAgo.toISOString().split("T")[0];

        fetch(`https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=${oneMonthAgoStr}&primary_release_date.lte=${todayStr}&sort_by=primary_release_date.desc`,
      options)
            .then(res => res.json())
            .then(data => {console.log(data); setMovies(data.results)})
            .catch(err => console.error(err));
    }, []);


    return (
        <div className="p-4">
            <h1 className="font-bold text-2xl mb-4">New Releases</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {movies.map((movie) => (
                    <Link href={`/movie/${movie.id}`} key={movie.id}>
                        <div className="relative">
                            <img
                            src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                            className="w-64 h-auto rounded-lg"
                            />

                            {/* Title overlay */}
                            <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white p-2 rounded-b-lg">
                            {movie.title}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}