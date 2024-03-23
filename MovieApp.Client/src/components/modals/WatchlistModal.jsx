import { useEffect } from 'react';

export default function WatchlistModal({ onClose }) {
    const [watchlist, setWatchlist] = React.useState({});

    useEffect(() => {
        const storedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || {};
        console.log('Watchlist data:', storedWatchlist);
        setWatchlist(storedWatchlist);
    }, []);

    const removeFromWatchlist = (listName, movieId) => {
        const updatedWatchlist = { ...watchlist };
        const movieIndex = updatedWatchlist[listName].findIndex(movie => movie.id === movieId);
        updatedWatchlist[listName].splice(movieIndex, 1);
        localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
        setWatchlist(updatedWatchlist);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-white rounded-lg overflow-hidden z-50 w-80 relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-4">My Watchlists</h2>
                    {Object.entries(watchlist).map(([listName, movies]) => (
                        <div key={listName}>
                            <h3 className="text-lg font-semibold mb-2">{listName}</h3>
                            <ul className="list-disc pl-6">
                                {movies.map(movie => (
                                    <li key={movie.id} className="flex justify-between items-center border-b border-gray-200 py-2">
                                        <div>
                                            <span className="font-semibold">{movie.title}</span>
                                            {movie.notes && <p className="text-gray-500 text-sm">{movie.notes}</p>}
                                        </div>
                                        <div className="flex items-center">
                                            <button onClick={() => removeFromWatchlist(listName, movie.id)} className="ml-2 text-gray-500 hover:text-gray-800 focus:outline-none">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}