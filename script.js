:root{
  --black:#000;
  --red:#ff0000;
  --white:#fff;
  --gray:#f5f5f5;
}

/* ===== BODY ===== */
body{
  margin:0;
  font-family:Arial,sans-serif;
  background:var(--gray);
  color:var(--black);
}

/* ===== HEADER ===== */
header{
  position:fixed;
  top:0;
  width:100%;
  background:var(--black);
  color:var(--white);
  display:flex;
  justify-content:center;
  align-items:center;
  padding:14px;
  z-index:1000;
}
header b{
  font-size:1.8rem;
}
.menu-btn, .cart-btn{
  position:absolute;
  font-size:24px;
  cursor:pointer;
}
.menu-btn{left:15px;}
.cart-btn{right:15px;}
.cart-btn span{
  background:var(--red);
  color:var(--white);
  padding:2px 6px;
  border-radius:50%;
  font-size:12px;
}

/* ===== BANNER ===== */
.banner img{
  width:100%;
  display:block;
  margin-top:60px;
  border-radius:8px;
}

/* ===== CATEGORÍAS ===== */
.categories{
  display:flex;
  justify-content:center;
  gap:10px;
  margin:15px 0;
}
.categories button{
  padding:10px 20px;
  border:none;
  border-radius:20px;
  background:var(--black);
  color:var(--red);
  font-weight:bold;
  cursor:pointer;
  transition:0.3s;
}
.categories button:hover{
  background:var(--red);
  color:var(--white);
}

/* ===== CARRUSEL ===== */
.carousel{
  display:flex;
  overflow-x:auto;
  gap:15px;
  padding:10px;
  scroll-behavior:smooth;
}
.carousel::-webkit-scrollbar{display:none;}

.product-card{
  min-width:160px;
  background:var(--white);
  border-radius:12px;
  padding:10px;
  box-shadow:0 5px 15px rgba(0,0,0,0.2);
  flex-shrink:0;
  text-align:center;
}
.product-card img{
  width:100%;
  border-radius:10px;
  margin-bottom:8px;
}
.product-card h3{
  margin:5px 0;
  font-size:14px;
}
.product-card p{
  margin:5px 0;
  font-size:13px;
  font-weight:bold;
}
.product-card button{
  width:100%;
  padding:8px;
  border:none;
  border-radius:10px;
  background:var(--black);
  color:var(--red);
  font-weight:bold;
  cursor:pointer;
}
.product-card button:hover{
  background:var(--red);
  color:var(--white);
}

/* ===== BUSCADOR FLOTANTE ===== */
.search-fab{
  position:fixed;
  bottom:90px;
  right:20px;
  width:55px;
  height:55px;
  background:var(--red);
  color:var(--white);
  border-radius:50%;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:22px;
  cursor:pointer;
  z-index:3000;
}
.search-box{
  position:fixed;
  bottom:160px;
  right:20px;
  width:0;
  overflow:hidden;
  transition:0.3s;
}
.search-box input{
  width:220px;
  padding:12px;
  border-radius:25px;
  border:none;
  outline:none;
}

/* ===== MOBILE BAR ===== */
.mobile-bar{
  position:fixed;
  bottom:0;
  width:100%;
  background:var(--black);
  display:flex;
  justify-content:space-around;
  padding:10px 0;
  z-index:1000;
}
.mobile-bar button{
  background:none;
  border:none;
  color:var(--red);
  font-size:22px;
  cursor:pointer;
}

/* ===== TITULOS DE SECCIÓN ===== */
main h2{
  margin:15px 10px;
  font-size:1.2rem;
  text-align:left;
  color:var(--black);
}

/* ===== RESPONSIVE ===== */
@media screen and (max-width:600px){
  .carousel{
    padding:5px;
    gap:10px;
  }
  .product-card{
    min-width:140px;
    padding:8px;
  }
  main h2{
    font-size:1rem;
    margin:10px 5px;
  }
}
