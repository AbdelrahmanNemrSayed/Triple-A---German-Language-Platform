// data/verbs.js - مصرف الأفعال الألمانية وتصريفاتها في الأزمنة (Verbtabellen & Tenses)

export const verbsData = [
  // 1. sein (يكون)
  {
    id: 'verb_sein',
    infinitive: 'sein',
    arabic: 'يكون',
    type: 'irregular',
    level: 'A1',
    hilfsverb: 'sein',
    separablePrefix: null,
    praesens: {
      ich: 'bin',
      du: 'bist',
      er_sie_es: 'ist',
      wir: 'sind',
      ihr: 'seid',
      sie_Sie: 'sind'
    },
    praeteritum: {
      ich: 'war',
      du: 'warst',
      er_sie_es: 'war',
      wir: 'waren',
      ihr: 'wart',
      sie_Sie: 'waren'
    },
    perfekt: {
      hilfsverb: 'sein',
      partizip2: 'gewesen',
      fullForm: 'ist gewesen'
    },
    exampleDe: 'Ich bin seit einem Jahr in Deutschland und war gestern in Berlin.',
    exampleAr: 'أنا في ألمانيا منذ عام وكنت بالأمس في برلين.'
  },

  // 2. haben (يملك / لديه)
  {
    id: 'verb_haben',
    infinitive: 'haben',
    arabic: 'يملك / لديه',
    type: 'irregular',
    level: 'A1',
    hilfsverb: 'haben',
    separablePrefix: null,
    praesens: {
      ich: 'habe',
      du: 'hast',
      er_sie_es: 'hat',
      wir: 'haben',
      ihr: 'habt',
      sie_Sie: 'haben'
    },
    praeteritum: {
      ich: 'hatte',
      du: 'hattest',
      er_sie_es: 'hatte',
      wir: 'hatten',
      ihr: 'hattet',
      sie_Sie: 'hatten'
    },
    perfekt: {
      hilfsverb: 'haben',
      partizip2: 'gehabt',
      fullForm: 'hat gehabt'
    },
    exampleDe: 'Wir haben heute viel Zeit und hatten gestern viel Arbeit.',
    exampleAr: 'لدينا اليوم وقت كافٍ وكان لدينا بالأمس الكثير من العمل.'
  },

  // 3. werden (يصبح / للمستقبل)
  {
    id: 'verb_werden',
    infinitive: 'werden',
    arabic: 'يصبح',
    type: 'irregular',
    level: 'A1',
    hilfsverb: 'sein',
    separablePrefix: null,
    praesens: {
      ich: 'werde',
      du: 'wirst',
      er_sie_es: 'wird',
      wir: 'werden',
      ihr: 'werdet',
      sie_Sie: 'werden'
    },
    praeteritum: {
      ich: 'wurde',
      du: 'wurdest',
      er_sie_es: 'wurde',
      wir: 'wurden',
      ihr: 'wurdet',
      sie_Sie: 'wurden'
    },
    perfekt: {
      hilfsverb: 'sein',
      partizip2: 'geworden',
      fullForm: 'ist geworden'
    },
    exampleDe: 'Er wird bald Arzt und das Wetter wird morgen besser.',
    exampleAr: 'سيصبح قريباً طبيباً والطقس سيصبح غداً أفضل.'
  },

  // 4. können (يستطيع / يقدر)
  {
    id: 'verb_koennen',
    infinitive: 'können',
    arabic: 'يستطيع / يمكنه',
    type: 'modal',
    level: 'A1',
    hilfsverb: 'haben',
    separablePrefix: null,
    praesens: {
      ich: 'kann',
      du: 'kannst',
      er_sie_es: 'kann',
      wir: 'können',
      ihr: 'könnt',
      sie_Sie: 'können'
    },
    praeteritum: {
      ich: 'konnte',
      du: 'konntest',
      er_sie_es: 'konnte',
      wir: 'konnten',
      ihr: 'konntet',
      sie_Sie: 'konnten'
    },
    perfekt: {
      hilfsverb: 'haben',
      partizip2: 'gekonnt',
      fullForm: 'hat gekonnt'
    },
    exampleDe: 'Ich kann gut Deutsch sprechen.',
    exampleAr: 'أستطيع التحدث بالألمانية جيداً.'
  },

  // 5. müssen (يجب / يضطر)
  {
    id: 'verb_muessen',
    infinitive: 'müssen',
    arabic: 'يجب / يضطر إجبارياً',
    type: 'modal',
    level: 'A1',
    hilfsverb: 'haben',
    separablePrefix: null,
    praesens: {
      ich: 'muss',
      du: 'musst',
      er_sie_es: 'muss',
      wir: 'müssen',
      ihr: 'müsst',
      sie_Sie: 'müssen'
    },
    praeteritum: {
      ich: 'musste',
      du: 'musstest',
      er_sie_es: 'musste',
      wir: 'mussten',
      ihr: 'musstet',
      sie_Sie: 'mussten'
    },
    perfekt: {
      hilfsverb: 'haben',
      partizip2: 'gemusst',
      fullForm: 'hat gemusst'
    },
    exampleDe: 'Wir müssen heute fleißig lernen.',
    exampleAr: 'يجب علينا اليوم أن ندرس باجتهاد.'
  },

  // 6. wollen (يريد / ينوي)
  {
    id: 'verb_wollen',
    infinitive: 'wollen',
    arabic: 'يريد / ينوي بإرادته',
    type: 'modal',
    level: 'A1',
    hilfsverb: 'haben',
    separablePrefix: null,
    praesens: {
      ich: 'will',
      du: 'willst',
      er_sie_es: 'will',
      wir: 'wollen',
      ihr: 'wollt',
      sie_Sie: 'wollen'
    },
    praeteritum: {
      ich: 'wollte',
      du: 'wolltest',
      er_sie_es: 'wollte',
      wir: 'wollten',
      ihr: 'wolltet',
      sie_Sie: 'wollten'
    },
    perfekt: {
      hilfsverb: 'haben',
      partizip2: 'gewollt',
      fullForm: 'hat gewollt'
    },
    exampleDe: 'Ich will in Deutschland arbeiten.',
    exampleAr: 'أريد أن أعمل في ألمانيا.'
  },

  // 7. gehen (يذهب / يمشي)
  {
    id: 'verb_gehen',
    infinitive: 'gehen',
    arabic: 'يذهب / يمشي',
    type: 'irregular',
    level: 'A1',
    hilfsverb: 'sein',
    separablePrefix: null,
    praesens: {
      ich: 'gehe',
      du: 'gehst',
      er_sie_es: 'geht',
      wir: 'gehen',
      ihr: 'geht',
      sie_Sie: 'gehen'
    },
    praeteritum: {
      ich: 'ging',
      du: 'gingst',
      er_sie_es: 'ging',
      wir: 'gingen',
      ihr: 'gingt',
      sie_Sie: 'gingen'
    },
    perfekt: {
      hilfsverb: 'sein',
      partizip2: 'gegangen',
      fullForm: 'ist gegangen'
    },
    exampleDe: 'Sie ist heute früh zur Sprachschule gegangen.',
    exampleAr: 'ذهبت اليوم مبكراً إلى معهد اللغات.'
  },

  // 8. kommen (يأتي)
  {
    id: 'verb_kommen',
    infinitive: 'kommen',
    arabic: 'يأتي / يحضر',
    type: 'irregular',
    level: 'A1',
    hilfsverb: 'sein',
    separablePrefix: null,
    praesens: {
      ich: 'komme',
      du: 'kommst',
      er_sie_es: 'kommt',
      wir: 'kommen',
      ihr: 'kommt',
      sie_Sie: 'kommen'
    },
    praeteritum: {
      ich: 'kam',
      du: 'kamst',
      er_sie_es: 'kam',
      wir: 'kamen',
      ihr: 'kamt',
      sie_Sie: 'kamen'
    },
    perfekt: {
      hilfsverb: 'sein',
      partizip2: 'gekommen',
      fullForm: 'ist gekommen'
    },
    exampleDe: 'Wann bist du nach Deutschland gekommen?',
    exampleAr: 'متى أتيت إلى ألمانيا؟'
  },

  // 9. machen (يفعل / يصنع)
  {
    id: 'verb_machen',
    infinitive: 'machen',
    arabic: 'يفعل / يقوم بـ',
    type: 'regular',
    level: 'A1',
    hilfsverb: 'haben',
    separablePrefix: null,
    praesens: {
      ich: 'mache',
      du: 'machst',
      er_sie_es: 'macht',
      wir: 'machen',
      ihr: 'macht',
      sie_Sie: 'machen'
    },
    praeteritum: {
      ich: 'machte',
      du: 'machtest',
      er_sie_es: 'machte',
      wir: 'machten',
      ihr: 'machtet',
      sie_Sie: 'machten'
    },
    perfekt: {
      hilfsverb: 'haben',
      partizip2: 'gemacht',
      fullForm: 'hat gemacht'
    },
    exampleDe: 'Was hast du am Wochenende gemacht?',
    exampleAr: 'ماذا فعلت في عطلة نهاية الأسبوع؟'
  },

  // 10. sprechen (يتحدث / يتكلم)
  {
    id: 'verb_sprechen',
    infinitive: 'sprechen',
    arabic: 'يتحدث / يتكلم',
    type: 'irregular',
    level: 'A1',
    hilfsverb: 'haben',
    separablePrefix: null,
    praesens: {
      ich: 'spreche',
      du: 'sprichst',
      er_sie_es: 'spricht',
      wir: 'sprechen',
      ihr: 'sprecht',
      sie_Sie: 'sprechen'
    },
    praeteritum: {
      ich: 'sprach',
      du: 'sprachst',
      er_sie_es: 'sprach',
      wir: 'sprachen',
      ihr: 'spracht',
      sie_Sie: 'sprachen'
    },
    perfekt: {
      hilfsverb: 'haben',
      partizip2: 'gesprochen',
      fullForm: 'hat gesprochen'
    },
    exampleDe: 'Er spricht drei Sprachen fließend.',
    exampleAr: 'هو يتحدث ثلاث لغات بطلاقة.'
  },

  // 11. sehen (يرى / يشاهد)
  {
    id: 'verb_sehen',
    infinitive: 'sehen',
    arabic: 'يرى / يشاهد',
    type: 'irregular',
    level: 'A1',
    hilfsverb: 'haben',
    separablePrefix: null,
    praesens: {
      ich: 'sehe',
      du: 'siehst',
      er_sie_es: 'sieht',
      wir: 'sehen',
      ihr: 'seht',
      sie_Sie: 'sehen'
    },
    praeteritum: {
      ich: 'sah',
      du: 'sahst',
      er_sie_es: 'sah',
      wir: 'sahen',
      ihr: 'saht',
      sie_Sie: 'sahen'
    },
    perfekt: {
      hilfsverb: 'haben',
      partizip2: 'gesehen',
      fullForm: 'hat gesehen'
    },
    exampleDe: 'Ich habe gestern einen interessanten Film gesehen.',
    exampleAr: 'رأيت بالأمس فيلماً مثيراً للاهتمام.'
  },

  // 12. aufstehen (يستيقظ - فعل منفصل)
  {
    id: 'verb_aufstehen',
    infinitive: 'aufstehen',
    arabic: 'يستيقظ / ينهض',
    type: 'separable',
    level: 'A1',
    hilfsverb: 'sein',
    separablePrefix: 'auf',
    praesens: {
      ich: 'stehe auf',
      du: 'stehst auf',
      er_sie_es: 'steht auf',
      wir: 'stehen auf',
      ihr: 'steht auf',
      sie_Sie: 'stehen auf'
    },
    praeteritum: {
      ich: 'stand auf',
      du: 'standest auf',
      er_sie_es: 'stand auf',
      wir: 'standen auf',
      ihr: 'standet auf',
      sie_Sie: 'standen auf'
    },
    perfekt: {
      hilfsverb: 'sein',
      partizip2: 'aufgestanden',
      fullForm: 'ist aufgestanden'
    },
    exampleDe: 'Ich stehe jeden Tag um 6 Uhr morgens auf.',
    exampleAr: 'أستيقظ كل يوم في الساعة السادسة صباحاً.'
  },

  // 13. anrufen (يتصل هاتفياً - فعل منفصل)
  {
    id: 'verb_anrufen',
    infinitive: 'anrufen',
    arabic: 'يتصل هاتفياً',
    type: 'separable',
    level: 'A1',
    hilfsverb: 'haben',
    separablePrefix: 'an',
    praesens: {
      ich: 'rufe an',
      du: 'rufst an',
      er_sie_es: 'ruft an',
      wir: 'rufen an',
      ihr: 'ruft an',
      sie_Sie: 'rufen an'
    },
    praeteritum: {
      ich: 'rief an',
      du: 'riefst an',
      er_sie_es: 'rief an',
      wir: 'riefen an',
      ihr: 'rieft an',
      sie_Sie: 'riefen an'
    },
    perfekt: {
      hilfsverb: 'haben',
      partizip2: 'angerufen',
      fullForm: 'hat angerufen'
    },
    exampleDe: 'Ruf mich bitte an, wenn du am Bahnhof ankommst.',
    exampleAr: 'اتصل بي من فضلك عندما تصل إلى المحطة.'
  },

  // 14. einkaufen (يتسوق - فعل منفصل)
  {
    id: 'verb_einkaufen',
    infinitive: 'einkaufen',
    arabic: 'يتسوق',
    type: 'separable',
    level: 'A1',
    hilfsverb: 'haben',
    separablePrefix: 'ein',
    praesens: {
      ich: 'kaufe ein',
      du: 'kaufst ein',
      er_sie_es: 'kauft ein',
      wir: 'kaufen ein',
      ihr: 'kauft ein',
      sie_Sie: 'kaufen ein'
    },
    praeteritum: {
      ich: 'kaufte ein',
      du: 'kauftest ein',
      er_sie_es: 'kaufte ein',
      wir: 'kauften ein',
      ihr: 'kauftet ein',
      sie_Sie: 'kauften ein'
    },
    perfekt: {
      hilfsverb: 'haben',
      partizip2: 'eingekauft',
      fullForm: 'hat eingekauft'
    },
    exampleDe: 'Am Samstag kaufe ich im Supermarkt ein.',
    exampleAr: 'يوم السبت أتسوق في السوبرماركت.'
  },

  // 15. arbeiten (يعمل)
  {
    id: 'verb_arbeiten',
    infinitive: 'arbeiten',
    arabic: 'يعمل / يشتغل',
    type: 'regular',
    level: 'A1',
    hilfsverb: 'haben',
    separablePrefix: null,
    praesens: {
      ich: 'arbeite',
      du: 'arbeitest',
      er_sie_es: 'arbeitet',
      wir: 'arbeiten',
      ihr: 'arbeitet',
      sie_Sie: 'arbeiten'
    },
    praeteritum: {
      ich: 'arbeitete',
      du: 'arbeitetest',
      er_sie_es: 'arbeitete',
      wir: 'arbeiteten',
      ihr: 'arbeitetet',
      sie_Sie: 'arbeiteten'
    },
    perfekt: {
      hilfsverb: 'haben',
      partizip2: 'gearbeitet',
      fullForm: 'hat gearbeitet'
    },
    exampleDe: 'Er arbeitet als Softwareentwickler bei Siemens.',
    exampleAr: 'هو يعمل كمطور برمجيات في شركة سيمنز.'
  },

  // 16. lernen (يتعلم / يدرس)
  {
    id: 'verb_lernen',
    infinitive: 'lernen',
    arabic: 'يتعلم / يدرس',
    type: 'regular',
    level: 'A1',
    hilfsverb: 'haben',
    separablePrefix: null,
    praesens: {
      ich: 'lerne',
      du: 'lernst',
      er_sie_es: 'lernt',
      wir: 'lernen',
      ihr: 'lernt',
      sie_Sie: 'lernen'
    },
    praeteritum: {
      ich: 'lernte',
      du: 'lerntest',
      er_sie_es: 'lernte',
      wir: 'lernten',
      ihr: 'lerntet',
      sie_Sie: 'lernten'
    },
    perfekt: {
      hilfsverb: 'haben',
      partizip2: 'gelernt',
      fullForm: 'hat gelernt'
    },
    exampleDe: 'Ich lerne jeden Tag neue deutsche Wörter.',
    exampleAr: 'أتعلم كل يوم كلمات ألمانية جديدة.'
  },

  // 17. schreiben (يكتب)
  {
    id: 'verb_schreiben',
    infinitive: 'schreiben',
    arabic: 'يكتب',
    type: 'irregular',
    level: 'A1',
    hilfsverb: 'haben',
    separablePrefix: null,
    praesens: {
      ich: 'schreibe',
      du: 'schreibst',
      er_sie_es: 'schreibt',
      wir: 'schreiben',
      ihr: 'schreibt',
      sie_Sie: 'schreiben'
    },
    praeteritum: {
      ich: 'schrieb',
      du: 'schriebst',
      er_sie_es: 'schrieb',
      wir: 'schrieben',
      ihr: 'schriebt',
      sie_Sie: 'schrieben'
    },
    perfekt: {
      hilfsverb: 'haben',
      partizip2: 'geschrieben',
      fullForm: 'hat geschrieben'
    },
    exampleDe: 'Ich habe eine offizielle E-Mail an die Behörde geschrieben.',
    exampleAr: 'كتبت إيميل رسمي للجهة الحكومية.'
  },

  // 18. lesen (يقرأ)
  {
    id: 'verb_lesen',
    infinitive: 'lesen',
    arabic: 'يقرأ',
    type: 'irregular',
    level: 'A1',
    hilfsverb: 'haben',
    separablePrefix: null,
    praesens: {
      ich: 'lese',
      du: 'liest',
      er_sie_es: 'liest',
      wir: 'lesen',
      ihr: 'lest',
      sie_Sie: 'lesen'
    },
    praeteritum: {
      ich: 'las',
      du: 'lasest',
      er_sie_es: 'las',
      wir: 'lasen',
      ihr: 'last',
      sie_Sie: 'lasen'
    },
    perfekt: {
      hilfsverb: 'haben',
      partizip2: 'gelesen',
      fullForm: 'hat gelesen'
    },
    exampleDe: 'Sie liest gerne deutsche Kurzgeschichten.',
    exampleAr: 'هي تحب قراءة القصص الألمانية القصيرة.'
  },

  // 19. fahren (يسافر بالسيارة/القطار)
  {
    id: 'verb_fahren',
    infinitive: 'fahren',
    arabic: 'يسافر / يقود مركبة',
    type: 'irregular',
    level: 'A1',
    hilfsverb: 'sein',
    separablePrefix: null,
    praesens: {
      ich: 'fahre',
      du: 'fährst',
      er_sie_es: 'fährt',
      wir: 'fahren',
      ihr: 'fahrt',
      sie_Sie: 'fahren'
    },
    praeteritum: {
      ich: 'fuhr',
      du: 'fuhrst',
      er_sie_es: 'fuhr',
      wir: 'fuhren',
      ihr: 'fuhrt',
      sie_Sie: 'fuhren'
    },
    perfekt: {
      hilfsverb: 'sein',
      partizip2: 'gefahren',
      fullForm: 'ist gefahren'
    },
    exampleDe: 'Wir sind mit dem ICE-Zug nach Hamburg gefahren.',
    exampleAr: 'سافرنا بقطار ICE السريع إلى هامبورغ.'
  },

  // 20. verstehen (يفهم)
  {
    id: 'verb_verstehen',
    infinitive: 'verstehen',
    arabic: 'يفهم / يستوعب',
    type: 'irregular',
    level: 'A2',
    hilfsverb: 'haben',
    separablePrefix: null,
    praesens: {
      ich: 'verstehe',
      du: 'verstehst',
      er_sie_es: 'versteht',
      wir: 'verstehen',
      ihr: 'versteht',
      sie_Sie: 'verstehen'
    },
    praeteritum: {
      ich: 'verstand',
      du: 'verstandest',
      er_sie_es: 'verstand',
      wir: 'verstanden',
      ihr: 'verstandet',
      sie_Sie: 'verstanden'
    },
    perfekt: {
      hilfsverb: 'haben',
      partizip2: 'verstanden',
      fullForm: 'hat verstanden'
    },
    exampleDe: 'Hast du die Grammatikregel verstanden?',
    exampleAr: 'هل فهمت قاعدة النحو؟'
  },

  // 21. wissen (يعلم / يعرف معلومة)
  {
    id: 'verb_wissen',
    infinitive: 'wissen',
    arabic: 'يعلم / يعرف حقيقة',
    type: 'irregular',
    level: 'A2',
    hilfsverb: 'haben',
    separablePrefix: null,
    praesens: {
      ich: 'weiß',
      du: 'weißt',
      er_sie_es: 'weiß',
      wir: 'wissen',
      ihr: 'wisst',
      sie_Sie: 'wissen'
    },
    praeteritum: {
      ich: 'wusste',
      du: 'wusstest',
      er_sie_es: 'wusste',
      wir: 'wussten',
      ihr: 'wusstet',
      sie_Sie: 'wussten'
    },
    perfekt: {
      hilfsverb: 'haben',
      partizip2: 'gewusst',
      fullForm: 'hat gewusst'
    },
    exampleDe: 'Ich weiß genau, wo das Bürgeramt liegt.',
    exampleAr: 'أعلم بدقة أين تقع دائرة شؤون المواطنين.'
  },

  // 22. mitbringen (يجلب معه - فعل منفصل)
  {
    id: 'verb_mitbringen',
    infinitive: 'mitbringen',
    arabic: 'يجلب معه',
    type: 'separable',
    level: 'A2',
    hilfsverb: 'haben',
    separablePrefix: 'mit',
    praesens: {
      ich: 'bringe mit',
      du: 'bringst mit',
      er_sie_es: 'bringt mit',
      wir: 'bringen mit',
      ihr: 'bringt mit',
      sie_Sie: 'bringen mit'
    },
    praeteritum: {
      ich: 'brachte mit',
      du: 'brachtest mit',
      er_sie_es: 'brachte mit',
      wir: 'brachten mit',
      ihr: 'brachtet mit',
      sie_Sie: 'brachten mit'
    },
    perfekt: {
      hilfsverb: 'haben',
      partizip2: 'mitgebracht',
      fullForm: 'hat mitgebracht'
    },
    exampleDe: 'Bitte bringen Sie Ihren Reisepass zum Termin mit.',
    exampleAr: 'يرجى إحضار جواز سفرك معك للموعد.'
  },

  // 23. anfangen (يبدأ - فعل منفصل)
  {
    id: 'verb_anfangen',
    infinitive: 'anfangen',
    arabic: 'يبدأ',
    type: 'separable',
    level: 'A2',
    hilfsverb: 'haben',
    separablePrefix: 'an',
    praesens: {
      ich: 'fange an',
      du: 'fängst an',
      er_sie_es: 'fängt an',
      wir: 'fangen an',
      ihr: 'fangt an',
      sie_Sie: 'fangen an'
    },
    praeteritum: {
      ich: 'fing an',
      du: 'fingst an',
      er_sie_es: 'fing an',
      wir: 'fingen an',
      ihr: 'fingt an',
      sie_Sie: 'fingen an'
    },
    perfekt: {
      hilfsverb: 'haben',
      partizip2: 'angefangen',
      fullForm: 'hat angefangen'
    },
    exampleDe: 'Der Deutschkurs fängt nächsten Montag an.',
    exampleAr: 'تبدأ دورة اللغة الألمانية يوم الاثنين القادم.'
  },

  // 24. bewerben (يتقدم لوظيفة - فعل انعكاسي)
  {
    id: 'verb_bewerben',
    infinitive: 'sich bewerben',
    arabic: 'يتقدم بطلب لوظيفة',
    type: 'irregular',
    level: 'B1',
    hilfsverb: 'haben',
    separablePrefix: null,
    praesens: {
      ich: 'bewerbe mich',
      du: 'bewirbst dich',
      er_sie_es: 'bewirbt sich',
      wir: 'bewerben uns',
      ihr: 'bewerbt euch',
      sie_Sie: 'bewerben sich'
    },
    praeteritum: {
      ich: 'bewarb mich',
      du: 'bewarbst dich',
      er_sie_es: 'bewarb sich',
      wir: 'bewarben uns',
      ihr: 'bewarbt euch',
      sie_Sie: 'bewarben sich'
    },
    perfekt: {
      hilfsverb: 'haben',
      partizip2: 'beworben',
      fullForm: 'hat sich beworben'
    },
    exampleDe: 'Ich habe mich um eine Stelle als IT-Consultant beworben.',
    exampleAr: 'تقدمت بطلب للحصول على وظيفة كمستشار تكنولوجيا معلومات.'
  }
];
