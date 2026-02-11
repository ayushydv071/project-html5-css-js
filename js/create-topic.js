// Create topic logic

document.getElementById('create-topic-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const user = getCurrentUser();
    if (!user) {
        alert('Please login to create a topic.');
        window.location.href = 'login.html';
        return;
    }
    const title = document.getElementById('title').value.trim();
    const content = document.getElementById('content').value.trim();
    const image = document.getElementById('image').value.trim() || 'https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
    if (!title || !content) return;

    try {
        const newTopic = await apiFetch('/topics', {
            method: 'POST',
            body: JSON.stringify({
                title,
                content,
                image,
                author_id: user.id
            })
        });
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Error creating topic:', error);
        alert('Failed to create topic: ' + error.message);
    }
});