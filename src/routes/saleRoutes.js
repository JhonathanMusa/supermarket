const express = require('express');
const router = express.Router();
const saleController = require('../controllers/SaleController');

/**
 * @swagger
 * tags:
 *   - name: Ventas
 *     description: Gestión de ventas y facturación
 */

/**
 * @swagger
 * /api/sales:
 *   get:
 *     summary: Obtiene todas las ventas
 *     tags: [Ventas]
 *     responses:
 *       200:
 *         description: Lista de ventas obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   total:
 *                     type: number
 *                     format: float
 *                   UserId:
 *                     type: integer
 *   post:
 *     summary: Registrar una nueva venta
 *     tags: [Ventas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - items
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - productId
 *                     - quantity
 *                   properties:
 *                     productId:
 *                       type: integer
 *                       example: 3
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       201:
 *         description: Venta procesada exitosamente
 *       400:
 *         description: Datos inválidos o stock insuficiente
 *       404:
 *         description: Usuario o producto no encontrado
 */
router.get('/', saleController.getAll);
router.post('/', saleController.createSale);

/**
 * @swagger
 * /api/sales/{id}:
 *   get:
 *     summary: Obtiene una venta por ID
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la venta
 *     responses:
 *       200:
 *         description: Venta encontrada
 *       404:
 *         description: Venta no encontrada
 *   put:
 *     summary: Actualiza una venta existente
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la venta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               total:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Venta actualizada exitosamente
 *       404:
 *         description: Venta no encontrada
 *   delete:
 *     summary: Elimina una venta
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la venta
 *     responses:
 *       200:
 *         description: Venta eliminada exitosamente
 *       404:
 *         description: Venta no encontrada
 */
router.get('/:id', saleController.getById);
router.put('/:id', saleController.update);
router.delete('/:id', saleController.delete);

module.exports = router;