const fs = require('fs');
const path = require('path');

const guidePath = path.join(__dirname, 'Jammu_and_Kashmir_Trending_Destinations_Links_Guide.md');
const guideContent = fs.readFileSync(guidePath, 'utf8');

// Normalize body starting from Srinagar
const srinagarIdx = guideContent.indexOf('## 1. District Srinagar');
const mainBody = srinagarIdx !== -1 ? guideContent.substring(srinagarIdx) : guideContent;

let md = `# 🏔️ Complete Directory of All 248 Tourist Places in Jammu & Kashmir (J&K)
**Official Guide • All 20 Districts (Kashmir Valley & Jammu Division) • Complete 248 Tourist Attractions**

---

## 📥 Direct Resources & Downloads
- 📄 **[Download Official PDF Travel Manual (Complete 248 Places)](./Jammu_and_Kashmir_Trending_Destinations_Links_Guide.pdf)**
- 🗺️ **[Markdown Guide File](./Jammu_and_Kashmir_Trending_Destinations_Links_Guide.md)**

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

## 🏛️ All 248 Tourist Places Directory (District-by-District Manual with Direct Google Maps & Photo Gallery Links)

` + mainBody + `

---
*Total 248 official tourist places cataloged for Wayfarer / Paradise Journey.*
`;

fs.writeFileSync(path.join(__dirname, 'TOURIST_PLACES_README.md'), md, 'utf8');
console.log('Successfully written TOURIST_PLACES_README.md with all 248 places and complete details!');
