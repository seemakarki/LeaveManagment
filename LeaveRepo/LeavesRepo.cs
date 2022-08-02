using LeaveManagment.Entity;
using LeaveManagment.IRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeaveManagment.LeaveRepo
{
    public class LeavesRepo:ILeave
    {
        private readonly LeaveContext _context;

        public LeavesRepo(LeaveContext context)
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
                    CreatedOn = DateTime.Now,
                    EmployeeId=model.EmployeeId
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
        public async Task<List<LeaveModel>> getLeaveList()
        {
            var data = await _context.leave.ToListAsync();
            var items = new List<LeaveModel>();
            foreach(var id in data)
            {
                var employee = await _context.employee.FirstOrDefaultAsync(x => x.Id == id.EmployeeId);

                items.Add(new LeaveModel
                {
                    EmployeeId = id.EmployeeId,
                    EmployeeName = employee.FirstName + " ," + employee.LastName,
                    FromDate = id.FromDate,
                    ToDate = id.ToDate,
                    Type = id.Type,
                    Status = id.Status,
                    Reference = id.Reference
                });

            }
         
            return items;
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
        public async Task<int> ToTalLeave(int employeeId,int month)
        {
           var data= await _context.leave
                .Where(x => x.EmployeeId == employeeId&&x.FromDate.Month==month &&x.ToDate.Month==month).ToListAsync();
            var days = 0;
            foreach(var item in data)
            {
                var date=((item.FromDate-item.ToDate)*-1).Days;

                days += date;

            }
            return days;
                               
        }
    }
}
