CREATE TABLE Orders (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100),
    Family NVARCHAR(100),
    Address NVARCHAR(255),
    Mail NVARCHAR(255),
    OrderDate DATETIME DEFAULT GETDATE()
);

CREATE TABLE OrderProducts (
    Id INT PRIMARY KEY IDENTITY(1,1),
    OrderId INT,
    ProductId INT,
    ProductName NVARCHAR(100),
    Quantity INT,
    FOREIGN KEY (OrderId) REFERENCES Orders(Id)
);

----------------------------------------
CREATE TYPE OrderProductTableType AS TABLE
(
    ProductId INT,
    ProductName NVARCHAR(100),
    Quantity INT
);

----------------------------------------
CREATE PROCEDURE CompleteOrder
    @Name NVARCHAR(100),
    @Family NVARCHAR(100),
    @Address NVARCHAR(255),
    @Mail NVARCHAR(255),
    @Products OrderProductTableType READONLY -- Table type for products
AS
BEGIN
    SET NOCOUNT ON;

    -- Insert into Orders table
    DECLARE @OrderId INT;

    INSERT INTO Orders (Name, Family, Address, Mail)
    VALUES (@Name, @Family, @Address, @Mail);

    SET @OrderId = SCOPE_IDENTITY(); -- Get the newly created OrderId

    -- Insert into OrderProducts table
    INSERT INTO OrderProducts (OrderId, ProductId, ProductName, Quantity)
    SELECT @OrderId, ProductId, ProductName, Quantity
    FROM @Products;
END;

 -----------------------------------
--DROP TABLE Products
-- DROP TABLE Categories
 CREATE TABLE Categories (
    Id INT PRIMARY KEY, -- IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL
);


 
CREATE TABLE Products (
    Id INT PRIMARY KEY, -- IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    CategoryId INT NOT NULL,
    FOREIGN KEY (CategoryId) REFERENCES Categories(Id)
);

----------------------------------------
INSERT INTO Categories (Id,Name) VALUES (1,'חלב וגבינות');
INSERT INTO Categories (Id,Name) VALUES (2,'בשר ודגים');
INSERT INTO Categories (Id,Name) VALUES (3,'פירות וירקות');
INSERT INTO Categories (Id,Name) VALUES (4,'טואלטיקה');

INSERT INTO Products (Id, Name, CategoryId) VALUES (11,'קוטג', 1);
INSERT INTO Products (Id, Name, CategoryId) VALUES (12,'חלב 3%', 1);
INSERT INTO Products (Id, Name, CategoryId) VALUES (13,'שמנת חמוצה', 1);
INSERT INTO Products (Id, Name, CategoryId) VALUES (14,'גבינה צהובה', 1);

INSERT INTO Products (Id, Name, CategoryId) VALUES (21,'נקניקיות', 2);
INSERT INTO Products (Id, Name, CategoryId) VALUES (22,'שוקיים', 2);
INSERT INTO Products (Id, Name, CategoryId) VALUES (23,'סלמון', 2);

INSERT INTO Products (Id, Name, CategoryId) VALUES (31,'מלפפון', 3);
INSERT INTO Products (Id, Name, CategoryId) VALUES (32,'עגבניה', 3);
INSERT INTO Products (Id, Name, CategoryId) VALUES (33,'תפוח', 3);
INSERT INTO Products (Id, Name, CategoryId) VALUES (34,'אפרסק', 3);

INSERT INTO Products (Id, Name, CategoryId) VALUES (41,'נייר טואלט', 4);
INSERT INTO Products (Id, Name, CategoryId) VALUES (42,'סבון', 4);
INSERT INTO Products (Id, Name, CategoryId) VALUES (43,'משחת שיניים', 4);


----------------------------------------

CREATE PROCEDURE GetCategoriesWithProducts
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        c.Id AS CategoryId,
        c.Name AS CategoryName,
        p.Id AS ProductId,
        p.Name AS ProductName
    FROM 
        Categories c
    LEFT JOIN 
        Products p ON c.Id = p.CategoryId
    ORDER BY 
        c.Id, p.Id;
END;


---------------------------------
