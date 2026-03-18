const fs = require('fs');

const data = JSON.parse(fs.readFileSync('unsplash_results.json', 'utf-8'));

const mappings = {
  g1: "Rani ki Vav Patan stepwell",
  g2: "Champaner Pavagadh landmark",
  g3: "Dholavira Gujarat",
  g4: "Lothal Gujarat landmark",
  g5: "Somnath Temple Gujarat landmark",
  g6: "Dwarkadhish Temple Dwarka landmark",
  g7: "Modhera Sun Temple landmark",
  g8: "Adalaj Stepwell Ahmedabad",
  g9: "Laxmi Vilas Palace Vadodara",
  g10: "Uparkot Fort Junagadh",
  r1: "Amber Fort Jaipur",
  r2: "Hawa Mahal Jaipur",
  r3: "City Palace Jaipur",
  r4: "Jantar Mantar Jaipur",
  r5: "Chittorgarh Fort",
  r6: "Mehrangarh Fort Jodhpur",
  r7: "Jaisalmer Fort",
  r8: "Kumbhalgarh Fort Rajasthan",
  r9: "Lake Palace Udaipur",
  r10: "Dilwara Temples Mount Abu"
};

function main() {
  let heritageContent = fs.readFileSync('lib/heritage-data.ts', 'utf-8');
  let galleryContent = fs.readFileSync('components/virtual-tour/image-gallery.tsx', 'utf-8');

  for (const [id, key] of Object.entries(mappings)) {
    const urls = data[key];
    if (!urls || urls.length === 0) continue;

    // Choose images deterministically
    const mainImg = urls[0];
    const galImgs = [
      urls[0],
      urls[1 % urls.length],
      urls[2 % urls.length]
    ];

    // Match the block in heritage-data.ts exactly
    // Example:
    // id: "g1",
    // ...
    // image: "...",
    // images: ["..."],
    const regexH = new RegExp(`(id:\\s*"${id}",[\\s\\S]*?image:\\s*")[^"]+("\s*,\\s*images:\\s*\\[)[^\\]]+(][\\s\\S]*?panorama)`, "g");

    heritageContent = heritageContent.replace(regexH, (match, p1, p2, p3) => {
      const gStr = `"${galImgs[0]}", "${galImgs[1]}", "${galImgs[2]}"`;
      return p1 + mainImg + p2 + gStr + p3;
    });

    // Same for image-gallery.tsx
    // id: "g1",
    // src: "...",
    const regexG = new RegExp(`(id:\\s*"${id}",[\\s\\S]*?src:\\s*")[^"]+(")`, "g");
    galleryContent = galleryContent.replace(regexG, (match, p1, p2) => {
      return p1 + mainImg + p2;
    });
  }

  fs.writeFileSync('lib/heritage-data.ts', heritageContent);
  fs.writeFileSync('components/virtual-tour/image-gallery.tsx', galleryContent);
  console.log("Replaced successfully!");
}

main();
