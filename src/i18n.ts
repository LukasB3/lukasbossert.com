export const locales = ['en', 'de'] as const;
export type Lang = (typeof locales)[number];
export type NavKey = 'about' | 'projects' | 'thinking' | 'contact';
export type PageKey = 'home' | NavKey | 'legal';

export const routes: Record<PageKey, Record<Lang, string>> = {
  home: { en: '/', de: '/de' },
  about: { en: '/about', de: '/de/ueber-mich' },
  projects: { en: '/projects', de: '/de/projekte' },
  thinking: { en: '/thinking', de: '/de/denken' },
  contact: { en: '/contact', de: '/de/kontakt' },
  legal: { en: '/legal', de: '/de/impressum' },
};

export const site = {
  name: 'Lukas Bossert',
  email: 'bossert-dev@gmail.com',
  github: 'https://github.com/LukasB3',
  linkedin: 'https://www.linkedin.com/in/lukas-bossert-818538237/',
  repo: 'https://github.com/LukasB3/lukasbossert.com',
  city: 'Ulm',
  // Postal address for the legal notice. Replace before going live.
  street: 'Marienstraße 10',
  postal: '89231 Neu-Ulm',
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
    skip: 'Skip to content',
    navLabel: 'Main navigation',
    tagline: 'Software engineer focused on reliable data pipelines and practical AI integration.',
    where: 'Data engineer at Stadtwerke Ulm. Studying Intelligent Systems at Technische Hochschule Ulm.',
    canvasLabel: 'A data pipeline: sources on the left, sinks on the right, and the sections of this site as stations in between.',
    about: { title: 'About', soon: 'Something about me will be posted here soon.' },
    projects: { title: 'Projects', soon: 'A few projects will be listed here soon.' },
    thinking: { title: 'Thinking', soon: 'Something will be posted here soon.' },
    contact: { title: 'The easiest way to reach me is email.', email: 'Email' },
    footer: { label: 'Legal and language', legal: 'Legal notice', otherLang: 'Deutsch', otherLangLabel: 'Auf Deutsch lesen' },
    legal: {
      title: 'Legal notice',
      intro: 'Information required under Section 5 of the German Digital Services Act (DDG).',
      contact: 'Contact',
      responsible: 'Responsible for the content under Section 18 (2) of the German State Media Treaty (MStV)',
      sections: [
        {
          h: 'Liability for content',
          p: 'As a service provider I am responsible for my own content on these pages under general law (Section 7 (1) DDG). Under Sections 8 to 10 DDG I am not obliged to monitor transmitted or stored third-party information or to look for circumstances that indicate unlawful activity. Obligations to remove or block the use of information under general law remain unaffected. Liability in this respect is only possible from the moment I become aware of a specific infringement. As soon as I become aware of such an infringement, I will remove the content in question without delay.',
        },
        {
          h: 'Liability for links',
          p: 'This site contains links to external third-party websites over whose content I have no influence. I therefore cannot accept any liability for that third-party content. The respective provider or operator of the linked pages is always responsible for their content. The linked pages were checked for possible legal infringements at the time of linking, and no unlawful content was identifiable then. Permanent monitoring of the linked pages is not reasonable without concrete evidence of an infringement. If I become aware of any infringement, I will remove the link without delay.',
        },
        {
          h: 'Copyright',
          p: 'The content and works on these pages created by me are subject to German copyright law. Reproduction, editing, distribution and any kind of use beyond the limits of copyright law require my written consent. Downloads and copies of this site are permitted for private, non-commercial use only. Where content on this site was not created by me, the copyrights of third parties are respected and such content is marked as such. Should you nevertheless become aware of a copyright infringement, please let me know. If I become aware of any infringement, I will remove the content in question without delay.',
        },
      ],
    },
    meta: {
      home: 'Lukas Bossert, software engineer in Ulm, focused on reliable data pipelines and practical AI integration.',
      about: 'About Lukas Bossert, data engineer in Ulm. More soon.',
      projects: 'Projects by Lukas Bossert. More soon.',
      thinking: 'Notes by Lukas Bossert. More soon.',
      contact: 'Email, GitHub and LinkedIn for Lukas Bossert.',
      legal: 'Legal notice for lukasbossert.com.',
    },
    titles: { home: 'Lukas Bossert', about: 'About', projects: 'Projects', thinking: 'Thinking', contact: 'Contact', legal: 'Legal notice' },
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
    skip: 'Zum Inhalt',
    navLabel: 'Hauptnavigation',
    tagline: 'Softwareentwickler mit Schwerpunkt auf zuverlässigen Datenpipelines und der praktischen Integration von KI.',
    where: 'Data Engineer bei den Stadtwerken Ulm. Studium Intelligent Systems an der Technischen Hochschule Ulm.',
    canvasLabel: 'Eine Datenpipeline: Quellen links, Senken rechts, und die Bereiche dieser Seite als Stationen dazwischen.',
    about: { title: 'Über mich', soon: 'Hier steht bald etwas über mich.' },
    projects: { title: 'Projekte', soon: 'Hier stehen bald ein paar Projekte.' },
    thinking: { title: 'Denken', soon: 'Hier erscheint bald etwas.' },
    contact: { title: 'Am einfachsten erreicht man mich per E-Mail.', email: 'E-Mail' },
    footer: { label: 'Rechtliches und Sprache', legal: 'Impressum', otherLang: 'English', otherLangLabel: 'Read in English' },
    legal: {
      title: 'Impressum',
      intro: 'Angaben gemäß § 5 DDG.',
      contact: 'Kontakt',
      responsible: 'Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV',
      sections: [
        {
          h: 'Haftung für Inhalte',
          p: 'Als Diensteanbieter bin ich gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG bin ich als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werde ich diese Inhalte umgehend entfernen.',
        },
        {
          h: 'Haftung für Links',
          p: 'Diese Seite enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werde ich derartige Links umgehend entfernen.',
        },
        {
          h: 'Urheberrecht',
          p: 'Die durch mich erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen meiner schriftlichen Zustimmung. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht von mir erstellt wurden, werden die Urheberrechte Dritter beachtet und solche Inhalte als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitte ich um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werde ich derartige Inhalte umgehend entfernen.',
        },
      ],
    },
    meta: {
      home: 'Lukas Bossert, Softwareentwickler in Ulm, mit Schwerpunkt auf zuverlässigen Datenpipelines und der praktischen Integration von KI.',
      about: 'Über Lukas Bossert, Data Engineer in Ulm. Bald mehr.',
      projects: 'Projekte von Lukas Bossert. Bald mehr.',
      thinking: 'Notizen von Lukas Bossert. Bald mehr.',
      contact: 'E-Mail, GitHub und LinkedIn von Lukas Bossert.',
      legal: 'Impressum von lukasbossert.com.',
    },
    titles: { home: 'Lukas Bossert', about: 'Über mich', projects: 'Projekte', thinking: 'Denken', contact: 'Kontakt', legal: 'Impressum' },
    notFound: { title: 'Unter dieser Adresse gibt es nichts.', back: 'Zurück zum Anfang' },
  },
} as const;

export const otherLang = (lang: Lang): Lang => (lang === 'en' ? 'de' : 'en');
