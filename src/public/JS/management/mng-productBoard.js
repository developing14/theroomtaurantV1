const addProductForm = document.querySelector('form#form-add');
const addProductModal = document.getElementById('add');

// Send add data to controllers from adding form
addProductForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(addProductForm);
  axios.post('/product-add', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
});

function openAddModal() {
  addProductModal.style.display = 'block';
}
function closeAddModal() {
  addProductModal.style.display = 'none';
}

function loadAddProduct() {
  window.location.reload();
  addProductModal.style.display = 'block';
}

const editProductModal = document.getElementById('edit');
const editProductForm = document.querySelector('form#form-edit');
const editProductButtons = document.querySelectorAll('button.edit-pd-btn');
const editSubmitButton = document.querySelector('#edit-submit-btn');

// Toggle edit product modal
function openEditModal() {
  editProductModal.style.display = 'block';
}
function closeEditModal() {
  editProductModal.style.display = 'none';
}

// Send edit data to controllers from editing form

let itemID;

editProductButtons.forEach((editProductButton) => {
  editProductButton.addEventListener('click', () => {
    itemID = editProductButton.getAttribute('data-id');
  });
});

editProductForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(editProductForm);
  formData.append('itemID', itemID);
  axios.post('/product-edit', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
});

const deleteProductButtons = document.querySelectorAll('button.del-pd-btn');

// Send delete request
deleteProductButtons.forEach((deleteProductButton) => {
  deleteProductButton.addEventListener('click', (e) => {
    e.preventDefault;
    itemID = deleteProductButton.getAttribute('data-id');
    axios.post(
      '/product-delete',
      { itemID: itemID },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  });
});

const restoreProductButtons = document.querySelectorAll('button.res-pd-btn');

// Send restore request
restoreProductButtons.forEach((restoreProductButton) => {
  restoreProductButton.addEventListener('click', (e) => {
    e.preventDefault;
    itemID = restoreProductButton.getAttribute('data-id');
    axios.post(
      '/product-restore',
      { itemID: itemID },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  });
});
