(() => {
  const root=document.documentElement;
  let favorites=[];
  try{const saved=JSON.parse(localStorage.getItem('drakeford-favorites')||'[]');if(Array.isArray(saved))favorites=saved.filter(id=>Number.isInteger(id));}catch{}
  function updateFavorites(){
    document.querySelectorAll('.vestido-favorito').forEach(button=>{
      const id=Number(button.dataset.id), active=favorites.includes(id), item=vestidos.find(v=>v.id===id);
      button.classList.toggle('favorito-activo',active);button.setAttribute('aria-pressed',String(active));button.setAttribute('aria-label',`${active?'Quitar':'Agregar'} ${item?.nombre||'vestido'} ${active?'de':'a'} favoritos`);
      const icon=button.querySelector('i');icon.classList.toggle('fa-solid',active);icon.classList.toggle('fa-regular',!active);
    });
  }
  document.addEventListener('click',event=>{
    const button=event.target.closest('.vestido-favorito');if(!button)return;
    const id=Number(button.dataset.id);favorites=favorites.includes(id)?favorites.filter(v=>v!==id):[...favorites,id];
    try{localStorage.setItem('drakeford-favorites',JSON.stringify(favorites));}catch{}
    updateFavorites();
  });
  new MutationObserver(updateFavorites).observe(vestidosGrid,{childList:true});updateFavorites();
  window.addEventListener('storage',event=>{if(event.key==='drakeford-favorites'){try{const saved=JSON.parse(event.newValue||'[]');favorites=Array.isArray(saved)?saved:[];}catch{favorites=[];}updateFavorites();}});
  const count=document.createElement('p');count.className='result-count';count.setAttribute('aria-live','polite');vestidosGrid.before(count);
  function updateCount(){const n=vestidosGrid.querySelectorAll('.vestido-card').length;count.textContent=`${n} ${n===1?'vestido':'vestidos'}`;const empty=vestidosGrid.querySelector('p[style]');if(empty){empty.removeAttribute('style');empty.className='empty-result';}}
  new MutationObserver(updateCount).observe(vestidosGrid,{childList:true});updateCount();
  // Accent-insensitive matching preserves combined category + name filtering.
  const normalize=text=>text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  aplicarFiltros=function(){const search=normalize(buscadorVestidos.value.trim());mostrarVestidos(vestidos.filter(item=>(categoriaActual==='Todos'||item.categoria===categoriaActual)&&normalize(item.nombre).includes(search)));};
  buscadorVestidos.addEventListener('input',aplicarFiltros);
  function updateMenu(){const open=nav.classList.contains('mostrar');menuBtn.setAttribute('aria-expanded',String(open));menuBtn.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');}
  menuBtn.addEventListener('click',updateMenu);document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',updateMenu));
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('mostrar')){nav.classList.remove('mostrar');updateMenu();menuBtn.focus();}});
  document.addEventListener('click',event=>{if(nav.classList.contains('mostrar')&&!event.target.closest('.header')){nav.classList.remove('mostrar');updateMenu();}});
  const desktopMenu=matchMedia('(min-width:1121px)');desktopMenu.addEventListener('change',()=>{nav.classList.remove('mostrar');updateMenu();});
  // Preserve the existing modal flow and add focus management and background inertness.
  let returnFocus=null;const originalDetails=verDetalles,originalClose=cerrarModalVestido;
  const background=()=>document.querySelectorAll('header,main,footer,.whatsapp-flotante');
  verDetalles=function(id){returnFocus=document.activeElement;originalDetails(id);if(!modalVestido.classList.contains('activo'))return;modalVestido.setAttribute('aria-hidden','false');background().forEach(el=>el.inert=true);modalCerrar.focus();};
  cerrarModalVestido=function(){const open=modalVestido.classList.contains('activo');originalClose();modalVestido.setAttribute('aria-hidden','true');background().forEach(el=>el.inert=false);if(open&&returnFocus?.isConnected)returnFocus.focus();};
  modalCerrar.removeEventListener('click',originalClose);
  modalCerrar.addEventListener('click',cerrarModalVestido);
  modalVestido.addEventListener('click',event=>{if(event.target===modalVestido)cerrarModalVestido();});
  document.addEventListener('keydown',event=>{
    if(!modalVestido.classList.contains('activo'))return;
    if(event.key==='Escape'){event.preventDefault();cerrarModalVestido();return;}
    if(event.key==='Tab'){const controls=[...modalVestido.querySelectorAll('button:not(:disabled),a[href],input')].filter(el=>el.getClientRects().length);const first=controls[0],last=controls.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}
  });
  // The original handlers run first; reconcile focus and inertness after any close.
  new MutationObserver(()=>{if(!modalVestido.classList.contains('activo')){modalVestido.setAttribute('aria-hidden','true');background().forEach(el=>el.inert=false);}}).observe(modalVestido,{attributes:true,attributeFilter:['class']});
  document.querySelectorAll('.filtro').forEach(button=>{button.setAttribute('aria-pressed',String(button.classList.contains('activo')));button.addEventListener('click',()=>document.querySelectorAll('.filtro').forEach(item=>item.setAttribute('aria-pressed',String(item.classList.contains('activo')))));});
  const navObserver=new MutationObserver(()=>document.querySelectorAll('.nav a').forEach(a=>a.classList.contains('activo')?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current')));
  navObserver.observe(nav,{subtree:true,attributes:true,attributeFilter:['class']});
  // Both previews use section-relative positions because their responsive heights differ.
  let mutedUntil=0,scheduled=false;
  const sections=[...document.querySelectorAll('main>section[id]')];
  function position(){const y=scrollY;let section=sections[0];for(const item of sections){if(item.offsetTop<=y+100)section=item;}return {section:section.id,progress:Math.max(0,Math.min(1,(y-section.offsetTop)/Math.max(1,section.offsetHeight)))};}
  window.addEventListener('scroll',()=>{if(scheduled||performance.now()<mutedUntil||parent===window)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;parent.postMessage({type:'drakeford-scroll',...position()},location.origin);});},{passive:true});
  window.addEventListener('message',event=>{
    if(event.origin!==location.origin||event.source!==parent)return;
    if(event.data?.type==='drakeford-palette'&&root.dataset.baseline!=='true'&&['original','burgundy','emerald','sapphire'].includes(event.data.palette))root.dataset.palette=event.data.palette;
    if(event.data?.type==='drakeford-scroll-to'){const section=document.getElementById(event.data.section),progress=Number(event.data.progress);if(section&&Number.isFinite(progress)){mutedUntil=performance.now()+250;scrollTo({top:section.offsetTop+Math.max(0,Math.min(1,progress))*section.offsetHeight,behavior:'instant'});}}
  });
  if(parent!==window)parent.postMessage({type:'drakeford-ready'},location.origin);
})();
