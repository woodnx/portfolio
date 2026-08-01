import { execFileSync } from "node:child_process";

export function remarkModifiedTime() {
  return function (tree, file) {
    const filepath = file.history[0];
    const result = execFileSync("git", [
      "log",
      "--follow",
      "--pretty=format:%cI",
      "--",
      filepath,
    ]);
    const commitTimes = result.toString().trim().split(/\r?\n/).filter(Boolean);

    if (commitTimes.length > 1) {
      file.data.astro.frontmatter.lastModified = commitTimes[0];
    } else {
      delete file.data.astro.frontmatter.lastModified;
    }
  };
}
