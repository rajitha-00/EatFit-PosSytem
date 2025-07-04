// controllers/menuItemCtrl.js
const MenuItem = require('../models/MenuItem');
const path = require('path');
const uploadToCloudinaryBuffer = require("../utils/cloudinaryUploader");
const fs = require('fs');
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

exports.upload = upload.single('image');

exports.uploadImageOnly = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No image file provided' });

        const imageUrl = await uploadToCloudinaryBuffer(req.file.buffer);

        res.status(200).json({ imageUrl });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createMenuItem = async (req, res) => {
    try {

        const menuItemData = {
            ...req.body,
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
