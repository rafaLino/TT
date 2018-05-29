$(function () {
    $(".block").click(function () {
        var source = $(this).css("background-image");
        var realSource = source.replace('url(', '').replace(')', '').replace(/\"/gi, "");

        $("#imgModal").attr("src", realSource);

        $("#modal").modal();

    });
    pesquisarProduto();

    $( "form" ).on( "submit", function( event ) {
        event.preventDefault();
        res = $(this).serialize();
      });
});

var usuario = localStorage.getItem("User");

if (usuario == null || usuario == "") {
    alert("Faça o Login Primeiro");
    window.location.href = "login.html";
}

function logOut() {
    localStorage.setItem("User", "");
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

function validarNome() {
    var inputNome = document.getElementById("txtNome");
    if (/^(\D{1,})$/.test(inputNome.value)) {
        inputNome.style.border = "2px solid green";
    }
    else {
        inputNome.style.border = "2px solid red";
    }


}


function salvarProduto($event) {
    // var nome = document.getElementById("txtNome").value;
    // var preco = document.getElementById("numPreco").value;
    // var descricao = document.getElementById("txtDescricao").value;
    // var alerta = document.getElementById("alertSuccess");

    // var produto = {
    //     "nome": document.getElementById("txtNome").value,
    //     "preco": document.getElementById("numPreco").value,
    //     "descricao": document.getElementById("txtDescricao").value
    // }

    // localStorage.setItem("Produto", JSON.stringify(produto));

    // var alerta = document.getElementById("alertSuccess");
    // alerta.style.display = "block";

    // setTimeout(function () {
    //     alerta.style.display = "none";
    // }, 3000);
    $event.preventDefault();
    console.log($("#cadastroProdutoForm").serialize());
}


function pesquisarProduto() {
    $.ajax({
        url: 'https://talentosapipastel.herokuapp.com/pastel',
        type: 'get', //get, post, put, delete
        dataType: 'json',
        contentType: "application/json",
        crossDomain: true,
        //data: JSON.stringify(json)   
        beforeSend: function () {
            $(".aguarde").show();
        }
    }).done(function (data) {
        var corpoTabela = $("#tabela tbody");

        for (let index = 0; index < data.length; index++) {
            var line = $("<tr/>");
            $("<td/>").append(data[index].nome).appendTo(line);
            $("<td/>").append(data[index].sabor).appendTo(line);
            $("<td/>").append(data[index].descricao).appendTo(line);
            $("<td/>").append(data[index].preco).appendTo(line);
            $("<td/>").append(data[index].quantidade).appendTo(line);
            $("<td/>").append("<img onclick='deletarProduto(" + data[index].id + ")' src='../x.png' class='imgdelete' />").appendTo(line);
            corpoTabela.append(line);

        }

    }).fail(function (jqXHR, textStatus, error) {
        console.log(error);
    }).always(function () {
        $(".aguarde").hide();
    });
}

function deletarProduto(id) {
    $.ajax({
        url: 'https://talentosapipastel.herokuapp.com/pastel/' + id,
        type: 'delete',
        dataType: "json",
        contentType: "application/json",
        crossDomain: true,
        beforeSend: function () {
            $(".aguarde").show();
        }
    }).done(function (data) {
        $("#tabela tbody").empty();
        pesquisarProduto();

    }).fail(function (jqXHR, textStatus, error) {
        console.log(error);
    }).always(function () {
        $(".aguarde").hide();
    });
}

function filtroProduto() {

    var input, filter, table, tr, td;
    input = document.getElementById("txtNomeProduto");
    filter = input.value.toUpperCase();
    table = document.getElementById("tabela");
    tr = table.getElementsByTagName("tr");

    for (var i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}


