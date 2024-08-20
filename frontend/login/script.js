
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    let headersList = {
        "Accept": "*/*",
        "User-Agent": "login-personalizador",
        "Content-Type": "application/json"
       }
       
       let bodyContent = JSON.stringify({
         
          "email": username,
          "senha": password
         
       });
       
       let response = await fetch("http://localhost:3000/users/login", { 
         method: "POST",
         body: bodyContent,
         headers: headersList
       });
       
       let data = await response.json();
       
       if (data.mensagem) {
            document.getElementById('loginForm').style.display = 'none';
            let p = document.createElement('p');
            let btn = document.createElement('button');
            btn.innerText= 'tentar novamente.'
            p.innerText= data.mensagem;
            let loginContainer = document.getElementById('loginContainer');
            loginContainer.appendChild(p);
            loginContainer.appendChild(btn);
            btn.addEventListener('click', function(){
                btn.remove();
                p.remove();
                document.getElementById('loginForm').style.display = 'block';
                document.getElementById('username').value = '';
                document.getElementById('password').value = ''; 

            })
       }else {
         console.log(data.mensagem);
         localStorage.setItem('responseData', JSON.stringify(data));
         window.location.href = "http://127.0.0.1:5500/frontend/personalizador";

       }

});
