const loginForm = document.querySelector('.login-form');

async function login(event) {
  event.preventDefault();

  const name = document.querySelector('#user-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (name && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(response)
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};
  
loginForm.addEventListener('submit', login);
  