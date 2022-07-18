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
       
        public RegistrationController(LeaveContext context)
        {
            _context = context;
        
        }

        [HttpPost]
        public async Task<IActionResult> Post(RegistrationModel model)
        {
            if (model == null)
                return Ok(false);
            if (ModelState.IsValid)
            {
                    _context.registrations.Add(new Registration
                    {
                        FirstName = model.FirstName,
                        LastName = model.LastName,
                        UserName = model.UserName,
                        Password = PasswordHelper.CreateHash(model.Password, model.UserName),
                        CreatedOn = DateTime.Now,
                        DepartmentId=model.DepartmentId
                    });
                    await _context.SaveChangesAsync();
                
                return Ok(true);
            }
            return Ok(false);

        }
    }

}

