import { Employee } from './employee';

abstract class Filter {
    protected nextFilter: Filter | null = null;

    public setNext(filter: Filter): Filter {
        this.nextFilter = filter;
        return filter;
    }

    public filter(employees: Employee[], filterBy: string, filterValue: string | Date): Employee[] {
        if (this.nextFilter) {
            return this.nextFilter.filter(employees, filterBy, filterValue);
        }

        return [];
    }
}

export class DepartmentFilter extends Filter {
    public filter(employees: Employee[], filterBy: string, filterValue: string): Employee[] {
        if (filterBy === 'department') {
            return employees.filter((e: Employee) => e.department.toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1);
        }
        return super.filter(employees, filterBy, filterValue);
    }
}

export class NameFilter extends Filter {
    public filter(employees: Employee[], filterBy: string, filterValue: string): Employee[] {
        if (filterBy === 'name') {
            return employees.filter((e: Employee) => e.name.toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1);
        }
        return super.filter(employees, filterBy, filterValue);
    }
}

export class BirthdayDateFilter extends Filter {
    public filter(employees: Employee[], filterBy: string, filterValue: Date): Employee[] {
        if (filterBy === 'birthdayDate') {
            return employees.filter((e: Employee) => {
                let employeeBirthday = new Date(e.birthdayDate);
                let filterDate = new Date(filterValue);

                employeeBirthday = new Date(employeeBirthday.getFullYear(), employeeBirthday.getMonth(), employeeBirthday.getDate());
                filterDate = new Date(filterDate.getFullYear(), filterDate.getMonth(), filterDate.getDate());
                return employeeBirthday.getTime() === filterDate.getTime();
            });
        }
        return super.filter(employees, filterBy, filterValue);
    }
}

export class EmploymentDateFilter extends Filter {
    public filter(employees: Employee[], filterBy: string, filterValue: Date): Employee[] {
        if (filterBy === 'employmentDate') {
            return employees.filter((e: Employee) => {
                let employmentDate = new Date(e.employmentDate);
                let filterDate = new Date(filterValue);

                employmentDate = new Date(employmentDate.getFullYear(), employmentDate.getMonth(), employmentDate.getDate());
                filterDate = new Date(filterDate.getFullYear(), filterDate.getMonth(), filterDate.getDate());
                return employmentDate.getTime() === filterDate.getTime();
            });
        }
        return super.filter(employees, filterBy, filterValue);
    }
}

export class SalaryFilter extends Filter {
    public filter(employees: Employee[], filterBy: string, filterValue: string): Employee[] {
        if (filterBy === 'salary') {
            return employees.filter((e: Employee) => e.salary.toString() === filterValue.toString());
        }
        return super.filter(employees, filterBy, filterValue);
    }
}
