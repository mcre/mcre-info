export type ProfileLink = {
  title: string;
  url: string;
  description: string;
  image?: string;
  icon?: string;
};

export type ProfileTimelineItem = {
  title: string;
  description: string[];
  note?: string;
};

export type ProfileSkillGroup = {
  title: string;
  skills: string[];
};

export type ProfileTextItem = {
  title: string;
  description: string[];
  bullet?: boolean;
  action?: {
    url: string;
    label: string;
    image?: string;
    icon?: string;
  };
};

export type ProfileTextSection = {
  title: string;
  items: ProfileTextItem[];
};

export type ProfileProject = {
  title: string;
  url: string;
  description: string;
  image?: string;
  icon?: string;
  youtube?: string;
  footImage?: string;
  footImageAspectRatio?: string;
  tags: Record<string, string[]>;
};

export type ProfileContent = {
  siteName: string;
  title: string;
  description: string;
  url: string;
  image: string;
  handle: string;
  displayName: string;
  contact: string;
  catchphrase: string;
  sameAs: string[];
  socialLinks: ProfileLink[];
  profileItems: ProfileTimelineItem[];
  career: ProfileTimelineItem[];
  education: ProfileTimelineItem[];
  skillGroups: ProfileSkillGroup[];
  skillSections: ProfileTextSection[];
  hobbySections: ProfileTextSection[];
  hobbies: ProfileLink[];
  websites: ProfileLink[];
  writing: ProfileLink[];
  webapps: ProfileProject[];
  githubProjects: ProfileProject[];
  youtubeProjects: ProfileProject[];
};

export const profile: ProfileContent = {
  siteName: "mcre.info",
  title: "mcre.info - mcre (FUJITA Shinya)",
  description:
    "mcre (FUJITA Shinya) のプロフィール。フルスタック開発者としての職歴、スキル、制作物、技術記事、外部プロフィールをまとめています。",
  url: "https://mcre.info",
  image: "https://mcre.info/img/face01.webp",
  handle: "mcre",
  displayName: "mcre (FUJITA Shinya)",
  contact: "連絡はXのDMまで",
  catchphrase: "ものづくり欲と、ものがたり欲。",
  sameAs: [
    "https://x.com/m_cre",
    "https://github.com/m-cre",
    "https://github.com/mcre",
    "https://zenn.dev/m_cre",
    "https://note.com/m_cre/",
    "https://www.youtube.com/@mcre4788",
    "https://wakatime.com/@mcre",
    "https://lapras.com/public/NCTOWDE",
    "https://www.linkedin.com/in/shinya-fujita-03b5ba12/",
    "https://www.wantedly.com/id/fujita_shinya",
  ],
  socialLinks: [
    {
      title: "X",
      url: "https://x.com/m_cre",
      description: "連絡先、日々の発信",
      image: "/img/x.webp",
    },
    {
      title: "GitHub",
      url: "https://github.com/m-cre",
      description: "開発リポジトリ",
      icon: "$mdiGithub",
    },
    {
      title: "WakaTime",
      url: "https://wakatime.com/@mcre",
      description: "コーディング状況",
      image: "/img/wakatime.webp",
    },
    {
      title: "Zenn",
      url: "https://zenn.dev/m_cre",
      description: "技術記事",
      image: "/img/zenn.webp",
    },
    {
      title: "note",
      url: "https://note.com/m_cre/",
      description: "文章、エッセイ",
      image: "/img/note.webp",
    },
    {
      title: "LAPRAS",
      url: "https://lapras.com/public/NCTOWDE",
      description: "技術プロフィール",
      image: "/img/lapras.webp",
    },
    {
      title: "LinkedIn",
      url: "https://www.linkedin.com/in/shinya-fujita-03b5ba12/",
      description: "職務経歴",
      icon: "$mdiLinkedin",
    },
    {
      title: "Wantedly",
      url: "https://www.wantedly.com/id/fujita_shinya",
      description: "職務プロフィール",
      image: "/img/wantedly.webp",
    },
  ],
  profileItems: [
    {
      title: "mcre (FUJITA Shinya)",
      description: [
        "Webアプリ開発、データ分析、クラウド、ものづくりを扱うエンジニア。",
        "連絡はXのDMまで。",
      ],
    },
    {
      title: "関心",
      description: [
        "使う人の動線に合う業務アプリケーション、静的サイト、AIを使った開発体験、物語のあるプロダクト。",
      ],
    },
  ],
  career: [
    {
      title: "ソフトバンク (株)",
      description: [
        "営業施策分析、契約者数予測、データ分析システム企画・開発・運用、スポーツデータの機械学習分析など。",
      ],
      note: "ウィルコム入社後 吸収合併。",
    },
    {
      title: "ai6 (株)",
      description: [
        "スタートアップにて開発全般を担当。PoC用ウェブアプリ、デバイス関連開発、クラウドシステム、データレイク開発、データ分析等。",
      ],
      note: "テックリード。",
    },
    {
      title: "(株) HEARTBEATS",
      description: ["フロントエンジニア・データエンジニア。"],
      note: "現職。",
    },
    {
      title: "ITフリーランス",
      description: ["Webアプリ開発等。"],
      note: "現職。",
    },
  ],
  education: [
    {
      title: "旭川工業高等専門学校",
      description: [
        "制御情報工学科 卒業",
        "NHK高専ロボコン出場。機械設計、加工、プログラミングを担当。",
      ],
    },
    {
      title: "電気通信大学",
      description: ["情報工学科 卒業。"],
    },
    {
      title: "電気通信大学 大学院",
      description: ["情報工学専攻 修了。工学修士。"],
    },
  ],
  skillGroups: [
    {
      title: "Frontend",
      skills: ["Vue.js", "TypeScript", "Vite", "Vuetify", "Playwright"],
    },
    {
      title: "Backend / Cloud",
      skills: [
        "Python",
        "AWS Lambda",
        "API Gateway",
        "DynamoDB",
        "S3",
        "CloudFront",
        "AWS CDK",
      ],
    },
    {
      title: "Data / AI",
      skills: ["データ分析", "機械学習", "AIエージェント活用", "検索最適化"],
    },
  ],
  skillSections: [
    {
      title: "技術等",
      items: [
        {
          title: "フルスタック開発",
          description: [
            "クラウドアーキテクチャ設計、データベース、バックエンド、フロントエンドまで横断して開発できます。",
          ],
        },
        {
          title: "Webアプリ開発",
          description: [
            "Vue.js, AWSサーバレス(Lambda, DynamoDB, API-Gateway等)の構成をよく使います。",
          ],
        },
        {
          title: "データベース",
          description: [
            "AWS DynamoDB / RDS / EMR / Athena / Redshift, Azure Data Warehouse / SQL Server 等。",
          ],
        },
        {
          title: "データ分析・機械学習",
          description: [
            "SQL, Excel, SAS, Python/Pandasでのデータ処理、TensorFlow / Keras での機械学習等。",
          ],
        },
      ],
    },
    {
      title: "受賞歴等",
      items: [
        {
          title: "人狼知能大会 <wbr />プロトコル部門",
          description: ["第2回大会 5位・第3回大会 5位・GAT2017プレ大会 1位"],
          action: {
            url: "http://aiwolf.org/",
            icon: "$mdiDog",
            label: "人狼知能ウェブサイト",
          },
        },
        {
          title: "人狼知能大会 <wbr />第3回大会 <wbr /> 自然言語部門",
          description: ["総合優秀賞+人狼ゲーム賞"],
          action: {
            url: "https://www.inside-games.jp/article/2017/09/05/109557.html",
            icon: "$mdiNewspaper",
            label: "大会紹介ニュース記事",
          },
        },
        {
          title: "人狼知能大会 <wbr />第4回大会 <wbr /> 自然言語部門",
          description: ["準優勝"],
        },
      ],
    },
  ],
  hobbySections: [
    {
      title: "趣味",
      items: [
        {
          title: "ゲーム",
          description: [
            "かまいたちの夜で育ちました。",
            "ドラクエウォークやってます。",
            "Splatoon 3 1,500時間プレイ",
          ],
          bullet: true,
        },
        {
          title: "読書",
          description: ["ホラーとミステリー。"],
        },
        {
          title: "スポーツ観戦",
          description: [
            "野球観戦: 北海道日本ハムファイターズ",
            "カーリング観戦",
          ],
          bullet: true,
        },
      ],
    },
    {
      title: "コミュニティ活動",
      items: [
        {
          title: "旭川高専ロボットラボラトリ部後援会",
          description: ["会長としていろいろやってます。"],
        },
      ],
    },
  ],
  hobbies: [
    {
      title: "ドラゴンクエストウォーク",
      url: "https://dqw.mcre.info/",
      description: "ゲーム攻略・便利ツール。",
      image: "/img/dqw-tools.webp",
    },
    {
      title: "AI Wolf",
      url: "https://aiwolf.org/",
      description: "自然言語処理やゲームAIへの関心。",
      image: "/img/aiwolf-4th-nlp.webp",
    },
  ],
  websites: [
    {
      title: "けんみんラボ",
      url: "https://kenmin-lab.net",
      description:
        "習慣・方言などの都道府県ごとの違いを、だれでも投票できます。",
      image: "/img/kenmin-lab.png",
    },
    {
      title: "DQW Tools",
      url: "https://dqw.mcre.info/",
      description:
        "DQW(ドラゴンクエストウォーク)のプレイに役立つ、こころ道クエスト検索ツールを公開しています。",
      image: "/img/dqw-tools.webp",
    },
    {
      title: "CoCoDakara Body Design",
      url: "https://bodydesign.cocodakara.net/",
      description:
        "麻布十番のパーソナルジム「CoCoDakara Body Design」の予約システム開発・運用を担当しています。",
      image: "/img/cocodakara.webp",
    },
    {
      title: "熟語パズル",
      url: "https://tools.mcre.info/jukugo",
      description:
        "いわゆる「和同開珎パズル」を自動で解いてくれるソルバーです。",
      image: "/img/jukugo.webp",
    },
  ],
  writing: [
    {
      title: "Zenn",
      url: "https://zenn.dev/m_cre",
      description: "技術記事。",
      image: "/img/zenn.webp",
    },
    {
      title: "note",
      url: "https://note.com/m_cre/",
      description: "エッセイや文章。",
      image: "/img/note.webp",
    },
    {
      title: "YouTube",
      url: "https://www.youtube.com/@mcre4788",
      description: "動画コンテンツ。",
      icon: "$mdiYoutube",
    },
  ],
  webapps: [
    {
      title: "けんみんラボ",
      url: "https://kenmin-lab.net",
      description:
        "習慣・方言などの都道府県ごとの違いを、だれでも投票できます。",
      image: "/img/kenmin-lab.png",
      tags: {
        Vue3: ["Vuetify3"],
        AWS: ["API-Gateway", "DynamoDB", "Lambda", "CDK", "CloudFront"],
      },
    },
    {
      title: "DQW Tools",
      url: "https://dqw.mcre.info/",
      description:
        "DQW(ドラゴンクエストウォーク)のプレイに役立つ、こころ道クエスト検索ツールを公開しています。",
      image: "/img/dqw-tools.webp",
      tags: {
        Vue3: ["Vuetify3"],
        AWS: ["API-Gateway", "CDK", "CloudFront"],
      },
    },
    {
      title: "CoCoDakara Body Design",
      url: "https://bodydesign.cocodakara.net/",
      description:
        "麻布十番のパーソナルジム「CoCoDakara Body Design」の予約システム開発・運用を担当しています。",
      image: "/img/cocodakara.webp",
      tags: {
        Vue: ["Vuetify"],
        AWS: ["AppSync(GraphQL)", "DynamoDB"],
      },
    },
    {
      title: "熟語パズル",
      url: "https://tools.mcre.info/jukugo",
      description:
        "いわゆる「和同開珎パズル」を自動で解いてくれるソルバーです。",
      image: "/img/jukugo.webp",
      tags: {
        Vue3: ["Vuetify3"],
        AWS: ["API-Gateway", "DynamoDB", "Lambda", "CDK", "CloudFront"],
      },
    },
  ],
  githubProjects: [
    {
      title: "mcre-info",
      image: "/img/favicon.webp",
      url: "https://github.com/mcre/mcre-info",
      description: "このサイトのソースコードを公開しています。",
      tags: {
        Vue3: ["Vuetify3"],
        AWS: ["API-Gateway", "CDK", "CloudFront"],
      },
    },
    {
      title: "dqw-tools",
      image: "/img/dqw-tools.webp",
      url: "https://github.com/mcre/dqw-tools",
      description:
        "DQW(ドラゴンクエストウォーク)のこころ道クエスト検索ツールのソースコードを公開しています。",
      tags: {
        Vue3: ["Vuetify3"],
        AWS: ["API-Gateway", "CDK", "CloudFront"],
      },
    },
    {
      title: "mcre-tools",
      image: "/img/favicon.webp",
      url: "https://github.com/mcre/mcre-tools",
      description: "「熟語パズル」などのツールのソースコード。",
      tags: {
        Vue3: ["Vuetify3"],
        AWS: ["API-Gateway", "DynamoDB", "Lambda", "CDK", "CloudFront"],
      },
    },
    {
      title: "listening-paperback",
      image: "/img/lp.webp",
      url: "https://github.com/mcre/listening-paperback",
      description:
        "Youtubeチャンネル 「聴く」名作文庫 の動画を生成するためのプログラムを公開しています。",
      tags: { Python: ["MoviePy"], AWS: ["Polly"], TeX: ["jlreq"] },
    },
    {
      title: "aiwolf-4th-nlp",
      icon: "$mdiDog",
      url: "https://github.com/mcre/aiwolf-4th-nlp",
      description:
        "人狼知能大会 自然言語部門 第4回大会に参加したときのソースコードを公開しています。",
      footImage: "/img/aiwolf-4th-nlp.webp",
      footImageAspectRatio: "1.807",
      tags: {
        Java: [],
        NLP: ["Juman", "KNP"],
      },
    },
  ],
  youtubeProjects: [
    {
      title: "「聴く」名作文庫",
      image: "/img/lp.webp",
      url: "https://www.youtube.com/c/聴く-名作文庫",
      description:
        "青空文庫の小説をTeXで綺麗に縦組みし、機械音声で読み上げる動画を半自動生成したものを投稿していました。チャンネル登録者数1,000人突破。",
      youtube: "4U_JLkcVEi0",
      tags: { Python: ["MoviePy"], AWS: ["Polly"], TeX: ["jlreq"] },
    },
  ],
};

const unique = <T>(items: T[]): T[] => [...new Set(items)];

const linesForTimeline = (items: ProfileTimelineItem[]): string[] =>
  items.flatMap((item) => [
    `### ${item.title}`,
    "",
    ...item.description.map((text) => `- ${text}`),
    ...(item.note ? [`- ${item.note}`] : []),
    "",
  ]);

const linesForLinks = (items: ProfileLink[]): string[] =>
  items.map((item) => `- [${item.title}](${item.url}): ${item.description}`);

export const buildProfileJson = (content: ProfileContent = profile) => ({
  siteName: content.siteName,
  title: content.title,
  description: content.description,
  url: content.url,
  image: content.image,
  handle: content.handle,
  displayName: content.displayName,
  contact: content.contact,
  catchphrase: content.catchphrase,
  sameAs: content.sameAs,
  profileItems: content.profileItems,
  career: content.career,
  education: content.education,
  skillGroups: content.skillGroups,
  skillSections: content.skillSections,
  hobbySections: content.hobbySections,
  links: {
    social: content.socialLinks,
    hobbies: content.hobbies,
    websites: content.websites,
    writing: content.writing,
  },
  projects: {
    webapps: content.webapps,
    github: content.githubProjects,
    youtube: content.youtubeProjects,
  },
});

export const buildProfileJsonLd = (content: ProfileContent = profile) => ({
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: content.title,
  description: content.description,
  url: content.url,
  image: content.image,
  mainEntity: {
    "@type": "Person",
    name: content.displayName,
    alternateName: content.handle,
    description: content.description,
    url: content.url,
    image: content.image,
    sameAs: unique(content.sameAs),
    knowsAbout: unique(content.skillGroups.flatMap((group) => group.skills)),
  },
});

export const buildProfileMarkdown = (
  content: ProfileContent = profile,
): string => {
  const skillLines = content.skillGroups.flatMap((group) => [
    `### ${group.title}`,
    "",
    ...group.skills.map((skill) => `- ${skill}`),
    "",
  ]);
  const sectionLines = (sections: ProfileTextSection[]) =>
    sections.flatMap((section) => [
      `### ${section.title}`,
      "",
      ...section.items.flatMap((item) => [
        `- ${item.title}: ${item.description.join(" / ")}`,
      ]),
      "",
    ]);
  const projectLines = (items: ProfileProject[]) =>
    items.map((item) => `- [${item.title}](${item.url}): ${item.description}`);

  return [
    `# ${content.displayName}`,
    "",
    content.catchphrase,
    "",
    content.description,
    "",
    `- Site: ${content.url}`,
    `- Contact: ${content.contact}`,
    "",
    "## Profile",
    "",
    ...linesForTimeline(content.profileItems),
    "## Career",
    "",
    ...linesForTimeline(content.career),
    "## Education",
    "",
    ...linesForTimeline(content.education),
    "## Skills",
    "",
    ...skillLines,
    ...sectionLines(content.skillSections),
    "## Hobbies / Activities",
    "",
    ...sectionLines(content.hobbySections),
    "## Webapp Development",
    "",
    ...projectLines(content.webapps),
    "",
    "## GitHub",
    "",
    ...projectLines(content.githubProjects),
    "",
    "## YouTube",
    "",
    ...projectLines(content.youtubeProjects),
    "",
    "## Links",
    "",
    ...linesForLinks([
      ...content.socialLinks,
      ...content.websites,
      ...content.writing,
      ...content.hobbies,
    ]),
    "",
  ].join("\n");
};

export const buildLlmsText = (content: ProfileContent = profile): string =>
  [
    `# ${content.siteName}`,
    "",
    `> ${content.description}`,
    "",
    "This site is the personal profile of mcre (FUJITA Shinya). Use the Markdown and JSON resources below as the canonical machine-readable profile context.",
    "",
    "## Core",
    "",
    `- [Profile markdown](${content.url}/profile.md): Human and agent readable profile, career, education, skills, and links.`,
    `- [Profile JSON](${content.url}/profile.json): Machine-readable structured profile data.`,
    `- [Home page](${content.url}/): SSG-rendered public profile page with JSON-LD.`,
    "",
    "## Optional",
    "",
    `- [llms-full](${content.url}/llms-full.txt): Complete profile context in a single Markdown file.`,
    `- [Sitemap](${content.url}/sitemap.xml): Search sitemap.`,
    "",
  ].join("\n");

export const buildLlmsFullText = (content: ProfileContent = profile): string =>
  [
    `# ${content.siteName}`,
    "",
    `> ${content.description}`,
    "",
    "The following content is generated from the same source data as the public Vue page and JSON-LD.",
    "",
    buildProfileMarkdown(content),
  ].join("\n");

export const buildSitemapXml = (content: ProfileContent = profile): string =>
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${content.url}/</loc>
  </url>
  <url>
    <loc>${content.url}/profile.md</loc>
  </url>
  <url>
    <loc>${content.url}/profile.json</loc>
  </url>
  <url>
    <loc>${content.url}/llms.txt</loc>
  </url>
  <url>
    <loc>${content.url}/llms-full.txt</loc>
  </url>
</urlset>`;

export const buildRobotsTxt = (content: ProfileContent = profile): string =>
  [
    "# AI and search discovery files:",
    `# llms.txt: ${content.url}/llms.txt`,
    `# llms-full.txt: ${content.url}/llms-full.txt`,
    "",
    "User-agent: *",
    "Allow: /",
    "",
    "User-agent: OAI-SearchBot",
    "Allow: /",
    "",
    "User-agent: GPTBot",
    "Allow: /",
    "",
    "User-agent: ChatGPT-User",
    "Allow: /",
    "",
    `Sitemap: ${content.url}/sitemap.xml`,
    "",
  ].join("\n");
