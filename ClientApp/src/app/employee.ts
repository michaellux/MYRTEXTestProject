export class Employee {
    constructor(
        public id: number = null,
        public department: string = '',
        public name: string = '',
        public birthdayDate?: Date | string,
        public employmentDate?: Date | string,
        public salary: number = null) { }
}
