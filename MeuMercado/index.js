
var usuario = localStorage.getItem("User");

if (usuario == null || usuario == "") {
    alert("Faça o Login Primeiro");
    window.location.href = "login.html";
}

function logOut() {
    localStorage.setItem("User","");
    window.location.href = "login.html";
}

function mudarTela(index) {

    var mnCadastro = document.getElementById("mnCadastro");
    var mnConsulta = document.getElementById("mnConsulta");
    var mnHome = document.getElementById("mnHome");

    var divCadastro = document.getElementById("divCadastro");
    var divConsulta = document.getElementById("divConsulta");
    var divHome = document.getElementById("divHome");

    divCadastro.style.display = "none";
    divConsulta.style.display = "none";
    divHome.style.display = "none";

    mnCadastro.classList.remove("active");
    mnConsulta.classList.remove("active");
    mnHome.classList.remove("active");

    switch (index) {
        case 1:
            divCadastro.style.display = "block";
            mnCadastro.classList.add("active");
            break;

        case 2:
            divConsulta.style.display = "block";
            mnConsulta.classList.add("active");
            break;
        default:
            divHome.style.display = "block";
            mnHome.classList.add("active");
            break;
    }
}

function validarNome(){
    var inputNome = document.getElementById("txtNome");
    if(/^(\D{1,})$/.test(inputNome.value)){
        inputNome.style.border = "2px solid green";
    }
    else{
        inputNome.style.border = "2px solid red";
    }
}


function salvarProduto() {
    var nome = document.getElementById("txtNome").value;
    var preco = document.getElementById("numPreco").value;
    var descricao = document.getElementById("txtDescricao").value;
    var alerta = document.getElementById("alertSuccess");

    var produto = {
        "nome": document.getElementById("txtNome").value,
        "preco": document.getElementById("numPreco").value,
        "descricao": document.getElementById("txtDescricao").value
    }

    localStorage.setItem("Produto", JSON.stringify(produto));

    var alerta = document.getElementById("alertSuccess");
    alerta.style.display = "block";

    setTimeout(function () {
        alerta.style.display = "none";
    }, 3000);

}


function pesquisarProduto() {
    var nome = document.getElementById("txtNomeProduto");
    var alerta = document.getElementById("alertError");
    var tabela = document.getElementById("tabela");
    var tbody = document.getElementsByTagName("tbody")[0];

    if (nome.value == undefined || nome.value == "") {
        alerta.style.display = "block";

        setTimeout(function () {
            alerta.style.display = "none";
        }, 3000);
    }
    else {
        var produto = JSON.parse(localStorage.getItem("Produto"));
      
        if (produto.nome.toLowerCase().includes(nome.value.toLowerCase())) {
            var row = tbody.insertRow(tbody.rows.length);
            var colum0 = row.insertCell(0);
            var colum1 = row.insertCell(1);
            var colum2 = row.insertCell(2);

            colum0.innerHTML = produto.nome;
            colum1.innerHTML= produto.preco ;
            colum2.innerHTML= produto.descricao;

        }
        else{
            alerta.style.display = "block";

        setTimeout(function () {
            alerta.style.display = "none";
        }, 3000);
        }
    }

}