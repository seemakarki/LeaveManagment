using LeaveManagment.Extension;
using LeaveManagment.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace LeaveManagment.LeaveRepo
{
        public class UserMeta : IUserMeta
    {
        public UserMeta(IHttpContextAccessor accessor)
        {
            var user = accessor?.HttpContext?.User;
            if (user == null) return;

            UserName = (user.FindFirst(JwtRegisteredClaimNames.Jti)?.Value);
            LoginId = (user.FindFirst("lgn")?.Value).ToLong();
            UserId = (user.FindFirst("uid")?.Value).ToInt();
            RoleId = (user.FindFirst("rid")?.Value).ToInt();
        }

        public string UserName { get; set; }
        public int UserId { get; set; }
        public long LoginId { get; set; }
        public int RoleId { get; set; }
    }
}


