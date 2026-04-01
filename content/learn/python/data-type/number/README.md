# Arithmetic Operator
Arithmetic = อะไรซักอย่างที่มันเกี่ยวกับคณิตศาสตร์<br>
Arithmetic Operator = การทำสี่งต่างๆ กับตัวแปร เพื่อเอาไว้คำนวณเลขโดยเฉพาะ

ตัวอย่างประเภท Arithmetic Operator

| **สัญลักษณ์**      | +   | -        | *        | /       | //             | %       | **       |
|:----------------|-----|----------|----------|---------|----------------|---------|----------|
| **เรียกว่า**      | Add | Subtract | Multiply | Divide  | Floor Division | Modulus | Exponent |
| **ตัวอย่างการใช้** | 2+3 | 2-3      | 2*3      | 2/3     | 2//3           | 2&3     | 2**3     |
| **ผลลัพท์**       | 5   | -1       | 6        | 0.66666 | 0              | 2       | 8        |

น้องๆอาจจะยังเห็น floor division และ modulus มาก่อนเลย พี่มงจะสอนแบบรวบรัดให้นะครับ

### Floor Division
เป็นการทำการหาร แล้วค่อย **ปัดเศษลงไปเป็นเลขจำนวนเต็ม**

### Modulus
เป็นการหาร เพื่อ **เอาแค่เศษของการหาร**

ตัวอย่าง
```python
value_a = 2
value_b = 3

print(value_a + value_b)    # แสดงผลลัพท์ 5
print(value_a - value_b)    # แสดงผลลัพท์ -1
print(value_a * value_b)    # แสดงผลลัพท์ 6
print(value_a / value_b)    # แสดงผลลัพท์ 0.666666...... (ไปเรื่อยๆ)
print(value_a // value_b)   # แสดงผลลัพท์ 0
print(value_a % value_b)    # แสดงผลลัพท์ 2
print(value_a ** value_b)   # แสดงผลลัพท์ 8
```

::: warning
อย่าลืมว่าน้องๆจะต้องแปลงเป็นตัวเลขซะก่อนที่จะเล่นอะไรพวกนี้เนอะ<br>
แล้วถ้าพี่ไม่เปลี่ยนหล่ะ เช่น `"2" + "2"` หรือ `2 + "2"` จะได้อะไรเอ่ย มีค่าเท่ากันหรือเปล่าครับ
:::

## Order of Operations
ด้วยจากว่า หากมีสมการแบบนี้ `112 + 215 * 482 - 54 / 4782` แล้วคอมจะรู้หมือไร่ ว่าจะต้องคำนวณอันไหนก่อน และน้องจะรู้หมือไร่ ว่ามันจะได้ผลลัพท์เหมือนกันหรือเปล่า ถ้าน้องเรียงลำดับการคำนวณไม่เหมือน Python

ดังนั้น Python จึงใช้กฎ PEMDAS เพื่อเป็นการเรียงลำดับของการคำนวณคณิตศาสตร์ครับ<br>
อะไรคือ PEMDAS ก็ดูเอาละกันครับ [study.com/academy/lesson/what-is-pemdas-definition-rule-examples.html](http://study.com/academy/lesson/what-is-pemdas-definition-rule-examples.html)

โดยพี่ก็จะขอสรุปไว้ประมาณนี้แล้วกันครับ ว่ามันย่อมาจากอะไร

| **P**           | **E**           | **M**              | **D**        | **A**        | **S**          |
| --------------- | --------------- | ------------------ | ------------ | ------------ | -------------- |
| **P**arenthesis<br>วงเล็บ | **E**xponential<br>เลขยกกำลัง | **M**ultiplication<br>คูณ| **D**ivision<br>หาร| **A**ddition<br>บวก| **S**utraction<br>ลบ|
| ()              | **              | *                  | /            | +            | -              |

นั่นคือจะเรื่มทำในวงเล็บก่อน (Parenthesis) แล้วค่อยทำเลขยกกำลัง (Exponent) ตามด้วยคูณ (Multiply) หาร (Divide) บวก (Add) ลบ (Subtract) ตามลำดับ

หากน้องๆ ยังไม่แม่นการคำนวณเลขแบบนี้ ก็สามารถศึกษาต่อได้จาก [Khan Academy](https://www.khanacademy.org/math/pre-algebra/pre-algebra-arith-prop/pre-algebra-order-of-operations/v/introduction-to-order-of-operations) ครับ