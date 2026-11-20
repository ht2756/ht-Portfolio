import { writeFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(here, "..");
const outDir = join(projectRoot, "out");
const indexFile = join(outDir, "index.html");

if (!existsSync(outDir)) {
  console.error("postbuild: out/ directory not found. Run `next build` first.");
  process.exit(1);
}

const localeDirs = readdirSync(outDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

const defaultLocale = localeDirs.includes("zh") ? "zh" : localeDirs[0] || "zh";

const html = `<!DOCTYPE html>
<html lang="${defaultLocale}">
  <head>
    <meta charset="utf-8" />
    <title>HT Lab</title>
    <meta name="robots" content="noindex" />
    <script>
      (function () {
        var path = location.pathname;
        var search = location.search || "";
        var hash = location.hash || "";
        var target;
        if (path === "/" || path === "/index.html") {
          target = "/${defaultLocale}/index.html";
        } else if (path.slice(-1) === "/") {
          target = path + "index.html";
        } else {
          target = path + "/index.html";
        }
        location.replace(target + search + hash);
      })();
    </script>
  </head>
  <body>
    <noscript>HT Lab 需要启用 JavaScript 才能选择正确的入口页。<a href="/${defaultLocale}/index.html">前往首页</a></noscript>
  </body>
</html>
`;

writeFileSync(indexFile, html, "utf8");
console.log(`postbuild: rewrote ${indexFile} with smart redirect (default locale: ${defaultLocale}).`);
