import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';

const HTML_DIR = '.'; // Carpeta donde están tus .html
const IMAGE_SRC_PREFIX = '../imag/';
const IMAGE_DEST_PREFIX = '../imag-optim/';

// Reemplaza extensiones por .webp
function replaceImgPath(originalPath) {
  if (originalPath.startsWith(IMAGE_SRC_PREFIX)) {
    const newPath = originalPath
      .replace(IMAGE_SRC_PREFIX, IMAGE_DEST_PREFIX)
      .replace(/\.(jpe?g|png)/i, '.webp');
    return newPath;
  }
  return originalPath;
}

const files = await glob(`${HTML_DIR}/**/*.html`);

for (const file of files) {
  let content = await fs.readFile(file, 'utf-8');

  // Encuentra todos los src="../imag/...xxx"
  const updated = content.replace(/src=["'](\.\.\/imag\/[^"']+\.(?:jpe?g|png))["']/gi, (match, p1) => {
    const newPath = replaceImgPath(p1);
    return `src="${newPath}"`;
  });

  if (updated !== content) {
    await fs.writeFile(file, updated, 'utf-8');
    console.log(`✅ Rutas de imágenes actualizadas en: ${file}`);
  } else {
    console.log(`⏭️  No se encontraron rutas para reemplazar en: ${file}`);
  }
}

console.log("🎉 Reemplazo de rutas de imágenes finalizado.");
