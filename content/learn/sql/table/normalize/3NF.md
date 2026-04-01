# Third Normal Form (3 NF)
เกิดมาเพื่อเพื่มประสิทธิภาพในการ process ของ database และลด storage cost

## กฎเพื่อเป็น 3NF
- ต้องเป็น 2NF แล้ว
- ต้องไม่มี non-prime attribute ที่สามารถอธิบาย non-prime attribute (Transitive Dependency)

**Transitive Dependency**


## ตัวอย่าง
```sql
Emp_Dept(Emp_id, Emp_name, Dep_no, Dep_name, Manager_id)
```
เนื่องจากว่า Dep_no เป็น non-prime attribute ที่สามารถอธิบาย Dep_name และ Manager_id ได้
ทำให้ relation นี้ไม่ใช่ 3NF

## การแก้ไข
ก็ต้องทำการแตกตารางใหม่เป็น
```sql
Employee(Emp_id, Emp_name, Dep_no)
Department(Dep_no, Dep_name, Manager_id)
```
โดยที่ Dep_no จะทำหน้าเป็น Foreign Key ในตาราง Employee เพื่อให้สามารถไปเชื่อมกับ attribute ตัวอื่นใน Department ได้
