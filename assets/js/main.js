(function(){
  // 手机端导航：汉堡按钮 + 侧滑菜单
  (function(){
    var topbar=document.querySelector('.topbar-inner');
    if(!topbar){return;}
    var nav=topbar.querySelector('.nav');
    var lang=topbar.querySelector('.lang');
    if(!nav||!lang){return;}
    var btn=document.createElement('button');
    btn.type='button';
    btn.setAttribute('aria-label','打开菜单');
    btn.className='topbar-menu-btn';
    btn.innerHTML='<span></span><span></span><span></span>';
    topbar.appendChild(btn);
    var overlay=document.createElement('div');
    overlay.className='nav-mobile-overlay';
    var drawer=document.createElement('div');
    drawer.className='nav-mobile-drawer';
    drawer.appendChild(nav.cloneNode(true));
    drawer.appendChild(lang.cloneNode(true));
    overlay.appendChild(drawer);
    document.body.appendChild(overlay);
    function open(){ document.body.classList.add('mobile-menu-open'); }
    function close(){ document.body.classList.remove('mobile-menu-open'); }
    btn.addEventListener('click', function(e){ e.stopPropagation(); open(); });
    overlay.addEventListener('click', function(e){ if(e.target===overlay) close(); });
    drawer.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', close); });
    window.addEventListener('resize', function(){ if(window.innerWidth>900) close(); });
  })();

  const lb=document.querySelector('.lightbox');
  if(lb){
    const img=lb.querySelector('img');
    const close=lb.querySelector('.close');
    document.querySelectorAll('[data-lightbox]').forEach(a=>{
      a.addEventListener('click', e=>{
        e.preventDefault();
        const src=a.getAttribute('href');
        img.src=src;
        lb.classList.add('open');
      });
    });
    document.querySelectorAll('img[data-zoom]').forEach(im=>{
      im.style.cursor='pointer';
      im.addEventListener('click', ()=>{
        img.src=im.getAttribute('data-zoom')||im.src;
        lb.classList.add('open');
      });
    });
    const doClose=()=>lb.classList.remove('open');
    close?.addEventListener('click', doClose);
    lb.addEventListener('click', (e)=>{ if(e.target===lb) doClose(); });
    document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') doClose(); });
  }

  // 首页 Hero 4 图轮播
  const slides=document.querySelectorAll('.hero-slide');
  if(slides.length>1){
    let idx=0;
    setInterval(function(){
      slides[idx].classList.remove('active');
      idx=(idx+1)%slides.length;
      slides[idx].classList.add('active');
    }, 5000);
  }
})();