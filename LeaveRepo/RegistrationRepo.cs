using LeaveManagment.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using LeaveManagment.Entity;
using LeaveManagment.IRepository;
using Microsoft.EntityFrameworkCore;

namespace LeaveManagment.LeaveRepo
{
    public class RegistrationRepo:IRegistration
    {
        private readonly LeaveContext _context;
        private readonly IUserMeta _meta;

        public RegistrationRepo(LeaveContext context, IUserMeta meta)
        {
            _context = context;

        }
        public async Task<bool> Post(RegistrationModel model)
        {
            if (model == null)
                return false;
                await _context.registrations.AddAsync(new Registration
                {
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    UserName = model.UserName,
                    Password = PasswordHelper.CreateHash(model.Password, model.UserName),
                    CreatedOn = DateTime.Now,
                    DepartmentId = model.DepartmentId,
                    IsDepHead=model.IsDepHead
                });
           
                await _context.SaveChangesAsync();

                return true;
        }
        public async Task<Registration> getUser(string userName)
        {
            var data = await _context.registrations.FirstOrDefaultAsync(x => x.UserName == userName);
            return data;
        }
        public async Task<Registration> GetDepHead()
        {
            var data=await _context.registrations
                .FirstOrDefaultAsync(x => x.Id==_meta.UserId);
            return data;
        }
    }
}
