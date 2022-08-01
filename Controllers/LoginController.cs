using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LeaveManagment.Models;
using LeaveManagment.Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;
using LeaveManagment.IRepository;
using Microsoft.Extensions.Logging;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using System.Globalization;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using LeaveManagment.Extension;
using Microsoft.AspNetCore.Authorization;

namespace LeaveManagment.Controllers
{
    [ApiController]
    [Route("login")]
    public class LoginController : ControllerBase
    {
        private readonly LeaveContext _context;
        private readonly IHttpContextAccessor _httpAccessor;
        private readonly IRegistration _registration;
        readonly ILogger<LoginController> _logger;
        private string signingKey => "GTo45T4le349dg34W24sdv";

        public LoginController(LeaveContext context, IHttpContextAccessor httpAccessor, IRegistration registration, 
            ILogger<LoginController> logger, IConfiguration config)
        {
            _context = context;
            _httpAccessor = httpAccessor;
            _registration = registration;
            _logger = logger;

        }
        [HttpPost]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            if (model is null) return BadRequest();
            var userAgent = _httpAccessor.HttpContext.Request.Headers["User-Agent"].FirstOrDefault();
            var remoteAdd = _httpAccessor.HttpContext.Connection.RemoteIpAddress.ToString();

            var user = await _registration.getUser(model.UserName).ConfigureAwait(true);

            if (user is null)
            {
                _logger.LogWarning($"Invalid Login attempt: User not found");
                return BadRequest();
            }

            if (!PasswordHelper.Validate(model.UserName, model.Password, user.Password))
            {
                _logger.LogWarning($"Invalid Login attempt: Password invalid");
                return BadRequest();
            }          

            var login = new Login
            {
                Browser = userAgent,
                IpAddress = remoteAdd,
                LoginTimestamp = DateTime.Now,
                UserId = user.Id,
            };

             await _context.login.AddAsync(login);
             await _context.SaveChangesAsync();
            // var id=await _context.login.FirstOrDefault(x=>x.)

            var loginId = login.Id;
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(signingKey);

            var claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Jti, user.UserName.ToString(CultureInfo.CurrentCulture)),
                new("uid", user.Id.ToString()),
                new("lgn", login.Id.ToString()),
                new("rid",user.DepartmentId.ToString())
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(10),
                SigningCredentials =
                    new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };
           

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var clientToken = tokenHandler.WriteToken(token);

            var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(identity), new AuthenticationProperties
                {
                    ExpiresUtc = DateTime.Now.AddHours(10),
                    IsPersistent = true
                }).ConfigureAwait(true);

            Console.WriteLine(clientToken);
            return Ok(clientToken);
        }
    }
}
