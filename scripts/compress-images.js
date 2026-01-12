/**
 * 画像圧縮スクリプト
 * 大きなJPG画像を最適化して圧縮します
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../public/images');
const MAX_WIDTH = 1920;  // 最大幅
const QUALITY = 80;      // JPEG品質 (0-100)
const SIZE_THRESHOLD = 500 * 1024; // 500KB以上のファイルを圧縮

async function compressImages() {
    const files = fs.readdirSync(IMAGES_DIR);
    const jpgFiles = files.filter(f => /\.(jpg|jpeg)$/i.test(f));

    console.log(`Found ${jpgFiles.length} JPG files\n`);

    for (const file of jpgFiles) {
        const filePath = path.join(IMAGES_DIR, file);
        const stats = fs.statSync(filePath);
        const sizeMB = (stats.size / 1024 / 1024).toFixed(2);

        if (stats.size < SIZE_THRESHOLD) {
            console.log(`⏭️  ${file} (${sizeMB}MB) - skipped (< 500KB)`);
            continue;
        }

        try {
            // バックアップを作成
            const backupPath = filePath.replace(/\.(jpg|jpeg)$/i, '_backup.$1');
            if (!fs.existsSync(backupPath)) {
                fs.copyFileSync(filePath, backupPath);
            }

            // 圧縮
            const image = sharp(filePath);
            const metadata = await image.metadata();

            let pipeline = image;

            // 幅が大きい場合はリサイズ
            if (metadata.width > MAX_WIDTH) {
                pipeline = pipeline.resize(MAX_WIDTH, null, {
                    withoutEnlargement: true,
                    fit: 'inside'
                });
            }

            // 圧縮して保存
            const buffer = await pipeline
                .jpeg({ quality: QUALITY, progressive: true })
                .toBuffer();

            fs.writeFileSync(filePath, buffer);

            const newStats = fs.statSync(filePath);
            const newSizeMB = (newStats.size / 1024 / 1024).toFixed(2);
            const reduction = ((1 - newStats.size / stats.size) * 100).toFixed(1);

            console.log(`✅ ${file}: ${sizeMB}MB → ${newSizeMB}MB (-${reduction}%)`);

        } catch (error) {
            console.error(`❌ ${file}: Error - ${error.message}`);
        }
    }

    console.log('\n✨ Compression complete!');
}

compressImages().catch(console.error);
