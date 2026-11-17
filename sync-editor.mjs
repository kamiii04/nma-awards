import fs from 'node:fs';
import {validateCatalog} from './dist/catalog.js';
const data=JSON.parse(fs.readFileSync('dist/artists.json','utf8').replace(/^\uFEFF/,''));
validateCatalog(data);
fs.writeFileSync('catalog-seed.js','window.NMA_CATALOG = '+JSON.stringify(data).replace(/</g,'\\u003c')+';\n');
console.log('관리 화면의 기본 목록을 최신 artists.json으로 갱신했습니다.');
