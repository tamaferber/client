const popup = document.getElementById("popup");
const popupText = document.getElementById("popupText");
const closePopup = document.getElementById("closePopup");

document.querySelectorAll(".items img").forEach(img => {
  img.addEventListener("click", (e) => {
    const itemName = img.alt;

    // הדמיה של נתונים
    const mockData = {
      // Vegetables
      "Tomato": { amount: 4, expiration: "01/07/2025" },
      "Cucumber": { amount: 6, expiration: "05/07/2025" },

      // Fruits
      "Banana": { amount: 3, expiration: "20/06/2025" },
      "Orange": { amount: 8, expiration: "25/06/2025" },

      // Dairy
      "Milk": { amount: 1, expiration: "22/06/2025" },
      "Cheese": { amount: 2, expiration: "01/08/2025" },

      // Meat & Chicken
      "Steak": { amount: 2, expiration: "15/07/2025" },
      "Chicken": { amount: 1, expiration: "13/07/2025" },

      // Drinks
      "Water": { amount: 5, expiration: "--/--/----" },
      "Beer": { amount: 6, expiration: "30/12/2025" },

      // Other
      "Bread": { amount: 1, expiration: "19/06/2025" },
      "Medications": { amount: 3, expiration: "01/01/2026" }
    };

    const data = mockData[itemName] || { amount: 0, expiration: "--/--/----" };

    popupText.innerHTML = `Amount: ${data.amount}<br>Expiration date: ${data.expiration}`;

    // חישוב מיקום המבוסס על העכבר
    const x = e.pageX;
    const y = e.pageY;

    // התאמה כדי לא לצאת מהמסך
    const popupWidth = 160; // בערך רוחב של הפופאפ
    const popupHeight = 160; // בערך גובה של הפופאפ
    const maxX = window.innerWidth - popupWidth;
    const maxY = window.innerHeight - popupHeight;

    const finalX = Math.min(x, maxX);
    const finalY = Math.min(y, maxY);

    popup.style.left = `${finalX}px`;
    popup.style.top = `${finalY}px`;
    popup.style.display = "block";
  });
});

closePopup.addEventListener("click", () => {
  popup.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.style.display = "none";
  }
});



// github