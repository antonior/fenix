const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://root:root@localhost:5432/api-node-js', {dialect: 'postgres'});

module.exports = sequelize;