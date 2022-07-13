using LeaveManagment.Entity;
using LeaveManagment.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeaveManagment.Controllers
{
    [ApiController]
    [Route("leave")]
    public class LeaveController : ControllerBase
    {
        private readonly LeaveContext _context;
        public LeaveController(LeaveContext context)
        {
            _context = context;
        }
        [HttpPost]
        public async Task<ActionResult<int>> PostLeave(Leave model)
        {
            if (model.Id == 0)
            {
                model.CreatedOn = DateTime.Now;
                _context.Add(model);
            }
            else
            {
                var data = _context.leave.FirstOrDefault(x => x.Id == model.Id);
                model.CreatedOn = data.CreatedOn;
                _context.Update(model);
            }
            return model.Id;
        }

        [HttpGet]
        public async Task<Leave> GetLeave(int id)
        {

            var data = _context.leave.FirstOrDefault(x => x.Id == id);
            return data;
        }
    }
}
