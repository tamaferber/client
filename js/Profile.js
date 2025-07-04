const pic = document.getElementById('profilePic');
const input = document.getElementById('file-path');
pic.addEventListener('click', () => input.click());
input.addEventListener('change', () => {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => pic.src = e.target.result;
  reader.readAsDataURL(file);
});
