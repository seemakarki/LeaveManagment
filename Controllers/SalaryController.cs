using LeaveManagment.Entity;
using LeaveManagment.IRepository;
using LeaveManagment.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeaveManagment.Controllers
{
    
    [ApiController]
    [Authorize]
    [Route("salary")]
    public class SalaryController : ControllerBase
    {
        private readonly LeaveContext _context;
        private readonly ILeave _leaveRepo;

        public SalaryController(LeaveContext context, ILeave leaveRepo)
        {
            _context = context;
            _leaveRepo = leaveRepo;
        }
        [HttpPost]
        public async Task<ActionResult<int>> PostSalary(Salary model)
        {
            if (model.Id == 0)
            {
                model.CreatedOn = DateTime.Now;
                _context.Add(model);
            }
            else
            {
                var data =await _context.salary.FirstOrDefaultAsync(x => x.Id == model.Id);
                model.CreatedOn = data.CreatedOn;
                _context.Update(model);
            }
            return model.Id;
        }
        [HttpPost("details")]
        public async Task<ActionResult<int>> PostSalaryDetails(SalaryDetails model)
        {
            if (model.Id == 0)
            {
                model.CreatedOn = DateTime.Now;
                _context.Add(model);
            }
            else
            {
                var data = await _context.salaryDetails.FirstOrDefaultAsync(x => x.Id == model.Id);
                model.CreatedOn = data.CreatedOn;
                _context.Update(model);
            }
            return model.Id;
        }
        [HttpGet("{id}")]
        public async Task<Salary> GetSalary(int id)
        {

            var data = await _context.salary.FirstOrDefaultAsync(x => x.Id == id);
            return data;
        }
    }
}
