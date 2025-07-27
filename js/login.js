document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const loginBtn = document.getElementById('loginBtn');
  const errorMessage = document.getElementById('errorMessage');

  loginBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    errorMessage.classList.add('hidden');
    errorMessage.textContent = "";

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const rawEmail = document.getElementById('email').value;
    const password = document.getElementById('password').value.trim();
    const email = rawEmail.trim().toLowerCase();

    console.log("📥 ENTERED EMAIL:", rawEmail);
    console.log("✅ Normalized EMAIL:", email);

    if (email === 'admin@gmail.com') {
      console.log("🚪 Trying ADMIN login...");
      try {
        const adminRes = await fetch("https://smartfridge-server.onrender.com/api/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });

        if (adminRes.ok) {
          console.log("✅ ADMIN credentials valid. Redirecting...");
          window.location.href = '/admin/users.html';
          return;
        } else {
          console.log("❌ ADMIN credentials invalid");
          errorMessage.textContent = "Incorrect username or password";
          errorMessage.classList.remove('hidden');
          return;
        }
      } catch (err) {
        console.error("Admin login error:", err);
        errorMessage.textContent = "Server error. Please try again later.";
        errorMessage.classList.remove('hidden');
        return;
      }
    }

    console.log("➡️ Continuing as regular user");

    if (!password) {
      errorMessage.textContent = "Please enter your password.";
      errorMessage.classList.remove('hidden');
      return;
    }

    const name = email.split('@')[0];
    const userData = {
      name,
      email,
      address: "not provided",
      status: "unblocked"
    };

    try {
      const checkRes = await fetch(`https://smartfridge-server.onrender.com/api/users?email=${encodeURIComponent(email)}`);
      if (!checkRes.ok) throw new Error("Failed to check user existence");

      const existingUsers = await checkRes.json();

      if (existingUsers.length === 0) {
        // const res = await fetch("https://smartfridge-server.onrender.com/api/users", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(userData)
        // });

        // if (!res.ok) throw new Error("Failed to add user");
        errorMessage.textContent = "No account found. Redirecting to sign-up...";
        errorMessage.classList.remove("hidden");

        setTimeout(() => {
          window.location.href = "/user/signup.html";
        }, 4000); 
        return;
      }

      console.log("✅ Redirecting user to home...");
      window.location.href = '/user/home.html';

    } catch (err) {
      console.error("Error during login:", err);
      errorMessage.textContent = "Something went wrong. Please try again later.";
      errorMessage.classList.remove('hidden');
    }
  });
});

