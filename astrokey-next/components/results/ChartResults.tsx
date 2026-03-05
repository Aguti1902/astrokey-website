'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import LocaleLink from '@/components/ui/LocaleLink'
import { motion } from 'framer-motion'
import {
  CheckCircle, Sparkles, Calendar, MapPin, Mail,
  Sun, Moon, ArrowUpRight, Flame, Home, Globe,
  Star, Download, Share2, Zap, Eye, Heart,
  TrendingUp, Shield, Clock, Compass,
  BarChart3, Users, BookOpen, Lightbulb,
} from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { useT } from '@/lib/i18n'

// ─── Colores y datos estáticos por signo (no necesitan traducción) ────────────
const signData: Record<string, { color: string }> = {
  Aries: { color: 'from-red-500 to-orange-500' },
  Tauro: { color: 'from-emerald-500 to-green-600' },
  Géminis: { color: 'from-yellow-400 to-amber-500' },
  Cáncer: { color: 'from-sky-400 to-blue-500' },
  Leo: { color: 'from-orange-400 to-yellow-500' },
  Virgo: { color: 'from-lime-500 to-emerald-500' },
  Libra: { color: 'from-pink-400 to-rose-500' },
  Escorpio: { color: 'from-purple-600 to-violet-700' },
  Sagitario: { color: 'from-violet-500 to-purple-600' },
  Capricornio: { color: 'from-slate-500 to-gray-600' },
  Acuario: { color: 'from-cyan-400 to-sky-500' },
  Piscis: { color: 'from-indigo-400 to-violet-500' },
}

// Rasgos por signo (traducidos por idioma)
const signTraitsByLang: Record<string, Record<string, string[]>> = {
  es: { Aries: ['Valiente','Impulsivo','Líder'], Tauro: ['Estable','Leal','Sensual'], Géminis: ['Curioso','Adaptable','Comunicativo'], Cáncer: ['Intuitivo','Protector','Sensible'], Leo: ['Carismático','Generoso','Creativo'], Virgo: ['Analítico','Perfeccionista','Servicial'], Libra: ['Diplomático','Justo','Estético'], Escorpio: ['Intenso','Misterioso','Transformador'], Sagitario: ['Aventurero','Optimista','Filosófico'], Capricornio: ['Ambicioso','Disciplinado','Responsable'], Acuario: ['Innovador','Humanitario','Independiente'], Piscis: ['Empático','Artístico','Espiritual'] },
  en: { Aries: ['Brave','Impulsive','Leader'], Tauro: ['Stable','Loyal','Sensual'], Géminis: ['Curious','Adaptable','Communicative'], Cáncer: ['Intuitive','Protective','Sensitive'], Leo: ['Charismatic','Generous','Creative'], Virgo: ['Analytical','Perfectionist','Helpful'], Libra: ['Diplomatic','Fair','Aesthetic'], Escorpio: ['Intense','Mysterious','Transformative'], Sagitario: ['Adventurous','Optimistic','Philosophical'], Capricornio: ['Ambitious','Disciplined','Responsible'], Acuario: ['Innovative','Humanitarian','Independent'], Piscis: ['Empathetic','Artistic','Spiritual'] },
  fr: { Aries: ['Courageux','Impulsif','Leader'], Tauro: ['Stable','Loyal','Sensuel'], Géminis: ['Curieux','Adaptable','Communicatif'], Cáncer: ['Intuitif','Protecteur','Sensible'], Leo: ['Charismatique','Généreux','Créatif'], Virgo: ['Analytique','Perfectionniste','Serviable'], Libra: ['Diplomatique','Juste','Esthétique'], Escorpio: ['Intense','Mystérieux','Transformateur'], Sagitario: ['Aventurier','Optimiste','Philosophique'], Capricornio: ['Ambitieux','Discipliné','Responsable'], Acuario: ['Innovant','Humanitaire','Indépendant'], Piscis: ['Empathique','Artistique','Spirituel'] },
  de: { Aries: ['Mutig','Impulsiv','Führend'], Tauro: ['Stabil','Loyal','Sinnlich'], Géminis: ['Neugierig','Anpassungsfähig','Kommunikativ'], Cáncer: ['Intuitiv','Schützend','Sensibel'], Leo: ['Charismatisch','Großzügig','Kreativ'], Virgo: ['Analytisch','Perfektionist','Hilfsbereit'], Libra: ['Diplomatisch','Gerecht','Ästhetisch'], Escorpio: ['Intensiv','Geheimnisvoll','Transformierend'], Sagitario: ['Abenteuerlustig','Optimistisch','Philosophisch'], Capricornio: ['Ehrgeizig','Diszipliniert','Verantwortungsbewusst'], Acuario: ['Innovativ','Humanitär','Unabhängig'], Piscis: ['Empathisch','Künstlerisch','Spirituell'] },
  it: { Aries: ['Coraggioso','Impulsivo','Leader'], Tauro: ['Stabile','Leale','Sensuale'], Géminis: ['Curioso','Adattabile','Comunicativo'], Cáncer: ['Intuitivo','Protettivo','Sensibile'], Leo: ['Carismatico','Generoso','Creativo'], Virgo: ['Analitico','Perfezionista','Premuroso'], Libra: ['Diplomatico','Giusto','Estetico'], Escorpio: ['Intenso','Misterioso','Trasformativo'], Sagitario: ['Avventuroso','Ottimista','Filosofico'], Capricornio: ['Ambizioso','Disciplinato','Responsabile'], Acuario: ['Innovativo','Umanitario','Indipendente'], Piscis: ['Empatico','Artistico','Spirituale'] },
  uk: { Aries: ['Хоробрий','Імпульсивний','Лідер'], Tauro: ['Стабільний','Відданий','Чуттєвий'], Géminis: ['Цікавий','Гнучкий','Комунікабельний'], Cáncer: ['Інтуїтивний','Захисний','Чутливий'], Leo: ['Харизматичний','Щедрий','Творчий'], Virgo: ['Аналітичний','Перфекціоніст','Корисний'], Libra: ['Дипломатичний','Справедливий','Естетичний'], Escorpio: ['Інтенсивний','Таємничий','Трансформуючий'], Sagitario: ['Пригодницький','Оптимістичний','Філософський'], Capricornio: ['Амбіційний','Дисциплінований','Відповідальний'], Acuario: ['Інноваційний','Гуманітарний','Незалежний'], Piscis: ['Емпатичний','Артистичний','Духовний'] },
  ru: { Aries: ['Храбрый','Импульсивный','Лидер'], Tauro: ['Стабильный','Лояльный','Чувственный'], Géminis: ['Любопытный','Адаптивный','Коммуникабельный'], Cáncer: ['Интуитивный','Защитный','Чувствительный'], Leo: ['Харизматичный','Щедрый','Творческий'], Virgo: ['Аналитический','Перфекционист','Полезный'], Libra: ['Дипломатичный','Справедливый','Эстетичный'], Escorpio: ['Интенсивный','Таинственный','Трансформирующий'], Sagitario: ['Авантюрный','Оптимистичный','Философский'], Capricornio: ['Амбициозный','Дисциплинированный','Ответственный'], Acuario: ['Инновационный','Гуманитарный','Независимый'], Piscis: ['Эмпатичный','Художественный','Духовный'] },
}

// Extras por idioma
const extraTraitsByLang: Record<string, string[]> = {
  es: ['Intuitivo', 'Determinado', 'Carismático'],
  en: ['Intuitive', 'Determined', 'Charismatic'],
  fr: ['Intuitif', 'Déterminé', 'Charismatique'],
  de: ['Intuitiv', 'Entschlossen', 'Charismatisch'],
  it: ['Intuitivo', 'Determinato', 'Carismatico'],
  uk: ['Інтуїтивний', 'Рішучий', 'Харизматичний'],
  ru: ['Интуитивный', 'Решительный', 'Харизматичный'],
}

// Días y colores por idioma
const luckyColorsByLang: Record<string, string[]> = {
  es: ['Violeta', 'Azul índigo', 'Dorado', 'Blanco perla'],
  en: ['Violet', 'Indigo Blue', 'Gold', 'Pearl White'],
  fr: ['Violet', 'Bleu indigo', 'Doré', 'Blanc nacré'],
  de: ['Violett', 'Indigoblau', 'Gold', 'Perlweiß'],
  it: ['Viola', 'Blu indaco', 'Dorato', 'Bianco perla'],
  uk: ['Фіолетовий', 'Індиго', 'Золотий', 'Перлово-білий'],
  ru: ['Фиолетовый', 'Индиго', 'Золотой', 'Жемчужно-белый'],
}

const luckyDaysByLang: Record<string, string[]> = {
  es: ['Martes', 'Viernes', 'Domingo'],
  en: ['Tuesday', 'Friday', 'Sunday'],
  fr: ['Mardi', 'Vendredi', 'Dimanche'],
  de: ['Dienstag', 'Freitag', 'Sonntag'],
  it: ['Martedì', 'Venerdì', 'Domenica'],
  uk: ['Вівторок', 'П\'ятниця', 'Неділя'],
  ru: ['Вторник', 'Пятница', 'Воскресенье'],
}

// Interpretaciones por idioma
const interpByLang: Record<string, { title: string; content: string }[]> = {
  es: [
    { title: 'Tu Esencia Fundamental', content: 'Eres una persona con una naturaleza dinámica y carismática que destaca en cualquier entorno. Tu energía natural te impulsa a tomar acción inmediata y liderar situaciones con confianza. Posees una determinación inquebrantable y la capacidad de superar obstáculos que para otros serían insuperables.' },
    { title: 'Tu Elemento Dominante', content: 'Tu elemento dominante se manifiesta en todos los aspectos de tu vida, confiriéndote pasión intensa por todo lo que haces. Esta energía te permite transformar ideas en realidad con velocidad y eficiencia admirables.' },
    { title: 'Tu Ascendente y Presentación', content: 'Tu ascendente te convierte en una persona naturalmente diplomática y socialmente hábil. Tienes un don innato para leer las dinámicas sociales y adaptarte a diferentes entornos con gracia y elegancia.' },
    { title: 'Tu Mundo Emocional', content: 'Posees una intuición extraordinariamente desarrollada que te permite percibir las emociones de otros. Tu memoria emocional es excepcional, y tu hogar es tu santuario donde recargas tus energías.' },
    { title: 'Tu Casa Astrológica', content: 'Tu propósito en esta vida está fuertemente ligado a tu identidad personal y a cómo te presentas al mundo. Estás destinado a ser un ejemplo para otros, mostrando el camino a través de tu propia evolución.' },
    { title: 'Tu Planeta Dominante', content: 'Tu planeta rector actúa como el director de orquesta de tu energía vital. Sus tránsitos y posiciones influyen directamente en tus ciclos de actividad, descanso, inspiración y acción.' },
    { title: 'Nodos Lunares y Destino', content: 'Tus nodos lunares son la brújula cósmica que señala la dirección de tu evolución. El Nodo Norte representa tu camino de crecimiento y los talentos que debes desarrollar.' },
    { title: 'Integración y Síntesis', content: 'La verdadera magia de tu carta astral reside en cómo todos estos elementos se integran para crear una personalidad única. Tu desafío y oportunidad es honrar todas estas partes de ti mismo.' },
  ],
  en: [
    { title: 'Your Core Essence', content: 'You are a person with a dynamic and charismatic nature that stands out in any environment. Your natural energy drives you to take immediate action and lead situations with confidence.' },
    { title: 'Your Dominant Element', content: 'Your dominant element manifests in all aspects of your life, conferring intense passion for everything you do. This energy allows you to transform ideas into reality with admirable speed.' },
    { title: 'Your Ascendant & Presentation', content: 'Your ascendant makes you a naturally diplomatic and socially skilled person. You have an innate gift for reading social dynamics and adapting to different environments with grace.' },
    { title: 'Your Emotional World', content: 'You possess an extraordinarily developed intuition that allows you to perceive others\' emotions. Your emotional memory is exceptional, and your home is your sanctuary where you recharge.' },
    { title: 'Your Astrological House', content: 'Your purpose in this life is strongly linked to your personal identity and how you present yourself to the world. You are destined to be an example for others.' },
    { title: 'Your Ruling Planet', content: 'Your ruling planet acts as the conductor of your vital energy. Its transits and positions directly influence your cycles of activity, rest, inspiration and action.' },
    { title: 'Lunar Nodes & Destiny', content: 'Your lunar nodes are the cosmic compass that points the direction of your evolution. The North Node represents your path of growth and the talents you must develop.' },
    { title: 'Integration & Synthesis', content: 'The true magic of your birth chart lies in how all these elements integrate to create a unique personality. Your challenge and opportunity is to honor all these parts of yourself.' },
  ],
  fr: [
    { title: 'Votre Essence Fondamentale', content: 'Vous êtes une personne à la nature dynamique et charismatique qui se distingue dans n\'importe quel environnement. Votre énergie naturelle vous pousse à agir immédiatement et à diriger avec confiance.' },
    { title: 'Votre Élément Dominant', content: 'Votre élément dominant se manifeste dans tous les aspects de votre vie, vous conférant une passion intense pour tout ce que vous faites. Cette énergie vous permet de transformer les idées en réalité.' },
    { title: 'Votre Ascendant & Présentation', content: 'Votre ascendant fait de vous une personne naturellement diplomate et socialement habile. Vous avez un don inné pour lire les dynamiques sociales et vous adapter à différents environnements.' },
    { title: 'Votre Monde Émotionnel', content: 'Vous possédez une intuition extraordinairement développée qui vous permet de percevoir les émotions des autres. Votre mémoire émotionnelle est exceptionnelle.' },
    { title: 'Votre Maison Astrologique', content: 'Votre but dans cette vie est fortement lié à votre identité personnelle et à la façon dont vous vous présentez au monde. Vous êtes destiné à être un exemple pour les autres.' },
    { title: 'Votre Planète Dominante', content: 'Votre planète directrice agit comme le chef d\'orchestre de votre énergie vitale. Ses transits et positions influencent directement vos cycles d\'activité et d\'inspiration.' },
    { title: 'Noeuds Lunaires & Destin', content: 'Vos nœuds lunaires sont la boussole cosmique qui indique la direction de votre évolution. Le Nœud Nord représente votre chemin de croissance.' },
    { title: 'Intégration & Synthèse', content: 'La vraie magie de votre thème natal réside dans la façon dont tous ces éléments s\'intègrent pour créer une personnalité unique. Votre défi est d\'honorer toutes ces parties de vous-même.' },
  ],
  de: [
    { title: 'Deine Grundlegende Essenz', content: 'Du bist eine Person mit einer dynamischen und charismatischen Natur, die in jedem Umfeld hervorsticht. Deine natürliche Energie treibt dich dazu an, sofort zu handeln und mit Zuversicht zu führen.' },
    { title: 'Dein Dominantes Element', content: 'Dein dominantes Element manifestiert sich in allen Aspekten deines Lebens und verleiht dir intensive Leidenschaft für alles, was du tust. Diese Energie ermöglicht es dir, Ideen in die Realität umzusetzen.' },
    { title: 'Dein Aszendent & Präsentation', content: 'Dein Aszendent macht dich zu einer natürlich diplomatischen und sozial geschickten Person. Du hast ein angeborenes Talent dafür, soziale Dynamiken zu lesen und dich anzupassen.' },
    { title: 'Deine Emotionale Welt', content: 'Du besitzt eine außergewöhnlich entwickelte Intuition, die es dir ermöglicht, die Gefühle anderer wahrzunehmen. Dein emotionales Gedächtnis ist außergewöhnlich.' },
    { title: 'Dein Astrologisches Haus', content: 'Dein Zweck in diesem Leben ist stark mit deiner persönlichen Identität verbunden. Du bist dazu bestimmt, ein Beispiel für andere zu sein und deinen eigenen Weg der Entwicklung zu zeigen.' },
    { title: 'Dein Herrscherplanet', content: 'Dein Herrscherplanet agiert als Dirigent deiner Lebensenergie. Seine Transite und Positionen beeinflussen direkt deine Aktivitäts-, Ruhe- und Inspirationszyklen.' },
    { title: 'Mondknoten & Schicksal', content: 'Deine Mondknoten sind der kosmische Kompass, der die Richtung deiner Entwicklung zeigt. Der Nordknoten repräsentiert deinen Wachstumspfad.' },
    { title: 'Integration & Synthese', content: 'Die wahre Magie deines Geburtshoroskops liegt darin, wie sich all diese Elemente zu einer einzigartigen Persönlichkeit integrieren. Deine Herausforderung ist es, alle diese Teile von dir zu ehren.' },
  ],
  it: [
    { title: 'La Tua Essenza Fondamentale', content: 'Sei una persona dalla natura dinamica e carismatica che si distingue in qualsiasi ambiente. La tua energia naturale ti spinge ad agire immediatamente e a guidare con fiducia.' },
    { title: 'Il Tuo Elemento Dominante', content: 'Il tuo elemento dominante si manifesta in tutti gli aspetti della tua vita, conferendoti una passione intensa per tutto ciò che fai. Questa energia ti permette di trasformare le idee in realtà.' },
    { title: 'Il Tuo Ascendente & Presentazione', content: 'Il tuo ascendente ti rende una persona naturalmente diplomatica e socialmente abile. Hai un dono innato per leggere le dinamiche sociali e adattarti con grazia.' },
    { title: 'Il Tuo Mondo Emotivo', content: 'Possiedi un\'intuizione straordinariamente sviluppata che ti permette di percepire le emozioni degli altri. La tua memoria emotiva è eccezionale.' },
    { title: 'La Tua Casa Astrologica', content: 'Il tuo scopo in questa vita è fortemente legato alla tua identità personale. Sei destinato ad essere un esempio per gli altri, mostrando il cammino attraverso la tua evoluzione.' },
    { title: 'Il Tuo Pianeta Dominante', content: 'Il tuo pianeta reggente agisce come il direttore d\'orchestra della tua energia vitale. I suoi transiti e posizioni influenzano direttamente i tuoi cicli.' },
    { title: 'Nodi Lunari & Destino', content: 'I tuoi nodi lunari sono la bussola cosmica che indica la direzione della tua evoluzione. Il Nodo Nord rappresenta il tuo percorso di crescita.' },
    { title: 'Integrazione & Sintesi', content: 'La vera magia della tua carta natale risiede nel modo in cui tutti questi elementi si integrano per creare una personalità unica. La tua sfida è onorare tutte queste parti di te stesso.' },
  ],
  uk: [
    { title: 'Твоя Фундаментальна Суть', content: 'Ти людина з динамічною та харизматичною природою, яка виділяється в будь-якому середовищі. Твоя природна енергія спонукає тебе діяти негайно та впевнено вести за собою.' },
    { title: 'Твій Домінуючий Елемент', content: 'Твій домінуючий елемент проявляється у всіх аспектах твого життя, наділяючи тебе інтенсивною пристрастю до всього, що ти робиш.' },
    { title: 'Твій Висхідний і Презентація', content: 'Твій висхідний робить тебе природно дипломатичною та соціально вмілою людиною. У тебе є вроджений талант читати соціальну динаміку та адаптуватися з грацією.' },
    { title: 'Твій Емоційний Світ', content: 'Ти маєш надзвичайно розвинену інтуїцію, яка дозволяє тобі сприймати емоції інших. Твоя емоційна пам\'ять виняткова.' },
    { title: 'Твій Астрологічний Дім', content: 'Твоя мета в цьому житті тісно пов\'язана з твоєю особистою ідентичністю. Ти призначений бути прикладом для інших, показуючи шлях через власну еволюцію.' },
    { title: 'Твоя Правляча Планета', content: 'Твоя правляча планета діє як диригент твоєї життєвої енергії. Її транзити та позиції безпосередньо впливають на твої цикли активності та натхнення.' },
    { title: 'Місячні Вузли та Долg', content: 'Твої місячні вузли є космічним компасом, який вказує напрямок твоєї еволюції. Північний вузол представляє твій шлях зростання.' },
    { title: 'Інтеграція та Синтез', content: 'Справжня магія твоєї натальної карти полягає в тому, як всі ці елементи інтегруються для створення унікальної особистості. Твій виклик - шанувати всі ці частини себе.' },
  ],
  ru: [
    { title: 'Ваша Фундаментальная Суть', content: 'Вы человек с динамичной и харизматичной природой, который выделяется в любой среде. Ваша естественная энергия побуждает вас действовать немедленно и уверенно вести за собой.' },
    { title: 'Ваш Доминирующий Элемент', content: 'Ваш доминирующий элемент проявляется во всех аспектах вашей жизни, наделяя вас интенсивной страстью ко всему, что вы делаете.' },
    { title: 'Ваш Асцендент и Презентация', content: 'Ваш асцендент делает вас естественно дипломатичным и социально умелым человеком. У вас есть врождённый дар читать социальную динамику и адаптироваться с изяществом.' },
    { title: 'Ваш Эмоциональный Мир', content: 'Вы обладаете чрезвычайно развитой интуицией, позволяющей воспринимать эмоции других. Ваша эмоциональная память исключительна.' },
    { title: 'Ваш Астрологический Дом', content: 'Ваша цель в этой жизни тесно связана с вашей личной идентичностью. Вы предназначены быть примером для других, показывая путь через собственную эволюцию.' },
    { title: 'Ваша Управляющая Планета', content: 'Ваша управляющая планета действует как дирижёр вашей жизненной энергии. Её транзиты и позиции напрямую влияют на ваши циклы активности и вдохновения.' },
    { title: 'Лунные Узлы и Судьба', content: 'Ваши лунные узлы — это космический компас, указывающий направление вашей эволюции. Северный узел представляет ваш путь роста.' },
    { title: 'Интеграция и Синтез', content: 'Настоящая магия вашей натальной карты в том, как все эти элементы интегрируются для создания уникальной личности. Ваш вызов — чтить все эти части себя.' },
  ],
}

const interpIcons = [Sun, Flame, ArrowUpRight, Moon, Home, Globe, Compass, Star]
const interpColors = ['text-amber-400', 'text-orange-400', 'text-primary-400', 'text-indigo-400', 'text-emerald-400', 'text-violet-400', 'text-pink-400', 'text-accent-400']

// Predicciones por idioma
const predByLang: Record<string, { month: string; title: string; desc: string }[]> = {
  es: [
    { month: 'Mes 1', title: 'Expansión profesional', desc: 'Júpiter favorece nuevas oportunidades en tu carrera. Es el momento ideal para dar el paso que llevas tiempo postergando.' },
    { month: 'Mes 2', title: 'Conexiones profundas', desc: 'Venus en armonía con tu signo intensifica las relaciones. Momento clave para fortalecer vínculos importantes.' },
    { month: 'Mes 3', title: 'Claridad y decisión', desc: 'Mercurio directo trae claridad mental. Las decisiones tomadas en este período tendrán impacto duradero.' },
  ],
  en: [
    { month: 'Month 1', title: 'Professional expansion', desc: 'Jupiter favors new career opportunities. It\'s the ideal time to take the step you\'ve been postponing.' },
    { month: 'Month 2', title: 'Deep connections', desc: 'Venus in harmony with your sign intensifies relationships. Key moment to strengthen important bonds.' },
    { month: 'Month 3', title: 'Clarity and decision', desc: 'Mercury direct brings mental clarity. Decisions made during this period will have lasting impact.' },
  ],
  fr: [
    { month: 'Mois 1', title: 'Expansion professionnelle', desc: 'Jupiter favorise de nouvelles opportunités de carrière. C\'est le moment idéal pour franchir le pas.' },
    { month: 'Mois 2', title: 'Connexions profondes', desc: 'Vénus en harmonie avec votre signe intensifie les relations. Moment clé pour renforcer les liens importants.' },
    { month: 'Mois 3', title: 'Clarté et décision', desc: 'Mercure direct apporte la clarté mentale. Les décisions prises pendant cette période auront un impact durable.' },
  ],
  de: [
    { month: 'Monat 1', title: 'Berufliche Expansion', desc: 'Jupiter begünstigt neue Karrieremöglichkeiten. Es ist der ideale Zeitpunkt, den lange aufgeschobenen Schritt zu wagen.' },
    { month: 'Monat 2', title: 'Tiefe Verbindungen', desc: 'Venus in Harmonie mit deinem Zeichen intensiviert Beziehungen. Schlüsselmoment zur Stärkung wichtiger Bindungen.' },
    { month: 'Monat 3', title: 'Klarheit und Entscheidung', desc: 'Direkter Merkur bringt geistige Klarheit. Entscheidungen in dieser Zeit werden nachhaltige Wirkung haben.' },
  ],
  it: [
    { month: 'Mese 1', title: 'Espansione professionale', desc: 'Giove favorisce nuove opportunità di carriera. È il momento ideale per fare il passo che stai rimandando.' },
    { month: 'Mese 2', title: 'Connessioni profonde', desc: 'Venere in armonia con il tuo segno intensifica le relazioni. Momento chiave per rafforzare legami importanti.' },
    { month: 'Mese 3', title: 'Chiarezza e decisione', desc: 'Mercurio diretto porta chiarezza mentale. Le decisioni prese in questo periodo avranno un impatto duraturo.' },
  ],
  uk: [
    { month: 'Місяць 1', title: 'Професійне розширення', desc: 'Юпітер сприяє новим кар\'єрним можливостям. Це ідеальний момент для того кроку, який ти відкладав.' },
    { month: 'Місяць 2', title: 'Глибокі зв\'язки', desc: 'Венера в гармонії з твоїм знаком посилює стосунки. Ключовий момент для зміцнення важливих зв\'язків.' },
    { month: 'Місяць 3', title: 'Ясність і рішення', desc: 'Прямий Меркурій приносить ментальну ясність. Рішення, прийняті в цей період, матимуть тривалий вплив.' },
  ],
  ru: [
    { month: 'Месяц 1', title: 'Профессиональное расширение', desc: 'Юпитер благоприятствует новым карьерным возможностям. Это идеальный момент для того шага, который вы откладывали.' },
    { month: 'Месяц 2', title: 'Глубокие связи', desc: 'Венера в гармонии с вашим знаком усиливает отношения. Ключевой момент для укрепления важных связей.' },
    { month: 'Месяц 3', title: 'Ясность и решение', desc: 'Прямой Меркурий приносит ментальную ясность. Решения, принятые в этот период, будут иметь долгосрочное влияние.' },
  ],
}

const strengthsByLang: Record<string, string[]> = {
  es: ['Liderazgo natural y carisma', 'Intuición fuertemente desarrollada', 'Capacidad de adaptación'],
  en: ['Natural leadership and charisma', 'Strongly developed intuition', 'Adaptability'],
  fr: ['Leadership naturel et charisme', 'Intuition fortement développée', 'Capacité d\'adaptation'],
  de: ['Natürliche Führungsstärke und Charisma', 'Stark entwickelte Intuition', 'Anpassungsfähigkeit'],
  it: ['Leadership naturale e carisma', 'Intuizione fortemente sviluppata', 'Capacità di adattamento'],
  uk: ['Природне лідерство і харизма', 'Сильно розвинена інтуїція', 'Здатність до адаптації'],
  ru: ['Природное лидерство и харизма', 'Сильно развитая интуиция', 'Способность к адаптации'],
}

const growthByLang: Record<string, string[]> = {
  es: ['Equilibrar emoción y razón', 'Desarrollar la paciencia', 'Canalizar la energía creativa'],
  en: ['Balance emotion and reason', 'Develop patience', 'Channel creative energy'],
  fr: ['Équilibrer émotion et raison', 'Développer la patience', 'Canaliser l\'énergie créative'],
  de: ['Emotion und Vernunft ausbalancieren', 'Geduld entwickeln', 'Kreative Energie kanalisieren'],
  it: ['Equilibrare emozione e ragione', 'Sviluppare la pazienza', 'Incanalare l\'energia creativa'],
  uk: ['Рівновага емоцій і розуму', 'Розвивати терпіння', 'Спрямовувати творчу енергію'],
  ru: ['Баланс эмоций и разума', 'Развить терпение', 'Направить творческую энергию'],
}

function StatBar({ label, value, color, delay }: { label: string; value: number; color: string; delay: number }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-white/60">{label}</span>
        <span className="text-sm font-bold text-white">{value}%</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div className={`h-full rounded-full ${color}`} initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 1, delay, ease: 'easeOut' }} />
      </div>
    </div>
  )
}

interface Props { resultId?: string }

export default function ChartResults({ resultId }: Props) {
  const router = useRouter()
  const { testAnswers, chartResult, paymentCompleted, paymentIntentId } = useAppStore()
  const t = useT()
  const lang = useAppStore((s) => s.language)

  useEffect(() => {
    if (!paymentCompleted || !chartResult) { router.push('/test'); return }
    if (resultId && paymentIntentId && resultId !== paymentIntentId) router.replace(`/results/${paymentIntentId}`)
  }, [paymentCompleted, chartResult, router, resultId, paymentIntentId])

  if (!chartResult) return null

  const sd = signData[chartResult.sunSign] || signData['Aries']
  const signTraits = (signTraitsByLang[lang] ?? signTraitsByLang.es)[chartResult.sunSign] ?? []
  const extraTraits = extraTraitsByLang[lang] ?? extraTraitsByLang.es
  const luckyNumbers = [3, 7, 12, 21, 33].map(n => ((n + parseInt(testAnswers.birthDate.day || '1')) % 99) + 1)
  const luckyColors = luckyColorsByLang[lang] ?? luckyColorsByLang.es
  const luckyDays = luckyDaysByLang[lang] ?? luckyDaysByLang.es
  const interps = interpByLang[lang] ?? interpByLang.es
  const predictions = predByLang[lang] ?? predByLang.es
  const strengths = strengthsByLang[lang] ?? strengthsByLang.es
  const growth = growthByLang[lang] ?? growthByLang.es
  const compatibleSigns = ['Leo', 'Sagitario', 'Acuario'].filter(s => s !== chartResult.sunSign).slice(0, 3)
  const lifeAreaValues = [78, 85, 71, 90, 95, 82]
  const lifeAreaColors = ['bg-pink-500','bg-amber-500','bg-emerald-500','bg-sky-500','bg-primary-500','bg-violet-500']

  const mainCards = [
    { label: t.results.solarSign, value: chartResult.sunSign, Icon: Sun, color: 'text-amber-400 bg-amber-400/10 border-amber-400/20' },
    { label: t.results.moonSign, value: chartResult.moonSign, Icon: Moon, color: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20' },
    { label: t.results.ascendant, value: chartResult.ascendant, Icon: ArrowUpRight, color: 'text-primary-400 bg-primary-400/10 border-primary-400/20' },
    { label: t.results.element, value: chartResult.dominantElement, Icon: Flame, color: 'text-orange-400 bg-orange-400/10 border-orange-400/20' },
    { label: t.results.house, value: chartResult.astralHouse, Icon: Home, color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
    { label: t.results.planet, value: chartResult.dominantPlanet, Icon: Globe, color: 'text-violet-400 bg-violet-400/10 border-violet-400/20' },
    { label: t.results.aspect, value: chartResult.planetaryAspect, Icon: Zap, color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' },
    { label: t.results.node, value: chartResult.lunarNode, Icon: Compass, color: 'text-pink-400 bg-pink-400/10 border-pink-400/20' },
  ]

  return (
    <div className="min-h-screen pb-20 relative z-10">
      <header className="galaxy-glass py-4 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
          <LocaleLink href="/" className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-white" />
            <span className="text-lg font-bold text-white">AstroKey</span>
          </LocaleLink>
          <div className="flex items-center gap-2 text-xs text-white/30">
            <Shield className="w-3.5 h-3.5" />
            {t.results.verified}
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">

        {/* Banner */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{t.results.title}</h1>
          <p className="text-white/50">{t.results.subtitle}</p>
        </motion.div>

        {/* Perfil */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="galaxy-glass rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${sd.color} flex items-center justify-center text-white text-xl font-bold flex-shrink-0`}>
              {testAnswers.firstName?.charAt(0) || 'U'}
            </div>
            <div className="min-w-0">
              <h2 className="text-lg font-bold text-white truncate">{testAnswers.firstName} {testAnswers.lastName}</h2>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary-500/20 text-primary-300 font-medium">{t.results.verified}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-accent-500/20 text-accent-300 font-medium">{chartResult.sunSign}</span>
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-3 text-sm">
            <div className="flex items-center gap-2 text-white/40"><Calendar className="w-4 h-4 flex-shrink-0" /><span className="truncate">{testAnswers.birthDate.day}/{testAnswers.birthDate.month}/{testAnswers.birthDate.year}</span></div>
            <div className="flex items-center gap-2 text-white/40"><MapPin className="w-4 h-4 flex-shrink-0" /><span className="truncate">{testAnswers.birthPlace || '-'}</span></div>
            <div className="flex items-center gap-2 text-white/40"><Mail className="w-4 h-4 flex-shrink-0" /><span className="truncate">{testAnswers.email || '-'}</span></div>
          </div>
        </motion.div>

        {/* Cards */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">{t.results.astralMap}</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {mainCards.map((card, i) => (
              <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05 }}
                className={`galaxy-glass rounded-2xl p-4 text-center hover:-translate-y-1 transition-all duration-300 border ${card.color.split(' ')[2]}`}>
                <div className={`w-10 h-10 rounded-xl ${card.color.split(' ')[1]} flex items-center justify-center mx-auto mb-3`}>
                  <card.Icon className={`w-5 h-5 ${card.color.split(' ')[0]}`} />
                </div>
                <h3 className="text-[10px] font-semibold text-white/30 uppercase tracking-wider mb-1">{card.label}</h3>
                <p className="text-sm font-bold text-white leading-tight">{card.value}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Rasgos */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="galaxy-glass rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center"><Eye className="w-5 h-5 text-primary-400" /></div>
            <h2 className="text-xl font-bold text-white">{t.results.personality}</h2>
          </div>
          <div className="flex flex-wrap gap-2 mb-5">
            {[...signTraits, ...extraTraits].map((trait) => (
              <span key={trait} className="px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-sm text-primary-300 font-medium">{trait}</span>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="galaxy-glass rounded-xl p-4">
              <p className="text-white/40 text-xs uppercase tracking-wider mb-2 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> {t.results.strengths}</p>
              <ul className="space-y-1 text-white/70">
                {strengths.map(s => <li key={s} className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />{s}</li>)}
              </ul>
            </div>
            <div className="galaxy-glass rounded-xl p-4">
              <p className="text-white/40 text-xs uppercase tracking-wider mb-2 flex items-center gap-1"><Lightbulb className="w-3 h-3" /> {t.results.growth}</p>
              <ul className="space-y-1 text-white/70">
                {growth.map(g => <li key={g} className="flex items-center gap-2"><ArrowUpRight className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />{g}</li>)}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Energía */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="galaxy-glass rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center"><BarChart3 className="w-5 h-5 text-emerald-400" /></div>
            <div>
              <h2 className="text-xl font-bold text-white">{t.results.energyTitle}</h2>
              <p className="text-white/40 text-sm">{t.results.energySubtitle}</p>
            </div>
          </div>
          <div className="space-y-4">
            {t.results.energyAreas.map((area: string, i: number) => (
              <StatBar key={area} label={area} value={lifeAreaValues[i]} color={lifeAreaColors[i]} delay={0.6 + i * 0.1} />
            ))}
          </div>
        </motion.div>

        {/* Compatibilidad + Suerte */}
        <div className="grid sm:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="galaxy-glass rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center"><Heart className="w-5 h-5 text-pink-400" /></div>
              <h3 className="text-lg font-bold text-white">{t.results.compatibility}</h3>
            </div>
            <p className="text-white/40 text-sm mb-3">{t.results.compatSubtitle}</p>
            <div className="space-y-2">
              {compatibleSigns.map((sign, i) => (
                <div key={sign} className="flex items-center justify-between">
                  <span className="text-sm text-white/70">{sign}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-pink-500 to-rose-400 rounded-full" style={{ width: `${[92,85,78][i]}%` }} />
                    </div>
                    <span className="text-xs text-white/40 w-8">{[92,85,78][i]}%</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }} className="galaxy-glass rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center"><Star className="w-5 h-5 text-amber-400" /></div>
              <h3 className="text-lg font-bold text-white">{t.results.lucky}</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1.5">{t.results.luckyNumbers}</p>
                <div className="flex gap-2 flex-wrap">
                  {luckyNumbers.slice(0,5).map(n => <span key={n} className="w-8 h-8 rounded-full bg-accent-500/20 border border-accent-500/30 text-accent-300 text-xs font-bold flex items-center justify-center">{n}</span>)}
                </div>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1.5">{t.results.luckyColors}</p>
                <div className="flex gap-2 flex-wrap">
                  {luckyColors.map(c => <span key={c} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">{c}</span>)}
                </div>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1.5">{t.results.luckyDays}</p>
                <div className="flex gap-2">
                  {luckyDays.map(d => <span key={d} className="text-xs px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300">{d}</span>)}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Predicciones */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="galaxy-glass rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center"><Clock className="w-5 h-5 text-violet-400" /></div>
            <div>
              <h2 className="text-xl font-bold text-white">{t.results.predictions}</h2>
              <p className="text-white/40 text-sm">{t.results.predictionsSubtitle}</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {predictions.map(({ month, title, desc }, i) => {
              const icons = [TrendingUp, Heart, Zap]
              const colors = ['text-emerald-400 bg-emerald-400/10','text-pink-400 bg-pink-400/10','text-amber-400 bg-amber-400/10']
              const Icon = icons[i]
              const [tc, bc] = colors[i].split(' ')
              return (
                <div key={month} className="galaxy-glass rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-8 h-8 rounded-lg ${bc} flex items-center justify-center`}><Icon className={`w-4 h-4 ${tc}`} /></div>
                    <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">{month}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
                  <p className="text-xs text-white/40 leading-relaxed">{desc}</p>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Consejo del astrólogo */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }} className="relative galaxy-glass rounded-2xl p-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-purple-500/5" />
          <div className="relative flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs text-primary-400 font-semibold uppercase tracking-wider mb-1">{t.results.adviceLabel}</p>
              <p className="text-white/70 leading-relaxed text-sm">{t.results.adviceText}</p>
              <p className="text-white/30 text-xs mt-2">{t.results.adviceBy}</p>
            </div>
          </div>
        </motion.div>

        {/* Interpretación */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="galaxy-glass rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-accent-500/10 flex items-center justify-center"><Users className="w-5 h-5 text-accent-400" /></div>
            <h2 className="text-xl font-bold text-white">{t.results.interpretation}</h2>
          </div>
          <div className="space-y-6">
            {interps.map((block, i) => {
              const Icon = interpIcons[i] ?? Star
              const color = interpColors[i] ?? 'text-white/60'
              return (
                <div key={i} className="flex gap-4">
                  <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className={`w-4 h-4 ${color}`} />
                  </div>
                  <div className="border-l border-white/10 pl-4">
                    <h3 className={`text-base font-bold mb-1 ${color}`}>{block.title}</h3>
                    <p className="text-white/50 leading-relaxed text-sm">{block.content}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Acciones */}
        <div className="flex flex-wrap justify-center gap-4">
          <button className="flex items-center gap-2 px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors">
            <Download className="w-5 h-5" />{t.results.download}
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white/70 font-semibold rounded-xl hover:bg-white/15 border border-white/10 transition-colors">
            <Share2 className="w-5 h-5" />{t.results.share}
          </button>
        </div>
      </div>
    </div>
  )
}
