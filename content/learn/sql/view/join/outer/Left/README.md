# Outer - Left Join
![Select all from Table A, along with records from Table B for which the join condition is met (if at all).](https://static1.squarespace.com/static/5732253c8a65e244fd589e4c/t/5744bdad40261de572cbbc49/1464122809233/?format=300w)

ตัวตารางฝั่งซ้าย (order) จะมีค่า NULL value
```sql
SELECT *
FROM order
LEFT OUTER JOIN product
USING (P_Code);
```
มีข้อมูล order ครบ
บรรทัดที่ product ไม่มีข้อมูลก็จะเขียน NULL

หมายความว่า ตาราง จะมีข้อมูล ORDER (ตารางฝั่งซ้าย) ทั้งหมดทุก ROW แต่จะมีข้อมูลฝั่งขวาที่จะมี NULL ได้
