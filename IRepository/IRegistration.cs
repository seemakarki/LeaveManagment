using LeaveManagment.Entity;
using LeaveManagment.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeaveManagment.IRepository
{
    public interface IRegistration
    {
        Task<bool> Post(RegistrationModel model);
        Task<Registration> getUser(string userName);
        Task<Registration> GetDepHead();
    }
}
