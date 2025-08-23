// controllers/paymentCtrl.js
const crypto = require("crypto");

// Handle Payment Gateway Callback
exports.handleCallback = (req, res) => {
    try {
        const payload = req.body;
        const receivedToken = req.headers["x-callback-token"]; // Onepay might send token in headers

        // ✅ Load your callback token from environment (.env)
        const validToken = process.env.ONEPAY_CALLBACK_TOKEN;

        // Verify token
        if (!receivedToken || receivedToken !== validToken) {
            return res.status(401).json({ message: "Invalid callback token" });
        }

        // Example: Update order/payment status in DB
        const { transactionId, status, amount, orderId } = payload;

        console.log("Received payment callback:", payload);

        // TODO: Update your DB order status here (Order.findByIdAndUpdate etc.)
        // Example:
        // await Order.findByIdAndUpdate(orderId, { status, transactionId, amount });

        return res.status(200).json({ message: "Callback processed successfully" });
    } catch (error) {
        console.error("Error in callback:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
