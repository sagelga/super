---
title: Stacks
---

# Stacks

สแต็กเป็นโครงสร้างข้อมูลที่ทำงานแบบ LIFO (Last In First Out)

## การดำเนินการหลัก

- **Push**: เพิ่มองค์ประกอบไปบนสุด
- **Pop**: เอาองค์ประกอบจากบนสุดออก
- **Peek/Top**: ดูองค์ประกอบบนสุด
- **isEmpty**: ตรวจสอบว่าว่างหรือไม่

## Time Complexity

| Operation | Complexity |
|-----------|------------|
| Push      | O(1)       |
| Pop       | O(1)       |
| Peek      | O(1)       |

## การประยุกต์ใช้

- Undo/Redo operations
- Function call stack
- Expression evaluation
- Backtracking algorithms

## ตัวอย่าง

```python
# Python - ใช้ list
stack = []
stack.append(1)  # push
stack.append(2)  # push
stack.append(3)  # push
stack.pop()      # 3
stack.pop()      # 2
```

```javascript
// JavaScript
const stack = [];
stack.push(1);  // push
stack.push(2);  // push
stack.push(3);  // push
stack.pop();    // 3
stack.pop();    // 2
```
