CREATE DATABASE IF NOT EXISTS rta_aid_system
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE rta_aid_system;

-- =====================================================
-- الجدول 1: users — كل مستخدمي النظام
-- =====================================================
CREATE TABLE users (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    email      VARCHAR(150) NULL UNIQUE, -- يسمح بـ NULL للمستفيدين منعاً للمشاكل الميدانية
    password   VARCHAR(255) NOT NULL,
    role       ENUM('admin','donor','beneficiary','local_org') NOT NULL,
    phone      VARCHAR(20),
    is_active  BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- الجدول 2: governorates — المحافظات
-- =====================================================
CREATE TABLE governorates (
    id   INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(80) NOT NULL
);

-- =====================================================
-- الجدول 3: areas — المناطق داخل كل محافظة
-- =====================================================
CREATE TABLE areas (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    governorate_id INT NOT NULL,
    name           VARCHAR(100) NOT NULL,
    FOREIGN KEY (governorate_id) REFERENCES governorates(id)
);

-- =====================================================
-- الجدول 4: beneficiaries — المستفيدون
-- =====================================================
CREATE TABLE beneficiaries (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    user_id        INT NOT NULL UNIQUE,
    national_id    VARCHAR(20) NOT NULL UNIQUE,
    area_id        INT,
    family_size    INT NOT NULL,
    income         DECIMAL(10,2) DEFAULT 0,
    patients_count INT DEFAULT 0,
    disabled_count INT DEFAULT 0,
    is_displaced   BOOLEAN DEFAULT FALSE,
    priority_score DECIMAL(8,2) DEFAULT 0,
    status         ENUM('pending','eligible','not_eligible') DEFAULT 'pending',
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id)  REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (area_id)  REFERENCES areas(id) ON DELETE SET NULL
);

-- =====================================================
-- الجدول 5: donors — المتبرعون
-- =====================================================
CREATE TABLE donors (
    id       INT AUTO_INCREMENT PRIMARY KEY,
    user_id  INT NOT NULL UNIQUE,
    org_name VARCHAR(200),
    country  VARCHAR(80),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =====================================================
-- الجدول 6: local_organizations — المنظمات المحلية
-- =====================================================
CREATE TABLE local_organizations (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    user_id     INT NOT NULL UNIQUE,
    org_name    VARCHAR(200) NOT NULL,
    area_id     INT,
    is_verified BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id)  REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (area_id)  REFERENCES areas(id) ON DELETE SET NULL
);

-- =====================================================
-- الجدول 7: aid_categories — تصنيفات المساعدات
-- =====================================================
CREATE TABLE aid_categories (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(80) NOT NULL,
    description TEXT
);

-- =====================================================
-- الجدول 8: aid_types — أنواع المساعدات
-- =====================================================
CREATE TABLE aid_types (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name        VARCHAR(120) NOT NULL,
    unit        VARCHAR(30) DEFAULT 'item',
    FOREIGN KEY (category_id) REFERENCES aid_categories(id)
);

-- =====================================================
-- الجدول 9: campaigns — حملات التبرع (جديد)
-- =====================================================
CREATE TABLE campaigns (
    id                INT AUTO_INCREMENT PRIMARY KEY,
    title             VARCHAR(200) NOT NULL,
    description       TEXT,
    target_amount     DECIMAL(12,2),
    collected_amount  DECIMAL(12,2) DEFAULT 0,
    start_date        DATE,
    end_date          DATE,
    status            ENUM('active','closed') DEFAULT 'active',
    created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- الجدول 10: aids — مخزون المساعدات (الدُفَع)
-- =====================================================
CREATE TABLE aids (
    id                 INT AUTO_INCREMENT PRIMARY KEY,
    aid_type_id        INT NOT NULL,
    donor_id           INT,
    org_id             INT,
    quantity           INT NOT NULL,
    remaining_quantity INT NOT NULL,
    expiry_date        DATE,
    status             ENUM('active','exhausted','expired') DEFAULT 'active',
    batch_code         VARCHAR(50) UNIQUE, -- تم دمج العمود المعدل هنا مباشرة
    created_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (aid_type_id) REFERENCES aid_types(id),
    FOREIGN KEY (donor_id)    REFERENCES donors(id) ON DELETE SET NULL,
    FOREIGN KEY (org_id)      REFERENCES local_organizations(id) ON DELETE SET NULL
);

-- =====================================================
-- الجدول 11: distribution_cycles — دورات توزيع المساعدات (معدل وجديد)
-- =====================================================
CREATE TABLE distribution_cycles (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    name          VARCHAR(200) NOT NULL,
    description   TEXT,
    start_date    DATE,
    end_date      DATE,
    status        ENUM('planned','active','completed','cancelled') DEFAULT 'planned',
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- الجدول 12: distributions — التوزيعات
-- =====================================================
CREATE TABLE distributions (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    aid_id         INT NOT NULL,
    beneficiary_id INT NOT NULL,
    org_id         INT,
    cycle_id       INT NULL, -- تم دمج العمود المعدل هنا مباشرة لربطه بالدورة
    quantity_given INT NOT NULL,
    status         ENUM('pending','delivered','cancelled') DEFAULT 'pending',
    delivered_at   TIMESTAMP,
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (aid_id)         REFERENCES aids(id) ON DELETE CASCADE,
    FOREIGN KEY (beneficiary_id) REFERENCES beneficiaries(id) ON DELETE CASCADE,
    FOREIGN KEY (org_id)         REFERENCES local_organizations(id) ON DELETE SET NULL,
    FOREIGN KEY (cycle_id)       REFERENCES distribution_cycles(id) ON DELETE SET NULL
);

-- =====================================================
-- الجدول 13: donations — التبرعات المالية
-- =====================================================
CREATE TABLE donations (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    donor_id       INT,
    guest_name     VARCHAR(100),
    guest_email    VARCHAR(150),
    amount         DECIMAL(10,2) NOT NULL,
    currency       VARCHAR(10) DEFAULT 'ILS',
    tracking_code  VARCHAR(20) NOT NULL UNIQUE,
    status         ENUM('pending','completed','failed') DEFAULT 'pending',
    donated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (donor_id) REFERENCES donors(id) ON DELETE SET NULL
);

-- =====================================================
-- الجدول 14: donation_tracking — تتبع مراحل التبرعات (جديد)
-- =====================================================
CREATE TABLE donation_tracking (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    donation_id   INT NOT NULL,
    status        VARCHAR(100) NOT NULL,
    description   TEXT,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (donation_id) REFERENCES donations(id) ON DELETE CASCADE
);

-- =====================================================
-- الجدول 15: beneficiary_verifications — التحقق من المستفيدين (جديد)
-- =====================================================
CREATE TABLE beneficiary_verifications (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    beneficiary_id  INT NOT NULL,
    org_id          INT NULL,
    verified_by     INT,
    result          ENUM('approved','rejected') NOT NULL,
    notes           TEXT,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (beneficiary_id) REFERENCES beneficiaries(id) ON DELETE CASCADE,
    FOREIGN KEY (org_id)         REFERENCES local_organizations(id) ON DELETE SET NULL,
    FOREIGN KEY (verified_by)    REFERENCES users(id) ON DELETE SET NULL
);

-- =====================================================
-- الجدول 16: sync_logs — دعم العمل أثناء انقطاع الإنترنت (جديد)
-- =====================================================
CREATE TABLE sync_logs (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    user_id        INT,
    operation_type VARCHAR(50) NOT NULL,
    table_name     VARCHAR(100) NOT NULL,
    record_id      INT,
    sync_status    ENUM('pending','synced','failed') DEFAULT 'pending',
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    synced_at      TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- =====================================================
-- الجدول 17: complaints — الشكاوى
-- =====================================================
CREATE TABLE complaints (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    beneficiary_id INT NOT NULL,
    subject        VARCHAR(200) NOT NULL,
    message        TEXT NOT NULL,
    status         ENUM('open','under_review','resolved') DEFAULT 'open',
    admin_response TEXT,
    resolved_by    INT,
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (beneficiary_id) REFERENCES beneficiaries(id) ON DELETE CASCADE,
    FOREIGN KEY (resolved_by)    REFERENCES users(id) ON DELETE SET NULL
);

-- =====================================================
-- الجدول 18: notifications — الإشعارات
-- =====================================================
CREATE TABLE notifications (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    user_id    INT NOT NULL,
    title      VARCHAR(200) NOT NULL,
    message    TEXT NOT NULL,
    is_read    BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =====================================================
-- الجدول 19: audit_logs — سجل كل العمليات للرقابة والأمان
-- =====================================================
CREATE TABLE audit_logs (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    user_id     INT,
    action      VARCHAR(100) NOT NULL,
    table_name  VARCHAR(60),
    record_id   INT,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);


-- =====================================================
-- SEED DATA — البيانات الأولية المدمجة بالكامل
-- =====================================================

INSERT INTO governorates (name) VALUES
  ('شمال غزة'), ('غزة'), ('دير البلح'), ('خان يونس'), ('رفح');

INSERT INTO areas (governorate_id, name) VALUES
  (1,'بيت لاهيا'), (1,'بيت حانون'), (1,'جباليا'),
  (2,'الشجاعية'), (2,'الرمال'), (2,'الزيتون'), (2,'التفاح'),
  (3,'دير البلح'), (3,'المغازي'), (3,'النصيرات'),
  (4,'خان يونس'), (4,'عبسان'), (4,'بني سهيلا'),
  (5,'رفح'), (5,'تل السلطان');

INSERT INTO aid_categories (name, description) VALUES
  ('غذائي',  'سلال غذائية، دقيق، زيت، معلبات'),
  ('طبي',    'أدوية، معدات طبية، لوازم صحية'),
  ('مالي',   'مساعدات نقدية'),
  ('ملابس',  'ملابس وأحذية'),
  ('مأوى',   'خيام، بطانيات، مواد بناء'),
  ('تعليمي', 'كتب، قرطاسية، حقائب مدرسية');

INSERT INTO aid_types (category_id, name, unit) VALUES
  (1,'سلة غذائية أساسية','سلة'),
  (1,'دقيق طحين 25 كجم','كيس'),
  (1,'زيت طعام','لتر'),
  (1,'علب معلبات','كرتون'),
  (2,'حقيبة إسعافات أولية','حقيبة'),
  (2,'أدوية ضغط الدم','علبة'),
  (2,'مستلزمات طبية عامة','طرد'),
  (3,'مساعدة نقدية','شيكل'),
  (4,'حقيبة ملابس شتوية','حقيبة'),
  (5,'خيمة إيواء','خيمة'),
  (5,'بطانية','قطعة'),
  (6,'حقيبة مدرسية','حقيبة');

-- البيانات الأولية للحملات (المضافة حديثاً)
INSERT INTO campaigns 
(title, description, target_amount, collected_amount, start_date, end_date, status)
VALUES
('Ramadan Food Campaign', 'Providing food baskets for families during Ramadan', 50000.00, 0.00, '2026-01-01', '2026-03-31', 'active'),
('Winter Relief Campaign', 'Providing blankets and shelter support', 30000.00, 0.00, '2026-10-01', '2026-12-31', 'active');

-- البيانات الأولية لدورات التوزيع (المضافة حديثاً)
INSERT INTO distribution_cycles 
(name, description, start_date, end_date, status)
VALUES
('Ramadan 2026', 'Food aid distribution during Ramadan', '2026-03-01', '2026-03-31', 'active'),
('Emergency Relief May 2026', 'Emergency aid distribution', '2026-05-01', '2026-05-31', 'planned');

-- =====================================================
-- الجدول 20: pickup_locations — نقاط الاستلام
-- =====================================================
CREATE TABLE IF NOT EXISTS pickup_locations (
    id      INT AUTO_INCREMENT PRIMARY KEY,
    area_id INT NOT NULL,
    name    VARCHAR(200) NOT NULL,
    FOREIGN KEY (area_id) REFERENCES areas(id) ON UPDATE RESTRICT,
    INDEX (area_id)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- البيانات الوهمية لنقاط الاستلام
INSERT INTO pickup_locations (area_id, name) VALUES
  -- شمال غزة (areas 1,2,3)
  (1, 'مركز توزيع بيت لاهيا الرئيسي'),
  (1, 'مدرسة بيت لاهيا الأساسية - نقطة استلام'),
  (2, 'مستودع أونروا بيت حانون'),
  (2, 'ساحة البلدية - بيت حانون'),
  (3, 'مركز جباليا للمساعدات الإنسانية'),
  (3, 'مخيم جباليا - نقطة التوزيع الشمالية'),
  -- غزة (areas 4,5,6,7)
  (4, 'مركز الشجاعية للإغاثة'),
  (4, 'مسجد الشجاعية الكبير - نقطة استلام'),
  (5, 'مقر الهلال الأحمر - الرمال'),
  (5, 'حديقة الرمال العامة - نقطة توزيع'),
  (6, 'مركز حي الزيتون الإغاثي'),
  (7, 'مستودع التفاح - المستودع الرئيسي'),
  -- دير البلح (areas 8,9,10)
  (8, 'مركز دير البلح للمساعدات'),
  (9, 'مخيم المغازي - نقطة الاستلام المركزية'),
  (10, 'ساحة مخيم النصيرات'),
  -- خان يونس (areas 11,12,13)
  (11, 'مركز خان يونس الرئيسي للإغاثة'),
  (12, 'قاعة عبسان الاجتماعية - نقطة توزيع'),
  (13, 'مدرسة بني سهيلا للبنين - نقطة استلام'),
  -- رفح (areas 14,15)
  (14, 'مركز رفح لإيواء النازحين - نقطة توزيع'),
  (15, 'مخيم تل السلطان - نقطة الاستلام الرئيسية');

-- =====================================================
-- الجدول 21: beneficiary_orders — طلبات المستفيدين
-- =====================================================
CREATE TABLE IF NOT EXISTS beneficiary_orders (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    beneficiary_id INT NOT NULL,
    aid_type_id    INT NOT NULL,
    description    TEXT,
    status         ENUM('pending','approved','rejected') DEFAULT 'pending',
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (beneficiary_id) REFERENCES beneficiaries(id) ON DELETE CASCADE,
    FOREIGN KEY (aid_type_id) REFERENCES aid_types(id) ON UPDATE RESTRICT,
    INDEX (beneficiary_id),
    INDEX (aid_type_id)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- =====================================================
-- الجدول 22: beneficiary_aids — مساعدات المستفيدين
-- =====================================================
CREATE TABLE IF NOT EXISTS beneficiary_aids (
    id                 INT AUTO_INCREMENT PRIMARY KEY,
    beneficiary_id     INT NOT NULL,
    aid_type_id        INT NOT NULL,
    pickup_location_id INT NULL,
    org_id             INT NOT NULL,
    order_id           INT NULL UNIQUE,
    status             ENUM('rejected', 'approved', 'preparing', 'shipping', 'delivered') NOT NULL,
    created_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (beneficiary_id) REFERENCES beneficiaries(id) ON DELETE CASCADE,
    FOREIGN KEY (aid_type_id) REFERENCES aid_types(id) ON UPDATE RESTRICT,
    FOREIGN KEY (pickup_location_id) REFERENCES pickup_locations(id) ON UPDATE RESTRICT,
    FOREIGN KEY (org_id) REFERENCES local_organizations(id) ON UPDATE RESTRICT,
    FOREIGN KEY (order_id) REFERENCES beneficiary_orders(id) ON DELETE SET NULL,
    INDEX (beneficiary_id),
    INDEX (aid_type_id),
    INDEX (pickup_location_id),
    INDEX (org_id),
    INDEX (order_id)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;