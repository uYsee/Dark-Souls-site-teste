// Menu mobile
var menuToggle = document.getElementById('menu-toggle');
var menuLista = document.getElementById('menu-lista');

if (menuToggle && menuLista) {
  menuToggle.addEventListener('click', function () {
    menuLista.classList.toggle('aberto');
  });
}

// Filtro de cards (páginas dos jogos) 
var botoesFiltro = document.querySelectorAll('.filtro');

botoesFiltro.forEach(function (botao) {
  botao.addEventListener('click', function () {
    var categoria = botao.getAttribute('data-categoria');

    // Marca o botão clicado como selecionado
    botoesFiltro.forEach(function (b) { b.classList.remove('selecionado'); });
    botao.classList.add('selecionado');

    // Percorre os cards e esconde os que não são da categoria
    var cards = document.querySelectorAll('.card[data-categoria]');
    cards.forEach(function (card) {
      if (categoria === 'todos' || card.getAttribute('data-categoria') === categoria) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Máscara de data (DD/MM/AAAA) ----------
var campoData = document.getElementById('nascimento');

if (campoData) {
  campoData.addEventListener('input', function () {
    // Remove tudo que não for número
    var valor = campoData.value.replace(/\D/g, '');

    if (valor.length > 8) {
      valor = valor.substring(0, 8);
    }

    // Adiciona as barras: DD/MM/AAAA
    if (valor.length > 4) {
      valor = valor.substring(0, 2) + '/' + valor.substring(2, 4) + '/' + valor.substring(4);
    } else if (valor.length > 2) {
      valor = valor.substring(0, 2) + '/' + valor.substring(2);
    }

    campoData.value = valor;
  });
}

// Validação do formulário
var formulario = document.getElementById('form-cadastro');

if (formulario) {
  formulario.addEventListener('submit', function (evento) {
    // Impede o envio padrão do formulário
    evento.preventDefault();

    var valido = true;

    // Pega os valores dos campos
    var nome = document.getElementById('nome').value.trim();
    var email = document.getElementById('email').value.trim();
    var nascimento = document.getElementById('nascimento').value.trim();

    // Limpa as mensagens de erro anteriores
    document.getElementById('erro-nome').textContent = '';
    document.getElementById('erro-email').textContent = '';
    document.getElementById('erro-nascimento').textContent = '';
    document.getElementById('msg-sucesso').textContent = '';

    // Valida o nome
    if (nome.length < 3) {
      document.getElementById('erro-nome').textContent = 'Digite um nome com pelo menos 3 letras.';
      valido = false;
    }

    // Valida o e-mail usando uma expressão regular simples
    var padraoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!padraoEmail.test(email)) {
      document.getElementById('erro-email').textContent = 'Digite um e-mail válido.';
      valido = false;
    }

    // Valida a data
    var padraoData = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    var partes = nascimento.match(padraoData);

    if (!partes) {
      document.getElementById('erro-nascimento').textContent = 'Digite a data no formato DD/MM/AAAA.';
      valido = false;
    } else {
      var dia = parseInt(partes[1], 10);
      var mes = parseInt(partes[2], 10);
      var ano = parseInt(partes[3], 10);

      if (dia < 1 || dia > 31 || mes < 1 || mes > 12 || ano < 1900 || ano > 2026) {
        document.getElementById('erro-nascimento').textContent = 'Digite uma data válida.';
        valido = false;
      }
    }

    // Se tudo estiver correto, mostra a mensagem de sucesso
    if (valido) {
      document.getElementById('msg-sucesso').textContent =
        'Cadastro enviado com sucesso! Praised the sun, ' + nome + '!';
      formulario.reset();
    }
  });
}
