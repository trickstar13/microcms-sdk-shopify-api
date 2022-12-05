# microcms-sdk-shopify-api

microCMS での Shopify 商品選択用拡張フィールド

## Getting Started

```sh
npm run dev
```

## 環境変数

```sh
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN='XXX.myshopify.com'
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN='XXXXXXXXXXXXXXXXXX'
NEXT_PUBLIC_MICROCMS_ORIGIN='https://XXXXXX.microcms.io'
```

## 開発について

microCMS にて、localhost の URL を拡張フィールドに指定してデバッグしたい場合は`npm run build`ののちに`npm start`を実行する。
next dev で起動している場合、addEventListener の実行が間に合わない可能性あり。
NEXT_PUBLIC_MICROCMS_ORIGIN も localhost に変更すること。
