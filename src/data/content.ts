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

export interface GuestImage extends ImageSource {
  photographer: string;
  comment: string;
}

export interface GuestHighlightsSection {
  heading: string;
  description: string;
  images: GuestImage[];
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
  viewGallery: ActionCard;
  downloadData: ActionCard;
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
  guestHighlights: GuestHighlightsSection;
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
    enabled: false, // 開発中はfalse推奨
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
  guestHighlights: {
    heading: "Guest Perspective",
    description: "たくさんの写真と動画をありがとうございます",
    images: [
      {
        src: "/images/guest-1.jpg",
        alt: "Guest 1",
        photographer: "Photographer Name",
        comment: "A beautiful moment captured during the celebration"
      },
      {
        src: "/images/guest-2.jpg",
        alt: "Guest 2",
        photographer: "Photographer Name",
        comment: "Thank you for sharing this special day with us"
      },
      {
        src: "/images/guest-3.jpg",
        alt: "Guest 3",
        photographer: "Photographer Name",
        comment: "Memories that will last a lifetime"
      },
      {
        src: "/images/guest-4.jpg",
        alt: "Guest 4",
        photographer: "Photographer Name",
        comment: "Wishing you both a lifetime of happiness"
      },
      {
        src: "/images/guest-5.jpg",
        alt: "Guest 5",
        photographer: "Photographer Name",
        comment: "Congratulations on your special day"
      },
      {
        src: "/images/guest-6.jpg",
        alt: "Guest 5",
        photographer: "Photographer Name",
        comment: "Congratulations on your special day"
      },
      {
        src: "/images/guest-7.jpg",
        alt: "Guest 5",
        photographer: "Photographer Name",
        comment: "Congratulations on your special day"
      },
      {
        src: "/images/guest-8.jpg",
        alt: "Guest 5",
        photographer: "Photographer Name",
        comment: "Congratulations on your special day"
      },
    ],
  },
  links: {
    heading: "Digital Collection",
    viewGallery: {
      type: 'view',
      title: "The Gallery",
      description: "プロ撮影の写真",
      bgImage: { src: "/images/link-view.jpg", alt: "View Bg" },
      button: {
        label: "View Gallery",
        url: "https://aoulee.pixieset.com/shiorikojioginopalacewedding/",
        isExternal: true,
      },
    },
    downloadData: {
      type: 'download',
      title: "Downloads",
      description: "共有写真",
      bgImage: { src: "/images/link-download.jpg", alt: "Download Bg" },
      button: {
        label: "Download All",
        url: "https://www.weddingshare.me/weddings/ytzhkyihh1rajiaa/CgAcDbYiSwS6wYyX3qXhGkow9XJ5lJjy?openExternalBrowser=1&type=link",
        isExternal: true,
      },
    },
  },
  footer: {
    copyright: "© 2025 Koji & Shiori",
    expiryDate: "Available until November 2026",
  },
};
