use MYRTEXTestProjectEmployeesdb;

DECLARE @EmployeesWithSmallSalary TABLE (ID INT)
DECLARE @targetSalary MONEY = 15000

INSERT INTO @EmployeesWithSmallSalary
SELECT Employees.Id FROM Employees
WHERE Employees.Salary < @targetSalary

UPDATE Employees
SET Salary = @targetSalary
WHERE Employees.Id IN (SELECT ID FROM @EmployeesWithSmallSalary)