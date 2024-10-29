import React, { useState } from "react";
import { Search } from 'lucide-react';

function SearchBar() {
    const [searchInput, setSearchInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="flex flex-col items-center space-y-4">
          <input
            type="text"
            placeholder="Enter A Song Title"
            className="w-full max-w-md px-4 py-2 text-purple-900 bg-white border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 mt-32"
          />
          <button className="px-6 py-2 text-white bg-purple-900 rounded-md hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
            SEARCH
          </button>
        </div>
      )
};

export default SearchBar