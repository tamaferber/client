document.addEventListener("DOMContentLoaded", () => {
  // הודעות
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
;

  // אלמנטים כלליים
  const addUserPopup = document.querySelector(".add-user-popup");
  const closeAddUserBtn = document.querySelector(".close-add-user");
  const cancelAddUserBtn = document.querySelector(".cancel-add-user");
  const confirmAddUserBtn = document.querySelector(".confirm-add-user");
  const newUserInput = document.getElementById("newUserName");
  const userList = document.querySelector(".user-list");
  const addUserBtn = document.querySelector(".add-user-button");

  if (addUserBtn) {
    addUserBtn.addEventListener("click", () => {
      newUserInput.value = "";
      addUserPopup.classList.remove("hidden");
    });
  }

  document.addEventListener("click", (e) => {
    if (e.target.closest(".add-user")) {
      newUserInput.value = "";
      addUserPopup.classList.remove("hidden");
    }
  });

  closeAddUserBtn.addEventListener("click", () => {
    addUserPopup.classList.add("hidden");
  });

  cancelAddUserBtn.addEventListener("click", () => {
    addUserPopup.classList.add("hidden");
  });

  confirmAddUserBtn.addEventListener("click", () => {
    const name = newUserInput.value.trim();
    if (name) {
      const li = document.createElement("li");
      li.className = "user-item";
      li.innerHTML = `
        <a href="#" class="user-link">
          <div class="user-icon-wrapper">
            <img src="../images/EllipseUser.png" class="circle-bg" />
            <img src="../images/Usericon.png" class="user-icon" />
          </div>
          <span>${name}</span>
        </a>
        <button class="edit-menu-button">
          <img src="../images/editAdmin.png" />
        </button>
        <div class="user-edit-popup hidden">
          <button class="edit-option edit-name">
            <img src="../images/editUser.png" /> Edit
          </button>
          <button class="edit-option delete-user">
            <img src="../images/deleteUser.png" /> Delete
          </button>
        </div>`;
      userList.appendChild(li);
    }
    addUserPopup.classList.add("hidden");
  });

  document.addEventListener("click", (e) => {
    const editBtn = e.target.closest(".edit-menu-button");
    if (editBtn) {
      const popup = editBtn.nextElementSibling;
      popup?.classList.toggle("hidden");
      return;
    }

    document.querySelectorAll(".user-edit-popup").forEach((popup) => {
      if (!popup.contains(e.target) && !e.target.closest(".edit-menu-button")) {
        popup.classList.add("hidden");
      }
    });

    if (e.target.closest(".edit-name")) {
        const li = e.target.closest("li.user-item");
        const span = li?.querySelector("span");

        const editPopup = document.querySelector(".edit-name-popup");
        const input = document.getElementById("editUserName");
        const confirmBtn = document.querySelector(".confirm-edit-name");
        const cancelBtn = document.querySelector(".cancel-edit-name");

        input.value = span?.textContent || "";
        editPopup.classList.remove("hidden");

        cancelBtn.onclick = () => {
            editPopup.classList.add("hidden");
        };

        confirmBtn.onclick = () => {
            const newName = input.value.trim();
            if (newName && span) {
            span.textContent = newName;
            }
            editPopup.classList.add("hidden");
        };
    }

    if (e.target.closest(".delete-user")) {
      const li = e.target.closest("li.user-item");
      li?.remove();
    }
  });
});
