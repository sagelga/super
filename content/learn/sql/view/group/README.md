# GROUP
# Aggregate Functions

เป็นฟังก์ชันที่ทำการรวมข้อมูล (หรือ/และ คำนวณผลลัพท์) หลายๆ rows เข้ามาอยู่ในผลลัพท์เดียวกัน ค่าเดียว บรรทัดเดียว (มีความแตกต่างกับ [Analytics Function](https://www.notion.so/Analytic-Window-Function-fa9ec19935834c5d919b18633103df46) ที่จะคืนผลลัพท์ออกมาทุก rows)

## COUNT
นับจำนวน record ที่อยู่ในตาราง

```sql
SELECT COUNT(*)
FROM bricks;
```

นับจำนวน record ที่อยู่ใน column ที่ไม่ใช่ค่า NULL

```sql
SELECT COUNT(color)
FROM bricks;
```

## ตัวอย่างรายการ aggregation ที่สามารถทำได้

- Sum: the result of adding up all the values for the expression in the group
- Min: the smallest value in the group
- Max: the largest value in the group
- Avg: the arithmetic mean of all the values in the group
- Stddev: the standard deviation
- Median: the middle value in the data set
- Variance: the statistical variance of the values
- Stats_mode: the most common value in the group

# All & Distinct / Unique

NOTE : บาง aggregate function ไม่รองรับการใช้งาน `DISTINCT`

ถ้าต้องการนับอันที่ไม่เคยซ้ำกันเท่านั้น ก็สามารถใช้ `UNIQUE` หรือ `DISTINCT` ก็ได้

```sql
SELECT COUNT(DISTINCT color)
FROM bricks;
```

```sql
SELECT COUNT(UNIQUE color)
FROM bricks;
```

ถ้าต้องการให้นับทั้งหมด ก็สามารถใช้ `ALL` เพื่อบอกให้นับทุก row ก็ได้

```sql
SELECT COUNT(ALL color)
FROM bricks;
```

# Grouping Aggregate

เป็นการคืนค่ากลุ่มของผลลัพท์ที่เกิดขึ้นจากการเลือกว่าจะเลือกกลุ่มโดยการใช้ attribute อะไร

```sql
SELECT color, COUNT(*)
FROM bricks
GROUP BY color;
```

โดยก็จะคืนค่าออกมาเป็นว่าแต่ละสี `color` นั้นมีข้อมูลอยู่ในตารางจำนวนเท่าไหร่

และการที่จะใช้นั้น column ที่ไม่ได้ทำ Aggregation ที่อยู่ใน `SELECT` จะต้องไปโผล่ใน `GROUP BY` ด้วย

```sql
select colour, shape, count (*)
from   bricks
group  by colour;
```

ก็จะเกิด error

กลับกัน column ไม่จำเป็นที่จะต้องไปอยู่ใน `SELECT` หากว่าอยู่ใน `GROUP BY` แล้ว

```sql
select shape, weight, count (*)
from   bricks
group  by shape, weight;
```

ดังนั้นเราก็ควรที่จะ copy สิ่งที่ต้องการให้แสดงใน `SELECT` เข้าไปอยู่ใน `GROUP BY` ด้วย

# Aggregate Filtering

เราสามารถที่จะทำการ filter ข้อมูลได้โดยการใช้

**WHERE**
ใช้งานได้เฉพาะ Non-Aggregate Column เท่านั้น
หากไม่ใช่ก็จะขึ้น Error ทันที

ในตัวอย่างนี้ ก็ไม่เกิด error อะไร เพราะไม่ได้ยุ่งกับ `color`

```sql
select colour, count (*)
from   bricks
where  weight > 1
group  by colour;
```

ในตัวอย่างนี้เกิด error ORA-00934 ทันที เพราะมีการใช้ column `color` มาเป็น aggregate

```sql
select colour, count (*)
from   bricks
where  count (*) > 1
group  by colour;
```

**HAVING**
ใช้งานได้ใน column ที่เป็น aggregate
โดยจะไปอยู่หลังหรือหน้า keyword `GROUP BY` ก็ได้

ตัวอย่างการใช้งาน

```sql
select colour, count (*)
from   bricks
group  by colour
having count (*) > 1;
```

หรือเราจะใช้ aggregate fuction ใน `HAVING` ด้วยก็ได้

```sql
select colour, count (*)
from   bricks
having sum ( weight ) > 1
group  by colour;
```

# Subtotal

เป็นการ generate ข้อมูลแบบรวมขึ้นมา เพื่อมีการ total เฉพาะกลุ่ม และก็ total ตัวผลของหลายๆอันด้วย

**Rollup**
เป็นการคำนวณ subtotal ของ column นั้นๆ (ทำงานจากขวามาซ้าย)

```sql
select colour, shape, count (*)
from   bricks
group  by rollup ( colour, shape );
```

calculates:

- Totals for each ( colour, shape ) pair
- Totals for each colour
- The grand total

**Rollup w/ non-row up attribute**
เป้นการที่เราเลือกให้บาง attribute ไม่ได้เข้าไปอยู่ใน  `rollup()` แต่มันก็จะอยู่ใน `GROUP BY` เหมือนเดิม

```sql
select colour, shape, count (*)
from   bricks
group  by colour, rollup ( shape );
```

ผลลัพท์ก็จะออกมาเป็นว่า Grand Total จะเป็นค่าของ `color` แต่ก็จะคืนค่าการคำนวณ total ในกลุ่มของ color-shape ออกมา

**Cube**
เป็นการคำนวณ subtotal ของ combination ของ column ที่เลือกทั้งหมด

```sql
select colour, shape, count (*)
from   bricks
group  by cube ( colour, shape );
```

You get groupings for:

- Each ( colour, shape ) pair
- Each colour
- Each shape
- All the rows in the table
