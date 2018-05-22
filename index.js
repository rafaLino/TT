$(function () {
	$("#includeDivElementos").load("https://developer.mozilla.org/pt-BR/docs/Web/HTML/HTML5/HTML5_element_list");
});

function toggleForm() {

	$("#formDiv").toggle('fast');
	$("#tableDiv").toggle('fast');

}

let firstObj = {
	"id": 1,
	"nome": "Piloto",
	"descricao": "Muito bom",
	"temporada": 1,
	"episodio": 1,
	"dataLancamento": new Date()
}

var array = [firstObj];
let idHidden = $("#idHidden");
let nome = $("#nomeTxt");
let descricao = $("#descricaoTxt");
let temporada = $("#temporadaNumber");
let episodio = $("#episodioNumber");
let dataLancamento = $("#lancamentoDate");

let btnSpoiler = document.getElementById("btnSpoiler");

function save(event) {
	event.preventDefault();

	let data = stringToDate(dataLancamento.val());

	if (idHidden.val() == null || idHidden.val() == 0) {
		let obj = {
			"id": array.length + 1,
			"nome": nome.val(),
			"descricao": descricao.val(),
			"temporada": temporada.val(),
			"episodio": episodio.val(),
			"dataLancamento": data
		}
		array.push(obj);
	} else {
		let obj = {
			"id": idHidden.val(),
			"nome": nome.val(),
			"descricao": descricao.val(),
			"temporada": temporada.val(),
			"episodio": episodio.val(),
			"dataLancamento": data
		}
		update(obj);
	}
	limpaCampos();
	carregaGrid();
	toggleForm();
	//aqui vem a chamada do metodo post/put
}

function mudarAula(tela) {
	var divAula0 = document.getElementById("divAula0");
	var divAula1 = document.getElementById("divAula1");
	var divAula2 = document.getElementById("divAula2");
	var divAula3 = document.getElementById("divAula3");
	var divAula4 = document.getElementById("divAula4");
	var divExercicio = document.getElementById("divExercicio");

	var menuAula0 = document.getElementById("mnAula0");
	var menuAula1 = document.getElementById("mnAula1");
	var menuAula2 = document.getElementById("mnAula2");
	var menuAula3 = document.getElementById("mnAula3");
	var menuAula4 = document.getElementById("mnAula4");
	var mnExercicio = document.getElementById("mnExercicio");


	divAula0.style.display = "none";
	divAula1.style.display = "none";
	divAula2.style.display = "none";
	divAula3.style.display = "none";
	divAula4.style.display = "none";
	divExercicio.style.display = "none";

	menuAula0.className = "";
	menuAula1.className = "";
	menuAula2.className = "";
	menuAula3.className = "";
	menuAula4.className = "";
	mnExercicio.className = "";
	switch (tela) {
		case 0:
			divAula0.style.display = "block";
			menuAula0.className = "active";
			break;
		case 1:
			divAula1.style.display = "block";
			menuAula1.className = "active";
			break;
		case 2:
			divAula2.style.display = "block";
			menuAula2.className = "active";
			break;
		case 3:
			divAula3.style.display = "block";
			menuAula3.className = "active";
			break;
		case 4:
			divAula4.style.display = "block";
			menuAula4.className = "active";
			break;
		case 5:
			divExercicio.style.display = "block";
			mnExercicio.className = "active";
			break;
		default:
			divAula1.style.display = "block";
			menuAula1.className = "active";
			break;
	}
}


function mudarexe(exercicio) {
	var mnex1 = $("#mnexe1");
	var mnex2 = $("#mnexe2");
	var mnex3 = $("#mnexe3");
	var mnex4 = $("#mnexe4");
	var mnex5 = $("#mnexe5");

	var ex1 = $("#ex1");
	var ex2 = $("#ex2");
	var ex3 = $("#ex3");
	var ex4 = $("#ex4");
	var ex5 = $("#ex5");

	$(mnex1).removeClass("active");
	$(mnex2).removeClass("active");
	$(mnex3).removeClass("active");
	$(mnex4).removeClass("active");
	$(mnex5).removeClass("active");
	$(ex1).css("display", "none");
	$(ex2).css("display", "none");
	$(ex3).css("display", "none");
	$(ex4).css("display", "none");
	$(ex5).css("display", "none");

	switch (exercicio) {
		case 1:
			$(ex1).css("display", "block");
			$(mnex1).addClass("active");
			break;
		case 2:
			$(ex2).css("display", "block");
			$(mnex2).addClass("active");
			break;
		case 3:
			$(ex3).css("display", "block");
			$(mnex3).addClass("active");
			break;
		case 4:
			$(ex4).css("display", "block");
			$(mnex4).addClass("active");
			break;
		case 5:
			$(ex5).css("display", "block");
			$(mnex5).addClass("active");
			break;

		default:
			$(ex1).css("display", "block");
			$(mnex1).addClass("active");
			break;
	}

}

function carregaGrid() {

	$("#tableEpisodios").find('tbody').empty();
	array.forEach(x => {
		$("#tableEpisodios").find('tbody').append(`<tr onclick="loadform(${x.id})"><td>${x.nome}</td><td>${dateToString(x.dataLancamento)}</td><td>${x.temporada}</td><td>${x.episodio}</td></tr>`)
	})
}

function loadform(id) {
	let data = getById(id);
	idHidden.val(data.id);
	nome.val(data.nome);
	descricao.val(data.descricao);
	temporada.val(data.temporada);
	episodio.val(data.episodio);
	dataLancamento.val(dateToHtml(data.dataLancamento));
	toggleForm();
}

function getById(id) {
	let valor = null;
	array.forEach(x => {
		if (x.id == id) {
			valor = x;
		}
	});
	return valor;
}

function update(data) {
	array = array.map(x => {
		if (data.id == x.id) {
			x = data;
		}
		return x
	});
}


function chamaApi(url, type, callBack, obj = null) {
	if (obj != null) {
		$.ajax({
			url: url,
			type: type,
			data: obj
		}).done(callBack(data))
			.fail(function (data) {
				alert("Houve um erro inesperado!");
			});
	} else {
		$.ajax({
			url: url,
			type: type
		}).done(callBack(data))
			.fail(function (data) {
				alert("Houve um erro inesperado!");
			});
	}
}

function limpaCampos() {
	$("#idHidden").val("");
	$("#nomeTxt").val("");
	$("#descricaoTxt").val("");
	$("#temporadaNumber").val("");
	$("#episodioNumber").val("");
	$("#lancamentoDate").val("");
}

function dateToString(date) {
	return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
}

function stringToDate(dateString) {
	return new Date(...dateString.split("-").map((x, y) => x - (y % 2)));
}

function dateToHtml(date) {

	let ano = date.getFullYear();
	let mes = date.getMonth() + 1;
	let dia = date.getDate();
	if (mes < 10) {
		mes = "0" + mes;
	}


	return ano + "-" + mes + "-" + dia;
}


function calcIdade(objeto) {

	if (objeto.value != "") {
		var horario = "00:00:00";
		var hoje = new Date();
		var dtNasc = new Date(`${objeto.value} ${horario}`);
		var idade = hoje.getFullYear() - dtNasc.getFullYear();
		var m = hoje.getMonth() - dtNasc.getMonth();
		if (m < 0 || (m === 0 && hoje.getDate() < dtNasc.getDate())) {
			idade--;
		}
		alert(`Você tem ${idade} anos`);
	}
	else {
		alert("Se não tiver data não da pra calcular!");
	}
}

function EscreveLog(valor) {
	console.log(valor);
}


function mudarCorBackground(objeto) {

	var teste = objeto.value;
	var div = document.getElementById("divFormAula2");
	div.style.backgroundColor = teste;
}


btnSpoiler.addEventListener("mouseover", exibeEscondeSpoiler);
btnSpoiler.addEventListener("mouseout", exibeEscondeSpoiler);

function exibeEscondeSpoiler() {
	var span = document.getElementById("spanSpoiler");

	if (span.style.display == "block") {
		span.style.display = "none";
	}
	else {
		span.style.display = "block";
	}
}


function validaCpf(objeto) {
	var cpf = objeto.value;
	var pattern = new RegExp(/^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}$/);

	if (cpf != "") {
		if (pattern.test(cpf)) {
			objeto.style.border = "green solid 2px";
			document.querySelector("#divErradoCerto").innerHTML = `<img src="check.png" style="width:20px;height:20px;" />`;
		}
		else {
			objeto.style.border = "red solid 2px";
			document.querySelector("#divErradoCerto").innerHTML = `<img src="x.png" style="width:20px;height:20px;" />`;
		}
	}
	else {
		objeto.style.border = "";
		document.querySelector("#divErradoCerto").innerHTML = "";
	}
}

function validaEmail(objeto) {

	var email = objeto.value;
	var pattern = new RegExp(/\w+@\w+\.\w+\.?\w+?/);

	if (email != "") {
		if (!pattern.test(email)) {
			alert("Escreve de novo, só que certo!");
			objeto.value = "";
			objeto.focus();
		}
	}

}


/*Função Pai de Mascaras*/
function Mascara(o, f) {
	v_obj = o

	v_fun = f

	setTimeout("execmascara()", 1)
}



/*Função que Executa os objetos*/
function execmascara() {
	v_obj.value = v_fun(v_obj.value)
}


function Cpf(v) {

	v = v.replace(/\D/g, "")

	v = v.replace(/(\d{3})(\d)/, "$1.$2")

	v = v.replace(/(\d{3})(\d)/, "$1.$2")

	v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2")

	return v
}

function verificaCepNulo(objeto) {
	if (objeto.value == "") {
		limpa_formulário_cep();
	}
}

function limpa_formulário_cep() {
	// Limpa valores do formulário de cep.
	let txtCep = document.getElementById("txtCep");
	let txtBairro = document.getElementById("txtBairro");
	let txtCidade = document.getElementById("txtCidade");
	let txtEstado = document.getElementById("txtEstado");
	let txtRua = document.getElementById("txtRua");

	txtCep.disabled = false;

	txtBairro.disabled = false;
	txtBairro.value = "";

	txtCidade.disabled = false;
	txtCidade.value = "";

	txtEstado.disabled = false;
	txtEstado.value = "";

	txtRua.disabled = false;
	txtRua.value = "";
}

//Quando o campo cep perde o foco.
function buscaCep(objeto) {

	//Nova variável "cep" somente com dígitos.
	var cep = objeto.value.replace(/\D/g, '');

	//Verifica se campo cep possui valor informado.
	if (cep != "") {

		//Expressão regular para validar o CEP.
		var validacep = /^[0-9]{8}$/;

		//Valida o formato do CEP.
		if (validacep.test(cep)) {

			let imgLoad = document.getElementById("imgLoad");
			imgLoad.style.display = "inline";

			let txtCep = document.getElementById("txtCep");
			let txtBairro = document.getElementById("txtBairro");
			let txtCidade = document.getElementById("txtCidade");
			let txtEstado = document.getElementById("txtEstado");
			let txtRua = document.getElementById("txtRua");

			txtCep.disabled = true;

			txtBairro.disabled = true;
			txtBairro.value = "...";

			txtCidade.disabled = true;
			txtCidade.value = "...";

			txtEstado.disabled = true;
			txtEstado.value = "...";

			txtRua.disabled = true;
			txtRua.value = "...";

			fncAjaxCep(cep);
		} //end if.
		else {
			//cep é inválido.
			limpa_formulário_cep();
			alert("Formato de CEP inválido.");
		}
	} //end if.
	else {
		//cep sem valor, limpa formulário.
		limpa_formulário_cep();
	}
}

function fncAjaxCep(cep) {
	$.ajax({
		url: 'http://cep.republicavirtual.com.br/web_cep.php',
		type: 'get',
		dataType: 'json',
		crossDomain: true,
		data: {
			cep: cep, //pega valor do campo
			formato: 'json'
		},
		success: retornaEndereco
	});
}

function retornaEndereco(data) {
	let txtCep = document.getElementById("txtCep");
	let txtBairro = document.getElementById("txtBairro");
	let txtCidade = document.getElementById("txtCidade");
	let txtEstado = document.getElementById("txtEstado");
	let txtRua = document.getElementById("txtRua");

	if (data.resultado != "0") {
		//Atualiza os campos com os valores da consulta.
		txtEstado.value = data.uf;
		txtEstado.disabled = true;

		txtRua.value = data.logradouro;
		txtRua.disabled = true;

		txtBairro.value = data.bairro;
		txtBairro.disabled = true;

		txtCidade.value = data.cidade;
		txtCidade.disabled = true;
	} //end if.
	else {
		//CEP pesquisado não foi encontrado.
		limpa_formulário_cep();
		alert("CEP não encontrado.");
	}

	let imgLoad = document.getElementById("imgLoad");
	imgLoad.style.display = "none";
	$("#txtCep").prop("disabled", false);
}


















