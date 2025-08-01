// shopping.js

const popup = document.getElementById('popup');
const popupImage = document.getElementById('popupImage');
const popupName = document.getElementById('popupName');
const popupPrice = document.getElementById('popupPrice');
const popupQty = document.getElementById('popupQty');
const closePopupBtn = document.getElementById('closePopup');

let currentQty = 1;

function openPopup(name, price, imageSrc) {
  popupImage.src = imageSrc;
  popupImage.alt = name;
  popupName.textContent = name;
  popupPrice.textContent = `₪${price}`;
  popupPrice.setAttribute("data-price", price);
  currentQty = 1;
  popupQty.textContent = currentQty;
  popup.classList.remove('hidden');
}

function closePopup() {
  popup.classList.add('hidden');
}

function increaseQty() {
  currentQty++;
  popupQty.textContent = currentQty;
}

function decreaseQty() {
  if (currentQty > 1) {
    currentQty--;
    popupQty.textContent = currentQty;
  }
}

async function saveCartToServer(cartItems, email) {
  const formattedCart = cartItems.map(item => ({
    name: item.name,
    price: item.price,
    quantity: item.qty,
    imgSrc: item.imgSrc,
    email: email
  }));

  try {
    const res = await fetch("https://smartfridge-server.onrender.com/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formattedCart)
    });

    if (!res.ok) throw new Error("Failed to save cart");
    console.log("Cart saved for:", email);
  } catch (err) {
    console.error("Error saving cart:", err);
  }
}


async function addToCartFromPopup() {
  const name = document.getElementById('popupName').textContent;
  const price = parseInt(document.getElementById('popupPrice').getAttribute("data-price"));
  const imgSrc = document.getElementById('popupImage').getAttribute('src');
  const qty = parseInt(document.getElementById('popupQty').textContent);
  const email = localStorage.getItem('currentUserEmail');

  if (!email) {
    alert("You must be logged in to save your cart.");
    return;
  }

  //  שמירה לפי משתמש
  const cartKey = `cart_${email}`;
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ name, price, imgSrc, qty });
  }

  localStorage.setItem(cartKey, JSON.stringify(cart));
  await saveCartToServer(cart, email);
  showToast(`${qty} × ${name} added to list`);
}




closePopupBtn.addEventListener('click', closePopup);

window.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.classList.add("hidden");
  }
});


function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.remove("hidden");
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.classList.add("hidden"), 300); 
  }, 2500); 
}

async function saveCartToServer(cartItems, email) {
  const formattedCart = cartItems.map(item => ({
    name: item.name,
    price: item.price,
    quantity: item.qty,
    imgSrc: item.imgSrc,
    email: email
  }));

  try {
    const res = await fetch("https://smartfridge-server.onrender.com/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formattedCart)
    });

    if (!res.ok) throw new Error("Failed to save cart");
    console.log("Cart saved for:", email);
  } catch (err) {
    console.error("Error saving cart:", err);
  }
}



