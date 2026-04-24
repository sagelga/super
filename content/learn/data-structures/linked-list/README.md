---
title: Linked Lists
---

# Linked Lists

ลิงค์ลิสต์เป็นโครงสร้างข้อมูลที่ประกอบด้วยโหนด โดยแต่ละโหนดเก็บข้อมูลและการอ้างอิงถึงโหนดถัดไป

## ประเภท

- **Singly Linked List**: แต่ละโหนดชี้ไปยังโหนดถัดไปเท่านั้น
- **Doubly Linked List**: แต่ละโหนดชี้ไปทั้งโหนดก่อนหน้าและถัดไป
- **Circular Linked List**: โหนดสุดท้ายชี้กลับไปยังโหนดแรก

## Time Complexity

| Operation | Complexity |
|-----------|------------|
| Access    | O(n)       |
| Search    | O(n)       |
| Insert    | O(1)       |
| Delete    | O(1)       |

## ตัวอย่าง

```python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        current = self.head
        while current.next:
            current = current.next
        current.next = new_node
```

```javascript
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    append(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            return;
        }
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
    }
}
```
