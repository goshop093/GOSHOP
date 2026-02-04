// ===== Manejo de carrito =====
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// ===== Actualizar contador del carrito =====
function updateCartCount() {
  document.querySelectorAll("#cart-count").forEach(el => el.textContent = cartItems.length);
}

// ===== Agregar productos =====
document.querySelectorAll(".btn-add").forEach(btn => {
  btn.addEventListener("click", () => {
    const name = btn.dataset.name;
    const price = parseFloat(btn.dataset.price);
    const img = btn.dataset.img;
    cartItems.push({ name, price, img });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    updateCartCount();
    alert(`${name} agregado al carrito`);
  });
});

// ===== Mostrar carrito en pagina-del-carro.html =====
function displayCartPage() {
  const container = document.getElementById("cart-items-container");
  const totalSpan = document.getElementById("cart-total-page");
  if (!container) return;

  container.innerHTML = "";
  let total = 0;

  cartItems.forEach((item, index) => {
    const imgSrc = item.img || "images/default.jpg";
    const div = document.createElement("div");
    div.classList.add("cart-item-page");
    div.innerHTML = `
      <img src="${imgSrc}" alt="${item.name}">
      <div class="info">
        <p>${item.name}</p>
        <p>$${item.price.toFixed(2)}</p>
      </div>
      <button class="remove-btn-page" data-index="${index}">X</button>
    `;
    container.appendChild(div);
    total += item.price;
  });

  totalSpan.textContent = total.toFixed(2);

  document.querySelectorAll(".remove-btn-page").forEach(btn => {
    btn.addEventListener("click", () => {
      cartItems.splice(btn.dataset.index, 1);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      displayCartPage();
      updateCartCount();
    });
  });
}

// ===== Vaciar carrito =====
document.getElementById("clear-cart")?.addEventListener("click", () => {
  cartItems = [];
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  displayCartPage();
  updateCartCount();
});

// ===== Inicializar =====
updateCartCount();
displayCartPage();
