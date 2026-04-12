const { Sale, SaleDetail, Product, User } = require('../models');
const { sequelize } = require('../config/db');

exports.getAll = async (req, res) => {
    try {
        const sales = await Sale.findAll({
            include: [{ model: User, attributes: ['name', 'email'] }]
        });
        res.json(sales);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const sale = await Sale.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ['name'] },
                { 
                    model: SaleDetail, 
                    include: [{ model: Product, attributes: ['name', 'price'] }] 
                }
            ]
        });
        if (!sale) return res.status(404).json({ message: "Venta no encontrada" });
        res.json(sale);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createSale = async (req, res) => {
    const { userId, items } = req.body;
    if (!userId || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: "userId e items son requeridos" });
    }

    const t = await sequelize.transaction();
    try {
        const user = await User.findByPk(userId, { transaction: t });
        if (!user) {
            await t.rollback();
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const productIds = items.map(i => i.productId);
        const products = await Product.findAll({ where: { id: productIds }, transaction: t });
        const productMap = new Map(products.map(p => [p.id, p]));

        let total = 0;
        const detailsData = [];

        for (const item of items) {
            const product = productMap.get(item.productId);
            if (!product) {
                await t.rollback();
                return res.status(404).json({ message: `Producto ${item.productId} no encontrado` });
            }
            if (product.stock < item.quantity) {
                await t.rollback();
                return res.status(400).json({ message: `Stock insuficiente para el producto ${product.name}` });
            }
            detailsData.push({ product, quantity: item.quantity, price: product.price });
            total += product.price * item.quantity;
        }

        const sale = await Sale.create({ userId, total }, { transaction: t });

        await SaleDetail.bulkCreate(
            detailsData.map(d => ({
                saleId: sale.id,
                productId: d.product.id,
                quantity: d.quantity,
                price: d.price
            })),
            { transaction: t }
        );

        for (const detail of detailsData) {
            await detail.product.update(
                { stock: detail.product.stock - detail.quantity },
                { transaction: t }
            );
        }

        await t.commit();
        res.status(201).json({ message: "Venta procesada exitosamente", saleId: sale.id, total });
    } catch (error) {
        await t.rollback();
        res.status(500).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { userId, total } = req.body;
        const [updated] = await Sale.update({ userId, total }, { where: { id: req.params.id } });
        if (!updated) return res.status(404).json({ message: "Venta no encontrada" });
        res.json({ message: "Venta actualizada exitosamente" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deleted = await Sale.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ message: "Venta no encontrada" });
        res.json({ message: "Venta eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};