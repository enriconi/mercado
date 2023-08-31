function addName() {
  const nameInput = document.getElementById('name');
  const name = nameInput.value;
  nameInput.value = '';

  if (name.trim() === '') {
    alert('Digite um nome válido!');
    return;
  }

  const listNames = document.getElementById('listNames');
  const newNameButton = document.createElement('button');
  newNameButton.textContent = name;
  newNameButton.addEventListener('click', function () {
    alert('Você clicou no botão com o nome: ' + name);
  });

  listNames.appendChild(newNameButton);
}
