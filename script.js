/***** DATOS DE PRODUCTOS *****/
const data = [
  {name:"Valentino",price:60,cat:"Perfumes Hombre",img:"images/perfume1.jpg"},
  {name:"Invictus",price:60,cat:"Perfumes Hombre",img:"images/perfume2.jpg"},
  {name:"Dior",price:60,cat:"Perfumes Hombre",img:"images/perfume3.jpg"},
  {name:"Dior Elixir",price:60,cat:"Perfumes Hombre",img:"images/perfume4.jpg"},
  {name:"MYSLF",price:60,cat:"Perfumes Hombre",img:"images/perfume5.jpg"},
  {name:"Creed Aventus",price:60,cat:"Perfumes Hombre",img:"images/perfume6.jpg"},
  {name:"Layton Exclusif",price:60,cat:"Perfumes Hombre",img:"images/perfume7.jpg"},
  {name:"YSL Eau de Parfum",price:60,cat:"Perfumes Hombre",img:"images/perfume8.jpg"},
  {name:"Xerjoff Erba Pura",price:60,cat:"Perfumes Hombre",img:"images/perfume9.jpg"},
  {name:"JPG Scandal",price:60,cat:"Perfumes Hombre",img:"images/perfume10.jpg"},
  {name:"JPG Le Male",price:60,cat:"Perfumes Hombre",img:"images/perfume11.jpg"},
  {name:"JPG Le Beau",price:60,cat:"Perfumes Hombre",img:"images/perfume12.jpg"},
  {name:"JPG Le Male Elixir",price:60,cat:"Perfumes Hombre",img:"images/perfume13.jpg"},
  {name:"JPG Ultra Male",price:60,cat:"Perfumes Hombre",img:"images/perfume14.jpg"},
  {name:"Valentino Intense",price:60,cat:"Perfumes Hombre",img:"images/perfume15.jpg"},
  {name:"Santal 33",price:60,cat:"Perfumes Hombre",img:"images/perfume16.jpg"},
  {name:"Azzaro The Most Wanted",price:60,cat:"Perfumes Hombre",img:"images/perfume17.jpg"},
  {name:"Dior J’adore",price:60,cat:"Perfumes Mujer",img:"images/perfume18.jpg"},
  {name:"Delina",price:60,cat:"Perfumes Mujer",img:"images/perfume19.jpg"},
  {name:"Stronger With You Mujer",price:60,cat:"Perfumes Mujer",img:"images/perfume20.jpg"}
];

/***** STORAGE *****/
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let favs = JSON.parse(localStorage.getItem("favs")) || [];
let cat = null;

/***** MAYOREO *****/
function getPrice(qty, base){
  if(qty >= 10) return 450;
  if(qty >= 5) return 250;
  return base;
}

/***** INDEX – RENDER PRODUCTOS *****/
function render(list = data){
  const p = document.getElementById("products");
  if(!p) return;
  p.innerHTML = "";

  list.forEach(i=>{
    const isFav = favs.find(f=>f.name===i.name);
    p.innerHTML += `
      <div class="card">
        <div class="fav" onclick='toggleFav("${i.name}")'>${isFav?"❤️":"🤍"}</div>
        <img src="${i.img}">
        <b>${i.name}</b><br>
        <small>Mayoreo: 5 pz $250 · 10 pz $450</small><br>
        <button onclick='addCart("${i.name}")'>Agregar</button>
      </div>
    `;
  });
}

function addCart(name){
  const prod = data.find(p=>p.name===name);
  const idx = cart.findIndex(p=>p.name===name);

  if(idx !== -1) cart[idx].qty++;
  else cart.push({...prod, qty:1});

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCount();
}

function toggleFav(name){
  const prod = data.find(p=>p.name===name);
  favs = favs.find(f=>f.name===name)
    ? favs.filter(f=>f.name!==name)
    : [...favs, prod];

  localStorage.setItem("favs", JSON.stringify(favs));
  render(cat ? data.filter(d=>d.cat===cat) : data);
}

function showFavs(){
  const p = document.getElementById("products");
  if(!p) return;
  if(favs.length===0){
    p.innerHTML = "<p style='color:gold'>No tienes favoritos ❤️</p>";
  } else render(favs);
}

/***** FILTROS Y BUSCADOR *****/
function filterCat(c){
  cat = c;
  render(data.filter(d=>d.cat===c));
}

function search(t){
  render(data.filter(p=>p.name.toLowerCase().includes(t.toLowerCase())));
}

function updateCount(){
  const c = document.getElementById("cartCount");
  if(c) c.innerText = cart.reduce((s,p)=>s+p.qty,0);
}

/***** CARRITO *****/
function updateCart(){
  const container = document.getElementById("cart-container");
  const totalSpan = document.getElementById("cart-total");
  if(!container) return;

  container.innerHTML = "";
  let total = 0;

  cart.forEach((i,index)=>{
    const price = getPrice(i.qty, i.price);
    total += price * i.qty;

    container.innerHTML += `
      <div class="cart-item">
        <img src="${i.img}">
        <div class="info">
          ${i.qty>=5?'<b style="color:gold">MAYOREO</b><br>':""}
          <b>${i.name}</b><br>
          Precio: $${price}<br>
          Cantidad:
          <button class="qty-btn" onclick="changeQty(${index},-1)">-</button>
          ${i.qty}
          <button class="qty-btn" onclick="changeQty(${index},1)">+</button>
          <br><small>5 pz $250 · 10 pz $450</small>
        </div>
        <button class="remove-btn" onclick="removeItem(${index})">X</button>
      </div>
    `;
  });

  if(totalSpan) totalSpan.innerText = total;
  localStorage.setItem("cart", JSON.stringify(cart));
}

function changeQty(i,d){
  cart[i].qty += d;
  if(cart[i].qty < 1) cart[i].qty = 1;
  updateCart();
}

function removeItem(i){
  cart.splice(i,1);
  updateCart();
}

/***** WHATSAPP *****/
function sendOrder(){
  if(cart.length===0){ alert("Carrito vacío"); return; }
  let msg = "Pedido Go Shop:\n";
  let total = 0;

  cart.forEach(i=>{
    const p = getPrice(i.qty, i.price);
    total += p * i.qty;
    msg += `${i.name} - $${p} x ${i.qty}\n`;
  });

  msg += `Total: $${total}`;
  window.open(
    "https://api.whatsapp.com/send?phone=13129348674&text="+encodeURIComponent(msg),
    "_blank"
  );
}

/***** INICIAL *****/
document.addEventListener("DOMContentLoaded", ()=>{
  render();
  updateCount();
  updateCart();
});
