# String Format
เนื่องจากว่า บางครั้ง น้องๆอยากที่จะใช้ Python เพื่อการแสดงผลลัพท์ แต่ก็อยากให้มันเป็น Format หรือ การเรียงตัวอักษรที่น้องต้องการ<br>
จึงทำให้ น้องขี้เกียจมาพิมพ์แบบนี้

```python
var1 = 21
print("Kumamon is already", var1, "years old")
```
เพื่อจะได้ผลลัพท์ "Kumamon is already 21 years old"

วันนี้ พี่มงจึงมาสอนการใข้ `%` และ `.format()` และ `f string` ครับ

## F string method
::: tip NOTE
การใช้ F String นี้ได้เพื่มมาใน Python เวอร์ชั่น 3.6 ครับ (Reference [PIP 498](https://www.python.org/dev/peps/pep-0498/)) ดังนั้นน้องๆจำเป็นที่จะต้องใช้ Python เวอร์ชั่นอย่างน้อย 3.6 ขึ้นไป เพื่อจะใช้ method นี้ได้ครับ
:::

ในวิธีนี้ เป็นฟีเจอร์ของ Python3 ที่ต้องการที่จะผู้ใช้งานไม่ต้องไปดูว่าในลำดับไหน ใช้ค่าผลลัพท์ตัวแปรอันไหน

ตัวอย่างการใช้งาน
```python
text = "Kumamon"
number_one = 2
number_two = 1
number_three = 2.99

print(f"The answer is {number_one} + {number_two} = {number_three}. Calculated by {text}")
```

โอ้โห อ่านง่ายขึ้นเยอะเลย แต่ปัญหาคือ จะได้ผลลัพท์ที่ถูกต้องหรือเปล่าเอ่ย?
```
Python 3.7.0 (default, Oct  2 2018, 09:18:58)
[Clang 10.0.0 (clang-1000.11.45.2)] on darwin

>>> text = "Kumamon"
>>> number_one = 2
>>> number_two = 1
>>> number_three = 2.99
>>> print(f"The answer is {number_one} + {number_two} = {number_three}. Calculated by {text}")

The answer is 2 + 1 = 2.99. Calculated by Kumamon
```

โอ้ววววว ใช้ง่ายแบบนี้ต้องสอนวิธีการใช้ซะแล้ว

### How to use F String
การใช้ก็ง่ายมากเลย โดยให้ใส่ตัวอักษร `f` (เอฟ) โดยจะเป็นตัวพิมพ์เล็ก หรือ พิมพ์ใหญ่ก็ได้ครับก่อนหน้า string `""` หรือ `''`

และการเอาตัวแปรไปยัด ก็ให้ใช้ปีกกา `{}` เพื่อบอกว่าจุดนั้นคือจุดที่ตัวแปรจะไปอยู่นั่นเอง

หากใช่ง่ายแบบนี้ ก็ลองไปใช้ดูนะครับ

## `.format()` method
การใช้ method นี้ก็เพื่อทำการนำค่าในตัวแปรไปอยู่ใน string โดยที่ไม่ต้องไปทำอะไรเยอะแยะ แต่เราก็ยังต้องทำการบอกว่า ตัวแปรไหน มีค่าเท่าไหร่ และอยู่ในลำดับไหน 

### How to use `.format()`
::: tip
ตอนนี้พี่มงขอไม่เขียนก็แล้วกันนะครับ เพราะว่าอยากให้น้องไปใช้ F String กัน อิอิ
:::

## `%` formatting
เอาจริงๆ มันก็คือเครื่องหมายเปอร์เซ็นต์นั่นแหละครับ แต่ก็ทำให้มันเป็น **ที่วางตัวแปร** ได้เช่นเดียวกัน

อันนี้เป็นวิธีการใช้งานครับ น้องๆอาจจะยังไม่เข้าใจก็ไม่เป็นไร ค่อยกลับมาดูก็ได้ครับ

| **ใช้**      | %s     | %d      | %f    | %e                     |
| :------------ | ------ | ------- | ----- | ---------------------- |
| **เพื่อแสดงตัวแปรประเภท** | String | Integer | Float | เลขฐานในหลักวิทยาศาสตร์<br>(Scientific Significant) |

ตัวอย่างการใช้งาน
```python
age = 21
print("Kumamon is already %d years old" %age)
```
ก็จะได้ผลลัพท์ "Kumamon is already 21 years old" เช่นเดียวกันครับ

โดยหลักการคร่าวๆนั่นก็คือ Python จะทำการเอาตัวแปร `age` เข้าไปยัดในจุดที่ `%d` อ ยู่ ทำให้ได้ผลลัพท์ได้ออกมาแบบนั้นครับ

แล้วถ้าพี่อยากใส่มากกว่า 1 ตัวหล่ะ เช่น "My name is `<first_name>` and my age is `<age>` years old" โดยตัวแปร `<first_name>` และ `<age>` พี่จะกำหนดค่าตัวแปรเอง

หากว่าพี่ใช้วิธีโบราณ ด้วยการเอาไปแปะ (Concat) ก็ได้เขียนได้ดังนี้ครับ

```python
first_name = "Kumamon"
age = 21

print("My name is", first_name, "and my age is", age, "years old")
```

ซึ่งก็เขียนยากซะเหลือเกิน อิอิ

แต่เมื่อน้องเรียนการใช้ `%` แล่้ว น้องๆก็สามารถใช้ `%` ได้ดังนี้ครับ

```python
first_name = "Kumamon"
age = 21

print("My name is %s and my age is %d years old" %(first_name, age))
```

ก็จะได้ผลลัพท์เป็น "My name is Kumamon and my age is 21 years old" นั่นเอง

เห็นมั้ยครับ ว่ามันง่ายขึ้นเยอะ<br>
ส่วนน้องๆที่บอกว่า "พี่มงขี้โม้ มันยากกว่าเดิมหนิพี่" ก็คิดว่ามันง่ายกว่าเดิมละกันครับ และพี่ก็ไม่ได้โม้ เพราะเรายังไม่จบแค่นี้ครับ

### ตั้งการมี Space
และโจทย์ต่อไปก็คือการกำหนดขนาดของมันนั่นเอง
เพราะถ้าเราสามารถกำหนดขนาด โดยการใช้ [] ได้แล้ว พี่มงก็ว่า เราสามารถทำกับ % ได้เช่นเดียวกัน

แต่เนื่องจากว่า Python ก็ได้จัดการทำ Aligment มาให้ด้วย<br>
เช่นต้องการให้เป็นแบบนี้
```
My Name is Kumamon              naja
My Name is              Kumamon naja          
```  
นั่นก็คือการให้มันชิดขวา และ ชิดซ้ายนั่นเอง

น้องๆก็สามารถทำให้มันชิดได้ โดยการใส่ตัวเลขไปด้วย<br>
ตัวอย่างเช่น
```python
first_name = "Kumamon"
print("My Name is %-20s naja" %first_name)   
print("My Name is %20s naja" %first_name) 
```
ก็จะได้ผลลัพท์เหมือนด้านบนครับ

โดยหลักการนั่นก็คือ Python จะเว้นที่ไว้ x ช่อง (ซึ่งในตัวอย่างเว้นไว้ 20 ช่่อง)<br>
แล้วค่อยใส่ String ไปตรงนั้น

โดยหากว่า
- เป็นเลขจำนวนเป็นบวก ก็จะชิดขวา
- เป็นเลขจำนวนเป็นลบ ก็จะชิดซ้าย

### ตัดความยาว String
หลังจากได้เรียนการ align กันมาแล้ว ก็จะบอกว่ายังมี function นึงที่น้องๆอาจจะยังไม่เคยเจอ นั่นก็คือการตัดให้ได้ขนาด x ตัว

ไปดูตัวอย่างกันครับ

โดยปกติแล้ว เราก็จะใช้ [] แบบนี้
```python
first_name = "Kumamon"
print("My name is", first_name[:4])
```
ก็จะได้ผลออกมาเป็น "My name is Kuma" นั่นเอง

ซึ่งตัว `%` ก็ทำได้เช่นกันครับ ดังตัวอย่างข้างล่าง
```python
first_name = "Kumamon"
print("My name is %s", %first_name[:4])
```

แต่ก็ยังไม่[สุดๆไปเลย เหมือนเพลงของนูโว](https://www.youtube.com/watch?v=LKLH2E7uaMY) เพราะยังทำแบบนี้ได้อีกครับ
```python
first_name = "Kumamon"
print("My name is %.4s", %first_name)
```

แต่ต้องเตือนไว้ก่อน ว่าถ้าใส่ตัวเลขไปมากกว่าที่ array string มีอยู่ ก็จะเป็นแบบนี้ครับ
```python

```

## String with ASCII
![https://i.stack.imgur.com/X4yts.png](https://i.stack.imgur.com/X4yts.png)
*Reference : https://i.stack.imgur.com/X4yts.png*

ต้องอธิบายก่อนว่า ปกติแล้วโปรแกรมคอมพิวเตอร์ทุกอัน ได้ทำการเปลี่ยนการจัดเก็บข้อมูลแบบ string หรือ character ให้มาเป็นตัวเลขทั้งหมด เพื่อจะเอาไปเก็บเป็น binary ทีหลัง

ดังนั้น ASCII จึงเกิดขึ้น โดยการบอกให้ว่า เลขนี้ เท่ากับตัวอักษรอะไร และตัว Python จึงไปทำการคำนวณต่อ ว่าให้ทำอะไรต่อไป

ดังนั้นวันนี้เราจะมาลองเล่นดูครับ

### การเปลี่ยน String ไปเป็น ASCII โดยใช้ `ord()`
การเปลี่ยน character ไปเป็น ASCII ก็สามารถทำได้ง่ายๆ โดยการใช้ function `ord()` ครับ และใส่ character ไปเป็น input parameter ของฟังก์ชั่น
```python
print(ord('A'))         # Print out 65
print(ord('B'))         # Print out 66
print(ord('A') + 1)     # Print out 66
```

### การเปลี่ยน ASCII ไปเป็น String โดยใช้ `chr()`
เปลี่ยนตัวเลข (ย้ำว่าควรเป็นประเภท integer อยู่) ก็สามารถทำได้โดยการใช้ฟังก์ชั่น `chr()` และใส่ตัวเลขเข้าไปเป็น input parameter ของฟังก์ชั่น
```python
print(chr(65))      # Print out 'A'
print(chr(65+1))    # Print out 'B'
print(chr(65+2))    # Print out 'C'

var = 65
print(chr(var)) # Print out 'A'
```

## String to change case
เปลี่ยนตัวอักษรไปเป็น lowercase     `.lower()` <br>
เปลี่ยนตัวอักษรไปเป็น uppercase     `.upper()` <br>
สลับตัวอักษรระหว่าง lower/upper    `.swapcase()` <br>

เช็คว่าตัวอักษรนั้นเป็น lowercase ทั้งหมดหรือไม่    `.islower()` <br>
เช็คว่าตัวอักษรนั้นเป็น uppercase ทั้งหมดหรือไม่    `.isupper()` <br>
เช็คว่าตัวอักษรนั้นเป็นตัวเลขทั้งหมดหรือไม่          `.isdigit()` <br>
เช็คว่าตัวอักษรนั้นเป็นตัวอักษรทั้งหมดหรือไม่         `.isalpha()` <br>

### Using .lower()
```python
return text.lower()
# If text = "KUMAMON", returns "kumamon"
# If text = "KuMaMoN", returns "kumamon"
# If text = "kumamon", returns "kumamon"
```

### Using .upper()
```python
return text.upper()
# If text = "KUMAMON", returns "KUMAMON"
# If text = "KuMaMoN", returns "KUMAMON"
# If text = "kumamon", returns "KUMAMON"
```

### Using .swapcase()
```python
return text.swapcase()
# If text = "KUMAMON", returns "kumamon"
# If text = "KuMaMoN", returns "kUmAmOn"
# If text = "kumamon", returns "KUMAMON"
```

### Using .isupper() & .islower()
```python
<string>.islower()
<string>.isupper()

text = "K"
return text.islower() # Returns false
return text.isupper() # Returns true

text = "k"
return text.islower() # Returns true
return text.isupper() # Returns false
```

### Using .isdigit() & .isalpha()
```python
How to use:
<input variable>.isdigit()
-> Returns True or False

<input variable>.isalpha()
-> Returns True or False

text = "12"
return text.isdigit() # Returns true
return text.isalpha() # Returns false

text = "ABC"
return text.isdigit() # Returns false
return text.isalpha() # Returns true
```