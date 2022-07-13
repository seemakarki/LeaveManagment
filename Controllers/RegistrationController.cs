using LeaveManagment.Entity;
using LeaveManagment.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeaveManagment.Controllers
{
    [ApiController]
    [Route("register")]
    public class RegistrationController : ControllerBase
    {
        private readonly LeaveContext _context;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        public RegistrationController(LeaveContext context,UserManager<IdentityUser> userManager,
                              SignInManager<IdentityUser> signInManager)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost]
        public async Task<ActionResult> Post(RegistrationModel model)
        {
            if (model == null)
                return Ok(false);
            _context.Add(new Registration
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                UserName = model.UserName,
                Password = model.Password,
                CreatedOn = DateTime.Now
            });
            await _context.SaveChangesAsync();
            return Ok(true);

        }
    }
}
