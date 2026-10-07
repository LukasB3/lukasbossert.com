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
      en: 'Type what you want, get a link to a working web app a few minutes later. An agent writes it inside a locked-down container, plain code checks every file, and the result goes live on its own page.',
      de: 'Beschreiben, was man will, und wenige Minuten später einen Link zu einer funktionierenden Web-App bekommen. Ein Agent schreibt sie in einem abgeschotteten Container, schlichter Code prüft jede Datei, und das Ergebnis geht auf einer eigenen Seite live.',
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
      en: 'A live map of Ulm that shows how full the city-centre car parks are and where every bus and tram is right now.',
      de: 'Eine Live-Karte von Ulm, die zeigt, wie voll die Parkhäuser in der Innenstadt sind und wo jeder Bus und jede Straßenbahn gerade fährt.',
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
