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
                _context.Add(model);
            }
            else
            {
                var data = _context.department.FirstOrDefault(x => x.Id == model.Id);
                _context.Update(model);
            }
            return model.Id;
        }

        [HttpGet]
        public async Task<Department> GetDepartment(int id)
        {

            var data = _context.department.FirstOrDefault(x => x.Id == id);
            return data;
        }
    }
}
