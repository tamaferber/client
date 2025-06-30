// document.addEventListener("DOMContentLoaded", () => {
//   // הודעות
//   const messagePopup = document.querySelector(".message-popup");
//   const openMessageBtn = document.querySelector(".open-message-button");
//   const closePopupBtn = document.querySelector(".close-popup");
//   const cancelBtn = document.querySelector(".cancel-button");
//   const sendBtn = document.querySelector(".send-button");

//   openMessageBtn.addEventListener("click", () => {
//     messagePopup.classList.remove("hidden");
//   });

//   closePopupBtn.addEventListener("click", () => {
//     messagePopup.classList.add("hidden");
//   });

//   cancelBtn.addEventListener("click", () => {
//     messagePopup.classList.add("hidden");
//   });

//   sendBtn.addEventListener("click", () => {
//     const message = messagePopup.querySelector("textarea").value.trim();
//     if (message.length > 0) {
//       alert("Message sent: " + message);
//     }
//     messagePopup.classList.add("hidden");
//   });

//   // אלמנטים כלליים
//   const addUserPopup = document.querySelector(".add-user-popup");
//   const closeAddUserBtn = document.querySelector(".close-add-user");
//   const cancelAddUserBtn = document.querySelector(".cancel-add-user");
//   const confirmAddUserBtn = document.querySelector(".confirm-add-user");
//   const newUserInput = document.getElementById("newUserName");
//   const userList = document.querySelector(".user-list");
//   const addUserBtn = document.querySelector(".add-user-button");

//   if (addUserBtn) {
//     addUserBtn.addEventListener("click", () => {
//       newUserInput.value = "";
//       addUserPopup.classList.remove("hidden");
//     });
//   }

//   // סגירת פופאפ הוספה
//   closeAddUserBtn.addEventListener("click", () => {
//     addUserPopup.classList.add("hidden");
//   });

//   cancelAddUserBtn.addEventListener("click", () => {
//     addUserPopup.classList.add("hidden");
//   });

//   // לחיצה כללית במסמך
//   document.addEventListener("click", (e) => {
//     // פתיחת תפריט עריכה
//     const editBtn = e.target.closest(".edit-menu-button");
//     if (editBtn) {
//       const popup = editBtn.nextElementSibling;
//       popup?.classList.toggle("hidden");
//       return;
//     }

//     // סגירת כל הפופאפים אם לוחצים בחוץ
//     document.querySelectorAll(".user-edit-popup").forEach((popup) => {
//       if (!popup.contains(e.target) && !e.target.closest(".edit-menu-button")) {
//         popup.classList.add("hidden");
//       }
//     });

//     // עריכת שם
//     if (e.target.closest(".edit-name")) {
//       const li = e.target.closest("li.user-item");
//       const span = li?.querySelector("span");
//       const newName = prompt("Enter new name:", span?.textContent);
//       if (newName && span) span.textContent = newName;
//     }

//     // מחיקת משתמש
//     if (e.target.closest(".delete-user")) {
//       const li = e.target.closest("li.user-item");
//       li?.remove();
//     }

//     // פתיחת פופאפ הוספה
//     if (e.target.closest(".add-user")) {
//       newUserInput.value = "";
//       addUserPopup.classList.remove("hidden");

//       // כדי למנוע ריבוי מאזינים – מסירים את הישן ומוסיפים מחדש
//       confirmAddUserBtn.replaceWith(confirmAddUserBtn.cloneNode(true));
//       const newConfirmBtn = document.querySelector(".confirm-add-user");

//       newConfirmBtn.addEventListener("click", () => {
//         const name = newUserInput.value.trim();
//         if (name) {
//           const li = document.createElement("li");
//           li.className = "user-item";
//           li.innerHTML = `
//             <a href="#" class="user-link">
//               <div class="user-icon-wrapper">
//                 <img src="../images/EllipseUser.png" class="circle-bg" />
//                 <img src="../images/Usericon.png" class="user-icon" />
//               </div>
//               <span>${name}</span>
//             </a>
//             <button class="edit-menu-button">
//               <img src="../images/editAdmin.png" />
//             </button>
//             <div class="user-edit-popup hidden">
//               <button class="edit-option edit-name">
//                 <img src="../images/editUser.png" /> Edit
//               </button>
//               <button class="edit-option delete-user">
//                 <img src="../images/deleteUser.png" /> Delete
//             </div>`;
//           userList.appendChild(li);
//         }
//         addUserPopup.classList.add("hidden");
//       });
//     }
//   });
// });



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

  // אלמנטים כלליים
  const addUserPopup = document.querySelector(".add-user-popup");
  const closeAddUserBtn = document.querySelector(".close-add-user");
  const cancelAddUserBtn = document.querySelector(".cancel-add-user");
  const confirmAddUserBtn = document.querySelector(".confirm-add-user");
  const newUserInput = document.getElementById("newUserName");
  const userList = document.querySelector(".user-list");
  const addUserBtn = document.querySelector(".add-user-button");

  // פתיחת פופאפ הוספת משתמש (לכפתור הפלוס בתחתית)
  if (addUserBtn) {
    addUserBtn.addEventListener("click", () => {
      newUserInput.value = "";
      addUserPopup.classList.remove("hidden");
    });
  }

  // פתיחת פופאפ מתוך תפריט עריכה
  document.addEventListener("click", (e) => {
    if (e.target.closest(".add-user")) {
      newUserInput.value = "";
      addUserPopup.classList.remove("hidden");
    }
  });

  // סגירת פופאפ הוספה
  closeAddUserBtn.addEventListener("click", () => {
    addUserPopup.classList.add("hidden");
  });

  cancelAddUserBtn.addEventListener("click", () => {
    addUserPopup.classList.add("hidden");
  });

  // אישור הוספת משתמש
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

  // לחיצה כללית במסמך
  document.addEventListener("click", (e) => {
    // פתיחת תפריט עריכה
    const editBtn = e.target.closest(".edit-menu-button");
    if (editBtn) {
      const popup = editBtn.nextElementSibling;
      popup?.classList.toggle("hidden");
      return;
    }

    // סגירת כל הפופאפים אם לוחצים בחוץ
    document.querySelectorAll(".user-edit-popup").forEach((popup) => {
      if (!popup.contains(e.target) && !e.target.closest(".edit-menu-button")) {
        popup.classList.add("hidden");
      }
    });

    // // עריכת שם
    // if (e.target.closest(".edit-name")) {
    //   const li = e.target.closest("li.user-item");
    //   const span = li?.querySelector("span");
    //   const newName = prompt("Enter new name:", span?.textContent);
    //   if (newName && span) span.textContent = newName;
    // }

    // בתוך document.addEventListener("click", (e) => { ... })
    if (e.target.closest(".edit-name")) {
        const li = e.target.closest("li.user-item");
        const span = li?.querySelector("span");

        const editPopup = document.querySelector(".edit-name-popup");
        const input = document.getElementById("editUserName");
        const confirmBtn = document.querySelector(".confirm-edit-name");
        const cancelBtn = document.querySelector(".cancel-edit-name");

        input.value = span?.textContent || "";
        editPopup.classList.remove("hidden");

        // ביטול
        cancelBtn.onclick = () => {
            editPopup.classList.add("hidden");
        };

        // אישור
        confirmBtn.onclick = () => {
            const newName = input.value.trim();
            if (newName && span) {
            span.textContent = newName;
            }
            editPopup.classList.add("hidden");
        };
    }

    // מחיקת משתמש
    if (e.target.closest(".delete-user")) {
      const li = e.target.closest("li.user-item");
      li?.remove();
    }
  });
});
