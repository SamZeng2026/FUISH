(function(){
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