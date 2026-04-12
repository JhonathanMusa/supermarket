const { Product, Provider } = require('../models');

exports.getAll = async (req, res) => {
    try {
        const products = await Product.findAll({ include: Provider });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, { include: Provider });
        if (!product) return res.status(404).json({ message: "Producto no encontrado" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { name, description, price, stock, providerId } = req.body;
        const product = await Product.create({ name, description, price, stock, providerId });
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { name, description, price, stock, providerId } = req.body;
        const [updated] = await Product.update({ name, description, price, stock, providerId }, { where: { id: req.params.id } });
        if (!updated) return res.status(404).json({ message: "Producto no encontrado" });
        res.json({ message: "El producto se actualizó correctamente" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deleted = await Product.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ message: "Producto no encontrado" });
        res.json({ message: "El producto se eliminó correctamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};