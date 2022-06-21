using LeaveManagment.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace LeaveManagment
{
    public class LeaveContext : DbContext
    {
        public LeaveContext(DbContextOptions<LeaveContext> options)
            : base(options)
        {
        }

        public DbSet<Login> login { get; set; }

        public DbSet<Employee> employee { get; set; }
        public DbSet<Salary> salary { get; set; }
        public DbSet<Department> department { get; set; }
        public DbSet<Leave> leave { get; set; }
        public DbSet<Registration> registrations { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
            {
            builder.Entity<Employee>(entity =>
            {
                entity.ToTable("employee", "leave");


            });
            builder.Entity<Salary>(entity =>
            {
                entity.ToTable("salary", "leave");


            });
            builder.Entity<Department>(entity =>
            {
                entity.ToTable("department", "leave");


            });
            builder.Entity<Leave>(entity =>
            {
                entity.ToTable("leave", "leave");

            });
            builder.Entity<Registration>(entity =>
            {
                entity.ToTable("registration", "leave");


            });
        }


    }
}
