const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // governorates
  const govs = await Promise.all([
    prisma.governorates.create({ data: { name: 'شمال غزة' } }),
    prisma.governorates.create({ data: { name: 'غزة' } }),
    prisma.governorates.create({ data: { name: 'دير البلح' } }),
    prisma.governorates.create({ data: { name: 'خان يونس' } }),
    prisma.governorates.create({ data: { name: 'رفح' } }),
  ]);
  console.log(`Created ${govs.length} governorates`);

  // areas
  const areasData = [
    { governorate_id: 1, name: 'بيت لاهيا' },
    { governorate_id: 1, name: 'بيت حانون' },
    { governorate_id: 1, name: 'جباليا' },
    { governorate_id: 2, name: 'الشجاعية' },
    { governorate_id: 2, name: 'الرمال' },
    { governorate_id: 2, name: 'الزيتون' },
    { governorate_id: 2, name: 'التفاح' },
    { governorate_id: 3, name: 'دير البلح' },
    { governorate_id: 3, name: 'المغازي' },
    { governorate_id: 3, name: 'النصيرات' },
    { governorate_id: 4, name: 'خان يونس' },
    { governorate_id: 4, name: 'عبسان' },
    { governorate_id: 4, name: 'بني سهيلا' },
    { governorate_id: 5, name: 'رفح' },
    { governorate_id: 5, name: 'تل السلطان' },
  ];
  const areas = await Promise.all(
    areasData.map((a) => prisma.areas.create({ data: a }))
  );
  console.log(`Created ${areas.length} areas`);

  // aid_categories
  const cats = await Promise.all([
    prisma.aid_categories.create({ data: { name: 'غذائي', description: 'سلال غذائية، دقيق، زيت، معلبات' } }),
    prisma.aid_categories.create({ data: { name: 'طبي', description: 'أدوية، معدات طبية، لوازم صحية' } }),
    prisma.aid_categories.create({ data: { name: 'مالي', description: 'مساعدات نقدية' } }),
    prisma.aid_categories.create({ data: { name: 'ملابس', description: 'ملابس وأحذية' } }),
    prisma.aid_categories.create({ data: { name: 'مأوى', description: 'خيام، بطانيات، مواد بناء' } }),
    prisma.aid_categories.create({ data: { name: 'تعليمي', description: 'كتب، قرطاسية، حقائب مدرسية' } }),
  ]);
  console.log(`Created ${cats.length} aid categories`);

  // aid_types
  const typesData = [
    { category_id: 1, name: 'سلة غذائية أساسية', unit: 'سلة' },
    { category_id: 1, name: 'دقيق طحين 25 كجم', unit: 'كيس' },
    { category_id: 1, name: 'زيت طعام', unit: 'لتر' },
    { category_id: 1, name: 'علب معلبات', unit: 'كرتون' },
    { category_id: 2, name: 'حقيبة إسعافات أولية', unit: 'حقيبة' },
    { category_id: 2, name: 'أدوية ضغط الدم', unit: 'علبة' },
    { category_id: 2, name: 'مستلزمات طبية عامة', unit: 'طرد' },
    { category_id: 3, name: 'مساعدة نقدية', unit: 'شيكل' },
    { category_id: 4, name: 'حقيبة ملابس شتوية', unit: 'حقيبة' },
    { category_id: 5, name: 'خيمة إيواء', unit: 'خيمة' },
    { category_id: 5, name: 'بطانية', unit: 'قطعة' },
    { category_id: 6, name: 'حقيبة مدرسية', unit: 'حقيبة' },
  ];
  const types = await Promise.all(
    typesData.map((t) => prisma.aid_types.create({ data: t }))
  );
  console.log(`Created ${types.length} aid types`);

  // campaigns
  await prisma.campaigns.create({
    data: {
      title: 'Ramadan Food Campaign',
      description: 'Providing food baskets for families during Ramadan',
      target_amount: 50000.00,
      collected_amount: 0.00,
      start_date: new Date('2026-01-01'),
      end_date: new Date('2026-03-31'),
      status: 'active',
    },
  });
  await prisma.campaigns.create({
    data: {
      title: 'Winter Relief Campaign',
      description: 'Providing blankets and shelter support',
      target_amount: 30000.00,
      collected_amount: 0.00,
      start_date: new Date('2026-10-01'),
      end_date: new Date('2026-12-31'),
      status: 'active',
    },
  });
  console.log('Created 2 campaigns');

  // pickup_locations
  const pickupData = [
    { area_id: 1, name: 'مركز توزيع بيت لاهيا الرئيسي' },
    { area_id: 1, name: 'مدرسة بيت لاهيا الأساسية - نقطة استلام' },
    { area_id: 2, name: 'مستودع أونروا بيت حانون' },
    { area_id: 2, name: 'ساحة البلدية - بيت حانون' },
    { area_id: 3, name: 'مركز جباليا للمساعدات الإنسانية' },
    { area_id: 3, name: 'مخيم جباليا - نقطة التوزيع الشمالية' },
    { area_id: 4, name: 'مركز الشجاعية للإغاثة' },
    { area_id: 4, name: 'مسجد الشجاعية الكبير - نقطة استلام' },
    { area_id: 5, name: 'مقر الهلال الأحمر - الرمال' },
    { area_id: 5, name: 'حديقة الرمال العامة - نقطة توزيع' },
    { area_id: 6, name: 'مركز حي الزيتون الإغاثي' },
    { area_id: 7, name: 'مستودع التفاح - المستودع الرئيسي' },
    { area_id: 8, name: 'مركز دير البلح للمساعدات' },
    { area_id: 9, name: 'مخيم المغازي - نقطة الاستلام المركزية' },
    { area_id: 10, name: 'ساحة مخيم النصيرات' },
    { area_id: 11, name: 'مركز خان يونس الرئيسي للإغاثة' },
    { area_id: 12, name: 'قاعة عبسان الاجتماعية - نقطة توزيع' },
    { area_id: 13, name: 'مدرسة بني سهيلا للبنين - نقطة استلام' },
    { area_id: 14, name: 'مركز رفح لإيواء النازحين - نقطة توزيع' },
    { area_id: 15, name: 'مخيم تل السلطان - نقطة الاستلام الرئيسية' },
  ];
  const pickups = await Promise.all(
    pickupData.map((p) => prisma.pickup_locations.create({ data: p }))
  );
  console.log(`Created ${pickups.length} pickup locations`);

  // default admin user
  const hashedPassword = await bcrypt.hash('password123', 10);
  await prisma.users.create({
    data: {
      name: 'Yousef Admin',
      email: 'admin@admin.com',
      password: hashedPassword,
      role: 'admin',
      phone: '+970590000000',
    },
  });
  console.log('Created default admin user (admin@admin.com / password123)');

  // default local organization user
  const orgUser = await prisma.users.create({
    data: {
      name: 'Default Org',
      email: 'org@org.com',
      password: hashedPassword,
      role: 'local_org',
      phone: '+970590000001',
    },
  });
  await prisma.local_organizations.create({
    data: {
      user_id: orgUser.id,
      org_name: 'مؤسسة الإغاثة المحلية',
      area_id: 4,
      is_verified: true,
      focus_area: 'مساعدات غذائية وطبية',
      staff_count: 15,
    },
  });
  console.log('Created default local org user (org@org.com / password123)');

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
