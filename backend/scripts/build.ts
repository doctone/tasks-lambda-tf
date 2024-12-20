import * as esbuild from "esbuild";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir: string = path.resolve(__dirname, "../src/lambdas");
const distDir: string = path.resolve(__dirname, "../dist");

const getEntryPoints = (dir: string): string[] => {
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".ts") && file.includes("test") === false)
    .map((file) => path.join(dir, file));
};

const build = async () => {
  const entryPoints: string[] = getEntryPoints(srcDir);

  if (entryPoints.length === 0) {
    console.error("No .ts files found in src directory.");
    process.exit(1);
  }

  for (const entryPoint of entryPoints) {
    const fileName: string = path.parse(entryPoint).name;
    const outputDir: string = path.join(distDir, fileName);

    try {
      await esbuild.build({
        entryPoints: [entryPoint],
        bundle: true,
        platform: "node",
        target: "node20",
        outfile: path.join(outputDir, "index.js"),
        sourcemap: true,
        minify: true,
        format: "cjs",
      });

      console.log(`✅ Built: ${entryPoint} -> ${outputDir}/index.js`);
    } catch (err) {
      console.error(`❌ Failed to build ${entryPoint}:`, err);
      process.exit(1);
    }
  }
};

build();
