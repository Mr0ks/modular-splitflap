import { mkdir, readFile, writeFile } from 'node:fs/promises';

const response = await fetch('http://localhost:8787/');
if (!response.ok) throw new Error(`Local render failed: ${response.status}`);
let html = await response.text();
html = html
  .replace(/<script\b[^>]*>.*?<\/script>/gs, '')
  .replace(/(["'])\//g, '$1/modular-splitflap/')
  .replaceAll('https://modular-splitflap.olegmalyshev.chatgpt.site/og.png', 'https://mr0ks.github.io/modular-splitflap/og.png');
const enhancement = `<script>(()=>{const key='msf-progress';const buttons=[...document.querySelectorAll('.check')];let done=[];try{done=JSON.parse(localStorage.getItem(key)||'[]')}catch{}const paint=()=>{buttons.forEach((b,i)=>b.closest('.build-step').classList.toggle('complete',done.includes(i)));const bar=document.querySelector('.progress span');const label=document.querySelector('.progress b');if(bar)bar.style.width=(done.length/buttons.length*100)+'%';if(label)label.textContent=done.length+'/'+buttons.length+' gates passed'};buttons.forEach((b,i)=>b.addEventListener('click',()=>{done=done.includes(i)?done.filter(x=>x!==i):done.concat(i);localStorage.setItem(key,JSON.stringify(done));paint()}));const seg=[...document.querySelectorAll('.segmented button')];seg.forEach((b,i)=>b.addEventListener('click',()=>{seg.forEach(x=>x.classList.remove('active'));b.classList.add('active');const n=i+1;const out=document.querySelector('.calculator strong');if(out)out.textContent='AU$'+(n*37.5).toFixed(0)+'–'+(n*45).toFixed(0)}));paint()})()</script>`;
html = html.replace('</body>', `${enhancement}</body>`);
await mkdir('docs', { recursive: true });
await writeFile('docs/index.html', html);
await writeFile('docs/.nojekyll', '');
const cssPath = 'docs/_next/static/css/index.BP6M6q0C.css';
try {
  const css = await readFile(cssPath, 'utf8');
  await writeFile(cssPath, css.replaceAll('url(/', 'url(/modular-splitflap/'));
} catch {}
