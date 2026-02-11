// Stats page logic

function getFilteredTopics(topics, timeFilter) {
    const now = new Date();

    // Filter function based on time
    return topics.filter(topic => {
        const topicDate = new Date(topic.createdAt);

        if (timeFilter === 'day') {
            return now - topicDate < 24 * 60 * 60 * 1000;
        } else if (timeFilter === 'week') {
            return now - topicDate < 7 * 24 * 60 * 60 * 1000;
        } else if (timeFilter === 'month') {
            return now - topicDate < 30 * 24 * 60 * 60 * 1000;
        }
        return true; // 'all'
    });
}

async function updateStats() {
    try {
        const allTopics = await apiFetch('/topics');
        const timeFilter = document.getElementById('timeFilter').value;
        const filteredTopics = getFilteredTopics(allTopics, timeFilter);

        let totalDiscussions = filteredTopics.length;
        let totalLikes = 0;
        let totalComments = 0;

        filteredTopics.forEach(topic => {
            totalLikes += topic.likes;
            totalComments += (topic.comments ? topic.comments.length : 0);
        });

        // Animate numbers
        animateValue(document.getElementById('stats-discussions'), parseInt(document.getElementById('stats-discussions').textContent) || 0, totalDiscussions, 500);
        animateValue(document.getElementById('stats-likes'), parseInt(document.getElementById('stats-likes').textContent) || 0, totalLikes, 500);
        animateValue(document.getElementById('stats-engagement'), parseInt(document.getElementById('stats-engagement').textContent) || 0, totalLikes + totalComments, 500);

        renderActivityLog(filteredTopics);
    } catch (error) {
        console.error('Error updating stats:', error);
        document.getElementById('activity-log').innerHTML = '<div class="alert alert-danger">Error loading stats.</div>';
    }
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function renderActivityLog(topics) {
    const logContainer = document.getElementById('activity-log');
    logContainer.innerHTML = '';

    // Sort by date newest first
    const sorted = [...topics].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

    if (sorted.length === 0) {
        logContainer.innerHTML = '<div class="list-group-item text-muted">No activity in this period.</div>';
        return;
    }

    sorted.forEach(topic => {
        const author = topic.author;
        logContainer.innerHTML += `
            <div class="list-group-item">
                <div class="d-flex w-100 justify-content-between">
                    <h6 class="mb-1 text-truncate" style="max-width: 70%;"><a href="topic.html?id=${topic.id}" class="text-decoration-none">${topic.title}</a></h6>
                    <small class="text-muted">${formatDate(topic.createdAt)}</small>
                </div>
                <small class="text-muted">
                    <i class="fas fa-user-circle me-1"></i> ${author ? author.username : 'Unknown'} | 
                    <i class="fas fa-heart text-danger ms-2"></i> ${topic.likes} | 
                    <i class="fas fa-comment ms-2"></i> ${topic.comments ? topic.comments.length : 0}
                </small>
            </div>
        `;
    });
}

// Initial render
document.addEventListener('DOMContentLoaded', function () {
    updateStats();

    // Add event listener for filter change
    document.getElementById('timeFilter').addEventListener('change', updateStats);
});
