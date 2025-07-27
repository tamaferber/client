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
      <img src="${item.imgSrc}" alt="${item.name}" />
      <p>${item.name}</p>
      <p>${item.price}$</p>
    `;
    container.appendChild(card);
  });
};