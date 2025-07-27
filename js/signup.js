document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signupForm');
  const btn = document.getElementById('signupbtn');
  const pwd = document.getElementById('password');
  const pwd2 = document.getElementById('password2');
  const emailInput = document.getElementById('email');
  const usernameInput = document.getElementById('username');
  const errorMessage = document.getElementById('errorMessage');


  function setPasswordValidity() {
    if (pwd2.value !== '' && pwd.value !== pwd2.value) {
      pwd2.setCustomValidity('Passwords do not match');
    } else {
      pwd2.setCustomValidity('');
    }
  }

  form.addEventListener('input', setPasswordValidity);

  btn.addEventListener('click', async (e) => {
    e.preventDefault(); 

    setPasswordValidity();
    if (!form.reportValidity()) return;

    const email = emailInput.value.trim();
    const username = usernameInput.value.trim();
    const password = pwd.value.trim();

    errorMessage.classList.add('hidden');
    errorMessage.textContent = "";

    try {
      //  בדיקה אם המשתמש כבר קיים לפי המייל
      const checkRes = await fetch(`https://smartfridge-server.onrender.com/api/users?email=${encodeURIComponent(email)}`);
      const existingUsers = await checkRes.json();

      if (existingUsers.length > 0) {
        errorMessage.textContent = "Email already exists. Please use a different one.";
        console.log("Email already exists!");
        errorMessage.classList.remove('hidden');

          // מחכה 2 שניות לפני שמעביר לדף ההתחברות
        setTimeout(() => {
        window.location.href = "../index.html";
        }, 2000);

        return;
      }


      //  אם לא קיים – מוסיפים לDB 
      const newUser = {
        name: username,
        email,
        address: "not provided",
        status: "unblocked"
      };

      const res = await fetch("https://smartfridge-server.onrender.com/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      });

      if (!res.ok) {
        throw new Error("Failed to add user");
      }

      //   ניתוב לדף הבית
      window.location.href = "home.html";

    } catch (err) {
      console.error("Signup error:", err);
      alert("Something went wrong. Please try again later.");
    }
  });
});

