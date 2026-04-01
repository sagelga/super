# ALTER MODIFY
## Edit column data type
```sql
ALTER TABLE table_name
MODIFY COLUMN column_name datatype;
```

For example
```sql
ALTER TABLE employees
MODIFY last_name VARCHAR(25) NULL;
```
all of the column name, data type is also required to change the constraints `NULL`

## Change `NULL` to `NOT NULL` to the table
```sql
ALTER TABLE lab_location
MODIFY location_id VARCHAR(255) NOT NULL;
```