import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    unoptimized: true, // 開発時は画像最適化を無効化（ファイルが存在しなくてもエラーにならないように）
    remotePatterns: [], // リモート画像を使用する場合はここに設定
  },
};

export default nextConfig;
