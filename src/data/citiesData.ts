export interface SaudiCity {
  id: string;
  nameAr: string;
  nameEn: string;
  regionAr: string;
  freeInstallationAvailable: boolean;
  deliveryDays: string;
  popularDistrictsAr: string[];
}

export const SAUDI_CITIES: SaudiCity[] = [
  {
    id: 'riyadh',
    nameAr: 'الرياض',
    nameEn: 'Riyadh',
    regionAr: 'منطقة الرياض',
    freeInstallationAvailable: true,
    deliveryDays: '24-48 ساعة',
    popularDistrictsAr: ['حي الملقا', 'حي النرجس', 'حي الياسمين', 'حي الصحافة', 'حي العليا', 'حي الروضة', 'حي العقيق', 'حي حطين']
  },
  {
    id: 'jeddah',
    nameAr: 'جدة',
    nameEn: 'Jeddah',
    regionAr: 'منطقة مكة المكرمة',
    freeInstallationAvailable: true,
    deliveryDays: '2-3 أيام',
    popularDistrictsAr: ['حي الروضة', 'حي الشاطئ', 'حي الحمراء', 'حي الصفا', 'حي أبحر الشمالية', 'حي البساتين', 'حي المحمدية']
  },
  {
    id: 'dammam',
    nameAr: 'الدمام',
    nameEn: 'Dammam',
    regionAr: 'المنطقة الشرقية',
    freeInstallationAvailable: true,
    deliveryDays: '2-3 أيام',
    popularDistrictsAr: ['حي الشاطئ الغربي', 'حي المزروعية', 'حي الفيصلية', 'حي الجوهرة', 'حي طيبة']
  },
  {
    id: 'khobar',
    nameAr: 'الخبر',
    nameEn: 'Khobar',
    regionAr: 'المنطقة الشرقية',
    freeInstallationAvailable: true,
    deliveryDays: '2-3 أيام',
    popularDistrictsAr: ['حي الحزام الذهبي', 'حي العقربية', 'حي الكورنيش', 'حي الجسر', 'حي العليا']
  },
  {
    id: 'makkah',
    nameAr: 'مكة المكرمة',
    nameEn: 'Makkah',
    regionAr: 'منطقة مكة المكرمة',
    freeInstallationAvailable: true,
    deliveryDays: '2-3 أيام',
    popularDistrictsAr: ['حي العوالي', 'حي الشوقية', 'حي العزيزية', 'حي بطحاء قريش']
  },
  {
    id: 'madinah',
    nameAr: 'المدينة المنورة',
    nameEn: 'Madinah',
    regionAr: 'منطقة المدينة المنورة',
    freeInstallationAvailable: true,
    deliveryDays: '3-4 أيام',
    popularDistrictsAr: ['حي قباء', 'حي العزيزية', 'حي باقدو', 'حي الملك فهد']
  },
  {
    id: 'qassim',
    nameAr: 'بريدة / القصيم',
    nameEn: 'Buraidah / Qassim',
    regionAr: 'منطقة القصيم',
    freeInstallationAvailable: false,
    deliveryDays: '3-4 أيام',
    popularDistrictsAr: ['حي الصفراء', 'حي الفايزية', 'حي الريان']
  },
  {
    id: 'ahsa',
    nameAr: 'الأحساء / الهفوف',
    nameEn: 'Al-Ahsa / Hofuf',
    regionAr: 'المنطقة الشرقية',
    freeInstallationAvailable: false,
    deliveryDays: '3-4 أيام',
    popularDistrictsAr: ['حي المزروع', 'حي السلمانية', 'حي الخالدية']
  },
  {
    id: 'abha',
    nameAr: 'أبها / خميس مشيط',
    nameEn: 'Abha / Khamis Mushait',
    regionAr: 'منطقة عسير',
    freeInstallationAvailable: false,
    deliveryDays: '3-5 أيام',
    popularDistrictsAr: ['حي المنسك', 'حي الضباب', 'حي المفتاحة']
  },
  {
    id: 'tabuk',
    nameAr: 'تبوك',
    nameEn: 'Tabuk',
    regionAr: 'منطقة تبوك',
    freeInstallationAvailable: false,
    deliveryDays: '3-5 أيام',
    popularDistrictsAr: ['حي المروج', 'حي الورود', 'حي العليا']
  }
];
