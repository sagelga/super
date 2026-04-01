# Lists of SQL command
These are a list of fundamental SQL command to use.<br>
If you liked to learn more, go to the cheatsheet that is named the same as the command name. 

## Retrieving data
| Query | Usage | Requirements | Optional Modifier |
| ----- | ----- | ------------ | ----------------- |
| **SELECT**<br>Choosing a column                  | `SELECT [column_name] ...`                | `FROM`            | `... DISTINCT [column_name]`<br>`... AS [new_column_name]`<br> `[group_function] ` |
| **FROM**<br>Choosing a table source              | `... FROM [table_name]`                   | `SELECT`          |                                 |
| **WHERE**<br>Choosing with arguments             | `... WHERE [arguments]`                   | `SELECT` & `FROM` |                                 |
| **ORDER BY**<br>Reordering result with arguments | `... ORDER BY [column_name] [ASC / DESC]` | `SELECT` & `FROM` |                                 |

## Manipulating table (object)
| Query | Usage | 
| ----- | ----- |
| **CREATE** TABLE<br>Create a new table from scratch | `CREATE TABLE [table_name] ( [constraint] [column_name] [data_type] );` | 
| **ALTER** TABLE<br>Edit table column attributes| `ALTER TABLE [table_Name]` +<br> `ADD [column_name] [data_type];` or<br> `ALTER COLUMN [column_name] [data_type];` or<br> `DROP [column_name] [data_type];` |
| **DROP** TABLE<br>Delete the table from existence<br><br>*similar : `DELETE`*| `DROP TABLE [table_name];` ||

## Data grouping
| Query | Usage | Requirements | Optional Modifier |
| ----- | ----- | ------------ | ----------------- |
| **GROUP** BY<br>Choose the group that will do the group function| `GROUP BY [column_name]` | `SELECT` & `FROM` & Column functions | `HAVING` |
| **HAVING**<br>Allows GROUP to have some arguments| `HAVING [arguments]`  | `GROUP` | |

## Manipulating data
| Query | Usage | Requirements | 
| ----- | ----- | ------------ | 
| **INSERT** INTO<br>Add new column to table| `INSERT INTO [table_name]` | `VALUES [column_values]` | 
| **UPDATE**<br>Edit column attributes| `UPDATE [table_name]`      | `SET [column_name] = [argument] WHERE[argument]` | 
| **DELETE** FROM<br>Delete column from the table| `DELETE FROM [table_name]` | `WHERE [arguments]`                             | 

## Merging data table
| Query | Usage | Requirements | 
| ----- | ----- | ------------ | 
| **INNER JOIN**<br>Result will be matched only| `INNER JOIN [table_name]` or <br>`JOIN [table_name]` | `... ON [currentTable_column_name] = [targetTable_column_name]` or<br>`... USING [key_column_Name]` | 
| **OUTER JOIN**<br>Result will be matched + some table | `LEFT JOIN [table_name]` or<br> `RIGHT JOIN [table_name]` or<br>  `FULL JOIN [table_name]` | `... ON [currentTable_column_name] = [targetTable_column_name]` or<br>`... USING [key_column_Name]` | 
| **NATURAL JOIN**<br>Automatic finding of merging key<br><br>*similar : `EQUI JOIN`*| `NATURAL JOIN [table_name]`                       | `... ON [currentTable_column_name] = [targetTable_column_name]` or<br>`... USING [key_column_Name]`|

## Additional table controls
| Query | Usage | 
| ----- | ----- | 
| **RENAME**<br>Rename a table name|`RENAME [table_name] [new_table_name]` |   
| **SET INTEGRITY**<br>Set Foreign Key Integrity Rule|`SET FOREIGN_KEY_CHECKS =  [true / false]` | 

## Transaction control
| Query | Usage | 
| ----- | ----- | 
| **COMMIT**<br>Commit all transactions created from last checkpoint|`COMMIT` |
| **ROLLBACK**<br>Revert all transactions to last checkpoint|`ROLLBACK [checkpoint_name]` |  
| **SAVEPOINT**<br>Create a new checkpoint|`SAVEPOINT [new_savepoint_name]` |  