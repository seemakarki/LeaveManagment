using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LeaveManagment.Models;

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
        public  async Task<IActionResult> Post(LoginModel model)
        {
            var name =  _context.registrations.FirstOrDefault(x => x.UserName == model.UserName);
            if(name!=null)
            {
                if (name.Password == model.PassWord)
                {
                    var data = _context.Add(new Login
                    {
                        UserName = name.UserName,
                        Password = model.PassWord
                    });
                    _context.Add(data);
                }
                else
                {
                    return Ok("PassWord incorrect");
                }
               
               await _context.SaveChangesAsync();
            }
            else
            {
                return Ok(false);
            }
            return Ok(true);
        }

    }
}
