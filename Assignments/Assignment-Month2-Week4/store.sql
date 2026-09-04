-- Simple Store Relational Schema

CREATE TABLE Categories (
    category_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE Products (
    product_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);

CREATE TABLE Orders (
    order_id INT PRIMARY KEY,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    order_date DATE NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

-- List all products in the Electronics category

SELECT p.product_id, p.name, p.price
FROM Products p
JOIN Categories c
    ON p.category_id = c.category_id
WHERE c.name = 'Electronics';
