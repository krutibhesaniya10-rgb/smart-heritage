const fs = require('fs');
const https = require('https');

const queries = [
  "Rani ki Vav Patan stepwell",
  "Champaner Pavagadh landmark",
  "Dholavira Kutch landmark",
  "Lothal Gujarat landmark",
  "Somnath Temple Gujarat landmark",
  "Dwarkadhish Temple Dwarka landmark",
  "Modhera Sun Temple landmark",
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
    const options = {
      hostname: 'unsplash.com',
      path: `/napi/search/photos?page=1&per_page=4&query=${encodeURIComponent(query)}`,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        'Accept': 'application/json',
      }
    };

    https.get(options, (res) => {
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
    await new Promise(r => setTimeout(r, 1000));
  }
  fs.writeFileSync('unsplash_results.json', JSON.stringify(results, null, 2));
  console.log('Done!');
}

run();
