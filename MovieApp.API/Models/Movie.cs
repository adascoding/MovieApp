using MovieApp.API.Models.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MovieApp.API.Models;

public class Movie
{
    [Key]
    public int Id { get; set; }
    [Required]
    [StringLength(200)]
    public string Title { get; set; }
    [StringLength(500)]
    public string Description { get; set; }
    [Required]
    public DateTime ReleaseDate { get; set; }
    [Required]
    public MovieGenre Genre { get; set; }
    public string? Director { get; set; }
    public int DurationInMinutes { get; set; }
    [Column(TypeName = "decimal(2, 1)")]
    public double Rating { get; set; }
}
