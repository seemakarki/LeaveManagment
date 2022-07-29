using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeaveManagment.Entity
{
    public class Login 
    {
        public long Id { get; set; }
        public int UserId { get; set; }
        public DateTime LoginTimestamp { get; set; }
        public string Browser { get; set; }
        public string IpAddress { get; set; }

    }
}
