# โมดูลคืออะไร
> In computer science, a library is a collection of non-volatile resources used by computer programs, often for software development. These may include configuration data, documentation, help data, message templates, pre-written code and subroutines, classes, values or type specifications. -- Wikipedia.com

ก็จะสรุปได้ว่า เป็น collection ที่มีฟังก์ชั่นที่เขียนไว้แล้ว ให้นักพัฒนาได้เอาไปใช้นั่นเอง

## Importing Library
ถ้าน้องๆต้องการที่จะใช้ `library math` น้องๆก็จำเป็นที่ต้องโหลดมันซะก่อน โดยมีอยู่ 2 วิธีครับ

- โหลดตัว function ที่จะใช้จริง
- โหลด function ทุกตัวที่อยู่ใน library

แต่เนื่องจากว่า ถ้าน้องโหลดทุกตัวมา มันก็จะกินทรัพยากรเครื่องมากกว่า แต่ก็ไม่เป็นอะไรหรอกครับ ทรัพยากรเหลือเยอะแยะนะ อิอิ

### โหลดทุก method ใน `math`
```python
import math
```

หรือหากว่าน้องอยากที่จะเปลี่ยนชื่อ library ไปเป็นตามสไตล์ของน้องเอง ก็สามารถทำได้ครับ

```python
import math as quickmaffs
```

โดยคำว่า `as` นั้นจะทำให้น้องเปลี่ยนชื่อของ library ได้ทำให้น้องเรียก `quickmaffs.ceii()` แทน `math.ceil()` ได้ครับ

ตัวอย่างการใช้งาน function เมื่อโหลดมาแล้ว

```python
print(math.ceil(12.5))
```

สังเกตว่าจะมีการเขียน `math` ไว้หน้าชื่อฟังก์ชั่นด้วยนะครับ

::: warning
แต่เปลี่ยนแล้ว เปลี่ยนกลับไม่ได้นาจาา ยกเว้นว่าจะ import ใหม่ครับ
:::

### โหลดบางตัว
ใน ณ​ ตอนนี้อาจจะยังไม่ต้องเรียนก็ได้ครับ เพราะอันที่แล้วก็เพียงพอ แต่ถ้าอยากก็ไม่ว่าอะไรครับ

```python
from math import ceil
```

สังเกตว่าชื่อ library อยู่ที่หลัง `from` และชื่อ function จะอยู่หลัง `import`

ทำให้การเรียกใช้งานไม่ต้องมี `math.` แล้ว เรียกเหมือนฟังก์ชั่นธรรมดาได้เลย

ตัวอย่าง
```python
print(ceil(12.5))
```
