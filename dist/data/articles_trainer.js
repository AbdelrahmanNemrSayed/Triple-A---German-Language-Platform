// data/articles_trainer.js
// بنك كلمات وقواعد تدريب وتحدي أدوات التعريف (Der, Die, Das Blitz-Trainer)
// منصة Triple A PRO - German Language Platform

export const ARTICLE_RULES = [
  {
    article: 'die',
    title: 'نهايات المؤنث الذهبية (Feminine Suffixes)',
    suffixes: ['-ung', '-heit', '-keit', '-schaft', '-tät', '-ion', '-ik', '-ei'],
    examples: ['die Wohnung', 'die Gesundheit', 'die Möglichkeit', 'die Universität', 'die Nation', 'die Musik'],
    explanation: 'أي كلمة ألمانية تنتهي بأحد هذه المقاطع تكون مؤنثة (die) بنسبة 99%!'
  },
  {
    article: 'das',
    title: 'نهايات المحايد الذهبية (Neuter Suffixes)',
    suffixes: ['-chen', '-lein', '-ment', '-um', '-tum', '-ma'],
    examples: ['die Mädchen (das)', 'das Fräulein', 'das Dokument', 'das Museum', 'das Thema'],
    explanation: 'صيغ التصغير (-chen, -lein) والكلمات اللاتينية الدخيلة (-ment, -um, -ma) تكون محايدة (das) دائماً!'
  },
  {
    article: 'der',
    title: 'نهايات المذكر الذهبية (Masculine Suffixes)',
    suffixes: ['-or', '-ling', '-ismus', '-ist', '-ant', '-er (للفاعل)'],
    examples: ['der Motor', 'der Frühling', 'der Optimismus', 'der Tourist', 'der Lehrer'],
    explanation: 'الكلمات المنتهية بـ -or و -ling و -ismus وكذلك أسماء الفاعلين والمهن المذكرة (-er) تكون مذكرة (der) دائماً!'
  }
];

export const ARTICLES_WORDS_BANK = [
  // 1. Masculine (der)
  { id: 'art_01', word: 'Tisch', article: 'der', meaningAr: 'طاولة', plural: 'die Tische', ruleTip: 'أغلب الأثاث والأشياء الأساسية المادية مذكر', exampleDe: 'Der Tisch ist sehr stabil.', exampleAr: 'الطاولة متينة جداً.' },
  { id: 'art_02', word: 'Lehrer', article: 'der', meaningAr: 'معلّم', plural: 'die Lehrer', ruleTip: 'اسم مهنة أو فاعل ينتهي بـ -er فهو مذكر دائماً', exampleDe: 'Der Lehrer erklärt die Grammatik.', exampleAr: 'المعلم يشرح القواعد.' },
  { id: 'art_03', word: 'Frühling', article: 'der', meaningAr: 'فصل الربيع', plural: 'die Frühlinge', ruleTip: 'جميع فصول السنة والشهور والأيام مذكر (der)', exampleDe: 'Der Frühling bringt viele Blumen.', exampleAr: 'الربيع يجلب الكثير من الأزهار.' },
  { id: 'art_04', word: 'Motor', article: 'der', meaningAr: 'محرك', plural: 'die Motoren', ruleTip: 'الكلمات المنتهية بـ -or مذكرة (der) دائماً', exampleDe: 'Der Motor läuft ruhig.', exampleAr: 'المحرك يعمل بهدوء.' },
  { id: 'art_05', word: 'Kaffee', article: 'der', meaningAr: 'قهوة', plural: 'die Kaffees', ruleTip: 'أغلب المشروبات المنبهة مذكر (der Kaffee, der Tee, der Saft)', exampleDe: 'Der Kaffee schmeckt hervorragend.', exampleAr: 'القهوة مذاقها ممتاز.' },
  { id: 'art_06', word: 'Schlüssel', article: 'der', meaningAr: 'مفتاح', plural: 'die Schlüssel', ruleTip: 'أدوات التحكم والآلات اليدوية غالباً مذكر', exampleDe: 'Wo ist der Schlüssel?', exampleAr: 'أين المفتاح؟' },
  { id: 'art_07', word: 'Optimismus', article: 'der', meaningAr: 'تفاؤل', plural: '—', ruleTip: 'المفاهيم والمذاهب المنتهية بـ -ismus مذكرة دائماً', exampleDe: 'Der Optimismus hilft im Alltag.', exampleAr: 'التفاؤل يساعد في الحياة اليومية.' },
  { id: 'art_08', word: 'Kugelschreiber', article: 'der', meaningAr: 'قلم جاف', plural: 'die Kugelschreiber', ruleTip: 'اسم آلة/أداة ينتهي بـ -er مذكر (der Kugelschreiber, der Rechner)', exampleDe: 'Der Kugelschreiber schreibt blau.', exampleAr: 'القلم الجاف يكتب بالأزرق.' },
  { id: 'art_09', word: 'Wagen', article: 'der', meaningAr: 'سيارة / عربة', plural: 'die Wagen', ruleTip: 'ماركات ومرادفات السيارات مذكر (der Wagen, der BMW)', exampleDe: 'Der Wagen steht vor dem Haus.', exampleAr: 'السيارة تقف أمام المنزل.' },
  { id: 'art_10', word: 'Montag', article: 'der', meaningAr: 'يوم الإثنين', plural: 'die Montage', ruleTip: 'كل أيام الأسبوع مذكر بلا استثناء (der Montag, der Dienstag...)', exampleDe: 'Der Montag ist der Wochenstart.', exampleAr: 'الإثنين هو بداية أسبوع العمل.' },

  // 2. Feminine (die)
  { id: 'art_11', word: 'Wohnung', article: 'die', meaningAr: 'شقة سكنية', plural: 'die Wohnungen', ruleTip: 'النهاية -ung تجعل الكلمة مؤنثة (die) بنسبة 100%', exampleDe: 'Die Wohnung ist hell und modern.', exampleAr: 'الشقة مضيئة وعصرية.' },
  { id: 'art_12', word: 'Gesundheit', article: 'die', meaningAr: 'صحة', plural: '—', ruleTip: 'النهاية -heit تجعل الكلمة مؤنثة (die) دائماً', exampleDe: 'Die Gesundheit ist das Wichtigste.', exampleAr: 'الصحة هي الأهم.' },
  { id: 'art_13', word: 'Möglichkeit', article: 'die', meaningAr: 'إمكانية / فرصة', plural: 'die Möglichkeiten', ruleTip: 'النهاية -keit تعني دائماً أن الكلمة مؤنثة (die)', exampleDe: 'Es gibt viele Möglichkeiten.', exampleAr: 'توجد إمكانيات عديدة.' },
  { id: 'art_14', word: 'Universität', article: 'die', meaningAr: 'جامعة', plural: 'die Universitäten', ruleTip: 'النهاية -tät هي علامة تأنيث ذهبية (die)', exampleDe: 'Die Universität ist international renommiert.', exampleAr: 'الجامعة ذات سمعة دولية مرموقة.' },
  { id: 'art_15', word: 'Information', article: 'die', meaningAr: 'معلومة', plural: 'die Informationen', ruleTip: 'النهاية -ion تكون مؤنثة (die) بنسبة 100%', exampleDe: 'Die Information ist sehr nützlich.', exampleAr: 'المعلومة مفيدة للغاية.' },
  { id: 'art_16', word: 'Freundschaft', article: 'die', meaningAr: 'صداقة', plural: 'die Freundschaften', ruleTip: 'النهاية -schaft مؤنثة (die) دائماً', exampleDe: 'Die Freundschaft hält ein Leben lang.', exampleAr: 'الصداقة تدوم مدى الحياة.' },
  { id: 'art_17', word: 'Musik', article: 'die', meaningAr: 'موسيقى', plural: '—', ruleTip: 'النهاية -ik مؤنثة غالباً (die Musik, die Politik, die Kritik)', exampleDe: 'Die Musik entspannt den Geist.', exampleAr: 'الموسيقى تريح الذهن.' },
  { id: 'art_18', word: 'Bäckerei', article: 'die', meaningAr: 'مخبز', plural: 'die Bäckereien', ruleTip: 'النهاية -ei تدل على الأماكن والمهن المؤنثة (die)', exampleDe: 'Die Bäckerei öffnet früh am Morgen.', exampleAr: 'المخبز يفتح في الصباح الباكر.' },
  { id: 'art_19', word: 'Zeitung', article: 'die', meaningAr: 'جريدة / صحيفة', plural: 'die Zeitungen', ruleTip: 'النهاية -ung تعني مؤنث (die)', exampleDe: 'Ich lese die Zeitung beim Frühstück.', exampleAr: 'أقرأ الجريدة أثناء الإفطار.' },
  { id: 'art_20', word: 'Tasche', article: 'die', meaningAr: 'حقيبة', plural: 'die Taschen', ruleTip: 'أغلب الكلمات ذات المقطعين المنتهية بـ -e تكون مؤنثة (die)', exampleDe: 'Die Tasche ist aus Leder.', exampleAr: 'الحقيبة مصنوعة من الجلد.' },

  // 3. Neuter (das)
  { id: 'art_21', word: 'Mädchen', article: 'das', meaningAr: 'فتاة / بنت', plural: 'die Mädchen', ruleTip: 'صيغة التصغير -chen تجعل أي كلمة محايدة (das) حتى لو كانت عاقلة!', exampleDe: 'Das Mädchen lernt fleißig Deutsch.', exampleAr: 'الفتاة تتعلم الألمانية باجتهاد.' },
  { id: 'art_22', word: 'Dokument', article: 'das', meaningAr: 'مستند / وثيقة', plural: 'die Dokumente', ruleTip: 'النهاية -ment تدل دائماً على المحايد (das)', exampleDe: 'Das Dokument muss unterschrieben werden.', exampleAr: 'يجب توقيع هذه الوثيقة.' },
  { id: 'art_23', word: 'Museum', article: 'das', meaningAr: 'متحف', plural: 'die Museen', ruleTip: 'الكلمات ذات الأصل اللاتيني المنتهية بـ -um محايدة دائماً (das)', exampleDe: 'Das Museum zeigt antike Kunstwerke.', exampleAr: 'المتحف يعرض أعمالاً فنية قديمة.' },
  { id: 'art_24', word: 'Auto', article: 'das', meaningAr: 'سيارة', plural: 'die Autos', ruleTip: 'أغلب الكلمات الدولية المستعارة المنتهية بـ -o محايدة (das Auto, das Foto, das Kino)', exampleDe: 'Das Auto fährt sehr sparsam.', exampleAr: 'السيارة تستهلك وقوداً باقتصاد.' },
  { id: 'art_25', word: 'Buch', article: 'das', meaningAr: 'كتاب', plural: 'die Bücher', ruleTip: 'وسائل التعلم الأساسية محايدة (das Buch, das Heft, das Blatt)', exampleDe: 'Das Buch ist voller spannender Geschichten.', exampleAr: 'الكتاب مليء بالقصص المشوقة.' },
  { id: 'art_26', word: 'Thema', article: 'das', meaningAr: 'موضوع', plural: 'die Themen', ruleTip: 'الكلمات الإغريقية المنتهية بـ -ma محايدة دائماً (das Thema, das Problem, das Drama)', exampleDe: 'Das Thema ist heute sehr relevant.', exampleAr: 'الموضوع وثيق الصلة بالواقع اليوم.' },
  { id: 'art_27', word: 'Essen', article: 'das', meaningAr: 'الطعام / الأكل', plural: '—', ruleTip: 'أي فعل محوّل إلى اسم (Substantiviertes Verb) يكون محايداً (das)', exampleDe: 'Das Essen schmeckt fantastisch.', exampleAr: 'الطعام مذاقه رائع.' },
  { id: 'art_28', word: 'Brötchen', article: 'das', meaningAr: 'خبز صغير / كيزر', plural: 'die Brötchen', ruleTip: 'النهاية -chen هي صيغة تصغير محايدة (das) دائماً', exampleDe: 'Ich kaufe zwei frische Brötchen.', exampleAr: 'أشتري رغيفين صغيرين طازجين.' },
  { id: 'art_29', word: 'Zimmer', article: 'das', meaningAr: 'غرفة', plural: 'die Zimmer', ruleTip: 'أقسام المنزل الأساسية محايدة (das Zimmer, das Bad, das Wohnzimmer)', exampleDe: 'Das Zimmer ist ruhig und gemütlich.', exampleAr: 'الغرفة هادئة ومريحة.' },
  { id: 'art_30', word: 'Wasser', article: 'das', meaningAr: 'ماء', plural: '—', ruleTip: 'أغلب العناصر والمواد الأساسية الكيميائية محايدة (das Wasser, das Gold, das Silber)', exampleDe: 'Trinken Sie bitte viel Wasser.', exampleAr: 'اشرب الكثير من الماء رجاءً.' }
];
