using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieApp.API.Data;
using MovieApp.API.Helpers;
using MovieApp.API.Models;
using MovieApp.API.Models.DTOs;

namespace MovieApp.API.Controllers;

//[Authorize]
[Route("api/[controller]")]
[ApiController]
public class MoviesController : ControllerBase
{
    private readonly MovieAppDbContext _context;
    public MoviesController(MovieAppDbContext context)
    {
        _context = context;
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Movie>>> GetMovies([FromQuery] MovieQueryParameters queryParameters)
    {
        IQueryable<Movie> moviesQuery = _context.Movies.AsQueryable();

        if (!string.IsNullOrEmpty(queryParameters.Genre))
        {
            var lowerCaseGenre = queryParameters.Genre.ToLower();
            moviesQuery = moviesQuery.Where(m => m.Genre.ToLower().Equals(lowerCaseGenre));
        }

        if (!string.IsNullOrEmpty(queryParameters.SearchByTitle))
        {
            var lowerCaseSearchTerm = queryParameters.SearchByTitle.ToLower();
            moviesQuery = moviesQuery.Where(m => m.Title.ToLower().Contains(lowerCaseSearchTerm));
        }

        if (!string.IsNullOrEmpty(queryParameters.SortBy))
        {
            var order = queryParameters.SortBy.StartsWith("-") ? "descending" : "ascending";
            var propertyName = queryParameters.SortBy.TrimStart('+', '-');

            moviesQuery = moviesQuery.OrderByCustom(propertyName, order);
        }

        int totalItemCount = await moviesQuery.CountAsync();

        moviesQuery = moviesQuery
            .Skip((queryParameters.PageNumber - 1) * queryParameters.PageSize)
            .Take(queryParameters.PageSize);

        return Ok(new MovieDataResult
        {
            Movies = moviesQuery,
            TotalItemCount = totalItemCount
        });
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Movie>> GetMovie(int id)
    {
        var movie = await _context.Movies.FindAsync(id);

        if (movie == null)
        {
            return NotFound();
        }

        return movie;
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateMovie(int id, Movie movie)
    {
        if (id != movie.Id)
        {
            return BadRequest();
        }

        _context.Entry(movie).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!MovieExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<Movie>> CreateMovie(Movie movie)
    {
        _context.Movies.Add(movie);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetMovie), new { id = movie.Id }, movie);
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMovie(int id)
    {
        var movie = await _context.Movies.FindAsync(id);
        if (movie == null)
        {
            return NotFound();
        }

        _context.Movies.Remove(movie);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool MovieExists(int id)
    {
        return _context.Movies.Any(e => e.Id == id);
    }

}