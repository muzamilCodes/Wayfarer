const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'frontend', 'lib', 'jk-destinations-data.ts');
const top10Path = path.join(__dirname, 'frontend', 'lib', 'jk-top10-data.ts');
const content = fs.readFileSync(srcPath, 'utf8');

// Match districts
const districtBlocks = content.split(/\{\s*id:\s*'/);
districtBlocks.shift();

let md = `# 🏔️ Complete Directory of Tourist Places in Jammu & Kashmir (J&K)
**Official Guide • All 20 Districts (Kashmir Valley & Jammu Division) • 140+ Tourist Attractions**

This README provides a comprehensive, structured reference for all tourist attractions, valleys, hill stations, heritage monuments, and pilgrimage sites integrated into the **Paradise Journey / Wayfarer** travel portal.

---

## 🌟 Top 10 Trending Destinations (Featured)

| # | Destination | District | Division | Best Season | Google Maps Link |
|---|-------------|----------|----------|-------------|------------------|
| 1 | **Srinagar (Dal Lake & Mughal Gardens)** | Srinagar | Kashmir | Apr - Oct / Dec - Jan | [Open in Google Maps](https://www.google.com/maps/search/?api=1&query=Dal+Lake+Srinagar+Jammu+and+Kashmir) |
| 2 | **Gulmarg (Meadows & Apharwat Peak)** | Baramulla | Kashmir | May - Sep (Lush) / Dec - Mar (Skiing) | [Open in Google Maps](https://www.google.com/maps/search/?api=1&query=Gulmarg+Gondola+Baramulla+Jammu+and+Kashmir) |
| 3 | **Pahalgam (Betaab & Aru Valleys)** | Anantnag | Kashmir | Apr - Oct / Dec - Feb | [Open in Google Maps](https://www.google.com/maps/search/?api=1&query=Betaab+Valley+Pahalgam+Anantnag+Jammu+and+Kashmir) |
| 4 | **Sonamarg (Thajiwas Glacier & Zero Point)** | Ganderbal | Kashmir | May - Oct | [Open in Google Maps](https://www.google.com/maps/search/?api=1&query=Thajiwas+Glacier+Sonamarg+Ganderbal+Jammu+and+Kashmir) |
| 5 | **Shri Mata Vaishno Devi Shrine** | Reasi | Jammu | Round the year (Mar - Oct peak) | [Open in Google Maps](https://www.google.com/maps/search/?api=1&query=Mata+Vaishno+Devi+Bhavan+Katra+Jammu) |
| 6 | **Patnitop & Nathatop** | Udhampur | Jammu | May - Jun / Dec - Feb (Snow) | [Open in Google Maps](https://www.google.com/maps/search/?api=1&query=Patnitop+Hill+Station+Udhampur+Jammu) |
| 7 | **Gurez Valley (Habba Khatoon)** | Bandipora | Kashmir | May - Sep | [Open in Google Maps](https://www.google.com/maps/search/?api=1&query=Habba+Khatoon+Peak+Gurez+Valley+Bandipora) |
| 8 | **Bhaderwah (Mini Kashmir & Jai Valley)** | Doda | Jammu | Apr - Oct / Jan - Feb (Snow) | [Open in Google Maps](https://www.google.com/maps/search/?api=1&query=Jai+Valley+Bhaderwah+Doda+Jammu+and+Kashmir) |
| 9 | **Doodhpathri & Yusmarg** | Budgam | Kashmir | May - Oct | [Open in Google Maps](https://www.google.com/maps/search/?api=1&query=Doodhpathri+Budgam+Jammu+and+Kashmir) |
| 10 | **Aharbal Waterfalls (Niagara of Kashmir)** | Kulgam | Kashmir | May - Oct | [Open in Google Maps](https://www.google.com/maps/search/?api=1&query=Aharbal+Waterfalls+Kulgam+Jammu+and+Kashmir) |

---

## 🗺️ Division-wise Summary

- **Kashmir Valley (10 Districts)**: Srinagar, Baramulla (Gulmarg), Anantnag (Pahalgam), Ganderbal (Sonamarg), Budgam (Doodhpathri), Bandipora (Gurez), Kupwara (Lolab & Bangus), Kulgam (Aharbal), Pulwama, Shopian.
- **Jammu Division (10 Districts)**: Jammu, Reasi (Vaishno Devi & Chenab Bridge), Udhampur (Patnitop), Doda (Bhaderwah), Kishtwar, Kathua (Basohli), Samba, Ramban (Sanasar), Rajouri, Poonch.

---

## 🏛️ All 20 Districts Detailed Directory

`;

let distIndex = 1;
let grandTotalPlaces = 0;

districtBlocks.forEach((block) => {
  const distMatch = block.match(/district:\s*'([^']+)'/);
  const tagMatch = block.match(/tagline:\s*'([^']+)'/);
  const divMatch = block.match(/division:\s*'([^']+)'/);
  const descMatch = block.match(/shortDescription:\s*'([^']+)'/);

  if (!distMatch) return;
  const distName = distMatch[1];
  const tagline = tagMatch ? tagMatch[1] : '';
  const division = divMatch ? divMatch[1] : '';
  const desc = descMatch ? descMatch[1] : '';

  md += `### ${distIndex}. District ${distName}\n`;
  md += `- **Tagline**: ${tagline}\n`;
  md += `- **Division**: ${division}\n`;
  md += `- **Overview**: ${desc}\n\n`;

  // Parse touristPlaces
  const placesPart = block.match(/touristPlaces:\s*\[([\s\S]*?)\]\s*,/);
  if (placesPart) {
    const rawPlaces = placesPart[1].split(/\{[\s\r\n]*"name":/);
    rawPlaces.shift();

    if (rawPlaces.length > 0) {
      md += `| Place Name | Category | Speciality / Key Highlight | Direct Google Maps Link |\n`;
      md += `|------------|----------|----------------------------|--------------------------|\n`;

      rawPlaces.forEach((rp) => {
        const nameM = rp.match(/^[\s\r\n]*"([^"]+)"/);
        const catM = rp.match(/"category":\s*"([^"]+)"/);
        const specM = rp.match(/"speciality":\s*"([^"]+)"/);
        const famousM = rp.match(/"famousFor":\s*"([^"]+)"/);

        if (nameM) {
          const name = nameM[1].trim();
          const category = catM ? catM[1].trim() : 'Tourist Place';
          const highlight = specM ? specM[1].trim() : (famousM ? famousM[1].trim() : 'Must-visit scenic spot');
          const cleanHighlight = highlight.replace(/[\r\n]+/g, ' ').slice(0, 120);
          const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ' ' + distName + ' Jammu and Kashmir')}`;

          md += `| **${name}** | \`${category}\` | ${cleanHighlight} | [Open in Maps](${mapsUrl}) |\n`;
          grandTotalPlaces++;
        }
      });
      md += `\n`;
    }
  }

  distIndex++;
});

md += `---

## 📱 Features Available for Every Tourist Attraction

In the **Wayfarer / Paradise Journey** application:
1. **[Google Maps Navigation]**: Directly opens the precise GPS coordinates/location on Google Maps.
2. **[Photo Gallery Modal]**: Multi-image photo slider modal with full captions and scenic vistas.
3. **[Interactive Live Map Embed]**: Embedded interactive Google Map modal with directions, zoom, and satellite toggle.
4. **[Search & District Filter]**: Search across all 20 districts by name, region (Kashmir/Jammu), duration, budget tier, and travel type.

---
*Generated for Wayfarer / Paradise Journey — Jammu, Kashmir & Ladakh Tourism Portal.*
`;

fs.writeFileSync(path.join(__dirname, 'TOURIST_PLACES_README.md'), md, 'utf8');
console.log('Successfully generated TOURIST_PLACES_README.md with', grandTotalPlaces, 'tourist places across', distIndex - 1, 'districts!');
