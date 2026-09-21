// data/grammar_rules.js
// بنك القواعد الألمانية التفاعلي لمستوى A1 / A2 / B1 - منصة Triple A PRO

export const KASUS_DATA = {
  cases: [
    {
      id: 'nominativ',
      nameDe: 'Nominativ',
      nameAr: 'حالة الرفع (الفاعل)',
      question: 'Wer? / Was? (من؟ / ما؟)',
      description: 'الفاعل الأساسي في الجملة الذي يقوم بالفعل، أو ما يأتي بعد أفعال مثل (sein, werden, bleiben).',
      articles: {
        definite: { m: 'der', f: 'die', n: 'das', pl: 'die' },
        indefinite: { m: 'ein', f: 'eine', n: 'ein', pl: '–' },
        negative: { m: 'kein', f: 'keine', n: 'kein', pl: 'keine' },
        possessive: { m: 'mein', f: 'meine', n: 'mein', pl: 'meine' }
      },
      pronouns: [
        { de: 'ich', ar: 'أنا' },
        { de: 'du', ar: 'أنتَ / أنتِ' },
        { de: 'er', ar: 'هو' },
        { de: 'sie', ar: 'هي' },
        { de: 'es', ar: 'هو/هي للمحايد' },
        { de: 'wir', ar: 'نحن' },
        { de: 'ihr', ar: 'أنتم' },
        { de: 'sie / Sie', ar: 'هم / حضرتك' }
      ],
      examples: [
        { de: 'Der Mann arbeitet hier.', ar: 'الرجل يعمل هنا.' },
        { de: 'Das Kind spielt im Garten.', ar: 'الطفل يلعب في الحديقة.' }
      ]
    },
    {
      id: 'akkusativ',
      nameDe: 'Akkusativ',
      nameAr: 'حالة النصب (المفعول به المباشر)',
      question: 'Wen? / Was? (من؟ / ماذا؟)',
      description: 'المفعول به المباشر الذي يقع عليه الفعل. التغيير الوحيد يحدث في المذكر (der -> den).',
      articles: {
        definite: { m: 'den', f: 'die', n: 'das', pl: 'die' },
        indefinite: { m: 'einen', f: 'eine', n: 'ein', pl: '–' },
        negative: { m: 'keinen', f: 'keine', n: 'kein', pl: 'keine' },
        possessive: { m: 'meinen', f: 'meine', n: 'mein', pl: 'meine' }
      },
      prepositions: ['bis', 'durch', 'für', 'gegen', 'ohne', 'um', 'entlang'],
      prepTip: 'حروف تأتي دائماً مع Akkusativ: (DOGFU: Durch, Ohne, Gegen, Für, Um)',
      pronouns: [
        { de: 'mich', ar: 'إياي (ي)' },
        { de: 'dich', ar: 'إياك (ك)' },
        { de: 'ihn', ar: 'إياه (ـه للمذكر)' },
        { de: 'sie', ar: 'إياها (ـها)' },
        { de: 'es', ar: 'إياه (للمحايد)' },
        { de: 'uns', ar: 'إيانا (نا)' },
        { de: 'euch', ar: 'إياكم (كم)' },
        { de: 'sie / Sie', ar: 'إياهم / إياكم' }
      ],
      examples: [
        { de: 'Ich habe einen neuen Laptop gekauft.', ar: 'اشتريتُ حاسوباً محمولاً جديداً.' },
        { de: 'Das Geschenk ist für dich.', ar: 'الهدية من أجلك.' }
      ]
    },
    {
      id: 'dativ',
      nameDe: 'Dativ',
      nameAr: 'حالة الجر (المفعول به غير المباشر)',
      question: 'Wem? / Wo? (لمن؟ / أين؟)',
      description: 'المتلقي غير المباشر للفعل، أو ما يأتي بعد حروف الجر الخاصة بالداتيف أو الإجابة عن أين (Wo).',
      articles: {
        definite: { m: 'dem', f: 'der', n: 'dem', pl: 'den (+n)' },
        indefinite: { m: 'einem', f: 'einer', n: 'einem', pl: '–' },
        negative: { m: 'keinem', f: 'keiner', n: 'keinem', pl: 'keinen (+n)' },
        possessive: { m: 'meinem', f: 'meiner', n: 'meinem', pl: 'meinen (+n)' }
      },
      prepositions: ['aus', 'bei', 'mit', 'nach', 'seit', 'von', 'zu', 'gegenüber'],
      prepTip: 'حروف تأتي دائماً مع Dativ: (aus, bei, mit, nach, seit, von, zu)',
      pronouns: [
        { de: 'mir', ar: 'لي' },
        { de: 'dir', ar: 'لكَ / لكِ' },
        { de: 'ihm', ar: 'له' },
        { de: 'ihr', ar: 'لها' },
        { de: 'ihm', ar: 'له (محايد)' },
        { de: 'uns', ar: 'لنا' },
        { de: 'euch', ar: 'لكم' },
        { de: 'ihnen / Ihnen', ar: 'لهم / لحضرتك' }
      ],
      examples: [
        { de: 'Ich helfe dem Mann.', ar: 'أنا أساعد الرجل.' },
        { de: 'Sie spricht mit ihrer Mutter.', ar: 'هي تتحدث مع أمها.' }
      ]
    },
    {
      id: 'genitiv',
      nameDe: 'Genitiv',
      nameAr: 'حالة الإضافة (الملكية والنسبة)',
      question: 'Wessen? (لمن؟ / ملك من؟)',
      description: 'تدل على نسبة الشيء لمالكه أو العلاقة الإضافية، شائعة جداً في مستوى B1 والأدب والأخبار.',
      articles: {
        definite: { m: 'des (+s/es)', f: 'der', n: 'des (+s/es)', pl: 'der' },
        indefinite: { m: 'eines (+s/es)', f: 'einer', n: 'eines (+s/es)', pl: '–' },
        negative: { m: 'keines (+s/es)', f: 'keiner', n: 'keines (+s/es)', pl: 'keiner' },
        possessive: { m: 'meines (+s/es)', f: 'meiner', n: 'meines (+s/es)', pl: 'meiner' }
      },
      prepositions: ['während', 'wegen', 'trotz', 'statt / anstatt', 'innerhalb', 'außerhalb'],
      prepTip: 'حروف الجينيتيف الأربعة الذهبية: (während, wegen, trotz, statt)',
      pronouns: [
        { de: 'meiner', ar: 'خاصتي' },
        { de: 'deiner', ar: 'خاصتك' },
        { de: 'seiner', ar: 'خاصته' },
        { de: 'ihrer', ar: 'خاصتها' },
        { de: 'seiner', ar: 'خاصته' },
        { de: 'unserer', ar: 'خاصتنا' },
        { de: 'eurer', ar: 'خاصتكم' },
        { de: 'ihrer / Ihrer', ar: 'خاصتهم / لحضرتك' }
      ],
      examples: [
        { de: 'Das Auto meines Vaters ist neu.', ar: 'سيارة والدي جديدة.' },
        { de: 'Wegen des Regens bleiben wir zu Hause.', ar: 'بسبب المطر سنبقى في المنزل.' }
      ]
    }
  ],

  wechselpraepositionen: {
    title: 'حروف الجر المشتركة (Wechselpräpositionen)',
    rule: 'تأخذ Akkusativ إذا كان هناك حركة/تغيير مكان (Wohin? - إلى أين؟)، وتأخذ Dativ إذا كان هناك ثبات/سكون (Wo? - أين؟).',
    prepositions: [
      { de: 'an', ar: 'بمحاذاة / على (رأسي)' },
      { de: 'auf', ar: 'على (فوق سطح)' },
      { de: 'hinter', ar: 'خلف' },
      { de: 'in', ar: 'في / إلى داخل' },
      { de: 'neben', ar: 'بجانب' },
      { de: 'über', ar: 'فوق (مع مسافة / عبور)' },
      { de: 'unter', ar: 'تحت' },
      { de: 'vor', ar: 'أمام' },
      { de: 'zwischen', ar: 'بين' }
    ],
    examples: [
      {
        question: 'Wohin? (حركة -> Akkusativ)',
        de: 'Ich lege das Buch auf den Tisch.',
        ar: 'أنا أضع الكتاب فوق الطاولة (فعل حركة: legen).'
      },
      {
        question: 'Wo? (ثبات -> Dativ)',
        de: 'Das Buch liegt auf dem Tisch.',
        ar: 'الكتاب موضوع فوق الطاولة (فعل ثبات: liegen).'
      }
    ]
  }
};

export const ADJECTIVE_DECLENSION_RULES = {
  // Table schema: type -> case -> gender -> { ending, example }
  // Type: 'definite' (mit bestimmtem Artikel: der, die, das)
  // Type: 'indefinite' (mit unbestimmtem/Possessiv: ein, mein, kein)
  // Type: 'zero' (ohne Artikel: Nullartikel)
  definite: {
    name: 'مع أداة المعرفة (der, die, das, die)',
    ruleAr: 'القاعدة بسيطة جداً: تأخذ الصفة (-e) فقط في الفاعل للمذكر والمؤنث والمحايد، والنصب للمؤنث والمحايد. وكل باقي الحالات في الجدول تنتهي بـ (-en)!',
    table: {
      nominativ: { m: '-e', f: '-e', n: '-e', pl: '-en' },
      akkusativ: { m: '-en', f: '-e', n: '-e', pl: '-en' },
      dativ: { m: '-en', f: '-en', n: '-en', pl: '-en' },
      genitiv: { m: '-en', f: '-en', n: '-en', pl: '-en' }
    }
  },
  indefinite: {
    name: 'مع أداة النكرة والملكية والنفي (ein, mein, kein)',
    ruleAr: 'الصفة تعوض أداة الإعراب المفقودة في حالة الرفع والنصب (-er للمذكر, -es للمحايد, -e للمؤنث). باقي الحالات والجمع تنتهي بـ (-en)!',
    table: {
      nominativ: { m: '-er', f: '-e', n: '-es', pl: '-en' },
      akkusativ: { m: '-en', f: '-e', n: '-es', pl: '-en' },
      dativ: { m: '-en', f: '-en', n: '-en', pl: '-en' },
      genitiv: { m: '-en', f: '-en', n: '-en', pl: '-en' }
    }
  },
  zero: {
    name: 'بدون أداة (Nullartikel)',
    ruleAr: 'تأخذ الصفة نهايات أداة المعرفة نفسها (der -> -er, das -> -es, dem -> -em...) عدا المذكر والمحايد في الجينيتيف يأخذان (-en).',
    table: {
      nominativ: { m: '-er', f: '-e', n: '-es', pl: '-e' },
      akkusativ: { m: '-en', f: '-e', n: '-es', pl: '-e' },
      dativ: { m: '-em', f: '-er', n: '-em', pl: '-en' },
      genitiv: { m: '-en', f: '-er', n: '-en', pl: '-er' }
    }
  }
};

export const SENTENCE_CONNECTORS = [
  {
    category: 'Position 0 (ADUSO)',
    badge: 'لا تؤثر على ترتيب الجملة',
    ruleAr: 'تأتي الأداة ويبقى الفعل في موقعه الطبيعي الثاني (Verb auf Position 2).',
    connectors: [
      { de: 'aber', ar: 'لكن', example: 'Ich lerne fleißig, aber Deutsch ist nicht einfach.' },
      { de: 'denn', ar: 'لأنّ', example: 'Er bleibt zu Hause, denn er ist krank.' },
      { de: 'und', ar: 'و', example: 'Wir kochen zusammen und wir hören Musik.' },
      { de: 'sondern', ar: 'بل', example: 'Ich trinke keinen Kaffee, sondern ich trinke Tee.' },
      { de: 'oder', ar: 'أو', example: 'Kommen Sie heute oder kommen Sie morgen?' }
    ]
  },
  {
    category: 'Position 1 (Konjunktionaladverbien)',
    badge: 'يأتي الفعل بعدها مباشرة (Inversion)',
    ruleAr: 'هذه الأدوات تحتل الموقع الأول، لذلك يقفز الفعل فوراً إلى الموقع الثاني بعدها مباشرة.',
    connectors: [
      { de: 'deshalb / deswegen', ar: 'لذلك', example: 'Es regnet stark, deshalb bleibe ich daheim.' },
      { de: 'trotzdem', ar: 'على الرغم من ذلك', example: 'Er hat wenig Zeit, trotzdem hilft er mir.' },
      { de: 'außerdem', ar: 'علاوة على ذلك', example: 'Sie spricht Deutsch, außerdem kann sie Spanisch.' },
      { de: 'dann', ar: 'ثمّ / بعد ذلك', example: 'Wir essen zuerst, dann gehen wir spazieren.' }
    ]
  },
  {
    category: 'Nebensatz / Subjunktionen',
    badge: 'تدفع الفعل إلى نهاية الجملة تماماً',
    ruleAr: 'الجملة الجانبية (Nebensatz): الفعل المصرف يذهب إلى آخر الجملة قبل النقطة مباشرة.',
    connectors: [
      { de: 'weil', ar: 'لأنّ (سببية)', example: 'Ich kann nicht kommen, weil ich krank bin.' },
      { de: 'dass', ar: 'أنّ (موصولة)', example: 'Ich weiß, dass du sehr fleißig bist.' },
      { de: 'wenn', ar: 'إذا / عندما (شرط/تكرار)', example: 'Wenn das Wetter schön ist, gehen wir raus.' },
      { de: 'obwohl', ar: 'على الرغم من أنّ', example: 'Obwohl er müde ist, lernt er weiter.' },
      { de: 'damit', ar: 'لكي / حتى (غائية)', example: 'Ich lerne viel, damit ich die Prüfung bestehe.' },
      { de: 'ob', ar: 'فيما إذا (سؤال غير مباشر)', example: 'Er fragt, ob wir morgen Zeit haben.' }
    ]
  }
];

export const MODAL_VERBS_DATA = [
  {
    verb: 'können',
    meaning: 'الاستطاعة والقدرة (Can)',
    praesens: { ich: 'kann', du: 'kannst', er_sie_es: 'kann', wir: 'können', ihr: 'könnt', sie_Sie: 'können' },
    praeteritum: 'konnte',
    example: 'Ich kann sehr gut Deutsch sprechen.'
  },
  {
    verb: 'müssen',
    meaning: 'الإلزام والضرورة الحتمية (Must)',
    praesens: { ich: 'muss', du: 'musst', er_sie_es: 'muss', wir: 'müssen', ihr: 'müsst', sie_Sie: 'müssen' },
    praeteritum: 'musste',
    example: 'Wir müssen heute pünktlich ankommen.'
  },
  {
    verb: 'dürfen',
    meaning: 'السماح والإذن القانوني/الرسمي (May / Allowed to)',
    praesens: { ich: 'darf', du: 'darfst', er_sie_es: 'darf', wir: 'dürfen', ihr: 'dürft', sie_Sie: 'dürfen' },
    praeteritum: 'durfte',
    example: 'Hier darf man leider nicht parken.'
  },
  {
    verb: 'wollen',
    meaning: 'الإرادة القوية والتصميم (Want)',
    praesens: { ich: 'will', du: 'willst', er_sie_es: 'will', wir: 'wollen', ihr: 'wollt', sie_Sie: 'wollen' },
    praeteritum: 'wollte',
    example: 'Ich will die B1-Prüfung dieses Jahr schaffen.'
  },
  {
    verb: 'sollen',
    meaning: 'النصيحة أو أمر من طرف ثالث (Should / Supposed to)',
    praesens: { ich: 'soll', du: 'sollst', er_sie_es: 'soll', wir: 'sollen', ihr: 'sollt', sie_Sie: 'sollen' },
    praeteritum: 'sollte',
    example: 'Der Arzt sagt, ich soll viel Wasser trinken.'
  },
  {
    verb: 'möchten',
    meaning: 'الرغبة المهذبة (Would like)',
    praesens: { ich: 'möchte', du: 'möchtest', er_sie_es: 'möchte', wir: 'möchten', ihr: 'möchtet', sie_Sie: 'möchten' },
    praeteritum: 'wollte',
    example: 'Ich möchte einen Kaffee trinken, bitte.'
  }
];
