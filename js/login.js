// Login logic

document.getElementById('login-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    try {
        const user = await apiFetch('/login', {
            method: 'POST',
            body: JSON.stringify({ username, password })
        });

        setCurrentUser(user);
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Login error:', error);
        alert('Invalid username or password.');
    }
});