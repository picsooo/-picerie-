const nav=document.getElementById('nav'),menu=document.getElementById('menu'),bg=document.getElementById('burger');
const on=()=>nav.classList.toggle('on',scrollY>40);on();addEventListener('scroll',on,{passive:true});
bg.onclick=()=>{const o=menu.classList.toggle('open');nav.classList.toggle('menu-open',o);bg.setAttribute('aria-expanded',o)};
menu.querySelectorAll('a').forEach(a=>a.onclick=()=>{menu.classList.remove('open');nav.classList.remove('menu-open')});
document.getElementById('rf').onsubmit=e=>{e.preventDefault();const g=id=>document.getElementById(id).value;
const t=`Bonjour, je souhaite réserver une table.\nNom : ${g('n')}\nQuand : ${g('d')}\nPersonnes : ${g('p')}\nTél : ${g('t')}${g('m')?'\nPrécision : '+g('m'):''}`;
window.open('https://wa.me/213667600560?text='+encodeURIComponent(t),'_blank')};
