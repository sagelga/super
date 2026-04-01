# INSERT into
## Syntax
```sql
INSERT INTO table_name (column_name, column_name, ...)
    VALUES (value, value, ...), (value, value, ...), ...;
```
```

## Example One
Category : `full insert`<br>
Insert these following data to the `Employees` table.
|`id`<br>(not `PK`)|`first_name`|`last_name`|`salary`|
|-|-|-|-|
|222|'Sam'|'Smith'|200|

this is how you write it into SQL format

<<< @/code/Insert/insert-example-one.sql

### Example Two
Category : `selective insert`<br>
Insert these following data to the `Employees` table.
|`id`<br>(`PK`)|`first_name`|`last_name`|`salary`|
|-|-|-|-|
||'Sam'|'Smith'|200|

In this case, you will not insert `id` attribute by yourself. (because `AI` constraint) So we have to let that to be blank.

Now, we have to specify a column to let data to be insert into.

<<< @/code/Insert/insert-example-two.sql

### Example Three
Category : `explicit null` `selective insert`<br>
Insert these following data to the `Employees` table.
|`id`<br>(`PK`)|`first_name`|`last_name`|`salary`|
|-|-|-|-|
||'Sam'|'Smith'|200|
||'Jeff'|'Jeff'||

In this case, some value is not being specified. We must include something to make the script run.

We can add `Null` to the value, as following

<<< @/code/Insert/insert-example-three.sql

### Example Four
Category : `implicit null` `selective insert`<br>
Insert these following data to the `Employees` table.
|`id`<br>(`PK`)|`first_name`|`last_name`|`salary`|
|-|-|-|-|
||'Sam'|'Smith'||
||'Jeff'|'Jeff'||

In this case, salary is not given but the table have the columns to keep it.

<<< @/code/Insert/insert-example-three.sql

::: tip Note
If not given any value, SQL will set data value to default value. (Null is default of default value)<br>
You can set the default value when creating a new table or modifying a column settings.
:::
