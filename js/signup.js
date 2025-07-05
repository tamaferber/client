// signup.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signupForm');
  const btn  = document.getElementById('signupbtn');
  const pwd  = document.getElementById('password');
  const pwd2 = document.getElementById('password2');

  
  function setPasswordValidity() {
    if (pwd2.value !== '' && pwd.value !== pwd2.value) {
      pwd2.setCustomValidity('Пароли не совпадают');
    } else {
      pwd2.setCustomValidity('');
    }
  }

  
  form.addEventListener('input', () => {
    setPasswordValidity();
  });

 
  btn.addEventListener('click', () => {
    setPasswordValidity();
    
  
    if (!form.reportValidity()) {
      return;
    }

    window.location.href = form.action;
  });
});
