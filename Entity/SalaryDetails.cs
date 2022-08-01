using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeaveManagment.Entity
{
    public class SalaryDetails
    {
        public int Id { get; set; }
        public int SalaryId { get; set; }
        public string BankAccount { get; set; }
        public int Duration { get; set; }
        public string References { get; set; }
        public decimal TotalBalance { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
