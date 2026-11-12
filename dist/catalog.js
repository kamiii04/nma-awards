export function validateCatalog(data){
 if(data?.version!==1||!Array.isArray(data.artists))throw Error('아티스트 목록 파일 형식이 올바르지 않습니다.');
 const ids=new Set();return data.artists.map(a=>{
  if(!a||typeof a.id!=='string'||!a.id||ids.has(a.id)||typeof a.name!=='string'||!a.name.trim()||a.name.length>100)throw Error('아티스트 이름 또는 ID를 확인해주세요.');
  ids.add(a.id);
  if(typeof a.image!=='string'||!/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(a.image)||a.image.length>600000)throw Error('사진 형식을 확인해주세요. 관리 화면에서 사진을 다시 등록하세요.');
  if(a.source&&!(typeof a.source==='string'&&/^https?:\/\//.test(a.source)))throw Error('출처는 http 또는 https 주소로 입력해주세요.');
  return{id:a.id,name:a.name.trim(),image:a.image,aliases:Array.isArray(a.aliases)?a.aliases.filter(x=>typeof x==='string').slice(0,20):[],description:typeof a.description==='string'?a.description.slice(0,200):'',source:a.source||''};
 });
}
export const normalize=s=>s.normalize('NFKC').toLocaleLowerCase().replace(/\s+/g,'');
export function filterArtists(artists,q){const needle=normalize(q);return artists.filter(a=>[a.name,...a.aliases].some(n=>normalize(n).includes(needle)))}
