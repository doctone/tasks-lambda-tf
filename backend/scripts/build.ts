import * as esbuild from "esbuild";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directories
const srcDir: string = path.resolve(__dirname, "../src/lambdas"); // Input source directory
const distDir: string = path.resolve(__dirname, "../dist"); // Output directory

// Helper to find all .ts files in the source directory
const getEntryPoints = (dir: string): string[] => {
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".ts") && file.includes("test") === false)
    .map((file) => path.join(dir, file));
};

// Build each entry file into its own output directory
const build = async () => {
  const entryPoints: string[] = getEntryPoints(srcDir);

  if (entryPoints.length === 0) {
    console.error("No .ts files found in src directory.");
    process.exit(1);
  }

  for (const entryPoint of entryPoints) {
    const fileName: string = path.parse(entryPoint).name; // Get the base name (e.g., 'get' from 'get.ts')
    const outputDir: string = path.join(distDir, fileName); // e.g., dist/get

    try {
      await esbuild.build({
        entryPoints: [entryPoint],
        bundle: true,
        platform: "node",
        target: "node20", // Adjust Node.js target
        outfile: path.join(outputDir, "index.js"), // lambdas/get/index.js
        sourcemap: true,
        minify: true,
        format: "cjs", // Ensure CommonJS output
      });

      console.log(`✅ Built: ${entryPoint} -> ${outputDir}/index.js`);
    } catch (err) {
      console.error(`❌ Failed to build ${entryPoint}:`, err);
      process.exit(1);
    }
  }
};

// Run the build
build();
