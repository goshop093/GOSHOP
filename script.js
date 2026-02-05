// ===================
// Carrito (solo contador)
// ===================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCount(){
  document.getElementById("cartCount").innerText = cart.reduce((a,b)=>a+b.qty,0);
}

// Animación tipo toast al agregar
function showToast(message){
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

  setTimeout(()=>{
    toast.style.opacity = "1";
    toast.style.transform = "translateY(-10px)";
  },10);

  setTimeout(()=>{
    toast.style.opacity = "0";
    toast.style.transform = "translateY(0)";
    setTimeout(()=>document.body.removeChild(toast),500);
  },2000);
}

// ===================
// Agregar productos a las secciones
// ===================
function addCart(name,img,price=80){
  const index = cart.findIndex(p => p.name===name);
  if(index!==-1) cart[index].qty++;
  else cart.push({name,img,qty:1,price});
  localStorage.setItem("cart",JSON.stringify(cart));
  updateCount();
  showToast(`${name} agregado al carrito`);
}

function renderSection(id,data){
  const container = document.getElementById(id);
  container.innerHTML = "";
  data.forEach(item=>{
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <b>${item.name}</b>
      <button onclick='addCart("${item.name}","${item.img}",80)'>Agregar</button>
    `;
    container.appendChild(card);
  });
}

// ===================
// Menú lateral
// ===================
function toggleMenu(){
  const menu = document.getElementById("menu");
  menu.classList.toggle("open");
}
function toggleSub(){
  const s=document.getElementById("submenu");
  s.style.display = (s.style.display==="block") ? "none" : "block";
}

// ===================
// Buscador
// ===================
function toggleSearch(){
  const b = document.getElementById("searchBox");
  b.style.width = (b.style.width==="220px") ? "0" : "220px";
}

// ===================
// Otros
// ===================
function goCart(){ location.href="pagina-del-carro.html"; }
function openWA(){ window.open("https://wa.me/13129348674","_blank"); }
function search(t){ console.log("Buscar: ",t); }
function showFavs(){ alert("Función de favoritos aún no implementada"); }

// ===================
// Datos de ejemplo
// ===================
const perfumesData=[
  {name:"Valentino",img:"images/perfume1.jpg"},
  {name:"JPG Scandal",img:"images/perfume10.jpg"},
  {name:"Dior",img:"images/perfume3.jpg"},
  {name:"Creed Aventus",img:"images/perfume6.jpg"},
  {name:"Tom Ford Lost Cherry",img:"images/perfume33.jpg"},
  {name:"Versace Eros",img:"images/perfume40.jpg"},
  {name:"Gucci Bloom",img:"images/perfume39.jpg"},
  {name:"YSL Eau de Parfum",img:"images/perfume8.jpg"},
  {name:"Invictus",img:"images/perfume2.jpg"},
  {name:"Bleu De Chanel Parfum",img:"images/perfume29.jpg"}
];

const sneakersData=[
  {name:"Jordan 4 Black Cat",img:"images/jordan4blackcat.jpg"},
  {name:"Nike Air Force 1",img:"images/af1.jpg"},
  {name:"Adidas Yeezy",img:"images/yeezy.jpg"},
  {name:"Air Jordan 1",img:"images/jordan1.jpg"},
  {name:"Nike Dunk Low",img:"images/dunklow.jpg"},
  {name:"New Balance 550",img:"images/nb550.jpg"},
  {name:"Puma RS-X",img:"images/pumarsx.jpg"},
  {name:"Reebok Question",img:"images/reebokquestion.jpg"},
  {name:"Asics Gel Lyte",img:"images/asicsgel.jpg"},
  {name:"Converse Chuck 70",img:"images/converse70.jpg"}
];

const relojesData=[
  {name:"Rolex Submariner",img:"images/rolex1.jpg"},
  {name:"Omega Seamaster",img:"images/omega1.jpg"},
  {name:"Tag Heuer Carrera",img:"images/tag1.jpg"},
  {name:"Audemars Piguet Royal Oak",img:"images/ap1.jpg"},
  {name:"Cartier Santos",img:"images/cartier1.jpg"},
  {name:"Hublot Big Bang",img:"images/hublot1.jpg"},
  {name:"Tissot PRX",img:"images/tissot1.jpg"},
  {name:"Seiko Prospex",img:"images/seiko1.jpg"},
  {name:"Casio G-Shock",img:"images/casio1.jpg"},
  {name:"Fossil Machine",img:"images/fossil1.jpg"}
];

// ===================
// Inicializar secciones y contador
// ===================
renderSection("perfumes",perfumesData);
renderSection("sneakers",sneakersData);
renderSection("relojes",relojesData);
updateCount();
