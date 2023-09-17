async function initializeDatabase() {
    const database = require('./db');
    const Book = require('./book');
    const Bookmark = require('./bookmark');

    try {
        const result = await database.sync();
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

module.exports = initializeDatabase