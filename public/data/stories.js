// data/stories.js - قصص تفاعلية متدرجة للتدريب على الاستماع والفهم (Hörverstehen)

export const storiesData = [
  {
    id: 'story_a1_berlin',
    level: 'A1',
    titleDe: 'Mein erster Tag in Berlin',
    titleAr: 'يومي الأول في برلين',
    duration: '2 Min',
    topic: 'وصول وسياحة يومية',
    summaryAr: 'قصة قصيرة للمبتدئين تصف وصول طارق إلى محطة قطارات برلين الرئيسية وبحثه عن الفندق وطلبه فنجان قهوة.',
    paragraphs: [
      {
        id: 1,
        de: 'Heute ist Montag. Ich komme am Berliner Hauptbahnhof an.',
        ar: 'اليوم هو الاثنين. أنا أصل إلى محطة قطارات برلين الرئيسية.'
      },
      {
        id: 2,
        de: 'Der Bahnhof ist sehr groß und modern. Viele Menschen laufen schnell.',
        ar: 'المحطة كبيرة جداً وعصرية. الكثير من الناس يمشون بسرعة.'
      },
      {
        id: 3,
        de: 'Ich habe einen großen Koffer und einen kleinen Rucksack dabei.',
        ar: 'معي حقيبة سفر كبيرة وحقيبة ظهر صغيرة.'
      },
      {
        id: 4,
        de: 'Ich suche die U-Bahn-Linie 5 zu meinem Hotel in Berlin-Mitte.',
        ar: 'أنا أبحث عن خط المترو رقم 5 للوصول إلى فندقي في وسط برلين.'
      },
      {
        id: 5,
        de: 'Vor der Fahrt kaufe ich mir einen heißen Kaffee und ein Croissant im Café.',
        ar: 'قبل الرحلة أشتري لنفسي قهوة ساخنة وكرواسون في المقهى.'
      },
      {
        id: 6,
        de: 'Die Verkäuferin lächelt und sagt: "Guten Appetit und herzlich willkommen in Berlin!"',
        ar: 'البائعة تبتسم وتقول: "بالهناء والشفاء وأهلاً بك في برلين!"'
      },
      {
        id: 7,
        de: 'Ich freue mich sehr auf diese neue Reise.',
        ar: 'أنا سعيد جداً ومتطلع لهذه الرحلة الجديدة.'
      }
    ],
    quiz: [
      {
        questionDe: 'Wo kommt der Erzähler an?',
        questionAr: 'أين يصل الراوي؟',
        options: [
          'Am Flughafen Frankfurt',
          'Am Berliner Hauptbahnhof',
          'Im Park'
        ],
        correct: 1,
        explanationAr: 'وصل إلى محطة قطارات برلين الرئيسية (Berliner Hauptbahnhof).'
      },
      {
        questionDe: 'Welche U-Bahn-Linie sucht er?',
        questionAr: 'أي خط مترو يبحث عنه؟',
        options: [
          'U-Bahn-Linie 1',
          'U-Bahn-Linie 5',
          'S-Bahn-Linie 7'
        ],
        correct: 1,
        explanationAr: 'هو يبحث عن خط U-Bahn-Linie 5 للوصول إلى الفندق.'
      },
      {
        questionDe: 'Was kauft er im Café?',
        questionAr: 'ماذا يشتري في المقهى؟',
        options: [
          'Ein Buch und Wasser',
          'Kaffee und ein Croissant',
          'Ein Ticket'
        ],
        correct: 1,
        explanationAr: 'اشترى قهوة ساخنة وكرواسون (Kaffee und ein Croissant).'
      }
    ]
  },
  {
    id: 'story_a2_supermarket',
    level: 'A2',
    titleDe: 'Einkaufen und der Pfandautomat',
    titleAr: 'التسوق وماكينة استرجاع الزجاجات (الـ Pfand)',
    duration: '3 Min',
    topic: 'الحياة اليومية والاندماج',
    summaryAr: 'ليلى تذهب إلى السوبرماركت في ميونخ وتتعلم كيفية استخدام ماكينة الـ Pfand لاسترجاع العربون وشراء طعام العشاء.',
    paragraphs: [
      {
        id: 1,
        de: 'Am Samstagnachmittag geht Layla in einen großen Supermarkt in München.',
        ar: 'بعد ظهر يوم السبت تذهب ليلى إلى سوبرماركت كبير في ميونخ.'
      },
      {
        id: 2,
        de: 'Zuerst geht sie zum Pfandautomaten am Eingang, um leere Wasserflaschen abzugeben.',
        ar: 'أولاً تذهب إلى ماكينة استرجاع القوارير (الـ Pfand) عند المدخل لتسليم زجاجات الماء الفارغة.'
      },
      {
        id: 3,
        de: 'Der Automat druckt einen Bon im Wert von drei Euro und fünfzig Cent aus.',
        ar: 'تطبع الماكينة إيصالاً بقيمة 3 يورو و 50 سنتاً.'
      },
      {
        id: 4,
        de: 'Danach nimmt sie einen Einkaufswagen und sucht frisches Gemüse, Vollkornbrot und Käse.',
        ar: 'بعد ذلك تأخذ عربة تسوق وتبحث عن خضار طازجة، وخبز الحبوب الكاملة، والجبن.'
      },
      {
        id: 5,
        de: 'An der Kasse bezahlt sie mit ihrer Girocard und gibt der Kassiererin den Pfandbon ab.',
        ar: 'عند الخزينة (Kasse) تدفع ببطاقتها البنكية وتعطي أمينة الصندوق إيصال الـ Pfand لخصم قيمته.'
      },
      {
        id: 6,
        de: 'Sie packt alles in ihren wiederverwendbaren Stoffbeutel, um die Umwelt zu schützen.',
        ar: 'تضع كل شيء في حقيبتها القماشية القابلة لإعادة الاستخدام لحماية البيئة.'
      }
    ],
    quiz: [
      {
        questionDe: 'Warum geht Layla zuerst zum Automaten?',
        questionAr: 'لماذا تذهب ليلى أولاً إلى الماكينة؟',
        options: [
          'Um Geld abzuheben',
          'Um leere Pfandflaschen abzugeben',
          'Um Fahrkarten zu kaufen'
        ],
        correct: 1,
        explanationAr: 'لتسليم زجاجات الـ Pfand الفارغة والحصول على إيصال الخصم.'
      },
      {
        questionDe: 'Wie bezahlt Layla an der Kasse?',
        questionAr: 'كيف تدفع ليلى عند الخزينة؟',
        options: [
          'Nur mit Bargeld',
          'Mit ihrer Girocard',
          'Über PayPal'
        ],
        correct: 1,
        explanationAr: 'دفعت ببطاقتها البنكية (Girocard).'
      },
      {
        questionDe: 'Worin transportiert sie ihre Einkäufe?',
        questionAr: 'في ماذا تحمل مشترياتها؟',
        options: [
          'In einer Plastiktüte',
          'In einem Stoffbeutel',
          'In einem Karton'
        ],
        correct: 1,
        explanationAr: 'في كيس قماشي قابل لإعادة الاستخدام (Stoffbeutel) حفاظاً على البيئة.'
      }
    ]
  },
  {
    id: 'story_b1_wg_casting',
    level: 'B1',
    titleDe: 'Das WG-Casting in Köln',
    titleAr: 'مقابلة السكن المشترك (WG-Casting) في كولونيا',
    duration: '4 Min',
    topic: 'البحث عن سكن وتواصل اجتماعي',
    summaryAr: 'عمر يبحث عن غرفة في شقة مشاركة (Wohngemeinschaft) ويشارك في مقابلة التعارف مع زملائه المحتملين.',
    paragraphs: [
      {
        id: 1,
        de: 'Da die Mieten in den deutschen Großstädten hoch sind, suchen viele Studierende und Berufsanfänger ein Zimmer in einer Wohngemeinschaft.',
        ar: 'نظراً لأن الإيجارات في المدن الألمانية الكبرى مرتفعة، يبحث الكثير من الطلاب والمهنيين الجدد عن غرفة في سكن مشترك (WG).'
      },
      {
        id: 2,
        de: 'Omar hat heute Abend ein Vorstellungsgespräch in einer Dreier-WG im lebendigen Kölner Stadtteil Ehrenfeld.',
        ar: 'لدى عمر هذا المساء مقابلة تعارف في شقة سكن مشترك لثلاثة أفراد في حي إهرنفيلد الحيوي بكولونيا.'
      },
      {
        id: 3,
        de: 'Als er pünktlich an der Tür klingelt, öffnen ihm Lukas und Sophie mit einem herzlichen Lächeln.',
        ar: 'عندما رن الجرس في الموعد تماماً وبدقة، فتح له لوكاس وصوفي بابتسامة دافئة.'
      },
      {
        id: 4,
        de: 'Sie setzen sich in die gemütliche Küche, trinken Kräutertee und sprechen über Hobbys, Ordnung und den Putzplan.',
        ar: 'جلسوا في المطبخ الدافئ، وشربوا شاي الأعشاب، وتحدثوا عن الهوايات، والترتيب، وجدول تنظيف الشقة (Putzplan).'
      },
      {
        id: 5,
        de: 'Omar erklärt, dass er Softwareentwickler ist, gerne kocht und am Wochenende gerne wandert.',
        ar: 'أوضح عمر أنه مطور برمجيات، ويحب الطهي، ويفضل المشي لمسافات طويلة في عطلة نهاية الأسبوع.'
      },
      {
        id: 6,
        de: 'Am nächsten Tag erhält Omar die Nachricht: "Die Chemie stimmt, du kannst ab nächsten Monat einziehen!"',
        ar: 'في اليوم التالي تلقى عمر رسالة: "التوافق بيننا رائع، يمكنك الانتقال للشقة ابتداءً من الشهر المقبل!"'
      }
    ],
    quiz: [
      {
        questionDe: 'Was ist eine WG (Wohngemeinschaft)?',
        questionAr: 'ما هو السكن المشترك (WG)؟',
        options: [
          'Ein teures Luxushotel',
          'Mehrere Menschen teilen sich eine Wohnung',
          'Ein Einzelzimmer im Wohnheim'
        ],
        correct: 1,
        explanationAr: 'سكن يتشارك فيه عدة أشخاص شقة واحدة مع غرف مستقلة.'
      },
      {
        questionDe: 'Worüber sprechen sie in der Küche?',
        questionAr: 'عن ماذا تحدثوا في المطبخ؟',
        options: [
          'Über Politik und Geld',
          'Über Hobbys, Ordnung und den Putzplan',
          'Über Autos'
        ],
        correct: 1,
        explanationAr: 'تحدثوا عن الهوايات والنظام وجدول تنظيف الشقة (Putzplan).'
      },
      {
        questionDe: 'Wann darf Omar einziehen?',
        questionAr: 'متى يستطيع عمر الانتقال للشقة؟',
        options: [
          'Ab nächstem Jahr',
          'Ab nächstem Monat',
          'Nie'
        ],
        correct: 1,
        explanationAr: 'ابتداءً من الشهر المقبل (ab nächstem Monat).'
      }
    ]
  },
  {
    id: 'story_b1_arbeitstag',
    level: 'B1',
    titleDe: 'Ein erfolgreicher Arbeitstag im IT-Team',
    titleAr: 'يوم عمل ناجح في فريق تكنولوجيا المعلومات',
    duration: '4 Min',
    topic: 'سوق العمل والتواصل المهني',
    summaryAr: 'كريم يعمل كمهندس برمجيات في شركة بفرانكفورت، يشارك في اجتماع الصباح (Daily Standup) ويتعاون مع فريقه لحل تحدٍ تقني.',
    paragraphs: [
      {
        id: 1,
        de: 'Um Punkt neun Uhr beginnt der Arbeitstag von Karim in einem Frankfurter Technologieunternehmen.',
        ar: 'في تمام الساعة التاسعة تماماً يبدأ يوم عمل كريم في شركة تكنولوجيا بفرانكفورت.'
      },
      {
        id: 2,
        de: 'Im morgendlichen Daily-Standup berichtet jedes Teammitglied kurz über seine aktuellen Aufgaben und eventuelle Hindernisse.',
        ar: 'في الاجتماع الصباحي القصير، يتحدث كل عضو في الفريق بإيجاز عن مهامه الحالية وأي عقبات تقنية يواجهها.'
      },
      {
        id: 3,
        de: 'Karim präsentiert eine neue Funktion, die er für die mobile App programmiert hat.',
        ar: 'قدّم كريم ميزة جديدة برمجها خصيصاً لتطبيق الهاتف.'
      },
      {
        id: 4,
        de: 'Die Projektleiterin lobt seine gründliche Arbeit und betont die Bedeutung von sauberem Code und guter Dokumentation.',
        ar: 'أثنت مديرة المشروع على عمله المتقن، وأكدت على أهمية الكود النظيف والتوثيق الممتاز.'
      },
      {
        id: 5,
        de: 'In der Mittagspause essen sie gemeinsam in der Kantine und sprechen über das bevorstehende Firmenfest.',
        ar: 'في استراحة الغداء تناولوا الطعام معاً في مطعم الشركة وتحدثوا عن حفل الشركة القادم.'
      },
      {
        id: 6,
        de: 'Karim fühlt sich sehr wohl und schätzt die offene Kommunikationskultur in seinem deutschen Arbeitsumfeld.',
        ar: 'يشعر كريم براحة بالغة ويقدر ثقافة التواصل المنفتحة في بيئة العمل الألمانية.'
      }
    ],
    quiz: [
      {
        questionDe: 'Was ist das Ziel des morgendlichen Daily-Standups?',
        questionAr: 'ما الهدف من الاجتماع الصباحي (Daily Standup)؟',
        options: [
          'Lange Vorträge halten',
          'Kurz über Aufgaben und Hindernisse berichten',
          'Kaffee trinken und entspannen'
        ],
        correct: 1,
        explanationAr: 'الإبلاغ المختصر عن المهام والعقبات اليومية للفريق.'
      },
      {
        questionDe: 'Was lobt die Projektleiterin an Karims Arbeit?',
        questionAr: 'ما الذي أثنت عليه مديرة المشروع في عمل كريم؟',
        options: [
          'Seine schnelle Sprache',
          'Seine gründliche Arbeit, sauberen Code und Dokumentation',
          'Sein Gehalt'
        ],
        correct: 1,
        explanationAr: 'أثنت على العمل الدقيق والكود النظيف والتوثيق الممتاز.'
      },
      {
        questionDe: 'Was schätzt Karim an seinem Arbeitsumfeld?',
        questionAr: 'ما الذي يقدره كريم في بيئة عمله؟',
        options: [
          'Die offene Kommunikationskultur',
          'Dass niemand spricht',
          'Die weite Entfernung'
        ],
        correct: 0,
        explanationAr: 'يقدر ثقافة التواصل المنفتحة (offene Kommunikationskultur).'
      }
    ]
  }
];
