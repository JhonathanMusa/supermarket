const { Provider, Product, User, Sale, SaleDetail } = require('../models');

exports.runSeed = async (req, res) => {
    try {
        // 1. Limpiar datos existentes (Opcional, cuidado con el orden por las FK)
        await SaleDetail.destroy({ where: {} });
        await Sale.destroy({ where: {} });
        await Product.destroy({ where: {} });
        await User.destroy({ where: {} });
        await Provider.destroy({ where: {} });

        // 2. Crear Proveedores
        const providers = await Provider.bulkCreate([
            { name: 'Diana', phone: '555-123', email: 'diana@example.com', city: 'Bogotá' },
            { name: 'Del campo Co', phone: '555-456', email: 'contacto@delcampo.com', city: 'Manizales' },
            { name: 'Colanta', phone: '555-789', email: 'contacto@colanta.com', city: 'Medellín' }
        ]);

        // 3. Crear Usuarios
        const users = await User.bulkCreate([
            { name: 'John Doe', email: 'johndoe@example.com', role: 'usuario' },
            { name: 'Jane Smith', email: 'janesmith@example.com', role: 'usuario' },
            { name: 'Pedro Perez', email: 'pedroperez@example.com', role: 'usuario' },
            { name: 'Joselito Carnaval', email: 'joselitocarnaval@example.com', role: 'admin' },
        ]);

        // 4. Crear Productos (Asociados a los proveedores creados)
        const products = await Product.bulkCreate([
            { name: 'Arroz"', price: 150, stock: 10, providerId: providers[0].id },
            { name: 'Frijoles', price: 45, stock: 20, providerId: providers[0].id },
            { name: 'Manzanas', price: 12, stock: 50, providerId: providers[1].id },
            { name: 'Tomates', price: 8, stock: 20, providerId: providers[1].id },
            { name: 'Huevos', price: 35, stock: 2, providerId: providers[1].id },
            { name: 'Leche', price: 2, stock: 2, providerId: providers[2].id },
        ]);

        // 5. Crear una Venta de ejemplo
        const sale = await Sale.create({
            userId: users[1].id,
            date: new Date(),
            total: 162
        });

        // 6. Detalle de la Venta
        await SaleDetail.bulkCreate([
            { saleId: sale.id, productId: products[0].id, quantity: 1, price: 150 },
            { saleId: sale.id, productId: products[2].id, quantity: 1, price: 12 }
        ]);

        res.status(200).json({ message: "Base de datos poblada exitosamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};