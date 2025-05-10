const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const Ingredient = require('../models/Ingredient');
const Counter = require('../models/Counter');

async function getNextOrderId() {
    const counter = await Counter.findByIdAndUpdate(
        'autoOrderId',
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );
    const number = counter.seq.toString().padStart(3, '0');
    return `OD-${number}`;
}

exports.placeOrder = async (req, res) => {
    const { orderId: clientOrderId, customerName, customerPhone, orderType, orderStatus, totalPrice, items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'Order must have at least one item' });
    }

    try {
        // Validate or generate orderId
        const specialTypes = ["Uber Delivery", "Pick Me Delivery", "Pick Me Pickup"];
        let orderId;

        if (specialTypes.includes(orderType)) {
            if (!clientOrderId) {
                return res.status(400).json({ error: 'orderId is required for Uber or Pick Me orders' });
            }
            orderId = clientOrderId;
        } else {
            orderId = await getNextOrderId();
        }

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

            // Deduct addon ingredients
            for (const selectedAddon of orderItem.selectedAddons || []) {
                const addon = menuItem.addons.find(a => a.ingredientId === selectedAddon.ingredientId);
                if (addon) {
                    const totalQty = addon.quantityNeeded * selectedAddon.quantity;
                    await Ingredient.findByIdAndUpdate(selectedAddon.ingredientId, { $inc: { availableQuantity: -totalQty } });
                }
            }
        }

        // Save order
        const order = new Order({
            OrderId: orderId, // ✅ Note: matches your schema field name
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


