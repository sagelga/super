# Inner - Natural Join
Just like the INNER JOIN, but will not repeat the attribute that is used as joining key twice.

The SQL NATURAL JOIN columns with the same name of associated tables will appear once only.

- The associated tables have one or more pairs of identically named columns.
- The columns must be the same data type.
- Don’t use ON clause in a natural join.
- You cannot choose which key to use for joining the table

```sql
SELECT *
FROM employees
NATURAL JOIN location
```
