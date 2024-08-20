document
  .getElementById("registrarForm")
  .addEventListener("submit", async function (event) {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;

    let headersList = {
      Accept: "*/*",
      "User-Agent": "registrar-personalizador",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      nome: username,
      email: email,
      senha: password,
    });

    let response = await fetch("http://localhost:3000/users", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });

    let data = await response.json();
    console.log(data);
    if (data.message) {
      document.getElementById("registrarForm").style.display = "none";
      let p = document.createElement("p");
      let btn = document.createElement("button");
      btn.innerText = "tentar novamente.";
      p.innerText = data.message;
      let registrarContainer = document.getElementById("registrarContainer");
      registrarContainer.appendChild(p);
      registrarContainer.appendChild(btn);
      btn.addEventListener("click", function () {
        btn.remove();
        p.remove();
        document.getElementById("registrarForm").style.display = "block";
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        document.getElementById("email").value = "";
      });
    }
    if (data.MSG) {
      console.log(data);

      document.getElementById("registrarForm").style.display = "none";
    }
  });
