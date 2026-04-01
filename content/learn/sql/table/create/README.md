# CREATE table
## Syntax
``` sql
CREATE TABLE [table_name] (
[column_name] [data_type] [column_constraint],
[column_name] [data_type] [column_constraint],
[column_name] [data_type] [column_constraint],
   ....
[table_constraint],
);
```

You can find more information about [Data Types](/Overall/DataType/) and [Constraints](/Overall/Table/) in the following link.

::: tip
Create a table without determining a primary key is not a good idea.
:::

## Example
### Example One
Create a table `Employees` with following columns and data types

| Name       | Data Type    | PK  | AI  | UQ  | NN  | FK  | Ref. FK |
| ---------- | ------------ | --- | --- | --- | --- | --- | ------- |
| id         | INT(10)      |
| first_name | VARCHAR(255) |
| last_name  | VARCHAR(255) |
| salary     | INT(10)      |

and the result will come out like this
``` sql
CREATE TABLE Employees (
    id          INT(10),
    first_name  VARCHAR(255),
    last_name   VARCHAR(255),
    salary      INT(10)
);
```

::: tip Note
Margining the datatypes or constraints is not required by SQL compiler, but we do it for cleaner reading.
:::

## Create `PRIMARY KEY` constraints
### Example One
Create a table `Employees` with following columns and data types.<br>
This time, we choose `id` attribute as the table Primary Key.

| Name       | Data Type    | PK                      | AI  | UQ  | NN  | FK  | Ref. FK |
| ---------- | ------------ | ----------------------- | --- | --- | --- | --- | ------- |
| id         | INT(10)      | :ballot_box_with_check: |
| first_name | VARCHAR(255) |
| last_name  | VARCHAR(255) |
| salary     | INT(10)      |

``` sql
CREATE TABLE Employees (
    id          INT(10),
    first_name  VARCHAR(255),
    last_name   VARCHAR(255),
    salary      INT(10),

    PRIMARY KEY 'PK_Employees_id' (id)
);
```

::: tip Note
Table constraint name is not required to be in format. You will have to remember it to delete that constraint.
:::

### Example Two
Create a table `Employees` with following columns and data types.<br>
This time, we choose `id` **and** `first_name` attribute as the table Primary Key (As a Composite Primary Key)

| Name       | Data Type    | PK                      | AI  | UQ  | NN  | FK  | Ref. FK |
| ---------- | ------------ | ----------------------- | --- | --- | --- | --- | ------- |
| id         | INT(10)      | :ballot_box_with_check: |
| first_name | VARCHAR(255) | :ballot_box_with_check: |
| last_name  | VARCHAR(255) |
| salary     | INT(10)      |

``` sql
CREATE TABLE Employees (
    id          INT(10),
    first_name  VARCHAR(255),
    last_name   VARCHAR(255),
    salary      INT(10),

    PRIMARY KEY 'PK_Employees_id_first_name' (id, first_name)
);
```

## Adding `FOREIGN KEY` constraints
Similar to Primary Key, but we have to point the Foreign Key to another table attribute.

### Example One
Create a table `Employees` with following columns and data types.

This time, `workplace_id` attribute is created to let employees know that which `Workplace` are they in by connecting it to `id` attribute (`Workplace` mandatory one---optional many `Employees`)<br>
But they requires another key (`id`) to identify each employee. Which generates composite key.

So this is how `Employees` table are designed.

| Name         | Data Type    | PK                                          | AI  | UQ  | NN  | FK                      | Ref. FK         |
| ------------ | ------------ | ------------------------------------------- | --- | --- | --- | ----------------------- | --------------- |
| workplace_id | INT(10)      | :ballot_box_with_check: with `id`           |     |     |     | :ballot_box_with_check: | Expense(salary) |
| id           | INT(10)      | :ballot_box_with_check: with `workplace_id` |     |     |     |                         |                 |
| first_name   | VARCHAR(255) |                                             |     |     |     |                         |                 |
| last_name    | VARCHAR(255) |                                             |     |     |     |                         |                 |
| salary       | INT(10)      |                                             |     |     |     |                         |                 |

``` sql
CREATE TABLE Employees (
    workplace_id    INT(10),
    id              INT(10),
    first_name      VARCHAR(255),
    last_name       VARCHAR(255),
    salary          INT(10),

    PRIMARY KEY 'PK_Employees_id_first_name' (id, workplace_id)
    CONSTRAINT 'FK_workplace_id' FOREIGN KEY (workplace_id) REFERENCES Workplace(id)
);
```

## Foreign Key additional constraints
Foreign key might be delete easily, so you can put options on what to do when the record in other table is gone or update

::: warning
You can choose **only one** option for each one. Choose wisely.
:::

### ON DELETE
When other table record is gone, what do the record in this table do?

| Option    | Syntax                  | Benefit                                         |
| --------- | ----------------------- | ----------------------------------------------- |
| No action | `ON DELETE`             | Will not allow deletion on parent table         |
| Cascade   | `ON DELETE CASCADE`     | Will delete the row to the same value as parent |
| Null      | `ON DELETE SET NULL`    | Will use null value instead                     |
| Default   | `ON DELETE SET DEFAULT` | Will use default value instead                  |

By adding these constraints, the row will safely delete (able to delete normally). If not, the **reference integrity will blocked you** from deleting the row.

### ON UPDATE
When other table record get updated, what do the record in this table do?

| Option  | Syntax                  | Benefit                                         |
| ------- | ----------------------- | ----------------------------------------------- |
| -       | `ON UPDATE`             | Will not allow update on parent table           |
| Cascade | `ON UPDATE CASCADE`     | Will update the row to the same value as parent |
| Null    | `ON DELETE SET NULL`    | Will use null value instead                     |
| Default | `ON DELETE SET DEFAULT` | Will use default value instead                  |

by adding these constraints, the row will delete safely (able to delete normally). If not, the reference integrity will blocked you from deleting the row.

## Adding `NOT NULL` constraints
### Example One
Create a table `Employees` with following columns and data types.<br>
This time, we choose `id` attribute as the table Primary Key.

| Name       | Data Type    | PK                      | AI  | UQ  | NN                      | FK  | Ref. FK |
| ---------- | ------------ | ----------------------- | --- | --- | ----------------------- | --- | ------- |
| id         | INT(10)      | :ballot_box_with_check: |
| first_name | VARCHAR(255) |                         |     |     | :ballot_box_with_check: |
| last_name  | VARCHAR(255) |                         |     |     | :ballot_box_with_check: |
| salary     | INT(10)      |

```sql
CREATE TABLE Employees (
    id          INT(10),
    first_name  VARCHAR(255) NOT NULL,
    last_name   VARCHAR(255) NOT NULL,
    salary      INT(10),

    PRIMARY KEY 'PK_Employees_id' (id)
);

```

## Adding `UNIQUE` constraints
Adding a unique constraint will force new entries to have different unique value. Primary key is unique as a default.

### Example One
Create a table `Employees` with following columns and data types.<br>
We choose `id` attribute as the table Primary Key.<br>
and let the `first_name` attribute to be unique.

| Name       | Data Type    | PK                      | AI  | UQ                      | NN  | FK  | Ref. FK |
| ---------- | ------------ | ----------------------- | --- | ----------------------- | --- | --- | ------- |
| id         | INT(10)      | :ballot_box_with_check: |
| first_name | VARCHAR(255) |                         |     | :ballot_box_with_check: |
| last_name  | VARCHAR(255) |
| salary     | INT(10)      |

``` sql
CREATE TABLE Employees (
    id          INT(10),
    first_name  VARCHAR(255),
    last_name   VARCHAR(255),
    salary      INT(10),

    UNIQUE (first_name),
    PRIMARY KEY 'PK_Employees_id_first_name' (id, first_name)
);
```

### Example Two
Create a table `Employees` with following columns and data types.<br>
We choose `id` attribute as the table Primary Key.<br>
and let the `first_name` **and** `last_name` attribute to be unique (as composite unique constraint).

| Name       | Data Type    | PK                      | AI  | UQ                                        | NN  | FK  | Ref. FK |
| ---------- | ------------ | ----------------------- | --- | ----------------------------------------- | --- | --- | ------- |
| id         | INT(10)      | :ballot_box_with_check: |
| first_name | VARCHAR(255) |                         |     | :ballot_box_with_check: with `last_name`  |
| last_name  | VARCHAR(255) |                         |     | :ballot_box_with_check: with `first_name` |
| salary     | INT(10)      |

``` sql
CREATE TABLE Employees (
    id          INT(10),
    first_name  VARCHAR(255),
    last_name   VARCHAR(255),
    salary      INT(10),

    UNIQUE (first_name, last_name),
    PRIMARY KEY 'PK_Employees_id_first_name' (id, first_name)
);
```

### Example Three
Create a table `Employees` with following columns and data types.<br>
We choose `id` attribute as the table Primary Key.<br>
and let the `first_name`, `last_name` attribute to be **individually** unique.

| Name       | Data Type    | PK                      | AI  | UQ                      | NN  | FK  | Ref. FK |
| ---------- | ------------ | ----------------------- | --- | ----------------------- | --- | --- | ------- |
| id         | INT(10)      | :ballot_box_with_check: |
| first_name | VARCHAR(255) |                         |     | :ballot_box_with_check: |
| last_name  | VARCHAR(255) |                         |     | :ballot_box_with_check: |
| salary     | INT(10)      |

``` sql
CREATE TABLE Employees (
    id          INT(10),
    first_name  VARCHAR(255),
    last_name   VARCHAR(255),
    salary      INT(10),

    UNIQUE (first_name),
    UNIQUE (last_name),
    PRIMARY KEY 'PK_Employees_id_first_name' (id, first_name)
);
```

::: danger
Composite unique and 2 individual unique are not the same.<br>
Composite unique requires `first_name` **and** `last_name` to be the same to reject the input. As shown in comparison below.

| Input<br>(as `first_name` and `last_name`) | 2 Individual Unique Constraint | Composite Unique Constraint |
| ------------------------------------------ | ------------------------------ | --------------------------- |
| **Sam** Smith, **Sam** Mercury, Jeff Sam   | :x:                            | :o:                         |
| **Sam Smith**, **Sam Smith**, Sam Sam      | :x:                            | :x:                         |
| Jeff **Smith**, Sam Mercury, Tom **Smith** | :x:                            | :o:                         |
:::

## Create new table another table
You can use the queries to create new table by using `as` to join the query together.

### Example One
Create a new table `NewEmployees` from the query of `Employees` table.

``` sql
SELECT first_name
FROM Employees
WHERE salary BETWEEN 2000 AND 5000;
```

and the code will go as following

``` sql
CREATE TABLE NewEmployees
AS  SELECT first_name, last_name, salary
    FROM Employees
    WHERE salary BETWEEN 2000 AND 5000
```

::: tip
As you can see, there is no need to set up the constraits. Some constraints are also copied from the reference table
:::
