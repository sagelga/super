# Conflict Handling
โดยหากว่ามีการทำ merge หรือคนอื่นมีการแก้ไขโค้ดของเรา หากว่าบรรทัดนั้นมีการเปลี่ยนแปลง ไม่สามารถที่จะทำการรวมบรรทัดได้

## อะไรคือ conflict
ดัวอย่างเช่น
นาย A ทำ บน branch develop และ branch ทำหน้าที่เป็น base branch และเป็น commit ที่เก่ากว่า (จาก timestamp)
```python
print("hello world")
```

และนาย B ได้ทำการแก้ไข commit บน branch feature/printer ซึ่ง branch แตกออกมาจาก branch develop โดยที่ได้แก้บรรทัดของนาย A

แก้ไขจาก
```python
print("hello world")
```

เป็น
```python
print("hello meself")
```

และมีการทำ merge ระหว่าง 2 branch นี้
ทำให้เกิดการ conflict ขื้น เพราะ git ไม่รู้ว่าจะเอาของใครเป็นของถูกต้องนั่นเอง

จึงต้องมีการแก้ไขปัญหานี้ โดยหลังจากการทำ merge แล้ว ตัวระบบ Git จะแสดงว่าไฟล์ไหนมีการ conflict เกิดขึ้น โดยจะรอให้ผู้ใช้งานแก้ไขการ conflict นี้ให้สำเร็จโดยการรอให้ทำ `git add` อีกครั้ง

เมื่อเปิดไฟล์ที่บอกว่าเกิด conflict ก็จะเห็นเป็นแบบนี้

```python
<<<<<<< HEAD
print("hello world")
===========
print("hello myself")
>>>>>>> feature/printer
```

หมายความว่า HEAD มีโค้ดเขียนว่า `print("hello world")`<br>
และ feature/printer มีโค้ดเขียนว่า `print("hello myself")`

## วิธีการแก้ไข
ต้องลบโค้ดอันใดอันหนึง (เช่นว่าเราเชื่อว่า HEAD มีโค้ดที่ผิด ก็จะลบเวอร์ชันของ HEAD ออก)
เป็นดังนี้

```python
print("hello world")
```

โดยไม่มี `<<<<<<< HEAD` หรีออันอื่นเหลืออยู๋

การทำแบบนี้ จะทำให้โค้ดกลับมาสู่จุดที่โค้ดสามารถรันได้เหมือนปกติ
