---
title: Queues
---

# Queues

คิวเป็นโครงสร้างข้อมูลที่ทำงานแบบ FIFO (First In First Out)

## การดำเนินการหลัก

- **Enqueue**: เพิ่มองค์ประกอบไปท้ายคิว
- **Dequeue**: เอาองค์ประกอบจากหน้าคิวออก
- **Front**: ดูองค์ประกอบหน้าคิว
- **isEmpty**: ตรวจสอบว่าว่างหรือไม่

## ประเภทพิเศษ

- **Circular Queue**: คิววงกลม
- **Priority Queue**: คิวที่มีลำดับความสำคัญ
- **Deque**: คู่ข้างหน้า-หลัง (Double-ended queue)

## Time Complexity

| Operation | Complexity |
|-----------|------------|
| Enqueue   | O(1)       |
| Dequeue   | O(1)       |

## การประยุกต์ใช้

- Task scheduling
- Breadth-first search (BFS)
- Print queue
- Message queues

## ตัวอย่าง

```python
from collections import deque

queue = deque()
queue.append(1)  # enqueue
queue.append(2)  # enqueue
queue.append(3)  # enqueue
queue.popleft()  # 1
queue.popleft()  # 2
```

```javascript
// JavaScript
const queue = [];
queue.push(1);      // enqueue
queue.push(2);      // enqueue
queue.push(3);      // enqueue
queue.shift();      // 1
queue.shift();      // 2
```
