# ติดตั้ง Python
เรามีวิธีให้เลือกเพื่อติดตั้ง Python บนอุปกรณ์ดังนี้ครับ
มีวิธีให้เลือกติดตั้งดังต่อไปนี้ครับ
ก่อนที่เราจะสามารถรันโค้ด Python ได้ เครื่องที่เราต้องการพัฒนาโค้ดก็จำเป็นจะต้องติดตั้ง Python เสียก่อน โดยมีวิธีดังนี้ครับ
- Install มาจาก Python.org
- Install ด้วย Conda
- Install โดยการใช้ HomeBrew (สำหรับ macOS)
- Install โดยการใช้ apt-get (สำหรับ Linux-based OS)

### จาก Python.org (แนะนำ)
น้องๆสามารถดาวน์โหลดตัว Python + Python IDE (IDLE) ที่เว็บไซต์ของ Python.org ได้จากลิงก์นี้เลยครับ [https://www.python.org/downloads/](https://www.python.org/downloads/)

โดยให้น้องดาวน์โหลดเวอร์ชันล่าสุด โดยเวอร์ชั่นล่าสุดจะปุ่มสีเหลืองตามภาพก็ให้กดเพื่อดาวน์โหลด Python ลงเครื่องของน้องๆครับ

<figure>
  <img src='https://www.ics.uci.edu/~pattis/common/handouts/pythoneclipsejava/images/python/pythondownloadpage.jpg'>
  <figcaption>หน้าเว็บไซต์ Python.org</figcaption>
</figure>

แล้วก็ทำการ Install เข้าเครื่องครับ และหากว่าเสร็จแล้วก็จะเห็นว่ามีโปรแกรมที่ชื่อว่า Python และ IDE เริ่มต้นติดเครื่องอย่าง IDLE เอาไว้ให้อุ่นใจ

### จาก Anaconda.com
น้องๆ สามารถดาวน์โหลด Python ได้จากทาง Anaconda ครับ

ข้อดีอย่างนึงของการทำแบบนี้นั่นคือ Conda (เป็นตัวจัดการ Python ของ Anacoda) จะทำการอับเดทเวอร์ชันให้น้องๆ ให้เป็นเวอร์ชั่นล่าสุดอย่างอัตโนมัติครับ ไม่จำเป็นที่จะต้องไปลงใหม่เหมือนกับวิธีแรก

แต่ข้อเสียจะอยู่ที่ว่ามันไม่มี IDLE ให้อ่ะสิครับ พี่มงเลยแนะนำว่าให้โหลดถ้าน้องๆจะเอาไปใช้กับการเรียน Data Analysis หรือต้องการจะไปเป็น Data Scientist ครับ เพราะว่า tools เค้าพร้อมจริงๆ และใช้งานง่ายด้วย

### ด้วย HomeBrew (สำหรับ macOS)
หรือสำหรับน้องๆที่อยากท้าทายตัวเอง และอยากใช้ Python บน command line ก็สามารถใช้ Homebrew ในการจัดการหลายๆอย่างให้น้องครับ ดีงามโคตรๆ


หากน้องยังไม่มี Homebrew บนเครื่อง ก็ให้พิพม์บรรทัดด้านล่างไปด้วยนะครับ
```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

และทำการพืิมพ์คำสั่งพวกนี้หลังจากทำการติดตั้ง HomeBrew เรียบร้อยแล้ว
```bash
brew doctor
brew install python
brew doctor
```

## ทดสอบว่ามี Python อยู่ในเครื่องแล้ว
สำหรับน้องที่ใช้ MacOS หรือ Linux Distributions ทั้งหลาย น้องสามารถเช็คว่ามี Python ในเครื่องแล้วหรือยัง โดยการพิมพ์
```bash
python3
```
ผ่านทาง Terminal ครับ

และสำหรับน้องๆที่ใช้ Windows ถ้าเห็น IDLE อยู่บน desktop (หรือที่น้องเก็บมันไว้) ก็ถือว่าดาวน์โหลดเรียบร้อยแล้วครับ โดยปกติแล้วจะมีเขียนเวอร์ขั่นของ Python กำกับที่บน IDLE ด้วยครับ (เช่น IDLE 3.6.2)

## ใช้งานภาษา Python
### Using Python Shell and Editor on IDLE
IDLE คือ IDE (Integrated Development Environment) ของ Python เอง ซึ่งมันก็จะแตกต่างกับตัว Text Editor อื่นๆ (เช่น Atom, Sublime Text, VS Code) นั่นก็คือมันใช้งานง่ายกว่า และก็สามารถกด `F5` (สำหรับน้องๆที่ใช้ Windows) เพื่อทำการรันโปรแกรมได้เลย หรือกดปุ่มบนคีย์บอร์ดเพื่อรันโปรแกรม (script) ที่น้องเขียนได้เลย

โดยเปิดตัว IDLE ขึ้นมาแล้ว น้องๆก็จะเห็นหน้าต่างที่หน้าตาคล้ายๆ command line / shell ของ Python ตามภาพ

![](https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fi.stack.imgur.com%2Fbz1qE.jpg&f=1)<br>
หน้าต่าง IDLE

::: warning คำแนะนำ
สำหรับน้องๆที่โหลด Python โดยการใช้ วิธีอื่นนอกจากวิธีแรก น้องๆอาจจะไปทำเหมือนวิธีที่ 1 แต่ดาวน์โหลดเพียง IDLE หรือลอง Google ดูครับว่ามีวิธีดาวน์โหลดผ่าน `apt-get` หรือไม่
:::

### Using Python Shell on Terminal
สำหรับน้องที่ดาวน์โหลด Python มาโดยการใช้ Homebrew หรือมีบนเครื่องแล้ว ตัว Python บน Terminal ก็สามารถเรียกได้โดยการพิมพ์

```bash
python3
```
และหน้าจอของน้องๆก็จะเป็นดังภาพ

หรือน้องๆที่ใช้ Windows ก็สามารถเขียนภาษา Python โดยใช้ shell ได้เหมือนกัน โดยการกดเข้าโปรแกรม Python Shell ก็จะได้ผลลัพท์เช่นเดียวกัน

![](https://images.duckduckgo.com/iu/?u=https%3A%2F%2Fraphaelmarques.files.wordpress.com%2F2010%2F03%2Fterminal-python.png&f=1)
