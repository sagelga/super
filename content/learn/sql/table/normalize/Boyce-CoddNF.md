# Boyce-Codd Normal Form (3.5 NF)
เนื่องจากว่า 3NF นั้นยังมีปัญหาในจุดที่
บางกรณีที่ relation มี candidate key มากกว่า 1 ตัว และเป็น 3NF แล้วยังมีข้อมูลที่ซ้ำซ้อนอยู่
เนื่องจากว่า FD ของ non-prime attribute ไปอธิบาย primary key ได้

## กฎการเป็น BCNF
- ต้องไม่มี attribute (ทั้ง non-prime และ prime) อธิบาย primary key ได้ (Trivial Functional Dependency)
- ตัวที่ไปชี้อีก attribute ต้องเป็น superkey หรือ candidate key

```sql
Teach(Student_id, Course_code, Instructor_id)
```

`Instructor_id` สามารถอธิบาย Key Attribute `Course_code` ได้ ทำให้ relation นี้ไม่เป็น BCNF

## การแก้ไข
ดังนั้นต้องทำการแตกตาราง โดยเอา `Instructor_id` กับ `Course_code` ไปอยู่ตารางใหม่

```sql
Enroll(Student_id, Instructor_id)
Teach(Instructor_id, Course_code
```
