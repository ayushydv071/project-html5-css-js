// Edit profile logic

document.addEventListener('DOMContentLoaded', function() {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    document.getElementById('bio').value = user.bio || '';
    document.getElementById('qualifications').value = user.qualifications || '';
    document.getElementById('avatar').value = user.avatar || '';
});

document.getElementById('edit-profile-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const user = getCurrentUser();
    const bio = document.getElementById('bio').value.trim();
    const qualifications = document.getElementById('qualifications').value.trim();
    const avatar = document.getElementById('avatar').value.trim();

    user.bio = bio;
    user.qualifications = qualifications;
    user.avatar = avatar;
    const users = getUsers();
    const index = users.findIndex(u => u.id === user.id);
    users[index] = user;
    localStorage.setItem('users', JSON.stringify(users));
    setCurrentUser(user);
    window.location.href = 'profile.html';
});