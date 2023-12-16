using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MYRTEXTestProject.Models
{
    /// <summary>
    /// Класс Employee представляет собой модель сотрудника в компании. 
    /// </summary>
    public class Employee
    {
        public int Id { get; set; }
        public string Department { get; set; }
        public string Name { get; set; }
        public DateTime BirthdayDate { get; set; }
        public DateTime EmploymentDate { get; set;  }
        public decimal Salary { get; set; } 
    }
}
