using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeaveManagment.Models
{
    public class UserMetaModel
    {
       
            public long LoginId { get; set; }
            public int UserId { get; set; }
            public string UserName { get; set; }
            public bool IsHo { get; set; }
        }
    
}
