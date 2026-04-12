const express = require('express');
const router = express.Router();
const providerController = require('../controllers/ProviderController');

/**
 * @swagger
 * tags:
 *   - name: Proveedores
 *     description: Gestión de proveedores y abastecimiento
 */

/**
 * @swagger
 * /api/providers:
 *   get:
 *     summary: Obtiene todos los proveedores
 *     tags: [Proveedores]
 *     responses:
 *       200:
 *         description: Lista de proveedores obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   email:
 *                     type: string
 *                   city:
 *                     type: string
 *   post:
 *     summary: Crea un nuevo proveedor
 *     tags: [Proveedores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Distribuidora Norte
 *               phone:
 *                 type: string
 *                 example: '+56912345678'
 *               email:
 *                 type: string
 *                 format: email
 *                 example: contacto@norte.cl
 *               city:
 *                 type: string
 *                 example: Santiago
 *     responses:
 *       201:
 *         description: Proveedor creado exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.get('/', providerController.getAll);
router.post('/', providerController.create);

/**
 * @swagger
 * /api/providers/{id}:
 *   get:
 *     summary: Obtiene un proveedor por ID
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del proveedor
 *     responses:
 *       200:
 *         description: Proveedor encontrado
 *       404:
 *         description: Proveedor no encontrado
 *   put:
 *     summary: Actualiza un proveedor existente
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del proveedor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               city:
 *                 type: string
 *     responses:
 *       200:
 *         description: Proveedor actualizado exitosamente
 *       404:
 *         description: Proveedor no encontrado
 *   delete:
 *     summary: Elimina un proveedor
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del proveedor
 *     responses:
 *       200:
 *         description: Proveedor eliminado exitosamente
 *       404:
 *         description: Proveedor no encontrado
 */
router.get('/:id', providerController.getById);
router.put('/:id', providerController.update);
router.delete('/:id', providerController.delete);

module.exports = router;