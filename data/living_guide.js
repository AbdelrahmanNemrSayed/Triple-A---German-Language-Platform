// data/living_guide.js - دليل الحياة والمعيشة والاندماج في ألمانيا (Leben & Alltag in Deutschland)

export const livingGuideData = [
  // 1. تسجيل السكن (Anmeldung)
  {
    id: 'guide_anmeldung',
    icon: '🏛️',
    titleAr: 'تسجيل السكن (Anmeldung im Bürgeramt)',
    titleDe: 'Wohnsitzanmeldung beim Bürgeramt',
    badge: 'إلزامي خلال 14 يوماً',
    summaryAr: 'الخطوة الأولى والأهم في ألمانيا. بدونها لا يمكنك فتح حساب بنكي أو الحصول على الرقم الضريبي (Steuer-ID) أو توقيع عقد عمل.',
    steps: [
      {
        id: 'anm_1',
        titleAr: 'حجز الموعد مبكراً (Termin buchen)',
        descAr: 'المواعيد في المدن الكبرى (برلين، ميونخ، فرانكفورت) تزدحم بسرعة. افتح موقع الـ Bürgeramt في تمام الساعة 8 صباحاً للبحث عن المواعيد المتاحة لنفس اليوم.'
      },
      {
        id: 'anm_2',
        titleAr: 'تجهيز شهادة السكن من المالك (Wohnungsgeberbestätigung)',
        descAr: 'وثيقة رسمية يوقعها صاحب السكن أو شركة العقارات يؤكد فيها تاريخ انتقالك للعنوان. عقد الإيجار وحده لا يكفي قانونياً!'
      },
      {
        id: 'anm_3',
        titleAr: 'جواز السفر وتعبئة الاستمارة (Anmeldeformular)',
        descAr: 'إحضار أصل جواز السفر مع تأشيرة الدخول واستمارة التسجيل معبأة بالبيانات وموقعة.'
      },
      {
        id: 'anm_4',
        titleAr: 'استلام شهادة التسجيل (Meldebestätigung)',
        descAr: 'تُسلّم لك في نفس الموعد. احتفظ بها جيداً فهي وثيقة إثبات سكنك في جميع المعاملات.'
      }
    ],
    checklist: [
      { id: 'chk_anm_pass', textDe: 'Gültiger Reisepass / Personalausweis', textAr: 'جواز سفر ساري المفعول' },
      { id: 'chk_anm_wgb', textDe: 'Wohnungsgeberbestätigung vom Vermieter', textAr: 'شهادة تأكيد السكن من المؤجر موقعة' },
      { id: 'chk_anm_form', textDe: 'Ausgefülltes Anmeldeformular', textAr: 'استمارة التسجيل معبأة وموقعة' },
      { id: 'chk_anm_cert', textDe: 'Meldebestätigung sicher aufbewahren', textAr: 'الاحتفاظ بشهادة التسجيل الصادرة' }
    ],
    glossary: [
      { term: 'das Bürgeramt', phonetic: 'داس بيورغرامت', arabic: 'دائرة شؤون المواطنين / البلدية', explanation: 'الجهة الحكومية المسؤولة عن تسجيل السكن، بطاقات الهوية، وشهادات الإقامة.' },
      { term: 'die Meldebestätigung', phonetic: 'دي ميلدي-بشتيتيغونغ', arabic: 'شهادة تسجيل السكن الرسمية', explanation: 'الورقة الأساسية لفتح البنك وإبرام العقود في ألمانيا.' },
      { term: 'die Steuer-ID', phonetic: 'دي شتوير-آي دي', arabic: 'الرقم الضريبي الموحد', explanation: 'رقم من 11 خانة يرسل لك عبر البريد بعد التسجيل تلقائياً للعمل والضرائب.' }
    ],
    template: {
      title: 'طلب موعد لتسجيل السكن بالبريد الإلكتروني',
      germanText: `Sehr geehrte Damen und Herren,

ich bin neu nach [Stadt] gezogen und möchte gerne meinen Wohnsitz anmelden. Leider konnte ich online keinen zeitnahen Termin finden.

Da die gesetzliche Frist von zwei Wochen bald abläuft, bitte ich Sie höflich um die Zuteilung eines kurzfristigen Termins zur Anmeldung.

Meine Unterlagen (Wohnungsgeberbestätigung und Pass) liegen vollständig vor.

Vielen Dank im Voraus für Ihre Unterstützung.

Mit freundlichen Grüßen,
[Ihr Name]
[Ihre Telefonnummer]`,
      arabicExplanation: 'نموذج رسمي تطلبه لمراسلة البلدية في حال عدم توفر مواعيد على الموقع لتفادي غرامات التأخير.'
    }
  },

  // 2. التأمين الصحي وزيارة الطبيب
  {
    id: 'guide_krankenkasse',
    icon: '🩺',
    titleAr: 'التأمين الصحي وزيارة الطبيب',
    titleDe: 'Gesundheitssystem & Arztbesuch',
    badge: 'تغطية طبية شاملة',
    summaryAr: 'التأمين الصحي في ألمانيا إلزامي لكل مقيم. فهمك لكيفية حجز المواعيد واختيار طبيب الأسرة (Hausarzt) يوفر عليك الكثير.',
    steps: [
      {
        id: 'kk_1',
        titleAr: 'اختيار شركة التأمين (GKV)',
        descAr: 'معظم المقيمين والموظفين يشتركون في التأمين القانوني العام (مثل TK, AOK, Barmer). التغطية شبه موحدة وتشمل العلاج والعمليات والأدوية بنسبة كبيرة.'
      },
      {
        id: 'kk_2',
        titleAr: 'استلام البطاقة الصحية الذكية (Gesundheitskarte)',
        descAr: 'تحتوي على صورتك وشريحة إلكترونية. تقدمها في كل زيارة لأي عيادة أو مستشفى.'
      },
      {
        id: 'kk_3',
        titleAr: 'اختيار طبيب الأسرة (Hausarzt)',
        descAr: 'طبيبك العام هو بوابتك لكل التخصصات. عند أي مرض تتوجه إليه أولاً وهو يمنحك التحويل (Überweisung) للمتخصصين والإجازة المرضية (Krankschreibung).'
      },
      {
        id: 'kk_4',
        titleAr: 'حجز المواعيد عبر التطبيقات (Doctolib / 116117)',
        descAr: 'استخدم تطبيق Doctolib للبحث عن أطباء يتحدثون الإنجليزية أو العربية، وحجز الموعد بنقرة واحدة.'
      }
    ],
    checklist: [
      { id: 'chk_kk_insure', textDe: 'Krankenkasse auswählen und anmelden', textAr: 'اختيار شركة التأمين الصحي والتسجيل بها' },
      { id: 'chk_kk_card', textDe: 'Elektronische Gesundheitskarte (eGK) erhalten', textAr: 'استلام بطاقة التأمين الصحي الإلكترونية' },
      { id: 'chk_kk_doctor', textDe: 'Hausarzt in Wohnortnähe finden', textAr: 'تحديد طبيب أسرة قريب من السكن' },
      { id: 'chk_kk_app', textDe: 'Doctolib-App für Termine installieren', textAr: 'تثبيت تطبيق Doctolib لحجز المواعيد' }
    ],
    glossary: [
      { term: 'der Hausarzt', phonetic: 'دير هاوس-آرتست', arabic: 'طبيب الأسرة / الطبيب العام', explanation: 'الطبيب المسؤول عن فحصك المبدئي وإحالتك للأخصائيين.' },
      { term: 'die Krankschreibung / AU', phonetic: 'دي كرانك-شرايبونغ', arabic: 'شهادة الإجازة المرضية الرسمية', explanation: 'تقرير طبي إلكتروني (eAU) يرسل لجهة عملك والتأمين لإثبات المرض.' },
      { term: 'die Überweisung', phonetic: 'دي أوبر-فايزونغ', arabic: 'إحالة طبية إلى طبيب متخصص', explanation: 'ورقة يمنحك إياها طبيب الأسرة لزيارة أطباء القلب، العيون، إلخ.' }
    ],
    template: {
      title: 'حجز موعد كشف عند عيادة الطبيب',
      germanText: `Guten Tag,

mein Name ist [Ihr Name]. Ich bin neu in der Gegend und suche einen Hausarzt.

Ich habe seit zwei Tagen starke Halsschmerzen und Fieber und benötige bitte zeitnah einen Termin zur Untersuchung sowie eine Arbeitsunfähigkeitsbescheinigung (Krankmeldung).

Ich bin gesetzlich versichert bei der [Name der Krankenkasse].

Wann könnte ich heute oder morgen vorbeikommen?

Mit freundlichen Grüßen,
[Ihr Name]
[Telefonnummer]`,
      arabicExplanation: 'رسالة لطلب موعد عاجل عند الشعور بالمرض والحصول على تقرير الإجازة المرضية للعمل.'
    }
  },

  // 3. فتح الحساب البنكي
  {
    id: 'guide_bank',
    icon: '💳',
    titleAr: 'فتح الحساب البنكي والمعاملات المالية',
    titleDe: 'Bankkonto eröffnen & Finanzen',
    badge: 'Girokonto & IBAN',
    summaryAr: 'الحساب الجاري (Girokonto) هو عصب الحياة في ألمانيا لاستلام الراتب ودفع الإيجار وفواتير الكهرباء والإنترنت.',
    steps: [
      {
        id: 'bnk_1',
        titleAr: 'اختيار البنك (Direct vs Filialbank)',
        descAr: 'يمكنك الاختيار بين البنوك الرقمية الحديثة (مثل N26, C24, Revolut) وتفتح الحساب خلال 10 دقائق بالفيديو، أو البنوك التقليدية ذات الفروع (مثل Sparkasse, Deutsche Bank).'
      },
      {
        id: 'bnk_2',
        titleAr: 'توثيق الهوية بالفيديو (Video-Ident)',
        descAr: 'مكالمة فيديو سريعة مع موظف البنك لعرض جواز السفر وعلامات الأمان للتأكد من هويتك.'
      },
      {
        id: 'bnk_3',
        titleAr: 'التحويلات الدورية والخصم المباشر (SEPA-Lastschrift & Dauerauftrag)',
        descAr: 'الإيجار يُدفع شهرياً بأمر دفع دائم (Dauerauftrag)، وفواتير الهاتف بالخصم التلقائي (Lastschrift).'
      }
    ],
    checklist: [
      { id: 'chk_bnk_ident', textDe: 'Video-Ident-Verfahren abschließen', textAr: 'إكمال خطوة التحقق من الهوية بالفيديو' },
      { id: 'chk_bnk_iban', textDe: 'Deutsche IBAN für Gehalt hinterlegen', textAr: 'تسليم رقم الآيبان للشركة لتحويل الراتب' },
      { id: 'chk_bnk_rent', textDe: 'Dauerauftrag für die Miete einrichten', textAr: 'إنشاء أمر دفع تلقائي ثابت للإيجار الشهري' }
    ],
    glossary: [
      { term: 'das Girokonto', phonetic: 'داس جيرو-كونتو', arabic: 'الحساب البنكي الجاري اليومي', explanation: 'الحساب الأساسي للراتب والمشتريات والتحويلات.' },
      { term: 'der Dauerauftrag', phonetic: 'دير داور-أوف-تراغ', arabic: 'أمر الدفع التلقائي الثابت', explanation: 'خصم مبلغ ثابت تلقائياً كل شهر (مثل الإيجار) في موعد محدد.' },
      { term: 'die Lastschrift (SEPA)', phonetic: 'دي لاست-شريفت', arabic: 'تفويض السحب المباشر', explanation: 'تفويض تعطه لشركات الاتصالات أو الجيم لسحب قيمة الفاتورة الشهرية تلقائياً.' }
    ],
    template: {
      title: 'إرسال بيانات الآيبان لجهة العمل لتحويل الراتب',
      germanText: `Sehr geehrte Personalabteilung,

anbei sende ich Ihnen meine aktuellen Bankdaten für die zukünftige Gehaltsüberweisung:

- Kontoinhaber: [Ihr Vor- und Nachname]
- Name der Bank: [Name der Bank]
- IBAN: [DE00 0000 0000 0000 0000 00]
- BIC: [XXXXXXXX]

Bitte bestätigen Sie mir kurz den Erhalt dieser Daten.

Mit freundlichen Grüßen,
[Ihr Name]`,
      arabicExplanation: 'رسالة إرسال الآيبان لقسم الموارد البشرية لتحويل مستحقاتك وراتبك.'
    }
  },

  // 4. السكن وإيجار الشقق (Wohnungssuche & WG)
  {
    id: 'guide_wohnung',
    icon: '🏠',
    titleAr: 'البحث عن سكن وشقق المشاركة',
    titleDe: 'Wohnungssuche & Kaution',
    badge: 'Schufa & WG',
    summaryAr: 'سوق السكن في ألمانيا شديد التنافسية. تجهيز ملف السكن الكامل (Bewerbungsmappe) هو مفتاح قبولك لدى الملاك.',
    steps: [
      {
        id: 'wng_1',
        titleAr: 'فهم الفارق بين الإيجار البارد والدافئ (Kaltmiete vs Warmmiete)',
        descAr: 'الـ Kaltmiete هو إيجار الشقة المجرد. الـ Warmmiete يشمل مصاريف الصيانة والتدفئة والماء (Nebenkosten). الكهرباء والإنترنت تدفعهما غالباً بعقد مستقل.'
      },
      {
        id: 'wng_2',
        titleAr: 'تجهيز تقرير الشوفا (SCHUFA-Auskunft)',
        descAr: 'شهادة الجدارة الائتمانية تؤكد للمؤجر أنه ليس عليك ديون متأخرة في ألمانيا. ضرورية جداً لأي طلب سكن.'
      },
      {
        id: 'wng_3',
        titleAr: 'دفع مبلغ التأمين (Kaution)',
        descAr: 'مبلغ يعادل عادة شهرين إلى 3 شهور من الإيجار البارد، يحفظ في حساب بنكي مجمد ويسترد عند إخلاء الشقة بسلام.'
      }
    ],
    checklist: [
      { id: 'chk_wng_schufa', textDe: 'Positive SCHUFA-Bonitätsauskunft besorgen', textAr: 'استخراج شهادة الشوفا الائتمانية' },
      { id: 'chk_wng_income', textDe: 'Die letzten 3 Gehaltsabrechnungen bereithalten', textAr: 'تجهيز آخر 3 قسائم رواتب أو عقد العمل' },
      { id: 'chk_wng_app', textDe: 'Suchprofil auf Immobilienscout24 / WG-Gesucht anlegen', textAr: 'إنشاء بروفايل في مواقع السكن مثل WG-Gesucht' }
    ],
    glossary: [
      { term: 'die Warmmiete', phonetic: 'دي فارم-ميتي', arabic: 'الإيجار الدافئ الشامل للخدمات', explanation: 'يشمل الإيجار الأساسي + التدفئة والماء والخدمات المشتركة.' },
      { term: 'die Kaution', phonetic: 'دي كاوتسيون', arabic: 'مبلغ التأمين المالي للشقة', explanation: 'مبلغ يودع كضمان للمالك ويسترد عند انتهاء العقد كاملاً.' },
      { term: 'die SCHUFA', phonetic: 'دي شوفا', arabic: 'هيئة فحص الجدارة والائتمان المالي', explanation: 'سجل مالي يثبت التزامك بالدفع وعدم وجود أي قروض متعثرة.' }
    ],
    template: {
      title: 'رسالة التقديم على شقة أو غرفة سكن مشترك (WG)',
      germanText: `Sehr geehrte Damen und Herren, / Hallo zusammen,

mit großem Interesse habe ich Ihre Anzeige für die Wohnung / das WG-Zimmer in [Stadtteil] gelesen.

Ich heiße [Ihr Name], bin [Alter] Jahre alt und arbeite als [Beruf] bei [Firma]. Ich bin eine ruhige, zuverlässige und ordentliche Person, rauche nicht und habe keine Haustiere.

Meine Bewerbungsunterlagen (SCHUFA, Einkommensnachweise der letzten 3 Monate und Selbstauskunft) liegen vollständig vor.

Ich würde mich sehr über die Gelegenheit zu einer Besichtigung freuen!

Beste Grüße,
[Ihr Name]
[Telefonnummer]`,
      arabicExplanation: 'رسالة تقديم مهذبة وجذابة تزيد من فرص رد المؤجر عليك لتحديد موعد معاينة الشقة.'
    }
  },

  // 5. فرز القمامة وقوانين الهدوء
  {
    id: 'guide_muell_ruhe',
    icon: '♻️',
    titleAr: 'فرز القمامة وأوقات الهدوء (Ruhezeit)',
    titleDe: 'Mülltrennung & Hausordnung',
    badge: 'قواعد السلوك المجتمعي',
    summaryAr: 'النظام الألماني يقدس الهدوء والبيئة. معرفتك بقواعد فرز القمامة وساعات الهدوء تحميك من الشكاوى والغرامات.',
    steps: [
      {
        id: 'ml_1',
        titleAr: 'نظام حاويات القمامة الملونة',
        descAr: 'الأزرق للورق والكرتون (Altpapier)، الأصفر للبلاستيك والمعادن والعبوات (Gelber Sack)، البني لبقايا الطعام العضوي (Biomüll)، والرمادي للنفايات المتبقية غير القابلة للتدوير (Restmüll).'
      },
      {
        id: 'ml_2',
        titleAr: 'نظام استرجاع العبوات (Pfandsystem)',
        descAr: 'زجاجات الماء والعصائر والكانز لا ترمى في القمامة! تحمل علامة السهمين وتسترد منها 0.25 يورو لكل علبة عبر الماكينة في أي سوبرماركت.'
      },
      {
        id: 'ml_3',
        titleAr: 'ساعات الهدوء القانونية (Ruhezeiten)',
        descAr: 'يمنع إصدار أي أصوات عالية (موسيقى، غسالة، دريل) من 10 مساءً إلى 6 صباحاً، وطوال أيام الآحاد والعطلات الرسمية بالكامل.'
      }
    ],
    checklist: [
      { id: 'chk_ml_bins', textDe: 'Mülltonnen nach Farben korrekt trennen', textAr: 'فرز القمامة بدقة حسب لون الحاويات' },
      { id: 'chk_ml_pfand', textDe: 'Pfandflaschen im Supermarkt abgeben', textAr: 'استرجاع علب الـ Pfand في السوبرماركت' },
      { id: 'chk_ml_quiet', textDe: 'Sonntagsruhe und Nachtruhe (22-6 Uhr) einhalten', textAr: 'احترام ساعات الهدوء ليلاً وأيام الأحد' }
    ],
    glossary: [
      { term: 'die Ruhezeit', phonetic: 'دي روهي-تسايت', arabic: 'أوقات الهدوء القانونية', explanation: 'فترات يحظر فيها قانوناً إزعاج الجيران في المباني السكنية.' },
      { term: 'das Pfand', phonetic: 'داس بفاند', arabic: 'عربون استرجاع القوارير', explanation: 'مبلغ يدفع عند الشراء ويسترد كاملاً عند إعادة العبوة الفارغة.' },
      { term: 'die Hausordnung', phonetic: 'دي هاوس-أوردنونغ', arabic: 'لائحة وقوانين البناية السكنية', explanation: 'قواعد ملزمة لجميع سكان المبنى بخصوص النظافة والهدوء.' }
    ],
    template: {
      title: 'إشعار الجيران مسبقاً بمناسبة أو حفل صغير',
      germanText: `Liebe Nachbarn,

am kommenden [Wochentag, z.B. Samstag] feiere ich meinen Geburtstag / Einzug mit einigen Freunden.

Wir bemühen uns selbstverständlich, die Lautstärke gering zu halten. Sollte es dennoch einmal etwas lauter werden, bitte ich vorab um Entschuldigung und Verständnis.

Falls es doch stören sollte, gebt mir bitte einfach kurz Bescheid unter [Telefonnummer].

Herzliche Grüße aus dem [Stockwerk],
[Ihr Name]`,
      arabicExplanation: 'ورقة تعلق في مدخل البناية قبل مناسبة شخصية تعكس احترامك للجيران وتجنبك أي شكاوى.'
    }
  },

  // 6. المواصلات وتذكرة الـ 49 يورو
  {
    id: 'guide_ticket',
    icon: '🚆',
    titleAr: 'المواصلات وتذكرة Deutschlandticket',
    titleDe: 'Öffentlicher Nahverkehr',
    badge: 'تنقل غير محدود في ألمانيا',
    summaryAr: 'دليلك لفهم شبكة قطارات ومترو ألمانيا واستخدام التذكرة الشاملة للتنقل في جميع أنحاء الدولة بتكلفة منخفضة.',
    steps: [
      {
        id: 'tc_1',
        titleAr: 'تذكرة الـ 49 يورو (Deutschlandticket)',
        descAr: 'اشتراك شهري رقمي يتيح لك ركوب جميع الحافلات، والترام، والمترو (U-Bahn)، وقطارات الضواحي (S-Bahn)، والقطارات الإقليمية (RE / RB) في جميع مدن ألمانيا!'
      },
      {
        id: 'tc_2',
        titleAr: 'الفرق بين القطارات الإقليمية وقطارات السرعة العالية',
        descAr: 'تذكرة الـ Deutschlandticket صالحة فقط لقطارات النقل الإقليمي (Nahverkehr). لا تشمل قطارات السرعة الفائقة مثل ICE و IC و EC التي تتطلب تذاكر منفصلة.'
      },
      {
        id: 'tc_3',
        titleAr: 'تطبيقات الملاحة وتتبع التأخيرات (DB Navigator)',
        descAr: 'تطبيق شركة القطارات الألمانية (Deutsche Bahn) الأساسي للبحث عن المسارات ومعرفة رصيف القطار والتأخيرات الحية.'
      }
    ],
    checklist: [
      { id: 'chk_tc_buy', textDe: 'Deutschlandticket per App abonnieren', textAr: 'الاشتراك في تذكرة ألمانيا الرقمية عبر التطبيق' },
      { id: 'chk_tc_db', textDe: 'DB Navigator App herunterladen', textAr: 'تنزيل تطبيق DB Navigator للمواعيد' },
      { id: 'chk_tc_id', textDe: 'Reisepass bei Fahrscheinkontrolle mitführen', textAr: 'حمل إثبات شخصية مع التذكرة عند التفتيش' }
    ],
    glossary: [
      { term: 'der Nahverkehr', phonetic: 'دير نا-فيركير', arabic: 'وسائل النقل العام الإقليمية والمحلية', explanation: 'تشمل قطارات RE, RB, S-Bahn, U-Bahn, Busse.' },
      { term: 'das Deutschlandticket', phonetic: 'داس دويتشلاند-تيكيت', arabic: 'تذكرة ألمانيا الشاملة', explanation: 'تذكرة اشتراك شهري مخفضة لجميع وسائل النقل المحلي.' },
      { term: 'die Fahrkartenkontrolle', phonetic: 'دي فاركارتن-كونتروله', arabic: 'تفتيش التذاكر في القطارات', explanation: 'التفتيش على التذاكر؛ الركوب بدون تذكرة (Schwarzfahren) غرامته 60 يورو.' }
    ],
    template: {
      title: 'الاستفسار في مكتب التذاكر عن المسار المناسب',
      germanText: `Guten Tag,

ich möchte gerne von [Startbahnhof] nach [Zielbahnhof] fahren.

Gilt mein Deutschlandticket auf dieser gesamten Strecke, oder muss ich für einen ICE-Zug ein Zusatzticket buchen?

Könnten Sie mir bitte die beste Verbindung ohne Aufpreis ausdrucken?

Vielen Dank für Ihre Hilfe!`,
      arabicExplanation: 'جملة مفيدة جداً لسؤال موظف المحطة للتأكد من أن مسارك مشمول في تذكرتك دون دفع رسوم إضافية.'
    }
  }
];
