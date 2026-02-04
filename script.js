// ====== Manejo de Carrito con LocalStorage ======
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// ====== Función para actualizar la cuenta del carrito en el header ======
function updateCartCount() {
  const cartCountElements = document.querySelectorAll("#cart-count");
  cartCountElements.forEach(el => el.textContent = cartItems.length);
}

// ====== Agregar productos desde index.html ======
document.querySelectorAll(".btn-add").forEach(btn => {
  btn.addEventListener("click", () => {
    const name = btn.dataset.name;
    const price = parseFloat(btn.dataset.price);
    cartItems.push({ name, price });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    updateCartCount();
    alert(`${name} agregado al carrito`);
  });
});

// ====== Mostrar productos en pagina-del-carro.html ======
function displayCartPage() {
  const container = document.getElementById("cart-items-container");
  const totalSpan = document.getElementById("cart-total-page");
  if (!container) return; // Evita errores si estamos en index.html

  container.innerHTML = "";
  let total = 0;

  cartItems.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("cart-item-page");
    div.innerHTML = `
      <p>${item.name} - $${item.price}</p>
      <button class="remove-btn-page" data-index="${index}">X</button>
    `;
    container.appendChild(div);
    total += item.price;
  });

  totalSpan.textContent = total.toFixed(2);

  // Botones para eliminar
  document.querySelectorAll(".remove-btn-page").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.index;
      cartItems.splice(index, 1);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      displayCartPage();
      updateCartCount();
    });
  });
}

// Vaciar carrito
const clearCartBtn = document.getElementById("clear-cart");
if (clearCartBtn) {
  clearCartBtn.addEventListener("click", () => {
    cartItems = [];
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    displayCartPage();
    updateCartCount();
  });
}

// ====== Inicializar ======
updateCartCount();
displayCartPage();
