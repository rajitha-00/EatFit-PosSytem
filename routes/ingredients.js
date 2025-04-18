// routes/ingredients.js
const express = require('express');
const router = express.Router();
const {
    createIngredient,
    getAllIngredients,
    getIngredientById,
    updateIngredient,
    deleteIngredient,
    getLowStockIngredients
} = require('../controllers/ingredientCtrl');

/**
 * @swagger
 * /ingredients:
 *   get:
 *     summary: Get all ingredients
 *     responses:
 *       200:
 *         description: A list of ingredients
 */
router.get('/', getAllIngredients);

/**
 * @swagger
 * /ingredients:
 *   post:
 *     summary: Create a new ingredient
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
 *               availableQuantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Ingredient created
 */
router.post('/', createIngredient);

/**
 * @swagger
 * /ingredients/{id}:
 *   get:
 *     summary: Get ingredient by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: A single ingredient
 */
router.get('/:id', getIngredientById);

/**
 * @swagger
 * /ingredients/{id}:
 *   put:
 *     summary: Update ingredient by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Ingredient updated
 */
router.put('/:id', updateIngredient);

/**
 * @swagger
 * /ingredients/{id}:
 *   delete:
 *     summary: Delete ingredient by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       204:
 *         description: Ingredient deleted
 */
router.delete('/:id', deleteIngredient);

/**
 * @swagger
 * /ingredients/low-stock:
 *   get:
 *     summary: Get all ingredients that are low in stock
 *     description: Returns ingredients whose available quantity is less than or equal to their defined threshold.
 *     responses:
 *       200:
 *         description: A list of low-stock ingredients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: Oats
 *                   availableQuantity:
 *                     type: integer
 *                     example: 3
 *       500:
 *         description: Server error
 */
router.get('/low-stock', getLowStockIngredients);

module.exports = router;
