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
  popupPrice.textContent = `Price: ₪${price}`;
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

closePopupBtn.addEventListener('click', closePopup);

window.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.classList.add("hidden");
  }
});
