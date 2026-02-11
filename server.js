const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.')); // Serve static files from current directory

// Middleware to wrap db.run in a promise
function run(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
}

// Middleware to wrap db.all in a promise
function all(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

// Middleware to wrap db.get in a promise
function get(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
}

// --- Auth Routes ---

app.post('/api/register', async (req, res) => {
    const { username, email, password, college, skills, bio } = req.body;
    const avatar = `https://ui-avatars.com/api/?name=${username}&background=random`;
    const role = 'user';

    try {
        const result = await run(
            'INSERT INTO users (username, email, password, avatar, role, college, skills, bio) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [username, email, password, avatar, role, college, skills, bio]
        );
        const user = await get('SELECT * FROM users WHERE id = ?', [result.lastID]);
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
        if (user) {
            res.json(user);
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- User Routes ---

app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await get('SELECT id, username, avatar, role, college, skills, bio FROM users WHERE id = ?', [req.params.id]);
        if (user) res.json(user);
        else res.status(404).json({ error: 'User not found' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- Topic Routes ---

app.get('/api/topics', async (req, res) => {
    try {
        const sql = `
            SELECT topics.*, users.username as author_name, users.avatar as author_avatar 
            FROM topics 
            LEFT JOIN users ON topics.author_id = users.id 
            ORDER BY createdAt DESC
        `;
        const topics = await all(sql);

        // Fetch comments
        for (let topic of topics) {
            topic.comments = await all('SELECT * FROM comments WHERE topic_id = ?', [topic.id]);
        }

        // Format topics to match frontend structure where possible, or just send enriched data
        const formattedTopics = topics.map(t => ({
            ...t,
            author: { id: t.author_id, username: t.author_name, avatar: t.author_avatar }
        }));

        res.json(formattedTopics);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/topics/:id', async (req, res) => {
    try {
        const sql = `
            SELECT topics.*, users.username as author_name, users.avatar as author_avatar 
            FROM topics 
            LEFT JOIN users ON topics.author_id = users.id 
            WHERE topics.id = ?
        `;
        const topic = await get(sql, [req.params.id]);

        if (topic) {
            const commentsSql = `
                SELECT comments.*, users.username as author_name, users.avatar as author_avatar 
                FROM comments 
                LEFT JOIN users ON comments.author_id = users.id 
                WHERE topic_id = ? 
                ORDER BY createdAt ASC
            `;
            const comments = await all(commentsSql, [topic.id]);

            topic.comments = comments.map(c => ({
                ...c,
                author: { id: c.author_id, username: c.author_name, avatar: c.author_avatar }
            }));
            topic.author = { id: topic.author_id, username: topic.author_name, avatar: topic.author_avatar };

            res.json(topic);
        } else {
            res.status(404).json({ error: 'Topic not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/topics', async (req, res) => {
    const { title, content, image, author_id } = req.body;
    try {
        const result = await run(
            'INSERT INTO topics (title, content, image, author_id) VALUES (?, ?, ?, ?)',
            [title, content, image, author_id]
        );
        // Return the full topic with author info
        const sql = `
            SELECT topics.*, users.username as author_name, users.avatar as author_avatar 
            FROM topics 
            LEFT JOIN users ON topics.author_id = users.id 
            WHERE topics.id = ?
        `;
        const topic = await get(sql, [result.lastID]);
        topic.author = { id: topic.author_id, username: topic.author_name, avatar: topic.author_avatar };
        res.json(topic);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/topics/:id/like', async (req, res) => {
    try {
        await run('UPDATE topics SET likes = likes + 1 WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/topics/:id', async (req, res) => {
    try {
        await run('DELETE FROM topics WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- Comment Routes ---

app.post('/api/comments', async (req, res) => {
    const { content, topic_id, author_id } = req.body;
    try {
        const result = await run(
            'INSERT INTO comments (content, topic_id, author_id) VALUES (?, ?, ?)',
            [content, topic_id, author_id]
        );
        const sql = `
            SELECT comments.*, users.username as author_name, users.avatar as author_avatar 
            FROM comments 
            LEFT JOIN users ON comments.author_id = users.id 
            WHERE comments.id = ?
        `;
        const comment = await get(sql, [result.lastID]);
        comment.author = { id: comment.author_id, username: comment.author_name, avatar: comment.author_avatar };
        res.json(comment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/comments/:id/like', async (req, res) => {
    try {
        await run('UPDATE comments SET likes = likes + 1 WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/comments/:id', async (req, res) => {
    try {
        await run('DELETE FROM comments WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
