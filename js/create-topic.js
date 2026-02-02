// Create topic logic

document.getElementById('create-topic-form').addEventListener('submit', function (e) {
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

    const topics = getTopics();
    const newTopic = {
        id: Date.now(),
        title,
        content,
        image,
        author: user.id,
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: []
    };
    topics.push(newTopic);
    setTopics(topics);
    window.location.href = 'index.html';
});