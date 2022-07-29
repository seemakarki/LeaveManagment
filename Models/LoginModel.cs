using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeaveManagment.Models
{
    public class LoginModel
    {
        public int UserId { get; set; }
        public DateTime LoginTimestamp { get; set; }
        public string Browser { get; set; }
        public string IpAddress { get; set; }
    }
    public class LoginViewModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
