// قوالب الإيميلات والمراسلات المهنية والرسمية بالألمانية
// Professional & Official German Email Templates

export const emailTemplates = [
  {
    id: "mail_termin",
    title: "طلب موعد رسمي لدى دائرة حكومية أو طبيب",
    germanTitle: "Terminanfrage bei einer Behörde / Praxis",
    category: "Behörden & Termine",
    icon: "📅",
    subject: "Terminanfrage für [الموضوع/الخدمة] – [اسمك الكامل]",
    bodyDe: `Sehr geehrte Damen und Herren,

hiermit möchte ich gerne einen Termin bezüglich [الموضوع، مثل: Wohnsitzanmeldung / ärztliche Untersuchung] vereinbaren.

Wäre ein Termin in der kommenden Woche, vorzugsweise vormittags, bei Ihnen möglich?

Falls Sie vorab weitere Unterlagen von mir benötigen, lassen Sie es mich bitte wissen.

Vielen Dank für Ihre Unterstützung.

Mit freundlichen Grüßen,
[اسمك الكامل]
[رقم هاتفك]
[عنوانك]`,
    bodyAr: `سيداتي وسادتي المحترمين،

أود بموجب هذا الخطاب حجز موعد بخصوص [الموضوع، مثل: تسجيل السكن / فحص طبي].

هل سيكون من الممكن تحديد موعد في الأسبوع القادم، ويُفضل في الفترة الصباحية؟

إذا كنتم بحاجة إلى أي مستندات أو أوراق إضافية مسبقاً مني، يرجى إبلاغي بذلك.

شكراً جزيلاً لتعاونكم ومساعدتكم.

مع خالص التحيات والتقدير،
[اسمك الكامل]
[رقم هاتفك]`,
    etiquetteTip: "في الإيميلات الرسمية، إذا كنت لا تعرف اسم الموظف ابدأ دائماً بـ 'Sehr geehrte Damen und Herren'. واختم بـ 'Mit freundlichen Grüßen'."
  },

  {
    id: "mail_krank",
    title: "إبلاغ جهة العمل بالمرض والغياب (Krankmeldung)",
    germanTitle: "Krankmeldung beim Arbeitgeber",
    category: "Beruf & Arbeit",
    icon: "🤒",
    subject: "Krankmeldung – [اسمك الكامل] – [تاريخ اليوم]",
    bodyDe: `Sehr geehrte(r) Frau/Herr [اسم المدير أو المسؤول],

leider muss ich mich für heute, den [التاريخ], krankheitsbedingt abmelden. Ich kann aus gesundheitlichen Gründen leider nicht zur Arbeit erscheinen.

Ich werde heute Vormittag einen Arzt aufsuchen und Ihnen das ärztliche Attest (die Arbeitsunfähigkeitsbescheinigung) schnellstmöglich zukommen lassen.

Ich halte Sie über meine Genesung und voraussichtliche Rückkehr auf dem Laufenden.

Mit freundlichen Grüßen,
[اسمك الكامل]`,
    bodyAr: `سيدي الفاضل / سيدتي الفاضلة [اسم المدير]،

للأسف، يجب عليّ الإبلاغ عن غيابي لظروف مرضية اليوم الموافق [التاريخ]. لا يمكنني الحضور للعمل لأسباب صحية.

سأتوجه صباح اليوم لزيارة الطبيب، وسأوافيكم بالشهادة الطبية (إجازة الغياب المرضي AU) في أسرع وقت ممكن.

سأبقيكم على اطلاع دائم بشأن تحسن حالتي الصحية والموعد المتوقع لعودتي.

مع أطيب التحيات،
[اسمك الكامل]`,
    etiquetteTip: "في ألمانيا، يجب إرسال إيميل الـ Krankmeldung فوراً في الصباح قبل بدء مواعيد الدوام المعتادة."
  },

  {
    id: "mail_nachfassen",
    title: "متابعة التقديم لوظيفة بعد المقابلة أو الإرسال",
    germanTitle: "Nachfassen nach einer Bewerbung",
    category: "Karriere & Bewerbung",
    icon: "💼",
    subject: "Nachfrage zu meiner Bewerbung als [المسمى الوظيفي] – Referenz-Nr. [رقم الإعلان إن وجد]",
    bodyDe: `Sehr geehrte(r) Frau/Herr [اسم مسؤول التوظيف],

vor zwei Wochen habe ich Ihnen meine Bewerbungsunterlagen für die Stelle als [اسم الوظيفة] zukommen lassen.

Da mich diese Position und Ihr Unternehmen weiterhin sehr begeistern, möchte ich mich freundlich nach dem aktuellen Stand des Auswahlverfahrens erkundigen.

Falls Sie noch zusätzliche Informationen oder Unterlagen von mir benötigen, stehe ich Ihnen jederzeit gerne zur Verfügung.

Ich freue mich über eine kurze Rückmeldung.

Mit freundlichen Grüßen,
[اسمك الكامل]
[رابط بروفايل لينكد إن أو رقم الهاتف]`,
    bodyAr: `سيدي الفاضل / سيدتي الفاضلة [اسم مسؤول التوظيف]،

منذ أسبوعين أرسلت لحضرتكم ملف وسيرة التقديم الخاصة بي لشغل وظيفة [اسم الوظيفة].

نظراً لأن هذه الوظيفة وشركتكم لا تزالان تثيران شغفي واهتمامي البالغ، أود الاستفسار بكل لطف عن الوضع الحالي لمسار الاختيار والتوظيف.

إذا كنتم بحاجة إلى أي معلومات أو أوراق إضافية مني، فأنا رهن إشارتكم في أي وقت.

أتطلع بكل سرور لردكم الكريم.

مع أطيب التحيات،
[اسمك الكامل]`,
    etiquetteTip: "يُفضل الانتظار من 10 إلى 14 يوماً بعد إرسال السيرة الذاتية قبل إرسال إيميل المتابعة، وهو يعكس حرصك الشديد على الوظيفة."
  }
];
