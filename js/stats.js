// Stats page logic

function getFilteredTopics(timeFilter) {
    const topics = getTopics();
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

function updateStats() {
    const timeFilter = document.getElementById('timeFilter').value;
    const filteredTopics = getFilteredTopics(timeFilter);
    const allTopics = getTopics(); // Need all topics to check comments dates effectively if we wanted precise comment stats, but for now we'll sum stats of the *created topics* or we need to iterate all comments of all topics?
    // Requirement says: "real time stats like engagement total likes total discussion formed"

    // Let's refine the logic:
    // "Total Discusssions Formed" -> Count of topics created in that period.
    // "Total Likes" -> Likes on topics created in that period? OR Likes *received* in that period?
    // content typically stores total likes. timestamps for likes are not usually stored in this simple schema.
    // We will assume "Stats for Topics created in this period" for simplicity, OR "Stats accumulated" (but we don't have event logs).
    // Given the schema, "Counts of objects created within date range" is the most accurate interpretation possible.

    // HOWEVER, for "Engagement", it might be better to sum up likes/comments of the visible topics.

    let totalDiscussions = filteredTopics.length;
    let totalLikes = 0;
    let totalComments = 0;

    filteredTopics.forEach(topic => {
        totalLikes += topic.likes;
        totalComments += topic.comments.length;

        // Note: In a real app we'd filter comments by date too, but here comments are nested. 
        // We'll trust the metric "Engagement on topics started in this period".
    });

    // Animate numbers
    animateValue(document.getElementById('stats-discussions'), parseInt(document.getElementById('stats-discussions').textContent), totalDiscussions, 500);
    animateValue(document.getElementById('stats-likes'), parseInt(document.getElementById('stats-likes').textContent), totalLikes, 500);
    animateValue(document.getElementById('stats-engagement'), parseInt(document.getElementById('stats-engagement').textContent), totalLikes + totalComments, 500);

    renderActivityLog(filteredTopics);
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
        const author = getUserById(topic.author);
        logContainer.innerHTML += `
            <div class="list-group-item">
                <div class="d-flex w-100 justify-content-between">
                    <h6 class="mb-1 text-truncate" style="max-width: 70%;"><a href="topic.html?id=${topic.id}" class="text-decoration-none">${topic.title}</a></h6>
                    <small class="text-muted">${formatDate(topic.createdAt)}</small>
                </div>
                <small class="text-muted">
                    <i class="fas fa-user-circle me-1"></i> ${author.username} | 
                    <i class="fas fa-heart text-danger ms-2"></i> ${topic.likes} | 
                    <i class="fas fa-comment ms-2"></i> ${topic.comments.length}
                </small>
            </div>
        `;
    });
}

// Initial render
document.addEventListener('DOMContentLoaded', function () {
    updateStats();
});
