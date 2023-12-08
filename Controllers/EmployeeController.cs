using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using MYRTEXTestProject.Models;

namespace MYRTEXTestProject.Controllers
{
    [ApiController]
    [Route("api/employees")]
    internal class EmployeeController : Controller
    {
        private ApplicationContext db;
        private EmployeeController(ApplicationContext context)
        {
            db = context;
            if (!db.Employees.Any())
            {
                db.Employees.Add(new Employee { 
                    Department = "Ритейл",
                    Name = "Севастьянов Рефат Олегович",
                    BirthdayDate = System.DateTime.Today,
                    EmploymentDate = System.DateTime.Today,
                    Salary = 79900M
                });
                db.Employees.Add(new Employee {
                    Department = "Оптовый",
                    Name = "Пафнутьева Ольга Семёновна",
                    BirthdayDate = System.DateTime.Today,
                    EmploymentDate = System.DateTime.Today,
                    Salary = 49900M
                });
                db.Employees.Add(new Employee {
                    Department = "Оптовый",
                    Name = "Самойлов Сергей Игоревич",
                    BirthdayDate = System.DateTime.Today,
                    EmploymentDate = System.DateTime.Today,
                    Salary = 52900M
                });
                db.SaveChanges();
            }
        }
        [HttpGet]
        public IEnumerable<Employee> Get()
        {
            return db.Employees.ToList();
        }

        [HttpGet("{id}")]
        public Employee Get(int id)
        {
            Employee employee = db.Employees.FirstOrDefault(x => x.Id == id);
            return employee;
        }

        [HttpPost]
        public IActionResult Post(Employee employee)
        {
            if (ModelState.IsValid)
            {
                db.Employees.Add(employee);
                db.SaveChanges();
                return Ok(employee);
            }
            return BadRequest(ModelState);
        }

        [HttpPut]
        public IActionResult Put(Employee employee)
        {
            if (ModelState.IsValid)
            {
                db.Update(employee);
                db.SaveChanges();
                return Ok(employee);
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Employee employee = db.Employees.FirstOrDefault(x => x.Id == id);
            if (employee != null)
            {
                db.Employees.Remove(employee);
                db.SaveChanges();
            }
            return Ok(employee);
        }
    }
}
