// ===================
// Carrito
// ===================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Actualiza contador del carrito en la barra superior
function updateCount() {
  const counter = document.getElementById("cartCount");
  if (counter) {
    counter.innerText = cart.reduce((a, b) => a + b.qty, 0);
  }
}

// Animación tipo toast al agregar
function showToast(message) {
  const toast = document.createElement("div");
  toast.innerText = message;
  toast.style.position = "fixed";
  toast.style.bottom = "120px";
  toast.style.right = "20px";
  toast.style.background = "#800000";
  toast.style.color = "#fff";
  toast.style.padding = "10px 15px";
  toast.style.borderRadius = "10px";
  toast.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
  toast.style.opacity = "0";
  toast.style.transition = "opacity 0.5s, transform 0.5s";
  toast.style.zIndex = "5000";
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(-10px)";
  }, 10);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(0)";
    setTimeout(() => document.body.removeChild(toast), 500);
  }, 2000);
}

// ===================
// Agregar al carrito
// ===================
function addCart(item) {
  const index = cart.findIndex(
    p => p.name === item.name && p.size === (item.size || "")
  );

  if (index !== -1) {
    cart[index].qty++;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCount();
  showToast(`${item.name} agregado al carrito`);
}

// ===================
// Render secciones
// ===================
function renderSection(id, data, price = 80, withSize = false) {
  const container = document.getElementById(id);
  if (!container) return;

  container.innerHTML = "";

  const sizesUS = ["US 6","US 7","US 8","US 9","US 10","US 11","US 12"];

  data.forEach((item, i) => {
    const card = document.createElement("div");
    card.className = "card";

    let sizeSelect = "";
    if (withSize) {
      sizeSelect = `
        <select id="${id}-size-${i}">
          <option value="">Selecciona talla</option>
          ${sizesUS.map(sz => `<option value="${sz}">${sz}</option>`).join('')}
        </select>
      `;
    }

    card.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <b>${item.name}</b>
      ${sizeSelect}
      <b>$${price}</b>
      <button onclick='handleAdd(${i},"${id}",${price},${withSize})'>Agregar</button>
    `;

    container.appendChild(card);
  });
}

// ===================
// Manejar agregado con tallas
// ===================
function handleAdd(index, section, price, withSize) {
  let item;
  if (section === "sneakers" && withSize) {
    const size = document.getElementById(`${section}-size-${index}`).value;
    if (!size) { alert("Selecciona una talla"); return; }
    item = { ...sneakersData[index], price, size };
  } else if (section === "perfumes") {
    item = { ...perfumesData[index], price };
  } else if (section === "relojes") {
    item = { ...relojesData[index], price };
  }

  addCart(item);
}

// ===================
// Buscador
// ===================
function toggleSearch() {
  const b = document.getElementById("searchBox");
  if (b) {
    b.style.width = (b.style.width === "220px") ? "0" : "220px";
  }
}

// ===================
// Otros
// ===================
function goCart() { location.href = "pagina-del-carro.html"; }
function openWA() { window.open("https://wa.me/13129348674", "_blank"); }
function search(t) { console.log("Buscar: ", t); }

// ===================
// Datos
// ===================
const perfumesData = [
  { name: "Valentino", img: "images/perfume1.jpg" },
  { name: "JPG Scandal", img: "images/perfume10.jpg" },
  { name: "Dior", img: "images/perfume3.jpg" },
  { name: "Creed Aventus", img: "images/perfume6.jpg" },
  { name: "Tom Ford Lost Cherry", img: "images/perfume33.jpg" },
  { name: "Versace Eros", img: "images/perfume40.jpg" },
  { name: "Gucci Bloom", img: "images/perfume39.jpg" },
  { name: "YSL Eau de Parfum", img: "images/perfume8.jpg" },
  { name: "Invictus", img: "images/perfume2.jpg" },
  { name: "Bleu De Chanel Parfum", img: "images/perfume29.jpg" }
];

const sneakersData = [
  { name: "UNDEFEATED x Air Jordan 4 Retro", img: "images/sneaker1.jpg" },
  { name: "KAWS x Air Jordan 4 Retro Cool Grey", img: "images/sneaker3.jpg" },
  { name: "Off-White x Air Jordan 4 Sail", img: "images/sneaker4.jpg" },
  { name: "Travis Scott x Air Jordan 4 Cactus Jack", img: "images/sneaker5.jpg" },
  { name: "Air Jordan 4 Black Cat", img: "images/sneaker8.jpg" },
  { name: "Nike x Louis Vuitton Air Force 1", img: "images/sneaker9.jpg" },
  { name: "Tiffany x Nike Air Force 1", img: "images/sneaker12.jpg" },
  { name: "adidas Yeezy Boost 750 Grey", img: "images/sneaker21.jpg" },
  { name: "Chanel x Pharrell Adidas NMD", img: "images/sneaker23.jpg" },
  { name: "LV Trainer Sneaker Monogram", img: "images/sneaker31.jpg" }
];

const relojesData = [
  { name: "Rolex Submariner", img: "images/watch1.jpg" },
  { name: "Rolex Daytona", img: "images/watch2.jpg" },
  { name: "Omega Speedmaster", img: "images/watch8.jpg" },
  { name: "Audemars Piguet Royal Oak", img: "images/watch16.jpg" },
  { name: "Patek Philippe Nautilus", img: "images/watch31.jpg" },
  { name: "Cartier Santos", img: "images/watch21.jpg" },
  { name: "Hublot Big Bang", img: "images/watch26.jpg" },
  { name: "IWC Portugieser", img: "images/watch36.jpg" },
  { name: "Panerai Luminor", img: "images/watch41.jpg" },
  { name: "Vacheron Constantin Overseas", img: "images/watch49.jpg" }
];

// ===================
// Inicializar
// ===================
renderSection("perfumes", perfumesData, 80);
renderSection("sneakers", sneakersData, 159, true); // true = tiene talla
renderSection("relojes", relojesData, 200);
updateCount();
