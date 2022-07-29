using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeaveManagment.IRepository
{
   
        public interface IUserMeta
        {
            long LoginId { get; set; }
            string UserName { get; set; }
            int UserId { get; set; }
            int RoleId { get; set; }
        }
    }

