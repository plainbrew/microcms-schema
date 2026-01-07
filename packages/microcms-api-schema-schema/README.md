# microcms-api-schema-schema

microCMS の API スキーマを定義するためのスキーマライブラリ

## 概要

このパッケージは、microCMS の API スキーマを TypeScript で型安全に定義し、Zod によるランタイムバリデーションを提供します。

## インストール

```bash
pnpm add @plainbrew/microcms-api-schema-schema
```

## 使い方

### JSON Schema としての利用

`$schema` プロパティで JSON Schema を参照することで、エディタの補完やバリデーションを有効にできます。

```json
{
  "$schema": "./node_modules/@plainbrew/microcms-api-schema-schema/schema.json",
  "apiFields": [
    {
      "fieldId": "title",
      "name": "タイトル",
      "kind": "text",
      "required": true
    },
    {
      "fieldId": "body",
      "name": "本文",
      "kind": "richEditorV2",
      "required": false
    },
    {
      "fieldId": "thumbnail",
      "name": "サムネイル",
      "kind": "media",
      "required": true,
      "imageSizeValidation": {
        "imageSize": {
          "width": 1200,
          "height": 630
        }
      }
    }
  ],
  "customFields": []
}
```

### サポートされるフィールドタイプ

| kind           | 説明                     |
| -------------- | ------------------------ |
| `text`         | テキストフィールド       |
| `textArea`     | テキストエリア           |
| `richEditor`   | リッチエディタ（従来版） |
| `richEditorV2` | リッチエディタ（V2）     |
| `media`        | 画像                     |
| `mediaList`    | 画像リスト               |
| `date`         | 日付                     |
| `boolean`      | ブーリアン               |
| `select`       | セレクトフィールド       |
| `number`       | 数値                     |
| `relation`     | コンテンツ参照           |
| `relationList` | 複数コンテンツ参照       |
| `iframe`       | 拡張フィールド           |

## 開発

```bash
# ビルド
pnpm build

# 開発モード（watch）
pnpm dev

# テスト
pnpm test
```
