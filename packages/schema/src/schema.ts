import { z } from "zod";

const textSizeLimitValidationSchema = z.object({
  textSize: z.object({
    min: z.number().optional(),
    max: z.number().optional(),
  }),
});

const patternMatchValidationSchema = z.object({
  regexp: z.object({
    pattern: z.string(),
    flags: z.string().optional(),
  }),
});

const imageSizeValidationSchema = z.object({
  imageSize: z.object({
    width: z.number(),
    height: z.number(),
  }),
});

const numberSizeLimitValidationSchema = z.object({
  numberSize: z.object({
    min: z.number().optional(),
    max: z.number().optional(),
  }),
});

const relationListCountLimitValidationSchema = z.object({
  relationListCount: z.object({
    min: z.number().optional(),
    max: z.number().optional(),
  }),
});

const selectItemSchema = z.object({
  id: z.string(),
  value: z.string(),
});

const richEditorV2ColorListItemSchema = z.object({
  id: z.string(),
  value: z.string(),
});

const richEditorV2FontSizeListItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  value: z.string(),
});

const customClassListItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  value: z.string(),
});

const baseFieldSchema = z.object({
  fieldId: z.string(),
  name: z.string(),
  description: z.string().optional(),
  required: z.boolean(),
});

// テキストフィールド (text)
const textFieldSchema = baseFieldSchema.extend({
  kind: z.literal("text"),
  isUnique: z.boolean().optional(),
  textSizeLimitValidation: textSizeLimitValidationSchema.optional(),
  patternMatchValidation: patternMatchValidationSchema.optional(),
  selectItems: z.array(selectItemSchema).optional(),
  selectInitialValue: z.array(z.string()).optional(),
  multipleSelect: z.boolean().optional(),
});

// テキストエリア (textArea)
const textAreaFieldSchema = baseFieldSchema.extend({
  kind: z.literal("textArea"),
  textSizeLimitValidation: textSizeLimitValidationSchema.optional(),
  patternMatchValidation: patternMatchValidationSchema.optional(),
});

// リッチエディタ (richEditorV2)
const richEditorV2FieldSchema = baseFieldSchema.extend({
  kind: z.literal("richEditorV2"),
  richEditorV2Options: z.array(z.string()).optional(),
  richEditorV2ColorList: z.array(richEditorV2ColorListItemSchema).optional(),
  richEditorV2HideColorPicker: z.boolean().optional(),
  richEditorV2FontSizeList: z.array(richEditorV2FontSizeListItemSchema).optional(),
  customClassList: z.array(customClassListItemSchema).optional(),
});

// 旧リッチエディタ (richEditor)
const richEditorFieldSchema = baseFieldSchema.extend({
  kind: z.literal("richEditor"),
  richEditorImageSize: z.boolean().optional(),
  richEditorOptions: z.array(z.string()).optional(),
});

// 画像 (media)
const mediaFieldSchema = baseFieldSchema.extend({
  kind: z.literal("media"),
  imageSizeValidation: imageSizeValidationSchema.optional(),
});

// 複数画像 (mediaList)
const mediaListFieldSchema = baseFieldSchema.extend({
  kind: z.literal("mediaList"),
  imageSizeValidation: imageSizeValidationSchema.optional(),
  mediaListLayout: z.string().optional(),
});

// 日時 (date)
const dateFieldSchema = baseFieldSchema.extend({
  kind: z.literal("date"),
  dateFormat: z.boolean().optional(),
});

// 真偽値 (boolean)
const booleanFieldSchema = baseFieldSchema.extend({
  kind: z.literal("boolean"),
  booleanInitialValue: z.boolean().optional(),
});

// セレクトフィールド (select)
const selectFieldSchema = baseFieldSchema.extend({
  kind: z.literal("select"),
  selectItems: z.array(selectItemSchema),
  selectInitialValue: z.array(z.string()),
  multipleSelect: z.boolean(),
});

// コンテンツ参照 (relation)
const relationFieldSchema = baseFieldSchema.extend({
  kind: z.literal("relation"),
  referenceDisplayItem: z.string().optional(),
});

// 複数コンテンツ参照 (relationList)
const relationListFieldSchema = baseFieldSchema.extend({
  kind: z.literal("relationList"),
  referenceDisplayItem: z.string().optional(),
  relationListCountLimitValidation: relationListCountLimitValidationSchema.optional(),
});

// 数字 (number)
const numberFieldSchema = baseFieldSchema.extend({
  kind: z.literal("number"),
  numberSizeLimitValidation: numberSizeLimitValidationSchema.optional(),
});

// 拡張フィールド (iframe)
const iframeFieldSchema = baseFieldSchema.extend({
  kind: z.literal("iframe"),
  iframeUrl: z.string(),
});

export const apiFieldSchema = z.discriminatedUnion("kind", [
  textFieldSchema,
  textAreaFieldSchema,
  richEditorFieldSchema,
  richEditorV2FieldSchema,
  mediaFieldSchema,
  mediaListFieldSchema,
  dateFieldSchema,
  booleanFieldSchema,
  selectFieldSchema,
  relationFieldSchema,
  relationListFieldSchema,
  numberFieldSchema,
  iframeFieldSchema,
]);

export const apiSchema = z.object({
  apiFields: z.array(apiFieldSchema),
  customFields: z.array(z.unknown()),
});

export type ApiSchema = z.infer<typeof apiSchema>;
