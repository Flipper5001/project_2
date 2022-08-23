const createForm = document.querySelector('.create-form');

async function createPost(event) {
  event.preventDefault();

  const name = document.querySelector('#workout-name').value.trim();
  const description = document.querySelector('#description').value.trim();
  const duration = document.querySelector('#duration').value.trim();
  const optional = document.querySelector('#optional').value.trim();
  const tag_id = document.querySelector('#tag-ids').value;

  if (name && description && duration) {
    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify({ name, description, duration, optional, tag_id }),
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json'},
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

createForm.addEventListener('submit', createPost)
