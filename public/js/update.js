const editBtn = document.querySelector('#edit-btn')
const deleteBtn = document.querySelector('#delete-btn')

async function updateWorkout(event) {
    event.preventDefault();
  
    let URL = window.location.href
    let id = parseInt(URL.split('edit/')[1])

    const name = document.querySelector('#edit-name').value.trim();
    const description = document.querySelector('#edit-description').value.trim();
    const duration = document.querySelector('#edit-duration').value.trim();
    const optional = document.querySelector('#edit-optional').value.trim();
    const tag_id = document.querySelector('#edit-tags').value;

  
    if (name && description && duration) {
      const response = await fetch(`/api/workouts/${id}`, {
        method: 'PUT',
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
  
async function deleteWorkout(event){
    event.preventDefault();

    let URL = window.location.href
    let id = parseInt(URL.split('edit/')[1])

    const response = await fetch(`/api/workouts/${id}`, {
    method: 'DELETE',
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

editBtn.addEventListener('click', updateWorkout)
deleteBtn.addEventListener('click', deleteWorkout)