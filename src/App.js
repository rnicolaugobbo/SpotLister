import React, { useState, useCallback, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import Header from './components/Header';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import redirectToSpotifyAuthorize, { searchSpotify, savePlaylistToAccount } from './requestSearch';
import './App.css';

function App() {
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    const tokenExpiry = new Date(localStorage.getItem('expires'));
    const now = new Date();

    if (!accessToken || now >= tokenExpiry) {
      redirectToSpotifyAuthorize();
    }
  }, []);
  
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('New playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const search = useCallback((searchTerm) => {
    searchSpotify(searchTerm).then(setSearchResults)
  }, [])

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

  const savePlaylist = useCallback(() => {
    const trackUri = playlistTracks.map((track) => track.uri);
    savePlaylistToAccount(playlistName, trackUri).then(() => {
      setPlaylistName('New playlist');
      setPlaylistTracks([]);
      console.log('Playlist save successfuly');
    })
  }, [playlistName, playlistTracks]);

  return (
    <div className="min-h-screen bg-[url('/public/bg-img.jpg')] bg-cover bg-center">
      <Header />
      <div className='-mt-20'>
        <div className="max-w-4xl mx-auto space-y-8 px-4 pb-8">
          <SearchBar onSearch={search} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <SearchResults searchResults={searchResults} onAdd={addTrack} />
            <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onNameChange={updatePlaylistName}
            onRemove={removeTrack} 
            onSavePlaylist={savePlaylist} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;