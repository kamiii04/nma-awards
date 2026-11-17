import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root=path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/,'$1'));
const base=process.cwd();
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8'};
http.createServer((req,res)=>{
 let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400).end();return}
 const isEditor=/^\/catalog-(editor\.(html|js|css)|seed\.js)$/.test(pathname);
 const folder=isEditor?base:path.join(base,'dist');
 const target=path.resolve(folder,'.'+(pathname==='/'?'/index.html':pathname));
 if(!target.startsWith(folder+path.sep)){res.writeHead(403).end();return}
 fs.readFile(target,(err,data)=>{if(err){res.writeHead(404).end('Not found');return}res.writeHead(200,{'Content-Type':types[path.extname(target)]||'application/octet-stream','Cache-Control':'no-store'});res.end(data)});
}).listen(4175,'127.0.0.1',()=>console.log('NMA: http://127.0.0.1:4175 — Manager: http://127.0.0.1:4175/catalog-editor.html'));
