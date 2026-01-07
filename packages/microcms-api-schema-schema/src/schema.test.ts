import { describe, expect, test } from "vitest";
import { apiSchemaSchema } from "./schema.js";

describe("apiSchemaSchema", () => {
  test("official-categories.json のスキーマをバリデーションできる", () => {
    const schema = {
      apiFields: [
        {
          fieldId: "name",
          name: "カテゴリ名",
          kind: "text",
          required: false,
          isUnique: false,
        },
      ],
      customFields: [],
    };

    const result = apiSchemaSchema.safeParse(schema);
    expect(result.success).toBe(true);
  });

  test("official-news.json のスキーマをバリデーションできる", () => {
    const schema = {
      apiFields: [
        {
          fieldId: "title",
          name: "タイトル",
          kind: "text",
          required: false,
          isUnique: false,
        },
        {
          fieldId: "content",
          name: "内容",
          kind: "richEditorV2",
          required: false,
        },
        {
          fieldId: "category",
          name: "カテゴリ",
          kind: "relation",
          required: false,
        },
      ],
      customFields: [],
    };

    const result = apiSchemaSchema.safeParse(schema);
    expect(result.success).toBe(true);
  });

  test("official-blogs.json のスキーマをバリデーションできる", () => {
    const schema = {
      apiFields: [
        {
          fieldId: "title",
          name: "タイトル",
          kind: "text",
          required: false,
          isUnique: false,
        },
        {
          fieldId: "content",
          name: "内容",
          kind: "richEditorV2",
          required: false,
        },
        {
          fieldId: "eyecatch",
          name: "アイキャッチ",
          kind: "media",
          required: false,
        },
        {
          fieldId: "category",
          name: "カテゴリ",
          kind: "relation",
          required: false,
        },
      ],
      customFields: [],
    };

    const result = apiSchemaSchema.safeParse(schema);
    expect(result.success).toBe(true);
  });

  test("複雑なスキーマをバリデーションできる", () => {
    const schema = {
      apiFields: [
        {
          fieldId: "text_max",
          name: "テキストフィールド 最大",
          kind: "text",
          description: "説明文",
          required: true,
          selectItems: [],
          selectInitialValue: [],
          multipleSelect: false,
          textSizeLimitValidation: { textSize: { min: 1, max: 30 } },
          patternMatchValidation: { regexp: { pattern: "\\d", flags: "gi" } },
          isUnique: true,
        },
        {
          fieldId: "rich_max",
          name: "リッチエディタ 最大",
          kind: "richEditorV2",
          description: "説明文",
          required: true,
          richEditorV2Options: ["undo", "redo", "bold", "italic", "underline", "code"],
          richEditorV2ColorList: [
            { id: "KDKsIv0jXZ", value: "rgb(255, 255, 255)" },
            { id: "vHyfNOIY51", value: "rgb(156, 102, 102)" },
          ],
          richEditorV2HideColorPicker: true,
          richEditorV2FontSizeList: [{ id: "Sp9MppHN43", name: "表示名", value: "120" }],
          customClassList: [{ id: "nL3_cmKOxf", name: "表示名", value: "class名" }],
        },
        {
          fieldId: "image_max",
          name: "画像 最大",
          kind: "media",
          description: "説明文",
          required: true,
          imageSizeValidation: { imageSize: { width: 100, height: 100 } },
        },
        {
          fieldId: "select_max",
          name: "セレクトフィールド 最大",
          kind: "select",
          required: true,
          selectItems: [
            { id: "viO1_AW73E", value: "item1" },
            { id: "6bnahbE--K", value: "item2" },
          ],
          selectInitialValue: ["viO1_AW73E"],
          multipleSelect: true,
        },
        {
          fieldId: "relation_multi_max",
          name: "複数参照 最大",
          kind: "relationList",
          description: "説明文",
          required: true,
          referenceDisplayItem: "eO9ST_qUoe",
          relationListCountLimitValidation: {
            relationListCount: { min: 1, max: 3 },
          },
        },
        {
          fieldId: "number_max",
          name: "数字 最大",
          kind: "number",
          description: "説明文",
          required: true,
          numberSizeLimitValidation: { numberSize: { min: 1, max: 300 } },
        },
      ],
      customFields: [],
    };

    const result = apiSchemaSchema.safeParse(schema);
    expect(result.success).toBe(true);
  });

  test("不正なスキーマはバリデーションエラーになる", () => {
    const invalidSchema = {
      apiFields: [
        {
          fieldId: "test",
          // name が欠けている
          kind: "text",
          required: false,
        },
      ],
      customFields: [],
    };

    const result = apiSchemaSchema.safeParse(invalidSchema);
    expect(result.success).toBe(false);
  });

  test("不正な kind はバリデーションエラーになる", () => {
    const invalidSchema = {
      apiFields: [
        {
          fieldId: "test",
          name: "テスト",
          kind: "invalid_kind",
          required: false,
        },
      ],
      customFields: [],
    };

    const result = apiSchemaSchema.safeParse(invalidSchema);
    expect(result.success).toBe(false);
  });
});
