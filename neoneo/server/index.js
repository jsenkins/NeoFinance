import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import transactionRoutes from './routes/transactions.js';
import budgetRoutes from './routes/budgets.js';
import contactRoutes from './routes/contacts.js';
import exportRoutes from './routes/export.js';
import { scheduleJobs } from './utils/cronJobs.js';
import billRoutes from './routes/bills.js';
import financeRoutes from './routes/finance.js';

const app = express();
app.use(cors());
app.use(express.json());

connectDB();
scheduleJobs();

app.get('/', (_req, res) => {
    res.send('🟢 Neo Finance API is up and running!');
  });

app.use('/api/transactions', transactionRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/export', exportRoutes);
app.use('/api/bills',        billRoutes); 
app.use('/api/finance', financeRoutes);

app.listen(5000, () => console.log('🚀 Backend running at http://localhost:5000'));
