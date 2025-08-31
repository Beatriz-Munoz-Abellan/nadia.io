import path from 'path';
import fs from 'fs/promises';
import { glob } from 'glob';
import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';

const inputDir = 'imag';
const outputDir = 'imag-optim';

console.log("🖼 Optimizando imágenes a .webp desde /imag ...");

const files = await glob(`${inputDir}/**/*.{jpg,jpeg,png}`, { nodir: true });

for (const file of files) {
  const relativePath = path.relative(inputDir, file);
  const webpRelativePath = relativePath.replace(/\.(jpe?g|png)$/i, '.webp');
  const webpOutputPath = path.join(outputDir, webpRelativePath);
  const outputDirPath = path.dirname(webpOutputPath);

  // Revisa si el archivo .webp ya existe y está actualizado
  try {
    const [origStat, webpStat] = await Promise.all([
      fs.stat(file),
      fs.stat(webpOutputPath)
    ]);

    if (webpStat.mtimeMs >= origStat.mtimeMs) {
      console.log(`⏭️  ${relativePath} ya está optimizada como .webp, se omite.`);
      continue;
    }
  } catch {
    // Si no existe la .webp, seguimos con la optimización
  }

  // Crear carpetas si no existen
  await fs.mkdir(outputDirPath, { recursive: true });

  // Leer original y convertir a .webp
  const buffer = await fs.readFile(file);
  const webpBuffer = await imagemin.buffer(buffer, {
    plugins: [imageminWebp({ quality: 80 })]
  });

  await fs.writeFile(webpOutputPath, webpBuffer);

  console.log(`✔️  ${relativePath} → ${webpRelativePath}`);
}

console.log("✅ Conversión a WebP completada.");
