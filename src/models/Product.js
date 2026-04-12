const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Product = sequelize.define('Product', {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { 
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false,
        validate: { min: 0.01 } // Validación: precio mayor a 0
    },
    stock: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        validate: { min: 0 } // Validación: stock no negativo
    }
});

module.exports = Product;