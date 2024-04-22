// Seleção dos elementos
const menu = document.getElementById("menu");
const close_modal_btn = document.getElementById("close-modal-btn");
const checkout_btn = document.getElementById("checkout-btn");
const address_input = document.getElementById("address");
const address_warn = document.getElementById("address-warn");

const cart_btn = document.getElementById("cart-btn");
const cart_modal = document.getElementById("cart-modal");
const cart_items_container = document.getElementById("cart-items");
const cart_total = document.getElementById("cart-total");
const cart_counter = document.getElementById("cart-count");

let cart = [];

// Eventos
// Abrir e Fechar o modal ⬇️
cart_btn.addEventListener("click", () => {
  updateCartModal();
  cart_modal.style.display = "flex";
});

cart_modal.addEventListener("click", (e) => {
  if (e.target === cart_modal || e.target === close_modal_btn) {
    cart_modal.style.display = "none";
  }
});

// Capturando os itens do menu ⬇️
menu.addEventListener("click", (e) => {
  let parentButton = e.target.closest(".add-to-cart-btn");

  if (parentButton) {
    const name = parentButton.getAttribute("data-name");
    const price = parseFloat(parentButton.getAttribute("data-price"));

    addToCart(name, price);
  }
});

cart_items_container.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-from-cart-btn")) {
    const name = e.target.getAttribute("data-name");

    removeItemCart(name);
  }
});

address_input.addEventListener("input", (e) => {
  let inputValue = e.target.value;

  if (inputValue !== "") {
    address_warn.classList.add("hidden");
    address_input.classList.remove("border-red-500");
  }
});

checkout_btn.addEventListener("click", () => {
  let total = 0;
  const is_open = checkRestaurantOpen();
  if (!is_open) {
    Toastify({
      text: "Desculpe, o restaurante está fechado no momento.",
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "#ef4444",
      },
    }).showToast();
    return;
  }

  if (cart.length === 0) return;
  if (address_input.value === "") {
    address_warn.classList.remove("hidden");
    address_input.classList.add("border-red-500");
    return;
  } else {
    Toastify({
      text: "Pedido realizado com sucesso.",
      duration: 3000,
      close: false,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "green",
      },
    }).showToast();
  }

  const cart_items = cart
    .map((item) => {
      return ` ${item.name} Quantidade: (${
        item.quantity
      }) Preço: R$${item.price.toFixed(2)} Total: R$${(total +=
        item.price * item.quantity)}`;
    })
    .join();

  const message = encodeURIComponent(cart_items);
  const phone = "963065438";

  window.open(
    `https://wa.me/${phone}?text=${message} Endereço: ${address_input.value}`,
    "_blank"
  );

  cart = [];
  updateCartModal();
});

// Funções
function addToCart(name, price) {
  const existing_item = cart.find((item) => item.name === name);

  if (existing_item) {
    existing_item.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  updateCartModal();
}

function updateCartModal() {
  cart_items_container.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const cart_item_element = document.createElement("div");
    cart_item_element.classList.add(
      "flex",
      "justify-between",
      "mb-4",
      "flex-col"
    );

    cart_item_element.innerHTML = `
    <div class="flex items-center justify-between mt-5">
        <div>
            <p class="font-medium">${item.name}</p>
            <p>Qtd: ${item.quantity}</p>
            <p class="font-medium mt-2">Valor: R$${item.price.toFixed(2)}</p>
        </div>

        <button class="remove-from-cart-btn" data-name="${item.name}">
            Remover
        </button>
    </div>
  `;

    total += item.price * item.quantity;
    cart_items_container.appendChild(cart_item_element);
  });

  cart_total.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  cart_counter.innerHTML = cart.length;
}

function removeItemCart(name) {
  const index = cart.findIndex((item) => item.name === name);

  if (index !== -1) {
    const item = cart[index];

    if (item.quantity > 1) {
      item.quantity -= 1;
      updateCartModal();
      return;
    }

    cart.splice(index, 1);
    updateCartModal();
  }
}

function checkRestaurantOpen() {
  const data = new Date();
  const hora = data.getHours();
  return hora >= 15 && hora < 23;
}

const span_item = document.getElementById("date-span");
const is_open = checkRestaurantOpen();

if (is_open) {
  span_item.classList.remove("bg-red-500");
  span_item.classList.add("bg-green-600");
} else {
  span_item.classList.add("bg-red-500");
  span_item.classList.remove("bg-green-600");
}
