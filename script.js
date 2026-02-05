<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Go Shop</title>
<style>
:root{
  --primary:#800000;
  --dark:#111;
  --bg:#000;
  --text:#fff;
}
*{box-sizing:border-box;}
body{background:var(--bg);color:var(--text);font-family:Arial,sans-serif;margin:0;padding:0;overflow-x:hidden;}
button{cursor:pointer;transition:.3s;}
button:hover{opacity:0.8;}
header{
  background:var(--dark);
  color:var(--primary);
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:14px;
  position:fixed;
  top:0;
  width:100%;
  z-index:1000;
  font-size:1.8rem;
}
header b{flex:1;text-align:center;}
#cartCount{background:var(--primary);padding:2px 8px;border-radius:50%;margin-left:5px;font-size:1rem;}
.products{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:15px;padding:10px;margin-top:80px;}
.card{
  background:var(--dark);
  color:#fff;
  border-radius:16px;
  padding:10px;
  text-align:center;
}
.card img{width:100%;border-radius:10px;}
.card select, .card button{width:100%;margin-top:5px;padding:8px;border-radius:8px;border:none;font-weight:bold;}
.card select{background:#222;color:#fff;}
.card button{background:var(--primary);color:#fff;cursor:pointer;}
.mobile-bar{
  position:fixed;
  bottom:0;
  width:100%;
  background:var(--dark);
  display:flex;
  justify-content:space-around;
  padding:10px 0;
}
.mobile-bar button{background:none;border:none;color:var(--primary);font-size:20px;}
</style>
</head>
<body>

<header>
  <b>Go Shop</b>
  🛒 <span id="cartCount">0</span>
</header>

<main id="perfumes" class="products"></main>
<main id="sneakers" class="products"></main>
<main id="relojes" class="products"></main>

<div class="mobile-bar">
  <button onclick="location.href='index.html'">🏠</button>
  <button onclick="goCart()">🛒</button>
  <button onclick="openWA()">💬</button>
</div>

<script>
// ===================
// Carrito
// ===================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCount() {
  const counter = document.getElementById("cartCount");
  if (counter) counter.innerText = cart.reduce((a, b) => a + b.qty, 0);
}

// Animación tipo toast
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

  setTimeout(() => { toast.style.opacity = "1"; toast.style.transform = "translateY(-10px)"; }, 10);
  setTimeout(() => {
    toast.style.opacity = "0"; toast.style.transform = "translateY(0)";
    setTimeout(() => document.body.removeChild(toast), 500);
  }, 2000);
}

// ===================
// Agregar al carrito
// ===================
function addCart(item) {
  const index = cart.findIndex(p => p.name === item.name && (!item.size || p.size===item.size));
  if (index !== -1) cart[index].qty++;
  else cart.push({...item, qty:1});
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCount();
  showToast(`${item.name} agregado al carrito`);
}

// ===================
// Render de secciones
// ===================
function renderSection(id, data) {
  const container = document.getElementById(id);
  if (!container) return;
  container.innerHTML = "";
  data.forEach((item, i) => {
    const card = document.createElement("div");
    card.className = "card";

    let html = `<img src="${item.img}" alt="${item.name}"><b>${item.name}</b>`;
    
    // Sneakers con select de talla
    if(item.sizes){
      html += `<select id="${id}-size-${i}"><option value="">Selecciona talla</option>${item.sizes.map(sz=>`<option value="${sz}">${sz}</option>`).join('')}</select>`;
      html += `<b>$${item.price}</b>`;
      html += `<button onclick="handleAdd('${id}', ${i})">Agregar</button>`;
    } else {
      html += `<b>$${item.price}</b>`;
      html += `<button onclick='addCart(${JSON.stringify(item)})'>Agregar</button>`;
    }

    card.innerHTML = html;
    container.appendChild(card);
  });
}

// Manejo de sneakers con talla
function handleAdd(section, index){
  const select = document.getElementById(`${section}-size-${index}`);
  const size = select.value;
  if(!size){ alert("Selecciona una talla"); return; }
  const item = {...sneakersData[index], size: size};
  addCart(item);
}

// ===================
// Datos de ejemplo
// ===================
const perfumesData = [
  { name: "Valentino", img: "images/perfume1.jpg", price:80 },
  { name: "JPG Scandal", img: "images/perfume10.jpg", price:80 },
  { name: "Dior", img: "images/perfume3.jpg", price:80 },
  { name: "Creed Aventus", img: "images/perfume6.jpg", price:80 },
  { name: "Tom Ford Lost Cherry", img: "images/perfume33.jpg", price:80 },
  { name: "Versace Eros", img: "images/perfume40.jpg", price:80 },
  { name: "Gucci Bloom", img: "images/perfume39.jpg", price:80 },
  { name: "YSL Eau de Parfum", img: "images/perfume8.jpg", price:80 },
  { name: "Invictus", img: "images/perfume2.jpg", price:80 },
  { name: "Bleu De Chanel Parfum", img: "images/perfume29.jpg", price:80 }
];

const sneakersData = [
  { name: "UNDEFEATED x Air Jordan 4 Retro", img: "images/sneaker1.jpg", price:159, sizes:["US 6","US 7","US 8","US 9","US 10","US 11","US 12"] },
  { name: "KAWS x Air Jordan 4 Retro Cool Grey", img: "images/sneaker3.jpg", price:159, sizes:["US 6","US 7","US 8","US 9","US 10","US 11","US 12"] },
  { name: "Off-White x Air Jordan 4 Sail", img: "images/sneaker4.jpg", price:159, sizes:["US 6","US 7","US 8","US 9","US 10","US 11","US 12"] },
  { name: "Travis Scott x Air Jordan 4 Cactus Jack", img: "images/sneaker5.jpg", price:159, sizes:["US 6","US 7","US 8","US 9","US 10","US 11","US 12"] },
  { name: "Air Jordan 4 Black Cat", img: "images/sneaker8.jpg", price:159, sizes:["US 6","US 7","US 8","US 9","US 10","US 11","US 12"] },
  { name: "Nike x Louis Vuitton Air Force 1", img: "images/sneaker9.jpg", price:159, sizes:["US 6","US 7","US 8","US 9","US 10","US 11","US 12"] },
  { name: "Tiffany x Nike Air Force 1", img: "images/sneaker12.jpg", price:159, sizes:["US 6","US 7","US 8","US 9","US 10","US 11","US 12"] },
  { name: "adidas Yeezy Boost 750 Grey", img: "images/sneaker21.jpg", price:159, sizes:["US 6","US 7","US 8","US 9","US 10","US 11","US 12"] },
  { name: "Chanel x Pharrell Adidas NMD", img: "images/sneaker23.jpg", price:159, sizes:["US 6","US 7","US 8","US 9","US 10","US 11","US 12"] },
  { name: "LV Trainer Sneaker Monogram", img: "images/sneaker31.jpg", price:159, sizes:["US 6","US 7","US 8","US 9","US 10","US 11","US 12"] }
];

const relojesData = [
  {name:"Rolex Submariner", cat:"Rolex", img:"images/watch1.jpg", price:12000},
  {name:"Rolex Daytona", cat:"Rolex", img:"images/watch2.jpg", price:15000},
  {name:"Omega Speedmaster", cat:"Omega", img:"images/watch8.jpg", price:8000},
  {name:"Audemars Piguet Royal Oak", cat:"Audemars Piguet", img:"images/watch16.jpg", price:40000},
  {name:"Patek Philippe Nautilus", cat:"Patek Philippe", img:"images/watch31.jpg", price:60000},
  {name:"Cartier Santos", cat:"Cartier", img:"images/watch21.jpg", price:9000},
  {name:"Hublot Big Bang", cat:"Hublot", img:"images/watch26.jpg", price:25000},
  {name:"IWC Portugieser", cat:"IWC", img:"images/watch36.jpg", price:12000},
  {name:"Panerai Luminor", cat:"Panerai", img:"images/watch41.jpg", price:10000},
  {name:"Vacheron Constantin Overseas", cat:"Vacheron Constantin", img:"images/watch49.jpg", price:50000}
];

// ===================
// Funciones extras
// ===================
function goCart(){ location.href="pagina-del-carro.html"; }
function openWA(){ window.open("https://wa.me/13129348674","_blank"); }

// ===================
// Inicializar todo
// ===================
renderSection("perfumes", perfumesData);
renderSection("sneakers", sneakersData);
renderSection("relojes", relojesData);
updateCount();
</script>

</body>
</html>
