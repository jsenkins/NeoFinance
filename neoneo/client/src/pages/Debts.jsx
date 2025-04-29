// client/src/pages/Debts.jsx
import React, { useState, useMemo } from 'react';
import {
  useGetDebtsQuery,
  useGetDebtSummaryQuery,
  usePayDebtMutation
} from '../store/api';
import DebtForm from '../components/DebtForm';
import { DoughnutChart } from '../components/Chart';

export default function DebtsPage() {
  // 1) Call all hooks at the top, unconditionally
  const {
    data: debts = [],
    isLoading: loadingDebts,
    isError: errorDebts
  } = useGetDebtsQuery();

  const {
    data: summary = { debts: [] },
    isLoading: loadingSummary,
    isError: errorSummary
  } = useGetDebtSummaryQuery();

  const [payDebt] = usePayDebtMutation();
  const [amounts, setAmounts] = useState({});

  // 2) Build chartData via useMemo unconditionally
  const chartData = useMemo(() => {
    const labels = summary.debts.map(d => d.name);
    const data   = summary.debts.map(d => d.outstanding);
    return {
      labels,
      datasets: [{
        data,
        backgroundColor: [
          '#f87171', '#fbbf24', '#34d399', '#60a5fa',
          '#a78bfa', '#fb7185', '#facc15', '#22d3ee'
        ]
      }]
    };
  }, [summary.debts]);

  // 3) Now handle loading / error states
  if (loadingDebts || loadingSummary) {
    return <p>Loading debts…</p>;
  }
  if (errorDebts || errorSummary) {
    return <p>Error loading debts.</p>;
  }

  // 4) Finally, the render
  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-semibold">Debts</h2>

      {/* Always render the form */}
      <DebtForm />

      {/* Doughnut chart or empty message */}
      {summary.debts.length > 0 ? (
        <div className="w-1/2 mx-auto">
          <DoughnutChart data={chartData} />
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No debts yet—add one above.
        </p>
      )}

      {/* List of debts with pay inputs */}
      <ul className="space-y-4">
        {debts.map(d => (
          <li
            key={d._id}
            className="flex items-center justify-between"
          >
            <div>
              <strong>{d.name}</strong> — outstanding: {d.outstanding.toFixed(2)}
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Pay amount"
                className="border p-1 w-24"
                value={amounts[d._id] || ''}
                onChange={e =>
                  setAmounts({ ...amounts, [d._id]: e.target.value })
                }
              />
              <button
                className="bg-green-500 text-white px-3 py-1 rounded"
                onClick={() =>
                  payDebt({ id: d._id, amount: Number(amounts[d._id]) })
                }
              >
                Pay
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
