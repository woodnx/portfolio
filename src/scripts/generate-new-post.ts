import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { customAlphabet } from 'nanoid';

const directory = './src/content/blog';
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
