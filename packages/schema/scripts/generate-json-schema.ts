import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { apiSchema } from "../src/schema.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "../dist");

mkdirSync(distDir, { recursive: true });

writeFileSync(join(distDir, "schema.json"), JSON.stringify(z.toJSONSchema(apiSchema), null, 2));

console.log("Generated schema.json");
