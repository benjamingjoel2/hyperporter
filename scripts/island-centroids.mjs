import fs from 'node:fs'; import path from 'node:path';
import { feature } from 'topojson-client';
import { geoCentroid } from 'd3-geo';
const topo50 = JSON.parse(fs.readFileSync('node_modules/world-atlas/countries-50m.json','utf8'));
const topo110 = JSON.parse(fs.readFileSync('node_modules/world-atlas/countries-110m.json','utf8'));
const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z ]/g,'').replace(/\s+/g,' ').trim();
const ALIASES = {'Dominican Republic':'Dominican Rep.','Ivory Coast':"Côte d'Ivoire",'Republic of Congo':'Congo','Türkiye':'Turkey','United States':'United States of America','Antigua & Barbuda':'Antigua and Barb.','Cape Verde':'Cabo Verde','Cook Islands':'Cook Is.','French Polynesia':'Fr. Polynesia'};
const dir='src/content/destinations';
const ours = fs.readdirSync(dir).map(f=>{
  const t=fs.readFileSync(path.join(dir,f),'utf8').match(/^title:\s*["']?(.+?)["']?\s*$/m);
  return { title: t?t[1]:f, slug: f.replace(/\.mdx?$/,'') };
});
const in110 = new Set(feature(topo110, topo110.objects.countries).features.map(f=>norm(f.properties.name)));
const f50 = feature(topo50, topo50.objects.countries).features;
const by50 = new Map(f50.map(f=>[norm(f.properties.name), f]));
const out = [];
for (const c of ours) {
  const key = norm(ALIASES[c.title] ?? c.title);
  if (in110.has(key)) continue;
  const f = by50.get(key);
  if (!f) { console.error('NO GEOMETRY:', c.title); continue; }
  const [lon, lat] = geoCentroid(f);
  out.push({ title: c.title, lon: Math.round(lon*1e4)/1e4, lat: Math.round(lat*1e4)/1e4 });
}
out.sort((a,b)=>a.title.localeCompare(b.title));
console.log(JSON.stringify(out, null, 2));
console.error('count:', out.length);
