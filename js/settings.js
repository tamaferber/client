const userId = "123"; // לשנות בהמשך לדינמי

function saveSettings() {
  const settings = { userId };

  document.querySelectorAll(".custom-select").forEach(select => {
    const name = select.getAttribute("data-name");
    const value = select.querySelector(".selected-option").textContent.trim();
    settings[name] = value;
  });

  fetch("http://localhost:3000/api/settings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(settings)
  })
    .then(response => {
      if (!response.ok) throw new Error("Failed to save settings");
      return response.json();
    })
    .then(data => {
      console.log("Settings saved:", data);
    })
    .catch(error => {
      console.error("Error saving settings:", error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("📦 settings page loaded and script running");

  // הגדרת הבחירה בכל select
  document.querySelectorAll(".custom-select").forEach(select => {
    const selected = select.querySelector(".selected-option");
    const options = select.querySelector(".select-options");

    selected.addEventListener("click", () => {
      select.classList.toggle("open");
    });

    options.querySelectorAll("li").forEach(option => {
      option.addEventListener("click", () => {
        selected.textContent = option.textContent;
        select.classList.remove("open");
        saveSettings(); // שמירה אוטומטית
      });
    });

    document.addEventListener("click", (e) => {
      if (!select.contains(e.target)) {
        select.classList.remove("open");
      }
    });
  });

    console.log("🛰️ Sending to server:", settings);   // למחוק זאת רק בדיקה


  // שליפה מהשרת
  fetch(`http://localhost:3000/api/settings/${userId}`)
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch settings");
      return res.json();
    })
    .then(data => {
      document.querySelectorAll(".custom-select").forEach(select => {
        const name = select.getAttribute("data-name");
        const selected = select.querySelector(".selected-option");
        const options = Array.from(select.querySelectorAll("li"));

        const match = options.find(opt => opt.textContent.trim() === data[name]);
        if (match) selected.textContent = match.textContent;
      });
    })
    .catch(err => {
      console.error("Error loading settings:", err);
    });
});
