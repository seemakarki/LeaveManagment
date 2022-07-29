using LeaveManagment.Entity;
using LeaveManagment.IRepository;
using LeaveManagment.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeaveManagment.LeaveRepo
{

    public class EmployeeRepo:IEmployee
    {

        private readonly LeaveContext _context;

        public EmployeeRepo(LeaveContext context)
        {
            _context = context;

        }
        public async Task<bool> Post(Employee model)
        {
            if (model == null)
                return false;
            if (model.Id == 0)
            {
                await _context.employee.AddAsync(new Employee
                {
                    FirstName=model.FirstName,
                    LastName=model.LastName,
                    Address=model.Address,
                    DepartmentId=model.DepartmentId,
                    Designation=model.Designation,
                    DOB=model.DOB,
                    Email=model.Email,
                    Gender=model.Gender,
                    MiddleName=model.MiddleName,
                    PhoneNo=model.PhoneNo,
                    CreatedOn = DateTime.Now
                });
            }
            else
            {
                _context.employee.Update(model);
            }

            await _context.SaveChangesAsync();

            return true;
        }
        public async Task<EmployeeModel> getEmployee(int id)
        {
            var employee = await _context.employee.FirstOrDefaultAsync(x => x.Id == id);
            var dep = await _context.department.FirstOrDefaultAsync(x => x.Id == employee.DepartmentId);
            var item = new EmployeeModel
            {
               FirstName=employee.FirstName,
               MiddleName=employee.MiddleName,
               LastName=employee.LastName,
               DepartmentName=dep.DepartmentName,
               DepartmentId=employee.DepartmentId,
               Address=employee.Address,
               Designation=employee.Designation,
               DOB=employee.DOB,
               Email=employee.Email,
               Gender=employee.Gender,
               PhoneNo=employee.PhoneNo
            };
            return item;
        }
        public async Task<List<EmployeeModel>> getList()
        {
            var employees = new List<EmployeeModel>();
            var data = await _context.employee.ToListAsync();
            foreach (var item in data)
            {
                var dep = await _context.department.FirstOrDefaultAsync(x => x.Id == item.DepartmentId);

                employees.Add(new EmployeeModel
                {
                    FirstName = item.FirstName,
                    MiddleName = item.MiddleName,
                    LastName = item.LastName,
                    DepartmentName = dep.DepartmentName,
                    DepartmentId = item.DepartmentId,
                    Address = item.Address,
                    Designation = item.Designation,
                    DOB = item.DOB,
                    Email = item.Email,
                    Gender = item.Gender,
                    PhoneNo = item.PhoneNo
                });
            }
            return employees;
        }

    }
}
