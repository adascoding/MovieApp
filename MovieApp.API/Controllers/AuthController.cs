using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;  // Add this namespace
using MovieApp.API.Models;
using MovieApp.API.Models.DTOs;
using MovieApp.API.Models.Enums;
using MovieApp.API.Interfaces;
using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace MovieApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;
        private readonly ILogger<AuthController> _logger;

        public AuthController(IAuthRepository authRepository, ILogger<AuthController> logger)
        {
            _authRepository = authRepository;
            _logger = logger;
        }

        [HttpPost("Register")]
        public async Task<ActionResult> Register([FromBody] RegisterDTO model)
        {
            try
            {
                if (await _authRepository.UserExistsAsync(model.Username))
                {
                    _logger.LogInformation($"User '{model.Username}' already exists.");
                    return BadRequest("User already exists.");
                }
                await _authRepository.RegisterAsync(model);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred during user registration.");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPost("Login")]
        public async Task<ActionResult> Login([FromBody] LoginDTO model)
        {
            try
            {
                var token = await _authRepository.LoginAsync(model);

                if (token == null)
                {
                    return Unauthorized();
                }

                return Ok(new { Token = token });
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as needed
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
