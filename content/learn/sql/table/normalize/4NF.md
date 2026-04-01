# Forth Normal Form (4 NF)
## กฎการเป็น 4NF
- เป็น 3NF
- ห้ามมี Nontrivial Multivalued Dependency มากกว่า 1 ชุด

**Nontrival Multivalued Dependency**
เมื่อ relation มีการบอกว่า
```
X ->> Y
ค่า X หนึ่งค่า กำหนด Y หลายค่า (X multidetermine Y)

X ->> Z
ค่า X หนึ่งค่า กำหนด Z หลายค่า (X multidetermine Z)

และ Y กับ​ Z เป็นอิสระต่อกัน
```

หากเอาไปเขียนใน ER จะแสดงเป็นรูปของ Multivalued Attribute (Weak Entity Type)

## ตัวอย่าง
```sql
Employee(Emp_id, Proj_no, Dep_id)
```
โดยทุกตัวเป็น Key ทั้งหมด และ Emp_id ->> Proj_no และ Emp_id ->> Dep_id และ Proj_no กับ Dep_id เป็นอิสระต่อกัน

จึงบอกได้ว่า ไม่เป็น 4NF

## การแก้ไข
จะต้องแตกตาราง Employee มาเป็น 2 Schema
```sql
Emp_Proj(Emp_id, Proj_no)
Emp_Dep(Emp_id, Dep_id)
```
ทำให้ตารางน้ีไม่มี Nontrival Multivalued Dependency แล้ว (มี Trivial Multivalued Dependency แทน)
