// Готовит папку www: копирует скрипты Capacitor и шрифты из node_modules.
// Запускается командой: npm run build
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const nm = (p) => join(root, 'node_modules', p);

function copy(src, destDir, name) {
  if (!existsSync(src)) {
    console.error('Не найден файл: ' + src + '. Сначала выполни: npm install');
    process.exit(1);
  }
  mkdirSync(destDir, { recursive: true });
  copyFileSync(src, join(destDir, name));
}

const vendor = join(root, 'www', 'vendor');
copy(nm('@capacitor/core/dist/capacitor.js'), vendor, 'capacitor.js');
copy(nm('@capacitor/local-notifications/dist/plugin.js'), vendor, 'local-notifications.js');
copy(nm('@capacitor/preferences/dist/plugin.js'), vendor, 'preferences.js');

const fonts = join(root, 'www', 'fonts');
for (const w of [400, 500, 600, 700]) {
  for (const s of ['latin', 'cyrillic']) {
    copy(nm(`@fontsource/onest/files/onest-${s}-${w}-normal.woff2`), fonts, `onest-${s}-${w}.woff2`);
  }
}
for (const w of [500, 600]) {
  for (const s of ['latin', 'cyrillic']) {
    copy(nm(`@fontsource/unbounded/files/unbounded-${s}-${w}-normal.woff2`), fonts, `unbounded-${s}-${w}.woff2`);
  }
}

console.log('www готов');
