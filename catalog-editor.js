const $=s=>document.querySelector(s);

/* 프로젝트 JSON 파일 직접 저장 */

let catalogFileHandle = null;
let saveQueue = Promise.resolve();
let savedRevision = 0;
let editRevision = 0;

function validateCatalog(data) {
  if (data.version !== 1 || !Array.isArray(data.artists)) {
    throw new Error('지원하지 않는 JSON 형식입니다.');
  }

  const ids = new Set();

  return data.artists.map(a => {
    if (
      typeof a.id !== 'string' || !a.id ||
      ids.has(a.id) ||
      typeof a.name !== 'string' ||
      !a.name.trim()
    ) {
      throw new Error('아티스트 데이터가 올바르지 않습니다.');
    }

    if (
      a.image &&
      (typeof a.image !== 'string' ||
       !/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(a.image) ||
       a.image.length > 600000)
    ) {
      throw new Error('사진 데이터가 올바르지 않습니다.');
    }

    ids.add(a.id);

    return {
      ...a,
      image: a.image || '',
      aliases: Array.isArray(a.aliases)
        ? a.aliases.filter(x => typeof x === 'string')
        : []
    };
  });
}

$('#connect-file').onclick = async () => {
  if (!window.showOpenFilePicker) {
    status('Chrome 또는 Edge에서 Live Server로 열어주세요.');
    return;
  }

  try {
    if (dirty && !confirm(
      '저장하지 않은 수정 내용이 있습니다. 파일을 다시 불러올까요?'
    )) return;

    const [handle] = await window.showOpenFilePicker({
      types: [{
        description: 'JSON 파일',
        accept: { 'application/json': ['.json'] }
      }],
      multiple: false
    });

    if (handle.name !== 'artists.json') {
      status('dist 폴더의 artists.json을 선택해주세요.');
      return;
    }

    const file = await handle.getFile();
    const data = JSON.parse(await file.text());
    const loadedArtists = validateCatalog(data);

    // 파일 쓰기 권한 요청
    const permission = await handle.requestPermission({
      mode: 'readwrite'
    });

    if (permission !== 'granted') {
      status('파일 수정 권한이 허용되지 않았습니다.');
      return;
    }

    await saveQueue;

    catalogFileHandle = handle;
    artists = loadedArtists;
    dirty = false;
    editRevision = 0;
    savedRevision = 0;

    reset();
    render();

    status(
      `✓ ${artists.length}개 아티스트 연결 완료! 수정하면 자동 저장됩니다.`
    );

    $('#connect-file').textContent = '✓ JSON 연결됨';

  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error(error);
      status('파일 연결 실패: ' + error.message);
    }
  }
};

function saveConnectedCatalog() {
  if (!catalogFileHandle) {
    status('수정했습니다. 프로젝트 JSON을 연결하거나 목록 파일을 저장해주세요.');
    return;
  }

  // 수정 시점의 데이터를 저장 대기열에 추가
  const revision = ++editRevision;
  const json = JSON.stringify({
    version: 1,
    artists
  }, null, 2);

  saveQueue = saveQueue.catch(() => {}).then(async () => {
    const writable = await catalogFileHandle.createWritable();

    try {
      await writable.write(json);
      await writable.close();

      savedRevision = revision;

      if (savedRevision === editRevision) {
        dirty = false;
        status('✓ dist/artists.json 자동 저장 완료!');
      }
    } catch (error) {
      try {
        await writable.abort();
      } catch {}
      throw error;
    }
  }).catch(error => {
    console.error('JSON 저장 실패:', error);
    dirty = true;
    status('저장 실패! 파일 권한을 확인하고 JSON 백업을 저장해주세요.');
  });

  return saveQueue;
}

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
 document.querySelectorAll('[data-remove]').forEach(b => b.onclick = () => {
   const a = artists.find(a => a.id === b.dataset.remove);
   if (!confirm(a.name + '을 목록에서 삭제할까요?')) return;

   artists = artists.filter(a => a.id !== b.dataset.remove);

   if (editing === b.dataset.remove) reset();

   dirty = true;
   render();
   saveConnectedCatalog();
 });
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
 
if (editing) {
  artists[artists.findIndex(a => a.id === editing)] = a;
} else {
  artists.push(a);
}

dirty = true;
reset();
render();

saveConnectedCatalog();

};
$('#download').onclick=()=>{if(photoLoading)return;const url=URL.createObjectURL(new Blob([JSON.stringify({version:1,artists},null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='artists.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);status('다운로드한 파일로 dist/artists.json을 교체하고 GitHub에 업로드해주세요.')};
$('#import-button').onclick=()=>$('#import').click();
$('#import').onchange=async()=>{const file=$('#import').files[0];if(!file)return;if(dirty&&!confirm('저장하지 않은 변경사항을 불러온 파일로 교체할까요?'))return;
 try{const data=JSON.parse(await file.text()),ids=new Set();if(data.version!==1||!Array.isArray(data.artists))throw Error();const next=data.artists.map(a=>{if(typeof a.id!=='string'||!a.id||ids.has(a.id)||typeof a.name!=='string'||!a.name.trim()||a.name.length>100)throw Error();if(a.image&&(typeof a.image!=='string'||!/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(a.image)||a.image.length>600000))throw Error();ids.add(a.id);return{...a,image:a.image||'',aliases:Array.isArray(a.aliases)?a.aliases.filter(x=>typeof x==='string'):[]}});artists=next;dirty=false;reset();render();status(`${artists.length}개 항목을 불러왔어요.`)}catch{status('올바른 artists.json 파일을 선택해주세요. 기존 목록은 유지됩니다.')}finally{$('#import').value=''}
};
window.addEventListener('beforeunload',e=>{if(dirty){e.preventDefault();e.returnValue=''}});
render();status(`${artists.length}개 항목을 불러왔어요. 수정한 목록이 있다면 기존 목록 불러오기로 이어서 작업하세요.`);

document.querySelector('#connect-file').addEventListener('click', () => {
  console.log('JSON 연결 버튼 클릭 확인!');
});