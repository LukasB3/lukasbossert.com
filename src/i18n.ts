export const locales = ['en', 'de'] as const;
export type Lang = (typeof locales)[number];
export type PageKey = 'home' | 'about' | 'thinking' | 'contact';

export const routes: Record<PageKey, Record<Lang, string>> = {
  home: { en: '/', de: '/de' },
  about: { en: '/about', de: '/de/ueber-mich' },
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
    nav: { home: 'Home', about: 'About', thinking: 'Thinking', contact: 'Contact' },
    langSwitch: { label: 'Deutsch', short: 'DE' },
    skip: 'Skip to content',
    kicker: 'Software engineer · Ulm',
    tagline: "I'm a data engineer in Ulm. I build software with agents, and I'm trying to think clearly about what they are.",
    fieldCaption: 'A field of agents, each with a goal. The pointer counts as one of them.',
    fieldPause: 'Pause',
    fieldResume: 'Resume',
    fieldNoScript: 'A small agent simulation runs here when JavaScript is enabled.',
    indexHeading: 'Contents',
    index: {
      about: 'Work, study, tools',
      thinking: 'Agents, moral status, uncertainty',
      contact: 'Email, GitHub, LinkedIn',
    },
    about: { title: 'Lukas Bossert', work: 'Selected work' },
    facts: [
      ['Role', 'Data engineer, Stadtwerke Ulm'],
      ['Studying', 'M.Sc. Intelligent Systems, Technische Hochschule Ulm'],
      ['Degree', 'B.Sc. Data Science Management, Hochschule Neu-Ulm'],
      ['Based in', 'Ulm, Germany'],
      ['Working with', 'Python, TypeScript, SQL, Claude Code, MCP'],
    ],
    thinking: {
      title: 'What I keep coming back to',
      lede: 'Notes on the two things I think about most: building software with agents, and the moral status of the systems we are building. These are working positions rather than conclusions.',
    },
    contact: { title: 'The easiest way to reach me is email.', email: 'Email' },
    footer: { built: 'Built with Astro, no trackers.', source: 'Source' },
    meta: {
      home: 'Lukas Bossert, data engineer in Ulm. Software with agents, and the question of what they are.',
      about: 'Data engineer at Stadtwerke Ulm, M.Sc. Intelligent Systems at Technische Hochschule Ulm.',
      thinking: 'Working positions on building software with agents and on the moral status of AI.',
      contact: 'Email, GitHub and LinkedIn for Lukas Bossert.',
    },
    titles: { home: 'Lukas Bossert', about: 'About', thinking: 'Thinking', contact: 'Contact' },
    notFound: { title: 'Nothing at this address.', back: 'Back to the start' },
  },
  de: {
    nav: { home: 'Start', about: 'Über mich', thinking: 'Denken', contact: 'Kontakt' },
    langSwitch: { label: 'English', short: 'EN' },
    skip: 'Zum Inhalt',
    kicker: 'Softwareentwickler · Ulm',
    tagline: 'Ich bin Data Engineer in Ulm. Ich baue Software mit Agenten und versuche, klar darüber nachzudenken, was sie sind.',
    fieldCaption: 'Ein Feld aus Agenten, jeder mit einem Ziel. Der Zeiger zählt als einer von ihnen.',
    fieldPause: 'Pause',
    fieldResume: 'Weiter',
    fieldNoScript: 'Hier läuft eine kleine Agentensimulation, wenn JavaScript aktiviert ist.',
    indexHeading: 'Inhalt',
    index: {
      about: 'Arbeit, Studium, Werkzeuge',
      thinking: 'Agenten, moralischer Status, Ungewissheit',
      contact: 'E-Mail, GitHub, LinkedIn',
    },
    about: { title: 'Lukas Bossert', work: 'Ausgewählte Arbeiten' },
    facts: [
      ['Rolle', 'Data Engineer, Stadtwerke Ulm'],
      ['Studium', 'M.Sc. Intelligent Systems, Technische Hochschule Ulm'],
      ['Abschluss', 'B.Sc. Data Science Management, Hochschule Neu-Ulm'],
      ['Wohnort', 'Ulm'],
      ['Arbeitet mit', 'Python, TypeScript, SQL, Claude Code, MCP'],
    ],
    thinking: {
      title: 'Worauf ich immer wieder zurückkomme',
      lede: 'Notizen zu den zwei Dingen, über die ich am meisten nachdenke: Software mit Agenten zu bauen, und der moralische Status der Systeme, die wir gerade bauen. Das sind Arbeitsthesen, keine Schlussfolgerungen.',
    },
    contact: { title: 'Am einfachsten erreicht man mich per E-Mail.', email: 'E-Mail' },
    footer: { built: 'Gebaut mit Astro, ohne Tracker.', source: 'Quellcode' },
    meta: {
      home: 'Lukas Bossert, Data Engineer in Ulm. Software mit Agenten, und die Frage, was sie sind.',
      about: 'Data Engineer bei den Stadtwerken Ulm, M.Sc. Intelligent Systems an der Technischen Hochschule Ulm.',
      thinking: 'Arbeitsthesen zum Programmieren mit Agenten und zum moralischen Status von KI.',
      contact: 'E-Mail, GitHub und LinkedIn von Lukas Bossert.',
    },
    titles: { home: 'Lukas Bossert', about: 'Über mich', thinking: 'Denken', contact: 'Kontakt' },
    notFound: { title: 'Unter dieser Adresse gibt es nichts.', back: 'Zurück zum Anfang' },
  },
} as const;

export const otherLang = (lang: Lang): Lang => (lang === 'en' ? 'de' : 'en');
