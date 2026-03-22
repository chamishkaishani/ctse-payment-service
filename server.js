require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const paymentRoutes = require('./routes/paymentRoutes');

connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());

app.get('/health', (req, res) => {
  return res.json({ status: 'ok', service: 'payment-service', timestamp: new Date().toISOString() });
});

app.use('/payments', paymentRoutes);

app.use((req, res) => {
  return res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.message);
  return res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
  console.log(`Payment Service running on http://localhost:${PORT}`);
});
