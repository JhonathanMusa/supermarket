const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const SaleDetail = sequelize.define('SaleDetail', {
    quantity: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1 } },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false } // Precio al momento de la venta
}); 

module.exports = SaleDetail;