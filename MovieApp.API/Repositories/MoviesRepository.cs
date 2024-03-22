using MovieApp.API.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using MovieApp.API.Helpers;
using MovieApp.API.Models;
using MovieApp.API.Data;
using MovieApp.API.Models.DTOs;

namespace MovieApp.API.Repositories;


public class MoviesRepository : IMoviesRepository
{
    private readonly MovieAppDbContext _context;

    public MoviesRepository(MovieAppDbContext context)
    {
        _context = context;
    }

    public async Task<MovieDataResult> GetMoviesAsync(MovieQueryParameters queryParameters)
    {
        IQueryable<Movie> moviesQuery = _context.Movies.AsQueryable();

        if (!string.IsNullOrEmpty(queryParameters.Genre))
        {
            var lowerCaseGenre = queryParameters.Genre.ToLower();
            moviesQuery = moviesQuery.Where(m => m.Genre.ToString().ToLower().Equals(lowerCaseGenre));
        }

        if (!string.IsNullOrEmpty(queryParameters.SearchByTitle))
        {
            var lowerCaseSearchTerm = queryParameters.SearchByTitle.ToLower();
            moviesQuery = moviesQuery.Where(m => m.Title.ToLower().Contains(lowerCaseSearchTerm));
        }

        if (!string.IsNullOrEmpty(queryParameters.SortBy))
        {
            var order = queryParameters.SortBy.StartsWith('-') ? "descending" : "ascending";
            var propertyName = queryParameters.SortBy.TrimStart('+', '-');

            moviesQuery = moviesQuery.OrderByCustom(propertyName, order);
        }

        int totalItemCount = await moviesQuery.CountAsync();

        moviesQuery = moviesQuery
            .Skip((queryParameters.PageNumber - 1) * queryParameters.PageSize)
            .Take(queryParameters.PageSize);

        return new MovieDataResult
        {
            Movies = await moviesQuery.ToListAsync(),
            TotalItemCount = totalItemCount
        };
    }

    public async Task<Movie> GetMovieAsync(int id)
    {
        return await _context.Movies.FindAsync(id);
    }

    public async Task<bool> UpdateMovieAsync(int id, Movie movie)
    {
        if (id != movie.Id)
        {
            return false;
        }

        _context.Entry(movie).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            return !_context.Movies.Any(e => e.Id == id);
        }

        return true;
    }

    public async Task<IEnumerable<Movie>> CreateMoviesAsync(IEnumerable<Movie> movies)
    {
        await _context.Movies.AddRangeAsync(movies);
        await _context.SaveChangesAsync();

        return movies;
    }




    public async Task<bool> DeleteMovieAsync(int id)
    {
        var movie = await _context.Movies.FindAsync(id);
        if (movie == null)
        {
            return false;
        }

        _context.Movies.Remove(movie);
        await _context.SaveChangesAsync();

        return true;
    }
}
