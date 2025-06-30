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
    if (message.length > 0) {
      alert("Message sent: " + message);
    }
    messagePopup.classList.add("hidden");
  });

  // הוספת משתמש
  const addUserPopup = document.querySelector('.add-user-popup');
  const addUserBtn = document.querySelector('.add-user-button');
  const closeAddUserBtn = document.querySelector('.close-add-user');
  const cancelAddUserBtn = document.querySelector('.cancel-add-user');
  const confirmAddUserBtn = document.querySelector('.confirm-add-user');
  const newUserInput = document.getElementById('newUserName');
  const userList = document.querySelector('.user-list');

  addUserBtn.addEventListener('click', () => {
    newUserInput.value = '';
    addUserPopup.classList.remove('hidden');
  });

  closeAddUserBtn.addEventListener('click', () => {
    addUserPopup.classList.add('hidden');
  });

  cancelAddUserBtn.addEventListener('click', () => {
    addUserPopup.classList.add('hidden');
  });

  confirmAddUserBtn.addEventListener('click', () => {
    const name = newUserInput.value.trim();
    if (name) {
      const li = document.createElement('li');
      li.className = 'user-item';
      li.innerHTML = `
        <a href="#" class="user-link">
            <div class="user-icon-wrapper">
                <img src="../images/EllipseUser.png" alt="User background" class="circle-bg">
                <img src="../images/Usericon.png" alt="User Icon" class="user-icon">
            </div>
          <span>${name}</span>
        </a>
        <button class="delete-user-button">
            <img src="../images/Trash.png" alt="delete-user-button">
        </button>
      `;
      userList.appendChild(li);
      addUserPopup.classList.add('hidden');
    }
  });
});

document.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".delete-user-button");
  if (deleteBtn) {
    const li = deleteBtn.closest("li.user-item");
    if (li) {
      li.remove();
    }
  }
});
