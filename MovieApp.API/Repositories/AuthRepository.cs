using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MovieApp.API.Data;
using MovieApp.API.Interfaces;
using MovieApp.API.Models;
using MovieApp.API.Models.DTOs;
using MovieApp.API.Models.Enums;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MovieApp.API.Repositories;

public class AuthRepository : IAuthRepository
{
    public readonly MovieAppDbContext _context;
    private readonly IConfiguration _configuration;
    public AuthRepository(MovieAppDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    public async Task<bool> RegisterAsync(RegisterDTO model)
    {
        if (await UserExistsAsync(model.Username))
        {
            return false;
        }

        var hashedPassword = BCrypt.Net.BCrypt.HashPassword(model.Password);

        var user = new User
        {
            Username = model.Username,
            Email = model.Email,
            PasswordHash = hashedPassword,
            Role = UserRole.User.ToString()
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return true;
    }
    public async Task<string> LoginAsync(LoginDTO model)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == model.Username);

        if (user == null || !BCrypt.Net.BCrypt.Verify(model.Password, user.PasswordHash))
        {
            throw new UnauthorizedAccessException("Invalid credentials");
        }

        var token = GenerateJwtToken(user);
        return token;
    }
    public async Task<bool> UserExistsAsync(string username)
    {
        return await _context.Users.AnyAsync(u => u.Username == username);
    }
    private string GenerateJwtToken(User user)
    {
        var secretKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration.GetValue<string>("Authentication:SecretKey")));
        var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

        List<Claim> claims = new();
        claims.Add(new(ClaimTypes.Name, user.Username));
        claims.Add(new(ClaimTypes.Role, user.Role));

        var token = new JwtSecurityToken(
            issuer: _configuration.GetValue<string>("Authentication:Issuer"),
            audience: _configuration.GetValue<string>("Authentication:Audience"),
            claims: claims,
            notBefore: DateTime.UtcNow,
            expires: DateTime.UtcNow.AddMinutes(15),
            signingCredentials: signingCredentials
            );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
