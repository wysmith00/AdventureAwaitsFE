const { default: axios } = require("axios");

function createBlogPost() {
    const title = document.getElementById('blog-title').value;
    const content = document.getElementById('blog-content').value;

    axios.post('/api/bloginfos', { title, content })
        .then(response => {
            console.log(response);
            fetchAllBlogPosts();
        })
        .catch(error => console.error(error));
}

function fetchAllBlogPosts() {
    axios.get('/api/bloginfos')
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
    });
}

function createWorkout() {
    const type = document.getElementById('workout-type').value;
    const duration = document.getElementById('workout-duration').value;
    const notes = document.getElementById('workout-notes').value;

    axios.post('/api/workouts', { type, duration, notes })
        .then(response => {
            console.log(response);
            fetchAllWorkouts();
        })
        .catch(error => console.error(error));
}

function fetchAllWorkouts() {
    axios.get('/api/workouts')
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
        workoutsContainer.appendChild(workoutElement);
    });
}    

document.addEventListener('DOMContentLoaded', function() {
    fetchAllBlogPosts();
    fetchAllWorkouts();
});