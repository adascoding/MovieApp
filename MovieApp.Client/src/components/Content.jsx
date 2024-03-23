import { useState } from 'react';
import { useMovieContext } from '../store/MovieContext.jsx';
import SearchBar from './SearchBar.jsx';
import MovieList from './MovieList.jsx';
import MovieItem from './MovieItem.jsx';
import GenreList from './GenreList.jsx';
import SortSelection from './SortSelection.jsx';
import Pagination from './Pagination.jsx';

export default function Content() {
    const { movies, loading, error } = useMovieContext();
    const [selectedMovie, setSelectedMovie] = useState(null);

    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
    };

    return (
        <div className="w-full">
            
            {selectedMovie ? (
                <div className='max-w-5xl mx-auto mt-4 mb-4'>
                <MovieItem movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
                </div>
            ) : (
                <div className="max-w-5xl mx-auto mt-4 mb-4 flex flex-wrap">
                    <GenreList />
                    <SearchBar />
                    <SortSelection />
                    <MovieList movies={movies} onMovieClick={handleMovieClick} />
                    <Pagination />
                </div>
            )}
        </div>
    );
}