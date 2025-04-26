document.addEventListener('DOMContentLoaded', ()=>{
    var list = document.getElementById('post-list');
    var authStatusUi = document.getElementById('auth-status')
    var nav = document.getElementById('nav-menu')
    var boardBody = document.getElementById('board-body')
    var dynamicScript = document.getElementById('dynamic-script')

    fetch('/api/auth').then(res=>res.json()).then(data=>{
        if(data.is_loggedin){
            authStatusUi.innerHTML =`
            ${data.name}님 <a href="/logout">로그아웃</a>`
        }
        else{
            authStatusUi.innerHTML = `
            <a href="/sign_up">회원가입</a>
            <a href="/login">로그인</a>`
        }
    })
    fetch('/nav.html').then(res=>res.text()).then(html=>{
        nav.innerHTML=html;
    })
    const scriptName = window.location.pathname.split('/')[1];
    const scriptTag = document.createElement('script');
    scriptTag.src =`/js/${scriptName}.js`

    dynamicScript.appendChild(scriptTag);
    
})  