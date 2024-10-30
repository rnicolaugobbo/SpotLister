import React, { useState, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import Header from './components/Header';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import './App.css';

function App() {
  const [searchResults, setSearchResults] = useState([
    {
        id: 1,
        name: "Track 01",
        album: "Album 01",
        artist: "Artist 01"
    },
    {
        id: 2,
        name: "Track 02",
        album: "Album 02",
        artist: "Artist 02"
    }
  ]);

  const [playlistName, setPlaylistName] = useState('New playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const addTrack = useCallback((track) => {
    if(playlistTracks.some((savedTrack) => savedTrack.id === track.id))
      return;

    setPlaylistTracks((prevTracks) => [...prevTracks, track]);
  }, [playlistTracks]);

  const removeTrack = useCallback((track) => {
    setPlaylistTracks((prevTracks) => prevTracks.filter((currentTrack) => currentTrack.id !== track.id));
  }, []);

  const updatePlaylistName = useCallback((name) => {
    setPlaylistName(name)
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-purple-600">
      <Header />
      <div className='-mt-20'>
        <div className="max-w-4xl mx-auto space-y-8 px-4 pb-8">
          <SearchBar />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <SearchResults searchResults={searchResults} onAdd={addTrack} />
            <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onNameChange={updatePlaylistName}
            onRemove={removeTrack} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;