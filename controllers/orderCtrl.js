// controllers/orderCtrl.js
const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const Ingredient = require('../models/Ingredient');

exports.placeOrder = async (req, res) => {
    const { items } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'Order must have at least one item' });
    }
    try {
        // Deduct inventory
        for (const orderItem of items) {
            const menuItem = await MenuItem.findById(orderItem.menuItemId);
            if (!menuItem) {
                return res.status(404).json({ error: `Menu item ${orderItem.menuItemId} not found` });
            }
            // Base ingredients
            for (const mi of menuItem.ingredients) {
                const qty = mi.quantityNeeded * orderItem.quantity;
                await Ingredient.findByIdAndUpdate(mi.ingredientId, { $inc: { availableQuantity: -qty } });
            }
            // Addons
            for (const addonId of (orderItem.selectedAddonIngredientIds || [])) {
                const addon = menuItem.addons.find(a => a.ingredientId === addonId);
                if (addon) {
                    const qty = addon.quantityNeeded * orderItem.quantity;
                    await Ingredient.findByIdAndUpdate(addonId, { $inc: { availableQuantity: -qty } });
                }
            }
        }
        // Save order
        const order = new Order({ items });
        await order.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
