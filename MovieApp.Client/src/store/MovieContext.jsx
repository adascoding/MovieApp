import { createContext, useState, useEffect, useContext } from 'react';
import ApiService from '../services/ApiService';

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState({
    items: [],
    currentPage: 1,
    totalItems: 0,
    titleSearch: '',
    genreFilter: '',
    sortBy: 'Title'
  });
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const data = await ApiService.fetchMovies(movies.currentPage, movies.genreFilter, movies.titleSearch, movies.sortBy);
        setMovies((prev) => (
          {
            ...prev,
            items: data.movies,
            totalItems: data.totalItemCount
          }
        ));
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [movies.currentPage, movies.genreFilter, movies.titleSearch, movies.sortBy]); 

  const updateMovies = (newState) => {
    setMovies((prev) => ({ ...prev, ...newState }));
  };
  const updateUser = (newUser) => {
    setUser(newUser);
  }

  return (
    <MovieContext.Provider value={{ movies, loading, error, updateMovies, user, setUser:updateUser}}>
      {children}
    </MovieContext.Provider>
  );
};