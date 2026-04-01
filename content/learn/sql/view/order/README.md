# ORDER BY
An ORDER BY clause in SQL specifies that a SQL SELECT statement returns a result set with the rows being sorted by the values of one or more columns. The sort criteria do not have to be included in the result set. The sort criteria can be expressions, including column names, user-defined functions, arithmetic operations, or CASE expressions. The expressions are evaluated and the results are used for the sorting, i.e., the values stored in the column or the results of the function call.

ORDER BY is the only way to sort the rows in the result set. Without this clause, the relational database system may return the rows in any order. If an ordering is required, the ORDER BY must be provided in the SELECT statement sent by the application. Although some database systems allow the specification of an ORDER BY clause in subselects or view definitions, the presence there has no effect. A view is a logical relational table, and the relational model mandates that a table is a set of rows, implying no sort order whatsoever. The only exception are constructs like ORDER BY ORDER OF ... (not standardized in SQL:2003) which allow the propagation of sort criteria through nested subselects.

ORDER BY keyword sorts the records **in ascending order by default**.
To sort the records in descending order, use the DESC keyword.

## Syntax
```sql
SELECT [column_name]
FROM [table_name]
ORDER BY [column_name] ... [ASC|DESC];
```

For example
```sql
SELECT first_name, last_name, salary
FROM employee
ORDER BY first_name, last_name DESC
```
This will sort the `first_name` first. If the first_name is duplicated, `last_name` will be used to sort those conflict off.


The following SQL statement selects all customers from the "Customers" table, sorted ascending by the "Country" and descending by the "CustomerName" column:

```sql
SELECT * FROM Customers
ORDER BY Country ASC, CustomerName DESC;
```