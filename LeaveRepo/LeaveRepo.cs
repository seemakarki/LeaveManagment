using LeaveManagment.Entity;
using LeaveManagment.IRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeaveManagment.LeaveRepo
{
    public class LeaveRepo:ILeave
    {
        private readonly LeaveContext _context;

        public LeaveRepo(LeaveContext context)
        {
            _context = context;

        }
        public async Task<bool> Post(Leave model)
        {
            if (model == null)
                return false;
            if(model.Id==0)
            {
                await _context.leave.AddAsync(new Leave
                {
                    Type = model.Type,
                    Status = true,
                    FromDate = model.FromDate,
                    ToDate = model.ToDate,
                    Reference = model.Reference,
                    CreatedOn = DateTime.Now
                });
            }
            else
            {
                 _context.leave.Update(model);
            }
            
            await _context.SaveChangesAsync();

            return true;
        }
        public async Task<LeaveModel> getLeave(int id)
        {
            var data = await _context.leave.FirstOrDefaultAsync(x => x.Id == id);
            var employee = await _context.employee.FirstOrDefaultAsync(x => x.Id == data.EmployeeId);
            var item = new LeaveModel
            {
                EmployeeId = data.EmployeeId,
                EmployeeName = employee.FirstName + " ," + employee.LastName,
                FromDate = data.FromDate,
                ToDate = data.ToDate,
                Type = data.Type,
                Status = data.Status,
                Reference = data.Reference
            };
            return item;
        }
        public async Task<List<LeaveModel>> getList()
        {
            var leaves = new List<LeaveModel>();
            var data = await _context.leave.ToListAsync();
           foreach (var item in data)
            {
                var employee = await _context.employee.FirstOrDefaultAsync(x => x.Id == item.EmployeeId);

                leaves.Add(new LeaveModel
                {
                    EmployeeId = item.EmployeeId,
                    EmployeeName = employee.FirstName + " ," + employee.LastName,
                    FromDate = item.FromDate,
                    ToDate = item.ToDate,
                    Type = item.Type,
                    Status = item.Status,
                    Reference = item.Reference

                });
            }
            return leaves;
        }
    }
}
