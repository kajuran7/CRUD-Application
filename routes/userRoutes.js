const express = require('express');
const router = express.Router();
const { 
    loginUser, 
    getUsers, 
    getUser, 
    createUser, 
    updateUser, 
    deleteUser 
} = require('../controllers/userController');
const authMiddleware = require('../authMiddleware');

// Public Routes
router.post('/login', loginUser); // User Login
router.post('/', createUser);     // User Registration
router.get('/', getUsers);        // Get all users
router.get('/:id', getUser);      // Get single user
router.put('/:id', updateUser);   // Update user
router.delete('/:id', deleteUser); // Delete user
// Protected Routes
router.use(authMiddleware); // All routes below require authentication



module.exports = router;
