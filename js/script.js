const listaResultados = document.getElementById('price-list');
const listaHistorico = document.getElementById('historic-list');
let resultadoA = 0;
let resultadoB = 0;

function calcular() {
  const btnA = document.getElementById('btnA');
  const btnB = document.getElementById('btnB');

  const quantidadeInput = document.getElementById('quantidade');
  const precoInput = document.getElementById('preco');
  const descricaoInput = document.getElementById('descricao');

  if (
    !validateInput(quantidadeInput) ||
    !validateInput(precoInput) ||
    !validateInput(descricaoInput)
  ) {
    return;
  }

  const quantidade = parseFloat(quantidadeInput.value);
  const preco = parseFloat(precoInput.value);
  const descricao = descricaoInput.value;

  if (btnA.checked) {
    resultadoA += btnB.checked ? (preco * quantidade) / 2 : preco * quantidade;
    adicionarResultadoLista('A', resultadoA);
    adicionarHistorico('A', descricao, preco, quantidade);
  }

  if (btnB.checked) {
    resultadoB += btnA.checked ? (preco * quantidade) / 2 : preco * quantidade;
    adicionarResultadoLista('B', resultadoB);
    adicionarHistorico('B', descricao, preco, quantidade);
  }

  quantidadeInput.value = '';
  precoInput.value = '';
  descricaoInput.value = '';
}

function adicionarResultadoLista(botao, resultado) {
  const checkElement = document.getElementById(botao);

  if (checkElement) {
    const value = checkElement.querySelector('p');
    value.textContent = `R$ ${resultado.toFixed(2)}`;
  } else {
    const item = createListItem(botao, resultado);
    listaResultados.appendChild(item);
  }
}

function createListItem(botao, resultado) {
  const item = document.createElement('li');
  item.classList.add('item-result');
  item.id = botao;

  const title = document.createElement('h3');
  title.textContent = botao;

  const price = document.createElement('p');
  price.textContent = `R$ ${resultado.toFixed(2)}`;

  item.appendChild(title);
  item.appendChild(price);

  return item;
}

function adicionarHistorico(botao, descricao, preco, quantidade) {
  // item.textContent = `${botao}: ${descricao} - QTD ${quantidade} - preco R$ ${preco.toFixed(
  //   2,
  // )}`;

  const item = createHistoryItem(descricao, preco, botao);
  const deleteButton = createDeleteButton(item, preco);

  item.appendChild(deleteButton);
  listaHistorico.appendChild(item);
}

function createHistoryItem(descricao, preco, botao) {
  const item = document.createElement('li');
  item.classList.add('item-history');

  const title = document.createElement('h3');
  title.textContent = descricao;

  const price = document.createElement('p');
  price.textContent = `R$ ${preco.toFixed(2)}`;

  item.setAttribute('data-user', botao);
  item.appendChild(title);
  item.appendChild(price);

  return item;
}

function createDeleteButton(item, preco) {
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Deletar';
  deleteButton.addEventListener('click', () => {
    deleteItem(item, preco);
    listaHistorico.removeChild(item);
  });

  return deleteButton;
}

function deleteItem(item, preco) {
  const itemSelected = item.getAttribute('data-user');
  if (itemSelected === 'A') {
    resultadoA -= preco;
    adicionarResultadoLista('A', resultadoA);
  }

  if (itemSelected === 'B') {
    resultadoB -= preco;
    adicionarResultadoLista('B', resultadoB);
  }
}

function validateInput(inputElement) {
  if (!inputElement.value) {
    inputElement.classList.add('error');
    return false;
  } else {
    inputElement.classList.remove('error');
    return true;
  }
}
