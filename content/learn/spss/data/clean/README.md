# Data Cleansing
ทำเพื่อหาก Outlier + Influence Data + Leverage และเลือกข้อมูลไปทำการคาดเดาต่อไป

![Regression Diagnostics](https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fsphweb.bumc.bu.edu%2Fotlt%2FMPH-Modules%2FBS%2FR%2FR5_Correlation-Regression%2FLeverage-Influence.png&f=1)

- Outlier = ค่าที่เดา (จากโมเดลที่เลือก) กับค่าแท้จริง (ที่ทำการเก็บมา) ก่อเกิดเป็น Residual ที่เยอะผิดปกติ
- Leverage = ค่าที่เกาะเส้น แต่ไปอยู่ไกลค่าอื่นๆ
- Influence = ทั้ง Outlier + Leverage รวมกัน

## Outlier Detection

Analyze → Regression → Linear → ปุ่ม Save → กดตามนี้ : 

Distance
- Leverage Values
- Cook’s
- Mahalanobis

Residuals
- Unstandardized

Influence Statistics
- Standardized DFFit
- (optional) DFFIT

### Cook’s Distance (วัด Influence)
ยิ่งเข้าใกล้ 1 ยิ่งดี

### Mahalanobis Distance (วัด Leverage → อธิบาย Outlier)
วัดค่าระหว่าง ค่าจริงกับค่าที่ predict ออกมา ว่าห่างกันกี่ SD (สำหรับ Multiple Regression)

คำนวณโดยการใช้ `SIG.CHISQ( calculated MAH, Degree of freedom)` เพื่อหาความ Significant
ค่าไม่เกิน Chi Square ที่ df = จำนวนตัวแปร Predictor (ไม่ต้องไปลบ 1) และจะ significant ที่ P < 0.001

หาก significant = ค่าผิดปกติด้าน Leverage

### Leverage Value / Center Leverage Value / Average Leverage (วัด Leverage → อธิบาย Outlier)
ไม่มากกว่า 2 หรือ 3 เท่าของ `(k+1/n)` (แล้วแต่ว่าอยากใช้ 2 หรือ 3 แต่ส่วนใหญ่ใช้ 2 กัน)

โดยที่

- n = จำนวน Sample ทั้งหมด
- k = จำนวน Independent Variable ที่เกี่ยวข้อง

**Unstandardized Residuals**


### Standard Deviation (วัด Outlier)
Analyse → Descriptive Statistics → Descriptive → เลือกตัวแปรแล้วติ๊ก Save standardised values as variables → กด Ok

โดยวัดจาก SD ของแต่ละตัวแปร สำหรับ Data set หาก : 

- น้อยกว่า 80 เคส → ตัดเคสที่มีค่า SD มากกว่า 2.5 SD
- มากกว่าหรือเท่ากับ 80 เคส → ตัดเคสที่มีค่า SD มากกว่า 3 SD

เพราะมีความเป็นไปได้สูงว่ามันคือค่า Outlier 

### ค่า DFFit / Standardized DFFit (วัด Influence)
อธิบายว่า ถ้าตัดตัวแปรนี้ออกจะทำให้เส้นเปลี่ยนแปลงมากขนาดไหน
จากการคำนวณ Predicted Y - Real Y
แต่การทำ Standardized ก็เพื่อให้เห็นภาพง่ายๆ

หากค่าเกิน 2 x sqrt( p+1 / n ) ก็จะถือว่าจำนวนนั้นเยอะเกินไป

- p = Predictor
- n = number of observations


## Outlier Detection w/ Casewise Diagnostics 
ติ้กที่ Casewise Diagnostics
โดยจะแสดงค่า observation ที่มี SD มากกว่า 3 (default)
แต่ก็ยังไม่สามารถทำการตัดได้ ต้องไปดูพวกค่า Cook’s + Mahalanobis Distance + Leverage ประกอบการตัดสินใจก่อนที่จะไปตัดจริง

แต่การตัด แนะนำให้ทำแบบไม่ตัดก่อน แล้วก็ทำแบบตัดด้วย แล้วเขียนสรุปความแตกต่าง


## Outlier Detection w/ Boxplot
Plots → Boxplot

หากค่านั้นไปเป็นรูปจุด และอยู่เหนือ/ใต้ box plot → outlier 


## Outlier Detection w/ Scatterplot 
คล้ายๆกันกับ boxplot แต่เลือกเป็น Scatterplot