# Second Normal Form (2 NF)
## กฎของการเป็น 2NF
- ต้องเป็น 1NF ก่อน
- ทุก attribute ที่ไม่ใช่ key (non-prime attriubute) จะต้องขึ้นกับ primary key (functional dependency)
- ห้ามมี attribute ที่เป็นส่วนหนึ่งของบาง key ที่เป็น primary key เท่านั้น (partial dependency)

**Functional Dependency**
เป็นการแสดงถึงการเชื่อมกันของ attribute

**Partial Dependency**
หาก relation มีคีย์หลักเป็น composite key (คีย์หลักที่ประกอบด้วยแอตทริบิวต์มากกว่าหนึ่ง) และมีบาง attribute ของคีย์หลักที่สามารถกำหนดค่าของแอตทริบิวต์อื่นได้ -> เกิด partial dependency หรือบางแอตทริบิวต์ขึ้นอยู่กับบางส่วนของคีย์ -> รีเลชันไม่มีคุณสมบัติ 2NF

## ​ตัวอย่าง
```sql
            ------------------|
            |         ------------------
            |        |        |         |
Emp_Proj(Emp_No, Proj_no, Emp_name, Proj_name, No_hour)
```

เนื่องจาก primary key ของ relation EMP_PROJ คือแอตทริบิวต์ Emp_id
และ Proj_no (เป็น composite key)

ดังนั้น ทุกแอตทริบิวต์จะต้องขึ้นอยู่กับคีย์หลักทั้งสองแอตทริบิวต์

แต่จะเห็นได้ว่า Proj_no สามารถกำหนดค่าของ Proj_name ได้ (Proj_no → Proj_name)
และ Emp_id ก็สามารถกำหนดค่า Emp_name ได้เช่นกัน (ซึ่ง FD ทั้งสอง เป็น partial dependency)

## การแก้ไข
ต้องทำการแยกตารางออกเป็น
```sql
Employee(Emp_no, Emp_name)
Project(Proj_no, Proj_name)

และมี

Employee_Project(Emp_no, Proj_no, no_hour)
```
