import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Employee } from '../../employee';

@Component({
  selector: 'employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [DataService]
})
export class EmployeesComponent implements OnInit {

    employee: Employee = new Employee(); 
    employees: Employee[];                
    tableMode: boolean = true;          

    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.loadEmployees();
    }

    loadEmployees() {
        this.dataService.getEmployees()
            .subscribe((data: Employee[]) => this.employees = data);
    }

    save() {
        if (this.employee.id == null) {
            this.dataService.createEmployee(this.employee)
                .subscribe((data: Employee) => this.employees.push(data));
        } else {
            this.dataService.updateProduct(this.employee)
                .subscribe(data => this.loadEmployees());
        }
        this.cancel();
    }
    editProduct(e: Employee) {
        this.employee = e;
    }
    cancel() {
        this.employee = new Employee();
        this.tableMode = true;
    }
    delete(e: Employee) {
        this.dataService.deleteProduct(e.id)
            .subscribe(data => this.loadEmployees());
    }
    add() {
        this.cancel();
        this.tableMode = false;
    }
}
