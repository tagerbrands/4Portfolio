import { Briefcase, Hand, Workflow, FileText, Building } from 'lucide-react';

export type PType = 'product' | 'performance' | 'process' | 'practice';

export const THE_4_PS: { id: PType; label: string; beschrijving: string; focus: string; voorbeelden: string; voordelen: string; beperkingen: string; colorClass: string; icon: any }[] = [
  {
    id: 'product', 
    label: 'Product', 
    beschrijving: 'Tastbaar eindresultaat.', 
    focus: 'Kwaliteit van de oplevering (wat is er gemaakt?).', 
    voorbeelden: 'Behandelplan, meetprotocol, artikel, prototype.',
    voordelen: 'Objectieve beoordeling via vaste criteria, tijdsonafhankelijke evaluatie, archivering en herbeoordeling is gemakkelijk.',
    beperkingen: 'Zegt weinig over praktische uitvoering, geen zicht op totstandkoming, gevoelig voor fraude.', 
    colorClass: 'bg-purple-100 text-purple-800 border-purple-300', 
    icon: FileText 
  },
  { 
    id: 'performance', 
    label: 'Performance', 
    beschrijving: 'Demonstratie in gesimuleerde of gecontroleerde omgevingen.', 
    focus: 'Live handelen op een specifiek moment (kan de student het nu laten zien?).', 
    voorbeelden: 'Rollenspel met simulatiepatiënten, demonstratie van manuele technieken.',
    voordelen: 'Directe observatie van vaardigheden, gestandaardiseerde en eerlijke condities.',
    beperkingen: 'Momentopname met stress, mist langdurige complexiteit en variatie van de praktijk.',
    colorClass: 'bg-emerald-100 text-emerald-800 border-emerald-300', 
    icon: Hand 
  },
  { 
    id: 'process', 
    label: 'Process', 
    beschrijving: 'Navolgbare stappen en onderliggende logica achter het werk.', 
    focus: 'De intellectuele en procedurele route (hoe kwam het tot stand?).', 
    voorbeelden: 'Live observaties, revisiegeschiedenis, reflectielogboek, feedbackverslag.',
    voordelen: 'Maakt groei en authenticiteit zichtbaar, bevordert zelfregulatie, ondervangt fraude.',
    beperkingen: 'Tijdrovend, lastig te kwantificeren, risico op sociaal wenselijke rapportage.',
    colorClass: 'bg-amber-100 text-amber-800 border-amber-300', 
    icon: Workflow 
  },
  { 
    id: 'practice', 
    label: 'Practice', 
    beschrijving: 'Handelingspatronen in authentieke context.', 
    focus: 'Integratie van gedrag en bekwaamheid over een langere periode (hoe functioneert de student als beroepsbeoefenaar?).', 
    voorbeelden: 'Stage, werkplekleren, multidisciplinair overleg, 360-graden feedback.',
    voordelen: 'Hoogste authenticiteitsgraad, meet bekwaamheid in onvoorspelbare situaties, toont professionele attitude.',
    beperkingen: 'Zeer moeilijk te standaardiseren, kwaliteit is sterk afhankelijk van externe werkbegeleiding.',
    colorClass: 'bg-sky-100 text-sky-800 border-sky-300', 
    icon: Building 
  },
];

export const LEARNING_OUTCOMES = [
  { id: '2.1', text: 'De startbekwame zorgprofessional concretiseert een vraagstuk uit de beroepscontext en vertaalt dit naar een relevante en onderzoekbare opdracht op basis van ontwikkelingen binnen het eigen vakgebied en in afstemming met de relevante stakeholders.' },
  { id: '2.2', text: 'De startbekwame zorgprofessional ontwerpt in afstemming met de stakeholders een plan van aanpak met een navolgbare onderzoeksmethode voor het vinden van een oplossing(srichting) voor een vraagstuk uit de beroepscontext.' },
  { id: '2.3', text: 'De startbekwame professional handelt binnen het doen van het gehele onderzoek conform de huidige wet- en regelgeving en handelt hierbij conform de ethische richtlijnen.' },
  { id: '2.4', text: 'De startbekwame zorgprofessional analyseert een vraagstuk systematisch en interpreteert de resultaten om zo tot een onderbouwde conclusie te komen en formuleert aanbevelingen.' },
  { id: '2.5', text: 'De startbekwame zorgprofessional creëert aan de hand van een vraagstuk een passende oplossing(srichting) dan wel aanbevelingen voor de praktijk welke aansluiten bij het verandervermogen van de beroepspraktijk, stakeholders en organisatie(s) ter voorbereiding van implementatie.' },
  { id: '2.6', text: 'De startbekwame zorgprofessional communiceert met de stakeholders op een professionele en doeltreffende manier over een passende oplossing/aanbeveling om zo impact te realiseren in de beroepspraktijk.' },
  { id: '2.7', text: 'De startbekwame zorgprofessional toont een positief kritische houding, vraagt feedback op het onderzoeksproces, reflecteert hierop en past dit toe op de eigen ontwikkeldoelen, geeft (peer)feedback voor de ontwikkeling van peers.' }
];

export const EVL_1_FYSIO = [
  { id: '1.1', text: 'De startbekwame zorgprofessional komt na intake en onderzoek via klinisch redeneren bij patiënten met een variatie aan complexiteit zelfstandig op methodische wijze tot een uiteindelijke (werk)diagnose en bespreekt deze met patiënt en/of diens systeem.' },
  { id: '1.2', text: 'De startbekwame zorgprofessional stelt zelfstandig een behandelplan op en behandelt volgens EBP en de beroepscode en wet- en regelgeving op methodisch fysiotherapeutische wijze een gevarieerde patiëntenpopulatie in al zijn complexiteit die een reële weerspiegeling van de beroepspraktijk weergeeft en maakt hierbij zinvol gebruik van zorgtechnologie of maakt hiervoor een voorstel toe.' },
  { id: '1.3', text: 'De startbekwame zorgprofessional werkt efficiënt en doeltreffend in een (inter)professioneel samenwerkingsverband en benut hierbij de eigen expertise en expertise van anderen binnen en buiten de (para)medische zorg om zo tot best passende en kwalitatief optimale zorg te komen.' },
  { id: '1.4', text: 'De startbekwame zorgprofessional benadert cliënten/patiënten/hulpvragers gelijkwaardig, empathisch en met respect voor culturele en maatschappelijke normen en waarden.' },
  { id: '1.5', text: 'De startbekwame zorgprofessional stimuleert bij de cliënten, met aandacht voor leefstijl, gedrag en preventie, (een passende mate van) eigen regievoering over het eigen zorgtraject om zo bij te dragen aan het vermogen van de cliënten om fysieke, emotionele en sociale uitdagingen aan te gaan en gedragsveranderingen te realiseren. Aanvullend is het belangrijk dat ze dit ook kunnen stimuleren binnen groeps- of wijkgerichte interventies met als doel een leefstijlverbetering voor een patiëntenpopulatie.' },
  { id: '1.6', text: 'De startbekwame zorgprofessional communiceert zelfstandig met diverse stakeholders in de praktijksetting op een professionele en doeltreffende manier over onderzoek, behandeling, evaluatie en het eigen professioneel handelen, zowel verbaal (mondeling en schriftelijk) als non-verbaal.' },
  { id: '1.7', text: 'De startbekwame zorgprofessional vraagt feedback aan diverse stakeholders om zo het eigen professioneel handelen te analyseren en ontwikkeldoelen te formuleren en stelt indien wenselijk of noodzakelijk het eigen professioneel gedrag bij, en geeft feedback aan diverse stakeholders om professioneel te kunnen handelen.' }
];

export const AFSTUDEERONDERZOEK_DEFAULT_PORTFOLIO: Record<string, any[]> = {
  '2.1': [
    { id: '2.1-part-0', text: 'concretiseert een vraagstuk uit de beroepscontext', evidence: [], colorClass: 'bg-blue-200 text-blue-900' },
    { id: '2.1-part-1', text: 'vertaalt dit naar een relevante en onderzoekbare opdracht op basis van ontwikkelingen binnen het eigen vakgebied', evidence: [], colorClass: 'bg-emerald-200 text-emerald-900' },
    { id: '2.1-part-2', text: 'in afstemming met de relevante stakeholders', evidence: [], colorClass: 'bg-purple-200 text-purple-900' }
  ],
  '2.2': [
    { id: '2.2-part-0', text: 'ontwerpt in afstemming met de stakeholders een plan van aanpak met een navolgbare onderzoeksmethode', evidence: [], colorClass: 'bg-amber-200 text-amber-900' },
    { id: '2.2-part-1', text: 'voor het vinden van een oplossing(srichting) voor een vraagstuk uit de beroepscontext', evidence: [], colorClass: 'bg-rose-200 text-rose-900' }
  ],
  '2.3': [
    { id: '2.3-part-0', text: 'handelt binnen het doen van het gehele onderzoek conform de huidige wet- en regelgeving', evidence: [], colorClass: 'bg-sky-200 text-sky-900' },
    { id: '2.3-part-1', text: 'handelt hierbij conform de ethische richtlijnen', evidence: [], colorClass: 'bg-indigo-200 text-indigo-900' }
  ],
  '2.4': [
    { id: '2.4-part-0', text: 'analyseert een vraagstuk systematisch', evidence: [], colorClass: 'bg-fuchsia-200 text-fuchsia-900' },
    { id: '2.4-part-1', text: 'interpreteert de resultaten om zo tot een onderbouwde conclusie te komen', evidence: [], colorClass: 'bg-teal-200 text-teal-900' },
    { id: '2.4-part-2', text: 'formuleert aanbevelingen', evidence: [], colorClass: 'bg-orange-200 text-orange-900' }
  ],
  '2.5': [
    { id: '2.5-part-0', text: 'creëert aan de hand van een vraagstuk een passende oplossing(srichting) dan wel aanbevelingen voor de praktijk', evidence: [], colorClass: 'bg-lime-200 text-lime-900' },
    { id: '2.5-part-1', text: 'aansluiten bij het verandervermogen van de beroepspraktijk, stakeholders en organisatie(s)', evidence: [], colorClass: 'bg-cyan-200 text-cyan-900' },
    { id: '2.5-part-2', text: 'voorbereiding van implementatie', evidence: [], colorClass: 'bg-pink-200 text-pink-900' }
  ],
  '2.6': [
    { id: '2.6-part-0', text: 'communiceert met de stakeholders op een professionele en doeltreffende manier over een passende oplossing/aanbeveling', evidence: [], colorClass: 'bg-violet-200 text-violet-900' },
    { id: '2.6-part-1', text: 'impact te realiseren in de beroepspraktijk', evidence: [], colorClass: 'bg-emerald-200 text-emerald-900' }
  ],
  '2.7': [
    { id: '2.7-part-0', text: 'toont een positief kritische houding', evidence: [], colorClass: 'bg-amber-200 text-amber-900' },
    { id: '2.7-part-1', text: 'vraagt feedback op het onderzoeksproces', evidence: [], colorClass: 'bg-sky-200 text-sky-900' },
    { id: '2.7-part-2', text: 'reflecteert hierop en past dit toe op de eigen ontwikkeldoelen', evidence: [], colorClass: 'bg-rose-200 text-rose-900' },
    { id: '2.7-part-3', text: 'geeft (peer)feedback voor de ontwikkeling van peers', evidence: [], colorClass: 'bg-purple-200 text-purple-900' }
  ]
};

export const TRIANGLE_THEORY = {
  saturatie: {
    title: "Saturatie",
    text: "Saturatie betekent dat nieuwe datapunten geen nieuwe informatie geven over het totaalbeeld van de student. In de context van programmatisch toetsen is saturatie het punt waarop de beoordelaars voldoende vertrouwen hebben om een robuuste beslissing te nemen, omdat extra bewijsmateriaal het beeld van de bekwaamheid niet meer wezenlijk zal veranderen.",
    source: "(van der Vleuten et al., 2012)"
  },
  triangulatie: {
    title: "Triangulatie",
    text: "Triangulatie gaat over het onderzoek aan de hand van verschillende bronnen, methoden en perspectieven. Hierbij vormt onderstaand 4Ps framework een handige leidraad om ervoor te zorgen dat niet slechts één type bewijs (bijv. alleen producten) wordt gebruikt, maar een rijke mix die de complexiteit van de beroepspraktijk weerspiegelt.",
    source: "(Fawns et al., 2026; Baartman et al., 2020)"
  },
  intersubjectiviteit: {
    title: "Intersubjectiviteit",
    text: "Intersubjectiviteit gaat over de verscheidenheid in perspectieven die betrokken zijn bij het nemen van de beslissing. Het draait om niveaubepalingen door verschillende stakeholders op een diversiteit aan datapunten. Door deze subjectieve oordelen samen te brengen in een dialoog, ontstaat een robuuster en betrouwbaarder (intersubjectief) oordeel.",
    source: "(Schuwirth & van der Vleuten, 2011)"
  }
};

export const MISALIGNMENT_THEORY = [
  {
    title: "Mismatching",
    desc: "Het gebruik van een verkeerde proxy voor de leeruitkomst. Bijvoorbeeld een kennistoets inzetten om een praktische vaardigheid te meten."
  },
  {
    title: "Mismanagement",
    desc: "Slechte administratie of een gebrekkig ontwerp van de toetsing, waardoor de proxy niet goed tot zijn recht komt of verkeerd wordt afgenomen."
  },
  {
    title: "Misinterpreting",
    desc: "Beoordelaars trekken onjuiste conclusies uit de proxy, bijvoorbeeld door een gebrek aan expertise of onduidelijke beoordelingscriteria."
  },
  {
    title: "Slippage",
    desc: "Verlies van belangrijke informatie wanneer een complexe prestatie wordt gereduceerd tot een proxy. Essentiële nuances gaan hierbij verloren."
  },
  {
    title: "Spillage",
    desc: "De proxy vangt irrelevante informatie op die de beoordeling onterecht beïnvloedt, zoals de grafische opmaak van een verslag bij een inhoudelijke beoordeling."
  },
  {
    title: "Over-saturation",
    desc: "Het verzamelen van te veel proxies, wat leidt tot ruis, inefficiëntie en een onoverzichtelijk beeld voor de beoordelaars."
  }
];
