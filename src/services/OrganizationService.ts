import { Employee } from "../models/Employee";
import { Designation } from "../enums/Designation";

export class OrganizationService {
  private employees: Map<string, Employee> = new Map();

  private reportingHierarchy: Record<Designation, Designation | null> = {
    [Designation.Engineer]: Designation.Lead,
    [Designation.Lead]: Designation.Manager,
    [Designation.Manager]: Designation.Director,
    [Designation.Director]: Designation.Ceo,
    [Designation.Ceo]: null,
  };

  private validateDateOfBirth(dateOfBirth: string): string | null {
    const [month, day, year] = dateOfBirth.split("/").map(Number);
    const date = new Date(year, month - 1, day);

    if (
      !/^\d{2}\/\d{2}\/\d{4}$/.test(dateOfBirth)
    ) {
      return "Error: Date of birth must be a valid date in mm/dd/yyyy format.";
    }

    if (date > new Date()) {
      return "Error: Date of birth cannot be in the future.";
    }

    return null;
  }


  addEmployee(employee: Employee): string {
    if (!employee.name || !employee.id || !employee.dateOfBirth) {
      return "Error: name, ID and date of birth are required fields.";
    }

    if (this.employees.has(employee.id)) {
      return `Error: Employee with ID ${employee.id} already exists.`;
    }

    const dobError = this.validateDateOfBirth(employee.dateOfBirth);
    if (dobError) {
      return dobError;
    }

    if (employee.designation === Designation.Ceo) {
      const ceoExists = Array.from(this.employees.values()).some(
        (emp: Employee) => emp.designation === Designation.Ceo,
      );
      if (ceoExists) {
        return "Error: Only one CEO is allowed in the organization.";
      }
    }

    const requiredReporter = this.reportingHierarchy[employee.designation];
    if (requiredReporter === null) {
      if (employee.reportsTo) {
        return `Error: CEO cannot report to anyone.`;
      }
    } else {
      if (!employee.reportsTo) {
        return `Error: ${employee.designation} must report to a ${requiredReporter}.`;
      }
      const manager = this.employees.get(employee.reportsTo);
      if (!manager) {
        return `Error: Reporting employee with ID ${employee.reportsTo} not found.`;
      }
      if (manager.designation !== requiredReporter) {
        return `Error: ${employee.designation} must report to a ${requiredReporter}, but ${manager.id} is a ${manager.designation}.`;
      }
    }

    this.employees.set(employee.id, employee);

    if (employee.reportsTo) {
      this.employees.get(employee.reportsTo)?.reportees.push(employee.id);
    }

    return `Employee ${employee.name} added successfully.`;
  }

  getEmployee(id: string): Employee | string {
    const employee = this.employees.get(id);
    if (!employee) {
      return `Error: Employee with ID ${id} not found.`;
    }
    return employee;
  }

  getAllEmployees(): Employee[] {
    return Array.from(this.employees.values());
  }

  updateEmp(id: string, emp: { name?: string; dateOfBirth?: string, designation?: Designation }): string {
    const employee = this.employees.get(id);
    if (!employee) {
      return `Error: Employee with ID ${id} not found.`;
    }

    if (emp.dateOfBirth) {
      const dobError = this.validateDateOfBirth(emp.dateOfBirth);
      if (dobError) {
        return dobError;
      }
    }

    if (emp.name) employee.name = emp.name;
    if (emp.dateOfBirth) employee.dateOfBirth = emp.dateOfBirth;
    if (emp.designation) employee.designation = emp.designation;

    return `Employee ${id} updated successfully.`;
  }

  deleteEmployee(id: string): string {
    const employee = this.employees.get(id);
    if (!employee) {
      return `Error: Employee with ID ${id} not found.`;
    }

    if (employee.reportsTo) {
      const manager = this.employees.get(employee.reportsTo);
      if (manager) {
        manager.reportees = manager.reportees.filter((rid: string) => rid !== id);
      }
    }

    this.employees.delete(id);
    return `Employee ${id} deleted successfully.`;
  }
}
