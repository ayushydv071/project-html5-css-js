// Topic details logic

function getTopicId() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id'));
}

function renderTopic(topic) {
    const author = getUserById(topic.author);
    const topicDetails = document.getElementById('topic-details');
    topicDetails.innerHTML = `
        <div class="card shadow-lg border-0 overflow-hidden">
            <img src="${topic.image}" class="card-img-top" alt="${topic.title}" style="height: 400px; object-fit: cover;">
            <div class="card-body p-4">
                <div class="d-flex align-items-center mb-3">
                    <img src="${author.avatar}" alt="${author.username}" class="avatar-small me-2">
                    <div>
                        <h6 class="mb-0 fw-bold">${author.username}</h6>
                        <small class="text-muted">${formatDate(topic.createdAt)}</small>
                    </div>
                </div>
                <h1 class="card-title fw-bold mb-3">${topic.title}</h1>
                <div class="card-text fs-5 mb-4" style="line-height: 1.8;">${topic.content}</div>
                
                <div class="d-flex gap-2">
                    <button class="btn btn-outline-primary like-btn" onclick="likeTopic(${topic.id})">
                        <i class="fas fa-heart me-1"></i> Like (${topic.likes})
                    </button>
                    ${getCurrentUser() && getCurrentUser().role === 'admin' ? `<button class="btn btn-danger" onclick="deleteTopic(${topic.id})"><i class="fas fa-trash-alt me-1"></i> Delete</button>` : ''}
                </div>
            </div>
        </div>
    `;
}

function renderComments(comments) {
    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = '';
    comments.forEach(comment => {
        const author = getUserById(comment.author);
        const commentDiv = `
            <div class="comment mb-3">
                <div class="d-flex align-items-center mb-2">
                    <img src="${author.avatar}" alt="${author.username}" class="avatar-small me-2" style="width: 30px; height: 30px;">
                    <strong class="me-2">${author.username}</strong>
                    <small class="text-muted">${formatDate(comment.createdAt)}</small>
                </div>
                <p class="mb-2">${comment.content}</p>
                <div class="d-flex align-items-center">
                    <button class="btn btn-sm btn-link text-decoration-none p-0 me-3 like-btn" onclick="likeComment(${comment.id})">
                        <i class="far fa-heart"></i> Like (${comment.likes})
                    </button>
                    ${getCurrentUser() && getCurrentUser().role === 'admin' ? `<button class="btn btn-sm btn-link text-danger text-decoration-none p-0" onclick="deleteComment(${comment.id})">Delete</button>` : ''}
                </div>
            </div>
        `;
        commentsList.innerHTML += commentDiv;
    });
}

function likeTopic(topicId) {
    const topics = getTopics();
    const topic = topics.find(t => t.id === topicId);
    if (topic) {
        topic.likes++;
        setTopics(topics);
        renderTopic(topic);
    }
}

function likeComment(commentId) {
    const topics = getTopics();
    const topicId = getTopicId();
    const topic = topics.find(t => t.id === topicId);
    if (topic) {
        const comment = topic.comments.find(c => c.id === commentId);
        if (comment) {
            comment.likes++;
            setTopics(topics);
            renderComments(topic.comments);
        }
    }
}

function addComment() {
    const user = getCurrentUser();
    if (!user) {
        alert('Please login to add a comment.');
        return;
    }
    const content = document.getElementById('new-comment').value.trim();
    if (!content) return;
    const topics = getTopics();
    const topic = topics.find(t => t.id === getTopicId());
    if (topic) {
        const newComment = {
            id: Date.now(),
            content,
            author: user.id,
            createdAt: new Date().toISOString(),
            likes: 0
        };
        topic.comments.push(newComment);
        setTopics(topics);
        renderComments(topic.comments);
        document.getElementById('new-comment').value = '';
    }
}

function deleteTopic(topicId) {
    if (confirm('Are you sure you want to delete this topic?')) {
        const topics = getTopics().filter(t => t.id !== topicId);
        setTopics(topics);
        window.location.href = 'index.html';
    }
}

function deleteComment(commentId) {
    if (confirm('Are you sure you want to delete this comment?')) {
        const topics = getTopics();
        const topic = topics.find(t => t.id === getTopicId());
        if (topic) {
            topic.comments = topic.comments.filter(c => c.id !== commentId);
            setTopics(topics);
            renderComments(topic.comments);
        }
    }
}

// Initial render
document.addEventListener('DOMContentLoaded', function () {
    const topicId = getTopicId();
    const topics = getTopics();
    const topic = topics.find(t => t.id === topicId);
    if (topic) {
        renderTopic(topic);
        renderComments(topic.comments);
    } else {
        document.getElementById('topic-details').innerHTML = '<p>Topic not found.</p>';
    }
});