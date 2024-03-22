import { useMovieContext } from "../store/MovieContext";

export default function SearchBar() {
    const { movies, updateMovies } = useMovieContext();
    const handleChange = (event) => {
        updateMovies({ titleSearch: event.target.value, currentPage: 1 });
    };

    return (
        <div className="flex-grow m-2 md:w-auto md:flex-none">
            <input
                onChange={handleChange}
                type="text"
                placeholder="Search by title..."
                className="min-w-[220px] p-1 border border-gray-300 rounded-sm focus:outline-none w-full"
            />
        </div>
    )
};