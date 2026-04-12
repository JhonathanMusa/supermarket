const { User } = require('../models');

exports.getAll = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { name, email, role } = req.body;
        const user = await User.create({ name, email, role });
        res.status(201).json(user);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: "El correo ya está registrado" });
        }
        res.status(400).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { name, email, role } = req.body;
        const [updated] = await User.update({ name, email, role }, { where: { id: req.params.id } });
        if (!updated) return res.status(404).json({ message: "Usuario no encontrado" });
        res.json({ message: "Usuario actualizado con éxito" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deleted = await User.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ message: "Usuario no encontrado" });
        res.json({ message: "Usuario eliminado" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};