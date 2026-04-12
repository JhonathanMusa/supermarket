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
router.post('/', seedController.runSeed);

module.exports = router;