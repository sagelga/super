# Multiple Linear Regression
เหมือน Linear Regression แต่มีหลายตัวแปร

## Assumptions + Requirements
1. Linear relationship
2. Independence of error
3. Heterogeneity of residual
4. Normal Distribution of Residual
5. Absence of Multicollinearity (ด้วย VIF + Correlation)


## Tests

ทำคล้าย Simple Regression แต่มีการใส่ตัวแปรเพิ่มเพื่อเทียบโมเดล กด next ตรงที่ใส่ตัวแปรต้นเพิ่มเติมได้ (สร้าง Model มาเทียบ)

1. Statistic เหมือนเดิม แต่เพื่ม
  1. R square change, Descriptive, Part & partial correlation, Collinearity diagnostics 
2. ไปที่ Save แล้วเลือก 
  1. Predicted Values (Unstandardized, Standardized, Adjust) 
  2. Residual (Standardized) Distances → เลือกทุกอัน
  3. Influence Statistics (Standardized DFFIT, DFFit)


## Reporting the result

สรุปผลเหมือน Linear Regression ตัวแปรเดียว
แต่มีจุดที่ต้องให้ดูเพื่ม

โดย VIF, Tolerance, Correlations between variable เอามาเพื่อทดสอบ Multicollinearity

**VIF (Variance inflation factor)**
ตรวจ Multicollinearity
บอกระดับความสัมพันธ์ของตัวแปร Predictor

โดยค่าใกล้ 1 = ดี 
และยอมรับสูงสุดที่ 5

โดยตัวแปรนั้น ห้ามเป็นแบบ Ordinal เพราะไม่สามารถระบุได้ ใช้ได้แค่แบบที่เป็น Continuous → ให้ใช้ Correlations แทน

**Tolerance**
เหมือนกับ VIF โดยเอามา inverse ( 1 / VIF ) หากค่า < 0.5 → มีปัญหา

**Correlations between variables**
หากค่าเกิน 0.8 ทั้งสองฝั่งตัวแปร → มี correlations ระหว่างตัวแปร → สร้างปัญหา Multicollinearity

ตาราง Coefficients

![](https://statistics.laerd.com/spss-tutorials/img/mr/table-coefficients-highlighted-b-only.png)


อันนี้ก็เหมือน Simple Linear Regression แต่ว่าอันที่น่าสนใจอีกก็คือ Standardized Coefficients ที่จะบอกว่าอันไหนเป็นตัวแปรที่น่าสนใจ และอธิบาย model ได้มากที่สุด (ดูค่า Beta แล้วไม่ต้องสนใจ magnitude) เช่นอันนี gender สำคัญสุด

โดยที่บอกได้ว่าหาก gender เปลี่ยนไป จะทำให้ตัวแปรตามเปลี่ยนไป 13.208 หน่วย (ให้ดูค่า Unstandardised Coefficient B)

เขียนสรุป

- A multiple regression was run to predict VO2max from gender, age, weight and heart rate. 
- These variables statistically significantly predicted VO2max, *F*(4, 95) = 32.393, *p* < .0005, *R**2* = .577. 
- All four variables added statistically significantly to the prediction, *p* < .05.
- แม้ว่าค่า R^2 จะน้อย แต่ตัวแปรที่ได้มานั้นมีความสัมพันธ์เชิงสถิติ

---

Reference
- [https://statistics.laerd.com/spss-tutorials/multiple-regression-using-spss-statistics.php](https://statistics.laerd.com/spss-tutorials/multiple-regression-using-spss-statistics.php)