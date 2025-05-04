// backend/index.js
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { scheduleJobs } from './utils/cronJobs.js';

import transactionRoutes from './routes/transactions.js';
import budgetRoutes      from './routes/budgets.js';
import contactRoutes     from './routes/contacts.js';
import exportRoutes      from './routes/export.js';
import billRoutes        from './routes/bills.js';
import financeRoutes     from './routes/finance.js';
import authRoutes        from './routes/auth.js';

import { protect } from './middleware/auth.js';

const app = express();
app.use(cors());
app.use(express.json());

/* ───────────── connect DB, then start jobs & server ───────────── */
(async () => {
  try {
    await connectDB();             // ← await the promise
    console.log('🗄️  MongoDB connected');

    scheduleJobs();                // ← safe to start cron tasks
    console.log('⏰ Cron jobs scheduled');

    /* ───── routes ───── */
    app.get('/', (_req, res) =>
      res.send('🟢 Neo Finance API is up and running!'),
    );

    app.use('/api/auth',         authRoutes);
    app.use('/api/transactions', protect, transactionRoutes);
    app.use('/api/budgets',      protect, budgetRoutes);
    app.use('/api/contacts',     protect, contactRoutes);
    app.use('/api/bills',        protect, billRoutes);
    app.use('/api/finance',      protect, financeRoutes);
    app.use('/api/export',       protect, exportRoutes);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Backend running at http://localhost:${PORT}`),
    );
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
})();
