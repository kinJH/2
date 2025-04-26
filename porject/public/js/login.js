
document.addEventListener('DOMContentLoaded', ()=>{
    
    const auth = document.getElementById('auth-status');
    fetch('/login.html').then(res=>res.text()).then(html=>{
        auth.innerHTML=html;
    })
})