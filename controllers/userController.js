const User = require('../models/user'); // Use 'User' as the correct variable
const bcrypt = require('bcryptjs');
const { generateToken } = require('../jwt');

// User Login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email }); // Use 'User' here
        if (!user) return res.status(401).json({ message: 'Invalid email or password' });

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Invalid email or password' });

        // Generate JWT token
        const token = generateToken(user._id);
        res.status(200).json({ 
            message: 'Login successful',
            token, 
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all Users
const getUsers = async (req, res) => {
    try {
        const users = await User.find(); // Use 'User' here
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single user by ID
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id); // Use 'User' here
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new user
const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const newUser = new User({ name, email, password }); // Use 'User' here
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update user by ID
const updateUser = async (req, res) => {
    const { name } = req.body;

    if (name && name.length < 3) {
        return res.status(400).json({ message: 'Name must be at least 3 characters long.' });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete user by ID
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser, loginUser };
