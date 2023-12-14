import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './employees.component';

@NgModule({
  declarations: [
    EmployeesComponent
  ],
  imports: [
      CommonModule,
      FormsModule
  ]
})
export class EmployeesModule { }
