(function(){
  if(/[?&]pdfexport/.test(location.search))document.body.classList.add("pdfexport");
  var TOTAL=30*60, WARN=25*60;
  var n=document.querySelectorAll('.slide').length;
  var el=document.createElement('div');el.id='talkTimer';el.setAttribute('role','button');
  el.title='簡報計時（目標 30 分鐘）｜點一下／T：開始・暫停｜雙擊／Shift+T：歸零';
  el.innerHTML='<span class="tt-time">00:00</span><span class="tt-sub">點擊開始・30:00</span>';
  document.body.appendChild(el);
  var tEl=el.querySelector('.tt-time'),sEl=el.querySelector('.tt-sub');
  var acc=0,start=null,iv=null;
  function now(){return acc+(start?(Date.now()-start)/1000:0);}
  function fmt(s){s=Math.floor(s);return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');}
  function render(){
    var s=now();
    el.classList.toggle('warn',s>=WARN&&s<TOTAL);el.classList.toggle('over',s>=TOTAL);
    el.classList.toggle('paused',!start&&s>0);
    tEl.textContent=s>=TOTAL?'+'+fmt(s-TOTAL):fmt(s);
    if(!start&&s===0){sEl.textContent='點擊開始・30:00';return;}
    var pg=Math.min(n,Math.floor(s/TOTAL*n)+1);
    sEl.textContent=(start?'':'暫停・')+(s>=TOTAL?'已超時':'剩 '+fmt(TOTAL-s)+'・約第 '+pg+' 頁');
  }
  function toggle(){if(start){acc=now();start=null;clearInterval(iv);}else{start=Date.now();iv=setInterval(render,250);}render();}
  function reset(){acc=0;start=null;clearInterval(iv);render();}
  var ct=null;
  el.addEventListener('click',function(e){e.stopPropagation();e.preventDefault();if(ct){clearTimeout(ct);ct=null;reset();return;}ct=setTimeout(function(){ct=null;toggle();},260);});
  var lp=null;
  el.addEventListener('touchstart',function(e){e.stopPropagation();lp=setTimeout(function(){lp='done';reset();},700);},{passive:true});
  el.addEventListener('touchend',function(e){e.stopPropagation();if(lp==='done'){e.preventDefault();}else clearTimeout(lp);lp=null;});
  document.addEventListener('keydown',function(e){
    if(e.altKey||e.ctrlKey||e.metaKey)return;
    if(window.pdfboxOpen&&window.pdfboxOpen())return;
    if(e.key==='t'||e.key==='T'){e.preventDefault();e.shiftKey?reset():toggle();}
  });
  var m=location.search.match(/timerdemo=(\d+)/);if(m){acc=+m[1];}
  render();
})();
