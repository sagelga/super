# ALTER DROP
## Delete column
```sql
ALTER TABLE table_name
DROP COLUMN column_name;
```

## Delete `Primary Key / Foreign Key` constraints
```sql
ALTER TABLE lab_location
DROP PRIMARY KEY;
```

or

```sql
ALTER TABLE lab_location
DROP FOREIGN KEY 'lam_emp_fk';
```

## Delete `UNIQUE` constraints
Unique constraints cannot be removed without the name of the constraints.

```sql
ALTER TABLE lab_loction
DROP INDEX loc_name_un;
```