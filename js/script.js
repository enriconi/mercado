const resultList = document.getElementById('price-list');
const historyList = document.getElementById('historic-list');

let results = {};

function calculate() {
  const quantityInput = document.getElementById('quantity');
  const priceInput = document.getElementById('price');
  const descriptionInput = document.getElementById('description');

  const checkboxes = document.querySelectorAll('input[name="btn"]:checked');
  const quantity = parseFloat(quantityInput.value);
  const price = parseFloat(priceInput.value);
  const description = descriptionInput.value;

  if (
    !validateInput(quantityInput) ||
    !validateInput(priceInput) ||
    !validateInput(descriptionInput)
  ) {
    return;
  }

  checkboxes.forEach((checkbox) => {
    const user = checkbox.value;
    const result = (price * quantity) / checkboxes.length;

    if (!results[user]) results[user] = 0;
    results[user] += result;
    addToResultList(user, results[user]);
    addToHistory(user, result, description);
  });

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

function addToHistory(btn, result, description) {
  const item = createHistoryItem(btn, result, description);
  const deleteButton = createDeleteButton(item, result);

  item.appendChild(deleteButton);
  historyList.appendChild(item);
}

function createHistoryItem(btn, result, description) {
  const item = document.createElement('li');
  item.classList.add('item-history');

  const title = document.createElement('h3');
  title.textContent = description;

  const formattedPrice = document.createElement('p');
  formattedPrice.textContent = `R$ ${result.toFixed(2)}`;

  item.setAttribute('data-user', btn);
  item.appendChild(title);
  item.appendChild(formattedPrice);

  return item;
}

function createDeleteButton(item, result) {
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Deletar';
  deleteButton.addEventListener('click', () => {
    deleteItem(item, result);
    historyList.removeChild(item);
  });

  return deleteButton;
}

function deleteItem(item, result) {
  const user = item.getAttribute('data-user');
  results[user] -= result;
  addToResultList(user, results[user]);
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
