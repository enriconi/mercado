const resultList = document.getElementById('price-list');
const historyList = document.getElementById('historic-list');

let results = [];
results.item = [];
let id = 0;

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

    if (!results[user]) {
      results[user] = {
        totalPrice: 0,
      };
    }

    if (!results.item[id]) {
      results.item[id] = {
        id: id,
        price: result,
        originalPrice: (price * quantity),
        description: description,
        quantity: quantity,
        user: []
      };
    }

    results.item[id].user.push(user);
    results[user].totalPrice += result;

    addToResultList(user, results[user].totalPrice);
    addToHistory(user, result, description, id);
  });

  quantityInput.value = '';
  priceInput.value = '';
  descriptionInput.value = '';
  id++;
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
// 
function addToHistory(btn, result, description, id) {
  const item = createHistoryItem(btn, result, description);
  const deleteButton = createDeleteButton(item, id);

  item.appendChild(deleteButton);
  historyList.appendChild(item);
}

function createHistoryItem(btn, result, description) {
  const item = document.createElement('li');
  item.classList.add('item-history');
  const wrapperDiv = document.createElement('div');
  wrapperDiv.classList.add('item-wrapper');

  const title = document.createElement('h3');
  title.textContent = description;

  const formattedPrice = document.createElement('p');
  formattedPrice.textContent = `R$ ${result.toFixed(2)}`;

  item.setAttribute('data-user', btn);
  wrapperDiv.appendChild(title);
  wrapperDiv.appendChild(formattedPrice);
  item.appendChild(wrapperDiv);

  return item;
}

function createDeleteButton(item, id) {
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button');
  deleteButton.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
`;
  deleteButton.addEventListener('click', () => {
    deleteItem(item, id);
    historyList.removeChild(item);
  });

  return deleteButton;
}

function deleteItem(item, id) {
  const user = item.getAttribute('data-user');

  results.item.forEach(product => {
    if (product.id === id) {
      const index = product.user.indexOf(user);
      results[user].totalPrice -= product.price;
      addToResultList(user, results[user].totalPrice);
      product.user.splice(index, 1);

      product.user.forEach(user => {
        results[user].totalPrice += product.price / product.user.length;
        addToResultList(user, results[user].totalPrice);
      })

      product.price = (product.originalPrice / product.user.length);
    }
  })

  while (historyList.firstChild) {
    historyList.removeChild(historyList.firstChild);
  }

  results.item.forEach(product => {
    product.user.forEach(user => {
      addToHistory(user, product.price, product.description, product.id);
    });
  });
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

function changeTheme() {
  document.body.classList.toggle('theme--dark');
  document.body.classList.toggle('theme--light');
}

function downloadJSON() {
  const jsonContent = JSON.stringify(results.item, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const link = document.createElement('a');

  link.download = generateFileName('mercado');
  link.href = window.URL.createObjectURL(blob);

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function generateFileName(name) {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 10);
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const generatedName = `${name}_${formattedDate}_${hours}:${minutes}`;

  return generatedName;
}