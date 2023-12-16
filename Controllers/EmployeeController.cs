using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using MYRTEXTestProject.Models;

namespace MYRTEXTestProject.Controllers
{
    /// <summary>
    /// Контроллер для работы с данными сотрудников
    /// </summary>
    [ApiController]
    [Route("api/employees")]
    public class EmployeeController : ControllerBase
    {
        private ApplicationContext db;
        public EmployeeController(ApplicationContext context)
        {
            db = context;
        }

        /// <summary>
        /// Получение списка всех сотрудников
        /// </summary>
        /// <returns>Список сотрудников</returns>
        [HttpGet]
        public IEnumerable<Employee> Get()
        {
            return db.Employees.ToList();
        }

        /// <summary>
        /// Получение сотрудника по идентификатору
        /// </summary>
        /// <param name="id">Идентификатор сотрудника</param>
        /// <returns>Данные сотрудника</returns>
        [HttpGet("{id}")]
        public Employee Get(int id)
        {
            Employee employee = db.Employees.FirstOrDefault(x => x.Id == id);
            return employee;
        }

        /// <summary>
        /// Добавление нового сотрудника
        /// </summary>
        /// <param name="employee">Данные нового сотрудника</param>
        /// <returns>Результат добавления</returns>
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

        /// <summary>
        /// Обновление данных сотрудника
        /// </summary>
        /// <param name="employee">Обновленные данные сотрудника</param>
        /// <returns>Результат обновления</returns>
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

        /// <summary>
        /// Удаление сотрудника по идентификатору
        /// </summary>
        /// <param name="id">Идентификатор сотрудника</param>
        /// <returns>Результат удаления</returns>
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
