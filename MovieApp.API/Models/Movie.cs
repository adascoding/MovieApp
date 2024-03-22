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
    [Required]
    [StringLength(500)]
    public string Description { get; set; }
    [Column(TypeName = "int")]
    [Range(1900, 2100, ErrorMessage = "Please enter a valid 4-digit year.")]
    public int ReleaseYear { get; set; }
    [Required]
    public string Genre { get; set; }
    public string? Director { get; set; }
    public int DurationInMinutes { get; set; }
    public decimal UsersRating { get; set; }
    public decimal ImdbRating { get; set; }
    public string? ImgUrl { get; set; }

}
