import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const rootDir = process.cwd();
const outputDir = process.argv[2] || "dist";
const distPath = join(rootDir, outputDir);

const publicFiles = [
  "index.html",
  "entreprise.html",
  "devis_njr.html",
  "demande-informatique.html",
  "demande-nettoyage.html",
  "contact.html",
  "veille.html",
  "cv_naim.pdf"
];

const publicDirectories = [
  "assets"
];

if (existsSync(distPath)) {
  rmSync(distPath, { recursive: true, force: true });
}
mkdirSync(distPath, { recursive: true });

for (const file of publicFiles) {
  const sourcePath = join(rootDir, file);
  if (existsSync(sourcePath)) {
    cpSync(sourcePath, join(distPath, file), { force: true });
  }
}

for (const directory of publicDirectories) {
  const sourcePath = join(rootDir, directory);
  if (existsSync(sourcePath)) {
    cpSync(sourcePath, join(distPath, directory), { recursive: true, force: true });
  }
}

for (const file of publicFiles.filter((name) => name.endsWith(".html"))) {
  const filePath = join(distPath, file);
  if (!existsSync(filePath)) continue;
  let content = readFileSync(filePath, "utf8");
  if (!content.includes('data-access-mode="public"')) {
    content = content.replace(/<html([^>]*)>/i, '<html$1 data-access-mode="public">');
  }
  writeFileSync(filePath, content, "utf8");
}

cpSync(join(distPath, "index.html"), join(distPath, "404.html"), { force: true });

console.log(`Build public termine dans ${distPath}`);
