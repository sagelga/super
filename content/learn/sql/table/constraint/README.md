# Lists of database definition
`constraint` `table` `key`

[[toc]]
## Primary Key (PK)
Attribute that can represents the row (which each column can be referenced from the primary key). It **must be unique** from all rows and they **cannot be null** (for reference issue) So, Primary key will automatically have *unique* and *not null* constraint.

Primary Key *should* have these properties
- Short
- Number
- Simple
- Never change

There should be *only* one Primary Key (or use Foreign Key) in the table as [Second Normal Form](/Normalization/2NF.md)

## Surrogate Key (Replacement Key)
When there is no attribute that is good enough to be a key (For example, `first_name` cannot explains `salary`, so the `first_name` should not be a Primary Key). Replacement key is generated.

Surrogate key is an attribute that **is born to be** Primary Key.<br>
and use *automatic increment* constraint for easier management.

Mostly a system-generated key and have a property of Primary Key

::: warning
Create a surrogate key when there is no attribute that is a good key.<br>
If there is an attribute that is good enough already, don't create surrogate key.
:::

## Automatic Incremental (AI)
For use with Primary Key.<br>
Will create new value of primary key (for example 1, 2, 3, 4) to make Primary Key remains Unique and Not Null

## Unique (UQ) + Not Null (NN)
It explains itself.

Unique column means that cell in that column cannot have duplicate value.
For example, `Sam` and `Sam` is not allowed, but `Sam` and `Tom` is allowed to be in the same table. Unique is a table-level constraint, thus requires all input to take care of this constraint

Not Null column means that cell in that column cannot be Null value

## Foreign Key (FK)
When the table have a relationship with another table, some table will requires to have the same id for referencing to each other. 

Foreign Key is a key that can be used to determined all columns in the table.

## Reference Foreign Key (Ref. FK)
To reference the parent table, *Ref. FK* need to be specified. For example `Employees(id)`. For more information on how to choose where to place Foreign Key at, see [Relationship](/Overall/Relationship/)

This is a recap for `ON DELETE` and `ON CASCADE`
|Option|Benefit|
|-|-|-|
|No action|Performed update or delete operation in the parent table will fail with an error|
|Cascade|Same action performed on the referenced values of the parent table will be reflected to the related values in the child table|
|Null|If the referenced values in the parent table are deleted or modified, all related values in the child table are set to NULL value|
|Default|If the referenced values in the parent table are updated or deleted, the related values in the child table with FOREIGN KEY columns will be set to its default value.|