// data/compound_words.js
// قاعدة بيانات تفكيك الكلمات الألمانية المركبة (Komposita) - منصة Triple A PRO

export const COMPOUND_RULES_INFO = {
  title: 'سر الكلمات المركبة في الألمانية (Komposita)',
  goldenRule: 'الكلمة الأخيرة هي الملكة: هي التي تحدد أداة التعريف (der, die, das) وصيغة الجمع والمعنى الأساسي للكلمة كلها!',
  fugenElements: 'أحرف الربط الشائعة بين الكلمات: (-s-, -es-, -n-, -en-, -e-) لتسهيل النطق.',
  breakdownTip: 'عند قراءة أي كلمة ألمانية طويلة، ابدأ من اليمين إلى اليسار لتعرف جوهر الشيء، ثم افهم الكلمات التي قبله لتحدد وظيفته أو نوعه!'
};

export const COMPOUND_WORDS_LIST = [
  {
    id: 'comp_01',
    word: 'der Handschuh',
    plural: 'die Handschuhe',
    meaningAr: 'قفاز (حذاء اليد)',
    level: 'A1',
    category: 'ملابس وحياة يومية',
    genderDeterminer: 'der Schuh',
    parts: [
      { text: 'die Hand', translation: 'يد', type: 'اسم أساسي (محدد النوع)' },
      { text: 'der Schuh', translation: 'حذاء', type: 'الاسم الجوهري (محدد الأداة der)' }
    ],
    fugen: null,
    explanation: 'الألمان يسمون القفاز حرفياً: "حذاء لليد". لأن الكلمة الأخيرة "der Schuh" مذكر، أصبحت الكلمة كلها "der Handschuh".'
  },
  {
    id: 'comp_02',
    word: 'das Flugzeug',
    plural: 'die Flugzeuge',
    meaningAr: 'طائرة (أداة الطيران)',
    level: 'A1',
    category: 'مواصلات وسفر',
    genderDeterminer: 'das Zeug',
    parts: [
      { text: 'der Flug (fliegen)', translation: 'طيران', type: 'اسم مشتق من فعل' },
      { text: 'das Zeug', translation: 'أداة / شيء', type: 'الاسم الجوهري (محدد الأداة das)' }
    ],
    fugen: null,
    explanation: 'كلمة "Zeug" في الألمانية تعني أداة أو عِدة، فـ "Flugzeug" هي حرفياً "أداة الطيران".'
  },
  {
    id: 'comp_03',
    word: 'das Feuerzeug',
    plural: 'die Feuerzeuge',
    meaningAr: 'ولاعة (أداة النار)',
    level: 'A1',
    category: 'أدوات يومية',
    genderDeterminer: 'das Zeug',
    parts: [
      { text: 'das Feuer', translation: 'نار', type: 'اسم' },
      { text: 'das Zeug', translation: 'أداة / شيء', type: 'الاسم الجوهري (محدد الأداة das)' }
    ],
    fugen: null,
    explanation: 'تطبيق رائع على لاحقة "Zeug": أداة إشعال النار = ولاعة.'
  },
  {
    id: 'comp_04',
    word: 'das Spielzeug',
    plural: 'die Spielzeuge',
    meaningAr: 'ألعاب أطفال (أداة اللعب)',
    level: 'A1',
    category: 'حياة يومية وأطفال',
    genderDeterminer: 'das Zeug',
    parts: [
      { text: 'das Spiel (spielen)', translation: 'لعب / لعبة', type: 'اسم / جذر فعل' },
      { text: 'das Zeug', translation: 'أداة / أشياء', type: 'الاسم الجوهري (محدد الأداة das)' }
    ],
    fugen: null,
    explanation: 'أي أداة أو غرض مخصص للعب يسمى في الألمانية Spielzeug.'
  },
  {
    id: 'comp_05',
    word: 'das Werkzeug',
    plural: 'die Werkzeuge',
    meaningAr: 'عِدة / أدوات عمل',
    level: 'A2',
    category: 'عمل ومهن',
    genderDeterminer: 'das Zeug',
    parts: [
      { text: 'das Werk', translation: 'صنع / عمل / مصنع', type: 'اسم' },
      { text: 'das Zeug', translation: 'أداة', type: 'الاسم الجوهري (das)' }
    ],
    fugen: null,
    explanation: 'أدوات الحرفة والصيانة (المفكات، المطارق، إلخ) تسمى "أدوات الصنع والعمل".'
  },
  {
    id: 'comp_06',
    word: 'der Kühlschrank',
    plural: 'die Kühlschränke',
    meaningAr: 'ثلاجة (خزانة التبريد)',
    level: 'A1',
    category: 'منزل وأثاث',
    genderDeterminer: 'der Schrank',
    parts: [
      { text: 'kühl (kühlen)', translation: 'بارد / يبرّد', type: 'صفة / جذر فعل' },
      { text: 'der Schrank', translation: 'خزانة / دولاب', type: 'الاسم الجوهري (der)' }
    ],
    fugen: null,
    explanation: 'خزانة وظيفتها أن تحفظ الأشياء باردة = ثلاجة.'
  },
  {
    id: 'comp_07',
    word: 'der Staubsauger',
    plural: 'die Staubsauger',
    meaningAr: 'مكنسة كهربائية (شافط الغبار)',
    level: 'A1',
    category: 'أجهزة منزلية',
    genderDeterminer: 'der Sauger',
    parts: [
      { text: 'der Staub', translation: 'غبار / تراب', type: 'اسم' },
      { text: 'saugen (der Sauger)', translation: 'يشفط / شفاط', type: 'اسم فاعل مشتق من فعل' }
    ],
    fugen: null,
    explanation: 'الجهاز الذي يشفط الغبار هو المكنسة الكهربائية.'
  },
  {
    id: 'comp_08',
    word: 'das Krankenhaus',
    plural: 'die Krankenhäuser',
    meaningAr: 'مستشفى (دار المرضى)',
    level: 'A1',
    category: 'صحة وطب',
    genderDeterminer: 'das Haus',
    parts: [
      { text: 'krank (die Kranken)', translation: 'مريض / المرضى', type: 'اسم جمع / صفة' },
      { text: 'das Haus', translation: 'بيت / دار', type: 'الاسم الجوهري (das)' }
    ],
    fugen: 'en',
    explanation: 'البيت المخصص للمرضى هو المستشفى. لاحظ حرف الربط (en) للجمع.'
  },
  {
    id: 'comp_09',
    word: 'der Krankenwagen',
    plural: 'die Krankenwagen',
    meaningAr: 'سيارة إسعاف (عربة المرضى)',
    level: 'A1',
    category: 'صحة وطب',
    genderDeterminer: 'der Wagen',
    parts: [
      { text: 'krank (die Kranken)', translation: 'المرضى', type: 'اسم مضاف' },
      { text: 'der Wagen', translation: 'عربة / سيارة', type: 'الاسم الجوهري (der)' }
    ],
    fugen: 'en',
    explanation: 'عربة مخصصة لنقل المرضى في الحالات الطارئة.'
  },
  {
    id: 'comp_10',
    word: 'die Krankenschwester',
    plural: 'die Krankenschwestern',
    meaningAr: 'ممرضة (أخت المرضى)',
    level: 'A1',
    category: 'صحة ومهن',
    genderDeterminer: 'die Schwester',
    parts: [
      { text: 'die Kranken', translation: 'المرضى', type: 'اسم' },
      { text: 'die Schwester', translation: 'أخت', type: 'الاسم الجوهري (die)' }
    ],
    fugen: 'en',
    explanation: 'تاريخياً كانت الممرضات من الراهبات (الأخوات)، فصارت تعني الأخت الراعية للمرضى.'
  },
  {
    id: 'comp_11',
    word: 'der Zahnarzt',
    plural: 'die Zahnärzte',
    meaningAr: 'طبيب أسنان',
    level: 'A1',
    category: 'صحة ومهن',
    genderDeterminer: 'der Arzt',
    parts: [
      { text: 'der Zahn', translation: 'سن / ضرس', type: 'اسم مفرد' },
      { text: 'der Arzt', translation: 'طبيب', type: 'الاسم الجوهري (der)' }
    ],
    fugen: null,
    explanation: 'طبيب متخصص بالأسنان.'
  },
  {
    id: 'comp_12',
    word: 'die Zahnbürste',
    plural: 'die Zahnbürsten',
    meaningAr: 'فرشاة أسنان',
    level: 'A1',
    category: 'نظافة شخصية',
    genderDeterminer: 'die Bürste',
    parts: [
      { text: 'der Zahn', translation: 'سن', type: 'اسم' },
      { text: 'die Bürste', translation: 'فرشاة', type: 'الاسم الجوهري (die)' }
    ],
    fugen: null,
    explanation: 'فرشاة مخصصة لتنظيف الأسنان. الأداة die جاءت من die Bürste.'
  },
  {
    id: 'comp_13',
    word: 'der Bahnhof',
    plural: 'die Bahnhöfe',
    meaningAr: 'محطة قطار (فناء السكة الحديد)',
    level: 'A1',
    category: 'مواصلات وسفر',
    genderDeterminer: 'der Hof',
    parts: [
      { text: 'die Bahn', translation: 'قطار / سكة حديدية', type: 'اسم' },
      { text: 'der Hof', translation: 'فناء / ساحة / محطة', type: 'الاسم الجوهري (der)' }
    ],
    fugen: null,
    explanation: 'الساحة المركزية التي تنطلق منها القطارات.'
  },
  {
    id: 'comp_14',
    word: 'die Haltestelle',
    plural: 'die Haltestellen',
    meaningAr: 'محطة توقف (باص / ترام)',
    level: 'A1',
    category: 'مواصلات',
    genderDeterminer: 'die Stelle',
    parts: [
      { text: 'halten', translation: 'يتوقف', type: 'فعل' },
      { text: 'die Stelle', translation: 'نقطة / موقع / مكان', type: 'الاسم الجوهري (die)' }
    ],
    fugen: null,
    explanation: 'المكان أو النقطة المحددة لتوقف وسائل النقل العام.'
  },
  {
    id: 'comp_15',
    word: 'der Wortschatz',
    plural: 'die Wortschätze',
    meaningAr: 'المفردات اللغوية (كنز الكلمات)',
    level: 'A2',
    category: 'لغة وتعليم',
    genderDeterminer: 'der Schatz',
    parts: [
      { text: 'das Wort', translation: 'كلمة', type: 'اسم' },
      { text: 'der Schatz', translation: 'كنز / ثروة', type: 'الاسم الجوهري (der)' }
    ],
    fugen: null,
    explanation: 'تعبير ألماني شاعري فائق الجمال: المفردات وحصيلتك اللغوية تُسمى "كنز الكلمات"!'
  },
  {
    id: 'comp_16',
    word: 'der Lebenslauf',
    plural: 'die Lebensläufe',
    meaningAr: 'السيرة الذاتية (CV - مجرى الحياة)',
    level: 'A2',
    category: 'عمل ودراسة',
    genderDeterminer: 'der Lauf',
    parts: [
      { text: 'das Leben', translation: 'حياة', type: 'اسم' },
      { text: 'der Lauf (laufen)', translation: 'مسار / جريان / مجرى', type: 'الاسم الجوهري (der)' }
    ],
    fugen: '-s-',
    explanation: 'مسار وسجل حياة الإنسان المهنية والتعليمية. حرف (s) للوصل.'
  },
  {
    id: 'comp_17',
    word: 'das Wörterbuch',
    plural: 'die Wörterbücher',
    meaningAr: 'معجم / قاموس (كتاب الكلمات)',
    level: 'A1',
    category: 'تعليم وقراءة',
    genderDeterminer: 'das Buch',
    parts: [
      { text: 'die Wörter', translation: 'الكلمات (جمع منفصل)', type: 'اسم جمع' },
      { text: 'das Buch', translation: 'كتاب', type: 'الاسم الجوهري (das)' }
    ],
    fugen: null,
    explanation: 'كتاب يضم الكلمات وشروحها وترجماتها.'
  },
  {
    id: 'comp_18',
    word: 'der Arbeitgeber',
    plural: 'die Arbeitgeber',
    meaningAr: 'صاحب العمل / رب العمل (مُعطي العمل)',
    level: 'A2',
    category: 'سوق العمل',
    genderDeterminer: 'der Geber',
    parts: [
      { text: 'die Arbeit', translation: 'عمل / وظيفة', type: 'اسم' },
      { text: 'der Geber (geben)', translation: 'المعطي / المانح', type: 'اسم فاعل' }
    ],
    fugen: null,
    explanation: 'الجهة أو الشخص الذي يمنح الوظيفة والعمل (Employer).'
  },
  {
    id: 'comp_19',
    word: 'der Arbeitnehmer',
    plural: 'die Arbeitnehmer',
    meaningAr: 'الموظف / العامل (آخذ العمل)',
    level: 'A2',
    category: 'سوق العمل',
    genderDeterminer: 'der Nehmer',
    parts: [
      { text: 'die Arbeit', translation: 'عمل', type: 'اسم' },
      { text: 'der Nehmer (nehmen)', translation: 'الآخذ / المتلقي', type: 'اسم فاعل' }
    ],
    fugen: null,
    explanation: 'الشخص الذي يأخذ الوظيفة ويعمل بموجب عقد عمل (Employee).'
  },
  {
    id: 'comp_20',
    word: 'die Sehenswürdigkeit',
    plural: 'die Sehenswürdigkeiten',
    meaningAr: 'مَعلم سياحي (ما يستحق المشاهدة)',
    level: 'B1',
    category: 'سياحة وثقافة',
    genderDeterminer: 'die Würdigkeit',
    parts: [
      { text: 'sehen', translation: 'يرى / يشاهد', type: 'فعل' },
      { text: 'würdig', translation: 'جدير / مستحق', type: 'صفة' },
      { text: '-keit', translation: 'لاحقة تأنيث وصياغة الأسماء', type: 'لاحقة مشتقة' }
    ],
    fugen: '-s-',
    explanation: 'من أشهر الكلمات المركبة الطويلة في B1: كل ما يستحق الزيارة والمشاهدة.'
  },
  {
    id: 'comp_21',
    word: 'der Regenschirm',
    plural: 'die Regenschirme',
    meaningAr: 'مظلة المطر (شمسية)',
    level: 'A1',
    category: 'طقس وأدوات',
    genderDeterminer: 'der Schirm',
    parts: [
      { text: 'der Regen', translation: 'مطر', type: 'اسم' },
      { text: 'der Schirm', translation: 'مظلة / درع واقي', type: 'الاسم الجوهري (der)' }
    ],
    fugen: null,
    explanation: 'درع واقي من قطرات المطر.'
  },
  {
    id: 'comp_22',
    word: 'die Sonnenbrille',
    plural: 'die Sonnenbrillen',
    meaningAr: 'نظارة شمسية',
    level: 'A1',
    category: 'إكسسوارات وطقس',
    genderDeterminer: 'die Brille',
    parts: [
      { text: 'die Sonne', translation: 'شمس', type: 'اسم' },
      { text: 'die Brille', translation: 'نظارة', type: 'الاسم الجوهري (die)' }
    ],
    fugen: '-n-',
    explanation: 'نظارة لحماية العينين من أشعة الشمس. تم ربط الكلمتين بحرف (n).'
  },
  {
    id: 'comp_23',
    word: 'das Schlafzimmer',
    plural: 'die Schlafzimmer',
    meaningAr: 'غرفة النوم',
    level: 'A1',
    category: 'منزل وغرف',
    genderDeterminer: 'das Zimmer',
    parts: [
      { text: 'schlafen', translation: 'ينام', type: 'فعل' },
      { text: 'das Zimmer', translation: 'غرفة', type: 'الاسم الجوهري (das)' }
    ],
    fugen: null,
    explanation: 'غرفة مخصصة للنوم. وكذلك Badezimmer (حمام) و Wohnzimmer (غرفة معيشة).'
  },
  {
    id: 'comp_24',
    word: 'der Geburtstag',
    plural: 'die Geburtstage',
    meaningAr: 'عيد ميلاد (يوم الولادة)',
    level: 'A1',
    category: 'مناسبات وحياة',
    genderDeterminer: 'der Tag',
    parts: [
      { text: 'die Geburt', translation: 'ولادة', type: 'اسم مؤنث' },
      { text: 'der Tag', translation: 'يوم', type: 'الاسم الجوهري (der)' }
    ],
    fugen: '-s-',
    explanation: 'اليوم الذي وُلد فيه الشخص. لاحظ حرف الربط (s).'
  },
  {
    id: 'comp_25',
    word: 'die Autobahn',
    plural: 'die Autobahnen',
    meaningAr: 'طريق سريع للسيارات',
    level: 'A1',
    category: 'مواصلات وألمانيا',
    genderDeterminer: 'die Bahn',
    parts: [
      { text: 'das Auto', translation: 'سيارة', type: 'اسم' },
      { text: 'die Bahn', translation: 'طريق / مسار / سكة', type: 'الاسم الجوهري (die)' }
    ],
    fugen: null,
    explanation: 'شبكة الطرق السريعة الألمانية الشهيرة عالمياً بدون حد أقصى للسرعة.'
  }
];
