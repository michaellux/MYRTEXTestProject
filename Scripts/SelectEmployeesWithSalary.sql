use MYRTEXTestProjectEmployeesdb;

DECLARE @targetSalary MONEY = 10000

SELECT * FROM Employees WHERE Employees.Salary > @targetSalary;