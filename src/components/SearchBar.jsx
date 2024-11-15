import React, { useState, useCallback } from "react";

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState('');

  const hanldeSearchTermChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const search = useCallback(() => {
    props.onSearch(searchTerm);
  }, [props.onSearch, searchTerm])
  
    return (
        <div className="flex flex-col items-center space-y-4">
          <input
            type="text"
            placeholder="Enter A Song Title"
            className="w-full max-w-md px-4 py-2 text-purple-900 bg-white border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 mt-32"
            onChange={hanldeSearchTermChange} 
            />
          <button className="px-6 py-2 text-white bg-purple-900 rounded-md hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2" onClick={search}>
            SEARCH
          </button>
        </div>
      )
};

export default SearchBar