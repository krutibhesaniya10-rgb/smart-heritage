const fs = require('fs');
const https = require('https');

const queries = [
  "Rani ki Vav Patan",
  "Champaner Pavagadh",
  "Dholavira Gujarat",
  "Lothal Gujarat",
  "Somnath Temple",
  "Dwarkadhish Temple",
  "Modhera Sun Temple",
  "Adalaj Stepwell Ahmedabad",
  "Laxmi Vilas Palace Vadodara",
  "Uparkot Fort Junagadh",
  "Amber Fort Jaipur",
  "Hawa Mahal Jaipur",
  "City Palace Jaipur",
  "Jantar Mantar Jaipur",
  "Chittorgarh Fort",
  "Mehrangarh Fort Jodhpur",
  "Jaisalmer Fort",
  "Kumbhalgarh Fort Rajasthan",
  "Lake Palace Udaipur",
  "Dilwara Temples Mount Abu"
];

function fetchImages(query) {
  return new Promise((resolve) => {
    https.get(`https://unsplash.com/napi/search/photos?page=1&per_page=4&query=${encodeURIComponent(query)}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.results && json.results.length > 0) {
            resolve({ query, urls: json.results.map(r => r.urls.regular) });
          } else {
            resolve({ query, urls: [] });
          }
        } catch (e) {
          resolve({ query, urls: [] });
        }
      });
    }).on('error', () => resolve({ query, urls: [] }));
  });
}

async function run() {
  const results = {};
  for (const q of queries) {
    const data = await fetchImages(q);
    results[q] = data.urls;
    console.log(`Fetched ${q}: ${data.urls.length} images`);
    await new Promise(r => setTimeout(r, 500)); // Sleep 500ms
  }
  fs.writeFileSync('unsplash_results.json', JSON.stringify(results, null, 2));
  console.log('Done!');
}

run();
