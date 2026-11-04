(function(){
  var ov=document.createElement('div');ov.id='pdfbox';
  ov.innerHTML='<div class="pb-inner"><button class="pb-x" aria-label="關閉">×</button><div class="pb-imgs"></div><div class="pb-cap"></div></div>';
  document.body.appendChild(ov);
  var imgs=ov.querySelector('.pb-imgs'),cap=ov.querySelector('.pb-cap');
  function open(el){
    imgs.innerHTML='';
    el.getAttribute('data-pdf').split(',').forEach(function(s){var i=document.createElement('img');i.src='assets/pdf/'+s.trim()+'.png';i.alt=el.getAttribute('data-cap');imgs.appendChild(i);});
    cap.textContent=el.getAttribute('data-cap');ov.classList.add('on');
  }
  function close(){ov.classList.remove('on');}
  window.pdfboxOpen=function(){return ov.classList.contains('on');};
  document.querySelectorAll('[data-pdf]').forEach(function(el){
    el.addEventListener('click',function(e){e.stopPropagation();e.preventDefault();open(el);});
    ['touchstart','touchend'].forEach(function(t){el.addEventListener(t,function(e){e.stopPropagation();},{passive:true});});
  });
  ov.addEventListener('click',function(e){e.stopPropagation();if(e.target===ov||e.target.classList.contains('pb-x'))close();});
  ['touchstart','touchend'].forEach(function(t){ov.addEventListener(t,function(e){e.stopPropagation();},{passive:true});});
  window.addEventListener('keydown',function(e){if(!ov.classList.contains('on'))return;e.stopImmediatePropagation();e.preventDefault();if(e.key==='Escape')close();},true);
  if(location.search.indexOf('pdfdemo=')>-1){var k=location.search.split('pdfdemo=')[1].split('&')[0];var t=document.querySelectorAll('[data-pdf]')[+k];if(t)open(t);}
})();
