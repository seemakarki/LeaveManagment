using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LeaveManagment.Models;
using LeaveManagment.Entity;
using Microsoft.AspNetCore.Identity;
namespace LeaveManagment.Controllers
{
    [ApiController]
    [Route("login")]
    public class LoginController : ControllerBase
    {
        private readonly LeaveContext _context;
       
        public LoginController(LeaveContext context)
        {
            _context = context;
           
        }
        [HttpPost]
        public async Task<ActionResult<string>> Post(LoginModel model)
        {
            if (ModelState.IsValid)
            {
                var user = _context.registrations.FirstOrDefault(x => x.UserName == model.UserName.ToLower());
                if (user == null)
                    return null;
                if (!PasswordHelper.Validate(model.UserName.ToLower(), model.PassWord, user.Password))
                    return "Password error";

                var data = new Login
                {
                    UserName = model.UserName,
                    Password = model.PassWord
                };
                _context.login.Add(data);
                await _context.SaveChangesAsync();
            }
            return Ok(model.UserName);
        }
    }
}
