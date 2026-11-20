const fs = require("fs");

const USERNAME = "bryam2824";

async function updateReadme() {
  const response = await fetch(
    `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=5`
  );

  const repos = await response.json();

  const repoList = repos
    .map(repo => `- ${repo.html_url} - ${repo.description || "Sin descripción"}`)
    .join("\n");

  const readme = fs.readFileSync("README.md", "utf8");

  const updatedReadme = readme.replace(
    /<!-- LATEST_REPOS_START -->[\s\S]*<!-- LATEST_REPOS_END -->/,
    `<!-- LATEST_REPOS_START -->\n${repoList}\n<!-- LATEST_REPOS_END -->`
  );

  fs.writeFileSync("README.md", updatedReadme);
}

updateReadme();