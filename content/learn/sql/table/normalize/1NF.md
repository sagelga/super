# First Normal Form (1 NF)
Relation จะต้องไม่สามารถแบ่งย่อยได้อีก (atomic attribute) และ attribute มีเพียงค่าเดียว (single attribute)

## กฎการเป็น 1NF
- Relation ไม่มี attribute ที่มีหลายค่า (multivalue attribute)
- Relation ไม่มี attribute องค์ประกอบ (composite attribute)

## ตัวอย่าง
```sql
ORDER(Order_id, Order_date, Product_id, Amount)
```

เนื่องจากว่า Order นึงสามารถที่จะมีหลาย Product_id ได้ เลยทำให้ relation นี้ยังไม่เป็น 1NF

## การแก้ไข
สร้างตารางใหม่ ที่ให้ Order มีการเชื่อมกับ Product แบบ Many to Many (ต้องแตกออกมาเป็นตารางใหม่)

```sql
Customer(Cus_id, Cus_FName, Cus_LName, Cus_Address)
```

เนื่องจากว่า Cus_Address เป็น Composite Attribute เลยทำให้ relation นี้ไม่ใช่ 1NF

การแก้ไขคือการแตก Composite Attribute ออกมา เช่น Cus_Province เป็นต้น
