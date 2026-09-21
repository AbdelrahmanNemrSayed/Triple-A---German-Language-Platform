// بنك تحديات مختبر بناء وتراكيب الجمل الألمانية (Satzbau & Grammatik-Labor)
// يعلم قواعد ترتيب الكلمات وموقع الفعل في الألمانية

export const sentenceChallenges = [
  {
    id: "sb_01",
    level: "A1",
    title: "موقع الفعل في الجملة الأساسية (Verb auf Position 2)",
    ruleExplanation: "في الجملة الإخبارية الألمانية البسيطة (Hauptsatz)، يجب دائماً أن يأتي الفعل المصرف في المركز الثاني، حتى لو بدأت الجملة بظرف زمان مثل 'Heute'!",
    translationAr: "اليوم أذهب أنا إلى الطبيب.",
    correctOrder: ["Heute", "gehe", "ich", "zum", "Arzt."],
    // الكلمات المبعثرة
    scrambled: ["zum", "ich", "gehe", "Heute", "Arzt."]
  },
  {
    id: "sb_02",
    level: "A1",
    title: "الأفعال المنفصلة (Trennbare Verben)",
    ruleExplanation: "في الأفعال المنفصلة مثل 'anrufen'، يأتي جذر الفعل المصرف (rufe) في المركز الثاني، وتذهب البادئة المنفصلة (an) إلى نهاية الجملة تماماً!",
    translationAr: "أنا أتصل بك اليوم مساءً.",
    correctOrder: ["Ich", "rufe", "dich", "heute", "Abend", "an."],
    scrambled: ["dich", "an.", "rufe", "Ich", "Abend", "heute"]
  },
  {
    id: "sb_03",
    level: "A2",
    title: "الأفعال المساعدة/الناقصة (Modalverben)",
    ruleExplanation: "عند استخدام فعل ناقص مثل 'müssen'، يصرف الفعل المساعد في المركز 2، ويذهب الفعل الأساسي (machen) في المصدر بدون تصريف إلى نهاية الجملة.",
    translationAr: "يجب علينا إنجاز هذا المشروع الآن.",
    correctOrder: ["Wir", "müssen", "dieses", "Projekt", "jetzt", "fertigstellen."],
    scrambled: ["Projekt", "fertigstellen.", "müssen", "dieses", "jetzt", "Wir"]
  },
  {
    id: "sb_04",
    level: "A2-B1",
    title: "الجملة الفرعية مع أداة التعليل (Nebensatz mit weil)",
    ruleExplanation: "عند استخدام أداة الربط 'weil' (لأن)، يذهب الفعل المصرف (möchte) تلقائياً إلى نهاية الجملة الفرعية تماماً!",
    translationAr: "أنا أتعلم الألمانية لأنني أريد العمل في ألمانيا.",
    correctOrder: ["Ich", "lerne", "Deutsch,", "weil", "ich", "in", "Deutschland", "arbeiten", "möchte."],
    scrambled: ["weil", "in", "lerne", "möchte.", "Deutschland", "ich", "arbeiten", "Deutsch,", "Ich"]
  },
  {
    id: "sb_05",
    level: "B1",
    title: "الجملة الفرعية مع أداة أن (Nebensatz mit dass)",
    ruleExplanation: "أداة 'dass' ترسل أيضاً الفعل المصرف (ist) إلى نهاية الجملة. لاحظ: 'dass regelmäßiges Üben sehr wichtig ist'.",
    translationAr: "أنا مقتنع بأن التدريب المنتظم مهم جداً.",
    correctOrder: ["Ich", "bin", "überzeugt,", "dass", "regelmäßiges", "Üben", "sehr", "wichtig", "ist."],
    scrambled: ["dass", "überzeugt,", "ist.", "Üben", "regelmäßiges", "Ich", "sehr", "bin", "wichtig"]
  },
  {
    id: "sb_06",
    level: "B1",
    title: "الجمل الشرطية مع wenn (Konditionalsatz)",
    ruleExplanation: "إذا بدأت الجملة بـ 'Wenn'، يأتي الفعل في نهاية الجملة الأولى (hast)، ثم يبدأ الشق الثاني بالفعل فوراً (kannst du)!",
    translationAr: "إذا كان لديك وقت، يمكنك مساعدتي.",
    correctOrder: ["Wenn", "du", "Zeit", "hast,", "kannst", "du", "mir", "helfen."],
    scrambled: ["Zeit", "helfen.", "du", "mir", "hast,", "Wenn", "kannst", "du"]
  }
];
