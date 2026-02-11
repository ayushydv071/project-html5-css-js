// Register logic

document.getElementById('register-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const college = document.getElementById('college').value.trim();
    const skills = document.getElementById('skills').value.trim();
    const bio = document.getElementById('bio').value.trim();

    // Validation
    if (!email.toLowerCase().endsWith('@gmail.com')) {
        alert('Please use a valid Gmail address (@gmail.com).');
        return;
    }

    const strongPasswordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!strongPasswordRegex.test(password)) {
        alert('Password must be at least 8 characters long and include at least one number and one special character.');
        return;
    }

    try {
        const newUser = await apiFetch('/register', {
            method: 'POST',
            body: JSON.stringify({
                username,
                email,
                password,
                college,
                skills,
                bio
            })
        });

        setCurrentUser(newUser);
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Registration error:', error);
        alert('Registration failed: ' + error.message);
    }
});