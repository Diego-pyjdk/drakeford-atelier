(() => {
  const palettes = {
    original: {name:'Negro & oro', accent:'#d6ad60', description:'Oro original: la identidad negro y dorado de Drakeford.'},
    burgundy: {name:'Borgoña & rosa', accent:'#f29fbb', description:'Borgoña y rosa: un matiz cálido para la misma elegancia.'},
    emerald: {name:'Esmeralda & jade', accent:'#8de5bf', description:'Esmeralda y jade: profundidad y un acento fresco.'},
    sapphire: {name:'Zafiro & hielo', accent:'#a2c7ff', description:'Zafiro y hielo: una alternativa luminosa y serena.'}
  };
  const grid=document.getElementById('previewGrid');
  const original=document.getElementById('originalFrame');
  const alternative=document.getElementById('alternativeFrame');
  let selected='burgundy', pendingScroll=null;
  try { const saved=localStorage.getItem('drakeford-palette'); if(palettes[saved]) selected=saved; } catch {}
  function applyPalette(name, persist=true) {
    if(!palettes[name]) return;
    selected=name;
    document.documentElement.style.setProperty('--selected',palettes[name].accent);
    document.querySelectorAll('[data-palette]').forEach(button=>{const active=button.dataset.palette===name;button.classList.toggle('selected',active);button.setAttribute('aria-pressed',String(active));});
    document.getElementById('paletteName').textContent=palettes[name].name;
    document.getElementById('paletteDescription').textContent=palettes[name].description;
    document.getElementById('openSite').href=`index.html?palette=${name}`;
    alternative.contentWindow?.postMessage({type:'drakeford-palette',palette:name},location.origin);
    if(persist) try {localStorage.setItem('drakeford-palette',name);} catch {}
  }
  document.querySelectorAll('[data-palette]').forEach(button=>button.addEventListener('click',()=>applyPalette(button.dataset.palette)));
  document.querySelectorAll('button[data-view],button[data-device],button[data-side]').forEach(button=>button.addEventListener('click',()=>{
    const key=button.dataset.view?'view':button.dataset.device?'device':'side';
    grid.dataset[key]=button.dataset[key];
    document.querySelectorAll(`[data-${key}]`).forEach(item=>{if(item.tagName==='BUTTON')item.setAttribute('aria-pressed',String(item===button));});
    document.querySelector('.mobile-tabs').style.display=grid.dataset.view==='single'?'none':'';
    if(pendingScroll) [original,alternative].forEach(frame=>frame.contentWindow?.postMessage(pendingScroll,location.origin));
  }));
  document.getElementById('resetPalette').addEventListener('click',()=>applyPalette('original'));
  alternative.addEventListener('load',()=>{applyPalette(selected,false);if(pendingScroll)alternative.contentWindow.postMessage(pendingScroll,location.origin);});
  window.addEventListener('message',event=>{
    if(event.origin!==location.origin || ![original.contentWindow,alternative.contentWindow].includes(event.source)) return;
    if(event.data?.type==='drakeford-scroll' && document.getElementById('syncScroll').checked){
      pendingScroll={type:'drakeford-scroll-to',section:event.data.section,progress:event.data.progress};
      const target=event.source===original.contentWindow?alternative:original;
      target.contentWindow?.postMessage(pendingScroll,location.origin);
    }
    if(event.data?.type==='drakeford-ready' && event.source===alternative.contentWindow) applyPalette(selected,false);
  });
  applyPalette(selected,false);
})();
