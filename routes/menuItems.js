// routes/menuItems.js
const express = require('express');
const router = express.Router();
const {
    createMenuItem,
    getAllMenuItems,
    getMenuItemById,
    updateMenuItem,
    deleteMenuItem
} = require('../controllers/menuItemCtrl');

/**
 * @swagger
 * /menu-items:
 *   get:
 *     summary: Get all menu items
 *     responses:
 *       200:
 *         description: A list of menu items
 */
router.get('/', getAllMenuItems);

/**
 * @swagger
 * /menu-items:
 *   post:
 *     summary: Create a new menu item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     ingredientId:
 *                       type: integer
 *                       example: 1
 *                     quantityNeeded:
 *                       type: integer
 *                       example: 2
 *               addons:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     ingredientId:
 *                       type: integer
 *                       example: 3
 *                     quantityNeeded:
 *                       type: integer
 *                       example: 1
 *                     price:
 *                       type: number
 *                       example: 0.50
 *     responses:
 *       201:
 *         description: Menu item created
 */
router.post('/', createMenuItem);

/**
 * @swagger
 * /menu-items/{id}:
 *   get:
 *     summary: Get menu item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: A single menu item
 */
router.get('/:id', getMenuItemById);

/**
 * @swagger
 * /menu-items/{id}:
 *   put:
 *     summary: Update menu item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Oatmeal Delight
 *               description:
 *                 type: string
 *                 example: Warm oats with toppings
 *               price:
 *                 type: number
 *                 example: 5.99
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     ingredientId:
 *                       type: integer
 *                       example: 1
 *                     quantityNeeded:
 *                       type: integer
 *                       example: 2
 *               addons:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     ingredientId:
 *                       type: integer
 *                       example: 3
 *                     quantityNeeded:
 *                       type: integer
 *                       example: 1
 *                     price:
 *                       type: number
 *                       example: 0.50
 *     responses:
 *       200:
 *         description: Menu item updated
 */
router.put('/:id', updateMenuItem);

/**
 * @swagger
 * /menu-items/{id}:
 *   delete:
 *     summary: Delete menu item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       204:
 *         description: Menu item deleted
 */
router.delete('/:id', deleteMenuItem);

module.exports = router;