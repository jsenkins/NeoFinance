import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Transaction from './models/Transaction.js';
import Budget     from './models/Budget.js';
import Contact    from './models/Contact.js';

dotenv.config();
(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Transaction.deleteMany();
  await Budget.deleteMany();
  await Contact.deleteMany();

  await Transaction.create([
    { type:'income',  category:'Salary',   amount:5000 },
    { type:'expense', category:'Groceries',amount:150  },
    { type:'expense', category:'Rent',     amount:1200 },
    { type:'expense', category:'Utilities',amount:200  },
    { type:'income',  category:'Freelance',amount:800  }
  ]);

  await Budget.create([
    { category:'Groceries', amount:300 },
    { category:'Rent',      amount:1200 }
  ]);

  await Contact.create({
    name:'Lahore Office',
    email:'office@neo.com',
    phone:'+923001234567',
    location:{ coordinates:[74.3587,31.5204] }
  });

  await CreditLine.create({
    name: 'Visa Platinum',
    limit: 5000,
    balanceUsed: 1500,
    interestRate: 18,
    cycleDate: 5
  });

  console.log('✅ Seed complete');
  process.exit();
})();
