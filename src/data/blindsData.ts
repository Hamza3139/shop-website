import { BlindProduct } from '../types';

export const BLINDS_PRODUCTS: BlindProduct[] = [
  {
    id: 'sadeel-blackout-royal',
    titleAr: 'ستارة رول بلاك أوت ملكية عازلة للحرارة 100%',
    titleEn: 'Royal 100% Thermal Blackout Roller Blind',
    category: 'blackout',
    basePrice: 165, // SAR per sq meter
    originalPrice: 220,
    discountPercent: 25,
    rating: 4.9,
    reviewsCount: 318,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80'
    ],
    descriptionAr: 'الستارة الأكثر مبيعاً في السعودية! صُممت خصيصاً لمقاومة شمس وحرارة الصيف السعودي القاسية. توفر عتامة كاملة 100% لغرف النوم والمجالس مع خيوط نسيج ثلاثية الطبقات عازلة للأشعة فوق البنفسجية وتمنع تسرب الحرارة وتقلل استهلاك المكيف بنسبة 35%. تأتي مع سلسلة تحكم معدنية ناعمة مقاومة للصدأ، أو محرك ذكي.',
    descriptionEn: 'The #1 bestselling blackout roller blind in Saudi Arabia! Engineered specifically to withstand severe Gulf heat and intense sunlight. Offers 100% room darkening and 3-ply thermal insulation fabric, cutting AC electricity consumption by up to 35%. Available with smooth stainless pull chain or smart motor.',
    featuresAr: [
      'عتمة كاملة 100% حتى في أشد شمس الظهيرة',
      'طبقة حرارية ثلاثية تخفض حرارة الغرفة حتى 8 درجات مئوية',
      'سلسلة سحب معدنية فاخرة مع قفل أمان للأطفال',
      'مقاومة لتراكم الغبار وسهلة المسح بقطعة قماش مبللة',
      'مطابقة لمواصفات الهيئة السعودية للمواصفات والمقاييس (SASO)'
    ],
    featuresEn: [
      '100% total room blackout even under peak afternoon sun',
      'Triple-layer thermal barrier cooling room by up to 8°C',
      'Premium stainless steel pull bead chain with child safety bracket',
      'Dust-repellent surface, easy to wipe clean',
      'Compliant with SASO Saudi quality standards'
    ],
    lightBlockingPercent: 100,
    uvProtectionPercent: 100,
    thermalInsulation: 'عزل حراري بنسبة 95%',
    warrantyYears: 5,
    colors: [
      { id: 'pearl-white', nameAr: 'أبيض لؤلؤي', nameEn: 'Pearl White', hex: '#F8F9FA' },
      { id: 'warm-beige', nameAr: 'بيج سكري دافئ', nameEn: 'Warm Desert Beige', hex: '#E7DFD5' },
      { id: 'smoke-grey', nameAr: 'رمادي دخاني معاصر', nameEn: 'Smoke Grey', hex: '#7D848C' },
      { id: 'charcoal-black', nameAr: 'أسود فحمي فاخر', nameEn: 'Charcoal Black', hex: '#26292B' },
      { id: 'soft-taupe', nameAr: 'توپ موكا هادئ', nameEn: 'Soft Taupe Mocha', hex: '#B5A89B' }
    ],
    operationTypes: ['manual_chain', 'smart_motor'],
    inStock: true,
    isBestSeller: true,
    isPopularInSaudi: true
  },
  {
    id: 'sadeel-sunscreen-solar',
    titleAr: 'ستارة رول صن سكرين عازلة للشمس 5% مع رؤية خارجية',
    titleEn: 'Solar Sunscreen 5% Privacy Roller Blind with View',
    category: 'sunscreen',
    basePrice: 145,
    originalPrice: 190,
    discountPercent: 23,
    rating: 4.8,
    reviewsCount: 204,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502005229762-ee1b2da94088?auto=format&fit=crop&w=1000&q=80'
    ],
    descriptionAr: 'الحل المثالي لغرف الجلوس، الصالات المفتوحة، والمكاتب! تسمح بدخول الضوء الطبيعي اللطيف مع حجب وهج الشمس الحارق والأشعة فوق البنفسجية بنسبة 95%، وتمنحك إمكانية رؤية الحديقة أو الشارع من الداخل بوضوح مع الحفاظ على الخصوصية من الخارج نهاراً.',
    descriptionEn: 'The ultimate solution for living rooms, open lounges, and executive offices. Filters harsh desert glare while preserving scenic outside views. Blocks 95% of UV rays while bathing the interior in gentle natural daylight.',
    featuresAr: [
      'نفاذية 5% تمنع الوهج وتتيح رؤية المنظر الخارجي نهاراً',
      'تمنع تلف الأثاث والكنب وتغير ألوان السجاد من أشعة الشمس',
      'سلسلة سحب فائقة الانسيابية بحركة خفيفة',
      'نسيج فايبر جلاس مغلف بالـ PVC عالي المتانة ومقاوم للرطوبة',
      'ضمان شامل 5 سنوات'
    ],
    featuresEn: [
      '5% openness factor blocks glare while preserving outside view',
      'Protects luxury furniture and carpets from sun fading',
      'Ultra-smooth pull cord operation with zero friction',
      'Heavy-duty fiberglass PVC coated mesh resistant to humidity',
      '5-year full manufacturer warranty'
    ],
    lightBlockingPercent: 75,
    uvProtectionPercent: 95,
    thermalInsulation: 'عزل حراري بنسبة 78%',
    warrantyYears: 5,
    colors: [
      { id: 'solar-sand', nameAr: 'رملي صحراوي', nameEn: 'Desert Sand', hex: '#D7C4B7' },
      { id: 'pure-white', nameAr: 'أبيض ناصع', nameEn: 'Crisp White', hex: '#FFFFFF' },
      { id: 'slate-grey', nameAr: 'رمادي صخري', nameEn: 'Slate Grey', hex: '#63666A' },
      { id: 'bronze-espresso', nameAr: 'برونزي قهوة', nameEn: 'Bronze Espresso', hex: '#4A3B32' }
    ],
    operationTypes: ['manual_chain', 'smart_motor'],
    inStock: true,
    isPopularInSaudi: true
  },
  {
    id: 'sadeel-zebra-dual',
    titleAr: 'ستارة رول زيبرا مزدوجة فاخرة (تحكم ليل ونهار)',
    titleEn: 'Luxury Dual Zebra Day & Night Roller Blind',
    category: 'zebra',
    basePrice: 195,
    originalPrice: 260,
    discountPercent: 25,
    rating: 4.9,
    reviewsCount: 189,
    image: 'https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80'
    ],
    descriptionAr: 'تجمع بين فخامة الستائر الكلاسيكية وحداثة ستائر الرول! شرائح مزدوجة تتبادل بين القماش المعتم والشفاف بحركة خفيفة من السلسلة أو الريموت للتحكم الدقيق في كمية الضوء والخصوصية في أي وقت من اليوم.',
    descriptionEn: 'Combines the elegance of classic drapes with the sleek modernity of roller blinds. Alternating translucent and opaque horizontal fabric stripes allow effortless adjustment between view-through, filtered light, and full night privacy.',
    featuresAr: [
      'تبديل فوري بين وضع النهار (إضاءة ناعمة) ووضع الليل (خصوصية تامة)',
      'تصميم تركي فخم يضفي لمسة ديكور فندقية راقية على المكان',
      'شريط سفلي من الألمنيوم الموزون لثبات الستارة مع حركة الهواء',
      'سلسلة سحب قوية متينة ومجربة لأكثر من 10,000 دورة رفع وخفض'
    ],
    featuresEn: [
      'Instant switch between day sheer mode and complete evening privacy',
      'Hotel-grade Turkish design elevates home and villa decor',
      'Heavy extruded bottom rail keeps fabric perfectly weighted against AC breeze',
      'Tested for over 10,000 smooth roll cycles'
    ],
    lightBlockingPercent: 90,
    uvProtectionPercent: 92,
    thermalInsulation: 'عزل حراري بنسبة 85%',
    warrantyYears: 5,
    colors: [
      { id: 'ivory-cream', nameAr: 'عاجي سكري', nameEn: 'Ivory Cream', hex: '#EFE8DE' },
      { id: 'ash-grey', nameAr: 'رمادي رماد معاصر', nameEn: 'Modern Ash Grey', hex: '#9AA0A6' },
      { id: 'walnut-brown', nameAr: 'بني جوزي فخم', nameEn: 'Walnut Dark Brown', hex: '#593D2B' },
      { id: 'champagne-gold', nameAr: 'شامبين هادئ', nameEn: 'Soft Champagne', hex: '#E0D0B8' }
    ],
    operationTypes: ['manual_chain', 'smart_motor'],
    inStock: true,
    isBestSeller: true
  },
  {
    id: 'sadeel-smart-somfy',
    titleAr: 'ستارة رول ذكية بمحرك كهربائي مع ريموت وواي فاي (Somfy)',
    titleEn: 'Smart Motorized Roller Blind with Remote & Alexa WiFi',
    category: 'motorized',
    basePrice: 280,
    originalPrice: 380,
    discountPercent: 26,
    rating: 5.0,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80'
    ],
    descriptionAr: 'قمة الرفاهية والتحكم الذكي لمنزلك العصري! محرك هادئ للغاية يعمل ببطارية ليثيوم قابلة لإعادة الشحن تدوم حتى 6 أشهر بشحنة واحدة (بدون الحاجة لتمديد أسلاك كهربائية). تحكم بالريموت كنترول، أو من تطبيق الجوال، أو بالأوامر الصوتية مع أمازون أليكسا ومساعد جوجل.',
    descriptionEn: 'The peak of modern smart home luxury. Ultra-silent motor powered by a rechargeable lithium battery lasting up to 6 months per charge—zero electrical wiring needed! Control effortlessly via multi-channel RF remote, mobile smartphone app, or voice with Alexa and Google Assistant.',
    featuresAr: [
      'محرك فائق الهدوء (أقل من 30 ديسيبل) لا يسبب أي إزعاج',
      'بطارية مدمجة تشحن مثل الجوال مرة كل 6 أشهر فقط',
      'جدولة مواعيد الرفع والخفض التلقائي مع شروق وغروب الشمس',
      'تحكم كامل عن بُعد حتى وأنت خارج المنزل عبر تطبيق الهاتف',
      'يمكن أيضاً سحب الستارة يدوياً بسلاسة عند الرغبة'
    ],
    featuresEn: [
      'Whisper-quiet motor (<30 dB) for peaceful bedrooms',
      'Rechargeable internal battery (type-C charge lasts 6 months)',
      'Automated daily scheduling synced with sunrise and sunset',
      'Full remote control anywhere in the world via smart app',
      'Manual gentle tug-to-move override feature'
    ],
    lightBlockingPercent: 100,
    uvProtectionPercent: 100,
    thermalInsulation: 'عزل حراري بنسبة 96%',
    warrantyYears: 5,
    colors: [
      { id: 'titanium-grey', nameAr: 'تيتانيوم رمادي فاخر', nameEn: 'Titanium Grey', hex: '#5A5F66' },
      { id: 'pure-offwhite', nameAr: 'أوف وايت ناعم', nameEn: 'Warm Off-White', hex: '#F4F2EC' },
      { id: 'navy-midnight', nameAr: 'كحلي ملوكي داكن', nameEn: 'Midnight Navy', hex: '#1C2833' },
      { id: 'sand-dune', nameAr: 'كثبان الرمال', nameEn: 'Dune Sand', hex: '#C2B69D' }
    ],
    operationTypes: ['smart_motor'],
    inStock: true,
    isPopularInSaudi: true
  },
  {
    id: 'sadeel-textured-linen',
    titleAr: 'ستارة رول كتان نسيج طبيعي معتم (تشكيلة الفلل والمجالس)',
    titleEn: 'Textured Natural Linen Blackout Roller Blind',
    category: 'blackout',
    basePrice: 175,
    originalPrice: 240,
    discountPercent: 27,
    rating: 4.8,
    reviewsCount: 167,
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80'
    ],
    descriptionAr: 'قماش رول فاخر بملمس الكتان الطبيعي الراقي مع طبقة خلفية عازلة للضوء. يعطي لمسة دفء وأناقة نادرة تجمع بين جمال الأقمشة الطبيعية وميزات الستارة الرول العملية سهلة الرفع والتنزيل.',
    descriptionEn: 'Luxury textured natural linen fabric backed with an invisible blackout layer. Delivers warm organic beauty with the effortless convenience of modern roller blind mechanics.',
    featuresAr: [
      'ملمس قماش الكتان الطبيعي الفاخر المناسب للمجالس والصوالين',
      'عزل كامل للضوء وحماية للخصوصية',
      'نظام سحب سلس بخرز معدني متين لا يتعطل',
      'سهلة التنظيف بفرشاة ناعمة أو مكنسة رقيقة'
    ],
    featuresEn: [
      'Rich tactile woven linen texture ideal for guest salons and majlis',
      '100% light blockout and complete privacy',
      'Durable metallic bead chain mechanism guaranteed against jamming',
      'Simple maintenance with vacuum brush or damp sponge'
    ],
    lightBlockingPercent: 100,
    uvProtectionPercent: 98,
    thermalInsulation: 'عزل حراري بنسبة 90%',
    warrantyYears: 5,
    colors: [
      { id: 'linen-natural', nameAr: 'كتان طبيعي خام', nameEn: 'Raw Natural Linen', hex: '#D2C2A8' },
      { id: 'oatmeal-light', nameAr: 'شوفان فاتح', nameEn: 'Light Oatmeal', hex: '#E5DACB' },
      { id: 'warm-stone', nameAr: 'حجري رمادي دافئ', nameEn: 'Warm Stone Grey', hex: '#8C857B' }
    ],
    operationTypes: ['manual_chain', 'smart_motor'],
    inStock: true
  },
  {
    id: 'sadeel-office-flame-retardant',
    titleAr: 'ستارة رول مكتبية مقاومة للحريق والحرارة (معتمدة للشركات)',
    titleEn: 'Commercial Heavy-Duty Fire-Retardant Roller Blind',
    category: 'office',
    basePrice: 130,
    originalPrice: 170,
    discountPercent: 23,
    rating: 4.9,
    reviewsCount: 220,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80'
    ],
    descriptionAr: 'الخيار الأول للشركات، المكاتب، العيادات والمؤسسات في الرياض وجدة. قماش معتمد مقاوم للاشتعال مع حجب لأشعة الشمس بنسبة 85% لمنع انعكاس الضوء على شاشات الكمبيوتر في بيئة العمل.',
    descriptionEn: 'The #1 preferred roller blind for corporations, modern offices, clinics, and government facilities in Riyadh and Jeddah. Certified fire-retardant fabric that eliminates screen glare on monitors while maintaining professional ambient lighting.',
    featuresAr: [
      'شهادة مقاومة الحريق مطابقة للدفاع المدني السعودي',
      'تمنع انعكاس الضوء المزعج على شاشات الحواسيب',
      'سلسلة سحب صلبة مخصصة للاستخدام اليومي الشاق في بيئات العمل',
      'إمكانية تنفيذ كميات كبيرة وتفصيل مقاسات مخصصة بأسعار جملة'
    ],
    featuresEn: [
      'Fire-retardant certified compliant with Saudi Civil Defense standards',
      'Eliminates monitor reflections for maximum workplace productivity',
      'Heavy-duty commercial gearbox built for rigorous daily business use',
      'Wholesale pricing available for bulk office and tower projects'
    ],
    lightBlockingPercent: 85,
    uvProtectionPercent: 96,
    thermalInsulation: 'عزل حراري بنسبة 80%',
    warrantyYears: 5,
    colors: [
      { id: 'corporate-silver', nameAr: 'فضي مكتبي', nameEn: 'Executive Silver', hex: '#B0B5B3' },
      { id: 'graphite-dark', nameAr: 'جرافيت داكن', nameEn: 'Deep Graphite', hex: '#414449' },
      { id: 'clean-ivory', nameAr: 'عاجي كلاسيكي', nameEn: 'Clean Corporate Ivory', hex: '#EDE8DF' }
    ],
    operationTypes: ['manual_chain', 'smart_motor'],
    inStock: true
  }
];

export const CAMPAIGN_PRESETS = [
  {
    id: 'snapchat',
    source: 'snapchat' as const,
    campaignName: 'حملة سناب شات الخاصة بالمملكة',
    headlineAr: 'عرض حصري لمتابعي سناب شات: خصم 30% + معاينة وتركيب مجاني في منزلك!',
    headlineEn: 'Exclusive Snapchat Offer: 30% Off + Free Home Measurement & Installation!',
    discountCode: 'SNAP30',
    discountAmountPercent: 30,
    badgeAr: 'عرض سناب شات الحصري 👻',
    badgeEn: 'Snapchat Exclusive 👻'
  },
  {
    id: 'tiktok',
    source: 'tiktok' as const,
    campaignName: 'حملة تيك توك ترند الستائر',
    headlineAr: 'ترند ستائر الرول الذكية في السعودية: وفر 35% فوراً مع كود TIKTOK35!',
    headlineEn: 'Trending Smart Roller Blinds in KSA: Save 35% Instantly with TIKTOK35!',
    discountCode: 'TIKTOK35',
    discountAmountPercent: 35,
    badgeAr: 'عرض تيك توك ترند 🎵',
    badgeEn: 'TikTok Trending Offer 🎵'
  },
  {
    id: 'google',
    source: 'google' as const,
    campaignName: 'إعلانات جوجل سيرش الرياض وجدة',
    headlineAr: 'أفضل مصنع ستائر رول بالسعودية: خصم 25% وضمان 5 سنوات وسلسلة متينة!',
    headlineEn: 'Top Roller Blinds in Saudi Arabia: 25% Off, 5-Year Warranty & Free Delivery!',
    discountCode: 'GOOGLE25',
    discountAmountPercent: 25,
    badgeAr: 'عرض محركات البحث 🔍',
    badgeEn: 'Google Special Deal 🔍'
  },
  {
    id: 'instagram',
    source: 'instagram' as const,
    campaignName: 'إنستقرام ديكور الفلل والمنازل',
    headlineAr: 'جدّد ديكور بيتك بستائر الرول الفاخرة: استلم خصم 28% مع كود INSTA28!',
    headlineEn: 'Elevate Your Home Decor: Get 28% Off Luxury Blinds with Code INSTA28!',
    discountCode: 'INSTA28',
    discountAmountPercent: 28,
    badgeAr: 'عرض إنستقرام ديكور 📸',
    badgeEn: 'Instagram Decor Deal 📸'
  }
];
