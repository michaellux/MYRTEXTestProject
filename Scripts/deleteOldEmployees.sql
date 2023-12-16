use MYRTEXTestProjectEmployeesdb;

DECLARE @OldEmployees TABLE (ID INT)
DECLARE @targetAge INT = 70

INSERT INTO @OldEmployees
SELECT Employees.Id FROM Employees
WHERE DATEDIFF(year, Employees.BirthdayDate, GETDATE()) > @targetAge

DELETE FROM Employees
WHERE Employees.Id IN (SELECT ID FROM @OldEmployees)