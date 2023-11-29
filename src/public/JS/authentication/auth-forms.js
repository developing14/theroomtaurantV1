const login = document.getElementById('login-form');
const leftContent = document.getElementById('content-left');
const register = document.getElementById('register-form');
const rightContent = document.getElementById('content-right');

function showLogin() {
  login.style.display = 'grid';
  register.style.display = 'none';
  leftContent.style.display = 'none';
  rightContent.style.display = 'block';
}

function showRegister() {
  register.style.display = 'grid';
  login.style.display = 'none';
  leftContent.style.display = 'block';
  rightContent.style.display = 'none';
}
