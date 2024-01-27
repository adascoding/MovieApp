using System.ComponentModel.DataAnnotations;

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
    public string Genre { get; set; }
    public string Director { get; set; }
    public int DurationInMinutes { get; set; }
}
