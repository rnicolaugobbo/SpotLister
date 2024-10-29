import SearchBar from './components/SearchBar';
import Header from './components/Header';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import './App.css';

function App() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-purple-600">
      <Header />
      <div className='-mt-20'>
        <div className="max-w-4xl mx-auto space-y-8">
          <SearchBar />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SearchResults />
            <Playlist />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;