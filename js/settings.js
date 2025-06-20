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