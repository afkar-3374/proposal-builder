// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // <-- CORS import
const proposalRoutes = require('./routes/proposals');

const app = express();

// ====== Middleware ======
app.use(cors()); // <-- enable CORS for all origins
app.use(express.json());

// ====== Routes ======
app.use('/api/proposals', proposalRoutes);

// ====== MongoDB Connection ======
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/proposal-builder";

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ====== Start Server ======
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});