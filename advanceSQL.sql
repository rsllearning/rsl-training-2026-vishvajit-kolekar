

create database onlineShoppingPlatform;

use onlineShoppingPlatform;

create table Customers (
	customer_id int primary key,
	customerName varchar(50) not null,
	city varchar(50) not null,
	email varchar(50) not null
);

create table Products (
	productId int primary key,
	productName varchar(50),
	category varchar(50),
	price decimal(10, 2)
);

create table Orders (
	orderId int primary key,
	customer_id int,
	productId int,
	quantity int,
	orderDate Date,
	foreign key (customer_id) references Customers(customer_id),
	foreign key (productId) references Products(productId)
);


INSERT INTO Customers (customer_id, customerName, city, email) VALUES
(1, 'Aarav Patel', 'Mumbai', 'aarav@example.com'),
(2, 'Mia Chen', 'Toronto', 'mia@example.com'),
(3, 'Noah Smith', 'London', 'noah@example.com'),
(4, 'Priya Shah', 'Pune', 'priya@example.com'),
(5, 'Liam Garcia', 'Madrid', 'liam@example.com'),
(6, 'Amara Okafor', 'Lagos', 'amara@example.com'),
(7, 'Ethan Kim', 'Seoul', 'ethan@example.com'),
(8, 'Sofia Rossi', 'Rome', 'sofia@example.com'),
(9, 'Kabir Mehta', 'Delhi', 'kabir@example.com'),
(10, 'Emma Wilson', 'Sydney', 'emma@example.com');

INSERT INTO Products (productId, productName, category, price) VALUES
(1, 'Wireless Mouse', 'Electronics', 24.99),
(2, 'Mechanical Keyboard', 'Electronics', 79.50),
(3, 'USB-C Hub', 'Electronics', 39.99),
(4, 'Notebook Set', 'Stationery', 12.49),
(5, 'Desk Lamp', 'Home Office', 34.95),
(6, 'Water Bottle', 'Accessories', 18.00),
(7, 'Laptop Stand', 'Home Office', 42.00),
(8, 'Backpack', 'Accessories', 59.99),
(9, 'Pen Pack', 'Stationery', 8.75),
(10, 'Headphones', 'Electronics', 89.00);

INSERT INTO Orders (orderId, customer_id, productId, quantity, orderDate) VALUES
(1, 1, 1, 2, '2026-01-05'),
(2, 2, 2, 1, '2026-01-06'),
(3, 3, 4, 3, '2026-01-07'),
(4, 4, 5, 1, '2026-01-08'),
(5, 5, 3, 2, '2026-01-09'),
(6, 6, 6, 1, '2026-01-10'),
(7, 7, 7, 1, '2026-01-11'),
(8, 8, 8, 1, '2026-01-12'),
(9, 9, 9, 4, '2026-01-13'),
(10, 10, 10, 1, '2026-01-14'),
(11, 1, 3, 1, '2026-01-15'),
(12, 2, 4, 2, '2026-01-16'),
(13, 3, 6, 2, '2026-01-17'),
(14, 4, 8, 1, '2026-01-18'),
(15, 5, 1, 1, '2026-01-19'),
(16, 6, 2, 1, '2026-01-20'),
(17, 7, 9, 2, '2026-01-21'),
(18, 8, 5, 1, '2026-01-22'),
(19, 9, 7, 1, '2026-01-23'),
(20, 10, 10, 2, '2026-01-24');



-- Section 1: Advanced Joins
-- ● Task 1: Display each customer along with the products they ordered.

select c.customer_id, c.customerName, p.productName, o.quantity, o.orderDate
from Customers c
inner join Orders o on c.customer_id = o.customer_id
inner join Products p on o.productId = p.productId;

-- ● Task 2: Display all possible combinations of customers and products using a CROSS JOIN.

select c.customer_id, c.customerName, p.productId, p.productName
from Customers c
cross join Products p;

-- ● Task 3: Display all customers and their orders, including customers who have not placed any orders.

select c.customer_id, c.customerName, o.orderId, p.productName, o.quantity, o.orderDate
from Customers c
left join Orders o on c.customer_id = o.customer_id
left join Products p on o.productId = p.productId;

-- Section 2: Subqueries
-- ● Task 4: Find products priced above the average product price.

select productName, price from Products where price > (select avg(price) from Products);






-- ● Task 5: Display customers whose total purchase amount is greater than the average customer purchase amount.

select c.customer_id, c.customerName, sum(o.quantity * p.price) as totalPurchase
from Customers c
inner join Orders o on c.customer_id = o.customer_id
inner join Products p on o.productId = p.productId
group by c.customer_id, c.customerName
having sum(o.quantity * p.price) > (
    select avg(customerPurchases.totalPurchase)
    from (
        select o.customer_id, sum(o.quantity * p.price) as totalPurchase
        from Orders o
        inner join Products p on o.productId = p.productId
        group by o.customer_id
    ) as customerPurchases
);

-- ● Task 6: Find the highest-priced product in each category using a correlated subquery.

select p1.productName, p1.category, p1.price
from Products p1
where p1.price = (
    select max(p2.price)
    from Products p2
    where p2.category = p1.category
);


-- Section 3: Set Operations
-- ● Task 7: Combine products from two different categories using UNION.

select productName, category from Products where category = 'Electronics'
union
select productName, category from Products where category = 'Accessories';


-- ● Task 8: Write MySQL alternatives for INTERSECT and EXCEPT using INNER JOIN and LEFT
-- JOIN.

-- INTERSECT alternative: product names present in both categories.
select distinct p1.productName
from Products p1
inner join Products p2 on p1.productName = p2.productName
where p1.category = 'Electronics' and p2.category = 'Accessories';

-- EXCEPT alternative: product names in Electronics but not in Accessories.
select distinct p1.productName
from Products p1
left join Products p2
    on p1.productName = p2.productName and p2.category = 'Accessories'
where p1.category = 'Electronics' and p2.productId is null;


-- Section 4: Window Functions
-- ● Task 9: Rank products by price within each category.

select productName, category, price,
RANK() OVER (PARTITION BY category ORDER BY price DESC) as priceRank
from Products;

-- ● Task 10: Display the previous product price (LAG) and a running total of product prices using window functions.

select productName, category, price,
LAG(price) OVER (PARTITION BY category ORDER BY price, productId) as previousPrice,
SUM(price) OVER (
    PARTITION BY category
    ORDER BY price, productId
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
) as runningTotal
from Products;


-- Section 5: Common Table Expressions (CTEs)


-- ● Task 11: Create a CTE to display customers whose total purchase amount is above the average.

with customerPurchases as (
    select c.customer_id, c.customerName, sum(o.quantity * p.price) as totalPurchase
    from Customers c
    inner join Orders o on c.customer_id = o.customer_id
    inner join Products p on o.productId = p.productId
    group by c.customer_id, c.customerName
)
select customer_id, customerName, totalPurchase
from customerPurchases
where totalPurchase > (select avg(totalPurchase) from customerPurchases);


-- ● Task 12: Create a recursive CTE to generate a sequence of numbers from 1 to 10.

with recursive numberSequence as (
    select 1 as n
    union all
    select n + 1
    from numberSequence
    where n < 10
)
select n from numberSequence;

-- Section 6: Views
-- ● Task 13: Create a view that displays products priced above ₹1,000 and retrieve data from the
-- view.

create view ProductsAbove1000 as
select productId, productName, category, price
from Products
where price > 1000;

select * from ProductsAbove1000;

-- Section 7: Indexes and Query Performance
-- ● Task 14: Create an index on the category column of the Products table.

create index idx_products_category on Products (category);

-- ● Task 15: Use EXPLAIN to analyze a query that filters products by category.

explain
select productId, productName, price
from Products
where category = 'Electronics';

-- Section 8: Stored Procedures and Functions
-- ● Task 16: Create a stored procedure to retrieve products by category.

DELIMITER $$

create procedure GetProductsByCategory (in requestedCategory varchar(50))
begin
    select productId, productName, category, price
    from Products
    where category = requestedCategory;
end$$

DELIMITER ;

call GetProductsByCategory('Electronics');

-- ● Task 17: Create a function to calculate the total price of an order (price × quantity).

DELIMITER $$

create function CalculateOrderTotal(orderPrice decimal(10, 2), orderQuantity int)
returns decimal(12, 2)
deterministic
begin
    return orderPrice * orderQuantity;
end$$

DELIMITER ;

select CalculateOrderTotal(100.00, 3) as totalPrice;

-- Section 9: Transactions
-- ● Task 18: Write a transaction that updates a product's price and demonstrate the use of COMMIT
-- and ROLLBACK.

start transaction;
update Products set price = price + 100.00 where productId = 1;
commit;

start transaction;
update Products set price = price + 100.00 where productId = 2;
rollback;


-- Section 10: SQL Triggers
-- ● Task 19: Create a trigger that automatically records new orders in an Order_Audit table whenever
-- a new order is inserted.

create table Order_Audit (
    auditId int auto_increment primary key,
    orderId int not null,
    customer_id int,
    productId int,
    quantity int,
    orderDate date,
    recordedAt timestamp not null default current_timestamp
);

DELIMITER $$

create trigger RecordNewOrder
after insert on Orders
for each row
begin
    insert into Order_Audit (orderId, customer_id, productId, quantity, orderDate)
    values (new.orderId, new.customer_id, new.productId, new.quantity, new.orderDate);
end$$

DELIMITER ;












-- Raja Software Confidential 2

-- Section 11: Performance Tuning
-- ● Task 20: Optimize the queries by applying SQL performance tuning best practices:
-- eg:
-- SELECT DISTINCT *
-- FROM Products
-- WHERE YEAR(created_date) = 2024
-- AND category = 'Electronics';
-- Apply the following improvements:
-- 1. Avoid SELECT *.
-- 2. Remove unnecessary DISTINCT.
-- 3. Avoid functions on indexed columns.
-- 4. Use an index-friendly query.

-- Products has no created_date column, so filtered by the indexed category column.

select productId, productName, price
from Products
where category = 'Electronics';
