// backend/utils/cronJobs.js
import { CronJob } from 'cron';
import dotenv from 'dotenv';

import Bill        from '../models/Bill.js';
import Budget      from '../models/Budget.js';
import Transaction from '../models/Transaction.js';
import Debt        from '../models/Debt.js';
import CreditLine  from '../models/CreditLine.js';

import { sendEmail } from './mailer.js';

dotenv.config();

const REMINDER_DAYS = Number(process.env.REMINDER_DAYS || 3);
const USER_EMAIL    = process.env.USER_EMAIL || 'demo@neo.com';

export const scheduleJobs = () => {
  //
  // ⏰ Daily reminders & overshoot alerts
  //
  new CronJob('0 7 * * *', async () => {
    const now = new Date();
    const remindDate = new Date(now);
    remindDate.setDate(remindDate.getDate() + REMINDER_DAYS);

    // 1) Bill reminders
    const upcoming = await Bill.find({
      dueDate:  { $gte: now, $lte: remindDate },
      reminded: false
    });
    for (let bill of upcoming) {
      await sendEmail(
        USER_EMAIL,
        `Upcoming Bill: ${bill.name}`,
        `Your bill "${bill.name}" of amount ${bill.amount} is due on ${bill.dueDate.toDateString()}.`
      );
      bill.reminded = true;
      await bill.save();
    }

    // 2) Budget overshoot
    const budgets = await Budget.find();
    for (let b of budgets) {
      const agg = await Transaction.aggregate([
        { $match:    { category: b.category } },
        { $group:    { _id: null, spent: { $sum: '$amount' } } }
      ]);
      const spent = agg[0]?.spent || 0;
      if (spent > b.amount) {
        await sendEmail(
          USER_EMAIL,
          `Budget Exceeded: ${b.category}`,
          `You’ve spent ${spent} which exceeds your budget of ${b.amount} for "${b.category}".`
        );
      }
    }
  }).start();


  //
  // ⏰ Monthly interest & statements (1st of each month at 06:00)
  //
  new CronJob('0 6 1 * *', async () => {
    const today = new Date();

    // 1) Debt interest accrual & reminders
    const debts = await Debt.find();
    for (let d of debts) {
      // accrue monthly interest
      const monthlyRate = d.interestRate / 12 / 100;
      d.outstanding += d.outstanding * monthlyRate;
      await d.save();

      // send payment reminder
      await sendEmail(
        USER_EMAIL,
        `Debt Payment Due: ${d.name}`,
        `Your monthly payment of ${d.monthlyPayment.toFixed(2)} is due soon. Current balance: ${d.outstanding.toFixed(2)}.`
      );
    }

    // 2) Credit‐line monthly statements
    const credits = await CreditLine.find();
    for (let c of credits) {
      // send statement
      await sendEmail(
        USER_EMAIL,
        `Credit Line Statement: ${c.name}`,
        `Your current used balance is ${c.balanceUsed.toFixed(2)} on a limit of ${c.limit}.`
      );
      // optionally, reset c.balanceUsed = 0 if your cycle resets here
      // c.balanceUsed = 0;
      // await c.save();
    }
  }).start();
};
