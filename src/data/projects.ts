import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n';
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
