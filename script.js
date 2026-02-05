// ===== Productos Destacados (10 por categoría) =====
const perfumes = [
  {name:"Valentino Uomo", price:80, img:"images/perfume1.jpg"},
  {name:"Creed Aventus", price:120, img:"images/perfume2.jpg"},
  {name:"Dior Homme", price:110, img:"images/perfume3.jpg"},
  {name:"Tom Ford Oud Wood", price:130, img:"images/perfume4.jpg"},
  {name:"Versace Eros", price:90, img:"images/perfume5.jpg"},
  {name:"YSL Libre", price:100, img:"images/perfume6.jpg"},
  {name:"Bleu de Chanel", price:125, img:"images/perfume7.jpg"},
  {name:"Good Girl", price:95, img:"images/perfume8.jpg"},
  {name:"JPG Scandal", price:85, img:"images/perfume9.jpg"},
  {name:"Gucci Bloom", price:90, img:"images/perfume10.jpg"}
];

const sneakers = [
  {name:"Jordan 4 Retro", price:350, img:"images/sneaker1.jpg"},
  {name:"Nike Air Force 1", price:300, img:"images/sneaker2.jpg"},
  {name:"Adidas Yeezy 350", price:400, img:"images/sneaker3.jpg"},
  {name:"Puma RS-X", price:200, img:"images/sneaker4.jpg"},
  {name:"New Balance 550", price:220, img:"images/sneaker5.jpg"},
  {name:"Air Max 90", price:280, img:"images/sneaker6.jpg"},
  {name:"Air Max 97", price:330, img:"images/sneaker7.jpg"},
  {name:"Dior x Jordan", price:1200, img:"images/sneaker8.jpg"},
  {name:"Travis Scott x Air Jordan", price:1000, img:"images/sneaker9.jpg"},
  {name:"Off-White x Nike", price:950, img:"images/sneaker10.jpg"}
];

const relojes = [
  {name:"Rolex Submariner", price:12000, img:"images/watch1.jpg"},
  {name:"Omega Seamaster", price:9000, img:"images/watch2.jpg"},
  {name:"Tag Heuer Carrera", price:7000, img:"images/watch3.jpg"},
  {name:"Audemars Piguet Royal Oak", price:25000, img:"images/watch4.jpg"},
  {name:"Patek Philippe Nautilus", price:50000, img:"images/watch5.jpg"},
  {name:"Breitling Navitimer", price:6000, img:"images/watch6.jpg"},
  {name:"Cartier Santos", price:8000, img:"images/watch7.jpg"},
  {name:"Hublot Big Bang", price:15000, img:"images/watch8.jpg"},
  {name:"Seiko Prospex", price:1200, img:"images/watch9.jpg"},
  {name:"Casio G-Shock", price:400, img:"images/watch10.jpg"}
];

// ===== Carrito =====
let cart = JSON.parse(localStorage.getItem("cart"))||[];
function updateCartCount(){
  document.getElementById("cartCount").innerText=cart.reduce((s,i)=>s+1,0);
}
function addCart(item){
  cart.push({...item, qty:1, priceFinal:item.price});
  localStorage.setItem("cart",JSON.stringify(cart));
  updateCartCount();
  alert(`${item.name} agregado al carrito`);
}

// ===== Render carruseles =====
function renderCarousel(items, containerId){
  const container=document.getElementById(containerId);
  container.innerHTML="";
  items.forEach(i=>{
    const div=document.createElement("div");
    div.className="product-card";
    div.innerHTML=`
      <img src="${i.img}" alt="${i.name}">
      <h3>${i.name}</h3>
      <p>$${i.price}</p>
      <button onclick='addCart(${JSON.stringify(i)})'>Agregar</button>
    `;
    container.appendChild(div);
  });
}

// ===== BUSCADOR =====
function toggleSearch(){
  const b=document.getElementById("searchBox");
  b.style.width=b.style.width==="220px"?"0":"220px";
}
function searchProducts(t){
  const allItems=[...perfumes,...sneakers,...relojes];
  const filtered=allItems.filter(i=>i.name.toLowerCase().includes(t.toLowerCase()));
  renderCarousel(filtered,"perfumesCarousel"); // Para simplicidad, mostramos resultados en perfumes
}

// ===== NAVEGACIÓN =====
function goCategory(url){location.href=url;}
function goCart(){location.href="pagina-del-carro.html";}
function toggleMenu(){
  const m=document.getElementById("menu");
  m.style.left=m.style.left==="0px"?"-260px":"0px";
}
function filterCategory(cat){alert("Filtrar "+cat);}
function showFavs(){alert("Favoritos");}
function openWA(){window.open("https://wa.me/13129348674","_blank");}

// ===== Inicializar =====
renderCarousel(perfumes,"perfumesCarousel");
renderCarousel(sneakers,"sneakersCarousel");
renderCarousel(relojes,"relojesCarousel");
updateCartCount();
