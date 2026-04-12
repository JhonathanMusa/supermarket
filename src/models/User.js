const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { 
        type: DataTypes.STRING, 
        unique: true, // Validación: email único
        allowNull: false,
        validate: { isEmail: true }
    },
    role: { type: DataTypes.STRING, defaultValue: 'vendedor' }
});

module.exports = User;