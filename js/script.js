const resultList = document.getElementById('price-list');
const historyList = document.getElementById('historic-list');
let resultA = 0;
let resultB = 0;

function calculate() {
  const btnA = document.getElementById('btnA');
  const btnB = document.getElementById('btnB');

  const quantityInput = document.getElementById('quantity');
  const priceInput = document.getElementById('price');
  const descriptionInput = document.getElementById('description');

  if (
    !validateInput(quantityInput) ||
    !validateInput(priceInput) ||
    !validateInput(descriptionInput)
  ) {
    return;
  }

  const quantity = parseFloat(quantityInput.value);
  const price = parseFloat(priceInput.value);
  const description = descriptionInput.value;

  if (btnA.checked) {
    resultA += btnB.checked ? (price * quantity) / 2 : price * quantity;
    addToResultList('A', resultA);
    addToHistory('A', description, price, quantity);
  }

  if (btnB.checked) {
    resultB += btnA.checked ? (price * quantity) / 2 : price * quantity;
    addToResultList('B', resultB);
    addToHistory('B', description, price, quantity);
  }

  quantityInput.value = '';
  priceInput.value = '';
  descriptionInput.value = '';
}

function addToResultList(btn, result) {
  const checkElement = document.getElementById(btn);

  if (checkElement) {
    const value = checkElement.querySelector('p');
    value.textContent = `R$ ${result.toFixed(2)}`;
  } else {
    const item = createListItem(btn, result);
    resultList.appendChild(item);
  }
}

function createListItem(btn, result) {
  const item = document.createElement('li');
  item.classList.add('item-result');
  item.id = btn;

  const title = document.createElement('h3');
  title.textContent = btn;

  const price = document.createElement('p');
  price.textContent = `R$ ${result.toFixed(2)}`;

  item.appendChild(title);
  item.appendChild(price);

  return item;
}

function addToHistory(btn, description, price, quantidade) {
  // item.textContent = `${btn}: ${description} - QTD ${quantidade} - preco R$ ${price.toFixed(
  //   2,
  // )}`;

  const item = createHistoryItem(description, price, btn);
  const deleteButton = createDeleteButton(item, price);

  item.appendChild(deleteButton);
  historyList.appendChild(item);
}

function createHistoryItem(description, price, btn) {
  const item = document.createElement('li');
  item.classList.add('item-history');

  const title = document.createElement('h3');
  title.textContent = description;

  const formattedPrice = document.createElement('p');
  formattedPrice.textContent = `R$ ${price.toFixed(2)}`;

  item.setAttribute('data-user', btn);
  item.appendChild(title);
  item.appendChild(formattedPrice);

  return item;
}

function createDeleteButton(item, price) {
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Deletar';
  deleteButton.addEventListener('click', () => {
    deleteItem(item, price);
    historyList.removeChild(item);
  });

  return deleteButton;
}

function deleteItem(item, price) {
  const itemSelected = item.getAttribute('data-user');
  if (itemSelected === 'A') {
    resultA -= price;
    addToResultList('A', resultA);
  }

  if (itemSelected === 'B') {
    resultB -= price;
    addToResultList('B', resultB);
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
