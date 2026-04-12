const Provider = require('./Provider');
const Product = require('./Product');
const User = require('./User');
const Sale = require('./Sale');
const SaleDetail = require('./SaleDetail');

Provider.hasMany(Product, { foreignKey: 'providerId' });
Product.belongsTo(Provider, { foreignKey: 'providerId' });

User.hasMany(Sale, { foreignKey: 'userId' });
Sale.belongsTo(User, { foreignKey: 'userId' });

Sale.hasMany(SaleDetail, { foreignKey: 'saleId' });
SaleDetail.belongsTo(Sale, { foreignKey: 'saleId' });

Product.hasMany(SaleDetail, { foreignKey: 'productId' });
SaleDetail.belongsTo(Product, { foreignKey: 'productId' });

module.exports = {
    Provider,
    Product,
    User,
    Sale,
    SaleDetail
};