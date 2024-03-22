import React from 'react';

export default function MovieItem({ movie, onClose }) {
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
                <button onClick={onClose} className="absolute top-0 right-0 mt-2 mr-2 p-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
