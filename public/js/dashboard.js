const addToDash = document.querySelector('#to-dashboard');

async function addToDashboard(event){
    event.preventDefault();
  
        let URL = window.location.href
        let id = parseInt(URL.split('workouts/')[1])

      const response = await fetch(`/api/workouts/${id}`, {
        method: 'POST',
      });
  
      if (response.ok){
        document.location.reload();
      }
}

addToDash.addEventListener('click', addToDashboard)