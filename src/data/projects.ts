import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n';
import appGenerator from '../assets/projects/app-generator.webp';
import driveOrBusUlm from '../assets/projects/drive-or-bus-ulm.webp';

export interface Project {
  name: Record<Lang, string>;
  description: Record<Lang, string>;
  year: string;
  stack: string[];
  url: string;
  repo?: string;
  image: ImageMetadata;
  imageAlt: Record<Lang, string>;
}

// Newest first. A new project is one entry here plus one image in src/assets/projects.
export const projects: Project[] = [
  {
    name: { en: 'App Generator', de: 'App-Generator' },
    description: {
      en: 'Web application that turns a plain-language description into a working web app within a few minutes and delivers it as a link. An AI agent writes the code in an isolated container, then deterministic checks verify every file before the result is published automatically on its own page.',
      de: 'Webanwendung, die aus einer Beschreibung in natürlicher Sprache innerhalb weniger Minuten eine lauffähige Web-App erzeugt und als Link bereitstellt. Ein KI-Agent schreibt den Code in einem isolierten Container, anschließend prüfen deterministische Checks jede Datei, bevor das Ergebnis automatisch auf einer eigenen Seite veröffentlicht wird.',
    },
    year: '2026',
    stack: ['Fastify', 'SQLite', 'Docker', 'Claude Code', 'GitHub Pages'],
    url: 'https://app-generator.lukasbossert.com',
    repo: 'https://github.com/LukasB3/app-generator',
    image: appGenerator,
    imageAlt: {
      en: 'The App Generator start page: a text field for describing the app, example prompts, a Build button, and a dark panel with a yellow ticket and the progress steps from Queued to Done.',
      de: 'Die Startseite des App-Generators: ein Textfeld zum Beschreiben der App, Beispiel-Prompts, ein Build-Button und ein dunkles Panel mit gelbem Ticket und den Fortschrittsschritten von Queued bis Done.',
    },
  },
  {
    name: { en: 'Drive or Bus Ulm?', de: 'Auto oder Bus Ulm?' },
    description: {
      en: 'A live map of Ulm that shows how full the city-centre car parks are, where every bus and tram is right now and how late they are running.',
      de: 'Eine Live-Karte von Ulm, die zeigt, wie voll die Parkhäuser in der Innenstadt sind, wo jeder Bus und jede Straßenbahn gerade fährt und wie viel Verspätung sie haben.',
    },
    year: '2026',
    stack: ['TypeScript', 'Leaflet', 'FastAPI', 'Supabase', 'WebSockets'],
    url: 'https://drive-or-bus.lukasbossert.com',
    repo: 'https://github.com/LukasB3/drive-or-bus-ulm',
    image: driveOrBusUlm,
    imageAlt: {
      en: 'Dark map of Ulm with coloured markers for car parks, buses and trams, and a sidebar with parking occupancy and lines.',
      de: 'Dunkle Karte von Ulm mit farbigen Markern für Parkhäuser, Busse und Straßenbahnen, daneben eine Seitenleiste mit Parkhaus-Auslastung und Linien.',
    },
  },
];
