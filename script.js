/* ==========================================================================
   Rommar Ombao — CV
   Tree of experience, scroll reveals, timeline stem fill
   ========================================================================== */

(function(){
var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---- tree of experience: branches grow from the base upward ---- */
var branches = Array.prototype.slice.call(document.querySelectorAll('.branch'));
var yearEl = document.getElementById('treeYear');
var whoEl = document.getElementById('treeWho');
var DEFAULT_YEAR = '2016 → 2026';
var DEFAULT_WHO = 'Five accounts on one trunk, still growing';

branches.forEach(function(b){
  function show(){
    branches.forEach(function(o){ o.classList.remove('active'); });
    b.classList.add('active');
    yearEl.textContent = b.dataset.year;
    whoEl.textContent = b.dataset.who;
  }
  function clear(){
    b.classList.remove('active');
    yearEl.textContent = DEFAULT_YEAR;
    whoEl.textContent = DEFAULT_WHO;
  }
  b.addEventListener('mouseenter', show);
  b.addEventListener('mouseleave', clear);
  b.addEventListener('focus', show);
  b.addEventListener('blur', clear);
});

if(reduce){
  branches.forEach(function(b){ b.classList.add('grown'); });
} else {
  branches.forEach(function(b,i){
    setTimeout(function(){ b.classList.add('grown'); }, 300 + i * 260);
  });
}

/* ---- scroll reveals ---- */
var io = new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(e.isIntersecting){ e.target.classList.add('is-in'); io.unobserve(e.target); }
  });
}, {threshold: .18, rootMargin: '0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

/* ---- timeline stem fills as you scroll past it ---- */
var tl = document.getElementById('timeline');
var stem = document.getElementById('stem');
function fill(){
  if(!tl) return;
  var r = tl.getBoundingClientRect();
  var mid = window.innerHeight * 0.55;
  var p = (mid - r.top) / r.height;
  stem.style.setProperty('--fill', Math.max(0, Math.min(1, p)).toFixed(3));
}
if(reduce){ stem.style.setProperty('--fill','1'); }
else {
  fill();
  window.addEventListener('scroll', function(){ window.requestAnimationFrame(fill); }, {passive:true});
  window.addEventListener('resize', fill);
}
})();
