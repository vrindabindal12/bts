(function(){
  // Reveal on scroll
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting){x.target.classList.add('vi');io.unobserve(x.target);}});},{threshold:.1,rootMargin:'0px 0px -40px 0px'});
    document.querySelectorAll('.rv,.rl,.rr,.rs').forEach(function(el){io.observe(el);});
  } else {
    document.querySelectorAll('.rv,.rl,.rr,.rs').forEach(function(el){el.classList.add('vi');});
  }
  // Sticky nav
  var nav=document.querySelector('.nav');
  if(nav) window.addEventListener('scroll',function(){nav.classList.toggle('sc',scrollY>40);},{passive:true});
  // Mobile nav
  var ham=document.getElementById('ham');
  var menu=document.getElementById('nm');
  if(ham&&menu){
    ham.addEventListener('click',function(){
      var o=menu.classList.toggle('open');
      ham.setAttribute('aria-expanded',String(o));
      ham.classList.toggle('active',o);
      if(!o){
        // Close all submenus when menu is closed
        document.querySelectorAll('.drop-wrap').forEach(function(w){
          w.classList.remove('submenu-open');
          var d=w.querySelector('.dropdown');
          if(d) d.classList.remove('open');
        });
      }
    });
  }
  // Dropdowns (hover on desktop, click on mobile)
  document.querySelectorAll('.drop-wrap').forEach(function(w){
    var d=w.querySelector('.dropdown');
    if(!d)return;
    var t;
    w.addEventListener('mouseenter',function(){
      if(window.innerWidth>=768){
        clearTimeout(t);
        d.classList.add('open');
      }
    });
    w.addEventListener('mouseleave',function(){
      if(window.innerWidth>=768){
        t=setTimeout(function(){d.classList.remove('open');},100);
      }
    });
    w.querySelector('.nav-a').addEventListener('click',function(e){
      if(window.innerWidth<768){
        e.preventDefault();
        d.classList.toggle('open');
        w.classList.toggle('submenu-open');
      }
    });
  });
  // Close mobile menu on link click
  if(menu) menu.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click',function(){
      if(a.getAttribute('aria-haspopup')==='true'||a.getAttribute('href')==='#')return;
      menu.classList.remove('open');
      if(ham){
        ham.setAttribute('aria-expanded','false');
        ham.classList.remove('active');
      }
    });
  });
  // Animated counters
  var cio=new IntersectionObserver(function(e){
    e.forEach(function(x){
      if(!x.isIntersecting)return;
      cio.unobserve(x.target);
      var el=x.target,tgt=parseFloat(el.dataset.count||0);
      var sfx=el.dataset.suffix||'',pfx=el.dataset.prefix||'';
      var isInt=Number.isInteger(tgt),dur=1800,step=16,elapsed=0;
      var t=setInterval(function(){
        elapsed+=step;
        var p=Math.min(elapsed/dur,1),e2=1-Math.pow(1-p,3);
        el.textContent=pfx+(isInt?Math.round(e2*tgt):(e2*tgt).toFixed(1))+sfx;
        if(p>=1)clearInterval(t);
      },step);
    });
  },{threshold:.5});
  document.querySelectorAll('[data-count]').forEach(function(el){cio.observe(el);});
  // FAQ
  document.querySelectorAll('.faq-btn').forEach(function(btn){
    btn.addEventListener('click',function(){
      var item=btn.closest('.faq-item'),open=item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(i){
        i.classList.remove('open');
        i.querySelector('.faq-btn').setAttribute('aria-expanded','false');
        var b=i.querySelector('.faq-body');if(b)b.style.maxHeight='0';
      });
      if(!open){
        item.classList.add('open');
        btn.setAttribute('aria-expanded','true');
        var b=item.querySelector('.faq-body');if(b)b.style.maxHeight=b.scrollHeight+'px';
      }
    });
  });
  // Active nav link
  var path=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-a[href]').forEach(function(a){
    if(a.getAttribute('href')===path)a.classList.add('on');
  });
})();
