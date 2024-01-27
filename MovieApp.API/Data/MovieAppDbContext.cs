using Microsoft.EntityFrameworkCore;
using MovieApp.API.Models;

namespace MovieApp.API.Data;

public class MovieAppDbContext : DbContext
{
	public MovieAppDbContext(DbContextOptions<MovieAppDbContext> options) : base(options)
	{

	}
	public DbSet<Movie> Movies { get; set; }
	public DbSet<User> Users { get; set; }
}
