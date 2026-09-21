// بنك نماذج امتحانات معهد غوته وتيلك الرسمية (Goethe & Telc Mock Exams Data)
// يغطي مستويات A1 و A2 و B1 مع أقسام القراءة، تراكيب اللغة، والمفردات

export const examData = {
  A1: {
    title: "Goethe-Zertifikat A1: Start Deutsch 1",
    level: "A1",
    targetAudience: "للمبتدئين - قياس الكفاءة الأساسية في التواصل والتسوق والمواقف اليومية",
    durationMinutes: 15,
    passScorePercent: 60,
    sections: [
      {
        id: "a1_q1",
        section: "Leseverstehen (فهم المقروء)",
        text: "Guten Tag! Die Praxis von Dr. Müller ist vom 1. bis zum 15. August wegen Urlaub geschlossen. In dringenden Notfällen wenden Sie sich bitte an die Notfallklinik am Hauptbahnhof (Telefon: 030-123456).",
        question: "Wann ist die Praxis von Dr. Müller wieder geöffnet?",
        questionAr: "متى تكون عيادة دكتور مولر مفتوحة مجدداً؟",
        options: [
          "Am 1. August",
          "Ab dem 16. August",
          "Nur am Hauptbahnhof",
          "Die Praxis ist für immer geschlossen"
        ],
        correct: 1,
        explanation: "النص يذكر أن العيادة مغلقة من 1 إلى 15 أغسطس بسبب الإجازة، وبالتالي تفتح في 16 أغسطس."
      },
      {
        id: "a1_q2",
        section: "Wortschatz & Grammatik (المفردات والقواعد)",
        text: "Im Restaurant:",
        question: "Herr Becker sagt zum Kellner: 'Ich möchte gerne die Rechnung bitte. Kann ich mit Karte ________?'",
        questionAr: "اختر الفعل الصحيح لإتمام جملة الدفع في المطعم:",
        options: [
          "bezahlen",
          "kaufen",
          "kosten",
          "wohnen"
        ],
        correct: 0,
        explanation: "الفعل 'bezahlen' يعني يدفع الحساب، وتركيب 'mit Karte bezahlen' يعني يدفع بالبطاقة البنكية."
      },
      {
        id: "a1_q3",
        section: "Artikel & Kasus (أدوات التعريف)",
        text: "Am Frühstückstisch:",
        question: "Möchtest du noch ________ Apfel essen?",
        questionAr: "اختر الأداة الصحيحة في حالة المفعول به (Akkusativ):",
        options: [
          "ein",
          "einen",
          "einem",
          "eines"
        ],
        correct: 1,
        explanation: "كلمة Apfel مذكر (der Apfel)، وفي حالة المفعول به النكرة مع الفعل essen تتحول إلى 'einen Apfel'."
      },
      {
        id: "a1_q4",
        section: "Leseverstehen (إعلانات ومواعيد)",
        text: "Aushang am Supermarkt: 'Super Angebot! Heute Frische Milch für nur 0,99 Euro und zwei Packungen deutsches Brot zum Preis von einer!'",
        question: "Was erfährt man aus dem Text?",
        questionAr: "ماذا نفهم من هذا الإعلان؟",
        options: [
          "Der Supermarkt hat heute geschlossen.",
          "Es gibt ein Sonderangebot für Milch und Brot.",
          "Brot ist heute teurer als sonst.",
          "Milch gibt es nur noch morgen."
        ],
        correct: 1,
        explanation: "الإعلان يوضح 'Super Angebot' (عرض رائع) على الحليب والخبز بسعر مخفض."
      },
      {
        id: "a1_q5",
        section: "Satzbau (ترتيب الجملة)",
        text: "W-Frage:",
        question: "Welcher Satz ist grammatikalisch absolut korrekt?",
        questionAr: "أي جملة من الجمل التالية صحيحة نحوياً بنسبة 100%؟",
        options: [
          "Wo wohnen Sie in Berlin?",
          "Wo Sie wohnen in Berlin?",
          "In Berlin wo wohnen Sie?",
          "Sie wohnen wo in Berlin?"
        ],
        correct: 0,
        explanation: "في السؤال بأداة الاستفهام (W-Frage) يأتي الفعل دائماً في المركز الثاني: Wo (1) + wohnen (2) + Sie (3)."
      },
      {
        id: "a1_q6",
        section: "Modalverben (الأفعال المساعدة)",
        text: "Regeln im Zug:",
        question: "Hier ________ man nicht rauchen. Es ist streng verboten!",
        questionAr: "اختر الفعل المساعد المناسب للنهي والمنع:",
        options: [
          "darf",
          "kann",
          "will",
          "soll"
        ],
        correct: 0,
        explanation: "الفعل 'dürfen' يُستخدم للتصريح والسماح، وعند النفي 'darf nicht' يعني ممنوع منعاً باتاً."
      },
      {
        id: "a1_q7",
        section: "Alltagsdialog (مواقف وحوارات يومية)",
        text: "Auf der Straße:",
        question: "Entschuldigung, wie komme ich zum Bahnhof? - '________'",
        questionAr: "ما هو الرد الأنسب والمطابق لقواعد A1؟",
        options: [
          "Gehen Sie immer geradeaus und dann links.",
          "Ich habe gestern den Bahnhof gekauft.",
          "Der Bahnhof kostet 50 Euro.",
          "Guten Appetit!"
        ],
        correct: 0,
        explanation: "'Gehen Sie immer geradeaus und dann links' تعني 'سر للأمام مباشرة ثم انعطف يساراً'."
      },
      {
        id: "a1_q8",
        section: "Uhrzeit & Termine (الوقت والمواعيد)",
        text: "Terminabsprache:",
        question: "Der Zug fährt um Viertel nach acht ab. Wie spät ist es?",
        questionAr: "ما معنى التوقيت 'Viertel nach acht' بالأرقام؟",
        options: [
          "08:15",
          "07:45",
          "08:45",
          "08:30"
        ],
        correct: 0,
        explanation: "'Viertel nach acht' تعني ربع بعد الثامنة، أي الثامنة والربع (08:15)."
      },
      {
        id: "a1_q9",
        section: "Präpositionen (حروف الجر المكانية)",
        text: "Wo ist das Buch?",
        question: "Das Buch liegt ________ dem Tisch.",
        questionAr: "اختر حرف الجر المناسب لـ 'فوق الطاولة':",
        options: [
          "auf",
          "aus",
          "zu",
          "nach"
        ],
        correct: 0,
        explanation: "حرف الجر 'auf' يعني على/فوق سطح أفقي كطاولة أو مكتب."
      },
      {
        id: "a1_q10",
        section: "Verben mit trennbaren Vorsilben (الأفعال المنفصلة)",
        text: "Tagesablauf:",
        question: "Der Wecker klingelt und ich ________ um 6:30 Uhr auf.",
        questionAr: "اختر التصريف الصحيح للفعل المنفصل 'aufstehen':",
        options: [
          "stehe",
          "aufstehe",
          "gestanden",
          "stehst"
        ],
        correct: 0,
        explanation: "الفعل المنفصل 'aufstehen' يتصرف أصله (stehe) في المركز الثاني وتذهب البادئة (auf) إلى نهاية الجملة."
      }
    ]
  },

  A2: {
    title: "Goethe-Zertifikat A2: Fit in Deutsch",
    level: "A2",
    targetAudience: "للمستوى فوق المبتدئ - القدرة على فهم النصوص اليومية، المعاملات، والتعبير عن الماضي والمستقبل",
    durationMinutes: 20,
    passScorePercent: 60,
    sections: [
      {
        id: "a2_q1",
        section: "Leseverstehen (فهم المقروء والإيميلات)",
        text: "Liebe Kolleginnen und Kollegen,\nda unser Konferenzraum im 2. Stock renoviert wird, findet unser morgiges Teammeeting ausnahmsweise im Raum 104 im Erdgeschoss statt. Beginn ist unverändert um 9:00 Uhr.",
        question: "Wo findet das Meeting morgen statt?",
        questionAr: "أين سيعقد الاجتماع غداً؟",
        options: [
          "Im 2. Stock wie gewohnt",
          "Im Raum 104 im Erdgeschoss",
          "Das Meeting fällt leider aus",
          "Online von zu Hause"
        ],
        correct: 1,
        explanation: "الإيميل يذكر أن غرفة الطابق الثاني تحت التجديد والاجتماع سينتقل إلى Raum 104 im Erdgeschoss."
      },
      {
        id: "a2_q2",
        section: "Perfekt & Vergangenheit (الماضي التام)",
        text: "Wochenendbericht:",
        question: "Letzten Samstag ________ wir mit dem Zug nach Hamburg gefahren.",
        questionAr: "اختر الفعل المساعد المناسب للماضي التام مع فعل الحركة 'fahren':",
        options: [
          "sind",
          "haben",
          "waren",
          "werden"
        ],
        correct: 0,
        explanation: "أفعال الحركة والانتقال المكاني (مثل fahren, gehen, fliegen) تأخذ دائماً الفعل المساعد 'sein' (wir sind gefahren)."
      },
      {
        id: "a2_q3",
        section: "Wechselpräpositionen (حروف الجر المشتركة)",
        text: "Wohin oder Wo?",
        question: "Ich hänge das neue Bild an ________ Wand (Akkusativ - حركة).",
        questionAr: "اختر الأداة الصحيحة للحركة نحو الجدار (die Wand):",
        options: [
          "die",
          "der",
          "dem",
          "den"
        ],
        correct: 0,
        explanation: "الفعل 'hängen' هنا يعبر عن حركة وتوجيه (Wohin?)، وكلمة Wand مؤنثة، لذلك تبقى في حالة Akkusativ كـ 'die Wand'."
      },
      {
        id: "a2_q4",
        section: "Nebensätze mit 'weil' (جمل التعليل والسبب)",
        text: "Begründung:",
        question: "Welcher Satz mit der Konjunktion 'weil' ist grammatikalisch richtig?",
        questionAr: "أي جملة مع رابط التعليل 'weil' صحيحة قواعدياً؟",
        options: [
          "Er lernt Deutsch, weil er in Berlin arbeiten möchte.",
          "Er lernt Deutsch, weil er möchte in Berlin arbeiten.",
          "Er lernt Deutsch, weil möchte er in Berlin arbeiten.",
          "Er lernt Deutsch, weil in Berlin er arbeiten möchte."
        ],
        correct: 0,
        explanation: "الرابط 'weil' يرمي الفعل المصرف (möchte) إلى نهاية الجملة الجانبية تماماً (Nebensatz)."
      },
      {
        id: "a2_q5",
        section: "Dativ & Personalpronomen (الضمائر في حالة المجرور)",
        text: "Hilfe anbieten:",
        question: "Kannst du ________ bitte beim Kofferpacken helfen? Ich habe nicht mehr viel Zeit.",
        questionAr: "اختر الضمير الصحيح مع الفعل 'helfen' الذي يطلب Dativ:",
        options: [
          "mir",
          "mich",
          "ich",
          "mein"
        ],
        correct: 0,
        explanation: "الفعل 'helfen' يتطلب دائماً حالة المجرور Dativ، وضمير المتكلم في الداتيف هو 'mir'."
      },
      {
        id: "a2_q6",
        section: "Komparativ & Superlativ (المقارنة والتفضيل)",
        text: "Vergleich:",
        question: "Der Zug ist schnell, das Flugzeug ist schneller, aber die Rakete ist am ________.",
        questionAr: "اختر صيغة التفضيل القصوى (Superlativ):",
        options: [
          "schnellsten",
          "schneller",
          "schnelle",
          "schnellste"
        ],
        correct: 0,
        explanation: "صيغة التفضيل القصوى مع 'am' تأخذ اللاحقة -sten: 'am schnellsten'."
      },
      {
        id: "a2_q7",
        section: "Gesundheit & Arzt (الصحة وزيارة الطبيب)",
        text: "In der Apotheke:",
        question: "Die Ärztin hat mir ein Rezept für Schmerzmittel ________.",
        questionAr: "ما هو الفعل المناسب لـ 'كتابة/وصف الروشتة الطبية'؟",
        options: [
          "ausgestellt",
          "abgemacht",
          "mitgebracht",
          "eingekauft"
        ],
        correct: 0,
        explanation: "التركيب الرسمي 'ein Rezept ausstellen' يعني تحرير أو كتابة وصفة طبية (روشتة)."
      },
      {
        id: "a2_q8",
        section: "Konnektoren 'dass' (روابط المفعول به)",
        text: "Gedanken ausdrücken:",
        question: "Ich hoffe sehr, dass das Wetter am Wochenende sonnig ________.",
        questionAr: "اختر مكان وتصريف الفعل الصحيح بعد 'dass':",
        options: [
          "wird",
          "ist werden",
          "werdet",
          "worden"
        ],
        correct: 0,
        explanation: "الرابط 'dass' يرسل الفعل المصرف إلى نهاية الجملة: '... sonnig wird'."
      },
      {
        id: "a2_q9",
        section: "Präpositionen mit Dativ (حروف الجر مع الداتيف)",
        text: "Wegbeschreibung:",
        question: "Nach der Arbeit gehe ich zu ________ Arzt.",
        questionAr: "ما هو دمج حرف الجر 'zu' مع أداة الطبيب في الداتيف؟",
        options: [
          "zum",
          "zur",
          "ins",
          "ans"
        ],
        correct: 0,
        explanation: "حرف الجر 'zu' يأخذ داتيف (dem Arzt)، ويدمجان معاً ليصبحا 'zum Arzt'."
      },
      {
        id: "a2_q10",
        section: "Wohnungsanzeigen (إعلانات السكن والبلدية)",
        text: "Wohnungssuche:",
        question: "Die Miete beträgt 750 Euro kalt, zuzüglich 150 Euro ________.",
        questionAr: "ما هي الكلمة الألمانية المعبرة عن مصاريف الخدمات والمرافق الإضافية؟",
        options: [
          "Nebenkosten",
          "Lebensmittel",
          "Girokonto",
          "Krankenkasse"
        ],
        correct: 0,
        explanation: "'Nebenkosten' هي مصاريف الخدمات الإضافية للمنزل (التدفئة، الماء، القمامة)."
      }
    ]
  },

  B1: {
    title: "Goethe-Zertifikat B1: Zertifikat Deutsch",
    level: "B1",
    targetAudience: "للمستوى المتوسط المتقدم - الاستعداد للعمل والدراسة والاندماج الرسمي والحصول على الجنسية الألمانية",
    durationMinutes: 25,
    passScorePercent: 60,
    sections: [
      {
        id: "b1_q1",
        section: "Leseverstehen (مقال وتحليل وجهات النظر)",
        text: "Die Digitalisierung verändert unsere Arbeitswelt grundlegend. Zwar befürchten viele Arbeitnehmer den Verlust traditioneller Arbeitsplätze, doch Experten betonen, dass durch den Einsatz innovativer Technologien wie KI gleichzeitig zahlreiche neue Berufsfelder entstehen, die neue Qualifikationen erfordern.",
        question: "Welche Kernbotschaft vermittelt der Text bezüglich der Digitalisierung?",
        questionAr: "ما هي الرسالة الجوهرية التي يقدمها النص بخصوص الرقمنة؟",
        options: [
          "Die Digitalisierung zerstört alle Arbeitsplätze ohne Ausgleich.",
          "Es entstehen trotz des Wandels neue, qualifizierte Berufsfelder.",
          "Niemand muss sich mehr beruflich weiterbilden.",
          "Traditionelle Berufe bleiben völlig unberührt."
        ],
        correct: 1,
        explanation: "النص يوضح أنه رغم الخوف من فقدان الوظائف التقليدية، إلا أن هناك مجالات مهنية جديدة تتطلب مؤهلات جديدة."
      },
      {
        id: "b1_q2",
        section: "Passiv (المبني للمجهول في الحاضر)",
        text: "Im Büro:",
        question: "Alle eingehenden Kundenrechnungen ________ heute noch von der Buchhaltung geprüft.",
        questionAr: "اختر الصياغة الصحيحة للمبني للمجهول (Passiv Präsens):",
        options: [
          "werden",
          "wurden",
          "worden",
          "haben"
        ],
        correct: 0,
        explanation: "صيغة المبني للمجهول الحاضر تتكون من تصريف الفعل werden + اسم المفعول Partizip II (werden ... geprüft)."
      },
      {
        id: "b1_q3",
        section: "Konnektoren: obwohl vs trotzdem (الروابط التناقضية)",
        text: "Satzverbindung:",
        question: "________ er sich intensiv auf die Prüfung vorbereitet hatte, war er vor Beginn sehr nervös.",
        questionAr: "اختر الرابط المناسب لبداية الجملة الجانبية التناقضية:",
        options: [
          "Obwohl",
          "Trotzdem",
          "Weil",
          "Deshalb"
        ],
        correct: 0,
        explanation: "'Obwohl' (رغم أن) يدخل على جملة جانبية ويرسل الفعل لنهايتها، بينما 'trotzdem' يدخل على جملة رئيسية."
      },
      {
        id: "b1_q4",
        section: "Adjektivdeklination (تصريف نهايات الصفات)",
        text: "Bewerbungsschreiben:",
        question: "Mit freundlich________ Grüßen verbleibe ich hochachtungsvoll.",
        questionAr: "اختر نهاية الصفة الصحيحة في الخاتمة الرسمية للإيميل (Dativ Plural بدون أداة):",
        options: [
          "en",
          "em",
          "er",
          "es"
        ],
        correct: 0,
        explanation: "بعد حرف الجر 'mit' وحالة الجمع في صيغة الداتيف الخالية من الأدوات (Nullartikel)، تأخذ الصفة النهاية '-en': 'Mit freundlichen Grüßen'."
      },
      {
        id: "b1_q5",
        section: "Konjunktiv II (صيغة التمني والطلب المهذب)",
        text: "Höfliche Bitte:",
        question: "________ Sie so freundlich und würden mir die Dokumente noch heute zusenden?",
        questionAr: "اختر الفعل المناسب في صيغة Konjunktiv II للطلب الرسمي الفائق الأدب:",
        options: [
          "Wären",
          "Hätten",
          "Würden",
          "Seien"
        ],
        correct: 0,
        explanation: "الصيغة 'Wären Sie so freundlich' (هل تتكرم / هل تكون لطيفاً) هي التعبير الرسمي الأمثل."
      },
      {
        id: "b1_q6",
        section: "Relativsätze (جمل الوصل والصلة)",
        text: "Relativpronomen im Dativ:",
        question: "Das ist der neue Kollege, mit ________ ich das Software-Projekt leite.",
        questionAr: "اختر ضمير الوصل الصحيح للمذكر مع حرف الجر 'mit':",
        options: [
          "dem",
          "den",
          "der",
          "dessen"
        ],
        correct: 0,
        explanation: "كلمة Kollege مذكر، ومع حرف الجر mit (Dativ) يكون ضمير الوصل هو 'dem'."
      },
      {
        id: "b1_q7",
        section: "Verben mit Präpositionen (الأفعال وحروف الجر)",
        text: "Diskussion:",
        question: "Ich interessiere mich sehr ________ die neuesten Entwicklungen im Bereich Erneuerbare Energien.",
        questionAr: "ما هو حرف الجر والحالة الملازمة للفعل 'sich interessieren'؟",
        options: [
          "für (Akkusativ)",
          "an (Dativ)",
          "über (Akkusativ)",
          "mit (Dativ)"
        ],
        correct: 0,
        explanation: "الفعل 'sich interessieren' يأخذ دائماً حرف الجر 'für' متبوعاً بحالة النصب Akkusativ."
      },
      {
        id: "b1_q8",
        section: "Infinitiv mit 'zu' (المصدر مع zu)",
        text: "Planung:",
        question: "Ich habe vor, im nächsten Semester mein Masterstudium in Deutschland ________.",
        questionAr: "اختر الصياغة المصدرية الصحيحة مع zu للفعل 'beginnen':",
        options: [
          "zu beginnen",
          "beginnen zu",
          "begonnen haben",
          "zu begonnen"
        ],
        correct: 0,
        explanation: "التركيب 'vorhaben + Infinitiv mit zu' يتطلب وضع 'zu' مباشرة قبل المصدر في نهاية الجملة: 'zu beginnen'."
      },
      {
        id: "b1_q9",
        section: "Genitiv (حالة الإضافة الملكية)",
        text: "Offizielles Schreiben:",
        question: "Aufgrund ________ schlechten Wetters wurde der Flug nach Frankfurt gestrichen.",
        questionAr: "اختر الأداة الصحيحة بعد حرف الجر 'aufgrund' الذي يتطلب Genitiv:",
        options: [
          "des",
          "dem",
          "den",
          "das"
        ],
        correct: 0,
        explanation: "حرف الجر 'aufgrund' (بسبب) يتطلب حالة الإضافة Genitiv، وأداة الاسم المحايد (das Wetter) في الجينيتيف هي 'des' مع إضافة s للاسم."
      },
      {
        id: "b1_q10",
        section: "Beruf & Bewerbung (سوق العمل والمقابلات)",
        text: "Arbeitsrecht:",
        question: "Nach erfolgreicher Beendigung des Arbeitsverhältnisses hat jeder Arbeitnehmer Anspruch auf ein wohlwollendes qualifiziertes ________.",
        questionAr: "ما هي الوثيقة الرسمية التي يحق لكل موظف الحصول عليها لتوثيق أدائه وسلوكه؟",
        options: [
          "Arbeitszeugnis",
          "Kündigungsschreiben",
          "Girokonto",
          "Fahrkartenabo"
        ],
        correct: 0,
        explanation: "'Arbeitszeugnis' هي شهادة الخبرة والتقييم الوظيفي المؤهلة التي يمنحها صاحب العمل للموظف في ألمانيا."
      }
    ]
  }
};
