# SAVEPOINT

`SAVEPOINT` เอาไว้เพื่อหากต้องทำการ rollback เพียงบางส่วน แต่ยังไม่ได้ทำการ commit

สร้าง savepoint
```sql
SAVEPOINT <savepoint_name>
```
ทำการ rollback สู่ savepoint

    ROLLBACK TO SAVEPOINT <savepoint_name>

## Transaction Log
เก็บว่ามีการเปลี่ยนแปลงอะไรบ้างระหว่างการรอ COMMIT หรือ REVERT<br>
ผู้ใช้จะต้องทำการ COMMIT เพื่อเก็บข้อมูลใหม่ โดยที่ DBMS จะทำการ lock database ที่มีการเปลี่ยนแปลง เพื่อรอให้คนที่แก้ ทำการ COMMIT

ผู้ใช้คนอื่นจะยังไม่เห็นการเปลี่ยนแปลงของ database หากผู้ใช้ยังไม่ทำการ COMMIT

เมื่อ COMMIT แล้ว
- ข้อมูลที่มีการแก้จะถูกบันทึก
- ข้อมูลก่อนหน้าจะถูกเปลี่ยนไป
- ผู้ใช้ทุกคนดู transaction ได้
- Savepoint จะถูกลบ
