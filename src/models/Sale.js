const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Sale = sequelize.define('Sale', {
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    total: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 }
});

module.exports = Sale;