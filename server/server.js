const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());

// API routes
app.use('/api/documents', require('./routes/documents'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
    });
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
