# Time Series Analysis

เป็นการวัดว่าตัวแปร กับ เวลา นั้น มีความสัมพันธ์กันหรือไม่ และนำไป predict ค่าตัวแปรใหม่ โดยให้เวลามาหรือไม่

Autoregressive = เหมือน time series แต่มีหลายตัวแปรกว่า Time Series

## Component of Time Series

| **Trend**                              | เกิด Trend กับเวลาหรือไม่                                                                    |
| -------------------------------------- | -------------------------------------------------------------------------------------------- |
| **Seasonality**                        | ฤดูกาลเป็นสาเหตุของผลกระทบหรือไม่                                                            |
| **Cycle**                              | เหมือน Season แต่อาจจะมีขนาดไม่เท่าๆกันได้                                                   |
| **Irregular Variation / Fluctuations** | มีการเปลี่ยนแปลงแบบกระทันหัน <br>เช่นอยู่ดีๆ sales ก็ peak ไปวันเดียว แล้วก็กลับมาเหมือนเดิม |


## Tests
1. ดูข้อมูลเราเป็นประมาณไหน

Analyze → Forecasting → Sequence Charts → ลาก ตัวแปรที่รวมทุกอย่างที่อยากดูไว้ใน variable → ตัวแบ่งช่วงเวลาไว้ใน Time Axis Label


2. สร้างโมเดล
  1. ไปที่ Analyze > Forecasting > Create Traditional Model → นำตัวแปรที่เป็นแบบแยกไปใส่ใน Dependent Variable
  2. Method ตั้งเป็น Expert Modeler → กด Criteria → เอาตัวติ้ก “Expert modeler considers seasonal model” ออก → กด Continue (แล้วแต่ตัวแปรด้วย)
  3. tab Option
    1. เลือก “First Case after end of estimation period through a specific date” → ใส่ค่าเพื่อทำนาย
  4. tab Statistics 
    1. เลือก Display fit measures , Stationary R Square, Goodness of fit และ Display forecasts
  5. tab Save
    1. เลือก Predicted Values ใน column save
  6. tab Plots 
    1. เลือก Maximum absolute percentage error, Mean absolute percentage error, Series, Observed Values, Forecast


## Reporting the result

SPSS จะออกค่าที่เราต้องการหา (ตอนที่ใส่ input เวลา) ออกมาให้ ว่ามันเดาอะไรออกมา

แล้วก็แค่นั้น เพราะสอนแค่นั้นจริงๆ

