const editModal = document.getElementById('order-modal');

function openModal() {
  editModal.style.display = 'block';
}

function closeModal() {
  window.location.reload();
  editModal.style.display = 'none';
}
