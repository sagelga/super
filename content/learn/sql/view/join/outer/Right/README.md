# Outer - Right Join
![Select all from Table B, along with records from Table A for which the join condition is met (if at all).](https://static1.squarespace.com/static/5732253c8a65e244fd589e4c/t/5744bd78d210b89c3e15a4a9/1464122755467/?format=300w)

```sql
SELECT *
FROM order
RIGHT OUTER JOIN product
USING (P_Code);
```

มีข้อมูล product ครบ
บรรทัดที่ไม่มี order ที่ถูก ก็จะเขียน NULL
