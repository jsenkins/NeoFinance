
import React, { useState } from 'react';
import TransactionForm from '../components/TransactionForm';
import { useGetTransactionsQuery, useSearchTransactionsQuery } from '../store/api';

export default function Transactions() {
  const [q, setQ] = useState('');
  const { data: txs = [] } = useGetTransactionsQuery();
  const { data: s = [] } = useSearchTransactionsQuery(q, { skip: !q });
  const list = q ? s : txs;

  return (
    <div className=" bg-[#001e30] text-white space-y-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-semibold">Transactions</h2>
        <div className="relative">
          <input
            type="search"
            placeholder="Search transactions..."
            className="input input-bordered w-full md:w-64"
            value={q}
            onChange={e => setQ(e.target.value)}
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <TransactionForm />

      <div className="bg-base-100 rounded-xl shadow-sm border border-base-200">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {list.map(t => (
                <tr key={t._id}>
                  <td>{new Date(t.date).toLocaleDateString()}</td>
                  <td>{t.category}</td>
                  <td className={t.type === 'income' ? 'text-success' : 'text-error'}>
                    ${Math.abs(t.amount).toLocaleString()}
                  </td>
                  <td>
                    <span className={`badge ${t.type === 'income' ? 'badge-success' : 'badge-error'} badge-sm`}>
                      {t.type}
                    </span>
                  </td>
                </tr>
              ))}
              {list.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-base-content/50 py-8">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
