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
    postsContainer.innerHTML = ''; // Clear current posts
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <button onclick="updateBlogPost('${post._id}')">Update</button>
            <button onclick="deleteBlogPost('${post._id}')">Delete</button>
        `;
        postsContainer.appendChild(postElement);
    });
}

function updateBlogPost(postId) {
    const title = prompt("New Title:");
    const content = prompt("New Content:");

    axios.put(`/api/bloginfos/${postId}`, { title, content })
        .then(response => {
            console.log(response);
            fetchAllBlogPosts();
        })
        .catch(error => console.error(error));
}

function deleteBlogPost(postId) {
    axios.delete(`/api/bloginfos/${postId}`)
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

    axios.post('/api/workouts', { type, duration, notes })
        .then(response => {
            console.log(respnose);
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
            <button onclick="updateWorkout('${workout._id}')">Update</button>
            <button onclick="deleteWorkout('${workout._id}')">Delete</button>
        `;
        workoutsContainer.appendChild(workoutElement);
    });
}    

function updateWorkout(workoutId) {
    const type = prompt("New Workout Type:");
    const duration = prompt("New Duration (in minutes):");
    const notes = prompt ("New Notes:");

    axios.put(`/api/workouts/${workoutId}`, { type, duration, notes })
        .then(response => {
            console.log(response);
            fetchAllWorkouts();
        })
        .catch(error => console.error(error));
}

function deleteWorkout(workoutId) {
    axios.delete(`/api/workouts/${workoutId}`)
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




