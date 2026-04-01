# DROP TABLE

Drop table will **delete the table**

```sql
DROP TABLE [table_name];
```

## DROP table with foreign key

In the normal `drop`, there is no foreign key to worried about. But when you need to drop a table that have a foreign key constraint, the **Reference Integrity Constraint** comes in. So we need to revoke the constraint check for a while

```sql
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE employee;
```

and do not forget to turn the check on
```sql
SET FOREIGN_KEY_CHECKS = 1;
```
