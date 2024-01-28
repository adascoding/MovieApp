namespace MovieApp.API.Models.DTOs;

public class MovieDataResult
{
    public IEnumerable<Movie> Movies { get; set; }
    public int TotalItemCount { get; set; }
}