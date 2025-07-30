// window.onload = async function () {
//   const email = localStorage.getItem("currentUserEmail");
//   const container = document.getElementById('cart-container');
//   const totalBar = document.querySelector('.cart-total-bar');

//   if (!email) {
//     console.warn("No user logged in – can't load cart.");
//     container.innerHTML = '<p style="text-align:center;">You must be logged in to view your cart.</p>';
//     if (totalBar) totalBar.style.display = 'none';
//     return;
//   }

//   const localKey = `cart_${email}`;
//   let cart = JSON.parse(localStorage.getItem(localKey)) || [];

//   // אם אין כלום בלוקאל – נביא מהשרת
//   if (!cart.length) {
//     try {
//       const res = await fetch(`https://smartfridge-server.onrender.com/api/cart?email=${encodeURIComponent(email)}`);
//       if (!res.ok) throw new Error("Failed to fetch cart");
//       // cart = await res.json();
//       // localStorage.setItem(localKey, JSON.stringify(cart));
//       const serverCart = await res.json();
//       const normalizedCart = serverCart.map(item => ({
//         name: item.name,
//         price: item.price,
//         qty: item.quantity,  
//         imgSrc: item.imgSrc
//       }));
//       localStorage.setItem(localKey, JSON.stringify(normalizedCart));
//       cart = normalizedCart;



//     } catch (err) {
//       console.error(" Error loading cart:", err);
//       container.innerHTML = '<p style="text-align:center;">Error loading cart. Please try again later.</p>';
//       if (totalBar) totalBar.style.display = 'none';
//       return;
//     }
//   }

//   if (!cart.length) {
//     container.innerHTML = '<p style="text-align:center;">Your cart is empty</p>';
//     if (totalBar) totalBar.style.display = 'none';
//     return;
//   }

//   if (totalBar) totalBar.style.display = 'flex';

//   const mergedCart = [];
//   cart.forEach(item => {
//     const existing = mergedCart.find(i => i.name === item.name);
//     if (existing) {
//       existing.qty += item.qty || item.quantity || 1;
//     } else {
//       mergedCart.push({
//         ...item,
//         qty: item.qty || item.quantity || 1
//       });
//     }
//   });

//   let total = 0;
//   mergedCart.forEach(item => {
//     const card = document.createElement('div');
//     card.className = 'product-cart';
//     card.innerHTML = `
//       <div class="cart-content">
//         <img src="${item.imgSrc}" alt="${item.name}" />
//         <div class="cart-text">
//           <p>${item.name}</p>
//           <p>${item.price}$</p>
//           <p>Quantity: ${item.qty}</p>
//         </div>
//       </div>
//     `;

//     card.addEventListener("click", () => {
//       const modal = document.getElementById("confirmModal");
//       const confirmText = document.getElementById("confirmText");
//       const yesBtn = document.getElementById("confirmYes");
//       const noBtn = document.getElementById("confirmNo");

//       confirmText.textContent = `Are you sure you want to delete "${item.name}" from the cart?`;
//       modal.classList.remove("hidden");

//       yesBtn.onclick = async () => {
//         try {
//           await fetch("https://smartfridge-server.onrender.com/api/cart", {
//             method: "DELETE",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ email, name: item.name })
//           });

//           console.log(` Deleted "${item.name}" from server cart`);

//           const updatedCart = mergedCart.filter(i => i.name !== item.name);
//           localStorage.setItem(localKey, JSON.stringify(updatedCart));
//           modal.classList.add("hidden");
//           location.reload();
//         } catch (err) {
//           console.error(" Failed to delete item from server:", err);
//           alert("Error deleting item. Please try again.");
//         }
//       };

//       noBtn.onclick = () => {
//         modal.classList.add("hidden");
//       };
//     });

//     container.appendChild(card);
//     total += item.price * item.qty;
//   });

//   document.getElementById("cart-total").textContent = `$${total}`;

//   const resetBtn = document.getElementById("resetCartBtn");
//   if (resetBtn) {
//     resetBtn.addEventListener("click", () => {
//       const modal = document.getElementById("confirmModal");
//       const confirmText = document.getElementById("confirmText");
//       const yesBtn = document.getElementById("confirmYes");
//       const noBtn = document.getElementById("confirmNo");

//       confirmText.textContent = "Are you sure you want to clear the entire cart?";
//       modal.classList.remove("hidden");

//       yesBtn.onclick = () => {
//         localStorage.removeItem(localKey);
//         saveCartToServer([], email);
//         modal.classList.add("hidden");
//         location.reload();
//       };

//       noBtn.onclick = () => {
//         modal.classList.add("hidden");
//       };
//     });
//   }
// };

// async function saveCartToServer(cart, email) {
//   const formattedCart = cart.map(item => ({
//     name: item.name,
//     price: item.price,
//     quantity: item.qty,
//     imgSrc: item.imgSrc,
//     email: email
//   }));

//   try {
//     const res = await fetch("https://smartfridge-server.onrender.com/api/cart", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formattedCart)
//     });

//     if (!res.ok) throw new Error("Failed to save cart");
//     console.log(" Cart saved for:", email);
//   } catch (err) {
//     console.error(" Error saving cart:", err);
//   }
// }



// async function clearCart() {
//   const email = localStorage.getItem("currentUserEmail");
//   if (!email) {
//     alert("You must be logged in.");
//     return;
//   }

//   const localKey = `cart_${email}`;
//   const cart = JSON.parse(localStorage.getItem(localKey)) || [];

//   // מחיקת כל פריט מהשרת
//   for (const item of cart) {
//     try {
//       await fetch("https://smartfridge-server.onrender.com/api/cart", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, name: item.name })
//       });
//     } catch (err) {
//       console.error("❌ Failed to delete item:", item.name, err);
//     }
//   }

//   // ניקוי ה־localStorage
//   localStorage.removeItem(localKey);

//   // ריענון הדף כדי לעדכן תצוגה
//   location.reload();
// }


// document.getElementById("resetCartBtn").addEventListener("click", clearCart);



// document.addEventListener("DOMContentLoaded", () => {
//   document.getElementById("resetCartBtn").addEventListener("click", clearCart);
// });



window.onload = async function () {
  const email = localStorage.getItem("currentUserEmail");
  const container = document.getElementById('cart-container');
  const totalBar = document.querySelector('.cart-total-bar');

  if (!email) {
    console.warn("No user logged in – can't load cart.");
    container.innerHTML = '<p style="text-align:center;">You must be logged in to view your cart.</p>';
    if (totalBar) totalBar.style.display = 'none';
    return;
  }

  const localKey = `cart_${email}`;
  let cart = JSON.parse(localStorage.getItem(localKey)) || [];

  // אם אין כלום בלוקאל – נביא מהשרת
  if (!cart.length) {
    try {
      const res = await fetch(`https://smartfridge-server.onrender.com/api/cart?email=${encodeURIComponent(email)}`);
      if (!res.ok) throw new Error("Failed to fetch cart");

      const serverCart = await res.json();
      const normalizedCart = serverCart.map(item => ({
        name: item.name,
        price: item.price,
        qty: item.quantity,
        imgSrc: item.imgSrc
      }));

      localStorage.setItem(localKey, JSON.stringify(normalizedCart));
      cart = normalizedCart;

    } catch (err) {
      console.error(" Error loading cart:", err);
      container.innerHTML = '<p style="text-align:center;">Error loading cart. Please try again later.</p>';
      if (totalBar) totalBar.style.display = 'none';
      return;
    }
  }

  if (!cart.length) {
    container.innerHTML = '<p style="text-align:center;">Your cart is empty</p>';
    if (totalBar) totalBar.style.display = 'none';
    return;
  }

  if (totalBar) totalBar.style.display = 'flex';

  const mergedCart = [];
  cart.forEach(item => {
    const existing = mergedCart.find(i => i.name === item.name);
    if (existing) {
      existing.qty += item.qty || item.quantity || 1;
    } else {
      mergedCart.push({
        ...item,
        qty: item.qty || item.quantity || 1
      });
    }
  });

  let total = 0;
  mergedCart.forEach(item => {
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

    card.addEventListener("click", () => {
      const modal = document.getElementById("confirmModal");
      const confirmText = document.getElementById("confirmText");
      const yesBtn = document.getElementById("confirmYes");
      const noBtn = document.getElementById("confirmNo");

      confirmText.textContent = `Are you sure you want to delete "${item.name}" from the cart?`;
      modal.classList.remove("hidden");

      yesBtn.onclick = async () => {
        try {
          await fetch("https://smartfridge-server.onrender.com/api/cart", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, name: item.name })
          });

          console.log(`Deleted "${item.name}" from server cart`);
          const updatedCart = mergedCart.filter(i => i.name !== item.name);
          localStorage.setItem(localKey, JSON.stringify(updatedCart));
          modal.classList.add("hidden");
          location.reload();
        } catch (err) {
          console.error("Failed to delete item from server:", err);
          alert("Error deleting item. Please try again.");
        }
      };

      noBtn.onclick = () => {
        modal.classList.add("hidden");
      };
    });

    container.appendChild(card);
    total += item.price * item.qty;
  });

  document.getElementById("cart-total").textContent = `$${total}`;
};

// שומר את העגלה לשרת
async function saveCartToServer(cart, email) {
  const formattedCart = cart.map(item => ({
    name: item.name,
    price: item.price,
    quantity: item.qty,
    imgSrc: item.imgSrc,
    email: email
  }));

  try {
    const res = await fetch("https://smartfridge-server.onrender.com/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formattedCart)
    });

    if (!res.ok) throw new Error("Failed to save cart");
    console.log("Cart saved for:", email);
  } catch (err) {
    console.error("Error saving cart:", err);
  }
}

// מוחק את כל העגלה (גם מהשרת וגם מה-localStorage)
async function clearCart() {
  const email = localStorage.getItem("currentUserEmail");
  if (!email) {
    alert("You must be logged in.");
    return;
  }

  const localKey = `cart_${email}`;
  const cart = JSON.parse(localStorage.getItem(localKey)) || [];

  const modal = document.getElementById("confirmModal");
  const confirmText = document.getElementById("confirmText");
  const yesBtn = document.getElementById("confirmYes");
  const noBtn = document.getElementById("confirmNo");

  confirmText.textContent = "Are you sure you want to clear the entire cart?";
  modal.classList.remove("hidden");

  yesBtn.onclick = async () => {
    for (const item of cart) {
      try {
        await fetch("https://smartfridge-server.onrender.com/api/cart", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, name: item.name })
        });
      } catch (err) {
        console.error("❌ Failed to delete item:", item.name, err);
      }
    }

    localStorage.removeItem(localKey);
    modal.classList.add("hidden");
    location.reload();
  };

  noBtn.onclick = () => {
    modal.classList.add("hidden");
  };
}

// מאזין לאירוע ניקוי עגלה
document.addEventListener("DOMContentLoaded", () => {
  const resetBtn = document.getElementById("resetCartBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", clearCart);
  }
});


