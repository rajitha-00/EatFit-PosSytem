// controllers/menuItemCtrl.js
const MenuItem = require('../models/MenuItem');
const multer = require('multer');
const path = require('path');
const uploadToCloudinary = require("../utils/cloudinaryUploader");
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

exports.upload = upload.single('image'); // Middleware

exports.createMenuItem = async (req, res) => {
    try {
        let imageUrl = '';
        if (req.file) {
            imageUrl = await uploadToCloudinary(req.file.path);
            fs.unlinkSync(req.file.path); // Delete local file
        }

        const menuItemData = {
            ...req.body,
            imageUrl
        };

        const menuItem = new MenuItem(menuItemData);
        await menuItem.save();
        res.status(201).json(menuItem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllMenuItems = async (_req, res) => {
    try {
        const items = await MenuItem.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getMenuItemById = async (req, res) => {
    try {
        const item = await MenuItem.findById(req.params.id);
        if (!item) return res.status(404).json({ error: 'Menu item not found' });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateMenuItem = async (req, res) => {
    try {
        const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!item) return res.status(404).json({ error: 'Menu item not found' });
        res.json(item);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteMenuItem = async (req, res) => {
    try {
        const item = await MenuItem.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ error: 'Menu item not found' });
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
