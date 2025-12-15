"use client"
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Watchlist() {

    const [watchlist, setWatchlist] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        loadWatchlist();
    }, []);

    const loadWatchlist = () => {
        try {
            const storedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
            setWatchlist(storedWatchlist);
            setLoaded(true);
        } catch (err) {
            console.error('Error loading watchlist:', err);
        }
    };

    const removeFromWatchlist = (movieId) => {
        try {
            const updatedWatchlist = watchlist.filter(item => item.id !== movieId);
            localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
            setWatchlist(updatedWatchlist);
        } catch (error) {
            console.log('Error removing from watchlist:', error);   
        }
    };
    
    if (!loaded) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black text-black dark:text-white font-sans p-4">
            <h1 className="text-3xl font-bold mb-6">My Watchlist</h1>
            {watchlist.length === 0 ? (
                <div className="flex flex-col items-center">
                    <p className="text-lg">
                        Your watchlist is empty.
                    </p>
                    <Link href="home-screen" className="text-blue-500 hover:text-blue-400">Browse movies to add to your watchlist.</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {watchlist.map((movie) => (
                        <div key={movie.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                            {movie.poster_path && (
                                <img
                                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className="w-full h-64 object-cover rounded-t-lg" />
                            )}
                            <div>
                                <Link href={`/movie/${movie.id}`}>
                                    <h2 className="text-xl font-semibold">{movie.title}</h2>
                                </Link>
                                <p className="text-sm text-gray-200 mb-2">
                                    {movie.release_date?.split("-")[0]}
                                </p>
                                {movie.vote_average && (
                                    <p className="text-sm text-yellow-400 mb-2">
                                        {movie.vote_average.toFixed(1)}/10⭐
                                    </p>
                                )}
                                <p className="text-sm text-gray-200 mb-2">
                                    {movie.description}
                                </p>
                                <button onClick={() => removeFromWatchlist(movie.id)} className="mt-2 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded">
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}