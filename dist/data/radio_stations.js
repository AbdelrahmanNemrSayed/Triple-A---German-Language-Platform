// data/radio_stations.js
// محطات الراديو الألمانية الحية والأخبار الصوتية للمتعلمين - منصة Triple A PRO

export const RADIO_STATIONS_DATA = [
  {
    id: 'station_dlf_nova',
    name: 'Deutschlandfunk Nova',
    tagline: 'Es ist kompliziert. Dazu gibt es uns.',
    genre: 'حوارات شبابية، ثقافة، علوم ولغة حديثة واضحة',
    badge: 'الأعلى تقييماً للمتعلمين',
    city: 'Köln / Berlin',
    streamUrl: 'https://st03.sslstream.dlf.de/dlf/03/128/mp3/stream.mp3',
    logoIcon: 'fa-solid fa-tower-broadcast',
    themeColor: '#e05a47'
  },
  {
    id: 'station_ndr_info',
    name: 'NDR Info',
    tagline: 'Das Informationsradio der ARD',
    genre: 'أخبار ألمانيا والعالم المتواصلة بنطق فصيح وواضح جداً (Hochdeutsch)',
    badge: 'أخبار 24/7 متواصلة',
    city: 'Hamburg',
    streamUrl: 'https://icecast.ndr.de/ndr/ndrinfo/hamburg/mp3/128/stream.mp3',
    logoIcon: 'fa-solid fa-newspaper',
    themeColor: '#0275d8'
  },
  {
    id: 'station_dlf',
    name: 'Deutschlandfunk',
    tagline: 'Hintergrund, Kultur und Politik',
    genre: 'الإذاعة الإخبارية والسياسية الوطنية الأولى بنطق ألماني معياري نقي',
    badge: 'إذاعة ألمانيا الإخبارية الأولى',
    city: 'Köln / Berlin',
    streamUrl: 'https://st01.sslstream.dlf.de/dlf/01/128/mp3/stream.mp3',
    logoIcon: 'fa-solid fa-landmark',
    themeColor: '#10b981'
  },
  {
    id: 'station_wdr_cosmo',
    name: 'WDR Cosmo',
    tagline: 'Global Sounds & Perspectives',
    genre: 'حوارات ثقافية وموسيقى عالمية وأسلوب حياة ألماني عصري',
    badge: 'ثقافة وموسيقى عصرية',
    city: 'Köln',
    streamUrl: 'https://wdr-cosmo-live.icecastssl.wdr.de/wdr/cosmo/live/mp3/128/stream.mp3',
    logoIcon: 'fa-solid fa-music',
    themeColor: '#e67e22'
  },
  {
    id: 'station_antenne_bayern',
    name: 'Antenne Bayern',
    tagline: 'Wir lieben Bayern. Wir lieben die Hits.',
    genre: 'أغاني ألمانية وعالمية وبرامج صباحية حيوية',
    badge: 'ترفيه وموسيقى يومية',
    city: 'München',
    streamUrl: 'https://stream.antenne.de/antenne/stream/mp3',
    logoIcon: 'fa-solid fa-radio',
    themeColor: '#27ae60'
  }
];

export const SLOW_LISTENING_PRACTICE = [
  {
    id: 'slow_01',
    title: 'Wetterbericht für Deutschland (نشرة الطقس)',
    level: 'A1 / A2',
    topic: 'الطقس والمناخ',
    duration: '45 Sek.',
    textDe: 'Guten Tag zum Wetterbericht. In ganz Deutschland ist es heute sonnig und warm. Im Norden liegen die Temperaturen bei 22 Grad, im Süden erreichen wir bis zu 27 Grad. Morgen gibt es im Westen leichte Regenschauer, aber es bleibt angenehm mild.',
    textAr: 'طاب يومكم مع نشرة الطقس. يسود اليوم طقس مشمس ودافئ في جميع أنحاء ألمانيا. في الشمال تسجل درجات الحرارة قرابة 22 درجة، وفي الجنوب نصل حتى 27 درجة. غداً ستهطل زخات مطر خفيفة في الغرب، لكن الطقس سيبقى معتدلاً ولطيفاً.'
  },
  {
    id: 'slow_02',
    title: 'Im Café bestellen (الطلب في المقهى)',
    level: 'A1',
    topic: 'محادثة يومية',
    duration: '50 Sek.',
    textDe: 'Guten Morgen! Ich hätte gerne einen großen Cappuccino und ein Stück Apfelkuchen, bitte. Haben Sie auch laktosefreie Milch? Ja gerne, mit Hafermilch. Was kostet das zusammen? Das macht 6 Euro 50. Hier sind 10 Euro, das stimmt so, vielen Dank!',
    textAr: 'صباح الخير! أود الحصول على كابتشينو كبير وقطعة من كعكة التفاح من فضلك. هل لديكم حليب خالي من اللاكتوز؟ نعم بكل سرور، مع حليب الشوفان. كم الحساب الإجمالي؟ 6 يورو و50 سنتاً. تفضل 10 يورو واحتفظ بالباقي، شكراً جزيلاً!'
  },
  {
    id: 'slow_03',
    title: 'Bewerbung und Vorstellungsgespräch (المقابلة الشخصية)',
    level: 'B1',
    topic: 'العمل والحياة المهنية',
    duration: '60 Sek.',
    textDe: 'Sehr geehrte Damen und Herren, ich freue mich sehr über die Einladung zum Vorstellungsgespräch. Ich habe meine Ausbildung erfolgreich abgeschlossen und bereits zwei Jahre Berufserfahrung im Bereich IT gesammelt. Ich möchte meine Deutschkenntnisse im Berufsalltag vertiefen und mein Team engagiert unterstützen.',
    textAr: 'سيداتي وسادتي المحترمين، يسعدني كثيراً حضور هذه المقابلة الشخصية. لقد أتممت تدريبي المهني بنجاح واكتسبت بالفعل خبرة عملية لمدة عامين في مجال تكنولوجيا المعلومات. أرغب في تعميق مهاراتي باللغة الألمانية في بيئة العمل اليومية ودعم فريقي بكل حماس.'
  }
];
