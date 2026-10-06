import { Employee } from "./Employee";
import { Designation } from "../enums/Designation";

export class Ceo extends Employee {
  constructor(name: string, id: string, dateOfBirth: string) {
    super(name, id, dateOfBirth, Designation.Ceo, null);
  }
}
