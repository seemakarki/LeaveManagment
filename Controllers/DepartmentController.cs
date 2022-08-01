using LeaveManagment.Entity;
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
    [Authorize]
    [ApiController]
    [Route("department")]
    public class DepartmentController : ControllerBase
    {
        private readonly LeaveContext _context;
        public DepartmentController(LeaveContext context)
        {
            _context = context;
        }
        [HttpPost]
        public async Task<ActionResult<int>> PostDepartment(Department model)
        {
            if (model.Id == 0)
            {
                await _context.AddAsync(model);
            }
            else
            {
                var data = await _context.department.FirstOrDefaultAsync(x => x.Id == model.Id);
                _context.Update(model);
            }
            await _context.SaveChangesAsync();
            return model.Id;
        }

        [HttpGet]
        public async Task<Department> GetDepartment(int id)
        {
            var data = await _context.department.FirstOrDefaultAsync(x => x.Id == id);
            return data;
        }
        [HttpGet("List")]
        public async Task<List<Department>> GetDepartment()
        {
            var data =await _context.department.ToListAsync();
            return data;
        }
    }
}
