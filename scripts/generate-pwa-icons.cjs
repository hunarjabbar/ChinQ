const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="100" fill="#cc0000"/>
  <text x="256" y="340" font-size="240" font-family="sans-serif" font-weight="900" fill="white" text-anchor="middle">ICA</text>
</svg>
`;

const svgMaskable = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#cc0000"/>
  <text x="256" y="340" font-size="200" font-family="sans-serif" font-weight="900" fill="white" text-anchor="middle">ICA</text>
</svg>
`;

async function generateIcons() {
  const iconsDir = path.join(__dirname, '..', 'public', 'icons');
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }

  console.log('Generating PWA icons...');

  try {
    // Regular 192x192
    await sharp(Buffer.from(svgIcon))
      .resize(192, 192)
      .png()
      .toFile(path.join(iconsDir, 'icon-192.png'));

    // Regular 512x512
    await sharp(Buffer.from(svgIcon))
      .resize(512, 512)
      .png()
      .toFile(path.join(iconsDir, 'icon-512.png'));

    // Maskable 512x512
    await sharp(Buffer.from(svgMaskable))
      .resize(512, 512)
      .png()
      .toFile(path.join(iconsDir, 'icon-maskable-512.png'));

    console.log('PWA icons generated successfully.');
  } catch (error) {
    console.error('Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons();
