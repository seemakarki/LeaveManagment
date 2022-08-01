using LeaveManagment.Entity;
using LeaveManagment.IRepository;
using LeaveManagment.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeaveManagment.Controllers
{
    [Authorize]
    [ApiController]
    [Route("leave")]
    public class LeaveController : ControllerBase
    {
        private readonly LeaveContext _context;
        private readonly ILeave _leave;
        public LeaveController(LeaveContext context, ILeave leave)
        {
            _context = context;
            _leave = leave;
        }
        [HttpPost]
        public async Task<ActionResult> PostLeave(Leave model)
        {
            if (model == null)
                return Ok(false);
            await _leave.Post(model);
            return Ok(true);
        }

        [HttpGet]
        public async Task<ActionResult<Leave>> GetLeave(int id)
        {

            var data = await _leave.getLeave(id);
            return Ok(data);
        }
        [HttpGet("remaining-days")]
        public async Task<ActionResult<Leave>> ToTalLeave(int employeeId,int month)
        {

            var data = await _leave.ToTalLeave(employeeId,month);
            return Ok(data);
        }

    }
}
