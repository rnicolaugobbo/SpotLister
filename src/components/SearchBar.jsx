import React, { useState } from "react";
import { Search } from 'lucide-react';

function SearchBar() {
    const [searchInput, setSearchInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="search-bar w-full max-w-md mx-auto">
            <form className="relative" onSubmit={handleSubmit}>
                <input 
                className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent mt-28"
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search for songs, albuns or artists" 
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-500 focus:outline-none mt-14">
                    <Search className="h-5 w-5" />
                    <span className="sr-only">Search</span>
                </button>
            </form>
        </div>
    )
};

export default SearchBar