import fs from 'node:fs';
import {normalize,validateCatalog} from './dist/catalog.js';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8').replace(/^\uFEFF/,''));
const existing=read('dist/artists.json').artists.filter(a=>!a.id.startsWith('artist-')); // Preserve owner entries; regenerate only seeded records.
const requested=read('research-requested.json'),awards=read('research-awards.json');
const records=new Map();
for(const g of [...awards,...requested])records.set(normalize(g.english),g);
const catalog=[...existing];
const slug=s=>normalize(s);
const unique=a=>[...new Set(a.filter(Boolean))];
function add(record){
 const names=[record.name,record.english,...record.aliases].map(normalize);
 const found=catalog.find(a=>normalize(a.group||'')===normalize(record.group||'')&&(record.kind==='member'?(a.id===record.id||normalize(a.name)===normalize(record.name)):[a.name,a.english,...(a.aliases||[])].some(n=>n&&names.includes(normalize(n)))));
 if(found){const id=found.id,image=found.image||'',source=found.source||'',name=found.name;Object.assign(found,record,{id,image,source,name,aliases:unique([record.name,...record.aliases,...(found.aliases||[])])});return found}
 catalog.push(record);return record;
}
for(const g of records.values()){
 const members=g.members||[],kind=members.length?'group':'solo';
 const group=add({id:'artist-'+slug(g.english),name:g.name,english:g.english,aliases:unique([g.english,...(g.aliases||[])]),image:'',source:'',kind,group:'',description:g.membershipBasis||''});
 const all=[...members,...(g.formerMembers||[]).map(m=>({...m,former:true}))];
 for(const m of all){
  add({id:group.id+'-member-'+slug(m.english),name:m.name,english:m.english,kind:'member',group:g.name,groupId:group.id,image:'',source:'',aliases:unique([m.english,...(m.aliases||[]),g.name+' '+m.name,g.english+' '+m.english,g.english+' '+m.name]),description:(m.former?'전 멤버 · ':'')+g.name+(g.membershipBasis?' · '+g.membershipBasis:'')});
 }
}
// Existing owner-added King Gnu photo and name remain unchanged; provide Korean lookup too.
const king=catalog.find(a=>normalize(a.name)==='kinggnu');if(king){king.english='King Gnu';king.kind='group';king.aliases=unique([...(king.aliases||[]),'킹누','킹 누'])}
catalog.sort((a,b)=>a.name.localeCompare(b.name,'ko')||(a.group||'').localeCompare(b.group||'','ko'));
validateCatalog({version:1,artists:catalog});
fs.writeFileSync('dist/artists.json',JSON.stringify({version:1,artists:catalog},null,2));
const sourceText=['# 아티스트 목록 범위와 확인 출처','','확인 기준일: 2026-11-17. 조사 범위: 2017–2026년 주요 한국 음악 시상식(MAMA, MMA, 골든디스크, 서울가요대상, 더팩트 뮤직 어워즈, AAA)의 확인 가능한 출연/참석 기록 및 사용자가 지정한 32개 그룹. 전체 시상식의 완전한 참석자 명부를 보증하지 않으며, 출처가 확인된 명단을 기본 목록으로 제공합니다.','','멤버는 그룹 단위 참석 기록과 별도로 검색 편의를 위해 등록했습니다. 멤버의 개별 참석을 의미하지 않습니다. 과거 활동 그룹의 구성원 및 확인된 전 멤버를 포함합니다. 공개 명단에 이후 변경이 있으면 관리 도구에서 수정할 수 있습니다. 사진은 사용자 기존 등록분만 유지하고 새 항목은 비워 두었습니다.','',...Array.from(records.values()).flatMap(g=>['## '+g.name+' / '+g.english,'',g.membershipBasis||'그룹별 아래 출처를 기준으로 멤버 이름을 등록했습니다.',...(g.sources||[]).map(u=>'- '+u),''])].join('\n');
fs.writeFileSync('CATALOG-SOURCES.md',sourceText);
console.log(JSON.stringify({total:catalog.length,groups:catalog.filter(a=>a.kind==='group').length,solo:catalog.filter(a=>a.kind==='solo').length,members:catalog.filter(a=>a.kind==='member').length,photos:catalog.filter(a=>a.image).length}));
