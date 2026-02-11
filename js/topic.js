// Topic details logic

function getTopicId() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id'));
}

function renderTopic(topic) {
    const author = topic.author;
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
                    ${getCurrentUser() && (getCurrentUser().role === 'admin' || getCurrentUser().id === author.id) ? `<button class="btn btn-danger" onclick="deleteTopic(${topic.id})"><i class="fas fa-trash-alt me-1"></i> Delete</button>` : ''}
                </div>
            </div>
        </div>
    `;
}

function renderComments(comments) {
    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = '';
    comments.forEach(comment => {
        const author = comment.author;
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
                    ${getCurrentUser() && (getCurrentUser().role === 'admin' || getCurrentUser().id === author.id) ? `<button class="btn btn-sm btn-link text-danger text-decoration-none p-0" onclick="deleteComment(${comment.id})">Delete</button>` : ''}
                </div>
            </div>
        `;
        commentsList.innerHTML += commentDiv;
    });
}

async function likeTopic(topicId) {
    try {
        await apiFetch(`/topics/${topicId}/like`, { method: 'POST' });
        // Refresh topic
        const topic = await apiFetch(`/topics/${topicId}`);
        renderTopic(topic);
    } catch (error) {
        console.error('Error liking topic:', error);
        alert('Error liking topic');
    }
}

async function likeComment(commentId) {
    try {
        await apiFetch(`/comments/${commentId}/like`, { method: 'POST' });
        // Refresh comments
        const topicId = getTopicId();
        const topic = await apiFetch(`/topics/${topicId}`); // Re-fetch topic to get comments
        renderComments(topic.comments);
    } catch (error) {
        console.error('Error liking comment:', error);
        alert('Error liking comment');
    }
}

async function addComment() {
    const user = getCurrentUser();
    if (!user) {
        alert('Please login to add a comment.');
        return;
    }
    const content = document.getElementById('new-comment').value.trim();
    if (!content) return;

    try {
        await apiFetch('/comments', {
            method: 'POST',
            body: JSON.stringify({
                content,
                topic_id: getTopicId(),
                author_id: user.id
            })
        });
        document.getElementById('new-comment').value = '';

        // Refresh comments
        const topic = await apiFetch(`/topics/${getTopicId()}`);
        renderComments(topic.comments);
    } catch (error) {
        console.error('Error adding comment:', error);
        alert('Error adding comment');
    }
}

async function deleteTopic(topicId) {
    if (confirm('Are you sure you want to delete this topic?')) {
        try {
            await apiFetch(`/topics/${topicId}`, { method: 'DELETE' });
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Error deleting topic:', error);
            alert('Error deleting topic');
        }
    }
}

async function deleteComment(commentId) {
    if (confirm('Are you sure you want to delete this comment?')) {
        try {
            await apiFetch(`/comments/${commentId}`, { method: 'DELETE' });
            // Refresh comments
            const topic = await apiFetch(`/topics/${getTopicId()}`);
            renderComments(topic.comments);
        } catch (error) {
            console.error('Error deleting comment:', error);
            alert('Error deleting comment');
        }
    }
}

// Initial render
document.addEventListener('DOMContentLoaded', async function () {
    const topicId = getTopicId();
    if (!topicId) {
        document.getElementById('topic-details').innerHTML = '<p>Topic ID missing.</p>';
        return;
    }

    try {
        const topic = await apiFetch(`/topics/${topicId}`);
        if (topic) {
            renderTopic(topic);
            renderComments(topic.comments);
        } else {
            document.getElementById('topic-details').innerHTML = '<p>Topic not found.</p>';
        }
    } catch (error) {
        console.error('Error loading topic:', error);
        document.getElementById('topic-details').innerHTML = '<p>Topic not found or server error.</p>';
    }
});