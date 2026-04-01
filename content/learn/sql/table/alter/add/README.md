# ALTER ADD
## Add more rows to the table
```sql
ALTER TABLE table_name
ADD column_name datatype;
```

## Adding constraints to the table
```sql
ALTER TABLE lab_location
ADD PRIMARY KEY (location_id);
```

this will set `location_id` to be primary key

## Adding `Foreign Key` to the table
```sql
ALTER TABLE lab_location
ADD CONSTRAINT 'lab_emp_fk'
FOREIGN KEY (location_id)
REFERENCES lab_location(location_id);
```

## Adding `UNIQUE` to the table
```sql
ALTER TABLE lab_location
ADD UNIQUE (location_id)
```

or
```sql
ALTER TABLE lab_location
ADD CONSTRAINT 'UNIQUE_location_id' UNIQUE (location_id);
```