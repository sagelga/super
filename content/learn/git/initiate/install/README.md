# Installing Git
หากว่ามี Git อยู่แล้ว ก็ไม่ต้องดาวน์โหลดอีกเพื่อที่จะ update git version โดยสามารถเช็คได้[ด้วยคำสั่ง]()

## Installing on Linux

### ใช้ apt ในการดาวน์โหลด
```
sudo apt-get install git-all
```

### ใช้ dnf ในการดาวน์โหลด
```
sudo dnf install git-all
```

### หากน้องไม่ได้ใช้ Debian / Ubuntu
ก็สามารถเข้าไปดูวิธีการลง Git จาก [http://git-scm.com/download/linux](http://git-scm.com/download/linux) ได้ครับ

## Installing on Mac
โดยปกติแล้ว MacOS จะมี Git ติดมาให้อยู่แล้ว ไม่จำเป็นที่จะต้องดาวน์โหลดเหมือน Linux

โดยจะดาวน์โหลดพร้อมกับ Developer Pack ที่ตัว XCode ดาวน์โหลดให้เมื่อมีการพิมพ์ `git`

### ผ่าน XCode Developer Tools (แนะนำ)
```
xcode-select --install
```
โดยสามารถเช็คว่าเคยดาวน์โหลด XCode Developer Tools มาแล้วหรือยังด้วยการใช้คำสั่ง `xcode-select -p`

### ผ่าน Homebrew
```shell
brew tap install git
```

## Installing on Windows
Windows สามารถ download git command line + interface ได้ที่ [http://git-scm.com/download/win](http://git-scm.com/download/win)

---

### Remarks
ในการเรียนใน Cheatsheet นี้จะเป็นคำสั่งผ่านการใช้งาน command line เพียงอย่างเดียว หากว่าจะใช้ Git แบบง่ายๆ ไม่ต้องใช้ Command Line ก็สามารถไปโหลดโปรแกรมที่มีหน้าต่างเพื่อทำ Git ได้เช่นเดียวกันครับ
