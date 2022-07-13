using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeaveManagment.Entity
{
    public class Leave
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public bool Status { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string Reference { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
