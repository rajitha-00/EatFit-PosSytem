// routes/orders.js
const express = require('express');
const router = express.Router();
const { placeOrder } = require('../controllers/orderCtrl');

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Place a new order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     menuItemId:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *                     selectedAddonIngredientIds:
 *                       type: array
 *                       items:
 *                         type: integer
 *     responses:
 *       201:
 *         description: Order placed
 */
router.post('/', placeOrder);

module.exports = router;
