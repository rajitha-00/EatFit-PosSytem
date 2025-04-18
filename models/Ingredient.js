// models/Ingredient.js
const mongoose = require('mongoose');
const getNextSequence = require('../utils/getNextSequence');

const IngredientSchema = new mongoose.Schema({
    _id: { type: Number },
    name: { type: String, required: true },
    description: { type: String },
    availableQuantity: { type: Number, default: 0 },
    lowStockThreshold: { type: Number, default: 5 }  // 🔥 New field
}, { _id: false });


IngredientSchema.pre('save', async function(next) {
    if (this.isNew) this._id = await getNextSequence('ingredientId');
    next();
});

module.exports = mongoose.model('Ingredient', IngredientSchema);
