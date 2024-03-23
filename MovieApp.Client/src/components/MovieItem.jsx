import { useState } from 'react';
import AddToWatchlistModal from './modals/AddToWatchlistModal.jsx';
import WatchlistModal from './modals/WatchlistModal.jsx';

export default function MovieItem({ movie }) {
    const [showAddToWatchlistModal, setShowAddToWatchlistModal] = useState(false);
    const [showWatchlistModal, setShowWatchlistModal] = useState(false);

    const handleAddToWatchlistClick = () => {
        setShowAddToWatchlistModal(true);
    };

    const handleCloseAddToWatchlistModal = () => {
        setShowAddToWatchlistModal(false);
    };

    const handleOpenWatchlistModal = () => {
        setShowWatchlistModal(true);
    };

    const handleCloseWatchlistModal = () => {
        setShowWatchlistModal(false);
    };

    return (
        <div className="flex flex-col md:flex-row mb-4 bg-white rounded-md overflow-hidden m-4 shadow-md relative">
            <img src={movie.imgUrl} alt={movie.title} className="w-full md:w-1/3" style={{ maxWidth: '350px', height: 'auto' }} />
            <div className="p-4 w-full md:w-2/3 relative">
                <div>
                    <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
                    <p className="text-gray-700 mb-2">{movie.description}</p>
                    <p className="text-gray-700 mb-2"><strong>Release Year:</strong> {movie.releaseYear}</p>
                    <p className="text-gray-700 mb-2"><strong>Genre:</strong> {movie.genre}</p>
                    <p className="text-gray-700 mb-2"><strong>Director:</strong> {movie.director}</p>
                    <p className="text-gray-700 mb-2"><strong>Duration:</strong> {movie.durationInMinutes} minutes</p>
                    <p className="text-gray-700 mb-2"><strong>User's Rating:</strong> {movie.usersRating}</p>
                    <p className="text-gray-700 mb-2"><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
                </div>
                <button onClick={handleAddToWatchlistClick} className="absolute bottom-4 right-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
                    Add to Watchlist
                </button>
                <button onClick={handleOpenWatchlistModal} className="absolute bottom-4 left-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
                    View My Watchlists
                </button>
            </div>
            {showAddToWatchlistModal && <AddToWatchlistModal movie={movie} onClose={handleCloseAddToWatchlistModal} />}
            {showWatchlistModal && <WatchlistModal onClose={handleCloseWatchlistModal} />}
        </div>
    );
}
