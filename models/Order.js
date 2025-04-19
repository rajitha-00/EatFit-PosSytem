// models/Order.js
const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
    menuItemId: { type: Number, required: true },
    quantity: { type: Number, required: true },
    selectedAddonIngredientIds: { type: [Number], default: [] },
    OderType: { type: String, required: true }
}, { _id: false });

const OrderSchema = new mongoose.Schema({
    items: { type: [OrderItemSchema], required: true },
    orderDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
