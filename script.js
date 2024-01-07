function createBlogPost() {
    const title = document.getElementById('blog-title').value;
    const content = document.getElementById('blog-content').value;

    axios.post('http://localhost:3000/api/bloginfos', { title, content })
        .then(response => {
            console.log(response);
            fetchAllBlogPosts();
        })
        .catch(error => console.error(error));
}

function updateBlogPost(id) {
    const title = document.getElementById('edit-blog-title').value;
    const content = document.getElementById('edit-blog-content').value;

    axios.put('http://localhost:3000/api/bloginfos/${id}', { title, content })
        .then(response => {
            console.log(response);
            fetchAllBlogPosts();
        })
        .catch(error => console.error(error));
}

function showEditBlogForm(post) {
    document.getElementById('edit-blog-title').value = post.title;
    document.getElementById('edit-blog-content').value = post.content;
    document.getElementById('edit-blog-form').style.display = 'block';
    document.getElementById('confirm-edit-blog').onclick = function() { confirmEditBlog(post.id); };
}

function confirmEditBlog(id) {
    updateBlogPost(id);
    document.getElementById('edit-blog-form').style.display = 'none';
}

function showEditWorkoutForm(workout) {
    document.getElementById('edit-workout-type').value = workout.type;
    document.getElementById('edit-workout-duration').value = workout.duration;
    document.getElementById('edit-workout-notes').value = workout.notes;
    document.getElementById('edit-workout-form').style.display = 'block';
    document.getElementById('confirm-edit-workout').onclick = function() { confirmEditWorkout(workout.id); };
}

function confirmEditWorkout(id) {
    updateWorkout(id);
    document.getElementById('edit-workout-form').style.display = 'none';
}

function fetchAllBlogPosts() {
    axios.get('http://localhost:3000/api/bloginfos')
        .then(response => {
            displayBlogPosts(response.data);
        })
        .catch(error => console.error(error));
}

function displayBlogPosts(posts) {
    const postsContainer = document.getElementById('blog-posts');
    postsContainer.innerHTML = ''; 
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
        `;
        postsContainer.appendChild(postElement);
        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.addEventListener('click', () => showEditBlogForm(post));
        postElement.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => deleteBlogPost(post.id));
        postElement.appendChild(deleteButton);
    });
}
   

function deleteBlogPost(id) {
    axios.delete('http://localhost:3000/api/bloginfos/${id}')
        .then(response => {
            console.log(response);
            fetchAllBlogPosts();
        })
        .catch(error => console.error(error));
}

function createWorkout() {
    const type = document.getElementById('workout-type').value;
    const duration = document.getElementById('workout-duration').value;
    const notes = document.getElementById('workout-notes').value;

    axios.post('http://localhost:3000/api/workouts', { type, duration, notes })
        .then(response => {
            console.log(response);
            fetchAllWorkouts();
        })
        .catch(error => console.error(error));
}

function fetchAllWorkouts() {
    axios.get('http://localhost:3000/api/workouts')
        .then(response => {
            displayWorkouts(response.data);
        })
        .catch(error => console.error(error));
}

function displayWorkouts(workouts) {
    const workoutsContainer = document.getElementById('workouts');
    workoutsContainer.innerHTML = '';
    workouts.forEach(workout => {
        const workoutElement = document.createElement('div');
        workoutElement.innerHTML = `
            <h3>${workout.type}</h3>
            <p>Duration: ${workout.duration} minutes</p>
            <p>Notes: ${workout.notes}</p>
        `;
        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.classList.add('edit-button');
        editButton.addEventListener('click', () => showEditWorkoutForm(workout));
        workoutElement.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => deleteWorkout(workout.id));
        workoutElement.appendChild(deleteButton);
        
        workoutsContainer.appendChild(workoutElement);
    });
}    

function updateWorkout(id) {
    const type = document.getElementById('edit-workout-type').value;
    const duration = document.getElementById('edit-workout-duration').value;
    const notes = document.getElementById('edit-workout-notes').value;

    axios.put('http://localhost:3000/api/workouts/${id}', { type, duration, notes })
        .then(response => {
            console.log(response);
            fetchAllWorkouts();
        })
        .catch(error => console.error(error));
}

function deleteWorkout(id) {
    axios.delete('/http://localhost:3000/api/workouts/${id}')
        .then(response => {
            console.log(response);
            fetchAllWorkouts();
        })
        .catch(error => console.error(error));
}

document.addEventListener('DOMContentLoaded', function() {
    fetchAllBlogPosts();
    fetchAllWorkouts();
});

