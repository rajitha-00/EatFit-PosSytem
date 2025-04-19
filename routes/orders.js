// routes/orders.js
const express = require('express');
const router = express.Router();
const { placeOrder, getAllOrders } = require('../controllers/orderCtrl');

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
 *               customerName:
 *                 type: string
 *                 example: John Doe
 *               customerPhone:
 *                 type: string
 *                 example: 0771234567
 *               orderType:
 *                 type: string
 *                 example: Takeaway
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

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     responses:
 *       200:
 *         description: A list of all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   customerName:
 *                     type: string
 *                   customerPhone:
 *                     type: string
 *                   orderType:
 *                     type: string
 *                   orderDate:
 *                     type: string
 *                     format: date-time
 *                   items:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         menuItemId:
 *                           type: integer
 *                         quantity:
 *                           type: integer
 *                         selectedAddonIngredientIds:
 *                           type: array
 *                           items:
 *                             type: integer
 */
router.get('/', getAllOrders);

module.exports = router;