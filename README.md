# Online Bookstore SQL Assignment

This assignment uses basic SQL queries to work with authors, books, and publishers.

## Tables

- `Authors`: author ID, name, and country.
- `Books`: book ID, title, author ID, category, price, and publication year.
- `Publishers`: publisher ID, name, country, and established year.

`Books.authorId` refers to `Authors.authorId`.

## Run the script

1. Open Postgres Workbench or connect to a postgres server.
2. Create and select a database for the assignment.

3. Open `online_bookstore.sql` and run the script.

The script creates and fills the `Authors` and `Books` tables, runs the task queries, performs the insert/update/delete examples, and creates the `Publishers` table.
