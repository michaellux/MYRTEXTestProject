import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { EmployeesModule } from './components/employees/employees.module';

@NgModule({
    imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule, EmployeesModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }