# 🌍 تطبيق التسوق العالمي برابح حقيقي
# Global Shopping & Earning App

## 📱 نظرة عامة / Overview

تطبيق تسوق عالمي متقدم يتيح للمستخدمين من جميع أنحاء العالم:
- ✅ التسوق من متاجر عالمية
- ✅ الربح من خلال الألعاب والاستطلاعات
- ✅ تحويل الأرباح إلى أموال حقيقية
- ✅ شراء وبيع آمن دولي

---

## 🎯 المميزات الرئيسية / Main Features

### 1. منصة التسوق العالمية 🛍️
- متاجر من جميع دول العالم
- فئات متنوعة من المنتجات
- نظام تقييم وتعليقات
- عروض وخصومات حسب الموقع الجغرافي

### 2. نظام الربح 💰
- **الألعاب**: ألعاب ممتعة مع جوائز نقدية
- **استطلاعات الرأي**: إجابة على أسئلة واكتساب نقاط
- **العروض الترويجية**: إتمام مهام وربح مكافآت
- **برنامج الإحالة**: دعوة أصدقاء والحصول على عمولات

### 3. نظام الدفع الآمن 🔐
- Stripe للدفع بطاقات الائتمان
- PayPal للتحويلات الدولية
- Apple Pay و Google Pay
- محفظة رقمية داخلية

### 4. المحفظة والتحويلات 💳
- تجميع الأرباح في محفظة
- تحويل آمن للبنك أو PayPal
- سحب الأموال للدول المدعومة
- سجل شامل للمعاملات

### 5. الأمان والموثوقية 🛡️
- تشفير جميع البيانات
- مصادقة ثنائية 2FA
- حماية من الاحتيال
- الامتثال لقوانين GDPR

---

## 🏗️ الهيكل التقني / Technical Architecture

```
📦 earn-money-app/
├── 📂 backend/           # الخادم الخلفي
│   ├── src/
│   │   ├── models/       # قاعدة البيانات
│   │   ├── routes/       # المسارات
│   │   ├── controllers/  # التحكم
│   │   ├── middleware/   # الحماية
│   │   └── services/     # الخدمات
│   ├── config/
│   └── package.json
├── 📂 frontend/          # الواجهة الأمامية (ويب)
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── styles/
│   └── package.json
├── 📂 mobile/            # تطبيق الموبايل
│   ├── src/
│   └── package.json
├── 📂 games/             # الألعاب
│   ├── 🎮 quiz-game
│   ├── 🎮 spin-wheel
│   └── 🎮 memory-game
├── 📂 docs/              # التوثيق
└── docker-compose.yml    # Docker
```

---

## 🚀 تقنيات المشروع / Technologies

| الجزء | التقنية |
|------|---------|
| **Backend** | Node.js, Express, MongoDB, JWT |
| **Frontend** | React, Next.js, TypeScript, Tailwind CSS |
| **Mobile** | React Native, Expo |
| **Games** | Phaser.js, Canvas |
| **Payments** | Stripe API, PayPal API |
| **Auth** | Firebase, JWT Tokens |
| **Database** | MongoDB Atlas |
| **Hosting** | AWS/Heroku/Vercel |

---

## 📊 قاعدة البيانات / Database Schema

### المستخدمين (Users)
```
- userId (فريد)
- email (فريد)
- password (مشفرة)
- name
- country
- wallet (الرصيد)
- bankAccount
- createdAt
```

### المنتجات (Products)
```
- productId
- name
- price
- currency
- category
- seller
- images
- rating
- reviews
```

### الطلبات (Orders)
```
- orderId
- userId
- products[]
- totalPrice
- status (pending, shipped, delivered)
- shippingAddress
- paymentMethod
```

### الأرباح (Earnings)
```
- earningId
- userId
- amount
- source (game, survey, referral)
- date
- status (pending, completed)
```

---

## 🎮 الألعاب المدرجة / Games Included

1. **🎲 لعبة الدوران (Spin Wheel)**
   - ادوارة حظ يومية
   - جوائز مختلفة

2. **🧠 لعبة الذاكرة (Memory Game)**
   - مستويات متعددة
   - جوائز متزايدة

3. **❓ لعبة الأسئلة (Quiz Game)**
   - أسئلة ثقافية عامة
   - نقاط بناءً على السرعة والدقة

4. **🎯 لعبة التسديد (Shooting Game)**
   - لعبة مثيرة
   - جوائز نقدية

---

## 📝 نظام الاستطلاعات / Surveys System

- استطلاعات من شركات عالمية
- أسئلة محددة حسب الدول
- مكافآت فورية
- معدل قبول عالي

---

## 💳 طرق الدفع المدعومة / Supported Payment Methods

### للشراء:
- ✅ بطاقات الائتمان (Visa, Mastercard)
- ✅ PayPal
- ✅ Apple Pay
- ✅ Google Pay
- ✅ التحويل البنكي

### للسحب:
- ✅ التحويل البنكي الدولي
- ✅ PayPal
- ✅ محافظ رقمية

---

## 🌍 الدول المدعومة / Supported Countries

- جميع دول العالم (200+)
- دعم العملات المحلية
- حسابات بنكية محلية
- خدمات شحن محلية

---

## 🔐 معايير الأمان / Security Standards

- ✅ HTTPS/TLS
- ✅ JWT Authentication
- ✅ 2FA (Two-Factor Authentication)
- ✅ PCI DSS Compliance
- ✅ GDPR Compliance
- ✅ Fraud Detection
- ✅ Data Encryption

---

## 📈 خطة التطوير / Development Roadmap

### Phase 1 (الأسابيع 1-4) ✅
- [x] إعداد البنية الأساسية
- [x] قاعدة البيانات
- [x] نظام المصادقة

### Phase 2 (الأسابيع 5-8)
- [ ] منصة التسوق الأساسية
- [ ] نظام السلة والطلبات
- [ ] نظام الدفع

### Phase 3 (الأسابيع 9-12)
- [ ] الألعاب الأساسية
- [ ] نظام الاستطلاعات
- [ ] المحفظة والسحب

### Phase 4 (الأسابيع 13-16)
- [ ] تطبيق الموبايل
- [ ] الإشعارات والتنبيهات
- [ ] التقارير والإحصائيات

### Phase 5 (الأسابيع 17-20)
- [ ] الاختبار الشامل
- [ ] تحسينات الأداء
- [ ] الإطلاق الرسمي

---

## 🚀 كيفية البدء / Getting Started

```bash
# استنساخ المستودع
git clone https://github.com/bdalmlkbnyhymhmsalm-gif/-earn-money-app.git
cd -earn-money-app

# تثبيت المتطلبات
npm install

# تشغيل الخادم
npm run dev
```

---

## 👥 فريق التطوير / Development Team

- **المطور الرئيسي**: @bdalmlkbnyhymhmsalm-gif
- **التاريخ**: أغسطس 2026

---

## 📞 التواصل والدعم / Support

- Email: support@earnmoney.app
- Telegram: @earnmoney_support
- WhatsApp: +1-XXX-XXX-XXXX

---

## 📄 الترخيص / License

MIT License - استخدم بحرية مع الإشارة للمصدر

---

**نعمل معاً لبناء مستقبل اقتصادي رقمي آمن وشامل! 🌟**
