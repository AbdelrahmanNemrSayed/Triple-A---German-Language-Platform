// data/time_numbers.js
// بيانات وقواعد قراءة الأرقام والساعة الألمانية (Uhrzeit & Zahlen)
// منصة Triple A PRO - German Language Platform

export const TIME_PRESETS = [
  {
    time24: '08:00',
    time12: '8:00 AM',
    hour: 8,
    minute: 0,
    officialDe: 'acht Uhr',
    colloquialDe: 'acht Uhr (morgens)',
    arabic: 'الساعة الثامنة تماماً',
    ruleTip: 'في المواعيد الرسمية نذكر الساعة متبوعة بكلمة Uhr'
  },
  {
    time24: '08:15',
    time12: '8:15 AM',
    hour: 8,
    minute: 15,
    officialDe: 'acht Uhr fünfzehn',
    colloquialDe: 'Viertel nach acht',
    arabic: 'الثامنة والربع',
    ruleTip: 'في الحديث اليومي نستخدم Viertel nach (ربع بعد)'
  },
  {
    time24: '08:30',
    time12: '8:30 AM',
    hour: 8,
    minute: 30,
    officialDe: 'acht Uhr dreißig',
    colloquialDe: 'halb neun',
    arabic: 'الثامنة والنصف',
    ruleTip: 'انتبه بشدة: halb neun تعني "نصف ساعة قبل التاسعة" أي الثامنة والنصف!'
  },
  {
    time24: '08:45',
    time12: '8:45 AM',
    hour: 8,
    minute: 45,
    officialDe: 'acht Uhr fünfundvierzig',
    colloquialDe: 'Viertel vor neun',
    arabic: 'التاسعة إلا ربع',
    ruleTip: 'في الحديث اليومي نستخدم Viertel vor (ربع قبل)'
  },
  {
    time24: '14:20',
    time12: '2:20 PM',
    hour: 14,
    minute: 20,
    officialDe: 'vierzehn Uhr zwanzig',
    colloquialDe: 'zwanzig nach zwei',
    arabic: 'الثانية وعشرون دقيقة (الثانية وثلث)',
    ruleTip: 'في النظام الرسمي نستخدم أرقام الـ 24 ساعة (vierzehn Uhr)'
  },
  {
    time24: '17:50',
    time12: '5:50 PM',
    hour: 17,
    minute: 50,
    officialDe: 'siebzehn Uhr fünfzig',
    colloquialDe: 'zehn vor sechs',
    arabic: 'السادسة إلا عشر دقائق',
    ruleTip: 'نقول zehn vor sechs (عشر دقائق قبل السادسة)'
  },
  {
    time24: '20:35',
    time12: '8:35 PM',
    hour: 20,
    minute: 35,
    officialDe: 'zwanzig Uhr fünfunddreißig',
    colloquialDe: 'fünf nach halb neun',
    arabic: 'الثامنة وخمس وثلاثون دقيقة',
    ruleTip: 'الألمان يقولون: fünf nach halb neun (خمس دقائق بعد الثامنة والنصف)!'
  },
  {
    time24: '22:00',
    time12: '10:00 PM',
    hour: 22,
    minute: 0,
    officialDe: 'zweiundzwanzig Uhr',
    colloquialDe: 'zehn Uhr abends',
    arabic: 'العاشرة مساءً',
    ruleTip: 'رسمياً: zweiundzwanzig Uhr، وعامياً: zehn Uhr abends'
  }
];

export const NUMBERS_LISTENING_CHALLENGES = [
  {
    id: 'num_01',
    category: 'الأسعار والعملة (Preise)',
    spokenDe: 'Das macht neunzehn Euro fünfundneunzig.',
    correctValue: '19.95',
    displayLabel: '19,95 €',
    meaningAr: 'الحساب تسعة عشر يورو وخمسة وتسعون سنتاً',
    tip: 'نقول اليورو أولاً ثم كلمة Euro ثم السنتات'
  },
  {
    id: 'num_02',
    category: 'الأسعار والعملة (Preise)',
    spokenDe: 'Das Ticket kostet siebenundvierzig Euro.',
    correctValue: '47',
    displayLabel: '47 €',
    meaningAr: 'التذكرة تكلف سبعة وأربعين يورو',
    tip: 'لاحظ قراءة الآحاد (sieben) قبل العشرات (vierzig)'
  },
  {
    id: 'num_03',
    category: 'أرقام الهواتف (Telefonnummern)',
    spokenDe: 'Meine Telefonnummer ist null eins sieben zwei, drei vier fünf sechs sieben acht.',
    correctValue: '0172345678',
    displayLabel: '0172 / 345678',
    meaningAr: 'رقم هاتفي هو 0172345678',
    tip: 'أرقام الهواتف تُقرأ رقماً برقم في الأغلب'
  },
  {
    id: 'num_04',
    category: 'السنوات والتواريخ (Jahreszahlen)',
    spokenDe: 'Ich bin im Jahr neunzehnhundertfünfundneunzig geboren.',
    correctValue: '1995',
    displayLabel: '1995',
    meaningAr: 'ولدت في عام 1995',
    tip: 'سنوات القرن الماضي تُقرأ بالمئات: 19 مئة وخمس وتسعون (neunzehnhundertfünfundneunzig)'
  },
  {
    id: 'num_05',
    category: 'السنوات والتواريخ (Jahreszahlen)',
    spokenDe: 'Die Universität wurde im Jahr zweitausendundvier gegründet.',
    correctValue: '2004',
    displayLabel: '2004',
    meaningAr: 'تأسست الجامعة في عام 2004',
    tip: 'من عام 2000 فصاعداً نقول zweitausend...'
  },
  {
    id: 'num_06',
    category: 'الكميات والأعداد الكبيرة (Große Zahlen)',
    spokenDe: 'Die Stadt hat dreihundertfünfzigtausend Einwohner.',
    correctValue: '350000',
    displayLabel: '350.000',
    meaningAr: 'المدينة بها 350 ألف نسمة',
    tip: '350 ألف = dreihundertfünfzigtausend'
  }
];
