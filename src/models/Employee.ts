import { Designation } from "../enums/Designation";

export abstract class Employee {
  name: string;
  id: string;
  dateOfBirth: string;
  designation: Designation;
  reportsTo: string | null;
  reportees: string[];

  constructor(
    name: string,
    id: string,
    dateOfBirth: string,
    designation: Designation,
    reportsTo: string | null,
  ) {
    this.name = name;
    this.id = id;
    this.dateOfBirth = dateOfBirth;
    this.designation = designation;
    this.reportsTo = reportsTo;
    this.reportees = [];
  }

  getDetails(): string {
    return (
      `ID: ${this.id}, Name: ${this.name}, DOB: ${this.dateOfBirth}, ` +
      `Designation: ${this.designation}, ReportsTo: ${this.reportsTo}, ` +
      `Reportees: [${this.reportees.join(", ")}]`
    );
  }
}
