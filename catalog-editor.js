const $=s=>document.querySelector(s);
let artists=structuredClone(window.NMA_CATALOG?.artists||[]),editing=null,photo='',dirty=false,photoLoading=false,limit=60;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const normalize=s=>String(s??'').normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
function status(s){$('#status').textContent=s}
function reset(){editing=null;photo='';$('#form').reset();$('#photo-preview').hidden=true;$('#submit').textContent='목록에 추가';$('#form-title').textContent='아티스트 등록';$('#cancel').hidden=true}
function render(){
 const q=normalize($('#filter').value),matches=artists.filter(a=>[a.name,a.english,a.group,...a.aliases].some(n=>normalize(n).includes(q)));
 $('#count').textContent=artists.length;$('#more').hidden=matches.length<=limit;
 $('#cards').innerHTML=matches.slice(0,limit).map(a=>`<article class="card">${a.image?`<img src="${esc(a.image)}" alt="" loading="lazy">`:`<span class="placeholder">${esc(a.name.slice(0,2))}</span>`}<div><strong>${esc(a.name)}</strong><small>${esc(a.english||a.aliases[0]||'')} ${a.group?'· '+esc(a.group):''}</small><div><button data-edit="${esc(a.id)}">수정</button><button data-remove="${esc(a.id)}">삭제</button></div></div></article>`).join('')||'<p>일치하는 항목이 없습니다.</p>';
 document.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>{const a=artists.find(a=>a.id===b.dataset.edit);editing=a.id;photo=a.image||'';for(const field of ['name','english','description','source','group'])$('#'+field).value=a[field]||'';$('#kind').value=a.kind||'solo';$('#aliases').value=a.aliases.join(', ');$('#photo-preview').src=photo;$('#photo-preview').hidden=!photo;$('#photo').value='';$('#form-title').textContent='아티스트 수정';$('#submit').textContent='수정 저장';$('#cancel').hidden=false;$('#name').focus()});
 document.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{const a=artists.find(a=>a.id===b.dataset.remove);if(!confirm(a.name+'을 목록에서 삭제할까요?'))return;artists=artists.filter(a=>a.id!==b.dataset.remove);if(editing===b.dataset.remove)reset();dirty=true;render();status('삭제했습니다. 목록 파일을 저장해주세요.')});
}
$('#filter').oninput=()=>{limit=60;render()};$('#more').onclick=()=>{limit+=60;render()};$('#cancel').onclick=reset;
$('#clear-photo').onclick=()=>{photo='';$('#photo').value='';$('#photo-preview').hidden=true;status('수정 저장을 누르면 사진이 비워집니다.')};
$('#photo').onchange=async()=>{
 const f=$('#photo').files[0];if(!f)return;
 if(!['image/jpeg','image/png','image/webp'].includes(f.type)||f.size>20*1024*1024){status('20MB 이하 JPG, PNG, WebP 사진을 선택해주세요.');return}
 photoLoading=true;$('#submit').disabled=true;const url=URL.createObjectURL(f);
 try{const image=await new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=reject;im.src=url});const scale=Math.min(1,480/Math.max(image.width,image.height)),canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(image.width*scale));canvas.height=Math.max(1,Math.round(image.height*scale));const ctx=canvas.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(image,0,0,canvas.width,canvas.height);photo=canvas.toDataURL('image/jpeg',.82);$('#photo-preview').src=photo;$('#photo-preview').hidden=false;status('사진 준비 완료. 수정 저장 또는 목록에 추가를 눌러주세요.')}catch{status('사진을 읽지 못했습니다.')}finally{photoLoading=false;$('#submit').disabled=false;URL.revokeObjectURL(url)}
};
$('#form').onsubmit=e=>{
 e.preventDefault();if(photoLoading)return;const name=$('#name').value.trim(),group=$('#group').value.trim();if(!name)return;
 const source=$('#source').value.trim();if(source&&!/^https?:\/\//.test(source)){status('출처는 http 또는 https 주소로 입력해주세요.');return}
 if(artists.some(a=>a.id!==editing&&normalize(a.name)===normalize(name)&&normalize(a.group)===normalize(group))){status('같은 이름과 그룹이 이미 등록돼 있어요. 기존 항목을 수정해주세요.');return}
 const previous=artists.find(a=>a.id===editing)||{};
 const a={...previous,id:editing||crypto.randomUUID(),name,english:$('#english').value.trim(),kind:$('#kind').value,group,aliases:$('#aliases').value.split(',').map(s=>s.trim()).filter(Boolean),description:$('#description').value.trim(),image:photo,source};
 if(editing)artists[artists.findIndex(a=>a.id===editing)]=a;else artists.push(a);dirty=true;reset();render();status(`등록된 항목 ${artists.length}개 · 목록 파일을 저장해주세요.`);
};
$('#download').onclick=()=>{if(photoLoading)return;const url=URL.createObjectURL(new Blob([JSON.stringify({version:1,artists},null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='artists.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);dirty=false;status('다운로드한 파일로 dist/artists.json을 교체하고 GitHub에 업로드해주세요.')};
$('#import-button').onclick=()=>$('#import').click();
$('#import').onchange=async()=>{const file=$('#import').files[0];if(!file)return;if(dirty&&!confirm('저장하지 않은 변경사항을 불러온 파일로 교체할까요?'))return;
 try{const data=JSON.parse(await file.text()),ids=new Set();if(data.version!==1||!Array.isArray(data.artists))throw Error();const next=data.artists.map(a=>{if(typeof a.id!=='string'||!a.id||ids.has(a.id)||typeof a.name!=='string'||!a.name.trim()||a.name.length>100)throw Error();if(a.image&&(typeof a.image!=='string'||!/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(a.image)||a.image.length>600000))throw Error();ids.add(a.id);return{...a,image:a.image||'',aliases:Array.isArray(a.aliases)?a.aliases.filter(x=>typeof x==='string'):[]}});artists=next;dirty=false;reset();render();status(`${artists.length}개 항목을 불러왔어요.`)}catch{status('올바른 artists.json 파일을 선택해주세요. 기존 목록은 유지됩니다.')}finally{$('#import').value=''}
};
window.addEventListener('beforeunload',e=>{if(dirty){e.preventDefault();e.returnValue=''}});
render();status(`${artists.length}개 항목을 불러왔어요. 수정한 목록이 있다면 기존 목록 불러오기로 이어서 작업하세요.`);
