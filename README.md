# Leave Management

REST API for creating and managing employee leave requests using Spring Boot, Maven, and MySQL.

## Configure and run

Set `DB_URL`, `DB_USERNAME`, and `DB_PASSWORD` for your MySQL database, then run:

```text
mvn spring-boot:run
```

The `dev` profile is enabled by default and creates or updates the database table.

## API

| Method | Endpoint       | Purpose                |
| ------ | -------------- | ---------------------- |
| GET    | `/leaves`      | List leave requests    |
| GET    | `/leaves/{id}` | Get a leave request    |
| POST   | `/leaves`      | Create a leave request |
| PUT    | `/leaves/{id}` | Update a leave request |
| DELETE | `/leaves/{id}` | Delete a leave request |

Requests require `employeeId`, `leaveType`, `startDate`, `endDate`, and `reason`. New requests default to `PENDING`; `status` may be included in create and update requests.

## Test

mvn test
