// document.addEventListener('DOMContentLoaded', () => {
//   const form     = document.getElementById('loginForm');
//   const loginBtn = document.getElementById('loginBtn');

//   loginBtn.addEventListener('click', () => {
    
//     if (!form.checkValidity()) {
//       form.reportValidity();
//       return;
//     }

//     window.location.href = '/user/home.html';
//   });
// });

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const loginBtn = document.getElementById('loginBtn');
  const errorMessage = document.getElementById('errorMessage');


  loginBtn.addEventListener('click', async (e) => {
    e.preventDefault(); // כדי למנוע שליחה אוטומטית

    errorMessage.classList.add('hidden');
    errorMessage.textContent = "";

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = email.split('@')[0]; // נחלץ שם מהמייל

    const userData = {
      name,
      email,
      address: "not provided",
      status: "unblocked"
    };

    if (!password) {
      errorMessage.textContent = "Please enter your password.";
      errorMessage.classList.remove('hidden');
      return;
    }

        // בדיקה אם המשתמש כבר קיים לפי המייל
    const checkRes = await fetch(`https://smartfridge-server.onrender.com/api/users?email=${encodeURIComponent(email)}`);

    if (!checkRes.ok) {
      errorMessage.textContent = "Error checking existing user.";
      errorMessage.classList.remove('hidden');
      return;
    }

    const existingUsers = await checkRes.json();

    if (existingUsers.length > 0) {
      // אם המשתמש כבר קיים – מדלגים על הוספה
      window.location.href = '/user/home.html';
      return;
    }



    try {
      const res = await fetch("https://smartfridge-server.onrender.com/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      if (!res.ok) {
        errorMessage.textContent = "Login failed. Please try again.";
        errorMessage.classList.remove('hidden');
        return;
      }
      } catch (err) {
        console.error(" Error:", err);
        errorMessage.textContent = "Server error. Please try again later.";
        errorMessage.classList.remove('hidden');
        return;
      }

    window.location.href = '/user/home.html';
  });
});
