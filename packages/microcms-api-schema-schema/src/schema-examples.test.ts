import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, test } from "vitest";
import { apiSchemaSchema } from "./schema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SCHEMA_EXAMPLES_DIR = join(__dirname, "../../../schema-examples");

const schemaFiles = [
  "official-categories.json",
  "official-news.json",
  "official-blogs.json",
  "official-banner.json",
  "min-max.json",
];

describe("schema-examples のファイルをバリデーション", () => {
  test.each(schemaFiles)("%s", (filename) => {
    const filePath = join(SCHEMA_EXAMPLES_DIR, filename);
    const content = readFileSync(filePath, "utf-8");
    const schema = JSON.parse(content);

    const result = apiSchemaSchema.safeParse(schema);
    if (!result.success) {
      console.error(result.error);
    }
    expect(result.success).toBe(true);
  });
});
