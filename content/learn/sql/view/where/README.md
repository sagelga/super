# WHERE
เพราะด้วยว่า SELECT นั้นจะเป็นการเลือกทุก row ออกมา แต่เพื่อที่จะเลือกแค่บาง row ออกมานั้น เราจะต้องใช้ WHERE
โดยผลลัพท์ที่จะออกมานั้นก็คือเมื่อ WHERE ของใน row นั้นเป็นจริงเท่านั้น

``` sql
SELECT ...
FROM ...
WHERE [argument];
```

## Example
### Example One
If you liked to find the employee that have `first_name` equals to 'Jeff', this is how you write it.

``` sql
SELECT *
FROM Employees
WHERE first_name = 'Jeff';
```

### Example Two
If you liked to lists all employees that have salary more than or equal to 2000

``` sql
SELECT *
FROM Employees
WHERE salary >= 2000;
```

### Example Three
You can use `AND` or any arguments to join the clause.

In this example, select all the rows that have `first_name` of 'John' and `last_name` of 'Cena' and do not have `id` as 12.

``` sql
SELECT first_name FROM employee
WHERE first_name = 'John'
    AND last_name = 'Cena'
    AND NOT id = 12;
```

## Using wildcards using `LIKE`
The idea of like is like regular expressions in SQL.
- `%` - represents a wild card for zero, one, or multiple characters
- `_` - represents a wild card for single character

### Example One
Wants to get all the employees that have the **first name** that **starts with J**

``` sql
SELECT first_name
FROM Employees
WHERE first_name LIKE 'J%';
```
### Example Two
Wants to get the result in the column that the first name **starts with ‘J’ and have 4 more alphabet after it**

``` sql
SELECT first_name
FROM Employees
WHERE first_name LIKE 'J____';
```
### Example Three
Wants to get the result in the first name **starts with ‘J’ and the third alphabet is ‘h’**

``` sql
SELECT first_name
FROM Employees
WHERE first_name LIKE 'J_h_';
```
### Example Four
Wants to get the result in the first name **starts with ‘J’ and ends with ‘n’**

``` sql
SELECT first_name
FROM Employees
WHERE first_name LIKE 'J%n';
```
### Example Five
Wants to get the result that their `first_name` is **at least 3 character long**

``` sql
SELECT first_name
FROM Employees
WHERE first_name LIKE '___%';
```

-----

## Using `IN` keyword
`IN` keyword is similar result to match. But if one matched in a list, it is a matched and it will be shown in the result.

``` sql
SELECT [column_name]
FROM [table_name]
WHERE [column_name] IN ([multiple_values]);
```

### Example One
Result in the column that the `first_name` **is either ‘John’ or ‘Jeff’**

``` sql
SELECT first_name
FROM Employees
WHERE first_name IN ('John', 'Jeff');
```

-----

## Using `BETWEEN` keyword
Equivalent to `[value1] <= [column_name] <= [value2]` in Math equation

``` sql
SELECT [column_name]
FROM [table_name]
WHERE [column_name] BETWEEN [value_1] AND [value_2];
```

### Example One
Show every `first_name` that salary is between 2000 and 5000

``` sql
SELECT first_name
FROM Employees
WHERE salary BETWEEN 2000 AND 5000;
```

## Nested WHERE arguments

### Where the cell data is more than computed cell
``` sql
SELECT first_name
FROM Employees
WHERE salary > (
    SELECT salary
    FROM Employees
    WHERE id = 12;
);
```
