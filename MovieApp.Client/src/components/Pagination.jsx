import { useMovieContext } from '../store/MovieContext.jsx';

export default function Pagination() {
    const { movies, updateMovies } = useMovieContext();
    const currentPage = movies.currentPage;
    const totalPages = Math.ceil(movies.totalItems / 12);
    const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);

    const changePage = (pageNumber) => {
        if (currentPage !== pageNumber) {
            updateMovies({ currentPage: pageNumber });
        }
    };

    const previousPage = () => {
        if (currentPage > 1) {
            changePage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            changePage(currentPage + 1);
        }
    };

    return (
        <div className="w-full mx-auto m-4">
            <div className="max-w-5xl mx-auto flex flex-wrap justify-around mt-2">
                <nav aria-label="Page navigation example">
                    <ul className="inline-flex -space-x-px text-sm">
                        <li>
                            <button
                                onClick={previousPage}
                                disabled={currentPage === 1}
                                className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 ${currentPage === 1 ? 'opacity-20' : ''}`}
                            >
                                Previous
                            </button>
                        </li>
                        {pagesArray.map((data) => (
                            <li key={data}>
                                <button
                                    style={currentPage === data ? { backgroundColor: '#EDF2F7' } : {}}
                                    onClick={() => changePage(data)}
                                    className={`flex items-center justify-center px-3 h-8 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${currentPage === data ? 'bg-gray-200' : ''}`}
                                >
                                    {data}
                                </button>
                            </li>
                        ))}
                        <li>
                            <button
                                onClick={nextPage}
                                disabled={currentPage === totalPages}
                                className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 ${currentPage === totalPages ? 'opacity-20' : ''}`}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}