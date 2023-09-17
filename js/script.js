const listaResultados = document.getElementById('listaResultados');
const listaHistorico = document.getElementById('listaHistorico');
let resultadoA = 0;
let resultadoB = 0;

function calcular() {
  const btnA = document.getElementById('btnA');
  const btnB = document.getElementById('btnB');
  const quantidadeInput = document.getElementById('quantidade');
  const precoInput = document.getElementById('preco');
  const descricaoInput = document.getElementById('descricao');

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
  const item = document.createElement('li');
  item.classList.add('item-result');
  const title = document.createElement('h3');
  title.textContent = `${botao}`;
  const price = document.createElement('p');
  price.textContent = `R$ ${resultado.toFixed(2)}`;
  item.appendChild(title);
  item.appendChild(price);
  listaResultados.appendChild(item);
}

function adicionarHistorico(botao, descricao, preco, quantidade) {
  const item = document.createElement('li');
  item.classList.add('item-history');
  const title = document.createElement('h3');
  title.textContent = `${descricao}`;
  const price = document.createElement('p');
  price.textContent = `R$ ${preco.toFixed(2)}`;
  item.appendChild(title);
  item.appendChild(price);
  // item.textContent = `${botao}: ${descricao} - QTD ${quantidade} - preco R$ ${preco.toFixed(
  //   2,
  // )}`;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Deletar';
  deleteButton.addEventListener('click', () => {
    listaHistorico.removeChild(item);
  });

  item.appendChild(deleteButton);
  listaHistorico.appendChild(item);
}
