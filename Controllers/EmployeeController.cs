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
    [Route("employee")]
    public class EmployeeController : ControllerBase
    {
        private readonly LeaveContext _context;
        private readonly IEmployee _repo;

        public EmployeeController(LeaveContext context, IEmployee repo)
        {
            _context = context;
            _repo = repo;
        }
        [HttpPost]
        public async Task<ActionResult> PostEmployee(Employee model)
        {
            if (model == null)
                return Ok(false);
        await _repo.Post(model);
            return Ok(true);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var data = await _repo.getEmployee(id);
            return Ok(data);
        }
            [HttpGet("List")]
        public async Task<ActionResult<List<Employee>>> GetEmployeeList()
        {
            var data = await _repo.getList();
            return Ok(data);
        }
    }
}
