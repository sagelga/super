# Simple Linear Regression

เป้าหมายคือการเดาค่า B เมื่อมีการให้ค่า A มา
โดยที่มั่นใจว่า 2 ตัวแปรนี้มีความสัมพันธ์แบบเป็นเส้นตรง


## Assumptions
1. ตัวแปร → Continuous
2. ตัวแปรมีความสัมพันธ์แบบเป็นเส้นตรง (จะขึ้น จะลงก็ได้ แต่ต้องเส้นตรง)
3. อย่าลืมลบ Significant Outlier
4. Independent of observations

## Requirement test factor
1. ต้องเป็น Homoscedasticity (หากเส้นไปต่อ ต้องล้อไปตามเส้นด้วย ไม่ใช่ค่อยๆ หนีห่างออกจากเส้น) 
2. Independent of Error (Error ของ Residual กระจายแบบปกติ) (วัดด้วย Durbin-Watson)


## Tests

Analyze → Regression → Linear


1. ใส่ตัวแปรเข้ากล่อง
  1. ตัวแปร Dependent + Independent


2. เช็คค่าของตัวแปร
  1. เข้า Statistics
  2. ติ้ก Estimates + Confidence Intervals
  3. ติ้ก Model Fit
  4. ติ้ก Durbin-Watson + Casewise Diagnostics


3. เช็คความกระจายตัว
  1. เข้า Plots
  2. ใส่ ZPRED ที่ X
  3. ใส่ ZRED ที่ Y
  4. ติ้ก Histogram + Normality Probability Plot


## Reporting the result

**ตาราง Model Summary**

![Model Summary Table for Linear Regression Procedure in SPSS Statistics](https://statistics.laerd.com/spss-tutorials/img/lr/linear-regression-4.png)


**ค่า R**

- ความสัมพันธ์ไปในทิศทางไหน ( เป็นบวก = เพื่ม | เป็นลบ = ลด )

**ค่า R^2**

- เส้นที่เดาออกมา อธิบายค่าตัวแปรได้แม่นยำแค่ไหน ( range คะแนน 0 - 1 )
- ออกมาน้อย = คาดเดาผลลัพท์ได้ไม่ดี
- ออกมามาก = คาดเดาได้ดีมาก

**ค่า Adjusted R^2**

- เป็นเหมือน R^2 แต่เป็นของประชากร ว่าจะเดาความสัมพันธ์ในระดับประชากรได้มากขนาดไหน

**ค่า Durbin-Watson** 

- อธิบายไว้แล้วใน [+SPSS x Data Analysis: Durbin-Watson-Statistics](https://paper.dropbox.com/doc/SPSS-x-Data-Analysis-Durbin-Watson-Statistics-M7cT1Uof2SwF468FgabCl#:uid=862641836754932254795722&amp;h2=Durbin-Watson-Statistics) 

**ตาราง ANOVA**

![ANOVA Table for Linear Regression Procedure in SPSS Statistics](https://statistics.laerd.com/spss-tutorials/img/lr/linear-regression-5.png)

- ค่าความ Sig ของการทดสอบ F-statistics

**ตาราง Coefficient** 

![Coefficients Table for Linear Regression in SPSS Statistics](https://statistics.laerd.com/spss-tutorials/img/lr/linear-regression-6.png)


**สมการ Regression**

- y = <b ของ constant> + <b ของ income> x income
- เพื่อนำไปทำนายตัวแปรตามอันต่อไป หากให้ตัวแปรต้นมา

**ความ significant ของตัวแปรต้น**

- p < 0.05 → significant
- ถ้า significant ก็จะเป็นตัวแปรที่ช่วยอธิบายตัวแปรตามได้
- หากไม่ significant แปลว่าจะใส่หรือไม่ใส่ตัวแปร ก็ไม่ได้ทำให้อธิบายตัวแปรตามได้ดีเท่าไหร่ เอาออกไปก็ได้

**ตาราง Correlations**

