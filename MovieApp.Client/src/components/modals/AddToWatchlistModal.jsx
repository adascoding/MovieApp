import { useState } from 'react';

export default function AddToWatchlistModal({ movie, onClose }) {
    const [selectedList, setSelectedList] = useState('Watch Later');
    const [notes, setNotes] = useState('');

    const handleAddToWatchlist = () => {
        const watchlistData = JSON.parse(localStorage.getItem('watchlist')) || {};

        const updatedWatchlist = {
            ...watchlistData,
            [selectedList]: [
                ...(watchlistData[selectedList] || []),
                { id: movie.id, title: movie.title, notes }
            ]
        };

        localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));

        onClose();
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
                    <h2 className="text-xl font-semibold mb-4">Add to Watchlist</h2>
                    <div>
                        <label htmlFor="watchlist" className="block text-gray-600">Select Watchlist</label>
                        <select id="watchlist" value={selectedList} onChange={(e) => setSelectedList(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500">
                            <option value="Watch Later">Watch Later</option>
                            <option value="Favorites">Favorites</option>
                        </select>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="notes" className="block text-gray-600">Notes (optional)</label>
                        <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"></textarea>
                    </div>
                    <button onClick={handleAddToWatchlist} className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300">Add to Watchlist</button>
                </div>
            </div>
        </div>
    );
}