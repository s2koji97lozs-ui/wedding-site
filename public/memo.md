画像・動画ファイルの配置場所
フォルダ構造
public/
  ├── images/          ← ここに画像を配置
  │   ├── hero-bg.jpg
  │   ├── movie-poster.jpg
  │   ├── best-1.jpg
  │   ├── best-2.jpg
  │   ├── best-3.jpg
  │   ├── best-4.jpg
  │   ├── guest-1.jpg
  │   ├── guest-2.jpg
  │   ├── guest-3.jpg
  │   ├── guest-4.jpg
  │   ├── guest-5.jpg
  │   ├── link-view.jpg
  │   └── link-download.jpg
  └── videos/          ← ここに動画を配置
      └── wedding-digest.mp4



      
画像ファイル（public/images/）:
hero-bg.jpg - ヒーローセクションの背景画像
movie-poster.jpg - 動画のサムネイル画像
best-1.jpg ~ best-4.jpg - ベストショット用画像（4枚）
guest-1.jpg ~ guest-5.jpg - ゲストハイライト用画像（5枚）
link-view.jpg - ギャラリーリンクの背景画像
link-download.jpg - ダウンロードリンクの背景画像
動画ファイル（public/videos/）:
wedding-digest.mp4 - メインの動画ファイル
重要なポイント
ファイル名は正確に: content.tsで指定されているファイル名と同じにしてください
パスの指定: publicフォルダ内のファイルは、パスの先頭に/をつけて指定します（例: /images/hero-bg.jpg）
サイズの推奨:
ヒーロー画像: 大きな背景用なので高解像度推奨
ベストショット: ギャラリー表示用なので適切なサイズに最適化
動画: MP4形式で、ファイルサイズに注意
ファイルを配置すれば、サイトに表示されます。