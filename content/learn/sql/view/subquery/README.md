# Subquery
โดยภายใน Subquery ก็จะมี SQL ที่เอาไว้เลือก (SELECT, FROM, WHERE) แต่ด้วยการใช้ subqueries ก็จะสามารถเลือกวิธีการ JOIN ตารางได้

In = จะเลือกข้อมูลที่มี attribute บางข้อมูลใน subqueries ที่เหมือนกันกับของ query หลัก
Any = บางข้อมูลใน subqueries (แต่สามารถใส่ `>` `<` `>=` พวกนี้ได้)
All = ทุกข้อมูลใน subqueries (สามารถใส่ `>` `<` `>=` พวกนี้ได้)

แสดงพนักงานที่ได้รับเงินเดือนตำ่สุดของแผนกต่างๆ
```sql
SELECT employee_id, last_name, job_id, salary
FROM employees
WHERE salary IN (
                  SELECT MIN(salary)
                  FROM employees
                  GROUP BY department_id
                );
```
แสดงข้อมูล employee ที่ได้เงินเดือนน้อยกว่าเงินเดือนพนักงานที่มีรหัสพนักงาน = ‘IT_PROG’ บางคน และไม่แสดงพนักงานที่มีรหัสงาน IT_PROG

```sql
    SELECT employee_id, last_name, job_id, salary
    FROM employees
    WHERE salary < ALL(
                    SELECT salary
                    FROM employees
                    WHERE job_id = 'IT_PROG')
    AND job_id <> 'IT_PROG';
```
