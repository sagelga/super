# DESCRIBE
```sql
DESCRIBE [table_name];
```

all of the data column will be shown


## Describe internal data
```sql
SELECT  [table_name],
        [column_name],
        [constraint_name],
        [referenced_column_name],
        [referenced_table_name]
FROM information_schema.key_column_usage;
```

and it will show table_name, column_name, constraint_name, referenced_column_name, referenced_table_name from the table `information_schema.key_column_usage`


## Describe Internal data from 1 table
```sql
SELECT  table_name, column_name, constraint_name,
        referenced_column_name, referenced_table_name
FROM information_schema.key_column_usage
WHERE table_name = 'lab_emp'
```

this will show the constraint that is in the table of `lab_emp`
