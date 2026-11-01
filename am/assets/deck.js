(function(){
  var deck=document.getElementById('deck');
  var slides=[].slice.call(document.querySelectorAll('.slide'));
  var n=slides.length, i=0;
  var panel=document.getElementById('notesPanel');
  var bar=document.querySelector('.progress');
  var count=document.querySelector('.foot .count');
  if(/[?&]shot/.test(location.search)) document.body.classList.add('shot');
  function fit(){var s=Math.min(window.innerWidth/1600,window.innerHeight/900);document.documentElement.style.setProperty('--s',s);}
  function show(k){
    i=Math.max(0,Math.min(n-1,k));
    slides.forEach(function(s,j){s.classList.toggle('active',j===i);s.setAttribute('aria-hidden',j===i?'false':'true');});
    count.textContent=(i+1)+' / '+n;
    deck.classList.toggle('dark-foot',slides[i].classList.contains('cover')||slides[i].classList.contains('final'));
    bar.style.width=((i+1)/n*100)+'%';
    var nt=slides[i].querySelector('.notes');
    panel.innerHTML='<h4>備忘稿 · 第 '+(i+1)+' 頁（按 N 關閉）</h4>'+(nt?nt.innerHTML:'（無）');
    if(history.replaceState) history.replaceState(null,'','#'+(i+1)); else location.hash='#'+(i+1);
  }
  function next(){show(i+1)} function prev(){show(i-1)}
  function toggleNotes(){panel.classList.toggle('show')}
  document.addEventListener('keydown',function(e){
    if(e.altKey||e.ctrlKey||e.metaKey) return;
    var k=e.key;
    if(k==='ArrowRight'||k==='ArrowDown'||k==='PageDown'||k===' '||k==='Enter'){e.preventDefault();next();}
    else if(k==='ArrowLeft'||k==='ArrowUp'||k==='PageUp'||k==='Backspace'){e.preventDefault();prev();}
    else if(k==='Home'){show(0)} else if(k==='End'){show(n-1)}
    else if(k==='n'||k==='N'){toggleNotes()}
    else if(k==='f'||k==='F'){ if(!document.fullscreenElement){document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen();} else {document.exitFullscreen&&document.exitFullscreen();} }
  });
  document.getElementById('btnPrev').addEventListener('click',function(e){e.stopPropagation();prev();});
  document.getElementById('btnNext').addEventListener('click',function(e){e.stopPropagation();next();});
  document.getElementById('btnNotes').addEventListener('click',function(e){e.stopPropagation();toggleNotes();});
  var moved=false,sx=0,sy=0;
  deck.addEventListener('touchstart',function(e){var t=e.changedTouches[0];sx=t.clientX;sy=t.clientY;moved=false;},{passive:true});
  deck.addEventListener('touchend',function(e){var t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy;
    if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)){moved=true;dx<0?next():prev();}},{passive:true});
  deck.addEventListener('click',function(e){
    if(moved){moved=false;return;}
    if(e.target.closest('a,button')) return;
    if(e.clientX<window.innerWidth*0.3) prev(); else next();
  });
  window.addEventListener('resize',fit);
  window.addEventListener('hashchange',function(){var h=parseInt(location.hash.slice(1),10);if(h&&h-1!==i)show(h-1);});
  fit();
  var h=parseInt(location.hash.slice(1),10); show(h?h-1:0);
  var hint=document.getElementById('hint'); setTimeout(function(){hint.style.opacity=0;},4000);
})();
