const swaggerJsDoc = require('swagger-jsdoc');
const path = require('node:path');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'MarketSoft API',
            version: '1.0.0',
            description: 'API para la gestión de inventario y ventas de supermercado',
            contact: {
                name: 'Soporte MarketSoft'
            }
        },
        servers: [{ url: 'http://localhost:3000' }]
    },
    // Ruta a los archivos donde Swagger buscará los comentarios para documentar
    apis: [`${path.join(__dirname, '../routes/*.js')}`],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;