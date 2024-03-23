export default function MovieList({ movies, onMovieClick }) {
    if (!movies || movies.length === 0) {
        return <div>No movies available.</div>;
    }

    return (
        <div className="max-w-5xl mx-auto flex flex-wrap justify-around gap-5 relative z-0">
            {movies.items.map((movie) => (
                <a key={movie.id} onClick={() => onMovieClick(movie)} className="rounded-md overflow-hidden shadow-md cursor-pointer transition-transform duration-300 transform hover:scale-105">
                    <div className="w-[230px] h-[230px] relative z-0">
                        <img src={movie.imgUrl} className="w-full h-full object-cover" alt={movie.title} />
                    </div>
                    <div className="mt-2 text-center">
                        <p className="text-lg font-semibold">{movie.title}</p>
                        <p className="text-gray-500">{movie.releaseYear}</p>
                    </div>
                </a>
            ))}
        </div>
    );
}