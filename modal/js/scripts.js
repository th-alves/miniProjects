const modal = document.querySelector("dialog");
const openModal = document.querySelector("button");
const closeModal = document.querySelector("dialog button");

openModal.addEventListener("click", () => {
  modal.showModal();
});

closeModal.addEventListener("click", () => {
  modal.close();
});
