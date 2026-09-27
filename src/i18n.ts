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
    chat: {
      open: 'Chat',
      title: 'Ask me',
      close: 'Close chat',
      closeShort: 'Close',
      intro: 'This is an automated version of me, answering from information I provided. Ask me about my work, skills and background.',
      placeholder: 'Your question',
      send: 'Send',
      you: 'You',
      assistant: 'Lukas',
      note: 'Messages are sent to Anthropic (USA) to generate answers. Answers are generated automatically and may be inaccurate.',
      privacy: 'Privacy policy',
      error: 'Something went wrong. Please try again in a moment.',
      limit: 'That is a lot of questions at once. Please try again in a few minutes.',
    },
    privacy: {
      title: 'Privacy policy',
      intro: 'This site collects as little data as possible. What is processed, and why, is described here. The controller is the person named in the legal notice above.',
      sections: [
        {
          h: 'Hosting',
          p: 'The site is hosted by Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA. When you open a page, Vercel processes the data your browser transmits (IP address, date and time, requested page, browser and operating system, referring page) in server logs in order to deliver the site and keep it secure. The legal basis is my legitimate interest in operating a secure website (Art. 6 (1) (f) GDPR). Vercel is certified under the EU-US Data Privacy Framework and a data processing agreement is in place. Logs are kept only for a short time.',
        },
        {
          h: 'Chat',
          p: 'The chat in the bottom right corner lets you ask questions about me. The answers are generated by a language model (Claude) from Anthropic, PBC, 548 Market St, PMB 90375, San Francisco, CA 94104, USA. When you send a message, its text, the earlier messages of the same chat and the language of the page are transmitted to Anthropic to generate the reply. Nothing is transmitted before you send your first message. I do not store your chat on my server. The chat history is kept in your browser only for the current tab so that it survives page changes; it is deleted when you close the tab. Anthropic processes the data on my behalf under its commercial terms, does not use it to train its models and deletes it after a limited retention period. The transfer to the USA is based on Anthropic\'s certification under the EU-US Data Privacy Framework and on the EU standard contractual clauses. The legal basis is your consent, which you give by sending a message (Art. 6 (1) (a) GDPR); you can stop at any time by closing the chat. Please do not enter personal data you do not wish to share. Answers are generated automatically and may be inaccurate.',
        },
        {
          h: 'Cookies and tracking',
          p: 'This site sets no cookies, uses no analytics and embeds no third-party content. Fonts are served from this domain. The only data stored in your browser is the chat history described above, which is needed for the function you requested (Section 25 (2) TDDDG).',
        },
        {
          h: 'Email',
          p: 'If you email me, I process your address and message in order to reply (Art. 6 (1) (b) and (f) GDPR) and delete them once they are no longer needed.',
        },
        {
          h: 'Your rights',
          p: 'You have the right to access, rectification, erasure, restriction of processing, data portability and objection under Arts. 15 to 21 GDPR, and the right to lodge a complaint with a supervisory authority, for example the Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg. To exercise your rights, email me at the address above.',
        },
      ],
    },
    meta: {
      home: 'Lukas Bossert, software engineer in Ulm, focused on reliable data pipelines and practical AI integration.',
      about: 'About Lukas Bossert, data engineer in Ulm. More soon.',
      projects: 'Projects by Lukas Bossert. More soon.',
      thinking: 'Notes by Lukas Bossert. More soon.',
      contact: 'Email, GitHub and LinkedIn for Lukas Bossert.',
      legal: 'Legal notice and privacy policy for lukasbossert.com.',
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
    chat: {
      open: 'Chat',
      title: 'Fragen Sie mich',
      close: 'Chat schließen',
      closeShort: 'Schließen',
      intro: 'Dies ist eine automatisierte Version von mir, die aus von mir bereitgestellten Informationen antwortet. Fragen Sie mich zu meiner Arbeit, meinen Fähigkeiten und meinem Werdegang.',
      placeholder: 'Ihre Frage',
      send: 'Senden',
      you: 'Sie',
      assistant: 'Lukas',
      note: 'Nachrichten werden zur Beantwortung an Anthropic (USA) übermittelt. Antworten werden automatisch erzeugt und können ungenau sein.',
      privacy: 'Datenschutzerklärung',
      error: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es gleich noch einmal.',
      limit: 'Das sind viele Fragen auf einmal. Bitte versuchen Sie es in ein paar Minuten noch einmal.',
    },
    privacy: {
      title: 'Datenschutzerklärung',
      intro: 'Diese Seite erhebt so wenige Daten wie möglich. Was verarbeitet wird und warum, steht hier. Verantwortlich ist die im Impressum oben genannte Person.',
      sections: [
        {
          h: 'Hosting',
          p: 'Die Seite wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA gehostet. Beim Aufruf einer Seite verarbeitet Vercel die von Ihrem Browser übermittelten Daten (IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browser und Betriebssystem, verweisende Seite) in Server-Logs, um die Seite auszuliefern und abzusichern. Rechtsgrundlage ist mein berechtigtes Interesse am sicheren Betrieb der Website (Art. 6 Abs. 1 lit. f DSGVO). Vercel ist unter dem EU-US Data Privacy Framework zertifiziert; ein Auftragsverarbeitungsvertrag besteht. Die Logs werden nur kurz aufbewahrt.',
        },
        {
          h: 'Chat',
          p: 'Über den Chat unten rechts können Sie mir Fragen stellen. Die Antworten erzeugt ein Sprachmodell (Claude) von Anthropic, PBC, 548 Market St, PMB 90375, San Francisco, CA 94104, USA. Wenn Sie eine Nachricht senden, werden ihr Text, die vorherigen Nachrichten desselben Chats und die Sprache der Seite an Anthropic übermittelt, um die Antwort zu erzeugen. Vor Ihrer ersten Nachricht wird nichts übermittelt. Ich speichere Ihren Chat nicht auf meinem Server. Der Chatverlauf wird nur in Ihrem Browser für den aktuellen Tab gehalten, damit er Seitenwechsel übersteht; beim Schließen des Tabs wird er gelöscht. Anthropic verarbeitet die Daten in meinem Auftrag nach seinen kommerziellen Bedingungen, nutzt sie nicht zum Training seiner Modelle und löscht sie nach einer begrenzten Aufbewahrungsfrist. Die Übermittlung in die USA stützt sich auf die Zertifizierung von Anthropic unter dem EU-US Data Privacy Framework und auf die EU-Standardvertragsklauseln. Rechtsgrundlage ist Ihre Einwilligung, die Sie mit dem Absenden einer Nachricht erteilen (Art. 6 Abs. 1 lit. a DSGVO); Sie können jederzeit aufhören, indem Sie den Chat schließen. Bitte geben Sie keine personenbezogenen Daten ein, die Sie nicht teilen möchten. Antworten werden automatisch erzeugt und können ungenau sein.',
        },
        {
          h: 'Cookies und Tracking',
          p: 'Diese Seite setzt keine Cookies, nutzt keine Analysewerkzeuge und bindet keine Inhalte Dritter ein. Schriften werden von dieser Domain ausgeliefert. In Ihrem Browser wird nur der oben beschriebene Chatverlauf gespeichert; er ist für die von Ihnen gewünschte Funktion erforderlich (§ 25 Abs. 2 TDDDG).',
        },
        {
          h: 'E-Mail',
          p: 'Wenn Sie mir eine E-Mail schreiben, verarbeite ich Ihre Adresse und Ihre Nachricht, um zu antworten (Art. 6 Abs. 1 lit. b und f DSGVO), und lösche sie, sobald sie nicht mehr benötigt werden.',
        },
        {
          h: 'Ihre Rechte',
          p: 'Sie haben nach Art. 15 bis 21 DSGVO das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch sowie das Recht auf Beschwerde bei einer Aufsichtsbehörde, zum Beispiel dem Landesbeauftragten für den Datenschutz und die Informationsfreiheit Baden-Württemberg. Zur Ausübung Ihrer Rechte schreiben Sie mir an die oben genannte Adresse.',
        },
      ],
    },
    meta: {
      home: 'Lukas Bossert, Softwareentwickler in Ulm, mit Schwerpunkt auf zuverlässigen Datenpipelines und der praktischen Integration von KI.',
      about: 'Über Lukas Bossert, Data Engineer in Ulm. Bald mehr.',
      projects: 'Projekte von Lukas Bossert. Bald mehr.',
      thinking: 'Notizen von Lukas Bossert. Bald mehr.',
      contact: 'E-Mail, GitHub und LinkedIn von Lukas Bossert.',
      legal: 'Impressum und Datenschutzerklärung von lukasbossert.com.',
    },
    titles: { home: 'Lukas Bossert', about: 'Über mich', projects: 'Projekte', thinking: 'Denken', contact: 'Kontakt', legal: 'Impressum' },
    notFound: { title: 'Unter dieser Adresse gibt es nichts.', back: 'Zurück zum Anfang' },
  },
} as const;

export const otherLang = (lang: Lang): Lang => (lang === 'en' ? 'de' : 'en');
