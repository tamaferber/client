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
    });
  });

  // סגירה כשמקליקים מחוץ
  document.addEventListener("click", (e) => {
    if (!select.contains(e.target)) {
      select.classList.remove("open");
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("settingsForm");

  form.addEventListener("change", () => {
    const settings = {};
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
        console.error("Error:", error);
      });
  });
});
