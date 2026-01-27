// Fetches latest articles from Medium RSS feed at build time
const MEDIUM_FEED_URL = 'https://medium.com/feed/@dshills';
const OUTPUT_PATH = './src/data/articles.json';

async function fetchArticles() {
  console.log('Fetching articles from Medium...');

  const response = await fetch(MEDIUM_FEED_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch feed: ${response.status}`);
  }

  const xml = await response.text();
  const articles = parseRSS(xml);

  const { writeFileSync, mkdirSync } = await import('fs');
  const { dirname } = await import('path');

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, JSON.stringify(articles, null, 2));

  console.log(`Fetched ${articles.length} articles`);
}

function parseRSS(xml) {
  const items = xml.match(/<item>([\s\S]*?)<\/item>/g) || [];

  return items.slice(0, 10).map(item => {
    const title = extractTag(item, 'title');
    const link = extractTag(item, 'link');
    const pubDate = extractTag(item, 'pubDate');
    const categories = item.match(/<category><!\[CDATA\[(.*?)\]\]><\/category>/g) || [];

    const rawTag = categories.length > 0
      ? categories[0].replace(/<category><!\[CDATA\[|\]\]><\/category>/g, '')
      : 'Article';

    // Format tag: "mcp-server" -> "MCP Server", "claude" -> "Claude"
    const acronyms = { mcp: 'MCP', llm: 'LLM', ai: 'AI', api: 'API', sdk: 'SDK', openai: 'OpenAI' };
    const tag = rawTag
      .split('-')
      .map(word => {
        const lower = word.toLowerCase();
        if (acronyms[lower]) return acronyms[lower];
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');

    const date = new Date(pubDate);
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });

    // Clean URL by removing tracking parameters
    const cleanUrl = link.split('?')[0];

    return { title, date: formattedDate, tag, url: cleanUrl };
  });
}

function extractTag(xml, tag) {
  // Try CDATA format first
  const cdataMatch = xml.match(new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`));
  if (cdataMatch) return cdataMatch[1].trim();

  // Fall back to plain text
  const match = xml.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
  return match ? match[1].trim() : '';
}

fetchArticles().catch(err => {
  console.error('Failed to fetch articles:', err.message);
  process.exit(1);
});
