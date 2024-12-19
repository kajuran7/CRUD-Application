const express = require('express');
const router = express.Router();
const {
    getOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder,
} = require('../controllers/orderController');

// Get all orders
router.get('/', getOrders);

// Get single order by ID
router.get('/:id', getOrder);

// Create new order
router.post('/', createOrder);

// Update order by ID
router.put('/:id', updateOrder);

// Delete order by ID
router.delete('/:id', deleteOrder);

module.exports = router;
