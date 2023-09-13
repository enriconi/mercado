const listaResultados = document.getElementById('listaResultados');
const listaHistorico = document.getElementById('listaHistorico');
let resultadoA = 0;
let resultadoB = 0;

function calcular() {
  const btnA = document.getElementById('btnA');
  const btnB = document.getElementById('btnB');
  const quantidadeInput = document.getElementById('quantidade');
  const valorInput = document.getElementById('valor');
  const nomeItemInput = document.getElementById('nomeItem');

  const quantidade = parseFloat(quantidadeInput.value);
  const valor = parseFloat(valorInput.value);
  const nomeItem = nomeItemInput.value;

  if (btnA.checked) {
    resultadoA += btnB.checked ? (valor * quantidade) / 2 : valor * quantidade;
    adicionarResultadoLista('A', resultadoA);
    adicionarHistorico('A', nomeItem, valor, quantidade);
  }

  if (btnB.checked) {
    resultadoB += btnA.checked ? (valor * quantidade) / 2 : valor * quantidade;
    adicionarResultadoLista('B', resultadoB);
    adicionarHistorico('B', nomeItem, valor, quantidade);
  }

  quantidadeInput.value = '';
  valorInput.value = '';
  nomeItemInput.value = '';
}

function adicionarResultadoLista(botao, resultado) {
  const item = document.createElement('li');
  item.textContent = `${botao}: R$ ${resultado.toFixed(2)}`;
  listaResultados.appendChild(item);
}

function adicionarHistorico(botao, nomeItem, valor, quantidade) {
  const item = document.createElement('li');
  item.textContent = `${botao}: ${nomeItem} - QTD ${quantidade} - VALOR R$ ${valor.toFixed(
    2,
  )}`;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Deletar';
  deleteButton.addEventListener('click', () => {
    listaHistorico.removeChild(item);
  });

  item.appendChild(deleteButton);
  listaHistorico.appendChild(item);
}
