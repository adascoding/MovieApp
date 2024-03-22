using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieApp.API.Data;
using MovieApp.API.Helpers;
using MovieApp.API.Interfaces;
using MovieApp.API.Models;
using MovieApp.API.Models.DTOs;

namespace MovieApp.API.Controllers;

[AllowAnonymous]
[Route("api/[controller]")]
[ApiController]
public class MoviesController : ControllerBase
{
    private readonly IMoviesRepository _moviesRepository;
    private readonly ILogger<MoviesController> _logger;

    public MoviesController(IMoviesRepository moviesRepository, ILogger<MoviesController> logger)
    {
        _moviesRepository = moviesRepository;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<MovieDataResult>> GetMovies([FromQuery] MovieQueryParameters queryParameters)
    {
        try
        {
            var moviesResult = await _moviesRepository.GetMoviesAsync(queryParameters);
            return Ok(moviesResult);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while retrieving movies.");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Movie>> GetMovie(int id)
    {
        try
        {
            var movie = await _moviesRepository.GetMovieAsync(id);

            if (movie == null)
            {
                return NotFound();
            }

            return Ok(movie);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while retrieving a movie.");
            return StatusCode(500, "Internal server error");
        }
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateMovie(int id, Movie movie)
    {
        try
        {
            var success = await _moviesRepository.UpdateMovieAsync(id, movie);

            if (!success)
            {
                return BadRequest("Invalid request");
            }

            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while updating a movie.");
            return StatusCode(500, "Internal server error");
        }
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<IEnumerable<Movie>>> CreateMovies(IEnumerable<Movie> movies)
    {
        try
        {
            var createdMovies = await _moviesRepository.CreateMoviesAsync(movies);
            return Ok(createdMovies);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while creating movies.");
            return StatusCode(500, "Internal server error");
        }
    }


    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteMovie(int id)
    {
        try
        {
            var success = await _moviesRepository.DeleteMovieAsync(id);

            if (!success)
            {
                return NotFound();
            }

            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while deleting a movie.");
            return StatusCode(500, "Internal server error");
        }
    }
}