﻿using LeaveManagment.Entity;
using LeaveManagment.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace LeaveManagment
{
    public class LeaveContext : IdentityDbContext<Registration>

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
            builder.Entity<Login>(entity =>
            {
                entity.ToTable("login", "leave");


            });
        }


    }
}
