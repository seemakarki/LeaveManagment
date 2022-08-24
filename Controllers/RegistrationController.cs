using LeaveManagment.Entity;
using LeaveManagment.IRepository;
using LeaveManagment.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeaveManagment.Controllers
{
    [ApiController]
    [Authorize]
    [Route("register")]
    public class RegistrationController : ControllerBase
    {
        private readonly LeaveContext _context;
        private readonly IRegistration _registration;
        private readonly IUserMeta _meta;

        public RegistrationController(LeaveContext context, IRegistration registration, IUserMeta meta)
        {
            _context = context;
            _registration = registration;
            _meta = meta;
        
        }
        [HttpGet("get/{userName}")]
        public async Task<Registration> GetRegisters(string userName)
        {
            var data =await  _registration.getUser(userName);
            return data;
        }

        [HttpPost]
        public async Task<IActionResult> Post(RegistrationModel model)
        {
            if (model == null)
                return Ok(false);
            if (ModelState.IsValid)
            {
                await _registration.Post(model);
                return Ok(true);
            }
            return Ok(false);

        }
        [HttpGet("get-meta")]
        public async Task<ActionResult> GetUserMeta()
        {
            var dep = await _registration.GetDepHead();
            var item = new 
            {
                LoginId = _meta.LoginId,
                UserId = _meta.UserId,
                UserName = _meta.UserName,
                IsDepHead=dep.IsDepHead,
                RoleId=_meta.RoleId
            };
            return Ok(item);
        }
    }

}

