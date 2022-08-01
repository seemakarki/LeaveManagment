using LeaveManagment.Entity;
using LeaveManagment.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace LeaveManagment
{
    public class LeaveContext : DbContext

    {
        private readonly DbContextOptions _options;

        public LeaveContext(DbContextOptions options) : base(options)
        {
            _options = options;
        }
        public DbSet<Login> login { get; set; }
        public DbSet<Employee> employee { get; set; }
        public DbSet<Salary> salary { get; set; }
        public DbSet<SalaryDetails> salaryDetails { get; set; }

        public DbSet<Department> department { get; set; }
        public DbSet<Leave> leave { get; set; }
        public DbSet<Registration> registrations { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            
            builder.Entity<Employee>(entity =>
            {
                entity.ToTable("employee", "leave");

            });
            builder.Entity<Salary>(entity =>
            {
                entity.ToTable("salary", "leave");

            });
                 builder.Entity<SalaryDetails>(entity =>
                 {
                     entity.ToTable("salary_details", "leave");

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
            builder.Entity<Login>(entity =>
            {
                entity.ToTable("login", "leave");
            });
        }


    }
}
