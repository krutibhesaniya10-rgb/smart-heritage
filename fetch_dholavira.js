const https = require('https');
const fs = require('fs');

const queries = [
  "Dholavira Gujarat",
  "Dholavira",
  "Somnath Temple",
  "Dwarkadhish Temple"
];

function fetchImages(query) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'unsplash.com',
      path: `/napi/search/photos?page=1&per_page=4&query=${encodeURIComponent(query)}`,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
      }
    };

    https.get(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({ query, urls: (json.results || []).map(r => r.urls.regular) });
        } catch (e) {
          resolve({ query, urls: [] });
        }
      });
    }).on('error', () => resolve({ query, urls: [] }));
  });
}

async function run() {
  const file = JSON.parse(fs.readFileSync('unsplash_results.json', 'utf-8'));
  for (const q of queries) {
    const data = await fetchImages(q);
    console.log(`${q}: ${data.urls.length}`);
    if (data.urls.length > 0 && !file[q]) {
      file[q] = data.urls;
    }
  }
  fs.writeFileSync('unsplash_results.json', JSON.stringify(file, null, 2));
}

run();
