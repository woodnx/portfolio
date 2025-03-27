---
title: Portfolio
description: このサイト
publishedAt: 2025-03-28
developedStart: 2025-03
tags: [Astro, docker, nodejs, nginx]
category: Web
pinned: true
image: ../../images/portfolio.png
alt: ポートフォリオのイメージ画像
---

# 概要
自分自身のことや作ったものを事細かに書いたページ。開発経緯など技術的なこと以外は[Blog](/posts/uunk21jpjxk0pzuq)を参照されたい。

# 技術スタック
本ポートフォリオは、静的Webサイトを作成できるフレームワークである[Astro](https://docs.astro.build/ja/getting-started/)を用いた。技術選定にあたって、考慮した点を以下に示す。

- 静的サイトのフレームワーク
- コンポーネントによる構造化
- キャッチアップの容易さ
- 日本語文献が豊富

個人的には日本語のチュートリアルがあったことがとてもうれしかった。有志に感謝。

割とPureに近い状態でHTMLやCSSを扱いながら、コンポーネントスタイルでプログラミングできるのが、とても魅力的に感じた。Vue.jsやSvelteも同じようなことはできなくはないが、静的サイトに特化したのが開発体験の良さにつながっているように思う。

## ライブラリ
### [tailwindcss](https://tailwindcss.com/)
初めて本格的にtailwindに触れたが、とても扱いやすかった。HTMLタグをきちんと使い分けする動機にもなったし、なにより普段UIコンポーネントによって隠蔽されている中身を垣間見れるのが楽しかった。

### [Day.js](https://day.js.org/)
JavaScript組み込みの`Date`オブジェクトが使いづらいので導入。`dayjs().format()`関数が非常に便利。

### [Expressive Code](https://expressive-code.com/)
リッチなコードブロックを表示できるライブラリ。コピーボタンの追加や、コードのハイライトができる。設定や使い方などは[この記事](https://roboin.io/article/2023/12/16/how-to-use-expressive-code-in-markdown-and-astro/)が参考になる。

### [pagefind](https://pagefind.app/)
`Blog`における記事検索機能の実装に用いた。導入には[この記事](https://blog.eno1220.dev/posts/pagefind-astro)が参考になる。

## 自分でつくったもの
### 記事作成スクリプト
Zennのように、コマンドから記事のテンプレートを自動作成してくれるスクリプトを自作した。

https://github.com/woodnx/portfolio/blob/b02778846ecf97da2e8d9054f7ff47f33c73ab64/src/scripts/generate-new-post.ts#L1-L30:embed:lang=typescript:h200

### 目次
[tocbot](https://tscanlin.github.io/tocbot/#)のような自動で目次を作ってくれるライブラリもあるが、時間の関係で自前で用意した。いずれtocbotに移行するかも。

https://github.com/woodnx/portfolio/blob/b02778846ecf97da2e8d9054f7ff47f33c73ab64/src/components/TableOfContents.astro#L1-L25:embed:lang=typescript:h200

# 参考記事
ポートフォリオをつくるにあたって、参考にしたサイトをいくつか紹介する。

## サイト構成 / デザイン
### [あゆたそどっとこむ](https://portfolio.ayutaso.com/)
`About me`ページはだいたいこの方を参考にした、というよりほぼパクリ...? サイト全体のデザインも出来る限り似てしまうのを避けようと努力したが、結局ジェネリックみたいな感じになってしまった。本当に申し訳ない。

### [нуль](https://hypb.dev/)
`Works`の一覧表示用カードや`Blog`での検索機能のデザインを参考にした。

この方のサイト、全体的なデザインが洗練されている。自分のポートフォリオもこんなサイトにしてみたいが、デザインセンスが皆無なので時間がかかりそう。

### [Zenn](https://zenn.dev/)
言わずと知れたテックブログサイト。

記事の一覧表示の際に表示されるコンテンツのデザインを、アイコンの表示方法も含めて参考にした。

### [ラムダ技術部](https://xn--6ck3c0a.com/)
Youtubeなどで活躍されておられるラムダ技術部さんのサイト。本ポートフォリオでは、`About me`内の`History`でのデザインにおいて参考にした。

## 技術的なこと
### フォント関連
本サイトのフォントは[M PLUS Rounded 1c](https://fonts.google.com/specimen/M+PLUS+Rounded+1c?subset=japanese)を用いているが、これをそのまま使うとジャギってしまう。そのため、[この記事](https://zipang.dev/css/m-plus-rounded-1c-is-dirty-but-it-is-displayed-neatly-by-adding-css/)を参考に然るべき箇所 (bodyタグなど) のCSSに`transform:rotateZ(0.03deg);`を追加した。なお、サイト全体に適用してしまうと、サイト全体が若干傾いて見えるためbody要素などに限定した箇所でCSSを追加したほうがよい。

### CSS
`Works`や`Blog`の記事の本文はMarkdown記法で記述している。AstroではデフォルトでGithub Flavor Markdown (GFM) に対応しているが、そのスタイルは自前で用意しなければならない。そのため、[この記事](https://qiita.com/__mick/items/c80fab6c185a41882880)を参考にしてGithubのCSSテーマを本文に適用した。

なお、このCSSを適用してもうまく箇条書きが適用されない場合がある。これは、`list-style-type`が正しく設定されないためであるが、その場合はCSSファイルの当該箇所を
```css ins={8-49} del={1-7} startLineNumber=440 frame="terminal"
.markdown-body ul,
.markdown-body ol {
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 2em;
}

.markdown-body ul {
  list-style-type: disc; /* 箇条書きの点 */
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 2em;
}

.markdown-body ol {
  list-style-type: decimal; /* 番号付きリスト */
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 2em;
}

.markdown-body ul ul,
.markdown-body ul ol,
.markdown-body ol ol,
.markdown-body ol ul {
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 2em;
}

.markdown-body ol ol {
  list-style-type: lower-roman; /* ネストされた番号付きリストのスタイル */
}

.markdown-body ul ul {
  list-style-type: circle; /* ネストされた箇条書きのスタイル */
}

.markdown-body ul ul ul {
  list-style-type: square;
}

.markdown-body ul.no-list,
.markdown-body ol.no-list {
  padding: 0;
  list-style-type: none; /* no-listクラスが付いている場合は点を表示しない */
}
```
とすればよい。

# おわりに
ようやく自分のポートフォリオを作ることができた。
せっかく作ったので、コンテンツやブログ等、積極的に充実させていきたい。

## これからやりたいこと
- [ ] 各種SNSリンクの追加
- [ ] GitHub Actionsによる自動校正&デプロイ
- [ ] スキル欄の充実
- [ ] 目次の改修