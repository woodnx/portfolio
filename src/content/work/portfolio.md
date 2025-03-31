---
title: Portfolio
description: このサイト
publishedAt: 2025-03-31
developedStart: 2025-03-01
tags: [Astro, docker, nodejs, nginx]
category: Web
pinned: true
image: ../../images/portfolio.png
alt: ポートフォリオのスクリーンショット
---

# 概要
自分自身のことや作ったものを事細かに書いたページ。開発経緯など技術的なこと以外は[Blog](/posts/uunk21jpjxk0pzuq)を参照されたい。

# 技術スタック
本ポートフォリオは、静的Webサイトを作成できるフレームワークである[Astro](https://docs.astro.build/ja/getting-started/)を用いた。技術選定にあたって、考慮した点を以下に示す。

- 静的サイトのフレームワーク
- コンポーネントによる構造化
- キャッチアップの容易さ
- 日本語文献が豊富

個人的にうれしかったのは、日本語のチュートリアルがあったことである。有志に感謝したい。

割とPureに近い状態でHTMLやCSSを扱いながら、コンポーネントスタイルでプログラミングできるのが、とても魅力的に感じた。Vue.jsやSvelteも同じようなことができなくはないが、静的サイトに特化したのが開発体験の良さにつながっているように思う。

## ライブラリ
### [tailwindcss](https://tailwindcss.com/)
初めて本格的にtailwindに触れたが、とても扱いやすかった。HTMLタグをきちんと使い分けする動機にもなったし、なにより普段UIコンポーネントによって隠蔽されている中身を垣間見られるのが楽しかった。

### [Day.js](https://day.js.org/)
JavaScript組み込みの`Date`オブジェクトが使いづらいので導入。`dayjs().format()`関数が非常に便利。

### [Expressive Code](https://expressive-code.com/)
リッチなコードブロックを表示できるライブラリ。コピーボタンの追加や、コードのハイライトができる。設定や使い方などは[この記事](https://roboin.io/article/2023/12/16/how-to-use-expressive-code-in-markdown-and-astro/)が参考になる。

### [pagefind](https://pagefind.app/)
`Blog`における記事検索機能の実装に用いた。導入には[この記事](https://blog.eno1220.dev/posts/pagefind-astro)が参考になる。

## 自分でつくったもの
### 記事作成スクリプト
Zennのように、コマンドから記事のテンプレートを自動作成してくれるスクリプトを自作した。

```typescript title="generate-new-post.ts"
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { customAlphabet } from 'nanoid';
import dayjs from 'dayjs';

const directory = './src/content/blog';
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 16);
const frontmatter = {
  layout: '@/layouts/PostLayout.astro',
  title: '',
  publishedAt: dayjs().format('YYYY-MM-DD'),
  description: '',
  category: '',
  tags: [],
};

if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory, { recursive: true });
}

const frontmatterYAML = yaml.dump(frontmatter);
const markdownContent = `---\n${frontmatterYAML}---\n\n`;

const hash = nanoid();
const filename = `${hash}.md`;
const filePath = path.join(directory, filename);

fs.writeFileSync(filePath, markdownContent, 'utf-8');
console.log(`Markdown file created at: ${filePath}`);
```

### 目次
[tocbot](https://tscanlin.github.io/tocbot/#)のような自動で目次を作ってくれるライブラリもあるが、時間の都合上自前で用意した。デザインに納得していなので、いずれtocbotに移行するかも。

```astro title="TableOfContents.astro" wrap
---
import type { MarkdownHeading } from 'astro';

interface Props {
  headings: MarkdownHeading[],
}

const { headings } = Astro.props;
---
<div>
  <h2 class="text-sky-600">目次</h2>
  <hr class="h-1 border-t-0 bg-sky-600 rounded-t-full" />
  <div class="toc px-4 py-2 rounded-b-lg bg-white">
    <ol class="">
      {headings.map(({slug, depth, text}) => (
        <li class="relative pl-6 before:bg-sky-600 before:rounded-full before:absolute before:h-[8px] before:w-[8px] before:top-[0.6em] before:-left-[0.125em]">
          <a 
            class={`${depth == 1 ? "font-bold" : "pl-[1em]"}`}
            href={`#${slug}`}
          >{text}</a>
        </li> 
      ))}
    </ol>
  </div>
</div>
```

# 参考記事
ポートフォリオをつくるにあたって、主にデザイン面で参考にしたサイトをいくつか紹介する。

## サイト全般のデザイン
### [あゆたそどっとこむ](https://portfolio.ayutaso.com/)
`About me`ページはだいたいこの方を参考にした、というよりほぼパクリ...? サイト全体のデザインも出来る限り似てしまうのを避けようと努力したが、結局ジェネリックみたいな感じになってしまった。本当に申し訳ない。

## 機能個別のデザイン
### [нуль](https://hypb.dev/)
`Works`の一覧表示用カードや`Blog`での検索機能のデザインを参考にした。

この方のサイト、全体的なデザインが洗練されている。自分のポートフォリオもこんなサイトにしてみたいが、デザインセンスが皆無なので時間がかかりそう。

### [Zenn](https://zenn.dev/)
言わずと知れたテックブログサイト。

記事の一覧表示の際に表示されるコンテンツのデザインを、アイコンの表示方法も含めて参考にした。

### [ラムダ技術部](https://xn--6ck3c0a.com/)
Youtubeなどで活躍されておられるラムダ技術部さんのサイト。本ポートフォリオでは、`About me`内の`History`でのデザインにおいて参考にした

# 技術的な
## フォント関連
本サイトのフォントは[M PLUS Rounded 1c](https://fonts.google.com/specimen/M+PLUS+Rounded+1c?subset=japanese)を使っているが、そのままではジャギーが発生してしまう。そのため、[この記事](https://zipang.dev/css/m-plus-rounded-1c-is-dirty-but-it-is-displayed-neatly-by-adding-css/)を参考に然るべき箇所 (bodyタグなど) のCSSに`transform:rotateZ(0.03deg);`を追加した。なお、サイト全体に適用してしまうと、サイト全体が若干傾いて見えるためbody要素などに限定した箇所でCSSを追加したほうがよい。

## CSS
`Works`や`Blog`の記事の本文はMarkdown記法で記述している。AstroはデフォルトでGithub Flavor Markdown (GFM) に対応しているが、そのスタイルは自前で用意しなければならない。そのため、[この記事](https://qiita.com/__mick/items/c80fab6c185a41882880)を参考にしてGithubのCSSテーマを本文に適用した。

なお、このCSSを適用しても箇条書きの適用がうまくされない場合がある。これは、`list-style-type`が正しく設定されないためであるが、その場合はCSSファイルの当該箇所を以下のようにすればよい。
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

# おわりに
ようやく自分のポートフォリオを作ることができた。
せっかく作ったので、コンテンツやブログ等、積極的に充実させていきたい。

## これからやりたいこと
- [ ] 各種SNSリンクの追加
- [ ] GitHub Actionsによる自動校正&デプロイ
- [ ] スキル欄の充実
- [ ] 目次の改修
- [ ] `Works`においてタグをクリックすると404になる問題の解消