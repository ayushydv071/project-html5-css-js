// Homepage logic

let currentCategory = 'all';

function renderTopics(topics) {
    const topicsList = document.getElementById('topics-list');
    topicsList.innerHTML = '';
    topics.forEach((topic, index) => {
        const author = getUserById(topic.author);
        const topicCard = `
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card topic-card" style="animation-delay: ${index * 0.1}s">
                    <img src="${topic.image}" class="card-img-top" alt="${topic.title}">
                    <div class="card-body">
                        <h5 class="card-title">
                            <a href="topic.html?id=${topic.id}" class="text-decoration-none text-dark stretched-link">${topic.title}</a>
                            ${topic.likes > 100 ? '<span class="badge bg-danger ms-2">Hot</span>' : ''}
                        </h5>
                        <p class="card-text">${topic.content.substring(0, 80)}...</p>
                        <div class="d-flex justify-content-between align-items-center mt-3">
                            <small class="text-muted">
                                <img src="${author.avatar}" class="avatar-small me-1" alt="${author.username}">
                                ${author.username}
                            </small>
                            <small class="text-muted"><i class="fas fa-heart text-danger"></i> ${topic.likes}</small>
                        </div>
                    </div>
                </div>
            </div>
        `;
        topicsList.innerHTML += topicCard;
    });
    updateStats(topics);
}

function updateStats(topics) {
    const totalTopics = topics.length;
    const totalComments = topics.reduce((sum, topic) => sum + topic.comments.length, 0);
    document.getElementById('total-topics').textContent = totalTopics;
    document.getElementById('total-comments').textContent = totalComments;

    // Render trending
    const trending = [...topics].sort((a, b) => b.likes - a.likes).slice(0, 3);
    const trendingList = document.getElementById('trending-list');
    trendingList.innerHTML = '';
    trending.forEach(topic => {
        trendingList.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <a href="topic.html?id=${topic.id}" class="text-decoration-none text-truncate" style="max-width: 70%;">${topic.title}</a>
                <span class="badge bg-primary rounded-pill">${topic.likes} <i class="fas fa-heart"></i></span>
            </li>`;
    });
}

function filterByCategory(category) {
    currentCategory = category;
    applyFilters();
}

function applyFilters() {
    const search = document.getElementById('search').value.toLowerCase();
    const filter = document.getElementById('filter').value;
    let topics = getTopics();

    // Filter by category (dummy, since no categories in data)
    if (currentCategory !== 'all') {
        // For demo, filter by title containing category name
        topics = topics.filter(topic => topic.title.toLowerCase().includes(currentCategory));
    }

    // Filter by search
    if (search) {
        topics = topics.filter(topic => topic.title.toLowerCase().includes(search) || topic.content.toLowerCase().includes(search));
    }

    // Sort
    if (filter === 'newest') {
        topics.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (filter === 'most-liked') {
        topics.sort((a, b) => b.likes - a.likes);
    }

    renderTopics(topics);
}

// Initial render
document.addEventListener('DOMContentLoaded', function () {
    applyFilters();
});