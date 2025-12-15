"use client"

import Navbar from "@/app/components/navbar";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Movie() {
    const params = useParams();
    const [movie, setMovie] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [isInWatchlist, setIsInWatchlist] = useState(false);

    useEffect(() => {
        // get the movie details
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ACCESS_TOKEN}`
            }
        };
        fetch(`https://api.themoviedb.org/3/movie/${params.id}?language=en-US`, options)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setMovie(data);
                setLoaded(true);
                checkIfInWatchlist(data.id);
            })
            .catch(err => console.error(err));
    }, [params.id]);

    const checkIfInWatchlist = (movieId) => {
        try {
            const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
            const exists = watchlist.some(item => item.id === movieId);
            setIsInWatchlist(exists);
        } catch (err) {
            console.error('Error checking watchlist:', err);
        }
    };

    const addToWatchlist = () => {
        try {
            const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
            
            // Check if movie already exists
            const exists = watchlist.some(item => item.id === movie.id);
            if (exists) {
                alert('This movie is already in your watchlist');
                return;
            }

            // Add the movie to watchlist
            const movieData = {
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                release_date: movie.release_date,
                overview: movie.overview,
                backdrop_path: movie.backdrop_path,
                vote_average: movie.vote_average
            };

            watchlist.push(movieData);
            localStorage.setItem('watchlist', JSON.stringify(watchlist));
            setIsInWatchlist(true);
            alert('Added to watchlist!');
        } catch (err) {
            console.error('Error adding to watchlist:', err);
        }
    };

    const removeFromWatchlist = () => {
        try {
            const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
            const updatedWatchlist = watchlist.filter(item => item.id !== movie.id);
            localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
            setIsInWatchlist(false);
            alert('Removed from watchlist');
        } catch (err) {
            console.error('Error removing from watchlist:', err);
        }
    };

    if (loaded) {
        return (
            <div>
                <Navbar />
                <main className="pt-16 min-h-screen bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')` }}>

                    <div className="absolute inset-0 bg-black/60"></div>

                    <div className="relative z-10 p-8">
                        <Link href={movie.homepage}>
                            <h1 className="text-4xl text-white hover:underline">
                                {movie.title}
                            </h1>
                        </Link>
                        
                        <h2 className="text-xl text-gray-200">{movie.release_date?.split("-")[0]}</h2>
                        <h2 className="text-lg text-gray-300 italic">{movie.tagline}</h2>
                        
                        <button
                            onClick={isInWatchlist ? removeFromWatchlist : addToWatchlist}
                            className={`mt-4 px-6 py-2 rounded font-semibold transition-colors ${
                                isInWatchlist
                                    ? 'bg-red-600 hover:bg-red-700 text-white'
                                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}
                        >
                            {isInWatchlist ? '✓ In Watchlist' : '+ Add to Watchlist'}
                        </button>

                        <p className="text-white mt-6 max-w-2xl">{movie.overview}</p>
                    </div>
                </main>
            </div>

        );
    } else {
        return (
            <p className="text-center p-8">loading...</p>
        )
    }
}