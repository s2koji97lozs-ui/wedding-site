// src/data/content.ts

/* --- Type Definitions --- */

export interface ImageSource {
  src: string;
  alt: string;
}

export interface LinkButton {
  label: string;
  url: string;
  isExternal: boolean;
}

export interface SecurityConfig {
  enabled: boolean;
  pinCode: string;
  message: string;
}

// Movie Config (MP4用設定)
export interface VideoConfig {
  autoPlay: boolean;
  muted: boolean;
  loop: boolean;
  controls: boolean;
}

// Movie Source (Discriminated Union)
export type MovieSource =
  | { mode: 'file'; url: string; config: VideoConfig } // MP4直リンク
  | { mode: 'youtube'; videoId: string };              // YouTube

export interface MovieSection {
  heading: string;
  description: string;
  poster: ImageSource; // サムネイル画像
  source: MovieSource;
}

export interface HeroSection {
  title: string;
  subTitle: string;
  bgImage: ImageSource;
}

export interface IntroSection {
  heading: string;
  paragraphs: string[];
}

export interface BestShotsSection {
  heading: string;
  images: ImageSource[];
}

// GuestPerspective カード型（ベストショット or Specialサンクス）
export type GuestPerspectiveCard =
  | {
    type: 'bestShot';
    photo: ImageSource;
    photographer: string;
    title: string;
    description?: string;
  }
  | {
    type: 'specialThanks';
    photo: ImageSource;
    name: string;
    caption: string;
  };

export interface GuestPerspectivesSection {
  heading: string;
  description: string;
  cards: GuestPerspectiveCard[];
}

export interface ActionCard {
  type: 'view' | 'download';
  title: string;
  description: string;
  bgImage: ImageSource;
  button: LinkButton;
}

export interface LinksSection {
  heading: string;
  subheading: string;
  bgImage: ImageSource;
  url: string;
  isExternal: boolean;
}

export interface FooterSection {
  copyright: string;
  expiryDate: string;
}

export interface SiteContent {
  meta: { title: string; description: string };
  security: SecurityConfig;
  hero: HeroSection;
  intro: IntroSection;
  movie: MovieSection;
  bestShots: BestShotsSection;
  guestPerspectives: GuestPerspectivesSection;
  links: LinksSection;
  footer: FooterSection;
}

/* --- Data Source --- */

export const content: SiteContent = {
  meta: {
    title: "Koji & Shiori | Wedding Reception",
    description: "Thank you for celebrating with us.",
  },
  security: {
    enabled: true, // 開発中はfalse推奨
    pinCode: "1103",
    message: "Please enter the PIN code.",
  },
  hero: {
    title: "Koji & Shiori",
    subTitle: "2025.11.03 — PALACE HOTEL TOKYO",
    bgImage: { src: "/images/hero-bg.jpg", alt: "Main Visual" },
  },
  intro: {
    heading: "Thank You",
    paragraphs: [
      "私たちの新しい門出を見守っていただき",
      "心より感謝申し上げます。",
      "当日の温かな時間を",
      "映像と写真に込めました。",
    ],
  },
  movie: {
    heading: "The Movie",
    description: "",
    poster: { src: "/images/movie-poster.jpg", alt: "Movie Thumbnail" },
    // MP4設定 (推奨)
    source: {
      mode: 'file',
      url: "/videos/wedding-digest.mp4", // publicフォルダに配置
      config: {
        autoPlay: false,  // 自動再生
        muted: false,     // 音声ミュート（自動再生には必須）
        loop: false,     // ループ再生
        controls: true,  // コントローラー表示
      }
    },
    // YouTube設定 (オプション)
    /*
    source: {
      mode: 'youtube',
      videoId: "dQw4w9WgXcQ"
    }
    */
  },
  bestShots: {
    heading: "The Day",
    images: [
      { src: "/images/best-1.jpg", alt: "Scene 1" },
      { src: "/images/best-2.jpg", alt: "Scene 2" },
      { src: "/images/best-3.jpg", alt: "Scene 3" },
      { src: "/images/best-4.jpg", alt: "Scene 4" },
    ],
  },
  guestPerspectives: {
    heading: "Guest Perspective",
    description: "Every frame, a gift from you",
    cards: [
      // ベストショット枠
      {
        type: 'bestShot',
        photo: { src: "/images/N1.jpg", alt: "test" },
        photographer: "Natsumi",
        title: "Super Love",
        description: "",
      },
      {
        type: 'bestShot',
        photo: { src: "/images/T1.jpg", alt: "test" },
        photographer: "TAKUMU",
        title: "Pure Smile",
        description: "",
      },
      {
        type: 'bestShot',
        photo: { src: "/images/T2.jpg", alt: "test" },
        photographer: "TAKUMU",
        title: "Genki Girl",
        description: "",
      },
      {
        type: 'bestShot',
        photo: { src: "/images/M1.jpg", alt: "test" },
        photographer: "MEGUMI",
        title: "Competition",
        description: "",
      },
      {
        type: 'bestShot',
        photo: { src: "/images/M2.jpg", alt: "test" },
        photographer: "MEGUMI",
        title: "Crony",
        description: "",
      },
      {
        type: 'bestShot',
        photo: { src: "/images/M3.jpg", alt: "test" },
        photographer: "MEGUMI",
        title: "Memory",
        description: "",
      },
      // Specialサンクス枠
      {
        type: 'specialThanks',
        photo: { src: "/images/SS1.jpg", alt: "test" },
        name: "MEGUMI",
        caption: "Masterpiece Creator",
      },
      {
        type: 'specialThanks',
        photo: { src: "/images/SS2.jpg", alt: "test" },
        name: "NATSUMI",
        caption: "Masterpiece Creator",
      },
      {
        type: 'specialThanks',
        photo: { src: "/images/SS3.jpg", alt: "test" },
        name: "TAKUMU",
        caption: "Masterpiece Creator",
      },
      {
        type: 'specialThanks',
        photo: { src: "/images/SS10.jpg", alt: "test" },
        name: "CHA",
        caption: "Moments Archivist",
      },
      {
        type: 'specialThanks',
        photo: { src: "/images/SS11.jpg", alt: "test" },
        name: "NAOKI",
        caption: "Moments Archivist",
      },
      {
        type: 'specialThanks',
        photo: { src: "/images/SS12.jpg", alt: "test" },
        name: "TAMAO",
        caption: "Moments Archivist",
      },
      {
        type: 'specialThanks',
        photo: { src: "/images/SS13.jpg", alt: "test" },
        name: "GUMPE",
        caption: "Moments Archivist",
      },
    ],
  },
  links: {
    heading: "Open the Archive",
    subheading: "View & Download All Photos",
    bgImage: { src: "/images/new-archive-bg.jpg", alt: "Archive Background" },
    url: "https://www.weddingshare.me/weddings/ytzhkyihh1rajiaa/CgAcDbYiSwS6wYyX3qXhGkow9XJ5lJjy?openExternalBrowser=1&type=link", // 後で変更可能
    isExternal: true,
  },
  footer: {
    copyright: "© 2025 Koji & Shiori",
    expiryDate: "Available until February 2026",
  },
};
