// Common functions for the forum app
const API_URL = 'http://localhost:3000/api';

// API Helper
async function apiFetch(endpoint, options = {}) {
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {})
        }
    });
    if (!response.ok) {
        throw new Error(await response.text());
    }
    return response.json();
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString();
}

// Render user indicator
function renderUserIndicator() {
    const user = getCurrentUser();
    const indicator = document.getElementById('user-indicator');
    if (!indicator) return;

    if (user) {
        indicator.innerHTML = `
            <a href="profile.html" class="me-2 text-decoration-none">
                <img src="${user.avatar}" alt="Avatar" class="avatar-small me-1" style="width:30px;height:30px;border-radius:50%">
                ${user.username}
            </a>
            ${user.role === 'admin' ? '<span class="badge bg-danger me-2">Admin</span>' : ''}
            <button class="btn btn-outline-danger btn-sm" onclick="logout()">Logout</button>
        `;
    } else {
        indicator.innerHTML = `
            <a href="login.html" class="btn btn-outline-primary btn-oval me-2">Login</a>
            <a href="register.html" class="btn btn-primary btn-oval">Register</a>
        `;
    }
}

// Logout
function logout() {
    setCurrentUser(null);
    window.location.href = 'index.html';
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