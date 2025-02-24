document.addEventListener("DOMContentLoaded", carregarContatos);

const formulario = document.getElementById("form-group");

formulario.addEventListener("submit", function (event) {
  event.preventDefault();
  adicionarContato();
});

function adicionarContato() {
  const nome = document.getElementById("nome").value;
  const telefone = document.getElementById("telefone").value;
  const email = document.getElementById("email").value;
  const indice = document.getElementById("indiceContato").value;

  if (nome === "" || telefone === "" || email === "") {
    alert("Por favor, preencha todos os campos");
    return;
  }

  let contatos = JSON.parse(localStorage.getItem("contatos")) || [];

  if (indice === "-1") {
    contatos.push({ nome, telefone, email });
  } else {
    contatos[indice] = { nome, telefone, email };
  }

  localStorage.setItem("contatos", JSON.stringify(contatos));
  limparCampos();
  carregarContatos();
}

function salvarContato(contato) {
  let contatos = JSON.parse(localStorage.getItem("contatos")) || [];
  contatos.push(contato);
  localStorage.setItem("contatos", JSON.stringify(contatos));
}

function carregarContatos() {
  const lista = document.getElementById("listaContatos");
  lista.innerHTML = "";

  let contatos = JSON.parse(localStorage.getItem("contatos")) || [];

  contatos.forEach((contato, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
        <p><strong>Nome:</strong> ${contato.nome}</p>
        <p><strong>Telefone:</strong> ${contato.telefone}</p>
        <p><strong>E-mail:</strong> ${contato.email}</p>
        <button type="button" class="delete" onclick="removerContato(${index})">X</button>
        <button type="button" class="atualizar" onclick="atualizarContato(${index})">Edit</button>
    `;

    lista.appendChild(li);
  });
}

function removerContato(index) {
  let contatos = JSON.parse(localStorage.getItem("contatos")) || [];
  contatos.splice(index, 1);
  localStorage.setItem("contatos", JSON.stringify(contatos));
  carregarContatos();
}

function limparCampos() {
  document.getElementById("nome").value = "";
  document.getElementById("telefone").value = "";
  document.getElementById("email").value = "";
  document.getElementById("indiceContato").value = "-1";
}

function atualizarContato(index) {
  let contatos = JSON.parse(localStorage.getItem("contatos")) || [];
  const contato = contatos[index];
  document.getElementById("nome").value = contato.nome;
  document.getElementById("telefone").value = contato.telefone;
  document.getElementById("email").value = contato.email;
  document.getElementById("indiceContato").value = index;
}
