﻿import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { EmployeesComponent } from './components/employees/employees.component';
const routes: Routes = [
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: '',
        redirectTo: 'about',
        pathMatch: 'full'
    },
     {
        path: 'employees',
        component: EmployeesComponent
       },
    {
        path: '**',
        redirectTo: 'about',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})

export class AppRoutingModule {}