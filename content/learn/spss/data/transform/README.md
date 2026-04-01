# Data Transformation
## Bootstrapping

การสุ่มตัวแปรมาอยู่ในกลุ่มใหม่ โดยการลองไปหลายๆครั้ง เพื่อให้ค่านื่งกว่าเดิม
Analyze → Descriptive Statistics → Explore 

**เหตุผลการทำ Bootstrapping**

- ทำเพื่อลด Standard Error + ปรับขนาด Confidence Intervals → ทำให้ Normal

**ทำ Bootstrapping เมื่อ**

- ไม่รู้ประเภทการกระจายตัวของตัวแปร
- ข้อมูลมีน้อยเกินไป
- ไม่ผ่านการทดสอบ Normality / Homoscedacity

**How to**
เลือกตัวแปรไปไว้ใน Dependent List → Bootstrap → กด Perform Bootstrapping → กด Bias corrected accelerated → กด Continue


## Value Transformation
เพื่อให้ตัวแปรมีการกระจายแบบ Normal มากขึ้น

Transform → Compute Variable

| Exponent Model   | log(y)  |
| ---------------- | ------- |
| Quadratic Model  | sqrt(y) |
| Reciprocal Model | 1/y     |

แล้วตั้งชื่อตัวแปรใหม่ ใน Target Variable
