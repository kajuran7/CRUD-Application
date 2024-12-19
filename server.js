// Server entry point
require('dotenv').config();
const app = require('../crud-backend/app');
const connectDB = require('../crud-backend/db');

const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
