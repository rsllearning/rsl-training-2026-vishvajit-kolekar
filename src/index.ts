import { OrganizationService } from "./services/OrganizationService";
import { Ceo } from "./models/Ceo";
import { Director } from "./models/Director";
import { Manager } from "./models/Manager";
import { Lead } from "./models/Lead";
import { Engineer } from "./models/Engineer";
import { Employee } from "./models/Employee";

const org = new OrganizationService();

// Add CEO 
console.log(org.addEmployee(new Ceo("Virat Kohali", "1", "05/15/1970",)));

// Add Director
console.log(org.addEmployee(new Director("Rohit Sharama", "2", "08/22/1980", "1")));

// Add Manager
console.log(org.addEmployee(new Manager("Jay Shah", "3", "03/10/1985", "2")));

// Add Lead 
console.log(org.addEmployee(new Lead("Ajinkya Rahane", "4", "11/05/1990", "3")));

// Add Engineer 
console.log(org.addEmployee(new Engineer("Sachin Tendulkar", "5", "07/20/1995", "4")));

// Add another 
console.log(org.addEmployee(new Engineer("Yash Kale", "6", "01/12/1996", "4")));

console.log(" Validation: Duplicate ID", org.addEmployee(new Engineer("Suresh Raina", "5", "02/14/1993", "4")));

console.log(" Validation: Second CEO ", org.addEmployee(new Ceo("MS Dhoni", "7", "07/07/1981")));

console.log("Validation: Invalid Reporting Hierarchy (Engineer reporting to Manager) ", org.addEmployee(new Engineer("Hardik Pandya", "8", "10/11/1993", "3")));

console.log(" Validation: Reporting Employee Not Found ", org.addEmployee(new Engineer("Rishabh Pant", "9", "10/04/1997", "99")));

console.log("Validation: Invalid Date Format", org.addEmployee(new Engineer("Shubman Gill", "10", "1999-09-08", "4")));

console.log(" Validation: Future Date of Birth", org.addEmployee(new Engineer("Ishan Kishan", "12", "01/01/2999", "4")));

console.log("Retrieve All Employees ");
const allEmployees: Employee[] = org.getAllEmployees();
allEmployees.forEach((emp: Employee) => {
  console.log(emp.getDetails());
});

console.log("Retrieve Specific Employee ");
const result = org.getEmployee("3");
if (typeof result === "string") {
  console.log(result);
} else {
  console.log(result.getDetails());
}

console.log("Retrieve Non Existent Employee ", org.getEmployee("99"));

console.log("Updated Employee ", org.updateEmp("5", { name: "Sachin R Tendulkar" }));
const updated = org.getEmployee("5");
if (typeof updated !== "string") {
  console.log("Updated details:", updated.getDetails());
}

console.log("Update Non Existent Employee ", org.updateEmp("99", { name: "Demo" }));

console.log("Update Employee With Invalid Date of Birth ", org.updateEmp("5", { dateOfBirth: "31/12/1995" }));

console.log("Delete Employee With Reportees", org.deleteEmployee("4"));

console.log("Delete Employee ", org.deleteEmployee("6"));
const lead = org.getEmployee("4");
if (typeof lead !== "string") {
  console.log("Lead details after delete:", lead.getDetails());
}


console.log("Delete Non Existent Employee ");
console.log(org.deleteEmployee("999"));

console.log("Final Employee List ");
org.getAllEmployees().forEach((emp: Employee) => {
  console.log(emp.getDetails());
});
