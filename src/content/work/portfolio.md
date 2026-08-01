---
title: Portfolio
description: このサイト
publishedAt: 2025-03-31
developedStart: 2025-03-01
tags: [Astro, docker, nodejs, nginx]
category: Web
pinned: true
image: ../../images/portfolio.png
links: ["https://github.com/woodnx/portfolio"]
alt: ポートフォリオのスクリーンショット
---

# 概要
自分自身のことや作ったものを事細かに書いたページです。開発経緯など、技術的なこと以外は[Blog](/posts/uunk21jpjxk0pzuq)を参照してください。

## サイトの構成
本ポートフォリオは、大きく以下の4つのページに分かれています。
- `Top`
- `Chronicles`
- `Works`
- `Blog`

### `Top`ページ
このサイトを訪問した人が必ず見るページです。
初期の頃は、このページに載せるコンテンツがなかなか思いつきませんでしたが、結局、自分のスキルや好きなことといった、About me 的なページになりました。

### `Chronicles`ページ
自分のこれまでの歴史を時系列で見ることができます。
これだけで、自分がどんなことをしてきたのか、何を目的に歩んできたのかがわかるページになっています。
研究内容や自分の経歴など、あまり詳しく書いていないこともあるので、これから充実させていきたいです。

`Works`ページと連携して、`Chronicles`をクリックしたら`Works`へ飛べるようにしたいです。

### `Works`ページ
自分が今まで作ったものをまとめたページです。プログラミング以外で作ったものもまとめていく予定です。どこまで遡れるかはわかりません。

Worksの各リンクに飛ぶと、作ったものの詳細を確認できます。
開発経緯や、それがどのように自分に影響したかなどを詳しく記していく予定です。

### `Blog`ページ
個人ブログです。あまり書いていないので、充実させていきたいです。

本当は`blog.woodnx.com`のようなサブドメインのほうが良かったのですが、`index`ページに更新情報を載せる都合上、ポートフォリオに組み込む形となりました[^1]。

[^1]: 書いている途中に思ったのですが、RSSフィードを使えばうまくいくのではないかと模索中です。

# 技術スタック
本ポートフォリオでは、静的Webサイトを作成できるフレームワークの[Astro](https://docs.astro.build/ja/getting-started/)を用いました。技術選定にあたって考慮した点を以下に示します。

- 静的サイトのフレームワーク
- コンポーネントによる構造化
- キャッチアップの容易さ
- 日本語文献が豊富

個人的にうれしかったのは、日本語のチュートリアルがあったことです。
有志の方々に感謝しています。

割とPureに近い状態でHTMLやCSSを扱いながら、コンポーネントスタイルでプログラミングできる点を、とても魅力的に感じました。
Vue.jsやSvelteでも同じようなことができなくはありませんが、静的サイトに特化していることが開発体験の良さにつながっているように思います。

## ライブラリ
### [tailwindcss](https://tailwindcss.com/)
初めて本格的にtailwindに触れましたが、とても扱いやすかったです。HTMLタグをきちんと使い分ける動機にもなりましたし、なにより、普段UIコンポーネントによって隠蔽されている中身を垣間見られるのが楽しかったです。

### [Day.js](https://day.js.org/)
JavaScript組み込みの`Date`オブジェクトが使いづらいため、導入しました。`dayjs().format()`関数が非常に便利です。

### [Expressive Code](https://expressive-code.com/)
リッチなコードブロックを表示できるライブラリです。コピーボタンの追加や、コードのハイライトができます。
設定や使い方などは[この記事](https://roboin.io/article/2023/12/16/how-to-use-expressive-code-in-markdown-and-astro/)が参考になります。

### [pagefind](https://pagefind.app/)
`Blog`における記事検索機能の実装に用いました。
導入には[この記事](https://blog.eno1220.dev/posts/pagefind-astro)が参考になります。

## 自分でつくったもの
### 記事作成スクリプト
Zennのように、コマンドから記事のテンプレートを自動作成してくれるスクリプトを自作しました。

```typescript title="generate-new-post.ts"
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { customAlphabet } from 'nanoid';

const directory = './src/content/post';
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 16);
const frontmatter = {
  title: '',
  icon: '',
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
[tocbot](https://tscanlin.github.io/tocbot/#)のように自動で目次を作ってくれるライブラリもありますが、時間の都合上、自前で用意しました。
デザインに納得していないので、いずれtocbotに移行するかもしれません。

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
        <li class="relative pl-6 before:bg-sky-600 before:rounded-full before:absolute before:h-2 before:w-2 before:top-[0.6em] before:left-[-0.125em]">
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
ポートフォリオを作るにあたって、主にデザイン面で参考にしたサイトをいくつか紹介します。

## サイト全般のデザイン
### [あゆたそどっとこむ](https://portfolio.ayutaso.com/)
`About me`ページはだいたいこの方を参考にしました。というより、ほぼパクリ…でしょうか。
サイト全体のデザインも、できる限り似てしまうのを避けようと努力しましたが、結局ジェネリックのような感じになってしまいました。本当に申し訳ありません。

## 機能個別のデザイン
### [нуль](https://hypb.dev/)
`Works`の一覧表示用カードや`Blog`での検索機能のデザインを参考にしました。

この方のサイトは、全体的なデザインが洗練されています。
自分のポートフォリオもこのようなサイトにしてみたいですが、デザインセンスが皆無なので時間がかかりそうです。

### [Zenn](https://zenn.dev/)
言わずと知れたテックブログサイトです。

記事の一覧表示の際に表示されるコンテンツのデザインを、アイコンの表示方法も含めて参考にしました。

# 技術的なことについて
## フォント関連
本サイトのフォントには[M PLUS Rounded 1c](https://fonts.google.com/specimen/M+PLUS+Rounded+1c?subset=japanese)を使っていますが、そのままではジャギーが発生してしまいます。そのため、[この記事](https://zipang.dev/css/m-plus-rounded-1c-is-dirty-but-it-is-displayed-neatly-by-adding-css/)を参考に、しかるべき箇所（bodyタグなど）のCSSに`transform:rotateZ(0.03deg);`を追加しました。なお、サイト全体に適用すると、サイト全体が若干傾いて見えるため、body要素などに限定してCSSを追加したほうがよいです。

## CSS
`Works`や`Blog`の記事の本文はMarkdown記法で記述しています。AstroはデフォルトでGithub Flavor Markdown（GFM）に対応していますが、そのスタイルは自前で用意しなければなりません。そのため、[この記事](https://qiita.com/__mick/items/c80fab6c185a41882880)を参考にして、GithubのCSSテーマを本文に適用しました。

なお、このCSSを適用しても、箇条書きをうまく表示できないことがあります。
これは、`list-style-type`が正しく設定されていないためです。その場合は、CSSファイルの当該箇所を以下のようにすればよいです。
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

# これからやりたいこと
- [ ] 各種SNSリンクの追加
- [ ] GitHub Actionsによる自動校正&デプロイ
- [ ] スキル欄の充実
- [ ] 目次の改修
- [ ] `Works`においてタグをクリックすると404になる問題の解消
