﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee';

@Injectable()
export class DataService {

    private url = "/api/employees";

    constructor(private http: HttpClient) {
    }

    getEmployees() {
        return this.http.get(this.url);
    }

    getEmployee(id: number) {
        return this.http.get(this.url + '/' + id);
    }

    createEmployee(employee: Employee) {
        return this.http.post(this.url, employee);
    }
    updateProduct(employee: Employee) {

        return this.http.put(this.url, employee);
    }
    deleteProduct(id: number) {
        return this.http.delete(this.url + '/' + id);
    }
}
