const Item = require('../models/Item');

// Get all items
const getItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single item by ID
const getItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new item
const createItem = async (req, res) => {
    const { name, description, quantity } = req.body;

    // Simple validation
    if (!name || name.length < 3) {
        return res.status(400).json({ message: 'Name is required and must be at least 3 characters long.' });
    }
    if (quantity == null || quantity < 1) {
        return res.status(400).json({ message: 'Quantity is required and must be at least 1.' });
    }

    try {
        const newItem = new Item({ name, description, quantity });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update item by ID
const updateItem = async (req, res) => {
    const { name, description, quantity } = req.body;

    // Simple validation
    if (name && name.length < 3) {
        return res.status(400).json({ message: 'Name must be at least 3 characters long.' });
    }
    if (quantity != null && quantity < 1) {
        return res.status(400).json({ message: 'Quantity must be at least 1.' });
    }

    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete item by ID
const deleteItem = async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
