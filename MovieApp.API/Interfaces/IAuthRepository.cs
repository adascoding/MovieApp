using MovieApp.API.Models.DTOs;

namespace MovieApp.API.Interfaces;

public interface IAuthRepository
{
    Task<bool> RegisterAsync(RegisterDTO model);
    Task<UserDTO> LoginAsync(LoginDTO model);
    Task<bool> UserExistsAsync(string username);
}
