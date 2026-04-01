# Two-way ANOVA

เช็คว่า 2 ตัวแปร (ที่เป็นกลุ่ม) นี้มีความสำพันธ์กันหรือไม่ แล้วเท่าไหร่


## Assumptions + Requirements
1. Dependent → Continuous
2. Independent → มีอย่างน้อย 2 ตัวแปร และ 2 ตัวแปร มีอย่างน้อย 2 ประเภท (เช่น Male, Female)
3. Data Observation ต้อง Independent ต่อกัน
4. อย่าลืมลบ Significant Outlier
5. Dependent กระจายแบบ Normal Distribution
6. มี Homogeneity of Variance ในแต่ละกลุ่มในตัวแปร [ทดสอบด้วย Levene Test]

โดยพยายามให้ตัวแปรแต่ละอันมีจำนวน Samples เท่าๆ กันด้วย เพื่อไม่ให้ค่าผิดเพี้ยน


## Hypothesis
|           | Row Effect<br>ตัวแปร A มีความเกี่ยวข้องกัน | Column Effect<br>ตัวแปร B มีความเกี่ยวข้องกัน | Interaction Effect<br>ตัวแปร A+B เมื่อเจอกันทำให้เกี่ยวข้อง |
| --------- | ------------------------------------------ | --------------------------------------------- | ----------------------------------------------------------- |
| Null      | Row mean เท่ากันทั้งหมด                    | Column mean เท่ากันทั้งหมด                    | Interaction Effect เท่ากับ 0 <br>(ไม่มี Interaction Effect) |
| Alternate | Row mean ซักอันแตกต่าง                     | Column mean ซักอันแตกต่าง                     | มี Interaction Effect อยู่                                  |

โดยที่ Row หรือ/และ Column ก็ไม่สามารถอธิบายว่าถ้าเอา Row มารวมกับ Column แล้วจะไม่มีผล

Example : Mustard (Row Effect) ไม่มีผล, Ice cream (Column Effect) ไม่มีผล, Mustard x Ice Cream มีผล (Interaction Effect)


## Tests

Analyze → General Linear Model → Univariate

1. สร้างตัวแปรร่วม
  1. กด Plot
  2. ใส่ตัวแปร A ไปที่ Horizontal Axis + ใส่ตัวแปร B ไปที่ Separate Lines
  3. กด Add
  4. กด Continue
  5. แล้วสลับกันใส่เป็น ใส่ตัวแปร B ไปที่ Horizontal Axis + ใส่ตัวแปร A ไปที่ Separate Lines ด้วย

2. สร้าง Equal Variance **(สำหรับตัวแปรที่มีมากกว่า 2 กลุ่มเท่านั้น)**
  1. กด Post Hoc
  2. ใส่ตัวแปรไปอีกฝั่ง
  3. กดตื้ก Turkey
  4. กด Continue

3. แก้การสร้าง report ANOVA
  1. กด Option
  2. กดย้ายตัวแปรทั้งหมด (Overall ไม่เกี่ยว)
  3. กด Descriptive Statistics + Homogeneity Test + Estimates of Effect Size
  4. กด Continue

4. กด Save ตัวแปร
  1. กด Save
  2. กด Unstandardized + Studentized
  3. กด Continue


## Reporting the result
### ตาราง Tests of between Subject Effect
![](https://d2mxuefqeaa7sj.cloudfront.net/s_00A5BA5A885B8CED081905179FBF32A18F536E6F61F740980D79F9DA167CB3DF_1544421527248_file.png)

- หาตัวแปรที่มี Significant (p < 0.05) → Report ว่าไปปัด Null Hypothesis อันไหน
- มีค่า R^2 อยู่ ว่ามีความสัมพันธ์กันมากขนาดไหน (ใน denote A)
- ค่า Partial Eta Squared บอก Effective Size

### ค่าที่ Plot ออกมา (Estimated Marginal Means)

![Interaction Effect Graph](https://d2mxuefqeaa7sj.cloudfront.net/s_00A5BA5A885B8CED081905179FBF32A18F536E6F61F740980D79F9DA167CB3DF_1544421492964_Picture1.png)

ถ้าสองเส้นตัวแปรตัดกัน หรือ ไม่ Parallel ต่อกันเสมอไป → อาจมี Interaction Effect ต่อกัน
แต่เพื่อความแน่ใจ ก็ควรที่จะดูตาราง [Tests between Subject Effect](#reporting-the-result)

**ตาราง Multiple Comparisons (การทำ Turkey HSD)**

![](https://d2mxuefqeaa7sj.cloudfront.net/s_00A5BA5A885B8CED081905179FBF32A18F536E6F61F740980D79F9DA167CB3DF_1544421580675_file.png)


ถ้าค่า p < 0.05 ก็หมายถึงว่ามีความห่างระหว่างตัวแปรแบบมีนัยสำคัญ → เพื่อไปย้อนแย้งกับความ Significant ของ Interaction Effect ตาราง [Tests between Subject Effect](#reporting-the-result)