// بنك مفردات وتعبيرات سوق العمل الألماني والمهن عالية الدخل
// German for Careers & High-Demand Job Fields

export const careerTracks = {
  it: {
    id: "it",
    title: "تكنولوجيا المعلومات والبرمجة (IT & Software)",
    icon: "💻",
    description: "أهم المصطلحات التقنية المستخدمة يومياً في شركات البرمجيات واجتماعات الـ Agile وفِرَق التطوير في ألمانيا.",
    salaryInfo: "متوسط الرواتب في ألمانيا: 50,000€ - 85,000€ سنوياً | متاح عقود عمل مباشرة وسفر بمستوى B1/B2.",
    words: [
      {
        id: "it_01",
        german: "die Entwicklung",
        word: "Entwicklung",
        article: "die",
        plural: "die Entwicklungen",
        arabic: "التطوير البرمجي / التنمية",
        phonetic: "دي إنتفيكلونك [ɛntˈvɪklʊŋ]",
        sentenceDe: "Ich bin für die Frontend-Entwicklung dieser Webanwendung zuständig.",
        sentenceAr: "أنا مسؤول عن تطوير الواجهة الأمامية لهذا التطبيق الويب.",
        workplaceTip: "عبارة 'zuständig für' تعني 'مسؤول عن' وتستخدم بكثرة في بيئة العمل."
      },
      {
        id: "it_02",
        german: "der Fehler",
        word: "Fehler",
        article: "der",
        plural: "die Fehler",
        arabic: "الخطأ البرمجي / الـ Bug",
        phonetic: "دير فيلَر [ˈfeːlɐ]",
        sentenceDe: "Wir haben den kritischen Fehler im Code behoben und getestet.",
        sentenceAr: "لقد أصلحنا الخطأ الحرج في الكود وقمنا باختباره.",
        workplaceTip: "الفعل 'beheben' يعني إصلاح أو حل مشكلة برمجية."
      },
      {
        id: "it_03",
        german: "die Datenbank",
        word: "Datenbank",
        article: "die",
        plural: "die Datenbanken",
        arabic: "قاعدة البيانات (Database)",
        phonetic: "دي داتِن بانك [ˈdaːtn̩ˌbaŋk]",
        sentenceDe: "Die Daten werden sicher in der PostgreSQL-Datenbank gespeichert.",
        sentenceAr: "يتم تخزين البيانات بشكل آمن في قاعدة بيانات PostgreSQL.",
        workplaceTip: "الفعل 'speichern' يعني حفظ أو تخزين البيانات."
      },
      {
        id: "it_04",
        german: "die Bereitstellung",
        word: "Bereitstellung",
        article: "die",
        plural: "die Bereitstellungen",
        arabic: "نشر التطبيق / الـ Deployment",
        phonetic: "دي بيرايت شتيلونك [bəˈʁaɪ̯tˌʃtɛlʊŋ]",
        sentenceDe: "Die Bereitstellung auf dem Produktivserver erfolgt heute Abend.",
        sentenceAr: "نشر التحديث على السيرفر الفعلي سيتم مساء اليوم.",
        workplaceTip: "Produktivserver هو سيرفر الإنتاج الفعلي (Production Server)."
      },
      {
        id: "it_05",
        german: "die Schnittstelle",
        word: "Schnittstelle",
        article: "die",
        plural: "die Schnittstellen",
        arabic: "واجهة برمجة التطبيقات (API)",
        phonetic: "دي شنيت شتيلِه [ˈʃnɪtˌʃtɛlə]",
        sentenceDe: "Wir müssen die REST-Schnittstelle mit dem neuen Service verbinden.",
        sentenceAr: "يجب علينا ربط واجهة REST البرمجية بالخدمة الجديدة.",
        workplaceTip: "كلمة ألمانية أصيلة مرادفة تماماً لمصطلح API."
      },
      {
        id: "it_06",
        german: "die Anforderung",
        word: "Anforderung",
        article: "die",
        plural: "die Anforderungen",
        arabic: "المتطلب البرمجي / Requirement",
        phonetic: "دي أنفوردرونك [ˈʔanˌfɔʁdəʁʊŋ]",
        sentenceDe: "Der Kunde hat neue Anforderungen an die Benutzeroberfläche gestellt.",
        sentenceAr: "قدّم العميل متطلبات جديدة لواجهة المستخدم.",
        workplaceTip: "تُستخدم في وثائق المشروعات وجلسات Sprint Planning."
      }
    ],
    dailyPhrases: [
      {
        de: "Guten Morgen zusammen, gestern habe ich an der Authentifizierung gearbeitet.",
        ar: "صباح الخير جميعاً، بالأمس عملت على نظام المصادقة وتسجيل الدخول.",
        context: "عبارة شائعة في اجتماع الـ Daily Standup الصباحي."
      },
      {
        de: "Heute plane ich, die Unit-Tests zu schreiben und den Pull Request zu erstellen.",
        ar: "أخطط اليوم لكتابة اختبارات الوحدة وإنشاء الـ Pull Request.",
        context: "تحديد مهام اليوم في بيئة العمل التقنية."
      },
      {
        de: "Ich brauche Unterstützung bei diesem Datenbank-Problem.",
        ar: "أحتاج إلى دعم ومساعدة في هذه المشكلة المتعلقة بقاعدة البيانات.",
        context: "طلب المساعدة من الزملاء بلباقة مهنية."
      }
    ]
  },

  customer_service: {
    id: "customer_service",
    title: "خدمة العملاء والدعم الفني (Kundenservice)",
    icon: "🎧",
    description: "المجال الأكثر طلباً وأعلى دخلاً في مصر والشرق الأوسط لمتحدثي الألمانية (Call Centers & Tech Support).",
    salaryInfo: "رواتب الشركات في مصر: 25,000 إلى 45,000+ جنيه شهرياً | لا يشترط خبرة سابقة، فقط طلاقة لغوية.",
    words: [
      {
        id: "cs_01",
        german: "das Anliegen",
        word: "Anliegen",
        article: "das",
        plural: "die Anliegen",
        arabic: "طلب العميل / الموضوع / الاستفسار",
        phonetic: "داس أنليجن [ˈʔanˌliːɡn̩]",
        sentenceDe: "Wie kann ich Ihnen bei Ihrem Anliegen behilflich sein?",
        sentenceAr: "كيف يمكنني مساعدة حضرتك في طلبك أو استفسارك؟",
        workplaceTip: "الجملة الافتتاحية الذهبية الأكثر استخداماً عند بدء أي مكالمة أو محادثة."
      },
      {
        id: "cs_02",
        german: "die Beschwerde",
        word: "Beschwerde",
        article: "die",
        plural: "die Beschwerden",
        arabic: "الشكوى / الاعتراض",
        phonetic: "دي بيشفيردِه [bəˈʃveːɐ̯də]",
        sentenceDe: "Ich verstehe Ihren Ärger und nehme Ihre Beschwerde sehr ernst.",
        sentenceAr: "أنا أتفهم استياءك وآخذ شكوى حضرتك ببالغ الجدية والاهتمام.",
        workplaceTip: "جملة امتصاص الغضب الأساسية لإشعار العميل بالاحترام والتعاطف."
      },
      {
        id: "cs_03",
        german: "die Rückerstattung",
        word: "Rückerstattung",
        article: "die",
        plural: "die Rückerstattungen",
        arabic: "استرداد المبلغ المالي / Refund",
        phonetic: "دي ريك إرشتاتونك [ˈʁʏkʔɛɐ̯ˌʃtatʊŋ]",
        sentenceDe: "Der Betrag wird innerhalb von drei Werktagen auf Ihr Konto erstattet.",
        sentenceAr: "سيتم استرداد المبلغ إلى حسابك خلال ثلاثة أيام عمل.",
        workplaceTip: "Werktage تعني أيام العمل الرسمية (من الإثنين إلى الجمعة في ألمانيا)."
      },
      {
        id: "cs_04",
        german: "die Geduld",
        word: "Geduld",
        article: "die",
        plural: null,
        arabic: "الصبر والانتظار",
        phonetic: "دي جيدولد [ɡəˈdʊlt]",
        sentenceDe: "Vielen Dank für Ihre Geduld und Ihr Verständnis.",
        sentenceAr: "شكراً جزيلاً لصبر حضرتك وحسن تفهمك.",
        workplaceTip: "تقال دائماً بعد وضع العميل في الانتظار (Warteschleife)."
      },
      {
        id: "cs_05",
        german: "die Lösung",
        word: "Lösung",
        article: "die",
        plural: "die Lösungen",
        arabic: "الحل للمشكلة",
        phonetic: "دي لوزونك [ˈløːzʊŋ]",
        sentenceDe: "Gemeinsam werden wir eine passende Lösung für Sie finden.",
        sentenceAr: "معاً سنجد لحضرتك حلاً مناسباً ومرضياً.",
        workplaceTip: "تبث الطمأنينة وتظهر روح التعاون الإيجابي."
      }
    ],
    dailyPhrases: [
      {
        de: "Herzlich willkommen beim Kundenservice. Mein Name ist Omar, was kann ich für Sie tun?",
        ar: "أهلاً وسهلاً بحضرتك في خدمة العملاء. اسمي عمر، كيف يمكنني مساعدتك؟",
        context: "التحية الافتتاحية للمكالمة."
      },
      {
        de: "Darf ich Sie für einen kurzen Moment in die Warteschleife legen, um das zu prüfen?",
        ar: "هل تأذن لي بوضع حضرتك لحظات على الانتظار للتحقق من الأمر؟",
        context: "الاستئذان قبل مراجعة بيانات الحساب على السيستم."
      },
      {
        de: "Ich habe Ihr Ticket an die zuständige Fachabteilung weitergeleitet.",
        ar: "لقد قمت بتحويل طلبك/التذكرة إلى القسم المختص للمتابعة.",
        context: "إشعار العميل بتصعيد المشكلة (Escalation)."
      }
    ]
  },

  medical: {
    id: "medical",
    title: "القطاع الطبي والتمريض (Medizin & Pflege)",
    icon: "🩺",
    description: "المجال الأكثر استقبالاً للأطباء والممرضين والصيادلة بعقود استقدام مباشرة إلى ألمانيا.",
    salaryInfo: "رواتب الأطباء: 65,000€ - 100,000€+ | رواتب التمريض: 35,000€ - 48,000€ سنوياً مع إقامة مضمونة.",
    words: [
      {
        id: "med_01",
        german: "die Untersuchung",
        word: "Untersuchung",
        article: "die",
        plural: "die Untersuchungen",
        arabic: "الفحص الطبي / الكشف",
        phonetic: "دي أونترزوخونك [ˈʔʊntɐˌzuːxʊŋ]",
        sentenceDe: "Der Arzt führt vor der Behandlung eine gründliche Untersuchung durch.",
        sentenceAr: "يُجري الطبيب فحصاً طبياً دقيقاً وشاملاً قبل بدء العلاج.",
        workplaceTip: "الفعل 'durchführen' يعني إجراء أو تنفيذ الكشف."
      },
      {
        id: "med_02",
        german: "das Rezept",
        word: "Rezept",
        article: "das",
        plural: "die Rezepte",
        arabic: "الوصفة الطبية (الروشتة)",
        phonetic: "داس ريتسيبت [ʁeˈtsɛpt]",
        sentenceDe: "Hier ist Ihr Rezept, Sie können die Medikamente in jeder Apotheke holen.",
        sentenceAr: "ها هي وصفتك الطبية، يمكنك صرف الدواء من أي صيدلية.",
        workplaceTip: "في ألمانيا، لا يمكن صرف معظم الأدوية إلا بـ Rezept معتمد."
      },
      {
        id: "med_03",
        german: "der Blutdruck",
        word: "Blutdruck",
        article: "der",
        plural: null,
        arabic: "ضغط الدم",
        phonetic: "دير بلوت دروك [ˈbluːtˌdʁʊk]",
        sentenceDe: "Ich messe jetzt Ihren Blutdruck und Puls, bitte entspannen Sie sich.",
        sentenceAr: "سأقيس الآن ضغط دمك ونبضك، من فضلك استرخِ تماماً.",
        workplaceTip: "إجراء روتيني يومي لجميع كوادر التمريض في المستشفيات الألمانية."
      },
      {
        id: "med_04",
        german: "die Notaufnahme",
        word: "Notaufnahme",
        article: "die",
        plural: "die Notaufnahmen",
        arabic: "قسم الطوارئ بالمستشفى",
        phonetic: "دي نوت أوفنامِه [ˈnoːtʔaʊ̯fˌnaːmə]",
        sentenceDe: "Bei akuten Schmerzen sollten Sie sofort in die Notaufnahme gehen.",
        sentenceAr: "في حالة الآلام الحادة والشديدة، يجب عليك التوجه فوراً إلى قسم الطوارئ.",
        workplaceTip: "كلمة مركبة من Not (طوارئ/حاجة) و Aufnahme (استقبال/دخول)."
      },
      {
        id: "med_05",
        german: "das Schmerzmittel",
        word: "Schmerzmittel",
        article: "das",
        plural: "die Schmerzmittel",
        arabic: "المسكن / دواء تسكين الآلام",
        phonetic: "داس شمرتس ميتِل [ˈʃmɛʁtsˌmɪtl̩]",
        sentenceDe: "Dieses Schmerzmittel lindert die Schmerzen sehr schnell.",
        sentenceAr: "هذا المسكن يخفف الآلام بسرعة كبيرة.",
        workplaceTip: "الفعل 'lindern' يعني تخفيف حدة الألم أو الأعراض."
      }
    ],
    dailyPhrases: [
      {
        de: "Wo genau tut es Ihnen weh? Strahlt der Schmerz in den Arm aus?",
        ar: "أين موضع الألم بالتحديد؟ وهل يمتد الألم أو ينتقل إلى ذراعك؟",
        context: "سؤال أساسي لتشخيص الألم وفحص المريض."
      },
      {
        de: "Haben Sie bekannte Allergien gegen bestimmte Medikamente wie Penicillin?",
        ar: "هل لديك أي حساسية معروفة تجاه أدوية معينة مثل البنسلين؟",
        context: "فحص الحساسية قبل إعطاء أي عقار طبي."
      }
    ]
  },

  interview: {
    id: "interview",
    title: "مقابلات العمل والسيرة الذاتية (Bewerbung & Interview)",
    icon: "🏢",
    description: "الأسئلة الحقيقية الأكثر تكراراً في مقابلات التوظيف الألمانية، وكيفية صياغة إجابات احترافية تقنع صاحب العمل.",
    salaryInfo: "اجتياز المقابلة بالألمانية هو مفتاح الحصول على عقد عمل رسمي وتأشيرة البطاقة الزرقاء (EU Blue Card).",
    words: [
      {
        id: "int_01",
        german: "die Stärke",
        word: "Stärke",
        article: "die",
        plural: "die Stärken",
        arabic: "نقطة القوة / الميزة الشخصية",
        phonetic: "دي شتيركِه [ˈʃtɛʁkə]",
        sentenceDe: "Meine größte Stärke ist meine strukturierte und zuverlässige Arbeitsweise.",
        sentenceAr: "أعظم نقاط قوتي هي طريقتي المنظمة والموثوقة في العمل وإنجاز المهام.",
        workplaceTip: "الألمان يعشقون كلمة 'zuverlässig' (موثوق/يعتمد عليه)."
      },
      {
        id: "int_02",
        german: "die Erfahrung",
        word: "Erfahrung",
        article: "die",
        plural: "die Erfahrungen",
        arabic: "الخبرة العملية السابقة",
        phonetic: "دي إرفارونك [ɛɐ̯ˈfaːʁʊŋ]",
        sentenceDe: "Ich bringe mehr als drei Jahre praktische Erfahrung in diesem Bereich mit.",
        sentenceAr: "أمتلك وأجلب معي أكثر من ثلاث سنوات من الخبرة العملية في هذا المجال.",
        workplaceTip: "التعبير 'Erfahrung mitbringen' شائع جداً في المقابلات."
      },
      {
        id: "int_03",
        german: "die Teamfähigkeit",
        word: "Teamfähigkeit",
        article: "die",
        plural: null,
        arabic: "القدرة على العمل الجماعي وروح الفريق",
        phonetic: "دي تيم فيهيشكايت [ˈtiːmˌfɛːɪçkaɪ̯t]",
        sentenceDe: "Teamfähigkeit und offene Kommunikation sind für mich unverzichtbar.",
        sentenceAr: "العمل الجماعي والتواصل المفتوح أمران لا غنى عنهما بالنسبة لي.",
        workplaceTip: "صفة أساسية مطلوبة في 95% من إعلانات الوظائف الألمانية."
      },
      {
        id: "int_04",
        german: "die Gehaltsvorstellung",
        word: "Gehaltsvorstellung",
        article: "die",
        plural: "die Gehaltsvorstellungen",
        arabic: "الراتب المتوقع / التوقع المالي",
        phonetic: "دي جيهالتس فورشتيلونك [ɡəˈhalt͡sfoːɐ̯ˌʃtɛlʊŋ]",
        sentenceDe: "Meine Gehaltsvorstellung liegt bei 48.000 Euro brutto im Jahr.",
        sentenceAr: "توقعي للراتب يبلغ 48 ألف يورو إجمالي سنوياً.",
        workplaceTip: "في ألمانيا يُذكر الراتب دائماً كـ 'إجمالي سنوي' (Brutto im Jahr)."
      }
    ],
    dailyPhrases: [
      {
        de: "Erzählen Sie uns bitte etwas über sich und Ihren bisherigen Werdegang.",
        ar: "حدثنا من فضلك باختصار عن نفسك وعن مسيرتك المهنية حتى الآن.",
        context: "السؤال الأول الحتمي في كل مقابلة عمل ألمانية."
      },
      {
        de: "Warum möchten Sie ausgerechnet bei unserem Unternehmen arbeiten?",
        ar: "لماذا تود العمل بالتحديد في شركتنا دوناً عن غيرها؟",
        context: "سؤال قياس الدوافع ومعرفة مدى اطلاعك على نشاط الشركة."
      },
      {
        de: "Wo sehen Sie sich beruflich in den nächsten drei bis fünf Jahren?",
        ar: "أين ترى نفسك مهنياً خلال السنوات الثلاث إلى الخمس القادمة؟",
        context: "سؤال قياس الطموح والاستقرار الوظيفي."
      }
    ]
  }
};
