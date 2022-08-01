using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeaveManagment.Entity
{
    public class Salary
    { 
        public int Id { get; set; }
       public int EmployeeId { get; set; }
        public int Duration { get; set; }
        public decimal SalaryAmt { get; set; }
        public bool Status { get; set; }
        public DateTime CreatedOn { get; set; }

    }
}
