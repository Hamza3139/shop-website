export interface CustomerReview {
  id: string;
  authorNameAr: string;
  authorNameEn: string;
  cityAr: string;
  cityEn: string;
  rating: number;
  dateAr: string;
  dateEn: string;
  commentAr: string;
  commentEn: string;
  productTitleAr: string;
  productTitleEn: string;
  verifiedBuyer: boolean;
  avatarUrl: string;
}

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    authorNameAr: 'سلطان القحطاني',
    authorNameEn: 'Sultan Al-Qahtani',
    cityAr: 'الرياض - حي النرجس',
    cityEn: 'Riyadh - Al-Narjis',
    rating: 5,
    dateAr: 'منذ يومين',
    dateEn: '2 days ago',
    commentAr: 'شريت ستائر البلاك أوت لغرفة النوم والمجلس.. ما شاء الله عزل الشمس والحرارة في صيف الرياض 10/10! سلسلة السحب ناعمة وقوية جداً وما تشبك، وجاء الفني للبيت في اليوم الثاني وركب 6 ستائر بدقة ونظافة عالية. والدفع بمدى كان آمن وسهل.',
    commentEn: 'Ordered the blackout blinds for the bedroom and majlis. Incredible thermal and sun insulation against Riyadh heat! The pull chain is super smooth and sturdy. Technician arrived the next day and installed all 6 blinds cleanly.',
    productTitleAr: 'ستارة رول بلاك أوت ملكية عازلة للحرارة 100%',
    productTitleEn: 'Royal 100% Thermal Blackout Roller Blind',
    verifiedBuyer: true,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'rev-2',
    authorNameAr: 'نورة الغامدي',
    authorNameEn: 'Noura Al-Ghamdi',
    cityAr: 'جدة - حي الروضة',
    cityEn: 'Jeddah - Al-Rawdah',
    rating: 5,
    dateAr: 'منذ 4 أيام',
    dateEn: '4 days ago',
    commentAr: 'طلبت ستائر الصن سكرين لصالة الفيلا المطلة على المسبح. بالنهار أشوف المنظر بوضوح وبنفس الوقت أشعة الشمس الحارقة ما تدمر الأثاث ولا تدخل الحرارة. جربت الدفع عبر تمارا وقسمت المبلغ على 4 دفعات مريحة بدون فوائد. تعامل راقي وسريع!',
    commentEn: 'Bought the solar sunscreen blinds for our villa lounge facing the pool. During daylight I can see clearly outside without harsh heat or glare damaging our furniture. Used Tamara 4-installment payment. Splendid service!',
    productTitleAr: 'ستارة رول صن سكرين عازلة للشمس 5%',
    productTitleEn: 'Solar Sunscreen 5% Privacy Roller Blind',
    verifiedBuyer: true,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'rev-3',
    authorNameAr: 'م. فهد العتيبي',
    authorNameEn: 'Eng. Fahad Al-Otaibi',
    cityAr: 'الخبر - حي الكورنيش',
    cityEn: 'Khobar - Al-Corniche',
    rating: 5,
    dateAr: 'منذ أسبوع',
    dateEn: '1 week ago',
    commentAr: 'أخذت الستارة الذكية بمحرك سومفي مع ريموت وربطتها مع تطبيق الجوال وأليكسا. الحين تقفل لحالها مع غروب الشمس وتفتح الصباح. البطارية تدوم شهور بدون أي أسلاك ظاهرة بالجدار. شغل مرتب وفخم يستاهل كل ريال.',
    commentEn: 'Installed the smart motorized Somfy blind with remote and Alexa integration. Automatically rolls down at sunset. Rechargeable battery lasts months without visible wires. High-end craft worth every Riyal.',
    productTitleAr: 'ستارة رول ذكية بمحرك كهربائي وريموت',
    productTitleEn: 'Smart Motorized Roller Blind',
    verifiedBuyer: true,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'rev-4',
    authorNameAr: 'د. هند الشمري',
    authorNameEn: 'Dr. Hind Al-Shammari',
    cityAr: 'الدمام - حي الشاطئ',
    cityEn: 'Dammam - Al-Shati',
    rating: 5,
    dateAr: 'منذ أسبوعين',
    dateEn: '2 weeks ago',
    commentAr: 'ستائر الزيبرا شكلها على الشباك أفخم بكثير من الصور! دقة التفصيل بالمقاس بالملم والتحكم بالسلسلة لرفع الستارة أو تغيير درجة الإضاءة رهيب. شكراً على الهدية والسرعة في التوصيل.',
    commentEn: 'The zebra dual blinds look far more luxurious in person! Precise millimetric custom fabrication and the pull cord controls light transitions effortlessly. Thank you for prompt delivery to Dammam.',
    productTitleAr: 'ستارة رول زيبرا مزدوجة فاخرة (ليل ونهار)',
    productTitleEn: 'Luxury Dual Zebra Day & Night Blind',
    verifiedBuyer: true,
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
  }
];
