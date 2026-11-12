import fs from 'node:fs';
import {validateCatalog} from './dist/catalog.js';
// This local script is run by the owner before publishing, never by visitors.
const file=process.argv[2];if(!file)throw Error('Usage: node update-catalog.mjs <artists.json>');
const artists=validateCatalog(JSON.parse(fs.readFileSync(file,'utf8')));
fs.writeFileSync(new URL('./dist/artists.json',import.meta.url),JSON.stringify({version:1,artists}));
console.log(`Validated ${artists.length} artists. Publish the site to make this catalog visible to visitors.`);
