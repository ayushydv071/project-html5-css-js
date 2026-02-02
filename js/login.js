// Login logic

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value; // ignored

    const users = getUsers();
    const user = users.find(u => u.username === username);
    if (user) {
        setCurrentUser(user);
        window.location.href = 'index.html';
    } else {
        alert('Invalid username.');
    }
});