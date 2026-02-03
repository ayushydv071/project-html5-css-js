// Common functions for the forum app

// Get data from localStorage
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

function getTopics() {
    return JSON.parse(localStorage.getItem('topics')) || [];
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

// Set data
function setTopics(topics) {
    localStorage.setItem('topics', JSON.stringify(topics));
}

function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString();
}

function getUserById(id) {
    const users = getUsers();
    return users.find(user => user.id === id);
}

// Render user indicator
function renderUserIndicator() {
    const user = getCurrentUser();
    const indicator = document.getElementById('user-indicator');
    if (user) {
        indicator.innerHTML = `
            <a href="profile.html" class="me-2">
                <img src="${user.avatar}" alt="Avatar" class="avatar-small me-1">
                ${user.username}
            </a>
            ${user.role === 'admin' ? '<span class="badge badge-admin me-2">Admin</span>' : ''}
            <button onclick="logout()">Logout</button>
        `;
    } else {
        indicator.innerHTML = `
            <a href="login.html" class="btn btn-outline-primary btn-oval">Login</a>
            <a href="register.html" class="btn btn-primary btn-oval">Register</a>
        `;
    }
}

// Logout
function logout() {
    setCurrentUser(null);
    location.reload();
}

// Toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Load dark mode
function loadDarkMode() {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function () {
    loadDarkMode();
    renderUserIndicator();
});