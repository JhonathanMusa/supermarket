const express = require('express');
const router = express.Router();
const seedController = require('../controllers/SeedController');

/**
 * @swagger
 * /api/seed:
 *   post:
 *     summary: Poblar la base de datos con datos iniciales
 *     tags: [Setup]
 *     responses:
 *       200:
 *         description: Base de datos poblada
 */
router.post('/', (req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
        return res.status(403).json({ message: 'No disponible en producción' });
    }
    next();
}, seedController.runSeed);

module.exports = router;