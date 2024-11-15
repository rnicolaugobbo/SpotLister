import React from "react";
import TrackList from "./TrackList";

function SearchResults(props) {
    return (
        <div className="bg-purple-900/80 text-white rounded-lg overflow-hidden">
          <div className="p-4 border-b border-purple-700">
            <h2 className="text-xl font-bold">Results</h2>
          </div>
          {props.searchResults.length === 0 ? (
            <div className="p-4">
              <p className="text-purple-300">Search results will appear here...</p>
            </div>
          ) : (
            <TrackList tracks={props.searchResults} onAdd={props.onAdd} />
          )}
        </div>
      )
}

export default SearchResults