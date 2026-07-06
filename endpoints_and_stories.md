# دليل المسارات (API Endpoints) وقصص المستخدمين (User Stories) لمشروع RTA

تم تصميم هذا الدليل ليكون مرجعاً شاملاً لجميع واجهات البرمجة (APIs) الموجودة في المشروع، مع أمثلة حقيقية متوافقة تماماً مع شروط التحقق من البيانات (Zod Validation) وبنية قاعدة البيانات (Prisma DB Schema).

---

## أولاً: قائمة جميع الـ Endpoints والمثال المتوافق مع قاعدة البيانات

### 1. المصادقة والحسابات (Auth)
* **المسار الأساسي:** `/api/auth`

#### • تسجيل الدخول (Login)
* **المسار:** `POST /api/auth/login`
* **الحماية:** عام (Public)
* **المدخلات المطلوبة:**
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```
*(ملاحظة: إذا كان المستخدم مستفيداً وحالته `not_eligible` فسيتم منعه من تسجيل الدخول)*

#### • تسجيل الدخول للمستفيد (Beneficiary Login)
* **المسار:** `POST /api/auth/login-beneficiary`
* **الحماية:** عام (Public)
* **المدخلات المطلوبة:**
```json
{
  "national_id": "409876543",
  "release_date": "2026-01-15",
  "password": "password123"
}
```
*(المستفيد يسجل دخوله عن طريق رقم الهوية + تاريخ الإفراج + كلمة المرور، بدلاً من البريد الإلكتروني)*

#### • تسجيل الخروج (Logout)
* **المسار:** `POST /api/auth/logout`
* **الحماية:** عام (Public)
* **المدخلات المطلوبة:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### • تحديث رمز الوصول (Refresh Token)
* **المسار:** `POST /api/auth/refresh-token`
* **الحماية:** عام (Public)
* **المدخلات المطلوبة:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### • تغيير كلمة المرور (Change Password)
* **المسار:** `POST /api/auth/change-password`
* **الحماية:** محمي (يتطلب Header: `Authorization: Bearer <Token>`)
* **المدخلات المطلوبة:**
```json
{
  "oldPassword": "password123",
  "newPassword": "newpassword123"
}
```

---

### 2. إدارة المستخدمين (Users)
* **المسار الأساسي:** `/api/users`

#### • إضافة مستخدم جديد (Create User)
* **المسار:** `POST /api/users`
* **الحماية:** عام (Public)
* **المدخلات المطلوبة:**
```json
{
  "name": "أحمد العلي",
  "email": "ahmed.user@example.com",
  "password": "password123",
  "role": "donor", 
  "phone": "+970599123456"
}
```
*(الـ role المتاحة هي: `admin`, `donor`, `beneficiary`, `local_org`)*

#### • جلب جميع المستخدمين (Get All Users)
* **المسار:** `GET /api/users`
* **الحماية:** محمي (للمسؤول `admin` فقط)

#### • جلب مستخدم محدد (Get User by ID)
* **المسار:** `GET /api/users/:id`
* **الحماية:** محمي (لأي مستخدم مسجل دخول)

#### • تعديل بيانات مستخدم (Update User)
* **المسار:** `PUT /api/users/:id`
* **الحماية:** محمي (لصاحب الحساب أو المسؤول)
* **المدخلات الاختيارية:**
```json
{
  "name": "أحمد علي المحسن",
  "phone": "+970599654321",
  "is_active": true
}
```

#### • تعديل حالة النشاط للمستخدم (Update User Status)
* **المسار:** `PATCH /api/users/:id/status`
* **الحماية:** محمي (للمسؤول `admin` فقط)
* **المدخلات المطلوبة:**
```json
{
  "is_active": false
}
```

#### • حذف مستخدم (Delete User)
* **المسار:** `DELETE /api/users/:id`
* **الحماية:** محمي (للمسؤول `admin` فقط)

---

### 3. إدارة المستفيدين (Beneficiaries)
* **المسار الأساسي:** `/api/beneficiaries`

#### • إضافة مستفيد جديد (Create Beneficiary)
* **المسار:** `POST /api/beneficiaries`
* **الحماية:** محمي (للمسؤول `admin` فقط)
* **المدخلات المطلوبة:**
```json
{
  "name": "ياسر الكحلوت",
  "email": null,
  "password": "password123",
  "phone": "+970599222333",
  "national_id": "401234567",
  "area_id": 1,
  "family_size": 5,
  "income": 350.50,
  "patients_count": 1,
  "disabled_count": 0,
  "is_displaced": true
}
```
*(ملاحظة: المستفيد **لا يحتاج** إلى بريد إلكتروني، حقل `email` يمكن أن يكون `null`. بينما `admin`, `local_org`, `donor` البريد الإلكتروني إلزامي)*

#### • جلب جميع المستفيدين (Get All Beneficiaries)
* **المسار:** `GET /api/beneficiaries`
* **الحماية:** محمي (لـ `admin` أو `local_org` فقط)

#### • جلب بيانات مستفيد بالـ ID
* **المسار:** `GET /api/beneficiaries/:id`
* **الحماية:** محمي (لـ `admin` أو `local_org` أو نفس الـ `beneficiary`)

#### • تعديل بيانات مستفيد (Update Beneficiary)
* **المسار:** `PUT /api/beneficiaries/:id`
* **الحماية:** محمي (لـ `admin` أو `local_org` أو نفس الـ `beneficiary`)
* **المدخلات الاختيارية:**
```json
{
  "family_size": 6,
  "income": 400.00,
  "is_displaced": false,
  "status": "eligible"
}
```
*(الـ status المتاحة: `pending`, `eligible`, `not_eligible`)*

#### • حذف مستفيد (Delete Beneficiary)
* **المسار:** `DELETE /api/beneficiaries/:id`
* **الحماية:** محمي (للمسؤول `admin` فقط)

#### • جلب سجل توزيع المساعدات للمستفيد (Beneficiary History)
* **المسار:** `GET /api/beneficiaries/:id/history`
* **الحماية:** محمي (لـ `admin` أو `local_org` أو نفس الـ `beneficiary`)

---

### 4. إدارة المانحين (Donors)
* **المسار الأساسي:** `/api/donors`

#### • إضافة مانح جديد (Create Donor)
* **المسار:** `POST /api/donors`
* **الحماية:** محمي (للمسؤول `admin` فقط)
* **المدخلات المطلوبة:**
```json
{
  "name": "مؤسسة الهلال الأحمر",
  "email": "redcrescent@example.com",
  "password": "password123",
  "phone": "+972599555111",
  "org_name": "Red Crescent Humanitarian Association",
  "country": "Palestine"
}
```

#### • جلب جميع المانحين (Get All Donors)
* **المسار:** `GET /api/donors`
* **الحماية:** محمي (للمسؤول `admin` فقط)

#### • جلب مانح محدد (Get Donor by ID)
* **المسار:** `GET /api/donors/:id`
* **الحماية:** محمي (لـ `admin` أو نفس الـ `donor` فقط)

#### • تعديل بيانات المانح (Update Donor)
* **المسار:** `PUT /api/donors/:id`
* **الحماية:** محمي (لـ `admin` أو نفس الـ `donor` فقط)
* **المدخلات الاختيارية:**
```json
{
  "org_name": "جمعية الهلال الأحمر الفلسطيني",
  "country": "Jordan"
}
```

#### • حذف مانح (Delete Donor)
* **المسار:** `DELETE /api/donors/:id`
* **الحماية:** محمي (للمسؤول `admin` فقط)

---

### 5. إدارة الجمعيات/المؤسسات المحلية (Local Organizations)
* **المسار الأساسي:** `/api/organizations`

#### • إضافة جمعية شريكة جديدة (Create Organization)
* **المسار:** `POST /api/organizations`
* **الحماية:** محمي (للمسؤول `admin` فقط)
* **المدخلات المطلوبة:**
```json
{
  "name": "جمعية الرحمة للإغاثة",
  "email": "rahma.org@example.com",
  "password": "password123",
  "phone": "+970599888999",
  "org_name": "Al-Rahma Association",
  "area_id": 2,
  "focus_area": "الإغاثة الطارئة",
  "staff_count": 50
}
```

#### • جلب جميع الجمعيات (Get All Organizations)
* **المسار:** `GET /api/organizations`
* **الحماية:** محمي (للمسؤول `admin` فقط)

#### • جلب بيانات جمعية محددة
* **المسار:** `GET /api/organizations/:id`
* **الحماية:** محمي (لـ `admin` أو نفس الـ `local_org` فقط)

#### • تعديل بيانات الجمعية (Update Organization)
* **المسار:** `PUT /api/organizations/:id`
* **الحماية:** محمي (لـ `admin` أو نفس الـ `local_org` فقط)
* **المدخلات الاختيارية:**
```json
{
  "org_name": "جمعية الرحمة للتنمية الاجتماعية",
  "area_id": 3
}
```

#### • حذف جمعية (Delete Organization)
* **المسار:** `DELETE /api/organizations/:id`
* **الحماية:** محمي (للمسؤول `admin` فقط)

#### • تفعيل/التحقق من الجمعية (Verify Organization)
* **المسار:** `PATCH /api/organizations/:id/verify`
* **الحماية:** محمي (للمسؤول `admin` فقط)
* **المدخلات المطلوبة:**
```json
{
  "is_verified": true
}
```
ىحة
---

### 6. إدارة التبرعات (Donations)
* **المسار الأساسي:** `/api/donations`

#### • تسجيل تبرع مالي (Create Donation)
* **المسار:** `POST /api/donations`
* **الحماية:** عام (يمكن لمانح مسجل أو كـ زائر `Guest` التبرع)
* **المدخلات المطلوبة:**
```json
{
  "donor_id": 1,
  "guest_name": null,
  "guest_email": null,
  "amount": 2500,
  "currency": "USD",
  "tracking_code": "DON-TRK-77889"
}
```
*(أو كـ زائر بدون حساب: `"guest_name": "فاعل خير"`, `"guest_email": "guest@example.com"`, `"donor_id": null`)*
*(ملاحظة: إذا تم إرسال `donor_id` موجود مسبقاً، سيتم إضافة المبلغ إلى التبرع السابق ولن يتم إنشاء سجل جديد)*

#### • جلب قائمة التبرعات (Get All Donations)
* **المسار:** `GET /api/donations`
* **الحماية:** محمي (للمسؤول `admin` فقط)

#### • جلب تبرع بالـ ID
* **المسار:** `GET /api/donations/:id`
* **الحماية:** محمي (للمستخدمين المسجلين)

#### • تعديل تبرع (Update Donation)
* **المسار:** `PUT /api/donations/:id`
* **الحماية:** محمي (للمسؤول `admin` فقط)

#### • حذف تبرع (Delete Donation)
* **المسار:** `DELETE /api/donations/:id`
* **الحماية:** محمي (للمسؤول `admin` فقط)

---

### 7. تتبع التبرعات (Donation Tracking)
* **المسار الأساسي:** `/api/donation-tracking`

#### • إضافة مرحلة تتبع للتبرع (Create Tracking)
* **المسار:** `POST /api/donation-tracking`
* **الحماية:** محمي (لـ `admin` أو `local_org` فقط)
* **المدخلات المطلوبة:**
```json
{
  "donation_id": 1,
  "status": "In Warehouse",
  "description": "الطرود المشتراة بالتبرع وصلت لمخازن رفح"
}
```

#### • جلب تتبع بالـ ID أو جلب الكل
* **المسار:** `GET /api/donation-tracking` و `GET /api/donation-tracking/:id`
* **الحماية:** محمي (لأي مستخدم مسجل دخول)

#### • تعديل مرحلة التتبع (Update Tracking)
* **المسار:** `PUT /api/donation-tracking/:id`
* **الحماية:** محمي (لـ `admin` أو `local_org` فقط)
* **المدخلات الاختيارية:**
```json
{
  "status": "Distributed",
  "description": "تم توزيع المساعدات بالكامل للمستفيدين"
}
```

#### • حذف تتبع (Delete Tracking)
* **المسار:** `DELETE /api/donation-tracking/:id`
* **الحماية:** محمي (للمسؤول `admin` فقط)

---

### 8. فئات وأنواع المساعدات (Aid Categories & Types)

#### • إنشاء فئة مساعدات (Create Category)
* **المسار:** `POST /api/aid-categories`
* **الحماية:** محمي (للمسؤول `admin` فقط)
* **المدخلات المطلوبة:**
```json
{
  "name": "مساعدات غذائية",
  "description": "الطرود الغذائية الجافة والمياه"
}
```

#### • إنشاء نوع مساعدات محدد (Create Aid Type)
* **المسار:** `POST /api/aid-types`
* **الحماية:** محمي (للمسؤول `admin` فقط)
* **المدخلات المطلوبة:**
```json
{
  "category_id": 1,
  "name": "طرد غذائي أساسي عائلي",
  "unit": "طرد"
}
```

---

### 9. مخزون المساعدات العينية والغذائية (Aids Stock)
* **المسار الأساسي:** `/api/aids`

#### • تسجيل وصول شحنة مساعدات (Create Aid Stock)
* **المسار:** `POST /api/aids`
* **الحماية:** محمي (لـ `admin` أو `local_org` فقط)
* **المدخلات المطلوبة:**
```json
{
  "aid_type_id": 1,
  "org_id": 1,
  "quantity": 1000,
  "expiry_date": "2026-12-31",
  "batch_code": "BATCH-FOOD-01-A"
}
```
*(ملاحظة: حقل `org_id` اختياري ويمثل الجمعية المستلمة للشحنة، ويمكن أن يكون `null` أو يتم حذفه من الـ Request Body. حقل `batch_code` و `expiry_date` اختياريان أيضاً).*
*(ملاحظة هامة: إذا تم إضافة شحنة بنفس `aid_type_id` و `org_id`، سيتم زيادة الكمية على السجل الموجود ولن يتم إنشاء سجل جديد)*

#### • جلب قائمة المخزون (Get All Aids)
* **المسار:** `GET /api/aids`
* **الحماية:** محمي (لـ `admin` أو `local_org` فقط)

#### • خصم كمية من المخزون (Deduct Aid Quantity)
* **المسار:** `PATCH /api/aids/:id/deduct`
* **الحماية:** محمي (لـ `admin` أو `local_org` فقط)
* **المدخلات المطلوبة:**
```json
{
  "quantity": 10
}
```
*(سيتم إرجاع خطأ إذا كانت الكمية المطلوبة أكبر من المتبقي `remaining_quantity`)*

---

### 10. حملات التبرعات (Campaigns)
* **المسار الأساسي:** `/api/campaigns`

#### • إنشاء حملة تبرعات جديدة (Create Campaign)
* **المسار:** `POST /api/campaigns`
* **الحماية:** محمي (للمسؤول `admin` فقط)
* **المدخلات المطلوبة:**
```json
{
  "title": "حملة إغاثة غزة العاجلة",
  "description": "حملة مخصصة لشراء الطرود الغذائية ومياه الشرب الصالحة",
  "target_amount": 100000.00,
  "start_date": "2026-06-10",
  "end_date": "2026-08-30"
}
```

#### • جلب جميع الحملات (Get All Campaigns)
* **المسار:** `GET /api/campaigns` (عام للجميع لرؤية التبرعات)

---

### 11. التحقق من المستفيدين وتوثيقهم (Beneficiary Verifications)
* **المسار الأساسي:** `/api/beneficiary-verifications`

#### • إنشاء سجل توثيق وبحث اجتماعي للمستفيد (Create Verification)
* **المسار:** `POST /api/beneficiary-verifications`
* **الحماية:** محمي (لـ `admin` أو `local_org` الشريكة فقط)
* **المدخلات المطلوبة:**
```json
{
  "beneficiary_id": 1,
  "org_id": null,
  "result": "approved",
  "notes": "تمت الزيارة الميدانية للأسرة وتطابق البيانات الاجتماعية."
}
```
*(ملاحظة: حقل `org_id` اختياري ويمكن أن يرسل كـ `null` أو يتم حذفه تماماً من الـ Body).*
*(الـ result المتاح: `approved` أو `rejected`)*

#### • تعديل سجل توثيق (Update Verification)
* **المسار:** `PUT /api/beneficiary-verifications/:id`
* **الحماية:** محمي (للمسؤول `admin` فقط)

---

### 12. توزيع المساعدات (Distributions)
* **المسار الأساسي:** `/api/distributions`

#### • تسجيل عملية توزيع طرد للمستفيد (Create Distribution)
* **المسار:** `POST /api/distributions`
* **الحماية:** محمي (للمسؤول `admin` فقط)
* **المدخلات المطلوبة:**
```json
{
  "beneficiary_id": 1,
  "aid_id": 1,
  "distribution_cycle_id": 1,
  "quantity": 1,
  "notes": "تسليم باليد للمستفيد"
}
```

---

### 13. الشكاوى والمقترحات (Complaints)
* **المسار الأساسي:** `/api/complaints`

#### • تقديم شكوى جديدة (Create Complaint)
* **المسار:** `POST /api/complaints`
* **الحماية:** محمي (لـ `beneficiary` فقط)
* **المدخلات المطلوبة:**
```json
{
  "beneficiary_id": 1,
  "subject": "تأخر استلام الطرد الغذائي",
  "message": "نحن في الدورة الثانية ولم يصلنا اتصال للاستلام مع أن حالتنا تم التحقق منها."
}
```

#### • الرد على الشكوى وإغلاقها (Resolve Complaint)
* **المسار:** `PATCH /api/complaints/:id/resolve`
* **الحماية:** محمي (للمسؤول `admin` فقط)
* **المدخلات المطلوبة:**
```json
{
  "admin_response": "تم معالجة الطلب، وتوجيه الجمعية في منطقتكم لتسليمكم الطرد غداً صباحاً.",
  "status": "resolved"
}
```

### 14. المحافظات والمناطق (Governorates & Areas)
* **المسارات الأساسية:** `/api/governorates` و `/api/areas`

#### • إنشاء محافظة جديدة (Create Governorate)
* **المسار:** `POST /api/governorates`
* **الحماية:** محمي (لـ `admin` فقط)
* **المدخلات المطلوبة:**
```json
{
  "name": "محافظة غزة"
}
```

#### • جلب قائمة المحافظات (Get All Governorates)
* **المسار:** `GET /api/governorates`
* **الحماية:** محمي (لأي مستخدم مسجل دخول)

#### • جلب محافظة بالـ ID
* **المسار:** `GET /api/governorates/:id`
* **الحماية:** محمي (لأي مستخدم مسجل دخول)

#### • تعديل محافظة (Update Governorate)
* **المسار:** `PUT /api/governorates/:id`
* **الحماية:** محمي (لـ `admin` فقط)
* **المدخلات المطلوبة:**
```json
{
  "name": "محافظة غزة والشمال"
}
```

#### • حذف محافظة (Delete Governorate)
* **المسار:** `DELETE /api/governorates/:id`
* **الحماية:** محمي (لـ `admin` فقط)

#### • إنشاء منطقة جديدة (Create Area)
* **المسار:** `POST /api/areas`
* **الحماية:** محمي (لـ `admin` فقط)
* **المدخلات المطلوبة:**
```json
{
  "name": "الرمال",
  "governorate_id": 1
}
```

#### • جلب قائمة المناطق (Get All Areas)
* **المسار:** `GET /api/areas`
* **الحماية:** محمي (لأي مستخدم مسجل دخول)

#### • جلب منطقة بالـ ID
* **المسار:** `GET /api/areas/:id`
* **الحماية:** محمي (لأي مستخدم مسجل دخول)

#### • تعديل منطقة (Update Area)
* **المسار:** `PUT /api/areas/:id`
* **الحماية:** محمي (لـ `admin` فقط)
* **المدخلات المطلوبة:**
```json
{
  "name": "الرمال الشمالي",
  "governorate_id": 1
}
```

#### • حذف منطقة (Delete Area)
* **المسار:** `DELETE /api/areas/:id`
* **الحماية:** محمي (لـ `admin` فقط)

---

## ثانياً: قصص المستخدمين (User Stories) والمدخلات الكاملة لكل دورة

فيما يلي 3 سيناريوهات كاملة تحاكي دورة عمل النظام من البداية وحتى النهاية:

### القصة الأولى: دورة حياة تبرع عيني وتوزيعه (تبرع بالملابس أو الأغذية)
**الهدف:** تسجيل مانح لحسابه، ثم تسجيله لشحنة تبرع بالدقيق، وتوثيق استلامها، وتوزيعها لمستفيد مسجل وموثق.

#### الخطوة 1: تسجيل المتبرع
* **الأمر:** `POST /api/auth/register`
* **البيانات المُرسلة:**
```json
{
  "name": "جمعية الخير الدولية",
  "email": "al-khair@donor.org",
  "password": "password1234",
  "phone": "+962799123456",
  "role": "donor"
}
```
* **الرد المتوقع:** `201 Created` مع تفاصيل المستخدم.

#### الخطوة 2: تسجيل دخول المانح للحصول على التوكن
* **الأمر:** `POST /api/auth/login`
* **البيانات المُرسلة:**
```json
{
  "email": "al-khair@donor.org",
  "password": "password1234"
}
```
* **الرد المتوقع:** `200 OK` يعطيك الـ `accessToken` (قم بنسخه واستخدامه في الـ Bearer Token للخطوة 3).

#### الخطوة 3: إضافة المانح لملف تفصيلي له (من قبل الأدمن)
* **الأمر:** `POST /api/donors` (بصلاحية `admin`)
* **البيانات المُرسلة:**
```json
{
  "user_id": 3,
  "org_name": "مؤسسة الخير للإغاثة والتنمية",
  "country": "Jordan"
}
```

#### الخطوة 4: تسجيل شحنة دقيق (Aids Stock) من قبل المانح أو الأدمن
* **الأمر:** `POST /api/aids` (الحماية: المانح أو الأدمن)
* **البيانات المُرسلة:**
```json
{
  "aid_type_id": 1, 
  "donor_id": 3,
  "quantity": 500,
  "expiry_date": "2026-11-30",
  "batch_code": "BATCH-FLOUR-JORDAN-05"
}
```
*(ملاحظة: تأكد من وجود `aid_type_id` مسجل مسبقاً في جدول أنواع المساعدات)*

---

### القصة الثانية: تسجيل المستفيد والتحقق من أهليته (Beneficiary Flow)
**الهدف:** تسجيل عائلة نازحة في النظام، وزيارتها ميدانياً من قبل الجمعية المحلية وتغيير حالتها لـ "مؤهل للاستلام".

#### الخطوة 1: تسجيل المستفيد للحساب الأساسي (من قبل الأدمن)
* **الأمر:** `POST /api/beneficiaries` (بصلاحية `admin`)
* **البيانات المُرسلة:**
```json
{
  "name": "عبد الله الشنطي",
  "email": null,
  "password": "password123",
  "phone": "+970599777888",
  "national_id": "409876543",
  "area_id": 1,
  "family_size": 7,
  "income": 100.00,
  "patients_count": 2,
  "disabled_count": 1,
  "is_displaced": true,
  "release_date": "2026-01-15"
}
```
*(ملاحظة: المستفيد لا يحتاج لبريد إلكتروني، يتم تسجيل دخوله عبر `national_id` + `release_date` + `password`)*

#### الخطوة 2: زيارة الجمعية المحلية وتوثيق البحث الاجتماعي (Verification)
تقوم الجمعية المحلية (Local Org) الشريكة بعد زيارة خيمتهم بإرسال تقرير التحقق الميداني:
* **الأمر:** `POST /api/beneficiary-verifications` (يتطلب تسجيل دخول بصلاحية `local_org` أو `admin`)
* **البيانات المُرسلة:**
```json
{
  "beneficiary_id": 1,
  "org_id": 2, 
  "result": "approved",
  "notes": "الأسرة تسكن في خيمة مهترئة، ومصدر الدخل منعدم تماماً، ويوجد طفلان يعانيان من أمراض مزمنة."
}
```
* **النتيجة البرمجية:** يتم تلقائياً تحديث حالة أهليته في جدول المستفيدين إلى `eligible` وتفعيل حقه في استلام الحصص القادمة.

---

### القصة الثالثة: دورة توزيع المساعدات (Distribution Flow)
**الهدف:** إنشاء دورة توزيع للمساعدات، ثم إثبات تسليم طرد للمستفيد المعتمد.

#### الخطوة 1: الأدمن ينشئ دورة توزيع جديدة (Distribution Cycle)
* **الأمر:** `POST /api/distribution-cycles` (بصلاحية `admin`)
* **البيانات المُرسلة:**
```json
{
  "name": "دورة توزيع طرود الطحين - يونيه 2026",
  "description": "توزيع كيس دقيق 25 كيلو لكل أسرة مؤهلة نازحة في مخيم دير البلح",
  "start_date": "2026-06-10",
  "end_date": "2026-06-20"
}
```

#### الخطوة 2: تنفيذ التوزيع وتسليم المستفيد (Create Distribution Record)
* **الأمر:** `POST /api/distributions` (بصلاحية `admin`)
* **البيانات المُرسلة:**
```json
{
  "beneficiary_id": 1,
  "aid_id": 1,
  "distribution_cycle_id": 1,
  "quantity": 1,
  "notes": "تم تسليم الحصة للمستفيد باليد بعد التحقق من الهوية الشخصية."
}
```
* **النتيجة البرمجية:** يقل كمية المخزون المتبقية للـ Aid بمقدار 1، ويُسجل في تاريخ المستفيد أنه استلم المساعدة بنجاح.

#### الخطوة 3: مراجعة الإحصائيات العامة (Dashboard Stats)
يمكن للأدمن استدعاء لوحة المعلومات لمعاينة النسبة الإجمالية للتوزيع والمخزون:
* **الأمر:** `GET /api/reports/dashboard` (بصلاحية `admin`)
* **النتيجة المتوقعة:** قائمة بإجمالي المساعدات الموزعة، عدد المستفيدين الإجمالي، التبرعات المستلمة، والنسب المئوية للتسليم.
