const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'forum.db');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        console.error('Error opening database ' + dbPath + ': ' + err.message);
        process.exit(1);
    }
});

console.log('--- Connected to SQLite database ---\n');

const tables = ['users', 'topics', 'comments'];

function printTable(tableName) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM ${tableName}`, [], (err, rows) => {
            if (err) {
                console.error(`Error querying ${tableName}:`, err.message);
                reject(err);
                return;
            }
            console.log(`\n=== Table: ${tableName} ===`);
            if (rows.length === 0) {
                console.log('(No data)');
            } else {
                console.table(rows);
            }
            resolve();
        });
    });
}

async function viewData() {
    try {
        for (const table of tables) {
            await printTable(table);
        }
    } catch (error) {
        console.error('Error viewing data:', error);
    } finally {
        db.close(() => {
            console.log('\n--- Database connection closed ---');
        });
    }
}

viewData();
