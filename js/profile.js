// Profile logic

// Function to get a random profile picture
function getRandomProfilePicture() {
    const randomId = Math.floor(Math.random() * 70);
    return `https://i.pravatar.cc/150?img=${randomId}`;
}

document.addEventListener('DOMContentLoaded', function() {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    
    // Use random avatar if not set, or generate a new random one
    const avatarUrl = user.avatar || getRandomProfilePicture();
    
    const profile = document.getElementById('profile');
    profile.innerHTML = `
        <div class="card">
            <div class="card-body text-center">
                <img src="${avatarUrl}" alt="Avatar" class="avatar-large mb-3">
                <h2>${user.username}</h2>
                <p>${user.bio || 'No bio yet.'}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                
                <div class="card mt-3">
                    <div class="card-header bg-info text-white">
                        <h5 class="mb-0">Qualifications</h5>
                    </div>
                    <div class="card-body">
                        <p>${user.qualifications || 'No qualifications added yet.'}</p>
                    </div>
                </div>
                
                ${user.role === 'admin' ? '<span class="badge badge-admin mt-3">Admin</span>' : ''}
            </div>
        </div>
    `;
});