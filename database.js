const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'forum.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database ' + dbPath + ': ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');

        db.serialize(() => {
            // Users table
            db.run(`CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE,
                email TEXT UNIQUE,
                password TEXT,
                avatar TEXT,
                role TEXT DEFAULT 'user',
                college TEXT,
                skills TEXT,
                bio TEXT,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )`);

            // Topics table
            db.run(`CREATE TABLE IF NOT EXISTS topics (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                content TEXT,
                image TEXT,
                author_id INTEGER,
                likes INTEGER DEFAULT 0,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (author_id) REFERENCES users (id)
            )`);

            // Comments table
            db.run(`CREATE TABLE IF NOT EXISTS comments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                content TEXT,
                topic_id INTEGER,
                author_id INTEGER,
                likes INTEGER DEFAULT 0,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (topic_id) REFERENCES topics (id) ON DELETE CASCADE,
                FOREIGN KEY (author_id) REFERENCES users (id)
            )`);

            // Initial Admin User (if not exists)
            const insertAdmin = 'INSERT OR IGNORE INTO users (username, email, password, avatar, role, bio) VALUES (?, ?, ?, ?, ?, ?)';
            db.run(insertAdmin, ['admin', 'admin@example.com', 'admin123', 'https://ui-avatars.com/api/?name=Admin&background=random', 'admin', 'System Administrator']);
        });
    }
});

module.exports = db;
