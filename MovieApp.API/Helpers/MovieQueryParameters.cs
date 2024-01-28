namespace MovieApp.API.Helpers;

public class MovieQueryParameters
{
    public int PageNumber { get; set; } = 1;
    const int maxPageSize = 50;
    private int _pageSize = 10;
    public int PageSize
    {
        get
        {
            return _pageSize;
        }
        set
        {
            _pageSize = (value > maxPageSize) ? maxPageSize : value;
        }
    }
    public string? Genre { get; set; }
    public string? SearchByTitle { get; set; }
    public string SortBy { get; set; } = "+Title";
}