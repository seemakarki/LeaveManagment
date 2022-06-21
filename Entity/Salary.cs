using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeaveManagment.Models
{
    public class Salary
    { 
        public int Id { get; set; }
       public int EmployeeId { get; set; }
         public string BankAccount { get; set; }
        public int LeaveId { get; set; }
        public int Duration { get; set; }
        public DateTime CreatedOn { get; set; }

    }
}
