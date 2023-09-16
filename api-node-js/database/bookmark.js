const Sequelize = require('sequelize');
const database = require('./db');

const Bookmark = database.define('bookmark', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Bookmark;