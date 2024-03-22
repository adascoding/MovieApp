import React, { useState } from "react";
import { useMovieContext } from "../store/MovieContext";

export default function SortSelection() {
    const [isOpen, setIsOpen] = useState(false);

    const sortOptions = [
        { label: 'Title', value: 'Title' },
        { label: 'Year', value: 'ReleaseYear' },
        { label: 'Genre', value: 'Genre' },
        { label: 'Duration', value: 'DurationInMinutes' },
        { label: 'Imdb Rating', value: 'ImdbRating' },
        { label: 'Users Rating', value: 'UsersRating' }
    ];

    const { movies, updateMovies } = useMovieContext();

    const handleChange = (selectedSort) => {
        const selectedValue = sortOptions.find(option => option.label === selectedSort)?.value;
        if (selectedValue) {
            updateMovies({ sortBy: selectedValue, currentPage: 1 });
            setIsOpen(false); // Close the dropdown after selecting an option
        }
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="m-2 md:w-auto md:flex-none relative">
            <div>
                <button onClick={toggleDropdown} type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm text-gray-700 hover:bg-gray-50">
                    Sort by
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>

                {isOpen && (
                    <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 origin-top-right focus:outline-none z-10">
                        <ul>
                            {sortOptions.map((option, index) => (
                                <li key={index} role="none">
                                    <button 
                                        className={`text-gray-700 block w-full px-4 py-2 text-sm leading-5 hover:bg-gray-100 ${movies.sortBy === option.value ? 'bg-gray-100' : ''}`}
                                        onClick={() => handleChange(option.label)}
                                        role="menuitem"
                                    >
                                        {option.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
