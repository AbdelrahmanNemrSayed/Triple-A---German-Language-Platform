const makeLesson = (reading, readingAr, readingQuestion, readingOptions, listening, listeningQuestion, listeningOptions) => ({
  reading: { text: reading, translation: readingAr, question: readingQuestion, options: readingOptions, correct: 0 },
  listening: { audio: listening, question: listeningQuestion, options: listeningOptions, correct: 0 }
});

export const curriculumLessonContent = {
  'a1-intro-1': makeLesson(
    'Hallo! Ich heiße Lina und komme aus Kairo. Ich wohne jetzt in Hamburg und lerne Deutsch. Am Abend telefoniere ich mit meiner Schwester.',
    'مرحباً! اسمي لينا وأنا من القاهرة. أسكن الآن في هامبورغ وأتعلم الألمانية. في المساء أتحدث هاتفياً مع أختي.',
    'Wo wohnt Lina jetzt?',
    ['في هامبورغ', 'في القاهرة', 'في برلين'],
    'Guten Morgen, ich heiße Samir und komme aus Alexandria.',
    'Woher kommt Samir?',
    ['من الإسكندرية', 'من هامبورغ', 'من ميونخ']
  ),
  'a1-intro-2': makeLesson(
    'Das ist meine Familie. Mein Vater heißt Karim und meine Mutter heißt Mona. Meine Schwester studiert Medizin. Wir essen sonntags zusammen.',
    'هذه عائلتي. اسم أبي كريم واسم أمي منى. أختي تدرس الطب. نتناول الطعام معاً أيام الأحد.',
    'Was studiert die Schwester?',
    ['الطب', 'الهندسة', 'الألمانية'],
    'Mein Bruder ist zwanzig Jahre alt und arbeitet in einem Café.',
    'Wie alt ist der Bruder?',
    ['عشرون عاماً', 'اثنان وعشرون عاماً', 'اثنا عشر عاماً']
  ),
  'a1-daily-1': makeLesson(
    'Mariam steht um sieben Uhr auf. Sie frühstückt und fährt mit dem Bus zur Arbeit. Um fünf Uhr kommt sie nach Hause. Danach kocht sie das Abendessen.',
    'تستيقظ مريم في السابعة. تتناول الإفطار وتذهب إلى العمل بالحافلة. تعود إلى المنزل في الخامسة. بعد ذلك تطهو العشاء.',
    'Wie fährt Mariam zur Arbeit?',
    ['بالحافلة', 'بالقطار', 'بالدراجة'],
    'Ich stehe jeden Morgen um halb sieben auf und mache zuerst Kaffee.',
    'Wann steht die Person auf?',
    ['في السادسة والنصف', 'في السابعة والنصف', 'في السادسة']
  ),
  'a1-daily-2': makeLesson(
    'Im Café bestellt Adam eine Suppe und ein Wasser. Die Suppe kostet sechs Euro. Er bezahlt mit Karte und sagt freundlich Danke.',
    'في المقهى يطلب آدم حساءً وماءً. سعر الحساء ستة يورو. يدفع بالبطاقة ويشكر بلطف.',
    'Wie bezahlt Adam?',
    ['بالبطاقة', 'نقداً', 'بالهاتف'],
    'Für mich bitte einen Tee und ein Stück Apfelkuchen.',
    'Was möchte die Person essen?',
    ['قطعة من كعكة التفاح', 'حساء', 'شطيرة جبن']
  ),
  'a1-around-1': makeLesson(
    'Unsere Wohnung hat zwei Zimmer und einen Balkon. Das Sofa steht im Wohnzimmer. In der Küche gibt es einen Tisch und vier Stühle. Mein Zimmer ist klein, aber hell.',
    'شقتنا فيها غرفتان وشرفة. الأريكة في غرفة المعيشة. يوجد في المطبخ طاولة وأربعة كراسٍ. غرفتي صغيرة لكنها مضيئة.',
    'Wo steht das Sofa?',
    ['في غرفة المعيشة', 'في المطبخ', 'في الشرفة'],
    'Die Schlüssel liegen auf dem Tisch neben der Tür.',
    'Wo liegen die Schlüssel?',
    ['على الطاولة', 'تحت السرير', 'في الحقيبة']
  ),
  'a1-around-2': makeLesson(
    'Entschuldigung, wo ist der Supermarkt? Gehen Sie geradeaus und dann links. Der Supermarkt ist neben der Apotheke. Zu Fuß brauchen Sie fünf Minuten.',
    'عفواً، أين السوبرماركت؟ سر إلى الأمام ثم انعطف يساراً. السوبرماركت بجوار الصيدلية. يستغرق الوصول مشياً خمس دقائق.',
    'Wo ist der Supermarkt?',
    ['بجوار الصيدلية', 'خلف محطة القطار', 'داخل المدرسة'],
    'Der Bahnhof ist gegenüber dem Rathaus, direkt an der großen Straße.',
    'Wo ist der Bahnhof?',
    ['مقابل مبنى البلدية', 'بجانب المستشفى', 'خلف الفندق']
  ),
  'a1-around-3': makeLesson(
    'Nora fährt mit der Straßenbahn ins Zentrum. An der dritten Haltestelle steigt sie aus. Von dort geht sie fünf Minuten zum Museum.',
    'تذهب نورا إلى وسط المدينة بالترام. تنزل في المحطة الثالثة. ومن هناك تمشي خمس دقائق إلى المتحف.',
    'Womit fährt Nora ins Zentrum?',
    ['بالترام', 'بالحافلة', 'بالسيارة'],
    'Der Bus zum Flughafen fährt heute von Gleis vier ab.',
    'Von welchem Gleis fährt der Bus ab?',
    ['من الرصيف الرابع', 'من الرصيف الثاني', 'من الرصيف الخامس']
  ),
  'a2-communicate-1': makeLesson(
    'Guten Tag, ich möchte einen Termin beim Zahnarzt vereinbaren. Am Dienstag kann ich leider nicht. Wäre Donnerstagvormittag möglich?',
    'نهارك سعيد، أريد تحديد موعد لدى طبيب الأسنان. للأسف لا أستطيع يوم الثلاثاء. هل صباح الخميس مناسب؟',
    'Für welchen Tag fragt die Person nach einem Termin?',
    ['الخميس', 'الثلاثاء', 'الأربعاء'],
    'Könnten Sie unseren Termin bitte auf Freitag verschieben? Am Mittwoch bin ich nicht in der Stadt.',
    'Auf welchen Tag soll der Termin verschoben werden?',
    ['إلى الجمعة', 'إلى الأربعاء', 'إلى الاثنين']
  ),
  'a2-communicate-2': makeLesson(
    'Sehr geehrte Frau Roth, ich kann am Montag nicht zum Deutschkurs kommen, weil mein Sohn krank ist. Die Hausaufgaben mache ich zu Hause. Mit freundlichen Grüßen, Amal.',
    'السيدة روث المحترمة، لا أستطيع حضور دورة الألمانية يوم الاثنين لأن ابني مريض. سأحل الواجبات في المنزل. مع التحية، أمل.',
    'Warum kommt Amal nicht zum Kurs?',
    ['لأن ابنها مريض', 'لأنها مسافرة', 'لأنها تعمل مساءً'],
    'Bitte bringen Sie zur Anmeldung Ihren Pass und das ausgefüllte Formular mit.',
    'Was soll man zur Anmeldung mitbringen?',
    ['جواز السفر والاستمارة المكتملة', 'صورة وكتاباً', 'تذكرة القطار']
  ),
  'a2-work-1': makeLesson(
    'Seit drei Monaten arbeitet Youssef in einer Bäckerei. Er beginnt um sechs Uhr und bereitet Brot und Brötchen vor. Seine Kollegin erklärt ihm heute die neue Kasse.',
    'يعمل يوسف في مخبز منذ ثلاثة أشهر. يبدأ في السادسة ويجهز الخبز والفطائر. تشرح له زميلته اليوم طريقة استخدام صندوق الدفع الجديد.',
    'Was erklärt die Kollegin?',
    ['صندوق الدفع الجديد', 'وصفة الكعك', 'جدول الإجازات'],
    'Die Besprechung beginnt um neun Uhr im Raum neben der Küche.',
    'Wo findet die Besprechung statt?',
    ['في الغرفة بجوار المطبخ', 'في المدخل', 'في الطابق السفلي']
  ),
  'a2-work-2': makeLesson(
    'Im Geschäft kostet die kleinere Tasche zwölf Euro, die große kostet achtzehn Euro. Sara nimmt die große Tasche, weil sie mehr Platz für Bücher braucht.',
    'في المتجر تكلف الحقيبة الأصغر اثني عشر يورو، والكبيرة ثمانية عشر يورو. تختار سارة الحقيبة الكبيرة لأنها تحتاج مساحة أكبر للكتب.',
    'Warum nimmt Sara die große Tasche?',
    ['لأنها تتسع لكتب أكثر', 'لأنها أرخص', 'لأن لونها أحمر'],
    'Die Rechnung ist fertig. Sie können hier bar bezahlen oder mit Ihrer Karte.',
    'Wie kann man bezahlen?',
    ['نقداً أو بالبطاقة', 'بالتحويل فقط', 'بالعملة الأجنبية فقط']
  ),
  'a2-life-1': makeLesson(
    'Seit gestern hat Herr Ali starke Kopfschmerzen. Heute ruft er in der Praxis an und bekommt einen Termin für den Nachmittag. Die Ärztin empfiehlt ihm viel Wasser und Ruhe.',
    'يعاني السيد علي من صداع شديد منذ الأمس. يتصل اليوم بالعيادة ويحصل على موعد بعد الظهر. تنصحه الطبيبة بشرب الماء والراحة.',
    'Wann ist der Arzttermin?',
    ['بعد الظهر', 'في الصباح الباكر', 'غداً مساءً'],
    'Nehmen Sie diese Tabletten dreimal täglich nach dem Essen.',
    'Wie oft soll man die Tabletten nehmen?',
    ['ثلاث مرات يومياً', 'مرة واحدة يومياً', 'مرتين قبل الطعام']
  ),
  'a2-life-2': makeLesson(
    'Am Samstag fährt Huda nach Dresden. Sie hat das Zugticket online gekauft und reist nur mit einem kleinen Koffer. Das Hotel liegt zehn Minuten vom Bahnhof entfernt.',
    'تسافر هدى إلى دريسدن يوم السبت. اشترت تذكرة القطار عبر الإنترنت وتسافر بحقيبة صغيرة. يبعد الفندق عشر دقائق عن محطة القطار.',
    'Wie hat Huda das Zugticket gekauft?',
    ['عبر الإنترنت', 'من سائق الحافلة', 'من مكتب الفندق'],
    'Der Zug nach Leipzig hat heute zwanzig Minuten Verspätung.',
    'Wie lange hat der Zug Verspätung?',
    ['عشرون دقيقة', 'عشر دقائق', 'ساعة كاملة']
  ),
  'a2-life-3': makeLesson(
    'In unserem Haus trennen wir Papier, Glas und Restmüll. Die Papiertonne wird am Mittwoch geleert. So können viele Materialien wiederverwendet werden.',
    'نفصل في منزلنا الورق والزجاج والنفايات العامة. تُفرغ حاوية الورق يوم الأربعاء. وبهذا يمكن إعادة استخدام مواد كثيرة.',
    'Wann wird die Papiertonne geleert?',
    ['يوم الأربعاء', 'يوم الاثنين', 'يوم الجمعة'],
    'Bitte lassen Sie das Licht aus, wenn Sie den Raum verlassen.',
    'Was soll man beim Verlassen des Raums tun?',
    ['إطفاء الضوء', 'فتح النافذة', 'تشغيل المدفأة']
  ),
  'b1-argument-1': makeLesson(
    'Viele Menschen fahren mit dem Fahrrad zur Arbeit, obwohl der Weg manchmal länger dauert. Sie sparen Geld und bewegen sich mehr. Allerdings brauchen Städte sichere Radwege, damit alle Personen gefahrlos fahren können.',
    'يذهب كثيرون إلى العمل بالدراجة رغم أن الطريق يستغرق أحياناً وقتاً أطول. فهم يوفرون المال ويتحركون أكثر. لكن المدن تحتاج إلى مسارات آمنة كي يتمكن الجميع من القيادة دون خطر.',
    'Was brauchen Städte laut Text?',
    ['مسارات دراجات آمنة', 'سيارات أرخص', 'محطات قطار أكبر'],
    'Einerseits ist die Wohnung zentral, andererseits ist die Miete sehr hoch.',
    'Was ist der Nachteil der Wohnung?',
    ['أن إيجارها مرتفع جداً', 'أنها بعيدة عن المركز', 'أنها صغيرة جداً']
  ),
  'b1-argument-2': makeLesson(
    'Als Amir die Stelle nicht bekam, war er zuerst enttäuscht. Trotzdem bat er die Firma um eine Rückmeldung. Das Gespräch zeigte ihm, welche Erfahrung ihm noch fehlte, und er plante einen passenden Kurs.',
    'عندما لم يحصل أمير على الوظيفة، شعر بخيبة أمل في البداية. ومع ذلك طلب من الشركة ملاحظاتها. أوضحت له المقابلة الخبرة التي تنقصه، فخطط للالتحاق بدورة مناسبة.',
    'Was machte Amir nach der Absage?',
    ['طلب ملاحظات وخطط لدورة', 'ترك البحث عن عمل', 'انتقل إلى مدينة أخرى'],
    'Ich würde gern an dem Gespräch teilnehmen, wenn es zeitlich möglich ist.',
    'Was möchte die Person tun?',
    ['المشاركة في الحديث', 'إلغاء الاجتماع', 'تغيير الوظيفة']
  ),
  'b1-work-1': makeLesson(
    'Im Team werden die Aufgaben jeden Montag verteilt. Die Kollegin, die für den Kundenkontakt zuständig ist, fasst offene Fragen zusammen. Dadurch können Probleme früh gelöst werden.',
    'تُوزع المهام في الفريق كل يوم اثنين. وتلخص الزميلة المسؤولة عن التواصل مع العملاء الأسئلة العالقة. وبذلك يمكن حل المشكلات مبكراً.',
    'Wann werden die Aufgaben verteilt?',
    ['كل يوم اثنين', 'كل يوم جمعة', 'مرة كل شهر'],
    'Der Bericht wird bis Donnerstag von der Projektgruppe fertiggestellt.',
    'Bis wann wird der Bericht fertiggestellt?',
    ['حتى يوم الخميس', 'حتى يوم الثلاثاء', 'حتى نهاية الشهر']
  ),
  'b1-work-2': makeLesson(
    'Nach dem Vorstellungsgespräch schickte Rana eine kurze Nachricht. Sie bedankte sich für das Gespräch und fragte, wann das Unternehmen eine Entscheidung treffen werde. Die Antwort kam zwei Tage später.',
    'بعد مقابلة العمل أرسلت رنا رسالة قصيرة. شكرتهم على المقابلة وسألت متى ستتخذ الشركة قراراً. وصل الرد بعد يومين.',
    'Was fragte Rana in ihrer Nachricht?',
    ['متى ستتخذ الشركة قراراً', 'كم عدد الموظفين', 'أين يقع موقف السيارات'],
    'Wir suchen eine Mitarbeiterin, die Erfahrung im Kundenservice hat.',
    'Welche Erfahrung wird gesucht?',
    ['خبرة في خدمة العملاء', 'خبرة في قيادة الحافلات', 'خبرة في التدريس']
  ),
  'b1-work-3': makeLesson(
    'Die Behörde benötigt noch eine Kopie des Mietvertrags. Obwohl alle anderen Unterlagen vollständig sind, kann der Antrag erst bearbeitet werden, wenn die Kopie eingereicht wurde.',
    'تحتاج الدائرة الحكومية إلى نسخة من عقد الإيجار. رغم اكتمال بقية الأوراق، لا يمكن معالجة الطلب إلا بعد تقديم النسخة.',
    'Was fehlt für die Bearbeitung des Antrags?',
    ['نسخة من عقد الإيجار', 'صورة شخصية جديدة', 'إيصال تذكرة السفر'],
    'Bitte reichen Sie den Antrag bis zum fünfzehnten Juni ein.',
    'Bis wann soll der Antrag eingereicht werden?',
    ['حتى الخامس عشر من يونيو', 'حتى الخامس من يوليو', 'حتى نهاية أغسطس']
  ),
  'b1-society-1': makeLesson(
    'In der Umfrage sprechen sich viele Bewohner für mehr Grünflächen aus. Sie wünschen sich Bäume und Sitzplätze, aber auch sichere Wege für Kinder. Die Stadt will die Vorschläge im nächsten Monat prüfen.',
    'في الاستطلاع يؤيد كثير من السكان زيادة المساحات الخضراء. يريدون أشجاراً ومقاعد، وكذلك طرقاً آمنة للأطفال. وتعتزم المدينة دراسة المقترحات الشهر المقبل.',
    'Was möchte die Stadt tun?',
    ['دراسة المقترحات الشهر المقبل', 'إغلاق الحدائق', 'زيادة مواقف السيارات فقط'],
    'Die Umfrage zeigt, dass viele Bürger den neuen Park unterstützen.',
    'Was zeigt die Umfrage?',
    ['أن كثيراً من السكان يؤيدون الحديقة الجديدة', 'أن الحديقة ستغلق', 'أن السكان يريدون طريقاً سريعاً']
  ),
  'b1-society-2': makeLesson(
    'Digitale Lernplattformen bieten Lernenden mehr Flexibilität. Sie können Inhalte wiederholen und in ihrem eigenen Tempo arbeiten. Gleichzeitig brauchen sie klare Ziele, damit sie regelmäßig lernen.',
    'تمنح منصات التعلم الرقمية المتعلمين مرونة أكبر. يمكنهم مراجعة المحتوى والعمل بالسرعة التي تناسبهم. وفي الوقت نفسه يحتاجون إلى أهداف واضحة كي يتعلموا بانتظام.',
    'Was hilft Lernenden laut Text, regelmäßig zu lernen?',
    ['أهداف واضحة', 'دروس أطول دائماً', 'إلغاء المراجعة'],
    'Die Daten werden verschlüsselt gespeichert, damit persönliche Informationen geschützt bleiben.',
    'Warum werden die Daten verschlüsselt?',
    ['لحماية المعلومات الشخصية', 'لإرسال إعلانات أكثر', 'لتقليل مساحة الشاشة']
  ),
  'b1-society-3': makeLesson(
    'Ein Bericht über den öffentlichen Verkehr nennt zwei Vorteile: Weniger Autos bedeuten sauberere Luft, und Busse verbinden auch Stadtteile ohne Bahnanschluss. Dafür müssen die Fahrpläne zuverlässig sein.',
    'يذكر تقرير عن النقل العام ميزتين: السيارات الأقل تعني هواءً أنظف، والحافلات تربط أيضاً الأحياء التي لا تصلها القطارات. لكن يجب أن تكون الجداول موثوقة.',
    'Welche Bedingung nennt der Bericht?',
    ['أن تكون مواعيد الحافلات موثوقة', 'أن تكون كل الرحلات مجانية', 'أن تسير الحافلات ليلاً فقط'],
    'Die neue Buslinie verbindet drei Stadtteile mit dem Bahnhof.',
    'Was verbindet die neue Buslinie?',
    ['ثلاثة أحياء بمحطة القطار', 'مدرستين بالمطار', 'المدينة بالبحر']
  )
};

export const curriculumOutputPrompts = {
  'a1-intro-1': { minWords: 4, writingPrompt: 'اكتب أربع جمل تعرف فيها بنفسك: اسمك، بلدك، مدينتك، وما تتعلمه.', writingExample: 'Ich heiße Lina. Ich komme aus Ägypten. Ich wohne in Hamburg. Ich lerne Deutsch.', speakingRole: 'تعرّف إلى زميل جديد في دورة اللغة، وقل له اسمك وبلدك ومدينتك.', speakingStarters: ['Hallo, ich heiße ...', 'Ich komme aus ...', 'Ich wohne in ...'] },
  'a1-intro-2': { minWords: 4, writingPrompt: 'اكتب أربع جمل عن شخصين من عائلتك وأعمارهم أو أعمالهم.', writingExample: 'Das ist meine Mutter. Sie heißt Mona. Mein Bruder ist zwanzig Jahre alt. Er arbeitet in einem Café.', speakingRole: 'تحدث إلى زميلك عن أفراد عائلتك وأحد الأشياء التي تفعلونها معاً.', speakingStarters: ['Das ist meine Familie.', 'Meine Mutter heißt ...', 'Wir ... zusammen.'] },
  'a1-daily-1': { minWords: 4, writingPrompt: 'اكتب أربع جمل بسيطة عن روتين يومك مع وقتين على الأقل.', writingExample: 'Ich stehe um sieben Uhr auf. Ich frühstücke um halb acht. Dann fahre ich zur Arbeit. Am Abend koche ich.', speakingRole: 'أخبر زميلك كيف يبدأ يومك ومتى تذهب إلى العمل أو الدراسة.', speakingStarters: ['Ich stehe um ... auf.', 'Dann ...', 'Am Abend ...'] },
  'a1-daily-2': { minWords: 4, writingPrompt: 'اكتب طلباً قصيراً في مقهى: اطلب مشروباً ووجبة واسأل عن السعر.', writingExample: 'Guten Tag. Ich möchte einen Tee und eine Suppe, bitte. Was kostet das?', speakingRole: 'مثّل حواراً قصيراً مع موظف مقهى واطلب طعاماً وشراباً بأدب.', speakingStarters: ['Ich möchte ..., bitte.', 'Haben Sie ...?', 'Was kostet ...?'] },
  'a1-around-1': { minWords: 4, writingPrompt: 'اكتب أربع جمل تصف غرفتك ومكان شيئين فيها.', writingExample: 'Mein Zimmer ist klein. Das Bett steht neben dem Fenster. Die Bücher liegen auf dem Tisch.', speakingRole: 'صف غرفتك لزميلك واذكر مكان الأثاث والأشياء.', speakingStarters: ['Mein Zimmer ist ...', 'Das Bett steht ...', 'Auf dem Tisch liegt ...'] },
  'a1-around-2': { minWords: 4, writingPrompt: 'اكتب تعليمات قصيرة من ثلاث خطوات لمساعدة زائر على الوصول لمكان قريب.', writingExample: 'Gehen Sie geradeaus. Dann gehen Sie nach links. Die Apotheke ist neben dem Bahnhof.', speakingRole: 'أجب عن زائر يسأل عن الطريق إلى الصيدلية أو محطة القطار.', speakingStarters: ['Gehen Sie ...', 'Dann ...', 'Der ... ist neben ...'] },
  'a1-around-3': { minWords: 4, writingPrompt: 'اكتب كيف تذهب من منزلك إلى مكان تحبه، واذكر وسيلة النقل ومحطة النزول.', writingExample: 'Ich fahre mit dem Bus ins Zentrum. Ich steige an der dritten Haltestelle aus.', speakingRole: 'أخبر زميلك عن وسيلة النقل التي تستخدمها وأين تنزل.', speakingStarters: ['Ich fahre mit ...', 'Ich steige an ... aus.', 'Danach gehe ich ...'] },
  'a2-communicate-1': { minWords: 6, writingPrompt: 'اكتب رسالة قصيرة لطلب موعد واقترح يوماً بديلاً مع سبب.', writingExample: 'Guten Tag, ich brauche einen Termin. Am Dienstag kann ich nicht, weil ich arbeite. Wäre Donnerstag möglich?', speakingRole: 'اتصل بعيادة لطلب موعد، ثم اقترح يوماً آخر إذا لم يناسبك الموعد الأول.', speakingStarters: ['Ich möchte einen Termin vereinbaren.', 'Am ... kann ich leider nicht.', 'Wäre ... möglich?'] },
  'a2-communicate-2': { minWords: 6, writingPrompt: 'اكتب رسالة مهذبة تعتذر فيها عن الغياب وتشرح السبب وتذكر ما ستفعله.', writingExample: 'Sehr geehrte Frau Roth, ich kann heute nicht kommen, weil mein Sohn krank ist. Die Aufgabe mache ich zu Hause. Mit freundlichen Grüßen, Amal.', speakingRole: 'اشرح لمعلمك أو مسؤول التسجيل أنك ستتأخر أو ستغيب، واطلب المعلومات التي تحتاجها.', speakingStarters: ['Guten Tag, ich kann heute ...', 'Der Grund ist ...', 'Könnten Sie mir bitte ...?'] },
  'a2-work-1': { minWords: 6, writingPrompt: 'اكتب وصفاً قصيراً لمهمتين تقوم بهما في عمل أو تدريب.', writingExample: 'Ich arbeite in einer Bäckerei. Ich bereite Brot vor und bediene die Kasse. Meine Kollegin hilft mir.', speakingRole: 'تحدث مع زميل عمل جديد، واشرح له مهامك اليومية واسأله عن مهمة.', speakingStarters: ['Ich bin für ... zuständig.', 'Zuerst ...', 'Können Sie mir zeigen, wie ...?'] },
  'a2-work-2': { minWords: 6, writingPrompt: 'اكتب مقارنة بين خيارين للشراء واختر أحدهما مع ذكر السبب والسعر.', writingExample: 'Die kleine Tasche kostet zwölf Euro. Die große Tasche ist teurer, aber sie bietet mehr Platz. Ich nehme die große Tasche.', speakingRole: 'ناقش مع البائع خيارين، واسأل عن السعر واختر الأنسب لاحتياجك.', speakingStarters: ['Wie viel kostet ...?', 'Die ... ist günstiger als ...', 'Ich nehme ..., weil ...'] },
  'a2-life-1': { minWords: 6, writingPrompt: 'اكتب رسالة للعيادة تشرح عرضاً صحياً وتطلب موعداً.', writingExample: 'Guten Tag, ich habe seit gestern Kopfschmerzen und brauche einen Termin. Ist heute Nachmittag etwas frei?', speakingRole: 'اشرح لموظف العيادة عرضاً صحياً واذكر متى بدأ.', speakingStarters: ['Ich habe seit ...', 'Die Schmerzen sind ...', 'Haben Sie heute einen Termin frei?'] },
  'a2-life-2': { minWords: 6, writingPrompt: 'اكتب خطة رحلة قصيرة: الوجهة، وسيلة النقل، وما حجزته.', writingExample: 'Am Samstag fahre ich nach Dresden. Ich nehme den Zug und habe das Ticket online gekauft. Das Hotel liegt nahe am Bahnhof.', speakingRole: 'أخبر صديقك بخطة رحلتك واسأله عن نصيحة حول المواصلات أو الفندق.', speakingStarters: ['Ich fahre am ... nach ...', 'Ich reise mit ...', 'Kannst du ... empfehlen?'] },
  'a2-life-3': { minWords: 6, writingPrompt: 'اكتب ثلاث نصائح عملية لتقليل النفايات أو توفير الطاقة في المنزل.', writingExample: 'Wir trennen Papier und Glas. Ich schalte das Licht aus, wenn ich den Raum verlasse. Außerdem benutze ich eine Trinkflasche.', speakingRole: 'ناقش مع زميلك عادة صديقة للبيئة تقوم بها، واقترح عادة أخرى.', speakingStarters: ['Bei mir zu Hause ...', 'Man sollte ...', 'Außerdem können wir ...'] },
  'b1-argument-1': { minWords: 8, writingPrompt: 'اكتب فقرة قصيرة عن استخدام الدراجة أو النقل العام، واذكر ميزة وعيباً ورأيك.', writingExample: 'Meiner Meinung nach ist das Fahrrad eine gute Möglichkeit, zur Arbeit zu fahren. Man spart Geld und bewegt sich mehr. Obwohl der Weg manchmal länger ist, würde ich sichere Radwege nutzen.', speakingRole: 'ناقش مع زميلك وسيلة التنقل إلى العمل، وادعم رأيك بسبب ومثال.', speakingStarters: ['Meiner Meinung nach ...', 'Ein Vorteil ist ..., weil ...', 'Andererseits ...'] },
  'b1-argument-2': { minWords: 8, writingPrompt: 'اكتب عن موقف واجهت فيه تحدياً، وما تعلمته والخطوة التي ستتخذها.', writingExample: 'Als ich eine Absage bekam, war ich enttäuscht. Trotzdem bat ich um eine Rückmeldung. Dadurch erkannte ich, welche Erfahrung mir noch fehlte.', speakingRole: 'ناقش مع صديق كيف يمكن الاستفادة من تجربة صعبة أو ملاحظة نقدية.', speakingStarters: ['Zuerst dachte ich ..., aber ...', 'Die Erfahrung hat mir gezeigt, dass ...', 'Als nächsten Schritt ...'] },
  'b1-work-1': { minWords: 8, writingPrompt: 'اكتب ملخصاً قصيراً عن طريقة توزيع المهام وحل مشكلة في فريق عمل.', writingExample: 'In unserem Team werden die Aufgaben am Montag verteilt. Wenn eine Frage offen ist, sprechen wir darüber. So können Probleme früh gelöst werden.', speakingRole: 'اقترح على فريقك طريقة واضحة لتوزيع المهام ومتابعة الأسئلة المفتوحة.', speakingStarters: ['Ich schlage vor, dass ...', 'Die Aufgaben könnten ...', 'Dadurch können wir ...'] },
  'b1-work-2': { minWords: 8, writingPrompt: 'اكتب رسالة متابعة رسمية بعد مقابلة عمل، مع الشكر والسؤال عن الخطوة التالية.', writingExample: 'Sehr geehrte Frau Weber, vielen Dank für das freundliche Gespräch. Die Stelle interessiert mich sehr. Könnten Sie mir bitte mitteilen, wann Sie eine Entscheidung treffen? Mit freundlichen Grüßen', speakingRole: 'تدرب على شرح خبرتك في مقابلة عمل، ثم اسأل عن الخطوات التالية.', speakingStarters: ['In meiner letzten Stelle war ich für ... zuständig.', 'Besonders wichtig war ...', 'Wie sieht der nächste Schritt aus?'] },
  'b1-work-3': { minWords: 8, writingPrompt: 'اكتب رسالة رسمية إلى جهة حكومية تسأل فيها عن مستند ناقص أو موعد تسليم.', writingExample: 'Sehr geehrte Damen und Herren, ich habe meinen Antrag eingereicht. Könnten Sie mir bitte mitteilen, welche Unterlage noch fehlt und bis wann ich sie nachreichen kann? Mit freundlichen Grüßen', speakingRole: 'تحدث مع موظف دائرة حكومية واسأل بأدب عن المستند المطلوب والمهلة.', speakingStarters: ['Ich habe eine Frage zu meinem Antrag.', 'Welche Unterlage fehlt noch?', 'Bis wann muss ich ... einreichen?'] },
  'b1-society-1': { minWords: 8, writingPrompt: 'اكتب اقتراحاً لتحسين حيّك، مع سببين وفائدة متوقعة للسكان.', writingExample: 'Die Stadt sollte mehr Bäume pflanzen und sichere Wege bauen. Dadurch könnten Kinder selbstständiger unterwegs sein und die Luft würde sauberer.', speakingRole: 'شارك في اجتماع سكان واقترح تحسيناً للحي ورد على رأي مختلف.', speakingStarters: ['Ich würde vorschlagen, dass ...', 'Ein Vorteil wäre ...', 'Ich verstehe den Einwand, trotzdem ...'] },
  'b1-society-2': { minWords: 8, writingPrompt: 'اكتب رأيك في التعلم الرقمي، مع فائدة وتحدٍ وطريقة للتغلب عليه.', writingExample: 'Digitale Lernplattformen sind flexibel, weil man Inhalte wiederholen kann. Gleichzeitig braucht man klare Ziele. Ein Wochenplan kann helfen, regelmäßig zu lernen.', speakingRole: 'ناقش مع زميلك فوائد وتحديات استخدام منصة رقمية لتعلم اللغة.', speakingStarters: ['Ein Vorteil digitaler Angebote ist ...', 'Eine Schwierigkeit besteht darin, dass ...', 'Das lässt sich lösen, indem ...'] },
  'b1-society-3': { minWords: 8, writingPrompt: 'لخص فائدة للنقل العام وتحدياً واحداً، ثم اقترح تحسيناً.', writingExample: 'Öffentliche Verkehrsmittel verbinden viele Stadtteile und können die Zahl der Autos reduzieren. Damit sie zuverlässiger werden, sollten Fahrpläne besser abgestimmt sein.', speakingRole: 'ناقش مشكلة مواصلات في مدينتك واقترح على مجموعة حلين ممكنين.', speakingStarters: ['Ein Problem ist, dass ...', 'Eine Möglichkeit wäre ...', 'Langfristig könnte ...'] }
};
