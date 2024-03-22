const API_BASE_URL = '';

const ApiService = {
    async fetchMovies(pageNumber = 1, genre, searchByTitle, sortBy = 'Title') {
        try {
            const response = await fetch(`/api/Movies?PageNumber=${pageNumber}&Genre=${genre}&SearchByTitle=${searchByTitle}&SortBy=${sortBy}`);
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching movies: ', error);
            throw error;
        }
    }
};

export default ApiService;