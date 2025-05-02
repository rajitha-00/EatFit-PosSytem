// routes/orders.js
const express = require('express');
const router = express.Router();
const {
    placeOrder,
    getAllOrders,
    getPreparingOrders,
    updateOrderStatus
} = require('../controllers/orderCtrl');

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
 *               orderStatus:
 *                 type: string
 *                 example: Pending
 *               totalPrice:
 *                 type: number
 *                 example: 19.99
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     menuItemId:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *                     selectedAddons:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           ingredientId:
 *                             type: integer
 *                             example: 3
 *                           quantity:
 *                             type: integer
 *                             example: 2
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
 *                   orderStatus:
 *                     type: string
 *                   totalPrice:
 *                     type: number
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
 *                         selectedAddons:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               ingredientId:
 *                                 type: integer
 *                               quantity:
 *                                 type: integer
 */
router.get('/', getAllOrders);

/**
 * @swagger
 * /orders/preparing:
 *   get:
 *     summary: Get all orders with status "Preparing"
 *     responses:
 *       200:
 *         description: A list of preparing orders
 */
router.get('/preparing', getPreparingOrders);

/**
 * @swagger
 * /orders/{id}/status:
 *   patch:
 *     summary: Update the status of an order
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderStatus:
 *                 type: string
 *                 example: Completed
 *     responses:
 *       200:
 *         description: Order status updated
 */
router.patch('/:id/status', updateOrderStatus);

module.exports = router;