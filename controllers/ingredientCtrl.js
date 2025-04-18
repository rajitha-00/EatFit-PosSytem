// controllers/ingredientCtrl.js
const Ingredient = require('../models/Ingredient');

exports.createIngredient = async (req, res) => {
    try {
        const ingredient = new Ingredient(req.body);
        await ingredient.save();
        res.status(201).json(ingredient);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllIngredients = async (_req, res) => {
    try {
        const ingredients = await Ingredient.find();
        res.json(ingredients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getIngredientById = async (req, res) => {
    try {
        const ingredient = await Ingredient.findById(req.params.id);
        if (!ingredient) return res.status(404).json({ error: 'Ingredient not found' });
        res.json(ingredient);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateIngredient = async (req, res) => {
    try {
        const ingredient = await Ingredient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!ingredient) return res.status(404).json({ error: 'Ingredient not found' });
        res.json(ingredient);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteIngredient = async (req, res) => {
    try {
        const ingredient = await Ingredient.findByIdAndDelete(req.params.id);
        if (!ingredient) return res.status(404).json({ error: 'Ingredient not found' });
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getLowStockIngredients = async (_req, res) => {
    try {
        const lowStock = await Ingredient.find({
            $expr: { $lte: ["$availableQuantity", "$lowStockThreshold"] }
        }).select('name availableQuantity');

        res.json(lowStock);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};