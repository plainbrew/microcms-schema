import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { apiSchemaSchema } from "../src/schema.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "../");

mkdirSync(distDir, { recursive: true });

writeFileSync(
  join(distDir, "schema.json"),
  JSON.stringify(z.toJSONSchema(apiSchemaSchema), null, 2),
);

console.log("Generated schema.json");
