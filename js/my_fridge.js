const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");
const amountInput = document.getElementById("amountInput");
const expirationInput = document.getElementById("expirationInput");

// פתיחת חלונית לכל מוצר
document.querySelectorAll(".items img").forEach(img => {
  img.addEventListener("click", (e) => {
    const name = img.alt;
    const quantity = img.dataset.quantity || 0;
    const expiration = img.dataset.expiration || "";

    amountInput.value = quantity;
    expirationInput.value = expiration;

    popup.dataset.currentImg = name;
// עדכון מיקום הפופאפ
    const popupWidth = 240; 
    popup.style.left = `${Math.min(e.pageX, window.innerWidth - popupWidth - 10)}px`;
    popup.style.top = `${Math.min(e.pageY, window.innerHeight - 200)}px`;
    popup.style.display = "block";
  });
});

// סגירת הפופאפ בלחיצה על כפתור ה-X
closePopup.addEventListener("click", () => {
  popup.style.display = "none";
});

// שמירה מהפופאפ
document.getElementById("saveItemDataBtn").addEventListener("click", () => {
  const amount = amountInput.value;
  const expiration = expirationInput.value;
  const itemName = popup.dataset.currentImg;

  const img = [...document.querySelectorAll(".items img")].find(i => i.alt === itemName);

  if (img) {
    img.dataset.quantity = amount;
    img.dataset.expiration = expiration;
  }

  popup.style.display = "none";
});


document.getElementById("saveFridgeBtn").addEventListener("click", () => {
  const items = [];

  document.querySelectorAll(".items img").forEach(img => {
    const name = img.alt;
    const quantity = img.dataset.quantity || 0;
    const expirationDate = img.dataset.expiration || "";

    if (quantity && expirationDate) {
      items.push({
        name,
        quantity,
        expirationDate
      });
    }
    //testing delete
    console.log("Items to send:", items);
  });

  fetch("http://localhost:3000/api/fridge", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ items })
  })
    .then(res => {
      if (res.ok) {
        showMessage("Saved to MongoDB!", false);
      } else {
          showMessage("Failed to save", true);
      };
    })
    .catch(err => {
      console.error(err);
      alert("Error saving data.");
    });
});


function showMessage(message, isError = false) {
  const msgBox = document.getElementById("statusMessage");
  msgBox.textContent = message;
  msgBox.classList.remove("hidden");
  msgBox.classList.toggle("error", isError);

  setTimeout(() => {
    msgBox.classList.add("hidden");
  }, 3000);
}
