<script>
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let filteredCart = [...cart];

function getMayoreoPrice(qty, base){
  if(qty >= 10) return 450;
  if(qty >= 5) return 250;
  return base;
}

function updateCart(){
  const container = document.getElementById('cart-container');
  const totalSpan = document.getElementById('cart-total');

  if(!container || !totalSpan) return;

  container.innerHTML = '';
  let total = 0;

  filteredCart.forEach((item,index)=>{
    const unitPrice = getMayoreoPrice(item.qty, item.price);
    const subtotal = unitPrice * item.qty;
    total += subtotal;

    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.img}">
      <div class="info">
        ${item.qty >= 5 ? '<span style="color:gold;font-weight:bold">MAYOREO</span>' : ''}
        <p><b>${item.name}</b></p>
        <p>Precio: $${unitPrice}</p>
        <p>
          Cantidad:
          <button class="qty-btn" onclick="changeQty(${index},-1)">-</button>
          ${item.qty}
          <button class="qty-btn" onclick="changeQty(${index},1)">+</button>
        </p>
        <small style="color:#aaa">5 pz $250 · 10 pz $450</small>
      </div>
      <button class="remove-btn" onclick="removeItem(${index})">X</button>
    `;
    container.appendChild(div);
  });

  totalSpan.textContent = total;
  localStorage.setItem('cart', JSON.stringify(cart));
}

function changeQty(index,delta){
  const real = cart.findIndex(i=>i.name===filteredCart[index].name);
  cart[real].qty += delta;
  if(cart[real].qty < 1) cart[real].qty = 1;
  filteredCart[index].qty = cart[real].qty;
  updateCart();
}

function removeItem(index){
  const real = cart.findIndex(i=>i.name===filteredCart[index].name);
  cart.splice(real,1);
  filteredCart.splice(index,1);
  updateCart();
}

function searchCart(text){
  filteredCart = cart.filter(i=>i.name.toLowerCase().includes(text.toLowerCase()));
  updateCart();
}

function goBack(){
  window.location.href = 'index.html';
}

function sendOrder(){
  if(cart.length === 0){
    alert('El carrito está vacío');
    return;
  }

  let msg = 'Pedido Go Shop:\n';
  let total = 0;

  cart.forEach(i=>{
    const price = getMayoreoPrice(i.qty, i.price);
    total += price * i.qty;
    msg += `${i.name} - $${price} x ${i.qty}\n`;
  });

  msg += `Total: $${total}`;
  window.open(
    `https://api.whatsapp.com/send?phone=13129348674&text=${encodeURIComponent(msg)}`,
    '_blank'
  );
}

updateCart();
</script>
