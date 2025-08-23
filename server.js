require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Init Express App
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Swagger Setup
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'POS Inventory API',
            version: '1.0.0',
            description: 'API documentation for POS system with ingredient-based inventory'
        },
        servers: [
            {
                url: 'https://eatfit-possytem-production.up.railway.app/api'
            }
        ]
    },
    apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB error:', err));

// Routes
const ingRouter = require('./routes/ingredients');
const miRouter = require('./routes/menuItems');
const ordRouter = require('./routes/orders');
const paymentRoutes = require("./routes/payments");

app.use('/api/ingredients', ingRouter);
app.use('/api/menu-items', miRouter);
app.use('/api/orders', ordRouter);
app.use("/api/payments", paymentRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
