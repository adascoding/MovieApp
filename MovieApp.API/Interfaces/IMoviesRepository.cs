using MovieApp.API.Helpers;
using MovieApp.API.Models;
using MovieApp.API.Models.DTOs;

namespace MovieApp.API.Interfaces;

public interface IMoviesRepository
{
    Task<MovieDataResult> GetMoviesAsync(MovieQueryParameters queryParameters);
    Task<Movie> GetMovieAsync(int id);
    Task<bool> UpdateMovieAsync(int id, Movie movie);
    Task<IEnumerable<Movie>> CreateMoviesAsync(IEnumerable<Movie> movies);
    Task<bool> DeleteMovieAsync(int id);
}
