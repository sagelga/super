# โมดูล Math
หลังจากน้องๆได้ลองเล่น function แบบ built-in กันไปแล้ว<br>

สำหรับน้องๆที่ยังไม่เข้าใจว่า built-in function คืออะไร ก็ให้ไปเรียน concept ของมันซะก่อนนะครับ

แต่ใน lecture นี้ พี่มงก็จะทำการอธิบายเกี่ยวกับ module `math` นั่นเอง

## ฟังก์ชั่นที่ควรรู้ไว้
เนื่องจากมันมีเยอะมากๆๆๆๆๆ พี่มงก็เลยเลือกอันที่ต้องใช้บ่อยๆมาแล้วกันครับ อันอื่นๆ น้องอาจจะเข้าไปดูได้ในเว็บไซต์ของ Python.org ครับ

### Absolute Values
Make the integer or float becomes positive only.
```python
math.fabs([value])
```
or use built-in function `abs()` instead.

### Exponent
or use exponent \*\* sign
Returns value as x**y
```python
math.pow([value], [exponent power])
```

### Root of n
Returns value as x^1/2 (square root)
```python
math.sqrt([float or integer])
```

### Logarithms
Returns the value as log [base] [number]
```python
math.log([number], [base])
```

or use a predefined log level

```python
math.log2([number])
math.log10([number])
```

### Rounding Up
Returns value as integer (rounding up)
```python
math.ceil([float or integer])
```

### Rounding Down
Returns value as integer (rounding down)
```python
math.floor([float or integer])
```

### Factorial
Returns the value of the value factorial
```python
math.factorial([integer])
```

### Calculate GCD
Returns the GCD of integer A and B
```python
math.gcd([integer_a], [integer_a])

```

### Pi Constant
Returns the value of pi (more accurate than 22/7, but not for 355/113)
```python
math.pi()
```

### Trigonometric Functions

```python
math.sin(<radians>)
math.cos(<radians>)
math.tan(<radians>)

math.csc(<radians>)
math.sec(<radians>)
math.cot(<radians>)

math.arcsin(<radians>)
math.arccos(<radians>)
math.arctan(<radians>)
```
มันใช้หน่วยที่เป็น input คือ `radians` ไม่ใช่หน่วย `degrees` นะครับ

### เปลี่ยน Degrees -> Radians
```python
math.radians([degree])
```
