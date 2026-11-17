import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {filterArtists,normalize,validateCatalog} from '../dist/catalog.js';
const read=p=>JSON.parse(fs.readFileSync(new URL(p,import.meta.url),'utf8').replace(/^\uFEFF/,''));
const artists=validateCatalog(read('../dist/artists.json'));
const requested=read('../research-requested.json');
test('요청한 32개 그룹과 모든 멤버의 한글·영문 검색',()=>{
 assert.equal(requested.length,32);
 for(const g of requested){
  const a=artists.find(a=>a.kind==='group'&&normalize(a.english)===normalize(g.english));assert.ok(a,g.name);
  for(const q of [g.name,g.english])assert.ok(filterArtists(artists,q).some(x=>x.id===a.id),q);
  for(const m of [...g.members,...(g.formerMembers||[])])for(const q of [m.name,m.english,g.english+' '+m.english])assert.ok(filterArtists(artists,q).some(a=>a.kind==='member'&&a.group===g.name&&a.name===m.name),g.name+' '+q);
 }
});
test('모든 명단의 한영 검색 및 고유 ID',()=>{assert.equal(new Set(artists.map(a=>a.id)).size,artists.length);for(const a of artists){assert.ok(filterArtists(artists,a.name).some(x=>x.id===a.id));assert.ok(a.english,a.name);assert.ok(filterArtists(artists,a.english).some(x=>x.id===a.id))}});
test('공백 기호 대소문자 무시, 이름이 다른 그룹은 분리',()=>{assert.equal(normalize('DAILY: DIRECTION'),normalize('daily direction'));assert.ok(filterArtists(artists,'IDID').some(a=>a.name==='아이딧'));assert.ok(filterArtists(artists,'idntt').some(a=>a.name==='아이덴티티'));});
test('기존 사용자 사진 두 장과 ID 보존',()=>{for(const id of ['d07311da-e33c-47bb-8170-dca8f9b6315a','469bdc6f-ac11-4bee-8a14-ae4d8aceee55'])assert.ok(artists.find(a=>a.id===id)?.image)});
test('사진 없는 항목 허용, 위험한 사진 주소 및 중복 ID 거부',()=>{const a={id:'test',name:'테스트',image:'',aliases:[]};assert.equal(validateCatalog({version:1,artists:[a]})[0].image,'');assert.throws(()=>validateCatalog({version:1,artists:[{...a,image:'javascript:alert(1)'}]}));assert.throws(()=>validateCatalog({version:1,artists:[a,a]}));});
