import { Employee } from "./Employee";
import { Designation } from "../enums/Designation";

export class Lead extends Employee {
  constructor(name: string, id: string, dateOfBirth: string, reportsTo: string) {
    super(name, id, dateOfBirth, Designation.Lead, reportsTo);
  }
}
