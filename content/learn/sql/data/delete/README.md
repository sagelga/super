# DELETE FROM
Delete will delete a certain row that met the `WHERE` condition.

```sql
DELETE FROM table_name
WHERE condition;
```

the rows can be deleted from table when certain condition is met

```sql
DELETE FROM employee
WHERE first_name = 'John'
```

and you can use all `WHERE` clause wheaver you liked to


## Delete based on another table
```sql
DELETE FROM sales_reps
WHERE reps_id = (SELECT employee_id
FROM employees
WHERE last_name = 'Banda');  
```

## Delete all rows in table
```sql
DELETE FROM sales_reps
```
This will delete data from the table, but the column will remains
