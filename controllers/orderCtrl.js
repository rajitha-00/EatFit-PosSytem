const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const Ingredient = require('../models/Ingredient');

exports.placeOrder = async (req, res) => {
    const { customerName, customerPhone, orderType, orderStatus, totalPrice, items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'Order must have at least one item' });
    }

    try {
        for (const orderItem of items) {
            const menuItem = await MenuItem.findById(orderItem.menuItemId);
            if (!menuItem) {
                return res.status(404).json({ error: `Menu item ${orderItem.menuItemId} not found` });
            }

            // Deduct base ingredients
            for (const mi of menuItem.ingredients) {
                const qty = mi.quantityNeeded * orderItem.quantity;
                await Ingredient.findByIdAndUpdate(mi.ingredientId, { $inc: { availableQuantity: -qty } });
            }

            // Deduct addon ingredients based on user-selected quantities
            for (const selectedAddon of orderItem.selectedAddons || []) {
                const addon = menuItem.addons.find(a => a.ingredientId === selectedAddon.ingredientId);
                if (addon) {
                    const totalQty = addon.quantityNeeded * selectedAddon.quantity;
                    await Ingredient.findByIdAndUpdate(selectedAddon.ingredientId, { $inc: { availableQuantity: -totalQty } });
                }
            }
        }

        // Save order with client-provided totalPrice
        const order = new Order({
            customerName,
            customerPhone,
            orderType,
            orderStatus,
            totalPrice,
            items
        });

        await order.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllOrders = async (_req, res) => {
    try {
        const orders = await Order.find().sort({ orderDate: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getPreparingOrders = async (_req, res) => {
    try {
        const preparingOrders = await Order.find({ orderStatus: "Preparing" }).sort({ orderDate: -1 });
        res.json(preparingOrders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { orderStatus } = req.body;

    try {
        const updatedOrder = await Order.findByIdAndUpdate(id, { orderStatus }, { new: true });
        if (!updatedOrder) return res.status(404).json({ error: 'Order not found' });
        res.json(updatedOrder);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


