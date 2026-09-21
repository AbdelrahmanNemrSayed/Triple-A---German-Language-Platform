// بنك سيناريوهات المحادثات الواقعية ولعب الأدوار
// Real-Life German Interactive Dialogues

export const dialoguesData = [
  {
    id: "dia_buergeramt",
    title: "Anmeldung im Bürgeramt",
    titleAr: "تسجيل السكن والإقامة في البلدية الألمانية",
    level: "A2",
    icon: "🏛️",
    situationAr: "أول وأهم خطوة قانونية يقوم بها أي وافد أو مقيم عند وصوله إلى ألمانيا هي تسجيل عنوان سكنه (Wohnsitz anmelden) لدى البلدية خلال 14 يوماً.",
    speakers: {
      A: { name: "Herr Weber (موظف البلدية)", avatar: "👨‍💼" },
      B: { name: "Tariq (المقيم الجديد)", avatar: "🙋‍♂️" }
    },
    lines: [
      {
        speaker: "A",
        german: "Guten Tag! Haben Sie einen Termin bei uns vereinbart?",
        arabic: "نهارك سعيد! هل قمت بحجز موعد مسبق لدينا؟",
        phonetic: "جوتن تاك! هابن زي آينن ترمين باي أونس فيراينبارت؟"
      },
      {
        speaker: "B",
        german: "Guten Tag! Ja, hier ist meine Terminbestätigung. Nummer 142.",
        arabic: "نهارك سعيد! نعم، ها هو تأكيد موعدي، رقم 142.",
        phonetic: "جوتن تاك! يا، هير إست ماينِه ترمين بيشتيتيجونك. نومر 142."
      },
      {
        speaker: "A",
        german: "Sehr schön. Möchten Sie Ihren Wohnsitz in der Stadt anmelden?",
        arabic: "ممتاز جداً. هل ترغب في تسجيل محل إقامتك وسكنك في المدينة؟",
        phonetic: "زير شون. موشتن زي إيرن فونزيتس إن دير شتات أنميلدن؟"
      },
      {
        speaker: "B",
        german: "Genau. Hier sind mein Reisepass und die Wohnungsgeberbestätigung vom Vermieter.",
        arabic: "بالضبط. ها هو جواز سفري وشهادة تأكيد السكن من المؤجر (صاحب الشقة).",
        phonetic: "جيناو. هير زيند ماين رايزيباس أوند دي فونونكس جيبر بيشتيتيجونك فوم فيرميتر."
      },
      {
        speaker: "A",
        german: "Perfekt, alle Unterlagen sind vollständig. Bitte unterschreiben Sie hier unten.",
        arabic: "ممتاز، جميع الأوراق والمستندات كاملة. تفضل بالتوقيع هنا في الأسفل.",
        phonetic: "بيرفيكت، ألِه أونترلاجن زيند فولشتينديش. بِتَّه أونترشرايبن زي هير أونتن."
      },
      {
        speaker: "B",
        german: "Vielen herzlichen Dank für Ihre Hilfe! Auf Wiedersehen.",
        arabic: "شكراً جزيلاً وخالصاً لمساعدتك! إلى اللقاء.",
        phonetic: "فيلن هيرتسليشن دانك فير إيرِه هيلفه! أوف فيدرزين."
      }
    ]
  },

  {
    id: "dia_doctor",
    title: "Beim Arzt & Terminvereinbarung",
    titleAr: "في عيادة الطبيب وشرح الأعراض وحجز موعد",
    level: "A1-A2",
    icon: "🩺",
    situationAr: "زيارة العيادة الطبية في ألمانيا، التحدث مع موظفة الاستقبال، ثم الدخول للطبيب وشرح المشكلة الصحية بدقة.",
    speakers: {
      A: { name: "Frau Müller (موظفة العيادة / الطبيبة)", avatar: "👩‍⚕️" },
      B: { name: "Ahmed (المريض)", avatar: "🤒" }
    },
    lines: [
      {
        speaker: "B",
        german: "Guten Morgen, ich fühle mich seit zwei Tagen gar nicht gut.",
        arabic: "صباح الخير، لا أشعر أنني بخير على الإطلاق منذ يومين.",
        phonetic: "جوتن مورجن، إيش فوله ميش زايت تسفاي تاجن جار نيشت جوت."
      },
      {
        speaker: "A",
        german: "Guten Morgen. Was für Beschwerden haben Sie denn genau?",
        arabic: "صباح الخير. ما هي الأعراض والشكاوى التي تعاني منها بالتحديد؟",
        phonetic: "جوتن مورجن. فاس فير بيشفيردن هابن زي دِن جيناو؟"
      },
      {
        speaker: "B",
        german: "Ich habe starkes Fieber, Halsschmerzen und kann kaum schlucken.",
        arabic: "لديّ حمى شديدة، وألم في الحلق، وبالكاد أستطيع البلع.",
        phonetic: "إيش هابِه شتاركِس فيبر، هالس شمرتسن أوند كان كاوم شلوكن."
      },
      {
        speaker: "A",
        german: "Haben Sie Ihre Versichertenkarte der Krankenkasse dabei?",
        arabic: "هل تحمل معك بطاقة التأمين الصحي الخاصة بك؟",
        phonetic: "هابن زي إيرِه فيرزيشرتن كارتِه دير كرانكن كاسِه داباي؟"
      },
      {
        speaker: "B",
        german: "Ja, bitte sehr. Brauche ich auch eine Krankschreibung für meinen Arbeitgeber?",
        arabic: "نعم، تفضلي. هل سأحتاج أيضاً إلى إجازة مرضية رسمية لجهة عملي؟",
        phonetic: "يا، بِتَّه زير. براوخِه إيش أوخ آينِه كرانك شرايبونك فير ماينن أربايت جيبر؟"
      },
      {
        speaker: "A",
        german: "Selbstverständlich. Der Arzt wird Sie gleich untersuchen und das Attest ausstellen.",
        arabic: "بالتأكيد ودون شك. سيفحصك الطبيب حالاً وسيصدر لك الشهادة المرضية.",
        phonetic: "زيلبست فيرشتيندليش. دير آرتست فيرد زي جلايش أونترزوخن أوند داس أتيست أوسشتيلن."
      }
    ]
  },

  {
    id: "dia_restaurant",
    title: "Im Restaurant",
    titleAr: "في المطعم: طلب الطعام والمشروبات ودفع الحساب",
    level: "A1",
    icon: "🍽️",
    situationAr: "محادثة كلاسيكية في مطعم ألماني: طلب قائمة الطعام، اختيار وجبة ومشروب، ودفع الحساب مع توضيح الدفع كاش أو بالبطاقة.",
    speakers: {
      A: { name: "Kellner (النادل)", avatar: "🤵" },
      B: { name: "Kunde (الزبون)", avatar: "🧑" }
    },
    lines: [
      {
        speaker: "A",
        german: "Guten Abend! Haben Sie schon gewählt oder möchten Sie die Speisekarte?",
        arabic: "مساء الخير! هل اخترت طلبك بالفعل أم ترغب في رؤية قائمة الطعام أولاً؟",
        phonetic: "جوتن أبند! هابن زي شون جيفيلت أودر موشتن زي دي شبايزه كارتِه؟"
      },
      {
        speaker: "B",
        german: "Guten Abend! Ich möchte gerne ein Schnitzel mit Pommes bestellen, bitte.",
        arabic: "مساء الخير! أود أن أطلب شنيتزل مع بطاطس مقلية، من فضلك.",
        phonetic: "جوتن أبند! إيش موشتِه جيرنِه آين شنيتزل ميت بوميس بيشتيلن، بِتَّه."
      },
      {
        speaker: "A",
        german: "Sehr gerne! Und was möchten Sie dazu trinken?",
        arabic: "بكل سرور! وماذا تود أن تشرب مع الوجبة؟",
        phonetic: "زير جيرنِه! أوند فاس موشتن زي داتسو ترينكن؟"
      },
      {
        speaker: "B",
        german: "Ein großes Mineralwasser ohne Kohlensäure, bitte.",
        arabic: "كوب ماء معدني كبير بدون غازات، من فضلك.",
        phonetic: "آين جروسِس مينيرال فاسر أونِه كولن زويرِه، بِتَّه."
      },
      {
        speaker: "A",
        german: "Kommt sofort! ... Hat es Ihnen geschmeckt?",
        arabic: "يأتيك فوراً! ... (بعد الأكل) هل نال الطعام إعجابك وطعمه لذيذ؟",
        phonetic: "كومت زوفورت! ... هات إس إينن جيشميكت؟"
      },
      {
        speaker: "B",
        german: "Ja, ausgezeichnet! Wir möchten bitte zahlen. Geht das mit Karte?",
        arabic: "نعم، ممتاز للغاية! نود دفع الحساب من فضلك. هل الدفع بالبطاقة البنكية متاح؟",
        phonetic: "يا، أوس جايتسايشنِت! فير موشتن بِتَّه تسالن. جيت داس ميت كارتِه؟"
      },
      {
        speaker: "A",
        german: "Ja natürlich, das macht zusammen 22 Euro und 50 Cent.",
        arabic: "نعم بالطبع، المجموع 22 يورو و 50 سنتاً.",
        phonetic: "يا ناتورليش، داس ماخت تسوزامن 22 أورو أوند 50 سنت."
      }
    ]
  },

  {
    id: "dia_interview",
    title: "Vorstellungsgespräch",
    titleAr: "مقابلة عمل واقعية في شركة ألمانية",
    level: "B1",
    icon: "💼",
    situationAr: "سيناريو واقعي لمقابلة عمل (Job Interview) مع مسؤول الموارد البشرية، وكيفية تقديم النفس وإبراز الدوافع للوظيفة.",
    speakers: {
      A: { name: "Personalchef (مدير التوظيف)", avatar: "🧑‍💼" },
      B: { name: "Bewerber (المتقدم للوظيفة)", avatar: "👔" }
    },
    lines: [
      {
        speaker: "A",
        german: "Herzlich willkommen bei uns! Schön, dass Sie den Weg zu uns gefunden haben.",
        arabic: "أهلاً وسهلاً بحضرتك لدينا! يسعدنا حضورك ولقاؤك اليوم.",
        phonetic: "هيرتسليش فيلكومن باي أونس! شون، داس زي دين فيك تسو أونس جيفوندن هابن."
      },
      {
        speaker: "B",
        german: "Vielen Dank für die Einladung zum Gespräch. Ich freue mich sehr darauf!",
        arabic: "شكراً جزيلاً على دعوتي للمقابلة. أنا سعيد ومتحمس جداً لهذا اللقاء!",
        phonetic: "فيلن دانك فير دي آينلادونك تسوم جيشبريش. إيش فرويِه ميش زير داراوف!"
      },
      {
        speaker: "A",
        german: "Können Sie uns kurz erklären, warum Sie sich für diese Stelle entschieden haben?",
        arabic: "هل يمكنك أن تشرح لنا باختصار لماذا قررت التقديم على هذه الوظيفة بالتحديد؟",
        phonetic: "كونن زي أونس كورتس إركلايرن، فاروم زي زيش فير ديزِه شتيلِه إنتشايدن هابن؟"
      },
      {
        speaker: "B",
        german: "Ihr Unternehmen ist führend in Innovation. Meine Fähigkeiten passen perfekt zu Ihren Zielen.",
        arabic: "شركتكم رائدة ومتميزة في الابتكار، ومهاراتي تتطابق تماماً مع أهدافكم ومشروعاتكم.",
        phonetic: "إير أونترنيمن إست فيرِند إن إنوفاتسيون. ماينِه فيهيشكايتن باسن بيرفيكت تسو إيرن تسيلن."
      },
      {
        speaker: "A",
        german: "Das klingt sehr überzeugend. Wie gehen Sie mit stressigen Situationen um?",
        arabic: "هذا يبدو مقنعاً للغاية. وكيف تتعامل عادة مع المواقف والمهام ذات الضغط العالي؟",
        phonetic: "داس كلينكت زير إيبرتسوينكِند. في جيهن زي ميت شتريسِجن زيتواتسيونن أوم؟"
      },
      {
        speaker: "B",
        german: "Ich bleibe ruhig, setze klare Prioritäten und tausche mich eng mit meinem Team aus.",
        arabic: "أحافظ على هدوئي، وأضع أولويات واضحة، وأتواصل بشكل وثيق ومستمر مع فريقي.",
        phonetic: "إيش بلايبِه رويش، زيتسِه كلايرِه بريوريتيتن أوند تاوشِه ميش إينك ميت ماينم تيم أوس."
      }
    ]
  }
];
