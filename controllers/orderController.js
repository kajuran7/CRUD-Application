const Order = require('../models/order');
const Item = require('../models/Item');

// Create a new order
const createOrder = async (req, res) => {
    try {
        const { user, items } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'Items are required to create an order.' });
        }

        // Calculate totalAmount
        let totalAmount = 0;
        for (const orderItem of items) {
            const item = await Item.findById(orderItem.item);
            if (!item) {
                return res.status(404).json({ message: `Item with ID ${orderItem.item} not found.` });
            }
            totalAmount += orderItem.quantity * item.quantity; // Assuming item.quantity is its price
        }

        // Create a new order
        const newOrder = new Order({
            user,
            items,
            totalAmount,
        });

        await newOrder.save();
        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all orders
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user').populate('items.item');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get an order by ID
const getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user').populate('items.item');
        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an order
const updateOrder = async (req, res) => {
    const { status } = req.body;

    // Ensure only the status can be updated
    if (!status) {
        return res.status(400).json({ message: 'Status is required to update the order.' });
    }

    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an order
const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found.' });
        }
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createOrder, getOrders, getOrder, updateOrder, deleteOrder };
