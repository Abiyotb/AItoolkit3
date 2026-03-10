/* Minimal utilities (no external dependencies) */

function $(sel, root=document){
  return root.querySelector(sel);
}
function $all(sel, root=document){
  return Array.from(root.querySelectorAll(sel));
}

function escapeHTML(str){
  return (str ?? '').toString()
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;')
    .replaceAll('"','&quot;')
    .replaceAll("'",'&#39;');
}

function downloadText(text, filename, mime='text/plain;charset=utf-8'){
  const blob = new Blob([text], {type: mime});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function downloadJSON(obj, filename){
  downloadText(JSON.stringify(obj, null, 2), filename, 'application/json;charset=utf-8');
}

function saveLocal(key, obj){
  localStorage.setItem(key, JSON.stringify(obj));
}

function loadLocal(key){
  const raw = localStorage.getItem(key);
  if(!raw) return null;
  try{ return JSON.parse(raw); }catch{ return null; }
}

function clearLocal(key){
  localStorage.removeItem(key);
}

function setActiveNav(){
  const path = location.pathname.split('/').pop();
  $all('.nav a').forEach(a => {
    const href = a.getAttribute('href');
    if(!href) return;
    const target = href.split('/').pop();
    a.classList.toggle('active', target === path);
  });
}

function todayISO(){
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth()+1).padStart(2,'0');
  const dd = String(d.getDate()).padStart(2,'0');
  return `${yyyy}-${mm}-${dd}`;
}

