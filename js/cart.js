window.onload = function () {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const container = document.getElementById('cart-container');

  if (cart.length === 0) {
    container.innerHTML = '<p style="text-align:center;">Your cart is empty 🛒</p>';
    return;
  }
 let total=0;

  cart.forEach(item => {
    const card = document.createElement('div');
    card.className = 'product-cart';
    card.innerHTML = `
  <div class="cart-content">
    <img src="${item.imgSrc}" alt="${item.name}" />
    <div class="cart-text">
      <p>${item.name}</p>
      <p>${item.price}$</p>
    </div>
  </div>
`;
    container.appendChild(card);
    total += item.price * (item.qty || 1);
  });

   const totalBar = document.createElement("div");
  totalBar.className = "cart-total-bar";
  totalBar.innerHTML = `<p>Total: <span id="cart-total">₪${total}</span></p>`;
  document.body.appendChild(totalBar);
};


