
import React, { useMemo } from 'react';
import { useGetTransactionsQuery } from '../store/api';
import { DoughnutChart } from '../components/Chart';
import TransactionForm from '../components/TransactionForm';

function StatCard({ title, amount, icon: Icon }) {
  return (
    <div className=" bg-[#0c3e43] rounded-xl p-6 shadow-sm border border-base-200 text-white">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Icon className="w-6 h-6 text-primary  " style={{ color: '#72757c' }} />
        </div>
        <div>
          <p className="text-sm text-base-content/70">{title}</p>
          <p className="text-2xl font-semibold">
            ${amount?.toLocaleString() ?? '0'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { data: transactions = [], isLoading } = useGetTransactionsQuery();

  const stats = useMemo(() => {
    const total = transactions.reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    return { total, expenses, income };
  }, [transactions]);

  const doughnutData = useMemo(() => ({
    labels: ['Income', 'Expenses'],
    datasets: [{
      data: [stats.income, Math.abs(stats.expenses)],
      backgroundColor: ['#0c3e43', '#72757c'],
      borderWidth: 0
    }]
  }), [stats]);

  const doughnutOptions = {
    plugins: {
      legend: { position: 'bottom' }
    },
    cutout: '60%'
  };

  return (
    <div className=" bg-[#001e30] space-y-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          title="Total Balance"
          amount={stats.total}
          icon={(props) => (
            <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
            </svg>
          )}
        />
        <StatCard
          title="Monthly Expenses"
          amount={Math.abs(stats.expenses)}
          icon={(props) => (
            <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" />
            </svg>
          )}
        />
        <StatCard
          title="Monthly Income"
          amount={stats.income}
          icon={(props) => (
            <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.17-.879-1.17-2.303 0-3.182C10.536 7.719 11.768 7.5 12 7.5c.725 0 1.45.22 2.003.659" />
            </svg>
          )}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-white">
        <div className="bg-[#0a2634] rounded-xl p-6 shadow-sm border border-base-200">
          <h3 className="text-lg font-semibold mb-6">Income vs Expenses</h3>
          {isLoading ? (
            <div className="flex items-center justify-center h-[300px]">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : (
            <DoughnutChart data={doughnutData} options={doughnutOptions} />
          )}
        </div>

        <div className="rounded-xl p-6 shadow-sm border border-base-200">
          <h3 className="text-lg font-semibold mb-6">Add a new Transaction</h3>
          <TransactionForm />
        </div>
      </div>
    </div>
  );
}
