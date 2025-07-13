# ระบบจัดทำงบประมาณประจำปี (Thai Budget Management System)

ระบบจัดการงบประมาณที่ทันสมัยสำหรับหน่วยงานภาครัฐ ออกแบบมาเพื่อการคำนวณค่าใช้จ่ายของพนักงาน การจัดการข้อมูลพนักงาน และการวางแผนงบประมาณ

## ✨ ฟีเจอร์หลัก

- 🎯 **ระบบ Dashboard ขั้นสูง** - ภาพรวมงบประมาณแบบ real-time
- 👥 **จัดการข้อมูลพนักงาน** - CRUD operations สำหรับข้อมูลพนักงาน
- 💰 **การคำนวณค่าใช้จ่าย** - ค่าเดินทาง, ค่าช่วยเหลือ, ค่าล่วงเวลา
- 📊 **ตารางงบประมาณ** - แสดงและจัดการงบประมาณรายปี
- 🗓️ **จัดการวันหยุด** - ระบบคำนวณวันทำงานและวันหยุดราชการ
- 🎨 **Neumorphism Design** - UI/UX ที่ทันสมัยและใช้งานง่าย

## 🛠️ เทคโนโลยี

### Frontend
- **React 18** + TypeScript
- **Tailwind CSS** + shadcn/ui components
- **Framer Motion** for animations
- **TanStack Query** for state management
- **Vite** for development and building

### Backend
- **Node.js** + Express.js
- **PostgreSQL** with Neon database
- **Drizzle ORM** for type-safe database operations
- **TypeScript** throughout

### Deployment
- **Vercel** for production hosting
- **Serverless functions** for API endpoints
- **Static site generation** for frontend

## 🚀 การติดตั้งและใช้งาน

### การพัฒนาในเครื่อง

```bash
# Clone repository
git clone <repository-url>
cd newbudget99

# ติดตั้ง dependencies
npm install

# เริ่มการพัฒนา
npm run dev
```

### ตัวแปรสภาพแวดล้อม

ต้องตั้งค่าตัวแปรสภาพแวดล้อมต่อไปนี้:

```bash
DATABASE_URL=your_neon_postgresql_url
```

### Database Schema

ระบบใช้ Drizzle ORM ร่วมกับ PostgreSQL โดยมี 8 ตารางหลัก:

- `users` - ข้อมูลผู้ใช้งาน
- `employees` - ข้อมูลพนักงาน
- `master_rates` - อัตราค่าใช้จ่ายมาตรฐาน
- `budget_items` - รายการงบประมาณ
- `special_assist_items` - รายการเงินช่วยเหลือ
- `overtime_items` - รายการค่าล่วงเวลา
- `holidays` - ข้อมูลวันหยุดราชการ
- `assistance_data` - ข้อมูลการช่วยเหลือ

### การ Deploy ไป Vercel

1. เชื่อมต่อ repository กับ Vercel
2. ตั้งค่า environment variables ใน Vercel dashboard
3. Deploy จะเกิดขึ้นอัตโนมัติเมื่อ push ไป main branch

## 📁 โครงสร้างโปรเจค

```
├── client/src/           # Frontend React application
│   ├── components/       # React components
│   ├── hooks/           # Custom React hooks
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
├── server/              # Backend Express application
│   ├── index.ts         # Main server file
│   ├── routes.ts        # API routes
│   └── storage.ts       # Database operations
├── shared/              # Shared types and schemas
│   └── schema.ts        # Drizzle database schema
├── api/                 # Vercel serverless functions
└── dist/                # Build output directory
```

## 🎨 การออกแบบ

ระบบใช้ **Neumorphism Design** ที่ให้ความรู้สึกที่นุ่มนวลและทันสมัย:

- 🎭 **Soft shadows** และ **inset effects**
- 🌈 **Gradient backgrounds** 
- 💫 **Smooth transitions** 
- 📱 **Responsive design**
- 🌙 **Dark mode support**

## 📊 ฟีเจอร์การคำนวณ

### การคำนวณค่าเดินทาง
- ค่าที่พัก (ตามระดับตำแหน่ง)
- ค่าเบียเลี้ยง
- ค่าเดินทางไป-กลับ
- ค่าเดินทางในท้องถิ่น

### การคำนวณค่าช่วยเหลือ
- เงินช่วยเหลือรายเดือน
- เงินช่วยเหลือค่าเช่าบ้าน
- เงินช่วยเหลือก้อน

### การคำนวณค่าล่วงเวลา
- ค่าล่วงเวลาปกติ
- ค่าล่วงเวลาวันหยุด
- ค่าดำเนินงานพิเศษ

## 🗓️ ระบบวันหยุด

- วันหยุดราชการประจำปี
- วันหยุดธนาคารแห่งประเทศไทย
- การคำนวณวันทำงานจริง
- ปฏิทินภาษาไทย (พ.ศ.)

## 📱 การใช้งาน

1. **Dashboard** - ดูภาพรวมงบประมาณและสถิติ
2. **จัดการพนักงาน** - เพิ่ม แก้ไข ลบข้อมูลพนักงาน
3. **ตารางงบประมาณ** - จัดการงบประมาณรายปี
4. **คำนวณค่าใช้จ่าย** - คำนวณค่าเดินทางและค่าช่วยเหลือ
5. **จัดการวันทำงาน** - ตั้งค่าวันหยุดและคำนวณวันทำงาน

## 🔧 การพัฒนา

### คำสั่งที่ใช้บ่อย

```bash
# เริ่มการพัฒนา
npm run dev

# ตรวจสอบ TypeScript
npm run check

# อัพเดท database schema
npm run db:push

# Build สำหรับ production
npm run build
```

### การเพิ่มฟีเจอร์ใหม่

1. อัพเดท database schema ใน `shared/schema.ts`
2. อัพเดท storage interface ใน `server/storage.ts`
3. เพิ่ม API routes ใน `server/routes.ts`
4. สร้าง React components ใน `client/src/components/`
5. รัน `npm run db:push` เพื่ออัพเดท database

## 📄 License

MIT License - ดูรายละเอียดใน LICENSE file

---

**หมายเหตุ**: ระบบนี้ออกแบบมาเพื่อการใช้งานในหน่วยงานภาครัฐไทย โดยเฉพาะการจัดทำงบประมาณประจำปี