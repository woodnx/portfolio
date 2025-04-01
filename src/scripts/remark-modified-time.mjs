import { execSync } from "child_process";

export function remarkModifiedTime() {
  return function (tree, file) {
    const filepath = file.history[0];
    const result = execSync(`git log --pretty="format:%cI" "${filepath}"`);
    const times = result.toString().split('\r');
    file.data.astro.frontmatter.publishedAt = times[-1];

    if (times.length > 1) {
      file.data.astro.frontmatter.lastModified = times[0];
    }
  };
}