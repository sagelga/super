---
title: Binary Search Trees
---

# Binary Search Trees

ต้นไม้ค้นหาแบบทวิภาคเป็นโครงสร้างข้อมูลที่มีโครงสร้างเป็นลำดับชั้น โดยแต่ละโหนดมีลูกได้ไม่เกิน 2 โหนด

## คุณสมบัติ

- ลูกซ้ายมีค่าน้อยกว่าโหนดแม่
- ลูกขวามีค่ามากกว่าโหนดแม่
- ลูกซ้ายและลูกขวาเป็น BST เช่นกัน

## การดำเนินการหลัก

- **Insert**: เพิ่มโหนดใหม่
- **Search**: ค้นหาโหนด
- **Delete**: ลบโหนด
- **Traversal**: วนผ่านโหนดทั้งหมด

## Time Complexity

| Operation | Average | Worst |
|-----------|---------|-------|
| Search    | O(log n) | O(n)  |
| Insert    | O(log n) | O(n)  |
| Delete    | O(log n) | O(n)  |

## Traversal

```python
class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

def inorder(node):
    if node:
        inorder(node.left)
        print(node.val)
        inorder(node.right)

def preorder(node):
    if node:
        print(node.val)
        preorder(node.left)
        preorder(node.right)

def postorder(node):
    if node:
        postorder(node.left)
        postorder(node.right)
        print(node.val)
```

```javascript
class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

function inorder(node) {
    if (node) {
        inorder(node.left);
        console.log(node.val);
        inorder(node.right);
    }
}
```
