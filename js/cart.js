window.onload = function () {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const container = document.getElementById('cart-container');

  if (cart.length === 0) {
    container.innerHTML = '<p style="text-align:center;">Your cart is empty 🛒</p>';
    return;
  }

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
  });
};