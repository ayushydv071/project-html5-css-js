// Register logic

document.getElementById('register-form').addEventListener('submit', function (e) {
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

    const users = getUsers();
    if (users.find(u => u.username === username)) {
        alert('Username already exists.');
        return;
    }

    const newUser = {
        id: Date.now(),
        username,
        email,
        bio: bio || '',
        college: college,
        skills: skills,
        avatar: 'https://via.placeholder.com/150', // Default placeholder
        role: 'user'
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    setCurrentUser(newUser);
    window.location.href = 'index.html';
});