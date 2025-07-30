window.onload = function () {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const container = document.getElementById('cart-container');

  if (cart.length === 0) {
    container.innerHTML = '<p style="text-align:center;">Your cart is empty </p>';

    const totalBar = document.querySelector('.cart-total-bar');
    if (totalBar) totalBar.style.display = 'none';

    return;
  }

  const totalBar = document.querySelector('.cart-total-bar');
  if (totalBar) totalBar.style.display = 'flex';

  let total = 0;

  //   מיזוג כפילויות לפי שם מוצר
  const mergedCart = [];
  cart.forEach(item => {
    const existing = mergedCart.find(i => i.name === item.name);
    if (existing) {
      existing.qty += item.qty || 1;
    } else {
      mergedCart.push({ ...item, qty: item.qty || 1 });
    }
  });

  //  הצגה מעוצבת עם כמות ומודאל מחיקה
  mergedCart.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'product-cart';
    card.innerHTML = `
      <div class="cart-content">
        <img src="${item.imgSrc}" alt="${item.name}" />
        <div class="cart-text">
          <p>${item.name}</p>
          <p>${item.price}$</p>
          <p>Quantity: ${item.qty}</p>
        </div>
      </div>
    `;

    // מודאל מחיקה בלחיצה
    card.addEventListener("click", () => {
      const modal = document.getElementById("confirmModal");
      const confirmText = document.getElementById("confirmText");
      const yesBtn = document.getElementById("confirmYes");
      const noBtn = document.getElementById("confirmNo");

      confirmText.textContent = `Are you sure you want to delete "${item.name}" from the cart?`;
      modal.classList.remove("hidden");

      yesBtn.onclick = null;
      noBtn.onclick = null;

      yesBtn.onclick = () => {
        const updatedCart = cart.filter(i => i.name !== item.name);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        modal.classList.add("hidden");
        location.reload();
      };

      noBtn.onclick = () => {
        modal.classList.add("hidden");
      };
    });

    container.appendChild(card);
    total += item.price * item.qty;
  });

  document.getElementById("cart-total").textContent = `$${total}`;

  // כפתור איפוס רשימה
  const resetBtn = document.getElementById("resetCartBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      const modal = document.getElementById("confirmModal");
      const confirmText = document.getElementById("confirmText");
      const yesBtn = document.getElementById("confirmYes");
      const noBtn = document.getElementById("confirmNo");

      confirmText.textContent = "Are you sure you want to clear the entire cart?";
      modal.classList.remove("hidden");

      yesBtn.onclick = () => {
        localStorage.removeItem("cart");
        modal.classList.add("hidden");
        location.reload();
      };

      noBtn.onclick = () => {
        modal.classList.add("hidden");
      };
    });
  }
};

