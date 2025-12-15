"use client"

import Link from "next/link";
import { useEffect, useState } from "react"


export default function Home() {

    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

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

    const handleSearch = (e) => {
        e.preventDefault();
        
        if (!searchQuery.trim()) return;

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ACCESS_TOKEN}`
            }
        };

        fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchQuery)}`, options)
            .then(res => res.json())
            .then(data => setSearchResults(data.results))
            .catch(err => console.error(err));
    };

    const displayMovies = searchQuery ? searchResults : movies;

    return (
        <div className="p-4">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-6">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for a movie..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                        Search
                    </button>
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => {
                                setSearchQuery("");
                                setSearchResults([]);
                            }}
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                        >
                            Clear
                        </button>
                    )}
                </div>
            </form>

            <h1 className="font-bold text-2xl mb-4">
                {searchQuery ? `Search Results for "${searchQuery}"` : "New Releases"}
            </h1>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {displayMovies.map((movie) => (
                    <Link href={`/movie/${movie.id}`} key={movie.id}>
                        <div className="relative">
                            <img
                                src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                                alt={movie.title}
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

            {displayMovies.length === 0 && searchQuery && (
                <p className="text-center text-gray-500 mt-8">No movies found for "{searchQuery}"</p>
            )}
        </div>
    );
}