# Organization Management System

A TypeScript based Organization Management System built using Object Oriented Programming. This application manages employees across different designations with full CRUD operations.

## Project Setup and Installation

### Prerequisites
- Node.js (v16 or above)
- npm

### Installation Steps

```bash
# Clone the repository and checkout your branch
git clone <rsl-training-2026-vishvajit-kolekar>
git checkout <Typescript-Assignment>

# Install dependencies
npm install

# Build and run
npm start

## Execution Commands
```

```bash
# Build the TypeScript code
npm run build

# Build and run the application
npm start
```

## Project Structure

```
TypeScript Assignment/
├── src/
│   ├── enums/
│   │   └── Designation.ts        # Enum for employee designations
│   ├── models/
│   │   ├── Employee.ts           # base class for all employees
│   │   ├── Engineer.ts           # Engineer class
│   │   ├── Lead.ts               # Lead class
│   │   ├── Manager.ts            # Manager class
│   │   ├── Director.ts           # Director class
│   │   └── Ceo.ts                # CEO class
│   ├── services/
│   │   └── OrganizationService.ts  # CRUD operations
│   └── index.ts                  # Main entry point with mock data
├── tsconfig.json                 
├── package.json                 
├── Answers.md                    # MCQ answers
└── README.md                   
```

## Design Approach

### Class Hierarchy
I used an abstract base class **Employee** that holds all the common fields like name, id, dateOfBirth, designation. Each designation (Engineer, Lead, Manager, Director, CEO) extends this base class. This way common logic stays in one place and each subclass only handles its own constructor.

### OrganizationService
This is the main service class that handles all the CRUD operations. It uses a `Map<string, Employee>` internally to store employees by their ID.

### Validations
- Duplicate employee IDs are rejected
- Cannot delete an employee who has reportees
- Required fields are validated before adding

### Assumptions
- Employee IDs are strings (like 1, 2, etc.)
