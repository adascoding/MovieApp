import { useMovieContext } from "../store/MovieContext";

export default function GenreList() {
    const genres = ['All', 'Action', 'Comedy', 'Drama', 'SciFi', 'Romance'];

    const { movies, updateMovies } = useMovieContext();
    const handleChange = (selectedGenre) => {
        const genreFilter = selectedGenre === 'All' ? '' : selectedGenre;
        updateMovies({ genreFilter, currentPage: 1 });
    };

    return (
        <div className="md:w-[50%] w-full m-2">
            <ul className="flex flex-wrap p-0">
                {genres.map((genre, index) => (
                    <li key={index} className="m-1">
                        <button
                            onClick={() => handleChange(genre)}
                            className={`px-2 py-2 text-sm text-gray-800 rounded-md hover:bg-gray-100 ${movies.genreFilter === genre || (movies.genreFilter === '' && genre === 'All') ? 'bg-gray-200' : ''}`}
                        >
                            {genre}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}