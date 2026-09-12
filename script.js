/* ==========================================================================
   Rommar Ombao — CV
   Tree of experience, scroll reveals, timeline stem fill
   ========================================================================== */

(function(){
var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---- theme toggle ----
   The initial theme is set by the inline script in <head> so the page
   never flashes. This only handles clicks and keeps the button labelled. */
var root = document.documentElement;
var toggle = document.getElementById('themeToggle');

function syncToggle(){
  var dark = root.getAttribute('data-theme') === 'dark';
  if(!toggle) return;
  toggle.setAttribute('aria-pressed', dark ? 'true' : 'false');
  toggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
}
syncToggle();

if(toggle){
  toggle.addEventListener('click', function(){
    var dark = root.getAttribute('data-theme') === 'dark';
    if(dark){ root.removeAttribute('data-theme'); }
    else { root.setAttribute('data-theme','dark'); }
    try{ localStorage.setItem('theme', dark ? 'light' : 'dark'); }catch(e){}
    syncToggle();
  });
}

/* Follow the OS setting until the visitor makes their own choice. */
var mq = window.matchMedia('(prefers-color-scheme: dark)');
var onSchemeChange = function(e){
  var chosen = null;
  try{ chosen = localStorage.getItem('theme'); }catch(err){}
  if(chosen) return;
  if(e.matches){ root.setAttribute('data-theme','dark'); }
  else { root.removeAttribute('data-theme'); }
  syncToggle();
};
if(mq.addEventListener){ mq.addEventListener('change', onSchemeChange); }
else if(mq.addListener){ mq.addListener(onSchemeChange); }

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
