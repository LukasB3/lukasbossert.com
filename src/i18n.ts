export const locales = ['en', 'de'] as const;
export type Lang = (typeof locales)[number];
export type PageKey = 'home' | 'about' | 'projects' | 'thinking' | 'contact';

export const routes: Record<PageKey, Record<Lang, string>> = {
  home: { en: '/', de: '/de' },
  about: { en: '/about', de: '/de/ueber-mich' },
  projects: { en: '/projects', de: '/de/projekte' },
  thinking: { en: '/thinking', de: '/de/denken' },
  contact: { en: '/contact', de: '/de/kontakt' },
};

export const site = {
  name: 'Lukas Bossert',
  email: 'bossert-dev@gmail.com',
  github: 'https://github.com/LukasB3',
  linkedin: 'https://www.linkedin.com/in/lukas-bossert-818538237/',
  repo: 'https://github.com/LukasB3/lukasbossert.com',
  city: 'Ulm',
};

export const ui = {
  en: {
    nav: { home: 'Home', about: 'About', projects: 'Projects', thinking: 'Thinking', contact: 'Contact' },
    navInfo: {
      about: 'Who I am and what I work on.',
      projects: 'Things I have built.',
      thinking: 'Notes on what I am learning.',
      contact: 'Email, GitHub, LinkedIn.',
    },
    langSwitch: { label: 'Auf Deutsch lesen', text: 'Deutsch' },
    skip: 'Skip to content',
    navLabel: 'Main navigation',
    tagline: 'Software engineer focused on reliable data pipelines and practical AI integration.',
    where: 'Data engineer at Stadtwerke Ulm. Studying Intelligent Systems at Technische Hochschule Ulm.',
    canvasLabel: 'Code seen from far away, with several cursors editing it at once.',
    about: { title: 'About', soon: 'Something about me will be posted here soon.' },
    projects: { title: 'Projects', soon: 'A few projects will be listed here soon.' },
    thinking: { title: 'Thinking', soon: 'Something will be posted here soon.' },
    contact: { title: 'The easiest way to reach me is email.', email: 'Email' },
    footer: { place: 'Lukas Bossert, Ulm' },
    meta: {
      home: 'Lukas Bossert, software engineer in Ulm, focused on reliable data pipelines and practical AI integration.',
      about: 'About Lukas Bossert, data engineer in Ulm. More soon.',
      projects: 'Projects by Lukas Bossert. More soon.',
      thinking: 'Notes by Lukas Bossert. More soon.',
      contact: 'Email, GitHub and LinkedIn for Lukas Bossert.',
    },
    titles: { home: 'Lukas Bossert', about: 'About', projects: 'Projects', thinking: 'Thinking', contact: 'Contact' },
    notFound: { title: 'Nothing at this address.', back: 'Back to the start' },
  },
  de: {
    nav: { home: 'Start', about: 'Über mich', projects: 'Projekte', thinking: 'Denken', contact: 'Kontakt' },
    navInfo: {
      about: 'Wer ich bin und woran ich arbeite.',
      projects: 'Dinge, die ich gebaut habe.',
      thinking: 'Notizen zu dem, was ich gerade lerne.',
      contact: 'E-Mail, GitHub, LinkedIn.',
    },
    langSwitch: { label: 'Read in English', text: 'English' },
    skip: 'Zum Inhalt',
    navLabel: 'Hauptnavigation',
    tagline: 'Softwareentwickler mit Schwerpunkt auf zuverlässigen Datenpipelines und der praktischen Integration von KI.',
    where: 'Data Engineer bei den Stadtwerken Ulm. Studium Intelligent Systems an der Technischen Hochschule Ulm.',
    canvasLabel: 'Code aus der Ferne, mit mehreren Cursorn, die ihn gleichzeitig bearbeiten.',
    about: { title: 'Über mich', soon: 'Hier steht bald etwas über mich.' },
    projects: { title: 'Projekte', soon: 'Hier stehen bald ein paar Projekte.' },
    thinking: { title: 'Denken', soon: 'Hier erscheint bald etwas.' },
    contact: { title: 'Am einfachsten erreicht man mich per E-Mail.', email: 'E-Mail' },
    footer: { place: 'Lukas Bossert, Ulm' },
    meta: {
      home: 'Lukas Bossert, Softwareentwickler in Ulm, mit Schwerpunkt auf zuverlässigen Datenpipelines und der praktischen Integration von KI.',
      about: 'Über Lukas Bossert, Data Engineer in Ulm. Bald mehr.',
      projects: 'Projekte von Lukas Bossert. Bald mehr.',
      thinking: 'Notizen von Lukas Bossert. Bald mehr.',
      contact: 'E-Mail, GitHub und LinkedIn von Lukas Bossert.',
    },
    titles: { home: 'Lukas Bossert', about: 'Über mich', projects: 'Projekte', thinking: 'Denken', contact: 'Kontakt' },
    notFound: { title: 'Unter dieser Adresse gibt es nichts.', back: 'Zurück zum Anfang' },
  },
} as const;

export const otherLang = (lang: Lang): Lang => (lang === 'en' ? 'de' : 'en');
