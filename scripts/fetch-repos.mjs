// Fetches latest repos from GitHub API at build time
const GITHUB_USER = 'dshills';
const OUTPUT_PATH = './src/data/repos.json';

// Repos to mark as featured (editorial choice)
const FEATURED_REPOS = ['specBuilder', 'langgraph-go', 'mcp-pr'];

// Repos to exclude (forks, old projects, etc.)
const EXCLUDED_REPOS = ['davin-hills-portfolio'];

async function fetchRepos() {
  console.log('Fetching repos from GitHub...');

  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`,
    { headers: { 'Accept': 'application/vnd.github.v3+json' } }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch repos: ${response.status}`);
  }

  const data = await response.json();

  const repos = data
    .filter(repo => !repo.fork && !EXCLUDED_REPOS.includes(repo.name))
    .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
    .slice(0, 12)
    .map(repo => ({
      name: repo.name,
      description: repo.description || '',
      stars: String(repo.stargazers_count),
      lang: repo.language || 'Code',
      url: repo.html_url,
      updatedAt: repo.pushed_at,
      ...(FEATURED_REPOS.includes(repo.name) && { featured: true })
    }));

  // Sort: featured first (by recency), then non-featured by recency
  repos.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });

  const { writeFileSync, mkdirSync } = await import('fs');
  const { dirname } = await import('path');

  // Remove updatedAt from final output (only used for sorting)
  const output = repos.slice(0, 6).map(({ updatedAt, ...rest }) => rest);

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));

  console.log(`Fetched ${repos.length} repos, saved top 6`);
}

fetchRepos().catch(err => {
  console.error('Failed to fetch repos:', err.message);
  process.exit(1);
});
