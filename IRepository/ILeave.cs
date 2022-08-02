using LeaveManagment.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeaveManagment.IRepository
{
    public interface ILeave
    {
        Task<bool> Post(Leave model);
        Task<LeaveModel> getLeave(int id);
        Task<List<LeaveModel>> getList();
        Task<int> ToTalLeave(int employeeId, int month);
        Task<List<LeaveModel>> getLeaveList();
    }
}
