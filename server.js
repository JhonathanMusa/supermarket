const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./src/swagger/swaggerConfig');

const { sequelize } = require('./src/config/db');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT || 3000;
const productRoutes = require('./src/routes/productRoutes');
const userRoutes = require('./src/routes/userRoutes');
const providerRoutes = require('./src/routes/providerRoutes');
const saleRoutes = require('./src/routes/saleRoutes');
const seedRoutes = require('./src/routes/seedRoutes');


app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/providers', providerRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/seed', seedRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Bienvenido al Supermercado' });
});

app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Error interno del servidor' });
});

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida exitosamente.');

        await sequelize.sync();

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }
}

startServer();