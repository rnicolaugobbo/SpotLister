import React, { useCallback } from "react";
import TrackList from "./TrackList";

function Playlist(props) {
  const handleNameChange = useCallback((event) => {
    props.onNameChange(event.target.value);
  }, [props.onNameChange]);

    return (
        <div className="bg-purple-900/80 text-white rounded-lg overflow-hidden">
          <div className="p-4 border-b border-purple-700">
            <input
              type="text"
              placeholder="New Playlist"
              className="w-full bg-transparent border-none text-2xl font-bold text-white placeholder-purple-300 focus:outline-none"
              onChange={handleNameChange}
            />
          </div>
          <div className="max-h-[600px] overflow-y-auto">
            {props.playlistTracks.length > 0 ? (
              <TrackList tracks={props.playlistTracks} isRemoval={true} onRemove={props.onRemove} />
            ) : (
              <div className="p-4">
                <p className="text-purple-300">Your playlist items will appear here...</p>
              </div>
            )}
          </div>
          <div className="p-4">
            <button className="w-full px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
              SAVE TO SPOTIFY
            </button>
          </div>
        </div>
      )
};

export default Playlist