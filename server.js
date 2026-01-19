const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const connectDB = require('./config/db');
const contactRoutes = require('./routes/contactRoutes');
const globalErrorHandler = require('./utils/globalErrorMiddleware');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: '*',
}));
app.use(express.json());

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));


// Contact form routes
app.use('/api/contact', contactRoutes);

// Serve the contact form UI on base route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404 - Not Found Route Handler
app.all('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Global Error Middleware (Must be last)
app.use(globalErrorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
