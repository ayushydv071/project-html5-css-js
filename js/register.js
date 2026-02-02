// Register logic

document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value; // ignored

    const users = getUsers();
    if (users.find(u => u.username === username)) {
        alert('Username already exists.');
        return;
    }

    const newUser = {
        id: Date.now(),
        username,
        email,
        bio: '',
        avatar: 'https://via.placeholder.com/50',
        role: 'user'
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    setCurrentUser(newUser);
    window.location.href = 'index.html';
});