// models/Order.js
const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
    menuItemId: { type: Number, required: true },
    quantity: { type: Number, required: true },
    selectedAddonIngredientIds: { type: [Number], default: [] }
}, { _id: false });

const OrderSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    orderType: { type: String, required: true },
    items: { type: [OrderItemSchema], required: true },
    orderDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
