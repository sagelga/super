# SELECT & FROM
เพื่อที่จะเข้าถึงข้อมูลภายใน Database เราจะต้องใช้คำสั่งนั่นก็คือ `SELECT` และ `FROM`
โดยที่ `SELECT` จะทำหน้าที่เลือก column ที่เกี่ยวข้องในตารางออกมา
และ `FROM` จะทำหน้าที่เลือก table ที่เกี่ยวข้องในตารางออกมา

``` sql
SELECT [column_name]
FROM [table_name];
```

::: tip
เราควรที่จะเลือก column ที่เราต้องการใช้งานเท่านั้นเพื่อทำให้การใช้งานของผู้ใช้นั้นเร็วขึ้น
:::

### เลือกทั้งหมด
เพื่อที่จะเลือกทุก column ออกมา ให้ใช้ `SELECT *`

``` sql
SELECT *
FROM Employees;
```

::: tip
ข้อดี: หากว่ามีคนทำการลบชื่อ column ออกไป เราก็จะไม่ได้รับผลกระทบอะไร เพราะก็เลือกทุกอันอยู่แล้ว

ข้อเสีย: ช้ากว่าการเรียกบาง column
:::

## เลือกบาง Column จากตาราง
เพื่อที่จะเลือกบาง column ออกมา ให้เขียนชื่อ column หลังจาก SELECT และตามด้วย , หากต้องการหลาย column

``` sql
SELECT first_name, last_name
FROM Employees;
```

## Select `DISTINCT` column
`DISTINCT` keyword is used when you want to get a *unique* values as a output. So the result does not have duplicate values in that selected column(s).

``` sql
SELECT DISTINCT salary
FROM Employees;
```

the result will not have duplicates (because using `DISTINCT` keyword)

### Modify the result with calculations
``` sql
SELECT salary, salary * 100
FROM Employees;
```

and that will show the salary column and the column that is a value of the salary times 100.

## Change column name
### Temporary change column name with `AS`
``` sql
SELECT first_name AS `First Name`
FROM Employees;
```

`AS` keyword also can be skipped.
NOTE : use backslash \` to marked it as a string

### Use `CONCAT` to merge row-column value
``` sql
SELECT CONCAT(last_name, ' is a ', job_id)
    AS `Employee Details`
FROM Employees;
```

-----
#### Resource
- CodeAcademy [https://www.codecademy.com/courses/learn-sql/lessons/queries/exercises/distinct?action=resume_content_item](https://www.codecademy.com/courses/learn-sql/lessons/queries/exercises/distinct?action=resume_content_item)
