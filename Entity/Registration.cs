using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeaveManagment.Entity
{
    public class Registration
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string UserName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public int DepartmentId { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
