document.addEventListener('DOMContentLoaded', () => {
  const form     = document.getElementById('loginForm');
  const loginBtn = document.getElementById('loginBtn');

  loginBtn.addEventListener('click', () => {
    
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    window.location.href = '/user/home.html';
  });
});
