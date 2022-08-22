const signupForm = document.querySelector('.signup-form');

async function signup(event){
  event.preventDefault();
  
  const name = document.querySelector('#user-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  
  if (name && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};
  
signupForm.addEventListener('submit', signup);
  