const resultList = document.getElementById('price-list');
const historyList = document.getElementById('historic-list');

let results = [];
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
        item: [],
        totalPrice: 0,
      };
    }
    results[user].totalPrice += result;
    results[user].item.push({
      id: id,
      price: result,
    });
    /*
      TO-DO:
      result.item.push is better?
      option A id, price, users: ['a', 'b']...
      option B id, price, users, quantity, description (better to others funcs (less props))
      when delete item check the others users and recalculte by length (case users > 2)

      think more about it zZz 04:47
      i want sleep :p
    */
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

function addToHistory(btn, result, description, id) {
  const item = createHistoryItem(btn, result, description);
  const deleteButton = createDeleteButton(item, result, id);

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

function createDeleteButton(item, result, id) {
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Deletar';
  deleteButton.addEventListener('click', () => {
    deleteItem(item, result, id);
    historyList.removeChild(item);
  });

  return deleteButton;
}

function deleteItem(item, result, id) {
  const user = item.getAttribute('data-user');
  results[user].totalPrice -= result;
  results[user].item.splice(id, 1);

  for (const otherUser in results) {
    if (otherUser !== user) {
      const matchingProduct = results[otherUser].item.find(
        (product) => product.id === id,
      );

      if (matchingProduct) {
        results[otherUser].totalPrice += matchingProduct.price;
        console.log(results[otherUser].totalPrice);
        addToResultList(otherUser, results[otherUser].totalPrice);
        // TO-DO: add to history list
      }
    }
  }
  addToResultList(user, results[user].totalPrice);
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
