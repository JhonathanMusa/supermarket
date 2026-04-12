const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Provider = sequelize.define('Provider', {
    name: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, validate: { isEmail: true } },
    city: { type: DataTypes.STRING }
});

module.exports = Provider;