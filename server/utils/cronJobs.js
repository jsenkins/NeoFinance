// backend/utils/cronJobs.js
import { CronJob } from 'cron';
import dotenv from 'dotenv';
import dayjs from 'dayjs';
import User from '../models/User.js';
import Bill from '../models/Bill.js';
import Budget from '../models/Budget.js';
import Transaction from '../models/Transaction.js'; // still needed for percent calc if you prefer
import Debt from '../models/Debt.js';
import CreditLine from '../models/CreditLine.js';
import { sendEmail } from './mailer.js';

dotenv.config();
const REMINDER_DAYS = Number(process.env.REMINDER_DAYS || 3);

export const scheduleJobs = () => {
  /* ───────── 1. daily 07:00 reminders ───────── */
  new CronJob(
    '0 7 * * *',
    async () => {
      const now = dayjs();
      const remindDate = now.add(REMINDER_DAYS, 'day').endOf('day');

      const users = await User.find();

      for (const u of users) {
        /* ------- upcoming bills ------- */
        const upcoming = await Bill.find({
          user: u._id,
          dueDate: { $gte: now.toDate(), $lte: remindDate.toDate() },
          reminded: false,
        });

        for (const bill of upcoming) {
          await sendEmail(
            u.email,
            `Upcoming Bill: ${bill.name}`,
            `Your bill "${bill.name}" of amount ${bill.amount} is due on ${dayjs(
              bill.dueDate,
            ).format('DD MMM, YYYY')}.`,
          );
          bill.reminded = true;
          await bill.save();
        }

        /* ------- budget overshoot ------- */
        const budgets = await Budget.find({ user: u._id });

        for (const b of budgets) {
          // NEW: use stored 'spent' value (faster)
          if (b.spent > b.amount) {
            await sendEmail(
              u.email,
              `Budget Exceeded: ${b.category}`,
              `You've spent ${b.spent.toFixed(
                2,
              )}, exceeding your ${b.period} budget of ${b.amount.toFixed(
                2,
              )} for "${b.category}".`,
            );
          }
        }
      }
    },
    null,
    true,
    'Asia/Karachi', // ensure correct TZ
  );

  /* ───────── 2. monthly 06:00 on day‑1 debt interest + credit statement ───────── */
  new CronJob(
    '0 6 1 * *',
    async () => {
      const users = await User.find();

      for (const u of users) {
        /* debts */
        const debts = await Debt.find({ user: u._id });
        for (const d of debts) {
          const monthlyRate = d.interestRate / 12 / 100;
          d.outstanding = Number(
            ((d.outstanding + d.outstanding * monthlyRate) * 100).toFixed(0),
          ) / 100; // round to cents
          await d.save();

          await sendEmail(
            u.email,
            `Debt Payment Due: ${d.name}`,
            `Your payment of ${d.monthlyPayment.toFixed(
              2,
            )} is due.\nCurrent balance: ${d.outstanding.toFixed(2)}.`,
          );
        }

        /* credit lines */
        const credits = await CreditLine.find({ user: u._id });
        for (const c of credits) {
          await sendEmail(
            u.email,
            `Credit Line Statement: ${c.name}`,
            `Current used balance: ${c.balanceUsed.toFixed(
              2,
            )} / ${c.limit.toFixed(2)}.`,
          );
        }
      }
    },
    null,
    true,
    'Asia/Karachi',
  );

  /* ───────── 3. reset spent counters (00:05 daily) ───────── */
  new CronJob(
    '5 0 * * *',
    async () => {
      const now = dayjs();

      if (now.date() === 1) {
        await Budget.updateMany({ period: 'monthly' }, { spent: 0 });
      }
      if (now.format('MM-DD') === '01-01') {
        await Budget.updateMany({ period: 'yearly' }, { spent: 0 });
      }
    },
    null,
    true,
    'Asia/Karachi',
  );
};
