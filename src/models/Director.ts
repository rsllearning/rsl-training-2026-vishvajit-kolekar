import { Employee } from "./Employee";
import { Designation } from "../enums/Designation";

export class Director extends Employee {
  constructor(name: string, id: string, dateOfBirth: string, reportsTo: string) {
    super(name, id, dateOfBirth, Designation.Director, reportsTo);
  }
}
