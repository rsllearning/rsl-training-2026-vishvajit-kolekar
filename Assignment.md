
Assignment

Multiple choice questions
1. What is the compile-time type of value?

const arr = [1, "two", 3] as const;
const value = arr[1];

A. string
B. "two"
C. string | number
D. 1 | "two" | 3

2. Given the following, what error (if any) occurs, and why?

interface A { x: number; y?: number; }
class C implements A {
x = 0;
}
const c = new C();
c.y = 10;

A. No error - optional interface properties are automatically added to any implementing class
B. Error: Property 'y' does not exist on type 'C, implementing an interface with an optional
property doesn't create that property on the class itself
C. Error: Class 'C' incorrectly implements interface 'A' - missing property y
D. No error, but c.y will be undefined at runtime since it was never declared

Raja Software Confidential 1

TypeScript

TypeScript
3. What does the following code print, and why?

enum Status {
Active = "ACTIVE",
Inactive = "INACTIVE",
}
enum Level {
Active = "ACTIVE",
Low = "LOW",
}
function check(s: Status) {
return s;
}
check(Level.Active);

A. Compiles and prints "ACTIVE", TypeScript enums are compared structurally, like objects
B. Compile-time error, string enum members are nominally typed, so Level.Active isn't assignable to
Status despite identical string values
C. Compiles fine only because both enums happen to share the exact same member names
D. Runtime error, two enums cannot declare the same string value across a project

4. What is the type of A["id"] in the following code?

type A = { id: number } & { id: string };

A. number | string
B. string
C. never
D. Compile-time error at the type declaration itself

Raja Software Confidential 2

TypeScript
5. What is the inferred return type of getArea below, and what compiler issue exists?

type Shape =
| { kind: "circle"; radius: number }
| { kind: "square"; side: number }
| { kind: "triangle"; base: number; height: number };
function getArea(shape: Shape): number {
switch (shape.kind) {
case "circle":
return Math.PI * shape.radius ** 2;
case "square":
return shape.side ** 2;
}
}

A. number, no issue, since switch statements exhaustively narrow discriminated unions by default
B. Compile-time error, not all code paths return a value; the triangle case is unhandled and there's no
default/never-based exhaustiveness check
C. number | undefined, TypeScript silently allows the missing case and treats the fallthrough as
undefined
D. No issue, since shape.kind for triangle is automatically narrowed to never by the compiler

Raja Software Confidential 3

Coding assignment
Create an Organization Management system using only Typescript (Use OOPs concept of TS to build the
app).
Requirements:
- Consider there is an organization in which we have Employees who can be classified as
Engineer, Lead, Manager, Director and CEO.
- All the basic employees have the following details (you are free to add any extra fields).
- name, id (unique identifier of an employee), dateOfBirth (in mm/dd/yyyy format),
designation (Engineer, Lead, Manager, Director, CEO)

- Below are the more details related to additional fields related to each designation:
- Engineer: reportsTo (id of the lead who the engineer is reporting to), reportees (no
reportees would be present for an engineer)
- Lead: reportsTo (id of the Manager to whom the lead is reporting to), reportees (list of
engineer employee ids reporting to lead)
- Manager: reportsTo (id of the Director to whom the manager is reporting to), reportees
(list of lead employee ids reporting to Manager)
- Director: reportsTo (id of the ceo to whom the director is reporting to), reportees (list of
manager ids reporting to Director)
- CEO: reportsTo (ceo is the only person who reports to no one here), reportees (list of
director ids).

- All the CRUD operations are must. Means a user should be able to add new employees into the
organization such as an engineer, manager, etc. Please note that there should be only one CEO
for an organization.
- Update the existing employee given the id.
- Delete an employee given the id.
- Retrieve all the employees
- Retrieve a specific employee provided id.
- The application should handle validations and edge cases such as:
- Employee IDs must be unique. Adding an employee with a duplicate ID should be
rejected.
- reportsTo should follow the defined reporting hierarchy. Invalid reporting relationships
should not be allowed.
- Only one CEO should exist in the organization. Attempts to add multiple CEOs should be
rejected.
- Updating an employee with a non-existent ID should return an appropriate error.
- Deleting an employee who has reportees should be handled appropriately (for example,
reject deletion or handle reassignment).
- Invalid employee references, empty required fields, or incorrect date formats should be
validated.

Raja Software Confidential 4

Setup:
- Use simple TS language to create a program no need of the UI
- To execute each functionality at a time you can provide mock data to your program and run it in
the node js environment.
Good to have functionality (optional):
- No implicit “any”, no implicit return type.
Deliverables:
- Push the entire code for the above requirement on a git branch in your repo, and share the
branch-name.
- Add a README.md containing:
- Project setup and installation steps.
- Execution commands
- Project structure explanation.
- Brief explanation of the design approach and assumptions.
- Take a video of the program showcasing all the functionalities and share it’s Gdrive link

Time of delivery: 1 day