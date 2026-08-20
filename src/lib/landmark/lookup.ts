/**
 * Country -> [landmark archetype, base hue]. Ported verbatim from
 * hyperporter-3.html. The archetype string should be a key of `A` in
 * ./generator.ts, but is left as a plain string here (rather than
 * `keyof typeof A`) to avoid a circular import; destArt() already falls
 * back to A.cityscape for any archetype that doesn't match.
 */
export const LM: Record<string, [string, number]> = {
"Morocco":["mosque",190],"Egypt":["pyramids",35],"Tunisia":["dunes",30],"Algeria":["dunes",26],
"Cape Verde":["volcano",200],"Senegal":["baobab",22],"Gambia":["sail",190],"Ghana":["towerfort",200],
"Ivory Coast":["cityscape",210],"Benin":["overwater",185],"Nigeria":["monolith",25],"Gabon":["rainforest",145],
"Republic of Congo":["rainforest",150],"Sudan":["pyramids",28],"Ethiopia":["cliffmonastery",30],"Kenya":["savanna",32],
"Tanzania":["savanna",26],"Uganda":["rainforest",140],"Rwanda":["rainforest",152],"Madagascar":["baobab",18],
"Mozambique":["sail",192],"Malawi":["sail",186],"Zambia":["falls",170],"Zimbabwe":["falls",166],
"Botswana":["savanna",38],"Namibia":["dunes",20],"South Africa":["mesa",210],"Lesotho":["himalaya",216],
"Seychelles":["overwater",182],"Mauritius":["overwater",188],
"Azerbaijan":["flame",265],"Japan":["fujipagoda",340],"South Korea":["cityscape",228],"China":["greatwall",200],
"Taiwan":["needle",212],"Mongolia":["steppe",40],"Vietnam":["karst",185],"Thailand":["stupa",38],
"Cambodia":["angkor",150],"Laos":["karst",178],"Myanmar":["stupa",30],"Malaysia":["needle",205],
"Singapore":["marina",202],"Indonesia":["borobudur",150],"Philippines":["terraces",122],"India":["taj",282],
"Nepal":["himalaya",214],"Bhutan":["cliffmonastery",208],"Sri Lanka":["stupa",44],"Maldives":["overwater",184],
"Bangladesh":["sail",196],"Pakistan":["himalaya",222],"Uzbekistan":["onion",200],"Kyrgyzstan":["steppe",205],
"Kazakhstan":["steppe",44],
"Australia":["opera",215],"New Zealand":["patagonia",200],"Fiji":["overwater",186],"French Polynesia":["overwater",190],
"Papua New Guinea":["rainforest",148],"Samoa":["volcano",196],"Vanuatu":["volcano",14],"Cook Islands":["overwater",180],
"Portugal":["towerfort",205],"Spain":["spires",250],"France":["eiffel",235],"Italy":["colosseum",25],
"Malta":["castle",34],"Greece":["parthenon",200],"Cyprus":["parthenon",206],"Croatia":["towerfort",198],
"Slovenia":["matterhorn",206],"Montenegro":["cliffs",194],"Albania":["cliffs",188],"Serbia":["castle",236],
"Switzerland":["matterhorn",212],"Austria":["matterhorn",228],"Germany":["castle",230],"Netherlands":["windmill",200],
"Belgium":["clocktower",232],"United Kingdom":["clocktower",218],"Ireland":["cliffs",196],"Iceland":["volcano",206],
"Norway":["fjord",198],"Sweden":["rockies",204],"Denmark":["lighthouse",210],"Finland":["rockies",212],
"Estonia":["castle",222],"Latvia":["rockies",216],"Lithuania":["castle",240],"Poland":["castle",226],
"Czechia":["castle",244],"Slovakia":["matterhorn",220],"Hungary":["spires",240],"Romania":["castle",250],
"Bulgaria":["onion",254],"Türkiye":["mosque",194],"Georgia":["onion",248],"Armenia":["cliffmonastery",24],
"United Arab Emirates":["needle",216],"Saudi Arabia":["mesa",20],"Oman":["mosque",186],"Qatar":["sail",196],
"Bahrain":["sail",200],"Kuwait":["needle",210],"Jordan":["petra",20],"Israel":["mosque",198],"Lebanon":["parthenon",204],
"United States":["liberty",220],"Canada":["rockies",202],"Mexico":["stepPyramid",140],"Guatemala":["stepPyramid",144],
"Belize":["overwater",178],"Honduras":["stepPyramid",136],"El Salvador":["volcano",18],"Nicaragua":["volcano",22],
"Costa Rica":["rainforest",142],"Panama":["cityscape",220],"Cuba":["towerfort",192],"Jamaica":["sail",184],
"Dominican Republic":["overwater",176],"Bahamas":["overwater",182],"Barbados":["overwater",188],
"Saint Lucia":["volcano",158],"Antigua & Barbuda":["sail",188],
"Brazil":["christ",200],"Argentina":["patagonia",208],"Chile":["moai",230],"Peru":["machu",150],
"Bolivia":["saltflat",252],"Ecuador":["volcano",150],"Colombia":["towerfort",196],"Uruguay":["lighthouse",214],
"Paraguay":["parthenon",30],"Venezuela":["mesa",190],"Guyana":["falls",164],"Suriname":["rainforest",154]
};
