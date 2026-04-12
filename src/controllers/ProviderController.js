const { Provider } = require('../models');

exports.getAll = async (req, res) => {
    try {
        const providers = await Provider.findAll();
        res.json(providers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const provider = await Provider.findByPk(req.params.id);
        if (!provider) return res.status(404).json({ message: "Proveedor no encontrado" });
        res.json(provider);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { name, phone, email, city } = req.body;
        const provider = await Provider.create({ name, phone, email, city });
        res.status(201).json(provider);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { name, phone, email, city } = req.body;
        const [updated] = await Provider.update({ name, phone, email, city }, { where: { id: req.params.id } });
        if (!updated) return res.status(404).json({ message: "Proveedor no encontrado" });
        res.json({ message: "El proveedor se actualizó correctamente" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deleted = await Provider.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ message: "Proveedor no encontrado" });
        res.json({ message: "El proveedor se eliminó correctamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};