using Microsoft.EntityFrameworkCore;
using System;

namespace MYRTEXTestProject.Models
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>().HasData(
                new Employee
                {
                    Id = 1,
                    Department = "Ритейл",
                    Name = "Севастьянов Рефат Олегович",
                    BirthdayDate = new DateTime(1986, 7, 20),
                    EmploymentDate = new DateTime(2020, 1, 13),
                    Salary = 79900M
                },
                new Employee
                {
                    Id = 2,
                    Department = "Оптовый",
                    Name = "Пафнутьева Ольга Семёновна",
                    BirthdayDate = new DateTime(1992, 12, 14),
                    EmploymentDate = new DateTime(2018, 7, 20),
                    Salary = 49900M
                },
                new Employee
                {
                    Id = 3,
                    Department = "Оптовый",
                    Name = "Самойлов Сергей Игоревич",
                    BirthdayDate = new DateTime(1977, 4, 1),
                    EmploymentDate = new DateTime(2020, 3, 14),
                    Salary = 52900M
                },
                new Employee
                {
                    Id = 4,
                    Department = "Розница",
                    Name = "Постовой Геннадий Михайлович",
                    BirthdayDate = new DateTime(1977, 4, 1),
                    EmploymentDate = new DateTime(2020, 3, 14),
                    Salary = 9000M
                },
                new Employee
                {
                    Id = 5,
                    Department = "Оптовый",
                    Name = "Державина Агата Леонидовна",
                    BirthdayDate = new DateTime(1947, 4, 1),
                    EmploymentDate = new DateTime(2020, 3, 14),
                    Salary = 90000M
                }
            );
        }

        public DbSet<Employee> Employees { get; set; }
    }
}
