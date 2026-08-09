# 🚀 التثبيت والإعداد / Installation & Setup Guide

## المتطلبات الأساسية / Prerequisites

```bash
✅ Node.js >= 16.0.0
✅ npm >= 8.0.0
✅ MongoDB >= 4.0
✅ Redis >= 7.0
✅ Docker & Docker Compose (اختياري)
```

---

## 1️⃣ تثبيت المشروع محلياً / Local Installation

### أ) استنساخ المستودع / Clone Repository

```bash
git clone https://github.com/bdalmlkbnyhymhmsalm-gif/-earn-money-app.git
cd -earn-money-app
```

### ب) تثبيت المتطلبات / Install Dependencies

**للخادم الخلفي (Backend):**
```bash
cd backend
npm install
```

**للواجهة الأمامية (Frontend):**
```bash
cd frontend
npm install
```

### ج) إعداد متغيرات البيئة / Setup Environment Variables

**في المجلد `backend/` قم بإنشاء ملف `.env`:**

```bash
cp .env.example .env
```

**ثم عدّل الملف بمعلوماتك:**

```env
# Server Config
NODE_ENV=development
PORT=5000
API_URL=http://localhost:5000
CLIENT_URL=http://localhost:3000

# Database
MONGODB_URI=mongodb://localhost:27017/earn-money-app
MONGODB_DEV=mongodb://localhost:27017/earn-money-app

# JWT
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d

# Stripe (Payment)
STRIPE_PUBLIC_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx

# Redis
REDIS_URL=redis://localhost:6379
```

---

## 2️⃣ تشغيل المشروع محلياً / Run Locally

### خيار أول: بدون Docker 🖥️

**في نافذة Terminal منفصلة، شغّل MongoDB:**
```bash
mongod
```

**في نافذة Terminal أخرى، شغّل Redis:**
```bash
redis-server
```

**شغّل الخادم الخلفي:**
```bash
cd backend
npm run dev
```

**في نافذة Terminal جديدة، شغّل الواجهة الأمامية:**
```bash
cd frontend
npm run dev
```

**الآن يمكنك الوصول إلى:**
- 🌐 الواجهة الأمامية: `http://localhost:3000`
- 🔌 الخادم الخلفي: `http://localhost:5000`
- 📚 API Docs: `http://localhost:5000/api/health`

---

### خيار ثاني: استخدام Docker 🐳

**تشغيل جميع الخدمات:**
```bash
docker-compose up -d
```

**التحقق من الحاويات:**
```bash
docker-compose ps
```

**عرض السجلات:**
```bash
docker-compose logs -f backend
```

**إيقاف الخدمات:**
```bash
docker-compose down
```

---

## 3️⃣ قاعدة البيانات / Database Setup

### إنشاء قاعدة بيانات أساسية:

```javascript
// في MongoDB Shell
use earn-money-app

// إنشاء مستخدم اختبار
db.users.insertOne({
  firstName: "Test",
  lastName: "User",
  email: "test@example.com",
  country: "EG",
  city: "Cairo",
  wallet: { balance: 100, currency: "USD" }
})
```

### إنشاء indexes:
```bash
npm run db:seed
```

---

## 4️⃣ إعدادات الدفع / Payment Configuration

### Stripe Setup:

1. اذهب إلى [Stripe Dashboard](https://dashboard.stripe.com)
2. انسخ `Publishable Key` و `Secret Key`
3. ضعهما في ملف `.env`

### PayPal Setup:

1. اذهب إلى [PayPal Developer](https://developer.paypal.com)
2. أنشئ تطبيق
3. انسخ Client ID و Secret

---

## 5️⃣ اختبار API / Test API

### استخدام Postman أو cURL:

**تسجيل مستخدم جديد:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "احمد",
    "lastName": "محمد",
    "email": "ahmed@example.com",
    "password": "password123",
    "phone": "+966501234567",
    "country": "SA",
    "city": "Riyadh"
  }'
```

**تسجيل دخول:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ahmed@example.com",
    "password": "password123"
  }'
```

**الحصول على الألعاب:**
```bash
curl http://localhost:5000/api/games
```

---

## 6️⃣ سكريبتات مفيدة / Useful Scripts

```bash
# إنشاء بيانات تجريبية
npm run seed

# تشغيل الاختبارات
npm test

# فحص الكود
npm run lint

# بناء الإنتاج
npm run build

# بدء في بيئة الإنتاج
npm start
```

---

## 7️⃣ استكشاف الأخطاء / Troubleshooting

### المشكلة: MongoDB غير متصل
**الحل:**
```bash
# تأكد من تشغيل MongoDB
mongod
# أو في Docker
docker-compose up -d mongodb
```

### المشكلة: Port مشغول
**الحل:**
```bash
# ابحث عن العملية المشغلة
lsof -i :5000
# اقتل العملية
kill -9 <PID>
```

### المشكلة: خطأ في الـ Dependencies
**الحل:**
```bash
# امسح المجلد والملف
rm -rf node_modules package-lock.json
npm install
```

---

## 8️⃣ ملاحظات أمان حساسة / Security Notes ⚠️

⚠️ **عم تنشر أبداً:**
- ملفات `.env` الحقيقية
- مفاتيح API
- كلمات مرور قاعدة البيانات

✅ **ما يجب فعله:**
- استخدم `.env.example` للمثال
- قم بإضافة `.env` إلى `.gitignore`
- استخدم متغيرات البيئة في الإنتاج

---

## 📞 الدعم / Support

للمساعدة:
- 📧 Email: support@earnmoney.app
- 💬 GitHub Issues: [Open an Issue](https://github.com/bdalmlkbnyhymhmsalm-gif/-earn-money-app/issues)
- 💭 Discussions: [GitHub Discussions](https://github.com/bdalmlkbnyhymhmsalm-gif/-earn-money-app/discussions)

---

**تم التحديث آخر مرة:** أغسطس 2026 ✅
