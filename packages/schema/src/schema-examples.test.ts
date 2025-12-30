import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, test } from "vitest";
import { apiSchema } from "./schema.js";

const SCHEMA_EXAMPLES_DIR = join(__dirname, "../../../schema-examples");

describe("schema-examples のファイルをバリデーション", () => {
  test("official-categories.json", () => {
    const filePath = join(SCHEMA_EXAMPLES_DIR, "official-categories.json");
    const content = readFileSync(filePath, "utf-8");
    const schema = JSON.parse(content);

    const result = apiSchema.safeParse(schema);
    if (!result.success) {
      console.error(result.error);
    }
    expect(result.success).toBe(true);
  });

  test("official-news.json", () => {
    const filePath = join(SCHEMA_EXAMPLES_DIR, "official-news.json");
    const content = readFileSync(filePath, "utf-8");
    const schema = JSON.parse(content);

    const result = apiSchema.safeParse(schema);
    if (!result.success) {
      console.error(result.error);
    }
    expect(result.success).toBe(true);
  });

  test("official-blogs.json", () => {
    const filePath = join(SCHEMA_EXAMPLES_DIR, "official-blogs.json");
    const content = readFileSync(filePath, "utf-8");
    const schema = JSON.parse(content);

    const result = apiSchema.safeParse(schema);
    if (!result.success) {
      console.error(result.error);
    }
    expect(result.success).toBe(true);
  });

  test("official-banner.json", () => {
    const filePath = join(SCHEMA_EXAMPLES_DIR, "official-banner.json");
    const content = readFileSync(filePath, "utf-8");
    const schema = JSON.parse(content);

    const result = apiSchema.safeParse(schema);
    if (!result.success) {
      console.error(result.error);
    }
    expect(result.success).toBe(true);
  });

  test("min-max.json", () => {
    const filePath = join(SCHEMA_EXAMPLES_DIR, "min-max.json");
    const content = readFileSync(filePath, "utf-8");
    const schema = JSON.parse(content);

    const result = apiSchema.safeParse(schema);
    if (!result.success) {
      console.error(result.error);
    }
    expect(result.success).toBe(true);
  });
});
