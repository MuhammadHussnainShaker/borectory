import { useState, useEffect } from 'react';

import MovieCard from './MovieCard';

import './App.css';
import SearchIcon from './search.svg';
import ResetIcon from './reset.svg';

// a variable that stores a movie for debugging purpose
// const movie = {
//         "Title": "Italian Spiderman",
//         "Year": "2007",
//         "imdbID": "tt2705436",
//         "Type": "movie",
//         "Poster": "https://m.media-amazon.com/images/M/MV5BZWQxMjcwNjItZjI0ZC00ZTc4LWIwMzItM2Q0YTZhNzI3NzdlXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_SX300.jpg"
// }

const API_URL = 'http://omdbapi.com?apikey=fbfb027d';

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect( () => {
        searchMovies('movie');
    }, []);

    return (
        <div className='app'>
            <h1>Movies Directory</h1>

            <div className='search'>
                <input
                    placeholder='Search'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt='search'
                    onClick={() => searchMovies(searchTerm)}
                />
                <img
                    src={ResetIcon}
                    alt='reset'
                    onClick={ () => {
                        searchMovies('movie');
                        setSearchTerm(''); 
                    } }
                />
            </div>

            {
                movies?.length > 0
                ? (
                    <div className='container'>
                        {movies.map((movie) => (
                            <MovieCard movie = {movie} />
                        ))}
                    </div>
                ) : (
                    <div className='empty'>
                        <h2>No record found</h2>
                    </div>
                )
            }

            
        </div>
    );
}

export default App;