// backend/seed.js
import mongoose from 'mongoose';
import dotenv  from 'dotenv';

import User        from './models/User.js';
import Transaction from './models/Transaction.js';
import Budget      from './models/Budget.js';
import Contact     from './models/Contact.js';
import Bill        from './models/Bill.js';
import Debt        from './models/Debt.js';
import CreditLine  from './models/CreditLine.js';

dotenv.config();

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('🗄️ Connected to Mongo');

  // 1) Clear everything
  await User.deleteMany();
  await Transaction.deleteMany();
  await Budget.deleteMany();
  await Contact.deleteMany();
  await Bill.deleteMany();
  await Debt.deleteMany();
  await CreditLine.deleteMany();

  // 2) Create demo user
  const demo = await User.create({
    email: 'demo@neo.com',
    password: 'password123'
  });
  console.log('👤 Demo user created:', demo.email);

  // 3) Seed Transactions
  await Transaction.create([
    { user: demo._id, type:'income',  category:'Salary',   amount:5000 },
    { user: demo._id, type:'expense', category:'Groceries',amount:150  },
    { user: demo._id, type:'expense', category:'Rent',     amount:1200 },
    { user: demo._id, type:'expense', category:'Utilities',amount:200  },
    { user: demo._id, type:'income',  category:'Freelance',amount:800  }
  ]);

  // 4) Seed Budgets
  await Budget.create([
    { user: demo._id, category:'Groceries', amount:300 },
    { user: demo._id, category:'Rent',      amount:1200 }
  ]);

  // 5) Seed Contact
  await Contact.create({
    user: demo._id,
    name:'Lahore Office',
    email:'office@neo.com',
    phone:'+923001234567',
    location:{ coordinates:[74.3587,31.5204] }
  });

  // 6) Seed Bills
  await Bill.create([
    { user: demo._id, name:'Electricity', amount:100, dueDate: new Date(Date.now()+7*24*60*60*1000) },
    { user: demo._id, name:'Internet',    amount:50,  dueDate: new Date(Date.now()+5*24*60*60*1000) }
  ]);

  // 7) Seed Debts
  await Debt.create({
    user:          demo._id,
    name:          'Car Loan',
    principal:     20000,
    interestRate:  5,
    termMonths:    60,
    monthlyPayment: 377,
    outstanding:   20000
  });

  // 8) Seed CreditLines
  await CreditLine.create({
    user:         demo._id,
    name:         'Visa Platinum',
    limit:        5000,
    balanceUsed:  1500,
    interestRate: 18,
    cycleDate:    5
  });

  console.log('✅ Seeding complete');
  process.exit();
})();
