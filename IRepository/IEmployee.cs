using LeaveManagment.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeaveManagment.IRepository
{
    public interface IEmployee
    {
        Task<bool> Post(Employee model);
        Task<EmployeeModel> getEmployee(int id);
            Task<List<EmployeeModel>> getList();
    }
}
