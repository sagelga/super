# Inner - Equijoin
The old style join method.
```sql
    SELECT *
    FROM employees,departments
    WHERE employees.department_id = department.department_id
```
and the common attribute will be shown

Equijoin = Calculate from Cartesian Product → Match the rows that have a match on WHERE statement → Merge the table → Remove the foreign key

To merge the table, the common key need to be typed in, else the sql may not able to merge them (because they can have multiple common attribute

```sql
    SELECT *
    FROM employee e, departments d, locations l
    WHERE e.department_id = d,.department_id
    AND d.location_id = l.location_id
```
