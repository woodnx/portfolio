import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { customAlphabet } from "nanoid";
import { Command, Option } from "commander";

// コマンドライン引数のパース
const program = new Command();

program
  .addOption(
    new Option(
      "-t, --target <type>",
      "contents target: post or work or chronicles",
    ).choices(["post", "work", "chronicle"]),
  )
  .option("-n, --name <name>", "file name");
program.parse(process.argv);

// frontmatter の取得
const options = program.opts();
const frontmatter = JSON.parse(
  fs.readFileSync(`./src/scripts/frontmatters/${options.target}.json`, "utf8"),
);

// ファイルの作成
const directory = `./src/content/${options.target}`;
if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory, { recursive: true });
}

const frontmatterYAML = yaml.dump(frontmatter);
const markdownContent = `---\n${frontmatterYAML}---\n\n`;

// ファイル名の決定・ファイルの保存
const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 16);
const hash = nanoid();
const filename = options.name ? `${options.name}.md` : `${hash}.md`;
const filePath = path.join(directory, filename);

fs.writeFileSync(filePath, markdownContent, "utf-8");
console.log(`Markdown file created at: ${filePath}`);
