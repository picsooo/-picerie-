(function(){
const WA='213667600560';
const P=[
{id:'box',c:'Box iftar',n:'Box iftar pour 2',d:'Entrée, plat, pain, dessert et boisson, livrée chaude.',p:4500,i:'entree'},
{id:'box4',c:'Box iftar',n:'Box iftar pour 4',d:'Le même festin, pour la famille.',p:8500,i:'moussaka'},
{id:'ent',c:'Plats & galettes',n:'Entrée du jour',d:'Croquettes, pois chiches et citron.',p:450,i:'entree-assiette'},
{id:'gal',c:'Plats & galettes',n:'Galette salée',d:'Garnie à la commande.',p:650,i:'galettes'},
{id:'mou',c:'Plats & galettes',n:'Moussaka maison',d:'Plat du jour mijoté, portion individuelle.',p:900,i:'moussaka'},
{id:'pain',c:'Pains & charcuteries',n:'Pain du jour',d:'Pain complet aux flocons.',p:250,i:'pain'},
{id:'ter',c:'Pains & charcuteries',n:'Terrine en croûte',d:'Environ 300 g, tranchée à la demande.',p:800,i:'terrine'},
{id:'pla',c:'Pains & charcuteries',n:'Plateau de charcuteries',d:'Terrines et pâtés pour 4 personnes.',p:2200,i:'huile-terrine'},
{id:'vd',c:'Épicerie fine',n:'Vinaigre de dattes',d:'Le Parrain, 100 % naturel.',p:1200,i:'vinaigres'},
{id:'vp',c:'Épicerie fine',n:'Vinaigre de pomme',d:'Le Parrain, 100 % naturel.',p:1100,i:'vinaigres'},
{id:'hui',c:'Épicerie fine',n:'Huile d\'olive',d:'Producteur local, bouteille 1 L.',p:2500,i:'huile-terrine'},
{id:'con',c:'Épicerie fine',n:'Confiture de fraises',d:'Maison, pot de 350 g.',p:600,i:'confiture'}];
const fmt=n=>n.toLocaleString('fr-FR').replace(/\u202f|\u00a0/g,' ')+' DA';
let cart={};try{cart=JSON.parse(localStorage.getItem('sc_cart')||'{}')}catch(e){}
const save=()=>{try{localStorage.setItem('sc_cart',JSON.stringify(cart))}catch(e){}};
const by=id=>P.find(x=>x.id===id);
document.body.insertAdjacentHTML('beforeend',`<div class="veil"></div><aside class="drawer" aria-label="Panier"><div class="dh"><h3>Votre panier</h3><button type="button" class="x" aria-label="Fermer">×</button></div><div class="db"></div><div class="df"></div></aside>`);
const veil=document.querySelector('.veil'),dr=document.querySelector('.drawer'),db=dr.querySelector('.db'),df=dr.querySelector('.df');
const open=()=>{dr.classList.add('on');veil.classList.add('on')},close=()=>{dr.classList.remove('on');veil.classList.remove('on')};
veil.onclick=close;dr.querySelector('.x').onclick=close;
document.querySelectorAll('[data-cart]').forEach(b=>b.onclick=open);
const count=()=>Object.values(cart).reduce((a,b)=>a+b,0);
const total=()=>Object.entries(cart).reduce((a,[k,q])=>a+by(k).p*q,0);
function render(){
 document.querySelectorAll('.cnt').forEach(e=>e.textContent=count());
 const ids=Object.keys(cart);
 if(!ids.length){db.innerHTML='<p class="empty">Votre panier est vide.<br>Ajoutez un plat, un pain ou un produit de l\'épicerie.</p>';df.innerHTML='';return}
 db.innerHTML=ids.map(k=>{const x=by(k);return `<div class="line"><img src="assets/img/${x.i}.jpg" alt=""><div><b>${x.n}</b><small>${fmt(x.p)}</small><div class="qty"><button data-m="${k}" aria-label="Moins">−</button><span>${cart[k]}</span><button data-a="${k}" aria-label="Plus">+</button></div></div><b>${fmt(x.p*cart[k])}</b></div>`}).join('');
 db.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{cart[b.dataset.a]++;save();render()});
 db.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{const k=b.dataset.m;if(--cart[k]<=0)delete cart[k];save();render()});
 const keep=df.querySelector('form')?Object.fromEntries(new FormData(df.querySelector('form'))):{};
 df.innerHTML=`<div class="tot"><span>Total</span><span>${fmt(total())}</span></div><form class="co"><div class="mode"><label><input type="radio" name="mode" value="Livraison" checked><span>Livraison</span></label><label><input type="radio" name="mode" value="À emporter"><span>À emporter</span></label></div><input name="nom" placeholder="Votre nom" required><input name="tel" type="tel" placeholder="Téléphone" required><input name="adr" placeholder="Adresse de livraison"><input name="quand" placeholder="Pour quand ? (ex. demain 18h)"><textarea name="note" rows="2" placeholder="Une précision ?"></textarea><button class="btn" type="submit" style="margin-top:14px">Envoyer ma commande</button><small>La commande s'ouvre dans WhatsApp, l'équipe la confirme et annonce les frais de livraison.</small></form>`;
 const f=df.querySelector('form');
 for(const [k,v] of Object.entries(keep)){const e=f.elements[k];if(!e)continue;if(e.length&&e[0]?.type==='radio'){[...e].forEach(r=>r.checked=r.value===v)}else e.value=v}
 f.onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(f));
  const lines=ids.map(k=>`• ${cart[k]} × ${by(k).n} — ${fmt(by(k).p*cart[k])}`).join('\n');
  const m=`Bonjour, je souhaite commander :\n${lines}\n\nTotal : ${fmt(total())}\nMode : ${d.mode}${d.mode==='Livraison'&&d.adr?'\nAdresse : '+d.adr:''}\nPour : ${d.quand||'dès que possible'}\nNom : ${d.nom} — Tél : ${d.tel}${d.note?'\nNote : '+d.note:''}`;
  window.open('https://wa.me/'+WA+'?text='+encodeURIComponent(m),'_blank')};
}
window.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
const shop=document.getElementById('shop');
if(shop){
 const cats=['Tout',...new Set(P.map(x=>x.c))];const fl=document.getElementById('filters');
 const draw=c=>{fl.innerHTML=cats.map(k=>`<button class="chip${k===c?' on':''}" data-c="${k}">${k}</button>`).join('');
  fl.querySelectorAll('.chip').forEach(b=>b.onclick=()=>draw(b.dataset.c));
  shop.innerHTML=P.filter(x=>c==='Tout'||x.c===c).map(x=>`<article class="prod" id="${x.id}"><div class="ph"><img src="assets/img/${x.i}.jpg" alt="${x.n}" loading="lazy"></div><h3>${x.n}</h3><p class="d">${x.d}</p><div class="row"><span class="pr">${fmt(x.p)}</span><button class="add" data-id="${x.id}">Ajouter</button></div></article>`).join('');
  shop.querySelectorAll('.add').forEach(b=>b.onclick=()=>{cart[b.dataset.id]=(cart[b.dataset.id]||0)+1;save();render();const cb=document.querySelector('.cartbtn');cb.classList.remove('bump');void cb.offsetWidth;cb.classList.add('bump');b.textContent='Ajouté ✓';setTimeout(()=>b.textContent='Ajouter',900)})};
 draw(location.hash==='#box'?'Box iftar':'Tout');
}
render();
})();
