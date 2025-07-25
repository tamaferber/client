document.addEventListener("DOMContentLoaded", () => {
  let editMode = null;
  let editingElement = null;

  // ====== הודעות ======
  const messagePopup = document.querySelector(".message-popup");
  const openMessageBtn = document.querySelector(".open-message-button");
  const closePopupBtn = document.querySelector(".close-popup");
  const cancelBtn = document.querySelector(".cancel-button");
  const sendBtn = document.querySelector(".send-button");

  openMessageBtn.addEventListener("click", () => {
    messagePopup.classList.remove("hidden");
  });

  closePopupBtn.addEventListener("click", () => {
    messagePopup.classList.add("hidden");
  });

  cancelBtn.addEventListener("click", () => {
    messagePopup.classList.add("hidden");
  });

  sendBtn.addEventListener("click", () => {
    const message = messagePopup.querySelector("textarea").value.trim();
    const sentMessage = document.querySelector(".sent-message");

    if (message.length > 0) {
      sentMessage.textContent = "Message sent: " + message;
      sentMessage.classList.remove("hidden");

      setTimeout(() => {
        sentMessage.classList.add("hidden");
      }, 2000);
    }

    messagePopup.classList.add("hidden");
  });

  // ====== משתמשים ======
  const userList = document.querySelector(".user-list");
  const addUserBtn = document.querySelector(".add-user-button");

// 🚀 כאן נטען את המשתמשים הדינמיים מהשרת
fetch("https://smartfridge-server.onrender.com/api/users")
  .then((res) => res.json())
  .then((users) => {
    users.forEach((user) => {
      const li = document.createElement("li");
      li.className = "user-item";
      li.innerHTML = `
        <a href="#" class="user-link">
          <div class="user-icon-wrapper">
            <img src="../images/EllipseUser.png" class="circle-bg" />
            <img src="../images/Usericon.png" class="user-icon" />
          </div>
          <span>${user.name}</span>
        </a>
        <button class="edit-menu-button">
          <img src="../images/editAdmin.png" />
        </button>
        <div class="user-edit-popup hidden">
          <button class="edit-option edit-name">
            <img src="../images/editUser.png" /> Edit
          </button>
          <button class="edit-option delete-user" data-id="${user._id}">
            <img src="../images/deleteUser.png" /> Delete
          </button>
        </div>`;
      userList.appendChild(li);
    });
  })
  .catch((err) => {
    console.error("Error loading users:", err);
  });


  const editPopup = document.querySelector(".edit-name-popup");
  const confirmEditBtn = document.querySelector(".confirm-edit-name");
  const cancelEditBtn = document.querySelector(".cancel-edit-name");

  const nameInput = document.getElementById("editUserName");
  const emailInput = document.getElementById("editUserEmail");
  const addressInput = document.getElementById("editUserAddress");
  const statusInput = document.getElementById("editUserStatus");

  // לחיצה על כפתור הפלוס להוספת משתמש
  if (addUserBtn) {
    addUserBtn.addEventListener("click", () => {
      editMode = 'add';
      editingElement = null;

      // ניקוי שדות
      nameInput.value = "";
      emailInput.value = "";
      addressInput.value = "";
      statusInput.value = "unblocked";
      document.querySelector(".edit-name-popup h3").textContent = "Add new user:";

      editPopup.classList.remove("hidden");

      cancelEditBtn.onclick = () => {
        editPopup.classList.add("hidden");
      };

      confirmEditBtn.onclick = () => {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const address = addressInput.value.trim();
        const status = statusInput.value;

       if (editMode === 'add') {
          const userData = {
            name,
            email,
            address,
            status,
          };

          fetch("https://smartfridge-server.onrender.com/api/users", {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
          })
          .then((res) => res.json())
          .then((savedUser) => {
          const li = document.createElement("li");
          li.className = "user-item";
          li.innerHTML = `
          <a href="#" class="user-link">
            <div class="user-icon-wrapper">
              <img src="../images/EllipseUser.png" class="circle-bg" />
              <img src="../images/Usericon.png" class="user-icon" />
            </div>
            <span>${savedUser.name}</span>
          </a>
          <button class="edit-menu-button">
            <img src="../images/editAdmin.png" />
          </button>
          <div class="user-edit-popup hidden">
            <button class="edit-option edit-name">
              <img src="../images/editUser.png" /> Edit
            </button>
            <button class="edit-option delete-user" data-id="${savedUser._id}">
              <img src="../images/deleteUser.png" /> Delete
            </button>
          </div>`;
          userList.appendChild(li);
          editPopup.classList.add("hidden");
            })
            .catch((err) => {
              console.error("Failed to save user:", err);
            });
          }

        };
    });
  }

  // האזנה לכל לחיצות הדף (כולל edit/delete)
  document.addEventListener("click", (e) => {
    // הצגת תפריט עריכה
    const editBtn = e.target.closest(".edit-menu-button");
    if (editBtn) {
      const popup = editBtn.nextElementSibling;
      popup?.classList.toggle("hidden");
      return;
    }

    // סגירת תפריטים שלא נלחצו
    document.querySelectorAll(".user-edit-popup").forEach((popup) => {
      if (!popup.contains(e.target) && !e.target.closest(".edit-menu-button")) {
        popup.classList.add("hidden");
      }
    });

    // עריכה
    if (e.target.closest(".edit-name")) {
      const li = e.target.closest("li.user-item");
      const span = li?.querySelector("span");

      editMode = 'edit';
      editingElement = li;

      nameInput.value = span?.textContent || "";
      emailInput.value = "";
      addressInput.value = "";
      statusInput.value = "unblocked";
      document.querySelector(".edit-name-popup h3").textContent = "Edit user info:";

      document.querySelectorAll(".user-edit-popup").forEach(p => p.classList.add("hidden"));

      editPopup.classList.remove("hidden");

      cancelEditBtn.onclick = () => {
        editPopup.classList.add("hidden");
      };

      confirmEditBtn.onclick = () => {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const address = addressInput.value.trim();
        const status = statusInput.value;

        if (!name) return;

        const span = editingElement.querySelector("span");
        if (span) span.textContent = name;

        editPopup.classList.add("hidden");
      };
    }

    // מחיקה
    if (e.target.closest(".delete-user")) {
      const button = e.target.closest(".delete-user");
      const userId = button.dataset.id;
      const li = button.closest("li.user-item");

      if (!userId) {
        console.error("Missing user ID");
        return;
      }

      fetch(`https://smartfridge-server.onrender.com/api/users/${userId}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) throw new Error("Delete failed");
          li?.remove();
        })
        .catch((err) => {
          console.error("Failed to delete user:", err);
        });
    }
  });
});
