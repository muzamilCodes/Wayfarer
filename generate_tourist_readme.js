const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'frontend', 'lib', 'jk-destinations-data.ts');
const content = fs.readFileSync(srcPath, 'utf8');

const districtBlocks = content.split(/\{\s*id:\s*'/);
districtBlocks.shift();

let md = `# 🏔️ Complete Directory of All 248 Tourist Places in Jammu & Kashmir (J&K)
**Official Guide • All 20 Districts (Kashmir Valley & Jammu Division) • Complete 248 Tourist Attractions**

---

## 🗺️ Summary by District

| # | District Name | Division | Total Tourist Places |
|---|---------------|----------|----------------------|
| 1 | **Srinagar** | Kashmir Valley | 18 Spots |
| 2 | **Anantnag (Pahalgam)** | Kashmir Valley | 20 Spots |
| 3 | **Baramulla (Gulmarg)** | Kashmir Valley | 17 Spots |
| 4 | **Ganderbal (Sonamarg)** | Kashmir Valley | 15 Spots |
| 5 | **Budgam (Doodhpathri & Yusmarg)** | Kashmir Valley | 11 Spots |
| 6 | **Kupwara (Lolab & Bangus)** | Kashmir Valley | 14 Spots |
| 7 | **Kulgam (Aharbal)** | Kashmir Valley | 10 Spots |
| 8 | **Pulwama (Pampore & Tral)** | Kashmir Valley | 10 Spots |
| 9 | **Shopian (Peer Ki Gali & Mughal Road)** | Kashmir Valley | 9 Spots |
| 10 | **Bandipora (Gurez Valley & Wular Lake)** | Kashmir Valley | 9 Spots |
| 11 | **Jammu (City of Temples)** | Jammu Division | 13 Spots |
| 12 | **Reasi (Vaishno Devi & Shiv Khori)** | Jammu Division | 12 Spots |
| 13 | **Udhampur (Patnitop & Sanasar)** | Jammu Division | 11 Spots |
| 14 | **Kathua (Basohli & Atal Setu)** | Jammu Division | 12 Spots |
| 15 | **Samba (Mansar Lake & Rajput Warriors)** | Jammu Division | 9 Spots |
| 16 | **Doda (Bhaderwah Valley & High Meadows)** | Jammu Division | 10 Spots |
| 17 | **Kishtwar (Saffron, Sapphire & Shrines)** | Jammu Division | 11 Spots |
| 18 | **Ramban (Sanasar, Banihal & Chenab)** | Jammu Division | 12 Spots |
| 19 | **Rajouri (Mughal Road & Vale of Kings)** | Jammu Division | 13 Spots |
| 20 | **Poonch (Border Haven & Waterfalls)** | Jammu Division | 12 Spots |
| **Total** | **All 20 J&K Districts** | **J&K Union Territory** | **248 Tourist Places** |

---

## 🏛️ All 248 Tourist Places Directory (Complete District-by-District List)

`;

let globalCounter = 1;

districtBlocks.forEach((block, idx) => {
  const distMatch = block.match(/district:\s*'([^']+)'/);
  const tagMatch = block.match(/tagline:\s*'([^']+)'/);
  const divMatch = block.match(/division:\s*'([^']+)'/);
  if (!distMatch) return;

  const distName = distMatch[1];
  const tagline = tagMatch ? tagMatch[1] : '';
  const division = divMatch ? divMatch[1] : '';

  md += `### ${idx + 1}. ${distName}\n`;
  md += `- **Division**: ${division}\n`;
  md += `- **Tagline**: ${tagline}\n\n`;

  const placesPart = block.match(/touristPlaces:\s*\[([\s\S]*?)\]\s*,[\s\r\n]*coordinates/);
  if (placesPart) {
    const nameRegex = /(?:["']?name["']?\s*:\s*["']([^"']+)["'])/g;
    let nm;
    md += `| # | Tourist Place Name | Direct Google Maps Link |\n`;
    md += `|---|--------------------|-------------------------|\n`;
    while ((nm = nameRegex.exec(placesPart[1])) !== null) {
      const placeName = nm[1].trim();
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeName + ' ' + distName + ' Jammu and Kashmir')}`;
      md += `| ${globalCounter} | **${placeName}** | [Open in Google Maps](${mapsUrl}) |\n`;
      globalCounter++;
    }
    md += `\n`;
  }
});

md += `---
*Total 248 official tourist places cataloged for Wayfarer / Paradise Journey.*
`;

fs.writeFileSync(path.join(__dirname, 'TOURIST_PLACES_README.md'), md, 'utf8');
console.log('Successfully written TOURIST_PLACES_README.md with', globalCounter - 1, 'places!');
