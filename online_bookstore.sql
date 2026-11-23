create database onlineBookstore;

use database onlineBookstore;

create table Authors (
    authorId INT PRIMARY KEY,
    authorName VARCHAR(100) NOT NULL,
    country VARCHAR(50)
);

create table Books (
    bookId INT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    authorId INT,
    category VARCHAR(50),
    price DECIMAL(10, 2),
    publishedYear INT,
    FOREIGN KEY (authorId) REFERENCES Authors(authorId)
);

insert into Authors (authorId, authorName, country) values
(1, 'R. G. Sharma', 'India'),
(2, 'Anita Desai', 'Mumbai'),
(3, 'John Doe', 'Delhi'),
(4, 'Suraj Kulkarni', 'Pune'),
(5, 'Tapu Gada', 'Goregao');

insert into Books (bookId, title, authorId, category, price, publishedYear) values
(1, 'SQL Basics', 1, 'Programming', 550.00, 2021),
(2, 'Java for Beginners', 3, 'Programming', 750.00, 2022),
(3, 'Spring Boot Guide', 1, 'Programming', 850.00, 2023),
(4, 'Story of the Sea', 2, 'Fiction', 480.00, 2019),
(5, 'Silent Garden', 4, 'Fiction', 680.00, 2021),
(6, 'Space and Stars', 5, 'Science', 900.00, 2024),
(7, 'Science Made Easy', 3, 'Science', 620.00, 2020),
(8, 'Small Business Basics', 2, 'Business', 720.00, 2022),
(9, 'Starting with Python', 5, 'Programming', 800.00, 2021),
(10, 'Stories from Japan', 4, 'History', 590.00, 2018);

-- Task 1: Display all books.
select * from Books;

-- Task 2: Display the book title and price.
select title, price from Books;

-- Task 3: Display the title and price with column aliases.
select title as "book name", price as "book price" from Books;

-- Task 4: Display all unique book categories.
select distinct category from Books;

-- Task 5: Display books priced above 700.
select * from Books where price > 700;

-- Task 6: Display books priced between 500 and 800.
select * from Books where
price between 500 AND 800;

-- Task 7: Display books in the Programming category.
select * from Books where category = 'Programming';

-- Task 8: Display books whose titles start with S.
select * from Books WHERE 
title like 'S%';

-- Task 9: Display books published after 2020.
select * from Books
where publishedYear > 2020;

-- Task 10: Display books sorted by price from highest to lowest.
select * from Books
order by price desc;

-- Task 11: Display the 3 most expensive books.
select * from Books
order by price desc limit 3;

select count(*) as "total-books", sum(price) as "total_price",
       avg(price) as "average-price",
       max(price) as "highestPrice",
       min(price) as "lowestPrice"
from Books;

-- Task 13: Display the average book price for each category.
select category, avg(price) as "averagePrice"
from Books
group by category;

-- Task 14: Display categories with an average price above 650.

select category, avg(price) as "averagePrice"
from Books group by category having avg(price) > 650;
-- Task 15: Display each book with its author's name.

select Books.title, Authors.authorName from Books
inner join Authors on Books.authorId = Authors.authorId;




-- Task 16: Display all authors and the books they have written.
select Authors.authorName, Books.title
from Authors
left join Books on Authors.authorId = Books.authorId;

-- Task 17: Display all books with their author details.
select Books.title, Authors.authorId, Authors.authorName, Authors.country
from Authors
right join Books ON Authors.authorId = Books.authorId;

-- Task 18: Insert a new book.
insert into Books (bookId, title, authorId, category, price, publishedYear)
values (11, 'Learning Kafka', 1, 'Programming', 600.00, 2024);

update Books set price = 650.00 where bookId = 11;

-- Task 20: Delete the new book.
delete from Books where bookId = 11;

-- Task 21: Create the Publishers table with constraints.







create table publishers (
    publisherId int primary key,
    publisherName varchar(100) not null unique,
    country varchar(50) not null default 'India',
    establishedYear int not null
);

select * from publishers;









