export const curriculum = {
  A1: {
    title: 'التواصل من البداية',
    description: 'أساسيات التعارف والاحتياجات اليومية والمدينة.',
    units: [
      { id: 'a1-intro', title: 'التعارف والتواصل', categories: ['Grundlagen', 'Familie'], grammar: 'الضمائر، sein وhaben، ترتيب الجملة والسؤال', outcomes: ['تقديم نفسك وأسرتك', 'طرح أسئلة قصيرة والإجابة عنها'] },
      { id: 'a1-daily', title: 'يومي وطعامي', categories: ['Alltag', 'Essen'], grammar: 'الأفعال في المضارع، أدوات التعريف، النفي بـ nicht وkein', outcomes: ['وصف الروتين اليومي', 'طلب الطعام والشراب بأدب'] },
      { id: 'a1-around', title: 'المنزل والمدينة', categories: ['Wohnen', 'Stadt', 'Verkehr'], grammar: 'حروف الجر المكانية، Akkusativ الأساسي، الأفعال المنفصلة', outcomes: ['وصف السكن ومكان الأشياء', 'السؤال عن الطريق والمواصلات'] }
    ]
  },
  A2: {
    title: 'الاستقلال في المواقف اليومية',
    description: 'المواعيد والصحة والسفر والعمل والتواصل العملي.',
    units: [
      { id: 'a2-communicate', title: 'المواعيد والتواصل', categories: ['Kommunikation', 'Behoerden'], grammar: 'Perfekt، الجمل التابعة مع weil وdass', outcomes: ['حجز موعد أو تغييره', 'كتابة رسالة قصيرة واضحة'] },
      { id: 'a2-work', title: 'العمل والخدمات', categories: ['Beruf', 'Einkaufen'], grammar: 'Dativ وAkkusativ، الأفعال المساعدة، المقارنة', outcomes: ['شرح مهمة أو مشكلة في العمل', 'فهم الأسعار والفواتير وطلب المساعدة'] },
      { id: 'a2-life', title: 'الصحة والسفر والحياة', categories: ['Gesundheit', 'Reisen', 'Umwelt'], grammar: 'Präteritum للأفعال الشائعة، المستقبل بـ werden، أوامر مهذبة', outcomes: ['شرح أعراض وخطط سفر', 'مقارنة خيارات الحياة اليومية'] }
    ]
  },
  B1: {
    title: 'التعبير المستقل والمترابط',
    description: 'بناء رأي مدعوم، التعامل مع العمل والمؤسسات، وفهم النصوص الأطول.',
    units: [
      { id: 'b1-argument', title: 'الرأي والحجج', categories: ['Diskussion', 'Gefühle'], grammar: 'obwohl وdeshalb، ترتيب الجملة، Konjunktiv II للتهذيب', outcomes: ['عرض رأي مع أسباب وأمثلة', 'الموازنة بين مزايا وعيوب'] },
      { id: 'b1-work', title: 'العمل والتعامل الرسمي', categories: ['Beruf', 'Karriere', 'Bürokratie'], grammar: 'المبني للمجهول، Relativsätze، الروابط السببية', outcomes: ['كتابة طلب أو شكوى منظمة', 'شرح مشكلة واقتراح حل'] },
      { id: 'b1-society', title: 'المجتمع والإعلام', categories: ['Gesellschaft', 'Technologie', 'Umwelt'], grammar: 'Infinitiv mit zu، الروابط الثنائية، نقل المعلومات', outcomes: ['تلخيص فكرة من نص أو خبر', 'المشاركة في نقاش حول قضية عامة'] }
    ]
  }
};

export const placementQuestions = [
  { id: 'pl-a1-1', level: 'A1', skill: 'grammar', prompt: 'Ich ___ aus Ägypten.', options: ['komme', 'kommt', 'kommen'], correct: 0, explanation: 'مع ich نصرف kommen إلى komme.' },
  { id: 'pl-a1-2', level: 'A1', skill: 'reading', prompt: '„Der Zug fährt um 9 Uhr.“ Wann fährt der Zug?', options: ['Um neun Uhr', 'Um zehn Uhr', 'Am Abend'], correct: 0, explanation: 'النص يحدد موعد القطار عند الساعة التاسعة.' },
  { id: 'pl-a1-3', level: 'A1', skill: 'vocabulary', prompt: 'Was bedeutet „die Milch“?', options: ['الحليب', 'الخبز', 'المفتاح'], correct: 0, explanation: 'die Milch تعني الحليب.' },
  { id: 'pl-a1-4', level: 'A1', skill: 'grammar', prompt: 'Wo ___ du?', options: ['wohnst', 'wohne', 'wohnen'], correct: 0, explanation: 'مع du يكون التصريف wohnst.' },
  { id: 'pl-a1-5', level: 'A1', skill: 'listening', audio: 'Guten Morgen. Ich hätte gern einen Kaffee.', prompt: 'Was möchte die Person?', options: ['Einen Kaffee', 'Ein Ticket', 'Ein Zimmer'], correct: 0, explanation: 'تطلب المتحدثة قهوة.' },
  { id: 'pl-a2-1', level: 'A2', skill: 'grammar', prompt: 'Gestern ___ ich meine Freundin besucht.', options: ['habe', 'bin', 'werde'], correct: 0, explanation: 'يُبنى Perfekt مع besuchen باستخدام haben.' },
  { id: 'pl-a2-2', level: 'A2', skill: 'reading', prompt: '„Wegen eines Arzttermins komme ich heute später zur Arbeit.“ Warum kommt die Person später?', options: ['لديها موعد طبي', 'القطار مجاني', 'تعمل من المنزل دائماً'], correct: 0, explanation: 'السبب المذكور هو موعد الطبيب.' },
  { id: 'pl-a2-3', level: 'A2', skill: 'grammar', prompt: 'Ich bleibe zu Hause, ___ ich krank bin.', options: ['weil', 'aber', 'oder'], correct: 0, explanation: 'weil يقدّم السبب ويضع الفعل المصرف في نهاية الجملة التابعة.' },
  { id: 'pl-a2-4', level: 'A2', skill: 'vocabulary', prompt: 'Was bedeutet „die Rechnung“ im Restaurant?', options: ['الفاتورة', 'الموعد', 'الوصفة الطبية'], correct: 0, explanation: 'die Rechnung هي الفاتورة أو الحساب.' },
  { id: 'pl-a2-5', level: 'A2', skill: 'listening', audio: 'Der Termin wurde auf Donnerstag verschoben.', prompt: 'Wann ist der Termin jetzt?', options: ['يوم الخميس', 'يوم الاثنين', 'لم يتغير'], correct: 0, explanation: 'verschoben تعني أُجّل، والموعد الجديد الخميس.' },
  { id: 'pl-b1-1', level: 'B1', skill: 'grammar', prompt: 'Obwohl es stark regnete, ___ wir spazieren.', options: ['gingen', 'gehen weil', 'dass gingen'], correct: 0, explanation: 'بعد الجملة التابعة بـ obwohl تأتي الجملة الرئيسية بترتيبها المعتاد.' },
  { id: 'pl-b1-2', level: 'B1', skill: 'reading', prompt: '„Die Maßnahme wurde eingeführt, damit weniger Energie verbraucht wird.“ Was ist das Ziel?', options: ['توفير الطاقة', 'زيادة الأسعار', 'إلغاء المواصلات'], correct: 0, explanation: 'damit توضّح الهدف: تقليل استهلاك الطاقة.' },
  { id: 'pl-b1-3', level: 'B1', skill: 'grammar', prompt: 'Wenn ich mehr Zeit ___, würde ich einen Sprachkurs besuchen.', options: ['hätte', 'habe', 'hatte ich'], correct: 0, explanation: 'Konjunktiv II من haben هو hätte في الجملة الافتراضية.' },
  { id: 'pl-b1-4', level: 'B1', skill: 'vocabulary', prompt: 'Was bedeutet „eine Entscheidung abwägen“?', options: ['موازنة الخيارات قبل القرار', 'إلغاء موعد', 'تقديم فاتورة'], correct: 0, explanation: 'abwägen تعني دراسة الخيارات أو المزايا والعيوب قبل اتخاذ القرار.' },
  { id: 'pl-b1-5', level: 'B1', skill: 'listening', audio: 'Einerseits spart das Homeoffice Zeit, andererseits fehlt manchen der persönliche Austausch.', prompt: 'Welcher Nachteil wird genannt?', options: ['قلة التواصل الشخصي', 'ارتفاع أجرة القطار', 'طول الإجازة'], correct: 0, explanation: 'يذكر المتحدث أن بعض الناس يفتقدون التواصل الشخصي.' }
];

export function recommendPlacementLevel(scores) {
  if (scores.A1 < 3) return 'A1';
  if (scores.A2 < 3) return 'A2';
  return scores.B1 >= 3 ? 'B1' : 'A2';
}
