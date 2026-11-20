import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n';
import appGenerator from '../assets/projects/app-generator.webp';
import fahrplanUlm from '../assets/projects/fahrplan-ulm.webp';

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
    name: { en: 'Fahrplan Ulm', de: 'Fahrplan Ulm' },
    description: {
      en: 'Web application in German for the bus and tram timetables of Ulm and Neu-Ulm, built for the phone. Journeys can be planned with a form or with a single typed or spoken sentence, which an AI model turns into a search request. It also shows live departures for every stop, every bus and tram on a live map with its delay, and current service alerts.',
      de: 'Webanwendung für die Bus- und Straßenbahnfahrpläne in Ulm und Neu-Ulm, gebaut für das Smartphone. Verbindungen lassen sich über ein Formular oder mit einem einzigen getippten oder gesprochenen Satz suchen, den ein KI-Modell in eine Suchanfrage übersetzt. Dazu kommen Live-Abfahrten für jede Haltestelle, eine Live-Karte mit jedem Bus und jeder Straßenbahn samt Verspätung und aktuelle Störungsmeldungen.',
    },
    year: '2026',
    stack: ['Next.js', 'Fastify', 'MapLibre', 'Claude API', 'GTFS'],
    url: 'https://fahrplan-ulm.de',
    repo: 'https://github.com/LukasB3/fahrplan-ulm',
    image: fahrplanUlm,
    imageAlt: {
      en: 'Four phone screenshots of Fahrplan Ulm: the journey planner with From and To fields and a field for a sentence, the departures tab with the most used stops and their lines, the live map of Ulm with buses and trams, and the service alerts.',
      de: 'Vier Smartphone-Screenshots von Fahrplan Ulm: der Verbindungsplaner mit Von- und Nach-Feld und einem Feld für einen Satz, der Abfahrten-Tab mit den meistgenutzten Haltestellen und ihren Linien, die Live-Karte von Ulm mit Bussen und Straßenbahnen und die Störungsmeldungen.',
    },
  },
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
      en: 'The App Generator start page: the headline "An AI agent writes your app. Plain code decides whether it goes live.", a text field with example prompts and a Build my app button, and below it a dark band with the six steps every request takes, from Screening to Done, with Coding inside a dashed sandbox frame.',
      de: 'Die Startseite des App-Generators: die Überschrift „An AI agent writes your app. Plain code decides whether it goes live.“, ein Textfeld mit Beispiel-Prompts und einem Button „Build my app“, darunter ein dunkles Band mit den sechs Schritten, die jede Anfrage durchläuft, von Screening bis Done, wobei Coding in einem gestrichelten Sandbox-Rahmen steht.',
    },
  },
];
