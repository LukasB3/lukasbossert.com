import type { Lang } from '../i18n';

type Text = Record<Lang, string>;

export interface Entry {
  label: Text;
  meta?: Text;
  short: Text;
  title?: Text;
  long: Text;
}

export const intro: Text[] = [
  {
    en: 'I’m studying Intelligent Systems (M.Sc.) at Technische Hochschule Ulm and have been working as a working student in the data engineering team at Stadtwerke Ulm/Neu-Ulm (SWU) since 2023.',
    de: 'Ich studiere Intelligent Systems (M.Sc.) an der Technischen Hochschule Ulm und arbeite seit 2023 als Werkstudent im Data Engineering Team der Stadtwerke Ulm/Neu-Ulm (SWU).',
  },
  {
    en: 'My focus there is on developing Python services, REST APIs and automated data pipelines, and on designing the underlying databases in PostgreSQL/PostGIS and MariaDB. Working in a team and in close coordination with the business departments, I see these applications through from gathering requirements to running them in production. All services run in Docker containers, deployed and operated via Portainer. What matters to me is that applications and pipelines not only work today, but can also be understood and further developed by others tomorrow. That is why I put particular emphasis on error handling, validation, testing and documentation.',
    de: 'Mein Schwerpunkt dort ist die Entwicklung von Python-Services, REST-APIs, automatisierten Datenpipelines sowie die Modellierung der zugehörigen Datenbanken. Im Team und in enger Abstimmung mit den Fachbereichen begleite ich diese Anwendungen von der Anforderungsaufnahme bis hin zum produktiven Betrieb. Die Services laufen containerisiert mit Docker, Deployment und Betrieb erfolgen über Portainer. Dabei ist mir wichtig, dass Anwendungen und Pipelines nicht nur heute funktionieren, sondern auch morgen von anderen verstanden und weiterentwickelt werden können. Deshalb lege ich besonderen Wert auf Fehlerbehandlung, Validierung, Tests und Dokumentation.',
  },
];

export const tech: { label: Text; items: string }[] = [
  { label: { en: 'Data & ML', de: 'Daten & ML' }, items: 'pandas, scikit-learn, LightGBM, Pyomo' },
  { label: { en: 'Web & APIs', de: 'Web & APIs' }, items: 'FastAPI, Flask, Pydantic, Dash/Plotly' },
  { label: { en: 'Databases', de: 'Datenbanken' }, items: 'PostgreSQL/PostGIS, MariaDB, SQLAlchemy' },
  { label: { en: 'Background jobs', de: 'Hintergrundjobs' }, items: 'Celery, Redis' },
  { label: { en: 'Infrastructure & tooling', de: 'Infrastruktur & Tooling' }, items: 'Docker, Docker Compose, Portainer, Git, uv, pytest' },
];

export const applications: Entry[] = [
  {
    label: { en: 'Energy trading', de: 'Energiehandel' },
    short: {
      en: 'Microservices and data pipelines that automatically feed market data into the energy trading system.',
      de: 'Microservices und Datenpipelines, die Marktdaten automatisiert ins Energiehandelssystem liefern.',
    },
    long: {
      en: 'The microservices connect external data sources to the trading system, while the pipelines fetch and process market data on a regular schedule. Failures trigger an email alert, the code is covered by automated tests, and the business requirements are documented in feature files.',
      de: 'Die Microservices binden externe Datenquellen an das Handelssystem an, die Pipelines rufen Marktdaten periodisch ab und bereiten sie auf. Bei Fehlern informiert ein Monitoring per E-Mail, automatisierte Tests sichern den Code ab, und die Fachanforderungen sind in Feature Files dokumentiert.',
    },
  },
  {
    label: { en: 'EV charging infrastructure Ulm', de: 'E-Ladeinfrastruktur Ulm' },
    short: {
      en: 'Platform for monitoring, reporting and planning the charging infrastructure, with a dashboard and automated customer reports.',
      de: 'Plattform für Monitoring, Reporting und Planung der Ladeinfrastruktur, mit Dashboard und automatisierten Kundenberichten.',
    },
    long: {
      en: 'A central backend retrieves data from external sources (charging sessions, station data, etc.) and stores it in a database. Two services access it via an API. The dashboard covers analytics and includes a back office for managing charging stations and charge points. The reporting service lets you configure which customers automatically receive reports on their charging stations, covering station utilization and the energy delivered over a chosen period.',
      de: 'Ein zentrales Backend übernimmt Daten aus externen Quellen (Ladevorgänge, Stationsdaten, etc.) und speichert sie in einer Datenbank. Zwei Services greifen über eine API darauf zu. Das Dashboard dient für Auswertungen und enthält ein Backoffice zur Verwaltung der Ladestationen und Ladepunkte. Über den Report-Service lässt sich konfigurieren, welche Kunden automatisch Berichte zu ihren Ladestationen erhalten, etwa zu Auslastung der Station und der abgegebenen Energiemenge im gewählten Zeitraum.',
    },
  },
  {
    label: { en: 'Electricity and gas consumption data', de: 'Verbrauchsdaten Strom/Gas' },
    short: {
      en: 'Pipeline that turns the annual consumption of more than 100,000 customers into more than 3.5 billion quarter-hourly values per year.',
      de: 'Pipeline, die die Jahresverbräuche von über 100.000 Kunden in über 3,5 Milliarden Viertelstundenwerte pro Jahr umrechnet.',
    },
    long: {
      en: 'A Python pipeline that first calculates each electricity and gas customer’s consumption pro rata per year and then uses various load profiles to distribute it across quarter-hourly and hourly values, over several years. Batch processing and Parquet-based intermediate storage keep the pipeline efficient. Raw data is processed and validated automatically, and the results are covered by tests.',
      de: 'Eine Python-Pipeline, die den Verbrauch jedes Strom- und Gaskunden zunächst anteilig pro Jahr berechnet und anschließend anhand verschiedener Lastprofile über mehrere Jahre hinweg auf Viertelstunden- und Stundenwerte verteilt. Dank Batchverarbeitung und Parquet-basierter Zwischenspeicherung bleibt die Pipeline effizient. Die Rohdaten werden automatisiert aufbereitet und validiert, die Ergebnisse sind durch Tests abgesichert.',
    },
  },
  {
    label: { en: 'Grid peak load forecasting', de: 'Netzhöchstlast-Prognose' },
    short: {
      en: 'Machine learning model (LightGBM) that predicts when the grid’s peak load will occur.',
      de: 'Machine-Learning-Modell (LightGBM), das den Zeitpunkt der Netzhöchstlast prognostiziert.',
    },
    long: {
      en: 'It is based on historical grid load data and external factors such as weather and public holidays. From these, calendar, temperature and lag features, among others, are derived to capture typical load behaviour. When a grid peak load is forecast, the application automatically notifies the business department by email.',
      de: 'Grundlage sind historische Netzlastdaten und externe Einflussfaktoren wie Wetter und Feiertage. Daraus werden unter anderem Kalender-, Temperatur- und Lag-Features abgeleitet, die das typische Lastverhalten abbilden. Wird eine Netzhöchstlast prognostiziert, benachrichtigt die Anwendung den Fachbereich automatisch per E-Mail.',
    },
  },
  {
    label: { en: 'Solar site acquisition', de: 'PV-Akquise' },
    short: {
      en: 'Geodata application that supports the search for sites for new solar plants.',
      de: 'Geodatenanwendung, die die Standortsuche für neue PV-Anlagen unterstützt.',
    },
    long: {
      en: 'The interactive application (PostGIS) maps solar installations, power plants and nature reserves. In a back office, the business department maintains site and master data.',
      de: 'Die interaktive Anwendung visualisiert PV-Anlagen, Kraftwerke und Naturschutzgebiete auf einer Karte. In einem Backoffice pflegt der Fachbereich Standort- und Stammdaten.',
    },
  },
  {
    label: { en: 'Price API', de: 'Preis-API' },
    short: {
      en: 'REST API that provides electricity and gas prices as well as peak-load time windows to other systems.',
      de: 'REST-API, die Strom- und Gaspreise sowie Höchstlastzeitfenster für andere Systeme bereitstellt.',
    },
    long: {
      en: 'Besides downstream systems, the business departments use it directly as well.',
      de: 'Neben nachgelagerten Systemen greifen auch die Fachbereiche direkt darauf zu.',
    },
  },
  {
    label: { en: 'Internal packages', de: 'Interne Packages' },
    short: {
      en: 'Reusable Python components used across teams in new projects.',
      de: 'Wiederverwendbare Python-Komponenten, die teamübergreifend in neuen Projekten eingesetzt werden.',
    },
    long: {
      en: 'Contributions to internal Python packages with standard components, for example for database access, API integrations and login management. They make new projects faster to build and more consistent.',
      de: 'Mitarbeit an unternehmensinternen Python-Packages mit Standardkomponenten, etwa für Datenbankzugriffe, API-Anbindungen und Login-Management. Sie machen neue Projekte schneller und einheitlicher.',
    },
  },
];

export const theses: Entry[] = [
  {
    label: { en: 'Bachelor’s thesis', de: 'Bachelorarbeit' },
    meta: { en: 'SWU, August 2025', de: 'SWU, August 2025' },
    short: {
      en: 'Optimization model that calculates whether a battery storage system pays off for a company and how large it should be.',
      de: 'Optimierungsmodell, das berechnet, ob sich ein Batteriespeicher für ein Unternehmen lohnt und wie groß er sein sollte.',
    },
    title: {
      en: 'Optimization-based assessment of the economic potential of battery storage for industrial electricity consumers – design and development of a web application',
      de: 'Optimierungsbasierte Bewertung des wirtschaftlichen Potenzials von Batteriespeichern im industriellen Strombezug – Konzeption und Entwicklung einer webbasierten Anwendung',
    },
    long: {
      en: 'Web application that lets the business department calculate whether a battery storage system pays off for a company and what specifications it should have. At its core is a linear optimization model (Pyomo, HiGHS) that determines the optimal capacity (kWh) and power (kW) based on historical load curves and electricity prices, taking into account battery degradation and each customer’s individual peak-load time windows. The battery saves costs by shaving load peaks, charging when electricity is cheap and discharging when it is expensive. Different battery sizes can be compared, including the expected payback period, and the optimizations run asynchronously in the background.',
      de: 'Webanwendung, mit der der Fachbereich berechnen kann, ob sich ein Batteriespeicher für ein Unternehmen lohnt und welche Spezifikationen er haben sollte. Kern ist ein lineares Optimierungsmodell (Pyomo, HiGHS), das auf Basis historischer Lastgänge und Strompreise sowie unter Berücksichtigung der Speicheralterung und individueller Hochlastzeitfenster die optimale Kapazität (kWh) und Leistung (kW) bestimmt. Der Speicher spart dabei Kosten, indem er Lastspitzen kappt, zu günstigen Zeiten lädt und zu teuren entlädt. Verschiedene Speichergrößen lassen sich inklusive Amortisationszeit vergleichen, die Optimierungen laufen asynchron im Hintergrund.',
    },
  },
  {
    label: { en: 'Master’s thesis', de: 'Masterarbeit' },
    meta: { en: 'SWU, November 2026 to April 2027', de: 'SWU, November 2026 bis April 2027' },
    short: {
      en: 'Self-hosted platform on which coding agents develop software in isolated sandboxes and review each other’s work.',
      de: 'Selbst gehostete Plattform, auf der Coding-Agenten in isolierten Sandboxes Software entwickeln und sich gegenseitig reviewen.',
    },
    title: {
      en: 'Design and Evaluation of a Self-Hosted, Sandboxed Platform for Autonomous Coding Agents: Self- vs. Cross-Model Code Review with Open-Weight LLMs',
      de: 'Design and Evaluation of a Self-Hosted, Sandboxed Platform for Autonomous Coding Agents: Self- vs. Cross-Model Code Review with Open-Weight LLMs',
    },
    long: {
      en: 'Building a model-agnostic platform on which coding agents autonomously implement medium-sized software projects in isolated sandboxes. A coder agent writes the code, a reviewer agent checks it. The platform runs on self-hosted open-weight models so that sensitive data can be processed as well. The research question is whether the reviewer improves the success rate, and whether it helps if the reviewer uses a different model than the coder.',
      de: 'Aufbau einer modellagnostischen Plattform, auf der Coding-Agenten in isolierten Sandboxes mittelgroße Softwareprojekte automatisiert umsetzen. Ein Coder-Agent entwickelt, ein Reviewer-Agent prüft. Die Plattform läuft mit selbst gehosteten Open-Weight-Modellen, damit auch sensible Daten verarbeitet werden dürfen. Wissenschaftlich möchte ich untersuchen, ob der Reviewer die Erfolgsrate verbessert und ob es hilft, wenn er ein anderes Modell nutzt als der Coder.',
    },
  },
];

// The last sentence links its final word to the Notes page.
export const agents: { text: Text; before: Text; link: Text; after: Text } = {
  text: {
    en: 'In my own time, I build and experiment a lot with coding agents, mainly Claude Code in the terminal under WSL, and set up a suitable environment for them with CLI tools and MCP servers. I believe that a large part of software development will happen with agents in the future.',
    de: 'Privat entwickle und experimentiere ich viel mit Coding-Agenten, vor allem mit Claude Code im Terminal unter WSL, und richte ihnen dafür eine passende Umgebung mit CLI-Tools und MCP-Servern ein. Ich glaube, dass Softwareentwicklung zukünftig zu einem großen Teil mit Agenten stattfinden wird.',
  },
  before: {
    en: 'I write down my personal thoughts on artificial intelligence under ',
    de: 'Meine persönlichen Gedanken zu künstlicher Intelligenz schreibe ich unter ',
  },
  link: { en: 'Notes', de: 'Notizen' },
  after: { en: '.', de: ' auf.' },
};
