const Sequelize = require('sequelize');
const database = require('./db');

const Book = database.define('book', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.TEXT
    }
})

module.exports = Book;