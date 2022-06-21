using LeaveManagment.IRepository;
using LeaveManagment.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeaveManagment.LeaveRepo
{

    public class EmployeeRepo:IEmployee
    {

        private IEmployee _employee;

        public EmployeeRepo(IEmployee employee)
        {
            _employee = employee;
        }


    }
}
