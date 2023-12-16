import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../../data.service';
import { Employee } from '../../employee';
import { DepartmentFilter, NameFilter, BirthdayDateFilter, EmploymentDateFilter, SalaryFilter } from '../../filter';
import { SortField, SortDirection } from '../../sort';
import { orderBy } from 'lodash';

type Mode = 'create' | 'edit' | 'delete' | 'none';

@Component({
  selector: 'employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [DataService]
})

export class EmployeesComponent implements OnInit {
    employee: Employee = new Employee(); 
    employees: Employee[];
    activeSortField: SortField = 'department';
    activeSortDirection: SortDirection = 'asc';
    isLoading: boolean = true;
    loadingMessage: string = "Загрузка";
    emptyMessage: string = 'Сотрудников нет';
    activeMode: Mode = 'none';
    activeDialog: Object;
    hasErrors: boolean = false;
    showErrors: boolean = false;

    private _filterDepartment: string = '';
    get filterDepartment(): string {
        return this._filterDepartment;
    }
    set filterDepartment(value: string) {
        this._filterDepartment = value;
    }

    private _filterName: string = '';
    get filterName(): string {
        return this._filterName;
    }
    set filterName(value: string) {
        this._filterName = value;
    }


    private _filterBirthdayDate: Date;
    get filterBirthdayDate(): Date {
        return this._filterBirthdayDate;
    }
    set filterBirthdayDate(value: Date) {
        this._filterBirthdayDate = value;
    }

    private _filterEmploymentDate: Date;
    get filterEmploymentDate(): Date {
        return this._filterEmploymentDate;
    }
    set filterEmploymentDate(value: Date) {
        this._filterEmploymentDate = value;
    }

    private _filterSalary: string = '';
    get filterSalary(): string {
        return this._filterSalary;
    }
    set filterSalary(value: string) {
        this._filterSalary = value;
    }

    filteredEmployee: Employee[] = [];

    constructor(private dataService: DataService) {}

    ngOnInit() {
        this.loadEmployees();
    }

    loadEmployees() {
        this.dataService.getEmployees()
            .subscribe((data: Employee[]) => {
                this.isLoading = false;
                this.employees = data;
                this.prepare();
                this.filteredEmployee = this.employees;
                this.sort();
                this.filterDepartment = '';
                this.filterName = '';
                this.filterBirthdayDate = null;
                this.filterEmploymentDate = null;
                this.filterSalary = '';
            });
    }

    prepare() {
        this.employees.forEach((employee) => {
            employee.birthdayDate = employee.birthdayDate.toString().split('T')[0];
            employee.employmentDate = employee.employmentDate.toString().split('T')[0];
        });
    }

    filterHandler() {
        this.filterEmployee();
        this.sort();
    }

    filterEmployee() {
        this.filteredEmployee = this.employees;
            
        let departmentFilter = new DepartmentFilter();
        let nameFilter = new NameFilter();
        let birthdayFilter = new BirthdayDateFilter();
        let employmentDateFilter = new EmploymentDateFilter();
        let salaryFilter = new SalaryFilter();

        departmentFilter.setNext(nameFilter);
        nameFilter.setNext(birthdayFilter);
        birthdayFilter.setNext(employmentDateFilter);
        employmentDateFilter.setNext(salaryFilter);

        if (this.filterDepartment) {
            this.filteredEmployee = departmentFilter.filter(this.filteredEmployee, 'department', this.filterDepartment);
        }
        if (this.filterName) {
            this.filteredEmployee = nameFilter.filter(this.filteredEmployee, 'name', this.filterName);
        }
        if (this.filterBirthdayDate) {
            this.filteredEmployee = birthdayFilter.filter(this.filteredEmployee, 'birthdayDate', this.filterBirthdayDate);
        }
        if (this.filterEmploymentDate) {
            this.filteredEmployee = employmentDateFilter.filter(this.filteredEmployee, 'employmentDate', this.filterEmploymentDate);
        }
        if (this.filterSalary) {
            this.filteredEmployee = salaryFilter.filter(this.filteredEmployee, 'salary', this.filterSalary);
        }
    }

    changeSort(targetField: SortField) {
        if (this.activeSortField === targetField) {
            if (this.activeSortDirection === 'asc') {
                this.activeSortDirection = 'desc';
            }
            else {
                this.activeSortDirection = 'asc';
            }
        }
        this.activeSortField = targetField;
        this.sort()
    }

    sort() {
        this.filteredEmployee = orderBy(this.filteredEmployee, [this.activeSortField], [this.activeSortDirection === 'asc' ? 'asc' : 'desc']);
    }

    actionHandler(dialog: Object, activeEmployee?: Employee) {
        if (activeEmployee) {
            this.activeMode = 'edit';
            this.employee = activeEmployee;
        }
        else {
            this.reset();
            this.activeMode = 'create';
        }
        this.activeDialog = dialog;
        this.openDialog(this.activeDialog);
    }

    createHandler() {
        this.showErrors = true;
        if (this.checkIsValidForm()) {
            this.create();
            this.reset();
            this.closeDialog(this.activeDialog);
            this.showErrors = false;
        }
    }

    checkIsValidForm() {
        let result =
            (this.employee.department !== '') &&
            (this.employee.name !== '') &&
            (this.employee.birthdayDate !== undefined && this.employee.birthdayDate !== '') &&
            (this.employee.employmentDate !== undefined && this.employee.employmentDate !== '') &&
            (this.employee.salary !== null);
        this.hasErrors = !result;
        return result;
    }

    cancelHandler() {
        this.reset();
        this.closeDialog(this.activeDialog);
        this.showErrors = false;
        this.loadEmployees()
    }

    prepareToDeleteHandler(dialog: Object, activeEmployee: Employee) {
        this.activeMode = 'delete';
        this.employee = activeEmployee;
        this.activeDialog = dialog;
        this.openDialog(this.activeDialog);
    }

    deleteHandler() {
        this.delete();
        this.closeDialog(this.activeDialog);
    }

    openDialog(dialog) {
        dialog.showModal();
    }

    closeDialog(dialog) {
        dialog.close();
    }

    @ViewChild('createEditForm') createEditForm: ElementRef;
    @ViewChild('deleteconfirmMessageBlock') deleteconfirmMessageBlock: ElementRef;
    closeDialogOnClickOutside(event, dialog) {
        if (event.target === dialog && (
            !this.createEditForm.nativeElement.contains(event.target) ||
            !this.deleteconfirmMessageBlock.nativeElement.contains(event.target))
        ) {
            this.reset();
            this.closeDialog(this.activeDialog);
            this.showErrors = false;
            this.loadEmployees()
        }
    }

    create() {
        if (this.employee.id == null) {
            delete this.employee.id;
            this.dataService.createEmployee(this.employee)
                .subscribe((data: Employee) => {
                    this.employees.push(data);
                    this.filterEmployee();
                    this.sort();
                }
                );
        } else {
            this.dataService.updateProduct(this.employee)
                .subscribe(data => this.loadEmployees());
        }
    }
    reset() {
        this.employee = new Employee();
    }
    delete() {
        this.dataService.deleteProduct(this.employee.id)
            .subscribe(data => this.loadEmployees());
    }
}
