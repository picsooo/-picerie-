document.querySelector('.burger')?.addEventListener('click',()=>document.querySelector('nav').classList.toggle('open'));
document.querySelector('form')?.addEventListener('submit',e=>{e.preventDefault();document.querySelector('.ok').style.display='block';e.target.reset()});
